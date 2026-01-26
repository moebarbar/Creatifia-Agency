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
import abstractArt from "@assets/generated_images/artistic_eye_white_background.png";


import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Code, Layers, Zap, PenTool, Star, Globe, Cpu, MousePointer2, CreditCard, FileText, Video, Clock, CheckCircle2, ExternalLink, Sparkles, Target, Shield, Gift, Rocket } from "lucide-react";
import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";

const portfolioCategories = [
  { 
    category: "Restaurant & Food", 
    description: "Mouth-watering designs that drive reservations and orders",
    color: "from-orange-500/20 to-red-500/20",
    sites: [
      { name: "Bella Cucina", desc: "Fine dining Italian restaurant", features: ["Online Reservations", "Menu Showcase", "Chef Profiles"] },
      { name: "Fresh Bites", desc: "Modern healthy cafe", features: ["Order Online", "Nutrition Info", "Loyalty Program"] }
    ]
  },
  { 
    category: "Real Estate", 
    description: "Premium property showcases that convert browsers into buyers",
    color: "from-blue-500/20 to-cyan-500/20",
    sites: [
      { name: "Luxe Properties", desc: "High-end real estate agency", features: ["Property Search", "Virtual Tours", "Agent Directory"] },
      { name: "Urban Living", desc: "Modern apartment rentals", features: ["Floor Plans", "Amenities", "Application Portal"] }
    ]
  },
  { 
    category: "Fitness & Wellness", 
    description: "Energetic sites that inspire action and membership signups",
    color: "from-green-500/20 to-emerald-500/20",
    sites: [
      { name: "Peak Performance", desc: "Premium fitness studio", features: ["Class Booking", "Trainer Bios", "Membership Plans"] },
      { name: "Zen Studio", desc: "Yoga and meditation center", features: ["Schedule", "Online Classes", "Retreat Booking"] }
    ]
  },
  { 
    category: "Professional Services", 
    description: "Trust-building sites for consultants, lawyers, and agencies",
    color: "from-purple-500/20 to-pink-500/20",
    sites: [
      { name: "Sterling Law", desc: "Corporate law firm", features: ["Practice Areas", "Case Studies", "Free Consultation"] },
      { name: "Growth Partners", desc: "Business consulting agency", features: ["Services", "Client Results", "Contact Form"] }
    ]
  }
];

function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const currentCategory = portfolioCategories[activeCategory];

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(145,255,0,0.05),transparent_50%)]" />
      <div className="absolute top-40 left-10 w-24 h-24 border border-white/5 rounded-full hidden md:block" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <FadeIn>
            <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Website <span className="text-accent">Examples</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Browse our work by industry. Each site is built with our story-driven approach.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-8 md:mb-10">
            {portfolioCategories.map((cat, idx) => (
              <button
                key={idx}
                data-testid={`tab-category-${idx}`}
                onClick={() => setActiveCategory(idx)}
                className={`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wide rounded-full transition-all duration-300 ${
                  activeCategory === idx
                    ? 'bg-accent text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </FadeIn>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8 text-center">
            <p className="text-muted-foreground text-lg">{currentCategory.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {currentCategory.sites.map((site, siteIdx) => (
              <div key={siteIdx} data-testid={`card-portfolio-${activeCategory}-${siteIdx}`} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500">
                <div className={`relative h-[200px] md:h-[280px] overflow-hidden bg-gradient-to-br ${currentCategory.color} m-3 rounded-xl flex items-center justify-center`}>
                  <div className="text-center p-6">
                    <div className="text-6xl md:text-8xl font-display font-black text-white/10 group-hover:text-white/20 transition-colors mb-4">
                      {site.name.charAt(0)}
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      {site.features.map((feature, fIdx) => (
                        <span key={fIdx} className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full">{feature}</span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg md:text-xl font-display font-bold text-white">{site.name}</h4>
                    <span className="text-xs font-mono text-accent uppercase">{currentCategory.category.split(' ')[0]}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{site.desc}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      href="/work"
                      data-testid={`button-preview-${activeCategory}-${siteIdx}`}
                      className="flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-white/20 transition-colors rounded-full"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Details
                    </Link>
                    <Link 
                      href="/contact"
                      data-testid={`button-request-similar-${activeCategory}-${siteIdx}`}
                      className="flex items-center justify-center gap-2 bg-accent text-black px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors rounded-full"
                    >
                      Request Similar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

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
             
             {/* Floating Frames - Creative placement at edges */}
             <div className="absolute inset-0 pointer-events-none z-20 hidden md:block">
                 <motion.div 
                   style={{ x: mouseX, y: mouseY }}
                   className="absolute top-[8%] left-[-5%] rotate-[-12deg] w-[7vw] pointer-events-auto hover:rotate-[-5deg] transition-transform duration-500 hover:scale-110 hover:z-50"
                 >
                    <img src={portraitWoman} alt="Team" className="w-full shadow-2xl rounded-lg border-2 border-white/60" loading="eager" decoding="async" />
                 </motion.div>
                 <motion.div 
                   style={{ x: mouseX, y: mouseY }}
                   className="absolute top-[5%] right-[-3%] rotate-[8deg] w-[6vw] pointer-events-auto hover:rotate-[2deg] transition-transform duration-500 hover:scale-110 hover:z-50"
                 >
                    <img src={artFrame} alt="Art" className="w-full shadow-2xl rounded-lg border-2 border-accent/60" loading="eager" decoding="async" />
                 </motion.div>
                 <motion.div 
                   style={{ x: mouseX, y: mouseY }}
                   className="absolute bottom-[15%] right-[-8%] rotate-[-6deg] w-[8vw] pointer-events-auto hover:rotate-[0deg] transition-transform duration-500 hover:scale-110 hover:z-50"
                 >
                    <img src={abstractArt} alt="Creative" className="w-full shadow-2xl rounded-lg border-2 border-white/60" loading="eager" decoding="async" />
                 </motion.div>
             </div>

             {/* Price Badge */}
             <FadeIn delay={0.2} className="mb-6">
               <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-full px-4 py-2">
                 <span className="text-accent font-bold text-sm md:text-base">$299 Flat Rate</span>
                 <span className="text-white/40">|</span>
                 <span className="text-white/80 text-sm md:text-base">First Draft in 5 Days</span>
               </div>
             </FadeIn>

             {/* Main Headline - Creative Typography with inline portrait */}
             <div className="relative z-10 w-full mb-8">
                <FadeIn delay={0.3}>
                  <div className="text-center space-y-1">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display uppercase text-white leading-[1.3] tracking-[0.15em]">
                      <span className="font-light">Transforming</span>{" "}
                      <span className="font-black text-accent">Ideas</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display uppercase leading-[1.3]">
                        <span className="font-light text-white/50 tracking-[0.2em]">into</span>
                      </h1>
                      <motion.div 
                        className="relative group cursor-pointer"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <img 
                          src={portrait} 
                          alt="Developer" 
                          className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-cover rounded-full border-2 border-accent shadow-[0_0_20px_rgba(145,255,0,0.4)] group-hover:shadow-[0_0_40px_rgba(145,255,0,0.7)] transition-shadow duration-300"
                          loading="eager"
                          decoding="async"
                        />
                        <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
                      </motion.div>
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display leading-[1.3]">
                        <span className="italic font-light text-white/80 tracking-tight lowercase">real world</span>
                      </h1>
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display leading-[1.2] mt-1">
                      <span className="font-black text-accent uppercase tracking-widest">Stories</span>
                    </h1>
                  </div>
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
      <div className="border-y border-accent/20 py-5 md:py-6 overflow-hidden bg-black -rotate-1 scale-105 z-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none" />
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-6 md:gap-12 mx-4 md:mx-8">
              <span className="text-xl md:text-4xl font-display font-black text-accent uppercase tracking-wide">Next.js Specialists</span>
              <span className="text-accent text-2xl md:text-4xl">✦</span>
              <span className="text-xl md:text-4xl font-display font-black text-white uppercase tracking-wide">Creative Development</span>
              <span className="text-accent text-2xl md:text-4xl">✦</span>
              <span className="text-xl md:text-4xl font-display font-black text-accent uppercase tracking-wide">Interactive Engineering</span>
              <span className="text-white text-2xl md:text-4xl">✦</span>
              <span className="text-xl md:text-4xl font-display font-black text-white uppercase tracking-wide">$299 Websites</span>
              <span className="text-accent text-2xl md:text-4xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bold Statement Section */}
      <section className="py-20 md:py-32 bg-background relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(145,255,0,0.08),transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-black uppercase leading-[1.1] mb-8">
                <span className="text-white/40">Your website is your</span>{" "}
                <span className="text-white">first impression.</span>
                <br />
                <span className="text-accent">Make it count.</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                In 5 seconds, visitors decide if they trust you. We craft websites that capture attention, build trust, and drive action.
              </p>
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {[
                  { number: "0.05s", label: "First Impression" },
                  { number: "94%", label: "Design-Based Trust" },
                  { number: "3x", label: "Higher Conversion" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 md:px-8 md:py-6">
                    <div className="text-2xl md:text-4xl font-display font-black text-accent">{stat.number}</div>
                    <div className="text-xs md:text-sm uppercase tracking-widest text-white/60 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
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
            <Link href="/contact" data-testid="button-offer-cta" className="inline-flex items-center gap-3 bg-accent text-black px-8 py-4 font-bold uppercase tracking-wide hover:bg-white hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(145,255,0,0.4)]">
              Get My Website for $299
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Portfolio / Website Examples Section */}
      <PortfolioSection />

      {/* Templates Section */}
      <section id="templates" className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(145,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(145,255,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">Templates</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Choose Your <span className="text-accent">Style</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                Start with a template that matches your vision. We'll customize it for you.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              { name: "Bold & Minimal", industry: "Tech Startups" },
              { name: "Elegant Flow", industry: "Luxury Brands" },
              { name: "Dynamic Energy", industry: "Fitness & Sports" },
              { name: "Trust Builder", industry: "Professional Services" },
              { name: "Artisan Craft", industry: "Restaurants & Cafes" },
              { name: "Urban Modern", industry: "Real Estate" },
            ].map((template, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <Link 
                  href="/contact"
                  data-testid={`card-template-${i}`} 
                  className="group block bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-6 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-white/5 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl md:text-5xl font-display font-black text-white/10 group-hover:text-accent/30 transition-colors">
                      {template.name.charAt(0)}
                    </div>
                  </div>
                  <span className="text-[10px] md:text-xs font-mono text-accent uppercase tracking-widest">{template.industry}</span>
                  <h4 className="text-sm md:text-base font-display font-bold text-white mt-1">{template.name}</h4>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="mt-10 text-center">
            <Link href="/contact" data-testid="button-describe-vision" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm underline underline-offset-4">
              Don't see your style? Describe your vision
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Story-Driven Method Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">Our Philosophy</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                The Story-Driven <span className="text-accent">Method</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                We engineer experiences that guide visitors from curiosity to conversion.
              </p>
            </FadeIn>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {[
              { step: "Hook", color: "border-red-400/30 text-red-400" },
              { step: "Trust", color: "border-blue-400/30 text-blue-400" },
              { step: "Proof", color: "border-green-400/30 text-green-400" },
              { step: "Offer", color: "border-amber-400/30 text-amber-400" },
              { step: "Action", color: "border-accent/30 text-accent" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className={`group flex items-center gap-3 px-5 py-3 md:px-6 md:py-4 rounded-full border bg-white/[0.02] hover:bg-white/5 transition-all duration-300 ${item.color}`}>
                  <span className="text-xs font-mono text-white/40">{i + 1}</span>
                  <span className="font-display font-bold text-sm md:text-base">{item.step}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.5} className="mt-12 text-center">
            <p className="text-lg md:text-xl text-white/60 italic max-w-2xl mx-auto">
              "Every element moves visitors closer to becoming customers."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* How It Works - $299 Process */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-20 right-20 w-16 h-16 border border-accent/10 rounded-full hidden md:block" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">Simple Process</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                How It <span className="text-accent">Works</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-lg mx-auto">
                From payment to launch in 5 simple steps.
              </p>
            </FadeIn>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
              {[
                { Icon: CreditCard, step: "1", title: "Pay $299" },
                { Icon: FileText, step: "2", title: "Fill Brief" },
                { Icon: Video, step: "3", title: "Zoom Call" },
                { Icon: Clock, step: "4", title: "5-Day Draft" },
                { Icon: CheckCircle2, step: "5", title: "Launch" },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="group text-center p-5 md:p-6 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-accent/20 transition-all duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/10 transition-colors">
                      <item.Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Step {item.step}</div>
                    <h3 className="text-sm md:text-base font-display font-bold text-white">{item.title}</h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.5} className="mt-10 text-center">
            <Link href="/contact" data-testid="button-start-project" className="inline-flex items-center gap-3 bg-accent text-black px-8 py-4 font-bold uppercase tracking-wide hover:bg-white hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_30px_rgba(145,255,0,0.4)]">
              Start My Project for $299
              <ArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <h2 className="text-2xl md:text-4xl font-display font-bold mb-4">
                Built With <span className="text-accent">Modern Tools</span>
              </h2>
            </FadeIn>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-3xl mx-auto">
            {["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Node.js"].map((tech, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="px-5 py-2.5 md:px-6 md:py-3 rounded-full border border-white/10 bg-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                  <span className="text-sm md:text-base font-medium text-white/80">{tech}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(145,255,0,0.08),transparent_60%)]" />
        <div className="absolute top-20 right-20 w-32 h-32 border border-accent/10 rounded-full hidden md:block" />
        <div className="absolute bottom-20 left-20 w-20 h-20 border border-white/5 rounded-full hidden md:block" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">Testimonials</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                What Founders <span className="text-accent">Say</span>
              </h2>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { quote: "I couldn't believe the quality for $299. Got my restaurant website in 4 days and reservations are up 40%!", author: "Maria Santos", role: "Owner, Bella Cucina" },
              { quote: "The story-driven approach made all the difference. My coaching business finally has a website that converts.", author: "James Mitchell", role: "Founder, Peak Performance" },
              { quote: "Fast, professional, and they actually listened. The Zoom call was super helpful. Highly recommend!", author: "Ashley Park", role: "CEO, Bloom Studios" },
            ].map((testimonial, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 h-full flex flex-col hover:border-accent/20 transition-all duration-500">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-white/80 leading-relaxed mb-6 flex-1">"{testimonial.quote}"</p>
                  <div className="pt-4 border-t border-white/5">
                    <div className="font-display font-bold text-white text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <FadeIn>
                <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">Why Us</span>
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                  Not Your Average <span className="text-accent">Dev Shop</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Designers who code. Developers who design. No hand-offs, no miscommunication.
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Pixel-Perfect", desc: "We match designs down to the last pixel." },
                { title: "Performance First", desc: "Sub-second loads. 90+ Lighthouse scores." },
                { title: "Future-Proof", desc: "Clean, documented, maintainable code." },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group text-center p-6 md:p-8 bg-white/[0.02] border border-white/10 rounded-2xl hover:border-accent/20 transition-all duration-500">
                    <div className="w-3 h-3 bg-accent rounded-full mx-auto mb-4 group-hover:scale-150 transition-transform" />
                    <h4 className="text-lg font-display font-bold mb-2">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(145,255,0,0.03),transparent_70%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">FAQ</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold">
                Common <span className="text-accent">Questions</span>
              </h2>
            </FadeIn>
          </div>

          <div className="max-w-2xl mx-auto space-y-3">
            {[
              { q: "What's included in the $299?", a: "Custom design, responsive development, basic SEO, and deployment. No hidden costs." },
              { q: "How long until I see my first draft?", a: "5 business days. Most clients are amazed at the speed." },
              { q: "What if I need changes?", a: "Unlimited revisions included until you're 100% satisfied." },
              { q: "What does 'any website' mean?", a: "Landing pages, portfolios, restaurants, real estate, fitness, services — any website (not web apps)." },
              { q: "Can I schedule a Zoom call?", a: "Yes! After your brief, schedule a free call to discuss details." },
              { q: "What happens after I pay?", a: "You'll get a link to fill out your project brief, then we start working." },
              { q: "Do you offer ongoing support?", a: "Yes! Maintenance packages from $49/month available." },
              { q: "What if I'm not satisfied?", a: "100% money-back guarantee within 14 days of your first draft." },
            ].map((faq, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <details className="group bg-white/[0.02] border border-white/10 rounded-xl hover:border-accent/20 transition-all duration-300">
                  <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none">
                    <h3 className="text-sm md:text-base font-display font-bold pr-4">{faq.q}</h3>
                    <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-open:rotate-45 group-open:border-accent group-open:text-accent transition-all flex-shrink-0">
                      <span className="text-lg leading-none">+</span>
                    </div>
                  </summary>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground text-sm">
                    {faq.a}
                  </div>
                </details>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pronunciation Section */}
      <section className="py-12 md:py-16 bg-black relative overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-sm uppercase tracking-widest">How to say it:</span>
                <span className="text-xl md:text-2xl font-display font-bold text-white">
                  kray-ah-tee-<span className="text-accent">FEE</span>-ah
                </span>
              </div>
              <span className="hidden md:block text-white/20">|</span>
              <div className="flex items-center gap-3">
                <span className="text-white/40 text-sm uppercase tracking-widest">Meaning:</span>
                <span className="text-lg md:text-xl text-white/80 italic">
                  From <span className="text-accent font-medium not-italic">"créatif"</span> — creative in French
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-40 bg-background text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(145,255,0,0.1),transparent_50%)]" />
        <div className="absolute top-10 left-10 w-40 h-40 border border-accent/10 rounded-full hidden md:block" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/5 rounded-full hidden md:block" />
        <div className="absolute top-1/2 right-20 w-2 h-2 bg-accent rounded-full hidden md:block" />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-white/30 rounded-full hidden md:block" />

        <div className="container mx-auto px-6 relative z-10">
           <FadeIn>
             <h2 className="text-3xl md:text-5xl lg:text-6xl leading-none font-display font-bold mb-6">
               Ready for Your <span className="text-accent">$299</span> Website?
             </h2>
           </FadeIn>
           <FadeIn delay={0.2}>
             <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
               Join 150+ happy clients. First draft in 5 days.
             </p>
           </FadeIn>
           
           <FadeIn delay={0.4}>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link href="/contact" data-testid="button-final-cta" className="group flex items-center gap-3 bg-accent text-black px-8 py-4 md:px-10 md:py-5 text-base font-bold uppercase tracking-wide hover:bg-white hover:scale-105 transition-all duration-300 rounded-full shadow-[0_0_40px_rgba(145,255,0,0.5)]">
                 Get My Website for $299
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
               <Link href="/work" data-testid="link-view-examples-final" className="text-white/60 hover:text-accent transition-colors text-sm underline underline-offset-4">
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
