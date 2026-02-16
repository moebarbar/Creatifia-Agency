import { db } from "./db";
import { projects } from "@shared/schema";
import { sql } from "drizzle-orm";

const projectsData = [
  {
    title: "Postphoria",
    category: "SaaS",
    description: "Social media management platform with powerful scheduling, analytics, and team collaboration tools.",
    image: "/assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png",
    url: "https://postphoria.com/",
    tags: ["SaaS", "Social Media", "Analytics"],
    featured: true,
  },
  {
    title: "SocialProofly",
    category: "SaaS",
    description: "Social proof and conversion optimization tool that builds trust and boosts sales with real-time notifications.",
    image: "/assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png",
    url: "https://socialproofly.com/",
    tags: ["SaaS", "Marketing", "Conversions"],
    featured: true,
  },
  {
    title: "Analyio",
    category: "SaaS",
    description: "Website analytics and tracking platform with real-time data, heatmaps, and conversion funnels.",
    image: "/assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png",
    url: "https://analyio.com/",
    tags: ["SaaS", "Analytics", "Data"],
    featured: true,
  },
  {
    title: "Picxio",
    category: "SaaS",
    description: "AI-powered image editing suite with batch processing, cloud storage, and intelligent enhancement tools.",
    image: "/assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png",
    url: "https://picxio.com/",
    tags: ["SaaS", "AI", "Design"],
    featured: true,
  },
  {
    title: "Marble & Bone",
    category: "E-Commerce",
    description: "Premium pet accessories brand with a beautiful product catalog and seamless shopping experience.",
    image: "/assets/generated_images/editorial_fashion_e-commerce_website_design.png",
    url: "https://marbleandbone.creatifia.com/",
    tags: ["E-Commerce", "Retail", "Pets"],
    featured: true,
  },
  {
    title: "NY Slice",
    category: "Food & Beverage",
    description: "Authentic New York style pizza restaurant with online ordering and menu showcase.",
    image: "/assets/generated_images/editorial_fashion_e-commerce_website_design.png",
    url: "https://nyslice.creatifia.com/",
    tags: ["Food & Beverage", "Restaurant", "Ordering"],
    featured: true,
  },
  {
    title: "Komorebi",
    category: "Food & Beverage",
    description: "Japanese-inspired dining experience with elegant menu presentation and online reservations.",
    image: "/assets/generated_images/editorial_fashion_e-commerce_website_design.png",
    url: "https://komorebi.creatifia.com/",
    tags: ["Food & Beverage", "Restaurant", "Fine Dining"],
    featured: true,
  },
];

export async function autoSeedProjects() {
  try {
    const result = await db.select({ count: sql<number>`count(*)` }).from(projects);
    const count = Number(result[0].count);

    if (count >= projectsData.length) {
      console.log(`Projects already seeded (${count} found). Skipping.`);
      return;
    }

    if (count > 0) {
      await db.delete(projects);
      console.log(`Cleared ${count} old projects for re-seeding.`);
    }

    for (const project of projectsData) {
      await db.insert(projects).values(project);
    }

    console.log(`Auto-seeded ${projectsData.length} projects successfully.`);
  } catch (error) {
    console.error("Error auto-seeding projects:", error);
  }
}
