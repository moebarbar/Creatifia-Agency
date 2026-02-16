import { storage } from "./storage";

async function seed() {
  console.log("Seeding database...");

  const projects = [
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

  for (const project of projects) {
    await storage.createProject(project);
    console.log(`Created project: ${project.title}`);
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
