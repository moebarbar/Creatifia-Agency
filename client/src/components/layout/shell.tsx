import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
          scrolled ? "py-3 md:py-4 bg-background/90 backdrop-blur-md border-b border-border/50" : "py-4 md:py-8 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-display font-bold tracking-tighter z-50 relative hover:text-accent transition-colors">
            Créati<span className="text-accent">fia</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors ${
                  location === link.href ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/contact" className="btn-glow relative bg-accent text-black px-6 py-2.5 text-sm font-bold uppercase tracking-wider rounded-full overflow-hidden hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Start Project</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={{ opacity: 0, y: "-100%" }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center md:hidden"
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-display font-bold uppercase hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-white py-24 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-8 leading-[0.9]">
              Let's build <br />
              <span className="text-accent">icons.</span>
            </h2>
            <Link href="/contact" className="inline-block border border-white/20 px-8 py-4 text-xl uppercase tracking-widest hover:bg-accent hover:text-black hover:border-accent transition-all duration-300">
              Start a Project
            </Link>
          </div>
          <div className="flex flex-col justify-end items-start md:items-end">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm uppercase tracking-widest text-white/60">
              <a href="https://www.instagram.com/moe.barbar/" target="_blank" className="hover:text-accent transition-colors">Instagram</a>
              <a href="#" className="hover:text-accent transition-colors">Twitter</a>
              <a href="https://www.linkedin.com/in/moe-barbar/" target="_blank" className="hover:text-accent transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-accent transition-colors">Dribbble</a>
            </div>
            <p className="mt-8 text-white/40 max-w-xs text-right hidden md:block">
              We create digital experiences that define brands. Story-driven. Pixel perfect.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 text-xs uppercase tracking-widest text-white/40">
          <p>&copy; 2024 Créatifia Agency</p>
          <div className="flex flex-col md:flex-row gap-8 mt-4 md:mt-0 items-center">
            <span>San Francisco</span>
            <span>Tokyo</span>
            <span>Berlin</span>
          </div>
        </div>
        <div className="w-full text-center mt-12 text-white/40 text-xs uppercase tracking-[0.15em] hover:text-white/80 transition-colors">
            Designed & developed with <span className="text-accent">❤️</span> by{" "}
            <a 
              href="https://www.linkedin.com/in/moe-barbar/" 
              target="_blank" 
              className="text-accent hover:text-white font-bold underline decoration-accent underline-offset-4 transition-colors"
              data-testid="link-moe-linkedin"
            >
              Moe Barbar
            </a>
        </div>
      </div>
    </footer>
  );
}
