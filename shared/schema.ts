import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  boolean,
  jsonb,
  integer,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Existing public-site tables                                         */
/* ------------------------------------------------------------------ */

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  url: text("url"),
  tags: text("tags").array().notNull(),
  featured: boolean("featured").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().notNull(),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ------------------------------------------------------------------ */
/* Auth / users                                                       */
/* ------------------------------------------------------------------ */

export const userRoleEnum = pgEnum("user_role", ["client", "staff", "admin"]);

export const users = pgTable(
  "users",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    email: text("email").notNull().unique(),
    // bcrypt hash. Nullable to allow passwordless (magic-link) accounts later.
    passwordHash: text("password_hash"),
    name: text("name"),
    role: userRoleEnum("role").notNull().default("client"),
    stripeCustomerId: text("stripe_customer_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    emailIdx: index("users_email_idx").on(t.email),
  }),
);

/* ------------------------------------------------------------------ */
/* Pipeline: engagements (one per client website project)             */
/* ------------------------------------------------------------------ */

export const engagementStageEnum = pgEnum("engagement_stage", [
  "signed_up",
  "brief_in_progress",
  "brief_complete",
  "call_scheduled",
  "awaiting_payment",
  "active",
  "in_design",
  "in_revision",
  "launched",
  "cancelled",
]);

export const engagements = pgTable(
  "engagements",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    // staff member responsible for this engagement (CRM assignment)
    assignedToId: varchar("assigned_to_id").references(() => users.id, {
      onDelete: "set null",
    }),
    businessName: text("business_name"),
    stage: engagementStageEnum("stage").notNull().default("signed_up"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    userIdx: index("engagements_user_idx").on(t.userId),
    stageIdx: index("engagements_stage_idx").on(t.stage),
    assignedIdx: index("engagements_assigned_idx").on(t.assignedToId),
  }),
);

/* ------------------------------------------------------------------ */
/* Brief: multi-step business questionnaire, autosaved as JSONB       */
/* ------------------------------------------------------------------ */

export const briefs = pgTable(
  "briefs",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    engagementId: varchar("engagement_id")
      .notNull()
      .unique()
      .references(() => engagements.id, { onDelete: "cascade" }),
    // Partial answers keyed by question id. Persisted on every autosave,
    // even when the form is incomplete.
    answers: jsonb("answers").notNull().default(sql`'{}'::jsonb`),
    currentStep: integer("current_step").notNull().default(0),
    completedAt: timestamp("completed_at"),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    engagementIdx: index("briefs_engagement_idx").on(t.engagementId),
  }),
);

/* ------------------------------------------------------------------ */
/* Meetings: discovery / Zoom calls                                   */
/* ------------------------------------------------------------------ */

export const meetingStatusEnum = pgEnum("meeting_status", [
  "scheduled",
  "completed",
  "cancelled",
  "no_show",
]);

export const meetings = pgTable(
  "meetings",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    engagementId: varchar("engagement_id")
      .notNull()
      .references(() => engagements.id, { onDelete: "cascade" }),
    scheduledAt: timestamp("scheduled_at").notNull(),
    durationMinutes: integer("duration_minutes").notNull().default(30),
    meetingLink: text("meeting_link"),
    status: meetingStatusEnum("status").notNull().default("scheduled"),
    notes: text("notes"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    engagementIdx: index("meetings_engagement_idx").on(t.engagementId),
  }),
);

/* ------------------------------------------------------------------ */
/* Stripe subscriptions & payments                                    */
/* ------------------------------------------------------------------ */

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "incomplete",
  "incomplete_expired",
  "trialing",
  "active",
  "past_due",
  "canceled",
  "unpaid",
  "paused",
]);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    engagementId: varchar("engagement_id").references(() => engagements.id, {
      onDelete: "set null",
    }),
    stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
    stripeCustomerId: text("stripe_customer_id").notNull(),
    status: subscriptionStatusEnum("status").notNull(),
    priceId: text("price_id"),
    currentPeriodEnd: timestamp("current_period_end"),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => ({
    userIdx: index("subscriptions_user_idx").on(t.userId),
  }),
);

export const payments = pgTable(
  "payments",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: varchar("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    stripeInvoiceId: text("stripe_invoice_id"),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    amount: integer("amount").notNull(), // in cents
    currency: text("currency").notNull().default("usd"),
    status: text("status").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    userIdx: index("payments_user_idx").on(t.userId),
  }),
);

/* ------------------------------------------------------------------ */
/* CRM activity log (stage changes + staff notes)                     */
/* ------------------------------------------------------------------ */

export const activityLog = pgTable(
  "activity_log",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    engagementId: varchar("engagement_id")
      .notNull()
      .references(() => engagements.id, { onDelete: "cascade" }),
    // null actor = system/automated event (e.g. webhook)
    actorId: varchar("actor_id").references(() => users.id, {
      onDelete: "set null",
    }),
    type: text("type").notNull(), // 'stage_change' | 'note' | 'system' | 'payment'
    message: text("message").notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => ({
    engagementIdx: index("activity_log_engagement_idx").on(t.engagementId),
  }),
);

/* ------------------------------------------------------------------ */
/* Stripe webhook idempotency                                         */
/* ------------------------------------------------------------------ */

export const processedWebhookEvents = pgTable("processed_webhook_events", {
  id: text("id").primaryKey(), // Stripe event id
  type: text("type").notNull(),
  processedAt: timestamp("processed_at").defaultNow().notNull(),
});

/* ------------------------------------------------------------------ */
/* Zod insert schemas & inferred types                                */
/* ------------------------------------------------------------------ */

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1).optional(),
  businessName: z.string().min(1).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type User = typeof users.$inferSelect;
export type UserRole = (typeof userRoleEnum.enumValues)[number];
export type Engagement = typeof engagements.$inferSelect;
export type EngagementStage = (typeof engagementStageEnum.enumValues)[number];
export type Brief = typeof briefs.$inferSelect;
export type Meeting = typeof meetings.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type ActivityLogEntry = typeof activityLog.$inferSelect;

/** Public-safe user shape (never expose passwordHash). */
export type PublicUser = Omit<User, "passwordHash">;
