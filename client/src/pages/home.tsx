import { Navbar, Footer } from "@/components/layout/shell";
import { TextReveal, FadeIn } from "@/components/ui/motion";
import { ProjectCard } from "@/components/ui/project-card";
import heroTexture from "@assets/generated_images/dark_abstract_digital_fluid_background_with_neon_accents.png";
import project1 from "@assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png";
import project2 from "@assets/generated_images/editorial_fashion_e-commerce_website_design.png";
import project3 from "@assets/generated_images/futuristic_fintech_mobile_app_interface.png";
import { motion } from "framer-motion";
import { ArrowRight, Code, Layers, Zap, PenTool } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <img src={heroTexture} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="container mx-auto px-6 z-10">
          <div className="max-w-5xl">
            <h1 className="text-[12vw] md:text-[8vw] leading-[0.85] font-display font-bold uppercase mb-8 tracking-tighter">
              <TextReveal>We Craft</TextReveal> <br />
              <TextReveal className="text-stroke text-transparent">Frontend</TextReveal> <br />
              <TextReveal>Excellence</TextReveal>
            </h1>
            
            <FadeIn delay={0.4} className="max-w-xl ml-2 md:ml-4">
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 font-light">
                We are a specialized creative agency building high-end interfaces, landing pages, and digital experiences. No backend bloat. Just pure, polished frontend.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/contact">
                  <a className="group flex items-center justify-center gap-3 bg-accent text-accent-foreground px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all">
                    Start a Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Link>
                <Link href="/work">
                  <a className="flex items-center justify-center gap-3 border border-white/20 px-8 py-4 font-bold uppercase tracking-wider hover:bg-white/5 transition-all">
                    View Work
                  </a>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-6 md:left-1/2 md:-translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-accent to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Scroll</span>
        </motion.div>
      </section>

      {/* Services Ticker / Marquee */}
      <div className="border-y border-white/5 py-6 overflow-hidden bg-black">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-12 mx-6">
              <span className="text-4xl font-display font-bold text-white/20 uppercase">Next.js Specialists</span>
              <span className="text-accent text-2xl">●</span>
              <span className="text-4xl font-display font-bold text-white/20 uppercase">Creative Frontend</span>
              <span className="text-accent text-2xl">●</span>
              <span className="text-4xl font-display font-bold text-white/20 uppercase">Interactive Design</span>
              <span className="text-accent text-2xl">●</span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Work */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-20">
            <div>
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">Selected Work</h2>
                <div className="h-1 w-20 bg-accent" />
              </FadeIn>
            </div>
            <FadeIn delay={0.2} className="hidden md:block">
              <Link href="/work">
                <a className="text-lg uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2">
                  All Projects <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            <FadeIn delay={0.1} className="md:mt-0">
              <ProjectCard 
                title="Fintech Future" 
                category="App Interface" 
                image={project3} 
                id="1" 
              />
            </FadeIn>
            <FadeIn delay={0.3} className="md:mt-24">
              <ProjectCard 
                title="Luxe Commerce" 
                category="E-commerce Website" 
                image={project2} 
                id="2" 
              />
            </FadeIn>
            <FadeIn delay={0.1}>
              <ProjectCard 
                title="SaaS Analytics" 
                category="Dashboard UI" 
                image={project1} 
                id="3" 
              />
            </FadeIn>
             <div className="flex flex-col justify-center items-start md:pl-12">
                <h3 className="text-4xl font-display font-bold mb-6">Not just pixels. <br/><span className="text-accent">Logic.</span></h3>
                <p className="text-muted-foreground text-lg mb-8 max-w-md">
                  We don't just design. We build production-ready frontends that developers love to inherit. Clean components, type-safe props, and perfect responsiveness.
                </p>
                <Link href="/services">
                  <a className="text-accent uppercase tracking-widest hover:underline">Read about our process</a>
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-32 bg-secondary/30 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
               <FadeIn>
                 <span className="text-accent uppercase tracking-widest text-sm font-bold mb-4 block">Our Expertise</span>
                 <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
                   We speak <br/>
                   <span className="text-stroke text-transparent">Interface.</span>
                 </h2>
               </FadeIn>
               <FadeIn delay={0.2}>
                 <p className="text-xl text-muted-foreground max-w-lg">
                   We bridge the gap between "Creative Design" and "Engineering". We are the specialized partner for companies who need their frontend to be world-class.
                 </p>
               </FadeIn>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
               {[
                 { icon: Code, title: "Development", desc: "React, Next.js, Tailwind, Typescript. Clean, semantic, accessible code." },
                 { icon: Zap, title: "Motion", desc: "Framer Motion, GSAP, WebGL. Interactions that feel natural and premium." },
                 { icon: Layers, title: "Design Systems", desc: "Scalable component libraries, tokens, and style guides." },
                 { icon: PenTool, title: "Creative", desc: "Art direction, visual assets, and high-conversion layouts." },
               ].map((item, i) => (
                 <FadeIn key={i} delay={0.2 + (i * 0.1)} className="bg-background/50 border border-white/5 p-8 hover:border-accent/50 transition-colors group">
                   <item.icon className="w-10 h-10 text-white mb-6 group-hover:text-accent transition-colors" />
                   <h3 className="text-xl font-bold mb-4 font-display">{item.title}</h3>
                   <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                 </FadeIn>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto / Process */}
      <section className="py-40 border-t border-white/5">
        <div className="container mx-auto px-6 text-center">
           <FadeIn>
             <h2 className="text-[6vw] leading-none font-display font-bold uppercase mb-12 opacity-20">
               Design <span className="opacity-0">.</span> Build <span className="opacity-0">.</span> Ship
             </h2>
           </FadeIn>
           <FadeIn delay={0.2}>
             <p className="text-2xl md:text-4xl font-light max-w-4xl mx-auto leading-tight">
               "We don't just hand off Figma files. We hand off <span className="text-white font-medium">deployed, polished, pixel-perfect code</span> that is ready for your backend team to hook up."
             </p>
           </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
