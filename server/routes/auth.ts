import { Router } from "express";
import passport from "passport";
import rateLimit from "express-rate-limit";
import { storage } from "../storage";
import { hashPassword, requireAuth, toPublicUser } from "../auth";
import { registerSchema, loginSchema, type User } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { sendWelcomeEmail, sendAdminNotification } from "../email";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts. Please try again later." },
});

router.post("/register", authLimiter, async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: fromZodError(parsed.error).message });
  }
  const { email, password, name, businessName } = parsed.data;

  const existing = await storage.getUserByEmail(email);
  if (existing) {
    return res.status(409).json({ error: "An account with this email already exists" });
  }

  const passwordHash = await hashPassword(password);
  const user = await storage.createUser({ email, passwordHash, name });

  // Kick off the pipeline: every new client gets an engagement + empty brief.
  const engagement = await storage.createEngagement(user.id, businessName);
  await storage.logActivity({
    engagementId: engagement.id,
    actorId: user.id,
    type: "system",
    message: "Account created — pipeline started",
  });

  // Fire-and-forget notifications.
  void sendWelcomeEmail(user.email, user.name ?? undefined);
  void sendAdminNotification(
    "New signup",
    `<p>${user.email}${businessName ? ` (${businessName})` : ""} just signed up.</p>`,
  );

  req.login(user, (err) => {
    if (err) return res.status(500).json({ error: "Login after register failed" });
    return res.status(201).json({ user: toPublicUser(user) });
  });
});

router.post("/login", authLimiter, (req, res, next) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: fromZodError(parsed.error).message });
  }
  passport.authenticate(
    "local",
    (err: unknown, user: User | false, info: { message?: string } | undefined) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ error: info?.message ?? "Invalid credentials" });
      }
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        return res.json({ user: toPublicUser(user) });
      });
    },
  )(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ ok: true });
    });
  });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: toPublicUser(req.user as User) });
});

export default router;
