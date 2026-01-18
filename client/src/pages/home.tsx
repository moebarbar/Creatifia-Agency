import { Navbar, Footer } from "@/components/layout/shell";
import { TextReveal, FadeIn, InlineVisual, ParallaxImage, Magnetic, FloatingSticker } from "@/components/ui/motion";
import { ProjectCard } from "@/components/ui/project-card";
import heroTexture from "@assets/generated_images/dark_abstract_digital_fluid_background_with_neon_accents.png";
import project1 from "@assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png";
import project2 from "@assets/generated_images/editorial_fashion_e-commerce_website_design.png";
import project3 from "@assets/generated_images/futuristic_fintech_mobile_app_interface.png";
import torus from "@assets/generated_images/neon_lime_3d_abstract_torus_shape.png";
import card from "@assets/generated_images/holographic_glass_ui_card_element.png";
import sphere from "@assets/generated_images/chrome_metal_sphere_with_reflection.png";
import portrait from "@assets/generated_images/edgy_monochrome_developer_portrait.png";
import portraitWoman from "@assets/generated_images/edgy_creative_woman_portrait_in_frame.png";
import artFrame from "@assets/generated_images/abstract_digital_art_in_frame.png";
import cyberpunkFrame from "@assets/generated_images/cyberpunk_creative_portrait_in_frame.png";


import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Code, Layers, Zap, PenTool, Star, Globe, Cpu, MousePointer2 } from "lucide-react";
import { Link } from "wouter";
import { useRef, useEffect } from "react";

export default function Home() {
  const containerRef = useRef(null);
  
  // Mouse parallax for hero
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    mouseX.set((clientX - centerX) / 50);
    mouseY.set((clientY - centerY) / 50);
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden" ref={containerRef} onMouseMove={handleMouseMove}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden text-center">
        {/* Background Texture */}
        <motion.div 
            style={{ x: mouseX, y: mouseY }}
            className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none scale-110"
        >
          <img src={heroTexture} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </motion.div>

        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-[95vw] mx-auto relative">
             
             {/* Floating Frames (Replacements for Stickers) */}
             <div className="absolute inset-0 pointer-events-none z-20">
                 {/* Top Left Frame */}
                 <div className="absolute top-[-5%] left-[5%] md:left-[10%] rotate-[-12deg] w-[15vw] md:w-[12vw] pointer-events-auto hover:rotate-[-5deg] transition-transform duration-500 hover:scale-110 hover:z-50 group">
                    <img src={portraitWoman} alt="Team" className="w-full shadow-2xl rounded-sm border-4 border-white transform hover:translate-y-[-10px]" />
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 text-xs font-mono text-accent uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Lead Engineer
                    </div>
                 </div>
                 
                 {/* Bottom Right Frame */}
                 <div className="absolute bottom-[-15%] right-[5%] md:right-[15%] rotate-[8deg] w-[18vw] md:w-[14vw] pointer-events-auto hover:rotate-[0deg] transition-transform duration-500 hover:scale-110 hover:z-50 group">
                    <img src={cyberpunkFrame} alt="Creative" className="w-full shadow-2xl rounded-sm border-4 border-white" />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 text-xs font-mono text-accent uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        React Expert
                    </div>
                 </div>

                 {/* Middle Right Frame */}
                 <div className="absolute top-[15%] right-[2%] md:right-[5%] rotate-[15deg] w-[12vw] md:w-[10vw] pointer-events-auto hover:rotate-[5deg] transition-transform duration-500 hover:scale-110 hover:z-50 group">
                    <img src={artFrame} alt="Art" className="w-full shadow-2xl rounded-sm border-4 border-white" />
                     <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/80 px-3 py-1 text-xs font-mono text-accent uppercase opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Pixel Perfect
                    </div>
                 </div>
             </div>

             <div className="flex flex-col items-center justify-center relative z-10 max-w-[80vw]">
                {/* Line 1 - Adjusted for containment */}
                <div className="flex items-center justify-center flex-wrap tracking-tight leading-[0.9] w-full mb-2">
                     <span className="text-[5vw] md:text-[6vw] font-display font-black uppercase text-white mix-blend-difference z-10">TRANSFORMING</span>
                </div>

                {/* Line 2 - Visible IDEAS + Portrait */}
                <div className="flex items-center justify-center flex-wrap tracking-tight leading-[0.9] gap-3 md:gap-5 relative z-10 mb-2">
                     <span className="text-[5vw] md:text-[6vw] font-display font-black uppercase text-white hover:text-accent transition-colors duration-300">IDEAS</span>
                     <Magnetic>
                        <div className="w-[8vw] h-[4vw] md:w-[6vw] md:h-[3vw] rounded-full overflow-hidden border-2 border-accent rotate-6 hover:rotate-0 transition-transform duration-500 z-30 relative">
                             <img src={portrait} alt="Portrait" className="w-full h-full object-cover scale-125" />
                        </div>
                     </Magnetic>
                     <span className="text-[5vw] md:text-[6vw] font-display font-black uppercase text-white">INTO</span>
                </div>

                {/* Line 3 - Removed Diamond, kept simple */}
                <div className="flex items-center justify-center flex-wrap tracking-tight leading-[0.9] gap-3 md:gap-5 relative z-10 mb-2">
                    <span className="text-[5vw] md:text-[6vw] font-display font-black uppercase text-accent">REAL</span>
                    <span className="text-[5vw] md:text-[6vw] font-display font-black uppercase text-white">WORLD</span>
                </div>

                 {/* Line 4 - Finish */}
                 <div className="flex items-center justify-center flex-wrap tracking-tight leading-[0.9] relative z-10">
                    <span className="text-[5vw] md:text-[6vw] font-display font-black uppercase text-white">RESULTS</span>
                </div>
             </div>
            
            <FadeIn delay={0.8} className="mt-12 md:mt-24 max-w-2xl mx-auto relative z-30 bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl">
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-8">
                We bridge the gap between <span className="text-white font-medium">Design</span> and <span className="text-accent font-medium">Engineering</span>. We turn ambitious visuals into clean, production-ready code.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/contact">
                  <a className="group flex items-center justify-center gap-3 bg-white text-black px-10 py-5 font-bold uppercase tracking-widest hover:bg-accent hover:scale-105 transition-all duration-300 rounded-full w-full sm:w-auto shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(145,255,0,0.5)]">
                    Start Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Link>
                <Link href="/work">
                  <a className="group flex items-center justify-center gap-3 px-8 py-5 font-bold uppercase tracking-widest hover:text-accent transition-colors">
                    View Archive
                    <div className="w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div 
            style={{ x: mouseX, y: mouseY }}
            className="absolute bottom-20 right-20 hidden md:block opacity-20 hover:opacity-100 transition-opacity duration-500"
        >
            <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-accent">
                <MousePointer2 className="w-4 h-4" />
                <span>Scroll to explore</span>
            </div>
        </motion.div>
      </section>

      {/* Services Ticker / Marquee */}
      <div className="border-y border-white/5 py-8 overflow-hidden bg-black -rotate-1 scale-105 z-20 relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-16 mx-8">
              <span className="text-5xl font-display font-bold text-transparent text-stroke uppercase hover:text-white transition-colors cursor-default">Next.js Specialists</span>
              <img src={sphere} className="w-12 h-12 object-cover rounded-full animate-pulse" />
              <span className="text-5xl font-display font-bold text-transparent text-stroke uppercase hover:text-white transition-colors cursor-default">Creative Development</span>
              <img src={torus} className="w-12 h-12 object-cover rounded-full animate-spin-slow" />
              <span className="text-5xl font-display font-bold text-transparent text-stroke uppercase hover:text-white transition-colors cursor-default">Interactive Engineering</span>
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
