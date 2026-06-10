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
import industryTech from "@assets/generated_images/industry_tech_saas.png";
import industryEcommerce from "@assets/generated_images/industry_ecommerce_retail.png";
import industryFood from "@assets/generated_images/industry_restaurant_food.png";
import industryRealEstate from "@assets/generated_images/industry_real_estate.png";
import industryHealth from "@assets/generated_images/industry_health_wellness.png";
import industryProfessional from "@assets/generated_images/industry_professional_services.png";


import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Code, Layers, Zap, PenTool, Star, Globe, Cpu, MousePointer2, CreditCard, FileText, Video, Clock, CheckCircle2, ExternalLink, Sparkles, Target, Shield, Gift, Rocket, Check, Calendar, Search, Megaphone, TrendingUp, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import { useRef, useEffect, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

function IframePreview({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.35);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setScale(containerWidth / 1440);
    }
  }, []);

  useEffect(() => {
    updateScale();
    const resizeObs = new ResizeObserver(updateScale);
    if (containerRef.current) resizeObs.observe(containerRef.current);
    return () => resizeObs.disconnect();
  }, [updateScale]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); io.disconnect(); } },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !isLoaded) {
      const t = setTimeout(() => setIsLoaded(true), 8000);
      return () => clearTimeout(t);
    }
  }, [isVisible, isLoaded]);

  return (
    <div ref={containerRef} className="relative w-full aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
        </div>
      )}
      {isVisible && (
        <iframe
          src={url}
          title={title}
          className={`absolute top-0 left-0 w-[1440px] h-[900px] pointer-events-none border-0 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}

const portfolioCategories = [
  { 
    category: "SaaS", 
    description: "Powerful software platforms with stunning interfaces and seamless user experiences",
    color: "from-violet-500/20 to-blue-500/20",
    sites: [
      { name: "Postphoria", desc: "Social media management platform", url: "https://postphoria.com/", embeddable: true, features: ["Dashboard", "Analytics", "Scheduling"] },
      { name: "SocialProofly", desc: "Social proof & conversion optimization tool", url: "https://socialproofly.com/", embeddable: true, features: ["Notifications", "Integrations", "A/B Testing"] },
      { name: "Analyio", desc: "Website analytics & tracking platform", url: "https://analyio.com/", embeddable: true, features: ["Real-time Data", "Heatmaps", "Funnels"] },
      { name: "FlowCapture", desc: "Lead capture & form builder platform", url: "https://flowcapture.creatifia.com/", embeddable: true, features: ["Form Builder", "Lead Capture", "Integrations"] }
    ]
  },
  { 
    category: "E-Commerce", 
    description: "Beautiful online stores that turn browsers into buyers",
    color: "from-amber-500/20 to-orange-500/20",
    sites: [
      { name: "Marble & Bone", desc: "Premium pet accessories brand", url: "https://marbleandbone.creatifia.com/", embeddable: true, features: ["Product Catalog", "Checkout", "Brand Story"] }
    ]
  },
  { 
    category: "Food & Beverage", 
    description: "Mouth-watering designs that drive reservations and orders",
    color: "from-orange-500/20 to-red-500/20",
    sites: [
      { name: "NY Slice", desc: "Authentic New York style pizza", url: "https://nyslice.creatifia.com/", embeddable: true, features: ["Online Menu", "Order Online", "Location"] },
      { name: "Komorebi", desc: "Japanese-inspired dining experience", url: "https://komorebi.creatifia.com/", embeddable: true, features: ["Menu", "Reservations", "Atmosphere"] }
    ]
  }
];

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  publishedAt: string;
}

function LatestBlogSection() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/latest"],
    queryFn: async () => {
      const res = await fetch("/api/blog/latest?limit=3");
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return res.json();
    }
  });

  if (isLoading || !posts || posts.length === 0) return null;

  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(145,255,0,0.05),transparent_60%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <FadeIn>
            <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
              Blog & Insights
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Web Design <span className="text-accent">Insights</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Expert advice on web design, performance, and building websites that convert.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          {posts.map((post, index) => {
            const date = new Date(post.publishedAt);
            const formattedDate = date.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            });

            return (
              <FadeIn key={post.id} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <div 
                    className="group bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500 h-full flex flex-col"
                    data-testid={`home-blog-card-${post.slug}`}
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-accent">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Calendar className="w-3 h-3" />
                        {formattedDate}
                      </div>
                      
                      <h3 className="text-base font-display font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-accent text-xs font-medium group-hover:gap-2 gap-1.5 transition-all duration-300 mt-3">
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <div className="text-center">
          <FadeIn delay={0.3}>
            <Link href="/blog">
              <button 
                data-testid="view-all-articles-button"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-bold text-sm hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              >
                View All Articles
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");

  const allSites = portfolioCategories.flatMap(cat =>
    cat.sites.map(site => ({ ...site, category: cat.category }))
  );

  const filteredSites = activeCategory === "all"
    ? allSites
    : portfolioCategories[activeCategory].sites.map(site => ({ ...site, category: portfolioCategories[activeCategory].category }));

  const displaySites = filteredSites.slice(0, 4);
  const hasMore = filteredSites.length > 4;

  const description = activeCategory === "all"
    ? "Our complete collection of stunning, story-driven websites"
    : portfolioCategories[activeCategory].description;

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(145,255,0,0.05),transparent_50%)]" />
      <div className="absolute top-40 left-10 w-24 h-24 border border-white/5 rounded-full hidden md:block" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <FadeIn>
            <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Websites We <span className="text-accent">Create</span>
            </h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Browse our work by industry. Each site is built with our story-driven approach.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 mb-8 md:mb-10">
            <button
              data-testid="tab-category-all"
              onClick={() => setActiveCategory("all")}
              className={`px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wide rounded-full transition-all duration-300 ${
                activeCategory === "all"
                  ? 'bg-accent text-black'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20'
              }`}
            >
              All
            </button>
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
          key={String(activeCategory)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8 text-center">
            <p className="text-muted-foreground text-lg">{description}</p>
          </div>
          
          <div className={`grid grid-cols-1 ${displaySites.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2 max-w-5xl mx-auto'} gap-5`}>
            {displaySites.map((site, siteIdx) => (
              <div key={`${site.name}-${siteIdx}`} data-testid={`card-portfolio-${activeCategory}-${siteIdx}`} className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-500">
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="block relative overflow-hidden">
                  {site.embeddable ? (
                    <IframePreview url={site.url} title={site.name} />
                  ) : (
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] flex items-center justify-center">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(145,255,0,0.08),transparent_70%)]" />
                      <div className="absolute top-0 left-0 right-0 h-8 bg-[#1a1a1a] flex items-center px-3 gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-red-500/60" />
                          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                          <div className="w-2 h-2 rounded-full bg-green-500/60" />
                        </div>
                        <div className="flex-1 mx-2 h-4 bg-white/10 rounded flex items-center px-2">
                          <span className="text-[7px] text-white/40 font-mono truncate">{site.url}</span>
                        </div>
                      </div>
                      <div className="text-center z-10 pt-4">
                        <div className="text-5xl md:text-6xl font-display font-black text-accent/20 mb-2">{site.name.charAt(0)}</div>
                        <p className="text-white/80 font-display font-bold text-base md:text-lg">{site.name}</p>
                        <p className="text-white/40 text-[10px] mt-1 flex items-center gap-1 justify-center">
                          <ExternalLink className="w-3 h-3" /> Click to visit live site
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1.5">
                    {site.features.map((feature, fIdx) => (
                      <span key={fIdx} className="text-[10px] bg-black/60 backdrop-blur-sm text-white/90 px-2 py-0.5 rounded-full border border-white/10">{feature}</span>
                    ))}
                  </div>
                </a>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base md:text-lg font-display font-bold text-white">{site.name}</h4>
                    <span className="text-[10px] font-mono text-accent uppercase tracking-wide">{site.category}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">{site.desc}</p>
                  <div className="flex gap-2.5">
                    <a 
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`button-preview-${activeCategory}-${siteIdx}`}
                      className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-white/20 transition-colors rounded-full"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Visit Site
                    </a>
                    <Link 
                      href="/contact"
                      data-testid={`button-request-similar-${activeCategory}-${siteIdx}`}
                      className="flex items-center gap-1.5 bg-accent text-black px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-white transition-colors rounded-full"
                    >
                      Request Similar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/work"
              data-testid="link-view-all-work"
              className="inline-flex items-center gap-2 bg-accent text-black px-6 py-3 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors rounded-full"
            >
              View All Work
              <ExternalLink className="w-4 h-4" />
            </Link>
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
          <img src={heroTexture} alt="Affordable website design dark abstract background" className="w-full h-full object-cover" loading="eager" decoding="async" />
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
                    <img src={portraitWoman} alt="Professional web designer creating affordable websites for small businesses" className="w-full shadow-2xl rounded-lg border-2 border-white/60" loading="lazy" decoding="async" />
                 </motion.div>
                 <motion.div 
                   style={{ x: mouseX, y: mouseY }}
                   className="absolute top-[5%] right-[-3%] rotate-[8deg] w-[6vw] pointer-events-auto hover:rotate-[2deg] transition-transform duration-500 hover:scale-110 hover:z-50"
                 >
                    <img src={artFrame} alt="Modern website design showcase for startups" className="w-full shadow-2xl rounded-lg border-2 border-accent/60" loading="lazy" decoding="async" />
                 </motion.div>
                 <motion.div 
                   style={{ x: mouseX, y: mouseY }}
                   className="absolute bottom-[15%] right-[-8%] rotate-[-6deg] w-[8vw] pointer-events-auto hover:rotate-[0deg] transition-transform duration-500 hover:scale-110 hover:z-50"
                 >
                    <img src={abstractArt} alt="Creative budget-friendly web design services" className="w-full shadow-2xl rounded-lg border-2 border-white/60" loading="lazy" decoding="async" />
                 </motion.div>
             </div>

             {/* Badge */}
             <FadeIn delay={0.2} className="mb-6">
               <div className="inline-flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-full px-4 py-2">
                 <span className="text-accent font-bold text-sm md:text-base">Creative & Growth Studio</span>
                 <span className="text-white/40">|</span>
                 <span className="text-white/80 text-sm md:text-base">Design + Marketing</span>
                 <span className="text-white/40">|</span>
                 <span className="text-white/80 text-sm md:text-base">🇺🇸 Made in USA</span>
               </div>
             </FadeIn>

             {/* Main Headline - SEO-optimized H1 with creative typography */}
             <div className="relative z-10 w-full mb-8">
                <FadeIn delay={0.3}>
                  <h1 className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0" style={{ clip: 'rect(0, 0, 0, 0)' }}>
                    Créatifia - Website Design, Content, SEO & PPC Studio | One Subscription That Grows Your Business
                  </h1>
                  <div className="text-center space-y-1">
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display uppercase text-white leading-[1.3] tracking-[0.15em]">
                      <span className="font-light">Transforming</span>{" "}
                      <span className="font-black text-accent">Ideas</span>
                    </p>
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display uppercase leading-[1.3]">
                        <span className="font-light text-white/50 tracking-[0.2em]">into</span>
                      </p>
                      <motion.div 
                        className="relative group cursor-pointer"
                        whileHover={{ scale: 1.15, rotate: 3 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div className="w-12 h-6 md:w-16 md:h-8 lg:w-20 lg:h-10 rounded-full border-2 border-accent overflow-hidden shadow-[0_0_20px_rgba(145,255,0,0.4)] group-hover:shadow-[0_0_40px_rgba(145,255,0,0.7)] transition-shadow duration-300">
                          <img 
                            src={portrait} 
                            alt="Créatifia founder - affordable monthly website subscription service" 
                            className="w-full h-full object-cover object-center"
                            loading="eager"
                            decoding="async"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-accent/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
                      </motion.div>
                      <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display leading-[1.3]">
                        <span className="italic font-light text-white/80 tracking-tight lowercase">real world</span>
                      </p>
                    </div>
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display leading-[1.2] mt-1">
                      <span className="font-black text-accent uppercase tracking-widest">Stories</span>
                    </p>
                  </div>
                </FadeIn>
             </div>

             {/* Subheadline */}
             <FadeIn delay={0.5} className="mb-8">
               <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                 We build stunning websites — then fuel them with content, SEO, and paid ads.
                 <span className="text-white font-medium"> One team. One subscription. Everything you need to grow.</span>
               </p>
             </FadeIn>
            
             {/* CTAs */}
             <FadeIn delay={0.7} className="relative z-30">
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link href="/auth" data-testid="button-hero-cta-primary" className="group relative flex items-center justify-center gap-3 bg-accent text-black px-8 py-4 font-bold uppercase tracking-wide overflow-hidden rounded-full w-full sm:w-auto shadow-[0_0_40px_rgba(145,255,0,0.5)] hover:shadow-[0_0_60px_rgba(145,255,0,0.8)] transition-all duration-500">
                   Start Your Project
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </Link>
                 <Link href="/work" data-testid="button-hero-examples" className="group flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-white/20 transition-all duration-300 rounded-full w-full sm:w-auto">
                   See Our Work
                 </Link>
               </div>
               <div className="mt-4">
                 <Link href="/work" data-testid="link-browse-templates" className="text-muted-foreground hover:text-accent transition-colors text-sm underline underline-offset-4">
                   Explore Design Styles
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
              <span className="text-xl md:text-4xl font-display font-black text-accent uppercase tracking-wide">Made in USA 🇺🇸</span>
              <span className="text-accent text-2xl md:text-4xl">✦</span>
              <span className="text-xl md:text-4xl font-display font-black text-white uppercase tracking-wide">Stunning Websites</span>
              <span className="text-accent text-2xl md:text-4xl">✦</span>
              <span className="text-xl md:text-4xl font-display font-black text-accent uppercase tracking-wide">SEO That Ranks</span>
              <span className="text-white text-2xl md:text-4xl">✦</span>
              <span className="text-xl md:text-4xl font-display font-black text-white uppercase tracking-wide">PPC That Converts</span>
              <span className="text-accent text-2xl md:text-4xl">✦</span>
              <span className="text-xl md:text-4xl font-display font-black text-accent uppercase tracking-wide">Content That Sells</span>
              <span className="text-white text-2xl md:text-4xl">✦</span>
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
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-black uppercase leading-[1.1] mb-8">
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
                    <div className="text-xl md:text-3xl font-display font-black text-accent">{stat.number}</div>
                    <div className="text-xs md:text-sm uppercase tracking-widest text-white/60 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* UI/UX Focus Section */}
      <section className="py-20 md:py-32 bg-secondary/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            <div className="text-center mb-16 md:mb-24">
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">What We Do</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Built to Stun. <span className="text-accent">Engineered to Grow.</span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                A beautiful website is just the beginning. We run the full growth stack — design, content, SEO, and paid ads — under one roof.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
             {[
               { icon: Layers, title: "Web Design & UX", desc: "Stunning, story-driven interfaces that capture your brand and turn visitors into customers", color: "hover:border-accent/50" },
               { icon: Globe, title: "Development", desc: "Pixel-perfect, lightning-fast builds on modern technology — 100 Lighthouse scores, flawless on every device", color: "hover:border-blue-500/50" },
               { icon: PenTool, title: "Content Creation", desc: "Conversion copy, blog articles, and landing pages written in your brand voice — content that sells", color: "hover:border-purple-500/50" },
               { icon: Search, title: "SEO", desc: "Technical SEO, keyword strategy, and local search domination so customers find you first on Google", color: "hover:border-accent/50" },
               { icon: Megaphone, title: "PPC & Paid Ads", desc: "Google & Meta campaigns managed end-to-end — any ad budget, no management caps, relentless optimization", color: "hover:border-blue-500/50" },
               { icon: BarChart3, title: "Analytics & CRO", desc: "Tracking, reporting, and conversion optimization — every decision backed by data, every month better than the last", color: "hover:border-purple-500/50" },
             ].map((item, i) => (
               <FadeIn key={i} delay={i * 0.1}>
                 <div className={`group relative border border-white/10 bg-background/50 p-8 md:p-10 rounded-lg transition-all duration-500 hover:bg-white/5 ${item.color}`}>
                   <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="w-6 h-6 text-accent" />
                   </div>
                   <h3 className="text-xl md:text-2xl font-display font-bold mb-3">{item.title}</h3>
                   <p className="text-muted-foreground text-base leading-relaxed">{item.desc}</p>
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
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">The Growth Bundle</span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4">
                One Bundle. One Price. <span className="text-accent">Everything.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stunning website + content + SEO + PPC — your entire online presence, handled by one team. Cancel anytime.
              </p>
            </FadeIn>
          </div>

          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="bg-white/5 border-2 border-accent/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-accent text-black px-4 py-1 text-xs font-bold uppercase rounded-bl-xl">The Only Plan</div>

                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl md:text-6xl font-display font-black text-accent">$799</span>
                    <span className="text-xl text-white/60">/month</span>
                  </div>
                  <p className="text-white/80">Website + Content + SEO + PPC. One flat price. 🇺🇸 Made in USA.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Sparkles, text: "Stunning Custom Website" },
                    { icon: PenTool, text: "Content Creation Included" },
                    { icon: Search, text: "Full SEO — Rank & Grow" },
                    { icon: Megaphone, text: "PPC Management — Any Budget" },
                    { icon: Globe, text: "Premium Hosting Included" },
                    { icon: Layers, text: "Unlimited Updates & Changes" },
                    { icon: Check, text: "99.9% Uptime Guarantee" },
                    { icon: Check, text: "Cancel Anytime, Keep Your Site" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/90">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-accent" />
                      </div>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Link href="/auth" data-testid="button-offer-cta" className="btn-glow group relative inline-flex items-center gap-3 bg-accent text-black px-12 py-5 text-lg font-black uppercase tracking-wide overflow-hidden rounded-full transition-all duration-500 hover:scale-105">
                    <span className="relative z-10 flex items-center gap-3">
                      Start Your Project
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <p className="text-white/40 text-sm mt-4">First draft in 5 days. Cancel anytime.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* The Growth Engine */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(145,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(145,255,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">How It Compounds</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                The Créatifia <span className="text-accent">Growth Engine</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-2xl mx-auto">
                Most agencies sell you pieces. We run the whole machine — each part feeding the next, compounding month after month.
              </p>
            </FadeIn>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Connecting line (desktop) */}
            <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {[
                {
                  icon: Rocket,
                  phase: "01 — Launch",
                  title: "Stunning Website",
                  desc: "A story-driven, conversion-engineered site that makes your brand impossible to ignore.",
                  points: ["Custom design", "5-day first draft", "Blazing fast"],
                },
                {
                  icon: TrendingUp,
                  phase: "02 — Attract",
                  title: "Content + SEO",
                  desc: "Fresh content and relentless SEO pull in customers who are already searching for you.",
                  points: ["Keyword strategy", "Blog & landing copy", "Local SEO"],
                },
                {
                  icon: Target,
                  phase: "03 — Convert",
                  title: "PPC That Pays",
                  desc: "Google & Meta campaigns managed with surgical precision — any budget, zero management caps.",
                  points: ["Google & Meta Ads", "Retargeting", "A/B testing"],
                },
                {
                  icon: BarChart3,
                  phase: "04 — Scale",
                  title: "Data & Iterate",
                  desc: "We measure everything, double down on what works, and keep your growth curve bending up.",
                  points: ["Monthly reporting", "CRO", "Unlimited updates"],
                },
              ].map((step, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className="group relative h-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:border-accent/40 hover:bg-accent/[0.04] transition-all duration-500 hover:-translate-y-1">
                    <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(145,255,0,0.3)] transition-all duration-500 relative z-10 bg-background">
                      <step.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-[10px] font-mono text-accent/70 uppercase tracking-widest mb-2">{step.phase}</div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{step.desc}</p>
                    <ul className="space-y-1.5">
                      {step.points.map((p, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-white/70">
                          <Check className="w-3 h-3 text-accent flex-shrink-0" /> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.5} className="mt-12 text-center">
            <p className="text-white/50 text-sm mb-5 italic">All four. One team. One $799/month subscription.</p>
            <Link href="/auth" data-testid="button-growth-engine-cta" className="btn-glow group relative inline-flex items-center gap-3 bg-accent text-black px-10 py-4 text-base font-black uppercase tracking-wide overflow-hidden rounded-full transition-all duration-500 hover:scale-105">
              <span className="relative z-10 flex items-center gap-3">
                Start Growing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Portfolio / Website Examples Section */}
      <PortfolioSection />

      {/* Templates Section */}
      <section id="industries" className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(145,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(145,255,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <FadeIn>
              <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">Industries</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                Industries We <span className="text-accent">Serve</span>
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                We craft stunning websites for businesses across every industry. Here's where we shine.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[
              { name: "Tech & SaaS", tagline: "Powerful platforms, stunning interfaces", image: industryTech },
              { name: "E-Commerce & Retail", tagline: "Stores that turn browsers into buyers", image: industryEcommerce },
              { name: "Restaurants & Food", tagline: "Designs that drive reservations & orders", image: industryFood },
              { name: "Real Estate & Property", tagline: "Listings that sell themselves", image: industryRealEstate },
              { name: "Health & Wellness", tagline: "Experiences that inspire trust & care", image: industryHealth },
              { name: "Professional Services", tagline: "Credibility that converts visitors", image: industryProfessional },
            ].map((industry, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <Link 
                  href="/contact"
                  data-testid={`card-industry-${i}`} 
                  className="group block bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-accent/30 hover:bg-accent/5 transition-all duration-500"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={industry.image} 
                      alt={`${industry.name} website design`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
                  <div className="p-4 md:p-5">
                    <h4 className="text-sm md:text-base font-display font-bold text-white group-hover:text-accent transition-colors">{industry.name}</h4>
                    <p className="text-[11px] md:text-xs text-muted-foreground mt-1">{industry.tagline}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="mt-10 text-center">
            <Link href="/contact" data-testid="button-describe-industry" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors text-sm underline underline-offset-4">
              Don't see your industry? Tell us about your business
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

      {/* How It Works - $799 Process */}
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
                From signup to growth in 5 simple steps.
              </p>
            </FadeIn>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
              {[
                { Icon: FileText, step: "1", title: "Fill Brief" },
                { Icon: Video, step: "2", title: "Zoom Call" },
                { Icon: CreditCard, step: "3", title: "Subscribe" },
                { Icon: Clock, step: "4", title: "5-Day Draft" },
                { Icon: Rocket, step: "5", title: "Launch & Grow" },
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
            <Link href="/auth" data-testid="button-start-project" className="btn-glow btn-creative group relative inline-flex items-center gap-4 bg-accent text-black px-12 py-6 text-lg font-black uppercase tracking-wider overflow-hidden rounded-full transition-all duration-500 hover:scale-110">
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-4">
                <span className="w-3 h-3 bg-black rounded-full animate-pulse" />
                Start My Project
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>
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
              { quote: "The quality blew me away. Got my restaurant website in 4 days and reservations are up 40%!", author: "Maria Santos", role: "Owner, Bella Cucina" },
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
                  Why <span className="text-accent">Créatifia</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  We combine creative excellence with full-stack marketing to deliver brands that stand out — and keep growing.
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Made in USA", desc: "100% American team. No outsourcing, ever." },
                { title: "All-Inclusive", desc: "Design, hosting, content, SEO, and PPC — your entire online presence, handled." },
                { title: "Always Growing", desc: "Unlimited updates, fresh content, and campaigns optimized every single month." },
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
              { q: "What's included in the subscription?", a: "Everything — your custom website, premium hosting, unlimited updates, content creation, full SEO, and PPC campaign management. All for one flat $799/month. Cancel anytime and keep your website hosted." },
              { q: "Is ad spend included in PPC management?", a: "We manage your campaigns end-to-end with no caps — any budget, unlimited optimization. Your actual ad spend is paid directly to Google/Meta, so you keep full control of it." },
              { q: "Do you write the content too?", a: "Yes — website copy, landing pages, and blog articles, all written in your brand voice and optimized to rank and convert." },
              { q: "How long until I see my first draft?", a: "5 business days. Most clients are amazed at the speed." },
              { q: "What if I need changes?", a: "Unlimited revisions included until you're 100% satisfied." },
              { q: "Can I schedule a Zoom call?", a: "Yes! After your brief, schedule a free call to discuss details." },
              { q: "When do I pay?", a: "After you complete your brief and discovery call — so we fully understand your business before a dollar changes hands." },
              { q: "Can I cancel anytime?", a: "Yes! Cancel anytime with no penalties. Your website stays hosted even after you cancel." },
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

      {/* Latest Blog Posts */}
      <LatestBlogSection />

      {/* Pronunciation Section */}
      <section className="py-10 md:py-16 bg-black relative overflow-hidden border-y border-white/5">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col items-center justify-center gap-3 md:gap-4 text-center">
              <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                <span className="text-white/40 text-xs uppercase tracking-widest">How to say it:</span>
                <span className="text-lg md:text-xl font-display font-bold text-white">
                  kray-ah-tee-<span className="text-accent">FEE</span>-ah
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-1 md:gap-3">
                <span className="text-white/40 text-xs uppercase tracking-widest">Meaning:</span>
                <span className="text-sm md:text-base text-white/80 italic">
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
             <h2 className="text-2xl md:text-4xl lg:text-5xl leading-none font-display font-bold mb-6">
               Ready to Build Something <span className="text-accent">Stunning?</span>
             </h2>
           </FadeIn>
           <FadeIn delay={0.2}>
             <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
               A website that tells your story — backed by content, SEO, and ads that grow it. First draft in 5 days.
             </p>
           </FadeIn>
           
           <FadeIn delay={0.4}>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link href="/auth" data-testid="button-final-cta" className="group relative flex items-center gap-3 bg-accent text-black px-10 py-5 md:px-12 md:py-6 text-base font-bold uppercase tracking-wide overflow-hidden rounded-full shadow-[0_0_50px_rgba(145,255,0,0.6)] hover:shadow-[0_0_80px_rgba(145,255,0,0.9)] transition-all duration-500">
                 Start Your Project
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
