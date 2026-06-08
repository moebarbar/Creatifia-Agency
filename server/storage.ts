import {
  users,
  projects,
  contactSubmissions,
  blogPosts,
  engagements,
  briefs,
  meetings,
  subscriptions,
  payments,
  activityLog,
  processedWebhookEvents,
  type User,
  type PublicUser,
  type UserRole,
  type Project,
  type InsertProject,
  type ContactSubmission,
  type InsertContact,
  type BlogPost,
  type InsertBlogPost,
  type Engagement,
  type EngagementStage,
  type Brief,
  type Meeting,
  type Subscription,
  type Payment,
  type ActivityLogEntry,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, inArray } from "drizzle-orm";

/** Strip the password hash before returning a user to any caller. */
export function toPublicUser(user: User): PublicUser {
  const { passwordHash, ...rest } = user;
  return rest;
}

export class DatabaseStorage {
  /* ----------------------------- Users ----------------------------- */
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()));
    return user || undefined;
  }

  async createUser(data: {
    email: string;
    passwordHash?: string | null;
    name?: string | null;
    role?: UserRole;
  }): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash ?? null,
        name: data.name ?? null,
        role: data.role ?? "client",
      })
      .returning();
    return user;
  }

  async setUserStripeCustomerId(
    userId: string,
    stripeCustomerId: string,
  ): Promise<void> {
    await db
      .update(users)
      .set({ stripeCustomerId, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }

  async getStaffUsers(): Promise<PublicUser[]> {
    const rows = await db
      .select()
      .from(users)
      .where(inArray(users.role, ["staff", "admin"]));
    return rows.map(toPublicUser);
  }

  /* -------------------------- Engagements -------------------------- */
  async createEngagement(
    userId: string,
    businessName?: string | null,
  ): Promise<Engagement> {
    const [engagement] = await db
      .insert(engagements)
      .values({ userId, businessName: businessName ?? null })
      .returning();
    // Every engagement gets an empty brief ready for autosave.
    await db.insert(briefs).values({ engagementId: engagement.id });
    return engagement;
  }

  async getEngagement(id: string): Promise<Engagement | undefined> {
    const [e] = await db.select().from(engagements).where(eq(engagements.id, id));
    return e || undefined;
  }

  async getEngagementByUser(userId: string): Promise<Engagement | undefined> {
    const [e] = await db
      .select()
      .from(engagements)
      .where(eq(engagements.userId, userId))
      .orderBy(desc(engagements.createdAt));
    return e || undefined;
  }

  async updateEngagement(
    id: string,
    patch: Partial<Pick<Engagement, "businessName" | "stage" | "assignedToId">>,
  ): Promise<Engagement> {
    const [e] = await db
      .update(engagements)
      .set({ ...patch, updatedAt: new Date() })
      .where(eq(engagements.id, id))
      .returning();
    return e;
  }

  /**
   * Advance the stage only if the new stage is "further" than the current one
   * (prevents accidental regressions from client-driven events). Admins use
   * updateEngagement directly to move freely.
   */
  async advanceStage(
    id: string,
    stage: EngagementStage,
  ): Promise<Engagement | undefined> {
    const current = await this.getEngagement(id);
    if (!current) return undefined;
    const order = stageOrder(current.stage);
    if (stageOrder(stage) <= order && stage !== "cancelled") return current;
    return this.updateEngagement(id, { stage });
  }

  async listEngagements(filter?: {
    stage?: EngagementStage;
    assignedToId?: string;
  }): Promise<Engagement[]> {
    const conditions = [];
    if (filter?.stage) conditions.push(eq(engagements.stage, filter.stage));
    if (filter?.assignedToId)
      conditions.push(eq(engagements.assignedToId, filter.assignedToId));
    const where = conditions.length ? and(...conditions) : undefined;
    return db
      .select()
      .from(engagements)
      .where(where)
      .orderBy(desc(engagements.updatedAt));
  }

  /* ----------------------------- Briefs ---------------------------- */
  async getBrief(engagementId: string): Promise<Brief | undefined> {
    const [b] = await db
      .select()
      .from(briefs)
      .where(eq(briefs.engagementId, engagementId));
    return b || undefined;
  }

  /** Merge-save partial answers (autosave). */
  async saveBriefProgress(
    engagementId: string,
    answers: Record<string, unknown>,
    currentStep: number,
  ): Promise<Brief> {
    const existing = await this.getBrief(engagementId);
    const merged = { ...(existing?.answers as object), ...answers };
    const [b] = await db
      .update(briefs)
      .set({ answers: merged, currentStep, updatedAt: new Date() })
      .where(eq(briefs.engagementId, engagementId))
      .returning();
    return b;
  }

  async completeBrief(engagementId: string): Promise<Brief> {
    const [b] = await db
      .update(briefs)
      .set({ completedAt: new Date(), updatedAt: new Date() })
      .where(eq(briefs.engagementId, engagementId))
      .returning();
    return b;
  }

  /* ---------------------------- Meetings --------------------------- */
  async createMeeting(data: {
    engagementId: string;
    scheduledAt: Date;
    durationMinutes?: number;
    meetingLink?: string | null;
  }): Promise<Meeting> {
    const [m] = await db
      .insert(meetings)
      .values({
        engagementId: data.engagementId,
        scheduledAt: data.scheduledAt,
        durationMinutes: data.durationMinutes ?? 30,
        meetingLink: data.meetingLink ?? null,
      })
      .returning();
    return m;
  }

  async getMeetingsForEngagement(engagementId: string): Promise<Meeting[]> {
    return db
      .select()
      .from(meetings)
      .where(eq(meetings.engagementId, engagementId))
      .orderBy(desc(meetings.scheduledAt));
  }

  /* ------------------------- Subscriptions ------------------------- */
  async upsertSubscription(data: {
    userId: string;
    engagementId?: string | null;
    stripeSubscriptionId: string;
    stripeCustomerId: string;
    status: Subscription["status"];
    priceId?: string | null;
    currentPeriodEnd?: Date | null;
    cancelAtPeriodEnd?: boolean;
  }): Promise<Subscription> {
    const [row] = await db
      .insert(subscriptions)
      .values({
        userId: data.userId,
        engagementId: data.engagementId ?? null,
        stripeSubscriptionId: data.stripeSubscriptionId,
        stripeCustomerId: data.stripeCustomerId,
        status: data.status,
        priceId: data.priceId ?? null,
        currentPeriodEnd: data.currentPeriodEnd ?? null,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd ?? false,
      })
      .onConflictDoUpdate({
        target: subscriptions.stripeSubscriptionId,
        set: {
          status: data.status,
          priceId: data.priceId ?? null,
          currentPeriodEnd: data.currentPeriodEnd ?? null,
          cancelAtPeriodEnd: data.cancelAtPeriodEnd ?? false,
          updatedAt: new Date(),
        },
      })
      .returning();
    return row;
  }

  async getSubscriptionByUser(
    userId: string,
  ): Promise<Subscription | undefined> {
    const [s] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.createdAt));
    return s || undefined;
  }

  /* ----------------------------- Payments -------------------------- */
  async recordPayment(data: {
    userId: string;
    stripeInvoiceId?: string | null;
    stripePaymentIntentId?: string | null;
    amount: number;
    currency?: string;
    status: string;
    description?: string | null;
  }): Promise<Payment> {
    const [p] = await db
      .insert(payments)
      .values({
        userId: data.userId,
        stripeInvoiceId: data.stripeInvoiceId ?? null,
        stripePaymentIntentId: data.stripePaymentIntentId ?? null,
        amount: data.amount,
        currency: data.currency ?? "usd",
        status: data.status,
        description: data.description ?? null,
      })
      .returning();
    return p;
  }

  async getPaymentsByUser(userId: string): Promise<Payment[]> {
    return db
      .select()
      .from(payments)
      .where(eq(payments.userId, userId))
      .orderBy(desc(payments.createdAt));
  }

  /* --------------------------- Activity log ------------------------ */
  async logActivity(data: {
    engagementId: string;
    actorId?: string | null;
    type: string;
    message: string;
    metadata?: Record<string, unknown> | null;
  }): Promise<ActivityLogEntry> {
    const [a] = await db
      .insert(activityLog)
      .values({
        engagementId: data.engagementId,
        actorId: data.actorId ?? null,
        type: data.type,
        message: data.message,
        metadata: data.metadata ?? null,
      })
      .returning();
    return a;
  }

  async getActivityForEngagement(
    engagementId: string,
  ): Promise<ActivityLogEntry[]> {
    return db
      .select()
      .from(activityLog)
      .where(eq(activityLog.engagementId, engagementId))
      .orderBy(desc(activityLog.createdAt));
  }

  /* --------------------- Webhook idempotency ----------------------- */
  /** Returns true if this event was newly recorded, false if already seen. */
  async markWebhookProcessed(id: string, type: string): Promise<boolean> {
    const res = await db
      .insert(processedWebhookEvents)
      .values({ id, type })
      .onConflictDoNothing()
      .returning();
    return res.length > 0;
  }

  /* ------------------------ Public-site data ----------------------- */
  async getAllProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.createdAt));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    return project || undefined;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(insertProject)
      .returning();
    return project;
  }

  async createContactSubmission(
    insertContact: InsertContact,
  ): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertContact)
      .returning();
    return submission;
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
  }

  async getLatestBlogPosts(limit: number): Promise<BlogPost[]> {
    return db
      .select()
      .from(blogPosts)
      .orderBy(desc(blogPosts.publishedAt))
      .limit(limit);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }
}

/** Linear ordering of pipeline stages for monotonic advancement. */
const STAGE_SEQUENCE: EngagementStage[] = [
  "signed_up",
  "brief_in_progress",
  "brief_complete",
  "call_scheduled",
  "awaiting_payment",
  "active",
  "in_design",
  "in_revision",
  "launched",
];

function stageOrder(stage: EngagementStage): number {
  const i = STAGE_SEQUENCE.indexOf(stage);
  return i === -1 ? 99 : i; // 'cancelled' sorts last
}

export const storage = new DatabaseStorage();
