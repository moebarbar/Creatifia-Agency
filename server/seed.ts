import { storage } from "./storage";

async function seed() {
  console.log("Seeding database...");

  const projects = [
    {
      title: "Fintech Future",
      category: "App Interface",
      description: "A cutting-edge financial technology application with advanced trading capabilities and real-time market data.",
      image: "/assets/generated_images/futuristic_fintech_mobile_app_interface.png",
      tags: ["App", "Fintech", "Mobile"],
      featured: true,
    },
    {
      title: "Luxe Commerce",
      category: "E-commerce Website",
      description: "High-end fashion e-commerce platform with immersive product experiences and seamless checkout.",
      image: "/assets/generated_images/editorial_fashion_e-commerce_website_design.png",
      tags: ["Website", "E-commerce", "Fashion"],
      featured: true,
    },
    {
      title: "SaaS Analytics",
      category: "Dashboard UI",
      description: "Enterprise-grade analytics dashboard with comprehensive data visualization and reporting tools.",
      image: "/assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png",
      tags: ["SaaS", "Dashboard", "Analytics"],
      featured: true,
    },
    {
      title: "Neo Bank",
      category: "Landing Page",
      description: "Modern digital banking platform with intuitive user experience and advanced security features.",
      image: "/assets/generated_images/futuristic_fintech_mobile_app_interface.png",
      tags: ["Website", "Fintech", "Banking"],
      featured: false,
    },
    {
      title: "Crypto Exchange",
      category: "Trading Platform",
      description: "Professional cryptocurrency trading platform with real-time charts and advanced order types.",
      image: "/assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png",
      tags: ["SaaS", "Crypto", "Trading"],
      featured: false,
    },
    {
      title: "Fashion Week",
      category: "Event Site",
      description: "Dynamic event website for fashion week with live updates, designer profiles, and virtual showrooms.",
      image: "/assets/generated_images/editorial_fashion_e-commerce_website_design.png",
      tags: ["Website", "Fashion", "Events"],
      featured: false,
    },
  ];

  for (const project of projects) {
    await storage.createProject(project);
    console.log(`Created project: ${project.title}`);
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
