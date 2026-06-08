import type { EngagementStage } from "./schema";

/** Display metadata for each pipeline stage, shared by client + CRM views. */
export interface StageMeta {
  key: EngagementStage;
  label: string;
  /** Short description shown to clients/staff. */
  description: string;
  /** Stages that appear in the linear client-facing stepper. */
  inStepper: boolean;
}

export const STAGE_META: Record<EngagementStage, StageMeta> = {
  signed_up: {
    key: "signed_up",
    label: "Signed Up",
    description: "Account created. Next: tell us about your business.",
    inStepper: true,
  },
  brief_in_progress: {
    key: "brief_in_progress",
    label: "Brief",
    description: "Filling out the discovery brief (autosaved).",
    inStepper: true,
  },
  brief_complete: {
    key: "brief_complete",
    label: "Brief Done",
    description: "Brief submitted. Next: book your discovery call.",
    inStepper: true,
  },
  call_scheduled: {
    key: "call_scheduled",
    label: "Call Booked",
    description: "Discovery call scheduled. Next: start your subscription.",
    inStepper: true,
  },
  awaiting_payment: {
    key: "awaiting_payment",
    label: "Payment",
    description: "Awaiting subscription payment to begin design.",
    inStepper: true,
  },
  active: {
    key: "active",
    label: "Active",
    description: "Subscription active — work begins.",
    inStepper: true,
  },
  in_design: {
    key: "in_design",
    label: "In Design",
    description: "Our team is building your first draft (within 5 days).",
    inStepper: true,
  },
  in_revision: {
    key: "in_revision",
    label: "Revisions",
    description: "Refining the design based on your feedback.",
    inStepper: true,
  },
  launched: {
    key: "launched",
    label: "Launched",
    description: "Your website is live. Ongoing updates & support continue.",
    inStepper: true,
  },
  cancelled: {
    key: "cancelled",
    label: "Cancelled",
    description: "Subscription cancelled.",
    inStepper: false,
  },
};

/** Ordered stages for the client-facing stepper. */
export const STEPPER_STAGES: EngagementStage[] = (
  Object.values(STAGE_META) as StageMeta[]
)
  .filter((s) => s.inStepper)
  .map((s) => s.key);

export function stageIndex(stage: EngagementStage): number {
  return STEPPER_STAGES.indexOf(stage);
}

/** All stages in CRM column order (includes cancelled at the end). */
export const ALL_STAGES: EngagementStage[] = [
  ...STEPPER_STAGES,
  "cancelled",
];
