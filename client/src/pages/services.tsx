import { Navbar, Footer } from "@/components/layout/shell";
import { FadeIn, TextReveal, InlineVisual } from "@/components/ui/motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import project1 from "@assets/generated_images/modern_dark_mode_saas_dashboard_interface_mockup.png";
import torus from "@assets/generated_images/neon_lime_3d_abstract_torus_shape.png";

const services = [
  {
    title: "Stunning Websites",
    desc: "Story-driven design and pixel-perfect development. Sites that score 100 on Lighthouse, stun on every device, and turn visitors into customers.",
    tags: ["Custom Design", "React / Next.js", "5-Day First Draft", "Unlimited Updates"],
    image: project1,
  },
  {
    title: "Content Creation",
    desc: "Conversion copy, blog articles, and landing pages — written in your brand voice, engineered to rank on Google and move people to act.",
    tags: ["Website Copy", "Blog Articles", "Landing Pages", "Brand Voice"],
    image: project1,
  },
  {
    title: "SEO",
    desc: "Technical SEO, keyword strategy, and local search domination. We make sure the customers already searching for what you do find you first.",
    tags: ["Technical SEO", "Keyword Strategy", "Local SEO", "Content SEO"],
    image: project1,
  },
  {
    title: "PPC & Paid Ads",
    desc: "Google and Meta campaigns managed end-to-end with surgical precision. Any ad budget, no management caps, relentless optimization.",
    tags: ["Google Ads", "Meta Ads", "Retargeting", "A/B Testing"],
    image: project1,
  },
  {
    title: "Analytics & CRO",
    desc: "Every click tracked, every month reported, every weak point optimized. Data decides — and your growth curve keeps bending up.",
    tags: ["Tracking & Reporting", "Heatmaps", "Conversion Optimization", "Monthly Insights"],
    image: project1,
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background pt-32">
      <Navbar />

      <div className="container mx-auto px-6 mb-24">
         <h1 className="text-[10vw] font-display font-bold uppercase leading-[0.85] mb-12">
          <TextReveal>Design</TextReveal> <br/>
          <div className="flex items-center flex-wrap">
            <span className="text-stroke text-transparent"><TextReveal>+ Growth</TextReveal></span>
            <InlineVisual src={torus} alt="Créatifia design and digital marketing services" className="w-[1em] h-[0.5em] rounded-full mx-4" delay={0.4} />
          </div>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-light">
          A stunning website is step one. Then we make it work: <strong className="text-white">content, SEO, and paid ads</strong> — the full growth stack, run by one team, under one flat-price subscription.
        </p>
      </div>

      <div className="border-t border-white/10">
        {services.map((service, i) => (
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

      {/* One plan strip */}
      <section className="py-20 md:py-28 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(145,255,0,0.06),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <p className="text-accent text-xs font-bold uppercase tracking-widest mb-4">No Tiers. No Upsells.</p>
            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4">
              All of it. One plan. <span className="text-accent">$799/month.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Website, content, SEO, and PPC — everything on this page is included. Cancel anytime.
            </p>
            <Link href="/auth" data-testid="button-services-cta" className="btn-glow group relative inline-flex items-center gap-3 bg-accent text-black px-10 py-5 text-base font-black uppercase tracking-wide overflow-hidden rounded-full transition-all duration-500 hover:scale-105">
              <span className="relative z-10 flex items-center gap-3">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
