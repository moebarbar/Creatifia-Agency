import { Navbar, Footer } from "@/components/layout/shell";
import { FadeIn, TextReveal } from "@/components/ui/motion";
import { ProjectCard } from "@/components/ui/project-card";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects");
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
}

const filters = ["All", "Website", "SaaS", "App"];

export default function Work() {
  const [filter, setFilter] = useState("All");
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.tags.includes(filter));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-32">
        <Navbar />
        <div className="container mx-auto px-6 flex items-center justify-center h-[50vh]">
          <p className="text-muted-foreground text-xl">Loading projects...</p>
        </div>
        <Footer />
      </div>
    );
  }

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
              data-testid={`filter-${f.toLowerCase()}`}
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
