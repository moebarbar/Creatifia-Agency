import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = children.split(" ");

  return (
    <span ref={ref} className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] -mb-[0.1em] pb-[0.1em] align-bottom">
          <motion.span
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.05,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function InlineVisual({ src, alt, className, delay = 0 }: { src: string; alt: string; className?: string; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  
    return (
      <span className="inline-block align-middle mx-2 md:mx-4 overflow-hidden rounded-full border border-white/10 relative top-[-0.1em]">
        <motion.div
            ref={ref}
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "auto", opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
            className="flex items-center"
        >
            <img src={src} alt={alt} className={cn("h-[0.8em] md:h-[0.9em] w-auto object-cover aspect-video", className)} />
        </motion.div>
      </span>
    );
  }

  export function ParallaxImage({ src, alt, className, speed = 1 }: { src: string; alt: string; className?: string; speed?: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <div ref={ref} className={cn("overflow-hidden relative", className)}>
            <motion.div style={{ y }} className="w-full h-[140%] relative -top-[20%]">
                 <img src={src} alt={alt} className="w-full h-full object-cover" />
            </motion.div>
        </div>
    )
  }
