import { Navbar, Footer } from "@/components/layout/shell";
import { FadeIn, TextReveal, ParallaxImage, InlineVisual } from "@/components/ui/motion";
import { Check, ArrowRight } from "lucide-react";
import project1 from "@assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png";
import torus from "@assets/generated_images/neon_lime_3d_abstract_torus_shape.png";

export default function Services() {
  return (
    <div className="min-h-screen bg-background pt-32">
      <Navbar />

      <div className="container mx-auto px-6 mb-24">
         <h1 className="text-[10vw] font-display font-bold uppercase leading-[0.85] mb-12">
          <TextReveal>Web Design</TextReveal> <br/>
          <div className="flex items-center flex-wrap">
            <span className="text-stroke text-transparent"><TextReveal>Services</TextReveal></span>
            <InlineVisual src={torus} alt="Affordable web design services icon" className="w-[1em] h-[0.5em] rounded-full mx-4" delay={0.4} />
          </div>
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
            tags: ["Next.js", "SEO", "CMS Integration", "WebGL"],
            image: project1
          },
          {
            title: "SaaS & App Interfaces",
            desc: "Complex dashboards and application UIs that feel like native apps. We handle the state, the interactions, and the component architecture.",
            tags: ["React", "Dashboard", "Data Viz", "State Management"],
             image: project1
          },
          {
            title: "Design Systems",
            desc: "We build scalable component libraries that ensure consistency across your entire product suite.",
            tags: ["Storybook", "Tokens", "Accessibility", "Documentation"],
             image: project1
          },
          {
            title: "Motion & Interaction",
            desc: "Adding that layer of 'feel' that separates good products from great ones. Micro-interactions, page transitions, and scroll effects.",
            tags: ["Framer Motion", "GSAP", "Lottie", "3D"],
             image: project1
          }
        ].map((service, i) => (
          <div key={i} className="group border-b border-white/10 relative overflow-hidden transition-colors hover:bg-white/5">
            <div className="container mx-auto px-6 py-12 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 relative z-10">
              <div className="md:col-span-4">
                <span className="text-accent font-mono text-sm mb-2 md:mb-4 block">0{i + 1}</span>
                <h2 className="text-2xl md:text-5xl font-display font-bold uppercase group-hover:translate-x-4 transition-transform duration-500">
                  {service.title}
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-base md:text-xl text-muted-foreground leading-relaxed group-hover:text-white transition-colors duration-500">{service.desc}</p>
              </div>
              <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
                 <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-4 group-hover:translate-x-0 transform mb-8">
                     <ArrowRight className="w-12 h-12 text-accent" />
                 </div>
                <ul className="flex flex-wrap md:flex-col gap-2 md:space-y-3">
                  {service.tags.map(tag => (
                    <li key={tag} className="flex items-center gap-2 md:gap-3 text-xs md:text-sm uppercase tracking-widest text-white/60">
                      <Check className="w-3 h-3 md:w-4 md:h-4 text-accent" /> {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Hover Image Reveal - subtle background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none mix-blend-overlay">
                <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent" />
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
