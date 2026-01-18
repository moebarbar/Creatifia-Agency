import { Navbar, Footer } from "@/components/layout/shell";
import { TextReveal, FadeIn, InlineVisual, ParallaxImage } from "@/components/ui/motion";
import { ProjectCard } from "@/components/ui/project-card";
import heroTexture from "@assets/generated_images/dark_abstract_digital_fluid_background_with_neon_accents.png";
import project1 from "@assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png";
import project2 from "@assets/generated_images/editorial_fashion_e-commerce_website_design.png";
import project3 from "@assets/generated_images/futuristic_fintech_mobile_app_interface.png";
import torus from "@assets/generated_images/neon_lime_3d_abstract_torus_shape.png";
import card from "@assets/generated_images/holographic_glass_ui_card_element.png";
import sphere from "@assets/generated_images/chrome_metal_sphere_with_reflection.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code, Layers, Zap, PenTool, Star, Globe, Cpu } from "lucide-react";
import { Link } from "wouter";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
  });

  return (
    <div className="min-h-screen bg-background" ref={containerRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <img src={heroTexture} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </div>

        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-[11vw] md:text-[9vw] leading-[0.85] font-display font-bold uppercase mb-8 tracking-tighter">
               <div className="flex items-center flex-wrap">
                  <TextReveal>We Craft</TextReveal>
                  <InlineVisual src={torus} alt="Abstract 3D Shape" delay={0.5} className="w-[1.2em] h-[0.6em] rounded-full mx-2 md:mx-4 grayscale-0" />
               </div>
               <div className="flex items-center flex-wrap">
                  <span className="text-stroke text-transparent mr-4"><TextReveal>Frontend</TextReveal></span>
                  <InlineVisual src={card} alt="UI Card" delay={0.7} className="w-[1.5em] h-[0.7em] rounded-lg border border-accent/20" />
               </div>
               <div className="flex items-center flex-wrap">
                  <TextReveal>Excellence</TextReveal>
                  <motion.div 
                    initial={{ rotate: 0 }} 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="ml-4 md:ml-8 w-[0.8em] h-[0.8em] flex items-center justify-center border border-white/20 rounded-full"
                  >
                    <Star className="w-1/2 h-1/2 text-accent fill-accent" />
                  </motion.div>
               </div>
            </h1>
            
            <FadeIn delay={0.4} className="max-w-2xl ml-2 md:ml-4 flex flex-col md:flex-row gap-8 items-start md:items-end justify-between">
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed md:max-w-md">
                We are a specialized creative agency building high-end interfaces, landing pages, and digital experiences. <span className="text-white">No backend bloat.</span> Just pure, polished frontend.
              </p>
              
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <Link href="/contact">
                  <a className="group flex items-center justify-between gap-6 bg-accent text-accent-foreground px-8 py-4 font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all w-full md:w-auto">
                    Start a Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Link>
                <Link href="/work">
                  <a className="flex items-center justify-between gap-6 border border-white/20 px-8 py-4 font-bold uppercase tracking-wider hover:bg-white/5 transition-all w-full md:w-auto">
                    View Work
                    <span className="text-xs opacity-50">12 Projects</span>
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
          className="absolute bottom-10 left-6 md:left-10 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-accent to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground -rotate-90 origin-left translate-x-3 translate-y-3">Scroll</span>
        </motion.div>
      </section>

      {/* Services Ticker / Marquee */}
      <div className="border-y border-white/5 py-8 overflow-hidden bg-black rotate-1 scale-105 z-20 relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-16 mx-8">
              <span className="text-5xl font-display font-bold text-transparent text-stroke uppercase hover:text-white transition-colors cursor-default">Next.js Specialists</span>
              <img src={sphere} className="w-12 h-12 object-cover rounded-full animate-pulse" />
              <span className="text-5xl font-display font-bold text-transparent text-stroke uppercase hover:text-white transition-colors cursor-default">Creative Frontend</span>
              <img src={torus} className="w-12 h-12 object-cover rounded-full animate-spin-slow" />
              <span className="text-5xl font-display font-bold text-transparent text-stroke uppercase hover:text-white transition-colors cursor-default">Interactive Design</span>
              <img src={card} className="w-16 h-10 object-cover rounded border border-accent/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Work - Asymmetrical Layout */}
      <section className="py-40 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-32">
            <div>
              <FadeIn>
                <h2 className="text-[5vw] leading-[0.9] font-display font-bold mb-4 uppercase">
                  Selected <br/> <span className="text-accent pl-20">Work</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2} className="hidden md:block max-w-sm text-right">
              <p className="text-muted-foreground text-lg mb-6">
                A curation of our finest digital experiences. Award-winning sites, complex dashboards, and next-gen apps.
              </p>
              <Link href="/work">
                <a className="inline-block border-b border-accent text-accent uppercase tracking-widest pb-1 hover:text-white hover:border-white transition-colors">
                  View Full Archive
                </a>
              </Link>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-32">
             {/* Project 1 - Full Width Parallax */}
             <div className="group relative">
                <Link href="/work">
                   <a>
                     <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg">
                        <ParallaxImage src={project3} alt="Fintech App" className="w-full h-full" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
                            <h3 className="text-6xl md:text-9xl font-display font-bold text-transparent text-stroke opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                                FINTECH
                            </h3>
                        </div>
                     </div>
                     <div className="mt-6 flex justify-between items-baseline border-b border-white/10 pb-6">
                        <h3 className="text-3xl font-display font-bold">Neo Bank App</h3>
                        <p className="font-mono text-accent uppercase text-sm">Fintech / Mobile / React</p>
                     </div>
                   </a>
                </Link>
             </div>

             {/* Projects 2 & 3 - Staggered Grid */}
             <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-5 md:col-start-2">
                    <ProjectCard 
                        title="Luxe Commerce" 
                        category="E-commerce" 
                        image={project2} 
                        id="2" 
                        className="aspect-[4/5]"
                    />
                </div>
                <div className="md:col-span-6 md:col-start-7 pt-20">
                     <FadeIn delay={0.2}>
                         <div className="mb-12">
                            <h3 className="text-4xl font-display font-bold mb-4">Detail Oriented.</h3>
                            <p className="text-muted-foreground text-lg">
                                We obsess over the micro-interactions. The way a card lifts, the way text reveals, the physics of a scroll. It's not just about looking good, it's about feeling right.
                            </p>
                         </div>
                     </FadeIn>
                    <ProjectCard 
                        title="SaaS Analytics" 
                        category="Dashboard UI" 
                        image={project1} 
                        id="3" 
                    />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Expertise - Interactive Cards */}
      <section className="py-32 bg-secondary/20 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-24 text-center">
             <FadeIn>
               <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest mb-6">Capabilities</span>
               <h2 className="text-5xl md:text-8xl font-display font-bold">
                 Beyond <span className="text-transparent text-stroke">Templates.</span>
               </h2>
             </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
             {[
               { icon: Globe, title: "Websites", desc: "Award-winning creative sites", color: "hover:bg-red-500/10 hover:border-red-500/50" },
               { icon: Cpu, title: "Web Apps", desc: "Complex, data-heavy dashboards", color: "hover:bg-blue-500/10 hover:border-blue-500/50" },
               { icon: Layers, title: "Systems", desc: "Scalable component libraries", color: "hover:bg-accent/10 hover:border-accent/50" },
             ].map((item, i) => (
               <FadeIn key={i} delay={i * 0.1} className={`group relative border border-white/10 bg-background/50 p-12 h-[400px] flex flex-col justify-between transition-all duration-500 ${item.color}`}>
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-6 h-6 text-white" />
                 </div>
                 
                 <div>
                    <h3 className="text-4xl font-display font-bold mb-4">{item.title}</h3>
                    <p className="text-muted-foreground text-lg opacity-60 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                 </div>

                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-6 h-6 -rotate-45" />
                 </div>
               </FadeIn>
             ))}
          </div>
        </div>
      </section>

      {/* Manifesto / Process */}
      <section className="py-40 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/20 to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
           <FadeIn>
             <h2 className="text-[7vw] leading-none font-display font-bold uppercase mb-12">
               Design <span className="text-accent">.</span> Build <span className="text-accent">.</span> Ship
             </h2>
           </FadeIn>
           <FadeIn delay={0.2}>
             <p className="text-2xl md:text-5xl font-display font-bold max-w-5xl mx-auto leading-tight text-transparent text-stroke hover:text-white transition-colors duration-700 cursor-crosshair">
               "We don't just hand off Figma files. We hand off <span className="text-accent">deployed, polished, pixel-perfect code</span>."
             </p>
           </FadeIn>
           
           <div className="mt-20">
                <Link href="/contact">
                    <a className="inline-block bg-white text-black px-12 py-6 text-xl font-bold uppercase tracking-wider hover:bg-accent hover:scale-105 transition-all duration-300 rounded-full">
                        Let's Build Something Crazy
                    </a>
                </Link>
           </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
