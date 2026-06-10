import Stripe from "stripe";
import { env, stripeEnabled } from "./env";
import { storage } from "./storage";
import type { User } from "@shared/schema";

/**
 * Stripe integration (subscription model — $799/month).
 *
 * The Stripe client is only instantiated when keys are present, so the app
 * boots and compiles without credentials. Callers should check `stripeEnabled`
 * (re-exported) and return 503 when payments aren't configured.
 */

export const stripe: Stripe | null = stripeEnabled
  ? new Stripe(env.STRIPE_SECRET_KEY as string)
  : null;

export { stripeEnabled };

function requireStripe(): Stripe {
  if (!stripe) {
    throw new Error("Stripe is not configured");
  }
  return stripe;
}

/** Get or create the Stripe customer for a user, persisting the id. */
export async function ensureStripeCustomer(user: User): Promise<string> {
  if (user.stripeCustomerId) return user.stripeCustomerId;
  const client = requireStripe();
  const customer = await client.customers.create({
    email: user.email,
    name: user.name ?? undefined,
    metadata: { userId: user.id },
  });
  await storage.setUserStripeCustomerId(user.id, customer.id);
  return customer.id;
}

/** Create a hosted Checkout Session for the monthly subscription. */
export async function createSubscriptionCheckout(
  user: User,
  engagementId: string,
): Promise<string> {
  const client = requireStripe();
  const customerId = await ensureStripeCustomer(user);

  const session = await client.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: env.STRIPE_PRICE_ID as string, quantity: 1 }],
    success_url: `${env.APP_URL}/dashboard/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.APP_URL}/dashboard/payment?status=cancelled`,
    client_reference_id: engagementId,
    metadata: { userId: user.id, engagementId },
    subscription_data: {
      metadata: { userId: user.id, engagementId },
    },
    allow_promotion_codes: true,
  });

  if (!session.url) throw new Error("Stripe did not return a checkout URL");
  return session.url;
}

/** Create a Customer Portal session so the client can manage their sub. */
export async function createBillingPortalSession(
  user: User,
): Promise<string> {
  const client = requireStripe();
  if (!user.stripeCustomerId) {
    throw new Error("No Stripe customer for this user");
  }
  const session = await client.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${env.APP_URL}/dashboard`,
  });
  return session.url;
}

/** Verify and construct a webhook event from the raw request body. */
export function constructWebhookEvent(
  rawBody: Buffer,
  signature: string,
): Stripe.Event {
  const client = requireStripe();
  if (!env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
  }
  return client.webhooks.constructEvent(
    rawBody,
    signature,
    env.STRIPE_WEBHOOK_SECRET,
  );
}
