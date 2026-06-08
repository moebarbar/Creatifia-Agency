import { Router } from "express";
import { requireAuth } from "../auth";
import { storage } from "../storage";
import {
  stripeEnabled,
  createSubscriptionCheckout,
  createBillingPortalSession,
} from "../stripe";
import type { User } from "@shared/schema";

const router = Router();
router.use(requireAuth);

function ensureEnabled(res: import("express").Response): boolean {
  if (!stripeEnabled) {
    res.status(503).json({ error: "Payments are not configured yet." });
    return false;
  }
  return true;
}

/** Create a Checkout Session and return the hosted URL to redirect to. */
router.post("/checkout", async (req, res) => {
  if (!ensureEnabled(res)) return;
  const user = req.user as User;

  const engagement = await storage.getEngagementByUser(user.id);
  if (!engagement) {
    return res.status(400).json({ error: "No active engagement found." });
  }

  try {
    const url = await createSubscriptionCheckout(user, engagement.id);
    // Reflect intent in the pipeline.
    if (engagement.stage === "call_scheduled" || engagement.stage === "brief_complete") {
      await storage.advanceStage(engagement.id, "awaiting_payment");
    }
    res.json({ url });
  } catch (err) {
    console.error("Checkout creation failed:", err);
    res.status(500).json({ error: "Could not start checkout." });
  }
});

/** Open the Stripe Customer Portal to manage/cancel the subscription. */
router.post("/portal", async (req, res) => {
  if (!ensureEnabled(res)) return;
  const user = req.user as User;
  if (!user.stripeCustomerId) {
    return res.status(400).json({ error: "No billing account yet." });
  }
  try {
    const url = await createBillingPortalSession(user);
    res.json({ url });
  } catch (err) {
    console.error("Portal creation failed:", err);
    res.status(500).json({ error: "Could not open billing portal." });
  }
});

router.get("/history", async (req, res) => {
  const user = req.user as User;
  const payments = await storage.getPaymentsByUser(user.id);
  res.json({ payments });
});

export default router;
