import { Router, raw } from "express";
import type Stripe from "stripe";
import { storage } from "../storage";
import { constructWebhookEvent, stripeEnabled, stripe } from "../stripe";
import { sendPaymentReceiptEmail } from "../email";

const router = Router();

/**
 * Stripe webhook. Mounted with a raw body parser so signature verification
 * works. Every event is recorded for idempotency before processing.
 */
router.post("/stripe", raw({ type: "application/json" }), async (req, res) => {
  if (!stripeEnabled) return res.status(503).end();

  const signature = req.headers["stripe-signature"];
  if (!signature || typeof signature !== "string") {
    return res.status(400).send("Missing stripe-signature header");
  }

  let event: Stripe.Event;
  try {
    event = constructWebhookEvent(req.body as Buffer, signature);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  // Idempotency: skip if we've already handled this event id.
  const isNew = await storage.markWebhookProcessed(event.id, event.type);
  if (!isNew) return res.json({ received: true, duplicate: true });

  try {
    await handleEvent(event);
  } catch (err) {
    console.error(`Error handling webhook ${event.type}:`, err);
    // 500 lets Stripe retry.
    return res.status(500).json({ error: "Handler failed" });
  }

  res.json({ received: true });
});

async function handleEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const engagementId =
        session.metadata?.engagementId ?? session.client_reference_id ?? undefined;
      if (engagementId) {
        await storage.advanceStage(engagementId, "active");
        await storage.logActivity({
          engagementId,
          type: "payment",
          message: "Subscription started — payment received",
        });
        // Then progress into design.
        await storage.advanceStage(engagementId, "in_design");
      }
      // Capture subscription details if present.
      if (session.subscription && userId && stripe) {
        const sub = await stripe.subscriptions.retrieve(
          session.subscription as string,
        );
        await persistSubscription(sub, userId, engagementId ?? null);
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.userId;
      const engagementId = sub.metadata?.engagementId ?? null;
      if (userId) {
        await persistSubscription(sub, userId, engagementId);
      }
      if (sub.status === "canceled" && engagementId) {
        await storage.updateEngagement(engagementId, { stage: "cancelled" });
        await storage.logActivity({
          engagementId,
          type: "system",
          message: "Subscription canceled",
        });
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const userId = await resolveUserId(invoice.customer as string);
      if (userId) {
        await storage.recordPayment({
          userId,
          stripeInvoiceId: invoice.id,
          amount: invoice.amount_paid,
          currency: invoice.currency,
          status: "paid",
          description: invoice.lines?.data?.[0]?.description ?? "Subscription payment",
        });
        const user = await storage.getUser(userId);
        if (user) {
          void sendPaymentReceiptEmail(
            user.email,
            invoice.amount_paid,
            user.name ?? undefined,
          );
        }
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const userId = await resolveUserId(invoice.customer as string);
      if (userId) {
        await storage.recordPayment({
          userId,
          stripeInvoiceId: invoice.id,
          amount: invoice.amount_due,
          currency: invoice.currency,
          status: "failed",
          description: "Payment failed",
        });
      }
      break;
    }

    default:
      // Unhandled event types are acknowledged and ignored.
      break;
  }
}

async function persistSubscription(
  sub: Stripe.Subscription,
  userId: string,
  engagementId: string | null,
): Promise<void> {
  // `current_period_end` lives on the subscription in the API response; the
  // SDK's static type recently moved it onto items, so read it defensively.
  const periodEndUnix =
    (sub as unknown as { current_period_end?: number }).current_period_end ??
    sub.items.data[0]?.current_period_end;

  await storage.upsertSubscription({
    userId,
    engagementId,
    stripeSubscriptionId: sub.id,
    stripeCustomerId: sub.customer as string,
    status: sub.status,
    priceId: sub.items.data[0]?.price.id ?? null,
    currentPeriodEnd: periodEndUnix ? new Date(periodEndUnix * 1000) : null,
    cancelAtPeriodEnd: sub.cancel_at_period_end,
  });
}

/** Map a Stripe customer id back to our user id. */
async function resolveUserId(customerId: string): Promise<string | undefined> {
  if (!stripe) return undefined;
  try {
    const customer = await stripe.customers.retrieve(customerId);
    if (customer && !customer.deleted) {
      return (customer.metadata as Record<string, string>)?.userId;
    }
  } catch (err) {
    console.error("Failed to resolve customer:", err);
  }
  return undefined;
}

export default router;
