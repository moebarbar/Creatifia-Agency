import { db } from "./db";
import { blogPosts } from "@shared/schema";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedBlogPosts() {
  console.log("Seeding blog posts...");
  
  const dataPath = path.join(__dirname, "blog-data.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const articles = JSON.parse(rawData);
  
  for (const article of articles) {
    try {
      await db.insert(blogPosts).values({
        ...article,
        publishedAt: new Date(article.publishedAt)
      });
      console.log("Created:", article.title);
    } catch (error: any) {
      if (error.code === "23505") {
        console.log("Skipped (exists):", article.title);
      } else {
        console.error("Error creating", article.title, ":", error.message);
      }
    }
  }
  
  console.log("Blog seeding complete!");
  process.exit(0);
}

seedBlogPosts();
