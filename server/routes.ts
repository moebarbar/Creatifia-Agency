import type { Express } from "express";
import type { Server } from "http";
import { setupAuth } from "./auth";
import authRoutes from "./routes/auth";
import engagementRoutes from "./routes/engagement";
import paymentRoutes from "./routes/payments";
import adminRoutes from "./routes/admin";
import publicRoutes from "./routes/public";

/**
 * Mount all JSON API routes. Must be called AFTER express.json() and AFTER the
 * Stripe webhook (which needs the raw body) have been registered in index.ts.
 */
export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Session + passport auth.
  setupAuth(app);

  // Public site.
  app.use("/api", publicRoutes);

  // Authenticated client + admin areas.
  app.use("/api/auth", authRoutes);
  app.use("/api/engagement", engagementRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/admin", adminRoutes);

  return httpServer;
}
