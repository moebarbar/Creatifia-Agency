import { z } from "zod";

/**
 * Centralized, validated environment configuration.
 *
 * Required vars fail fast at boot. Integration vars (Stripe, Brevo) are
 * optional so the app still compiles/runs locally without keys — the
 * corresponding features degrade gracefully and log a warning instead.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(5000),

  // Required
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL must be set. Provision a Postgres database (Railway)."),
  SESSION_SECRET: z
    .string()
    .min(16, "SESSION_SECRET must be set (>=16 chars) for secure sessions.")
    // Dev fallback so local boot doesn't require setup; never use in prod.
    .default("dev-insecure-session-secret-change-me"),

  // Public URL of the deployed app (used for Stripe redirect URLs, email links)
  APP_URL: z.string().url().default("http://localhost:5000"),

  // Stripe (optional — payments disabled if absent)
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_ID: z.string().optional(),

  // Brevo transactional email (optional — emails logged to console if absent)
  BREVO_API_KEY: z.string().optional(),
  BREVO_SENDER_EMAIL: z.string().email().default("hello@creatifia.com"),
  BREVO_SENDER_NAME: z.string().default("Créatifia"),
  // Where new-lead / pipeline notifications go for the team
  ADMIN_NOTIFY_EMAIL: z.string().email().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Environment validation failed. See errors above.");
}

export const env = parsed.data;

export const isProd = env.NODE_ENV === "production";

/** True when Stripe is fully configured and payments can run. */
export const stripeEnabled = Boolean(
  env.STRIPE_SECRET_KEY && env.STRIPE_PRICE_ID,
);

/** True when Brevo is configured; otherwise emails are logged, not sent. */
export const brevoEnabled = Boolean(env.BREVO_API_KEY);

if (!stripeEnabled) {
  console.warn(
    "⚠️  Stripe not fully configured (STRIPE_SECRET_KEY / STRIPE_PRICE_ID). Payment endpoints will return 503.",
  );
}
if (!brevoEnabled) {
  console.warn(
    "⚠️  Brevo not configured (BREVO_API_KEY). Emails will be logged to console instead of sent.",
  );
}
