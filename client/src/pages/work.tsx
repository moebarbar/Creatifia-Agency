import { Navbar, Footer } from "@/components/layout/shell";
import { FadeIn, TextReveal } from "@/components/ui/motion";
import { ProjectCard } from "@/components/ui/project-card";
import project1 from "@assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png";
import project2 from "@assets/generated_images/editorial_fashion_e-commerce_website_design.png";
import project3 from "@assets/generated_images/futuristic_fintech_mobile_app_interface.png";
import { useState } from "react";

const projects = [
  { id: "1", title: "Fintech Future", category: "App Interface", type: "App", image: project3 },
  { id: "2", title: "Luxe Commerce", category: "E-commerce Website", type: "Website", image: project2 },
  { id: "3", title: "SaaS Analytics", category: "Dashboard UI", type: "SaaS", image: project1 },
  { id: "4", title: "Neo Bank", category: "Landing Page", type: "Website", image: project3 }, 
  { id: "5", title: "Crypto Exchange", category: "Trading Platform", type: "SaaS", image: project1 },
  { id: "6", title: "Fashion Week", category: "Event Site", type: "Website", image: project2 },
];

const filters = ["All", "Website", "SaaS", "App"];

export default function Work() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.type === filter);

  return (
    <div className="min-h-screen bg-background pt-32">
      <Navbar />
      
      <div className="container mx-auto px-6 mb-20">
        <h1 className="text-[10vw] font-display font-bold uppercase leading-[0.85] mb-12">
          <TextReveal>Selected</TextReveal> <br/>
          <span className="text-accent"><TextReveal>Work</TextReveal></span>
        </h1>

        <div className="flex flex-wrap gap-8 border-b border-white/10 pb-8">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                filter === f ? "text-accent" : "text-muted-foreground hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {filteredProjects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1}>
              <ProjectCard
                id={project.id}
                title={project.title}
                category={project.category}
                image={project.image}
              />
            </FadeIn>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
