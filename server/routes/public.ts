import { Router } from "express";
import { storage } from "../storage";
import { insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

const router = Router();

router.get("/projects", async (_req, res) => {
  try {
    res.json(await storage.getAllProjects());
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.get("/projects/featured", async (_req, res) => {
  try {
    res.json(await storage.getFeaturedProjects());
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    res.status(500).json({ error: "Failed to fetch featured projects" });
  }
});

router.post("/contact", async (req, res) => {
  try {
    const validation = insertContactSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({ error: fromZodError(validation.error).message });
    }
    const submission = await storage.createContactSubmission(validation.data);
    res.json(submission);
  } catch (error) {
    console.error("Error creating contact submission:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

router.get("/blog", async (_req, res) => {
  try {
    res.json(await storage.getAllBlogPosts());
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

router.get("/blog/latest", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 3;
    res.json(await storage.getLatestBlogPosts(limit));
  } catch (error) {
    console.error("Error fetching latest blog posts:", error);
    res.status(500).json({ error: "Failed to fetch latest blog posts" });
  }
});

router.get("/blog/:slug", async (req, res) => {
  try {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: "Blog post not found" });
    res.json(post);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

export default router;
