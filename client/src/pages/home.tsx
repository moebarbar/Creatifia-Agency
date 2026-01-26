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
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex flex-col justify-center items-center pt-20 md:pt-24 pb-8 overflow-hidden text-center">
        {/* Background Texture */}
        <motion.div 
            style={{ x: mouseX, y: mouseY }}
            className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none scale-110"
        >
          <img src={heroTexture} alt="" className="w-full h-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </motion.div>

        <div className="container mx-auto px-6 z-10 relative">
          <div className="max-w-4xl mx-auto relative">
             
             {/* Floating Frames - Desktop only for cleaner mobile */}
             <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
                 <div className="absolute top-[-10%] left-[-15%] rotate-[-12deg] w-[10vw] pointer-events-auto hover:rotate-[-5deg] transition-transform duration-500 hover:scale-110 hover:z-50 group">
                    <img src={portraitWoman} alt="Team" className="w-full shadow-2xl rounded-sm border-4 border-white transform hover:translate-y-[-10px]" loading="eager" decoding="async" />
                 </div>
                 <div className="absolute bottom-[-20%] right-[-10%] rotate-[8deg] w-[12vw] pointer-events-auto hover:rotate-[0deg] transition-transform duration-500 hover:scale-110 hover:z-50 group">
                    <img src={cyberpunkFrame} alt="Creative" className="w-full shadow-2xl rounded-sm border-4 border-white" loading="eager" decoding="async" />
                 </div>
             </div>

             {/* Price Badge */}
             <FadeIn delay={0.2} className="mb-6">
               <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-full px-4 py-2">
                 <span className="text-accent font-bold text-sm md:text-base">$299 Flat Rate</span>
                 <span className="text-white/40">|</span>
                 <span className="text-white/80 text-sm md:text-base">First Draft in 5 Days</span>
               </div>
             </FadeIn>

             {/* Main Headline - Reduced size */}
             <div className="flex flex-col items-center justify-center relative z-10 w-full mb-6">
                <FadeIn delay={0.3}>
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-black uppercase text-white leading-[1.1] mb-4">
                    We Don't Build Websites.
                  </h1>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-black uppercase leading-[1.1]">
                    We Create <span className="text-accent">Stories.</span>
                  </h2>
                </FadeIn>
             </div>

             {/* Subheadline */}
             <FadeIn delay={0.5} className="mb-8">
               <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                 Premium, story-driven websites that convert visitors into customers. 
                 <span className="text-white font-medium"> Any website. One flat price. Delivered fast.</span>
               </p>
             </FadeIn>
            
             {/* CTAs */}
             <FadeIn delay={0.7} className="relative z-30">
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link href="/contact" data-testid="button-hero-cta-primary" className="group flex items-center justify-center gap-3 bg-accent text-black px-8 py-4 font-bold uppercase tracking-wide hover:bg-white hover:scale-105 transition-all duration-300 rounded-full w-full sm:w-auto shadow-[0_0_30px_rgba(145,255,0,0.4)]">
                   Get My Website for $299
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Link>
                 <Link href="/work" data-testid="button-hero-examples" className="group flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-white/20 transition-all duration-300 rounded-full w-full sm:w-auto">
                   See Website Examples
                 </Link>
               </div>
               <div className="mt-4">
                 <Link href="/work" data-testid="link-browse-templates" className="text-muted-foreground hover:text-accent transition-colors text-sm underline underline-offset-4">
                   Browse Templates
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
      <div className="border-y border-white/5 py-6 md:py-8 overflow-hidden bg-black -rotate-1 scale-105 z-20 relative">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-8 md:gap-16 mx-4 md:mx-8">
              <span className="text-2xl md:text-5xl font-display font-bold text-transparent text-stroke uppercase hover:text-white transition-colors cursor-default">Next.js Specialists</span>
              <img src={sphere} className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full animate-pulse" loading="lazy" decoding="async" />
              <span className="text-2xl md:text-5xl font-display font-bold text-transparent text-stroke uppercase hover:text-white transition-colors cursor-default">Creative Development</span>
              <img src={torus} className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-full animate-spin-slow" loading="lazy" decoding="async" />
              <span className="text-2xl md:text-5xl font-display font-bold text-transparent text-stroke uppercase hover:text-white transition-colors cursor-default">Interactive Engineering</span>
              <img src={card} className="w-10 h-6 md:w-16 md:h-10 object-cover rounded border border-accent/50" loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Work - Asymmetrical Layout */}
      <section className="py-20 md:py-40 bg-background relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 md:mb-32">
            <div>
              <FadeIn>
                <h2 className="text-[8vw] md:text-[5vw] leading-[0.9] font-display font-bold mb-4 uppercase">
                  Selected <br/> <span className="text-accent pl-4 md:pl-20">Work</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2} className="hidden md:block max-w-sm text-right">
              <p className="text-muted-foreground text-lg mb-6">
                A curation of our finest digital experiences. Award-winning sites, complex dashboards, and next-gen apps.
              </p>
              <Link href="/work" className="inline-block border-b border-accent text-accent uppercase tracking-widest pb-1 hover:text-white hover:border-white transition-colors">
                View Full Archive
              </Link>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-16 md:gap-32">
             {/* Project 1 - Full Width Parallax */}
             <div className="group relative">
                <Link href="/work" className="block">
                  <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg">
                    <ParallaxImage src={project3} alt="Fintech App" className="w-full h-full" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center">
                      <h3 className="text-4xl md:text-9xl font-display font-bold text-transparent text-stroke opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0">
                        FINTECH
                      </h3>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 border-b border-white/10 pb-6">
                    <h3 className="text-2xl md:text-3xl font-display font-bold">Neo Bank App</h3>
                    <p className="font-mono text-accent uppercase text-xs md:text-sm">Fintech / Mobile / React</p>
                  </div>
                </Link>
             </div>

             {/* Projects 2 & 3 - Staggered Grid */}
             <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div className="md:col-span-5 md:col-start-2">
                    <ProjectCard 
                        title="Luxe Commerce" 
                        category="E-commerce" 
                        image={project2} 
                        id="2" 
                        className="aspect-[4/5]"
                    />
                </div>
                <div className="md:col-span-6 md:col-start-7 md:pt-20">
                     <FadeIn delay={0.2}>
                         <div className="mb-8 md:mb-12">
                            <h3 className="text-2xl md:text-4xl font-display font-bold mb-4">Detail Oriented.</h3>
                            <p className="text-muted-foreground text-base md:text-lg">
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
      <section className="py-20 md:py-32 bg-secondary/20 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="mb-12 md:mb-24 text-center">
             <FadeIn>
               <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest mb-6">Capabilities</span>
               <h2 className="text-4xl md:text-8xl font-display font-bold">
                 Beyond <span className="text-transparent text-stroke">Templates.</span>
               </h2>
             </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-1">
             {[
               { icon: Globe, title: "Websites", desc: "Award-winning creative sites", color: "hover:bg-red-500/10 hover:border-red-500/50" },
               { icon: Cpu, title: "Web Apps", desc: "Complex, data-heavy dashboards", color: "hover:bg-blue-500/10 hover:border-blue-500/50" },
               { icon: Layers, title: "Systems", desc: "Scalable component libraries", color: "hover:bg-accent/10 hover:border-accent/50" },
             ].map((item, i) => (
               <FadeIn key={i} delay={i * 0.1} className={`group relative border border-white/10 bg-background/50 p-8 md:p-12 h-[280px] md:h-[400px] flex flex-col justify-between transition-all duration-500 ${item.color}`}>
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                 </div>
                 
                 <div>
                    <h3 className="text-2xl md:text-4xl font-display font-bold mb-2 md:mb-4">{item.title}</h3>
                    <p className="text-muted-foreground text-base md:text-lg opacity-60 group-hover:opacity-100 transition-opacity">{item.desc}</p>
                 </div>

                 <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45" />
                 </div>
               </FadeIn>
             ))}
          </div>
        </div>
      </section>

      {/* The Offer Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-background border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(145,255,0,0.05),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">The Offer</span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4">
                One Price. Any Website. <span className="text-accent">$299.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                No hidden fees. No hourly rates. Just a beautiful, story-driven website delivered in 5 days.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:border-accent/30 transition-colors">
                <div className="text-4xl md:text-5xl font-display font-black text-accent mb-2">$299</div>
                <div className="text-white font-bold mb-2">Flat Rate</div>
                <p className="text-muted-foreground text-sm">Any website, any complexity. One transparent price.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:border-accent/30 transition-colors">
                <div className="text-4xl md:text-5xl font-display font-black text-accent mb-2">5</div>
                <div className="text-white font-bold mb-2">Days to First Draft</div>
                <p className="text-muted-foreground text-sm">See your vision come to life in less than a week.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 text-center hover:border-accent/30 transition-colors">
                <div className="text-4xl md:text-5xl font-display font-black text-accent mb-2">∞</div>
                <div className="text-white font-bold mb-2">Revisions</div>
                <p className="text-muted-foreground text-sm">We iterate until you're 100% satisfied.</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.5} className="mt-12 text-center">
            <Link href="/contact" className="inline-flex items-center gap-3 bg-accent text-black px-8 py-4 font-bold uppercase tracking-wide hover:bg-white hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(145,255,0,0.4)]">
              Get My Website for $299
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <FadeIn delay={0} className="text-center">
              <div className="text-3xl md:text-5xl font-display font-black">
                <span className="text-accent">150</span><span className="text-white">+</span>
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground mt-3">Websites Launched</div>
            </FadeIn>
            <FadeIn delay={0.1} className="text-center">
              <div className="text-3xl md:text-5xl font-display font-black">
                <span className="text-white">98</span><span className="text-accent">%</span>
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground mt-3">Happy Clients</div>
            </FadeIn>
            <FadeIn delay={0.2} className="text-center">
              <div className="text-3xl md:text-5xl font-display font-black">
                <span className="text-accent">5</span><span className="text-white"> Days</span>
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground mt-3">Avg Delivery</div>
            </FadeIn>
            <FadeIn delay={0.3} className="text-center">
              <div className="text-3xl md:text-5xl font-display font-black">
                <span className="text-white">24</span><span className="text-accent">/7</span>
              </div>
              <div className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground mt-3">Support</div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How We Work - Process */}
      <section className="py-20 md:py-40 bg-background relative">
        <div className="container mx-auto px-6">
          <div className="mb-16 md:mb-24">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest mb-6">Process</span>
              <h2 className="text-4xl md:text-7xl font-display font-bold">
                How We <span className="text-accent">Build</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {[
              { step: "01", title: "Discovery", desc: "We dive deep into your vision and goals. Understanding your brand is key.", icon: "🎯" },
              { step: "02", title: "Design", desc: "High-fidelity mockups and prototypes. See exactly what you're getting.", icon: "✏️" },
              { step: "03", title: "Develop", desc: "Clean, performant code. React, Next.js, TypeScript — built to scale.", icon: "⚡" },
              { step: "04", title: "Deploy", desc: "Launch day! We handle hosting and make sure it's blazing fast.", icon: "🚀" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative border border-white/10 bg-secondary/20 p-6 md:p-10 hover:border-accent/50 transition-all duration-500">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="text-4xl md:text-6xl font-display font-black text-white/10 group-hover:text-accent/30 transition-colors">{item.step}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                        <span className="text-xl md:text-2xl">{item.icon}</span>
                        <h3 className="text-xl md:text-3xl font-display font-bold">{item.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm md:text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 md:py-32 bg-secondary/10 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest mb-6">Tech Stack</span>
              <h2 className="text-4xl md:text-7xl font-display font-bold mb-6">
                Built With <span className="text-accent">Modern</span> Tools
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                We use the latest technologies to ensure your project is fast, scalable, and future-proof.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-6">
            {[
              { name: "React", color: "from-cyan-500/20 to-cyan-500/5" },
              { name: "Next.js", color: "from-white/20 to-white/5" },
              { name: "TypeScript", color: "from-blue-500/20 to-blue-500/5" },
              { name: "Tailwind", color: "from-teal-500/20 to-teal-500/5" },
              { name: "Framer", color: "from-pink-500/20 to-pink-500/5" },
              { name: "Node.js", color: "from-green-500/20 to-green-500/5" },
            ].map((tech, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className={`group relative p-4 md:p-8 rounded-xl border border-white/10 bg-gradient-to-br ${tech.color} hover:border-white/30 hover:scale-105 transition-all duration-300 text-center`}>
                  <div className="text-sm md:text-xl font-display font-bold">{tech.name}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-40 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none -translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 md:mb-24">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest mb-6">Testimonials</span>
              <h2 className="text-4xl md:text-7xl font-display font-bold">
                What Founders <span className="text-accent">Say</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {[
              { quote: "PixelPerfect turned our sketches into a stunning landing page in just 2 weeks. World-class execution.", author: "Sarah Chen", role: "CEO, TechFlow", rating: 5 },
              { quote: "They don't just code — they think. Every interaction was thoughtfully considered.", author: "Marcus Johnson", role: "Founder, Elevate", rating: 5 },
              { quote: "A dev team that speaks both design and engineering fluently. Pure collaboration.", author: "Elena Rodriguez", role: "CPO, Quantum Labs", rating: 5 },
            ].map((testimonial, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="group relative border border-white/10 bg-secondary/20 p-6 md:p-10 h-full flex flex-col hover:border-accent/30 transition-colors duration-500">
                  <div className="flex gap-1 mb-4 md:mb-6">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 md:w-5 md:h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-base md:text-xl text-white/90 leading-relaxed mb-6 md:mb-8 flex-1">"{testimonial.quote}"</p>
                  <div className="border-t border-white/10 pt-4 md:pt-6">
                    <div className="font-display font-bold text-white text-sm md:text-base">{testimonial.author}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <FadeIn>
                <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest mb-6">Why Us</span>
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
                  Not Your Average <span className="text-accent">Dev Shop</span>
                </h2>
                <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
                  We're a tight-knit team of designers who code and developers who design. No hand-offs, no miscommunication — just seamless execution from concept to launch.
                </p>
              </FadeIn>
              
              <div className="space-y-6">
                {[
                  { title: "Pixel-Perfect Execution", desc: "We match designs down to the last pixel. No compromises." },
                  { title: "Performance Obsessed", desc: "Sub-second load times. 90+ Lighthouse scores. Always." },
                  { title: "Future-Proof Code", desc: "Clean, documented, maintainable. Your next dev will thank you." },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="flex gap-4 items-start group">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 group-hover:scale-150 transition-transform" />
                      <div>
                        <h4 className="text-lg md:text-xl font-display font-bold mb-1">{item.title}</h4>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            <FadeIn delay={0.3}>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-accent/20 via-transparent to-blue-500/20 rounded-3xl border border-white/10 p-8 md:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-8xl md:text-[12rem] font-display font-black text-transparent text-stroke opacity-20">PP</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-2xl md:text-4xl font-display font-bold">
                        <span className="text-white">Pixel</span><span className="text-accent">Perfect</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-background border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 md:mb-24">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest mb-6">FAQ</span>
              <h2 className="text-4xl md:text-6xl font-display font-bold">
                Common <span className="text-accent">Questions</span>
              </h2>
            </FadeIn>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
            {[
              { q: "What's included in the $299?", a: "Everything you need for a complete, professional website: custom design, responsive development, basic SEO setup, and deployment. No hidden costs." },
              { q: "How long until I see my first draft?", a: "We deliver your first draft within 5 business days. Most clients are amazed at how quickly their vision comes to life." },
              { q: "What if I need changes?", a: "Unlimited revisions are included! We keep iterating until you're 100% satisfied with the result." },
              { q: "What types of websites do you build?", a: "Landing pages, portfolio sites, small business websites, personal brands, SaaS marketing pages - if it's a website, we can build it." },
              { q: "Do you offer ongoing support?", a: "Yes! We offer affordable monthly maintenance packages to keep your site updated, secure, and running smoothly." },
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <details className="group border border-white/10 bg-secondary/10 hover:border-white/20 transition-colors">
                  <summary className="flex items-center justify-between p-4 md:p-8 cursor-pointer list-none">
                    <h3 className="text-base md:text-xl font-display font-bold pr-4">{faq.q}</h3>
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-white/20 flex items-center justify-center group-open:rotate-45 transition-transform flex-shrink-0">
                      <span className="text-lg md:text-xl leading-none">+</span>
                    </div>
                  </summary>
                  <div className="px-4 md:px-8 pb-4 md:pb-8 text-muted-foreground text-sm md:text-lg">
                    {faq.a}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gradient-radial from-accent/20 to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
           <FadeIn>
             <h2 className="text-4xl md:text-6xl lg:text-7xl leading-none font-display font-bold uppercase mb-6 md:mb-8">
               Ready for Your <span className="text-accent">$299</span> Website?
             </h2>
           </FadeIn>
           <FadeIn delay={0.2}>
             <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 px-4">
               Join 150+ happy clients who got their dream website without breaking the bank. First draft in 5 days.
             </p>
           </FadeIn>
           
           <FadeIn delay={0.4}>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link href="/contact" className="group flex items-center gap-3 bg-accent text-black px-8 md:px-10 py-5 md:py-6 text-base md:text-lg font-bold uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_40px_rgba(145,255,0,0.5)]">
                 Get My Website for $299
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link href="/work" className="text-white/70 hover:text-accent transition-colors underline underline-offset-4">
                 View Examples First
               </Link>
             </div>
           </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
