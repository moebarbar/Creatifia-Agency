import { Navbar, Footer } from "@/components/layout/shell";
import { FadeIn, TextReveal } from "@/components/ui/motion";
import { useState, useRef, useEffect, useCallback, memo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, Globe, Layers, Zap, ChevronDown } from "lucide-react";

const IframePreview = memo(function IframePreview({ url, title }: { url: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.35);

  const updateScale = useCallback(() => {
    if (containerRef.current) {
      setScale(containerRef.current.offsetWidth / 1440);
    }
  }, []);

  useEffect(() => {
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [updateScale]);

  return (
    <div ref={containerRef} className="relative w-full aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
      <iframe
        src={url}
        title={title}
        className="absolute top-0 left-0 w-[1440px] h-[900px] pointer-events-none border-0"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
});

interface ProjectData {
  name: string;
  category: string;
  url: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  features: string[];
  industry: string;
  embeddable?: boolean;
}

const projectsData: ProjectData[] = [
  {
    name: "Postphoria",
    category: "SaaS",
    url: "https://postphoria.com/",
    tagline: "Social media management, simplified",
    description: "A comprehensive social media management platform built for teams and agencies who need powerful scheduling, analytics, and collaboration tools without the complexity.",
    challenge: "The client needed a platform that could compete with established players while offering a more intuitive interface that teams could adopt without training.",
    solution: "We designed a clean, dashboard-first experience with drag-and-drop scheduling, real-time analytics, and role-based team workflows — all wrapped in a modern dark UI that reduces eye strain during long work sessions.",
    results: ["40% faster onboarding vs competitors", "Dashboard-first UX design", "Real-time collaboration features"],
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "Tailwind CSS"],
    features: ["Dashboard", "Analytics", "Scheduling", "Team Collaboration"],
    industry: "Marketing Technology"
  },
  {
    name: "SocialProofly",
    category: "SaaS",
    url: "https://socialproofly.com/",
    tagline: "Turn visitors into customers with social proof",
    description: "A conversion optimization tool that displays real-time social proof notifications — recent purchases, signups, and reviews — to build trust and urgency on any website.",
    challenge: "The product needed to convey trust and credibility while also being a tool that creates trust. The website had to practice what the product preaches.",
    solution: "We built a high-converting landing page with live demo notifications, clear value propositions, and seamless onboarding. The design itself serves as social proof of what the product can achieve.",
    results: ["Conversion-optimized landing page", "Live notification demos", "One-click integration setup"],
    techStack: ["React", "TypeScript", "Express", "WebSockets", "Tailwind CSS"],
    features: ["Real-time Notifications", "A/B Testing", "Analytics Dashboard", "Easy Integration"],
    industry: "Conversion Optimization"
  },
  {
    name: "Analyio",
    category: "SaaS",
    url: "https://analyio.com/",
    tagline: "Website analytics that respect privacy",
    description: "A privacy-first website analytics platform offering real-time visitor data, heatmaps, and conversion funnels without invasive tracking or cookie banners.",
    challenge: "Analytics tools are inherently complex. The challenge was presenting deep data insights through an interface that feels simple and actionable, not overwhelming.",
    solution: "We created a data-dense yet visually clean dashboard with progressive disclosure — key metrics front and center, with deeper insights just one click away. The dark theme enhances data visualization contrast.",
    results: ["Clean data visualization design", "Privacy-first positioning", "Intuitive funnel builder"],
    techStack: ["React", "Go", "ClickHouse", "Tailwind CSS", "D3.js"],
    features: ["Real-time Data", "Heatmaps", "Conversion Funnels", "Privacy Compliant"],
    industry: "Web Analytics"
  },
  {
    name: "FlowCapture",
    category: "SaaS",
    url: "https://flowcapture.creatifia.com/",
    tagline: "Capture every lead, effortlessly",
    description: "A sleek lead capture and form builder platform that helps businesses create high-converting forms, landing pages, and lead funnels — all without writing a single line of code.",
    challenge: "Form builders are commoditized. The challenge was positioning FlowCapture as a premium, design-forward alternative in a crowded market full of clunky, outdated tools.",
    solution: "We designed a clean, conversion-focused landing page that doubles as a live demo of the product's capabilities. The dark UI with neon accents communicates modernity, while interactive form previews show the product in action.",
    results: ["Conversion-focused landing page", "Interactive product demos", "Clean onboarding flow"],
    techStack: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion"],
    features: ["Form Builder", "Lead Capture", "Landing Pages", "Integrations"],
    industry: "Marketing Technology",
    embeddable: false
  },
  {
    name: "Marble & Bone",
    category: "E-Commerce",
    url: "https://marbleandbone.creatifia.com/",
    tagline: "Premium accessories for your best friend",
    description: "A luxury pet accessories brand offering handcrafted collars, leashes, and bowls made from premium materials. The website needed to feel as premium as the products themselves.",
    challenge: "Selling premium pet products online means competing with mass-market retailers on convenience while justifying a higher price point through brand storytelling and perceived quality.",
    solution: "We crafted an editorial-style shopping experience with rich product photography, material storytelling, and a seamless checkout flow. Every detail — from typography to animations — communicates luxury and craftsmanship.",
    results: ["Editorial product showcase", "Premium brand positioning", "Seamless checkout experience"],
    techStack: ["React", "Next.js", "Stripe", "Tailwind CSS", "Framer Motion"],
    features: ["Product Catalog", "Secure Checkout", "Brand Storytelling", "Mobile Optimized"],
    industry: "Premium Pet Accessories"
  },
  {
    name: "NY Slice",
    category: "Food & Beverage",
    url: "https://nyslice.creatifia.com/",
    tagline: "Authentic New York pizza, one click away",
    description: "A vibrant restaurant website for an authentic New York-style pizzeria, featuring online ordering, a visual menu, and location information that drives foot traffic and delivery orders.",
    challenge: "The restaurant needed a website that captured the energy of a NYC pizzeria while making it dead simple for hungry customers to browse the menu and order — especially on mobile.",
    solution: "We designed a bold, appetite-driven layout with hero food photography, a scannable visual menu, and prominent order buttons. The mobile experience prioritizes speed — menu to checkout in under 60 seconds.",
    results: ["Mobile-first ordering flow", "Visual menu with photography", "Location & hours prominent"],
    techStack: ["React", "Express", "Tailwind CSS", "Framer Motion"],
    features: ["Online Menu", "Order Online", "Location Finder", "Mobile First"],
    industry: "Restaurant & Pizzeria"
  },
  {
    name: "Komorebi",
    category: "Food & Beverage",
    url: "https://komorebi.creatifia.com/",
    tagline: "A Japanese-inspired dining experience",
    description: "An elegant website for a Japanese-inspired fine dining restaurant that translates the tranquility and artistry of the dining experience into a digital presence.",
    challenge: "Fine dining websites must evoke emotion and set expectations for the experience. The challenge was creating an immersive digital atmosphere that matches the restaurant's serene, artistic environment.",
    solution: "We used cinematic imagery, generous whitespace, and subtle animations to create a contemplative browsing experience. The design draws from Japanese aesthetics — wabi-sabi imperfection, natural textures, and mindful composition.",
    results: ["Immersive atmosphere design", "Elegant menu presentation", "Reservation-driven UX"],
    techStack: ["React", "Tailwind CSS", "Framer Motion", "GSAP"],
    features: ["Visual Menu", "Online Reservations", "Gallery", "Atmospheric Design"],
    industry: "Fine Dining"
  }
];

const categories = ["All", "SaaS", "E-Commerce", "Food & Beverage"];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(145,255,0,0.06),transparent_50%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
              Portfolio
            </span>
          </FadeIn>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-6">
            <TextReveal>Our</TextReveal>{" "}
            <span className="text-accent"><TextReveal>Work</TextReveal></span>
          </h1>
          <FadeIn delay={0.3}>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
              Every project tells a story. Browse our portfolio of stunning websites crafted with precision, creativity, and purpose.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pb-8 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 py-4">
            {categories.map(cat => (
              <button
                key={cat}
                data-testid={`filter-${cat.toLowerCase().replace(/ & /g, '-')}`}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wide rounded-full transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-accent text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    ({projectsData.filter(p => p.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-16 md:space-y-24"
            >
              {filteredProjects.map((project, index) => (
                <FadeIn key={project.name} delay={index * 0.1}>
                  <article
                    data-testid={`project-detail-${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition-all duration-500"
                      >
                        {project.embeddable === false ? (
                          <div className="relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] flex items-center justify-center">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(145,255,0,0.08),transparent_70%)]" />
                            <div className="absolute top-0 left-0 right-0 h-10 bg-[#1a1a1a] flex items-center px-4 gap-2">
                              <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                              </div>
                              <div className="flex-1 mx-3 h-5 bg-white/10 rounded-md flex items-center px-2">
                                <span className="text-[8px] text-white/40 font-mono truncate">{project.url}</span>
                              </div>
                            </div>
                            <div className="text-center z-10 pt-6">
                              <div className="text-6xl md:text-7xl font-display font-black text-accent/20 mb-3">{project.name.charAt(0)}</div>
                              <p className="text-white/80 font-display font-bold text-xl">{project.name}</p>
                              <p className="text-white/40 text-xs mt-1 flex items-center gap-1 justify-center">
                                <ExternalLink className="w-3 h-3" /> Click to visit live site
                              </p>
                            </div>
                          </div>
                        ) : (
                          <IframePreview url={project.url} title={project.name} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                          <div className="flex flex-wrap gap-1.5">
                            {project.features.slice(0, 3).map((feature, fIdx) => (
                              <span key={fIdx} className="text-[10px] bg-black/60 backdrop-blur-sm text-white/90 px-2 py-0.5 rounded-full border border-white/10">
                                {feature}
                              </span>
                            ))}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
                            <ExternalLink className="w-3.5 h-3.5 text-accent" />
                          </div>
                        </div>
                      </a>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-mono text-accent uppercase tracking-widest bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                            {project.category}
                          </span>
                          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                            {project.industry}
                          </span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                          {project.name}
                        </h2>
                        <p className="text-accent/80 font-display text-lg mb-4 italic">
                          {project.tagline}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                          {project.description}
                        </p>

                        <div className="space-y-4 mb-6">
                          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Zap className="w-3.5 h-3.5 text-accent" />
                              <h4 className="text-xs font-bold uppercase tracking-wide text-white">The Challenge</h4>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">{project.challenge}</p>
                          </div>

                          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Layers className="w-3.5 h-3.5 text-accent" />
                              <h4 className="text-xs font-bold uppercase tracking-wide text-white">Our Solution</h4>
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
                          </div>
                        </div>

                        <button
                          data-testid={`toggle-details-${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setExpandedProject(expandedProject === project.name ? null : project.name)}
                          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-white/60 hover:text-accent transition-colors mb-6"
                        >
                          {expandedProject === project.name ? "Hide Details" : "View Details"}
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedProject === project.name ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {expandedProject === project.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mb-6"
                            >
                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wide text-white/60 mb-2">Key Results</h4>
                                  <ul className="space-y-1.5">
                                    {project.results.map((result, rIdx) => (
                                      <li key={rIdx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <div className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                                        {result}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wide text-white/60 mb-2">Tech Stack</h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map((tech, tIdx) => (
                                      <span key={tIdx} className="text-[11px] bg-white/5 border border-white/10 text-white/70 px-2.5 py-1 rounded-full">
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wide text-white/60 mb-2">Features</h4>
                                  <div className="flex flex-wrap gap-1.5">
                                    {project.features.map((feature, fIdx) => (
                                      <span key={fIdx} className="text-[11px] bg-accent/10 border border-accent/20 text-accent px-2.5 py-1 rounded-full">
                                        {feature}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="flex gap-3 mt-auto">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            data-testid={`button-visit-${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-white/20 transition-colors rounded-full"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            Visit Live Site
                          </a>
                          <Link
                            href="/contact"
                            data-testid={`button-request-${project.name.toLowerCase().replace(/\s+/g, '-')}`}
                            className="inline-flex items-center gap-2 bg-accent text-black px-5 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-white transition-colors rounded-full"
                          >
                            Request Similar
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>

                    {index < filteredProjects.length - 1 && (
                      <div className="mt-16 md:mt-24 border-t border-white/5" />
                    )}
                  </article>
                </FadeIn>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-gradient-to-b from-transparent to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(145,255,0,0.08),transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Ready to Join Our <span className="text-accent">Portfolio</span>?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Let's create something stunning together. Every project starts with a conversation.
            </p>
            <Link
              href="/contact"
              data-testid="link-start-project"
              className="inline-flex items-center gap-2 bg-accent text-black px-8 py-4 text-sm font-bold uppercase tracking-wide hover:bg-white transition-colors rounded-full"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
