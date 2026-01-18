import { Navbar, Footer } from "@/components/layout/shell";
import { FadeIn, TextReveal } from "@/components/ui/motion";
import { Check } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen bg-background pt-32">
      <Navbar />

      <div className="container mx-auto px-6 mb-24">
         <h1 className="text-[10vw] font-display font-bold uppercase leading-[0.85] mb-12">
          <TextReveal>Our</TextReveal> <br/>
          <span className="text-stroke text-transparent"><TextReveal>Expertise</TextReveal></span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-light">
          We don't do everything. We do one thing extremely well: <strong className="text-white">Frontend</strong>. We partner with design teams to bring visions to life, and backend teams to give them a UI worthy of their architecture.
        </p>
      </div>

      <div className="border-t border-white/10">
        {[
          {
            title: "High-Performance Websites",
            desc: "Marketing sites that score 100 on Lighthouse. SEO optimized, accessible, and stunningly animated.",
            tags: ["Next.js", "SEO", "CMS Integration", "WebGL"]
          },
          {
            title: "SaaS & App Interfaces",
            desc: "Complex dashboards and application UIs that feel like native apps. We handle the state, the interactions, and the component architecture.",
            tags: ["React", "Dashboard", "Data Viz", "State Management"]
          },
          {
            title: "Design Systems",
            desc: "We build scalable component libraries that ensure consistency across your entire product suite.",
            tags: ["Storybook", "Tokens", "Accessibility", "Documentation"]
          },
          {
            title: "Motion & Interaction",
            desc: "Adding that layer of 'feel' that separates good products from great ones. Micro-interactions, page transitions, and scroll effects.",
            tags: ["Framer Motion", "GSAP", "Lottie", "3D"]
          }
        ].map((service, i) => (
          <div key={i} className="group border-b border-white/10 hover:bg-white/5 transition-colors">
            <div className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <span className="text-accent font-mono text-sm mb-4 block">0{i + 1}</span>
                <h2 className="text-4xl font-display font-bold uppercase group-hover:translate-x-4 transition-transform duration-300">
                  {service.title}
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-xl text-muted-foreground">{service.desc}</p>
              </div>
              <div className="md:col-span-3">
                <ul className="space-y-3">
                  {service.tags.map(tag => (
                    <li key={tag} className="flex items-center gap-3 text-sm uppercase tracking-widest text-white/60">
                      <Check className="w-4 h-4 text-accent" /> {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
