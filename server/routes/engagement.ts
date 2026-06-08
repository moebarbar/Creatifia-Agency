import { Router } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { storage } from "../storage";
import { requireAuth } from "../auth";
import { isBriefComplete } from "@shared/brief-questions";
import type { User } from "@shared/schema";
import {
  sendCallConfirmationEmail,
  sendAdminNotification,
} from "../email";

const router = Router();
router.use(requireAuth);

/** Resolve (or lazily create) the current user's engagement. */
async function getMyEngagement(userId: string) {
  let engagement = await storage.getEngagementByUser(userId);
  if (!engagement) {
    engagement = await storage.createEngagement(userId);
  }
  return engagement;
}

/** Full dashboard payload: engagement + brief + meetings + subscription. */
router.get("/", async (req, res) => {
  const user = req.user as User;
  const engagement = await getMyEngagement(user.id);
  const [brief, meetings, subscription] = await Promise.all([
    storage.getBrief(engagement.id),
    storage.getMeetingsForEngagement(engagement.id),
    storage.getSubscriptionByUser(user.id),
  ]);
  res.json({ engagement, brief, meetings, subscription });
});

/* ------------------------------ Brief ------------------------------ */

const briefSaveSchema = z.object({
  answers: z.record(z.unknown()),
  currentStep: z.number().int().min(0).default(0),
});

/**
 * Autosave partial brief answers. Called frequently (debounced on the client),
 * persists progress even when the form is incomplete.
 */
router.patch("/brief", async (req, res) => {
  const user = req.user as User;
  const parsed = briefSaveSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: fromZodError(parsed.error).message });
  }
  const engagement = await getMyEngagement(user.id);

  const brief = await storage.saveBriefProgress(
    engagement.id,
    parsed.data.answers,
    parsed.data.currentStep,
  );

  // First meaningful save moves the pipeline forward.
  if (engagement.stage === "signed_up") {
    await storage.advanceStage(engagement.id, "brief_in_progress");
  }
  // Keep businessName in sync for the CRM.
  const bn = parsed.data.answers["businessName"];
  if (typeof bn === "string" && bn.trim() && bn !== engagement.businessName) {
    await storage.updateEngagement(engagement.id, { businessName: bn.trim() });
  }

  res.json({ brief });
});

/** Mark the brief complete (requires all required fields). */
router.post("/brief/submit", async (req, res) => {
  const user = req.user as User;
  const engagement = await getMyEngagement(user.id);
  const brief = await storage.getBrief(engagement.id);
  if (!brief) return res.status(404).json({ error: "Brief not found" });

  if (!isBriefComplete(brief.answers as Record<string, unknown>)) {
    return res.status(400).json({ error: "Please complete all required fields first." });
  }

  await storage.completeBrief(engagement.id);
  const updated = await storage.advanceStage(engagement.id, "brief_complete");
  await storage.logActivity({
    engagementId: engagement.id,
    actorId: user.id,
    type: "system",
    message: "Brief completed",
  });
  void sendAdminNotification(
    "Brief completed",
    `<p>${user.email} completed their brief.</p>`,
  );

  res.json({ engagement: updated });
});

/* ----------------------------- Meetings ---------------------------- */

const meetingSchema = z.object({
  scheduledAt: z.coerce.date(),
  durationMinutes: z.number().int().positive().max(240).optional(),
});

router.post("/meeting", async (req, res) => {
  const user = req.user as User;
  const parsed = meetingSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: fromZodError(parsed.error).message });
  }
  if (parsed.data.scheduledAt.getTime() < Date.now()) {
    return res.status(400).json({ error: "Please choose a future date/time." });
  }

  const engagement = await getMyEngagement(user.id);
  const meeting = await storage.createMeeting({
    engagementId: engagement.id,
    scheduledAt: parsed.data.scheduledAt,
    durationMinutes: parsed.data.durationMinutes,
  });

  await storage.advanceStage(engagement.id, "call_scheduled");
  await storage.logActivity({
    engagementId: engagement.id,
    actorId: user.id,
    type: "system",
    message: `Discovery call scheduled for ${parsed.data.scheduledAt.toUTCString()}`,
  });

  void sendCallConfirmationEmail(
    user.email,
    meeting.scheduledAt,
    meeting.meetingLink,
    user.name ?? undefined,
  );
  void sendAdminNotification(
    "Call scheduled",
    `<p>${user.email} booked a call for ${parsed.data.scheduledAt.toUTCString()}.</p>`,
  );

  res.status(201).json({ meeting });
});

export default router;
