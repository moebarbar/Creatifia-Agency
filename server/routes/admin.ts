import { Router } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { storage } from "../storage";
import { requireRole } from "../auth";
import { engagementStageEnum, type User } from "@shared/schema";

const router = Router();
// Both staff and admins can use the CRM.
router.use(requireRole("staff", "admin"));

/** List all engagements with their owner, brief, meetings & subscription. */
router.get("/engagements", async (req, res) => {
  const stage = req.query.stage as string | undefined;
  const assignedToId = req.query.assignedToId as string | undefined;

  const validStage =
    stage && (engagementStageEnum.enumValues as string[]).includes(stage)
      ? (stage as (typeof engagementStageEnum.enumValues)[number])
      : undefined;

  const engagements = await storage.listEngagements({
    stage: validStage,
    assignedToId,
  });

  // Hydrate each with the data the CRM board needs.
  const hydrated = await Promise.all(
    engagements.map(async (e) => {
      const [owner, brief, meetings, subscription] = await Promise.all([
        storage.getUser(e.userId),
        storage.getBrief(e.id),
        storage.getMeetingsForEngagement(e.id),
        storage.getSubscriptionByUser(e.userId),
      ]);
      return {
        ...e,
        owner: owner
          ? { id: owner.id, email: owner.email, name: owner.name }
          : null,
        brief,
        meetings,
        subscription,
      };
    }),
  );

  res.json({ engagements: hydrated });
});

/** Full detail for one engagement, including activity timeline. */
router.get("/engagements/:id", async (req, res) => {
  const engagement = await storage.getEngagement(req.params.id);
  if (!engagement) return res.status(404).json({ error: "Not found" });

  const [owner, brief, meetings, subscription, activity, payments] =
    await Promise.all([
      storage.getUser(engagement.userId),
      storage.getBrief(engagement.id),
      storage.getMeetingsForEngagement(engagement.id),
      storage.getSubscriptionByUser(engagement.userId),
      storage.getActivityForEngagement(engagement.id),
      storage.getPaymentsByUser(engagement.userId),
    ]);

  res.json({
    engagement,
    owner: owner ? { id: owner.id, email: owner.email, name: owner.name } : null,
    brief,
    meetings,
    subscription,
    activity,
    payments,
  });
});

const updateSchema = z.object({
  stage: z.enum(engagementStageEnum.enumValues).optional(),
  assignedToId: z.string().nullable().optional(),
  businessName: z.string().optional(),
});

/** Update stage / assignment / business name. */
router.patch("/engagements/:id", async (req, res) => {
  const actor = req.user as User;
  const parsed = updateSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: fromZodError(parsed.error).message });
  }
  const existing = await storage.getEngagement(req.params.id);
  if (!existing) return res.status(404).json({ error: "Not found" });

  const updated = await storage.updateEngagement(req.params.id, parsed.data);

  if (parsed.data.stage && parsed.data.stage !== existing.stage) {
    await storage.logActivity({
      engagementId: updated.id,
      actorId: actor.id,
      type: "stage_change",
      message: `Stage changed: ${existing.stage} → ${parsed.data.stage}`,
    });
  }
  if (parsed.data.assignedToId !== undefined) {
    await storage.logActivity({
      engagementId: updated.id,
      actorId: actor.id,
      type: "system",
      message: parsed.data.assignedToId
        ? `Assigned to staff ${parsed.data.assignedToId}`
        : "Unassigned",
    });
  }

  res.json({ engagement: updated });
});

const noteSchema = z.object({ message: z.string().min(1) });

/** Add a CRM note to the engagement timeline. */
router.post("/engagements/:id/notes", async (req, res) => {
  const actor = req.user as User;
  const parsed = noteSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: fromZodError(parsed.error).message });
  }
  const engagement = await storage.getEngagement(req.params.id);
  if (!engagement) return res.status(404).json({ error: "Not found" });

  const entry = await storage.logActivity({
    engagementId: engagement.id,
    actorId: actor.id,
    type: "note",
    message: parsed.data.message,
  });
  res.status(201).json({ entry });
});

/** Staff list (for the assignment dropdown). */
router.get("/staff", async (_req, res) => {
  const staff = await storage.getStaffUsers();
  res.json({ staff });
});

export default router;
