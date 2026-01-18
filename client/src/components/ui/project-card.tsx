import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  id: string;
  className?: string;
}

export function ProjectCard({ title, category, image, id, className }: ProjectCardProps) {
  return (
    <Link href={`/work`}>
      <a className={`block group relative overflow-hidden ${className}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={image}
            alt={title}
            className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>
        <div className="mt-6 flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-display font-bold mb-1 group-hover:text-accent transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground text-sm uppercase tracking-widest">{category}</p>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight className="w-6 h-6 text-accent" />
          </div>
        </div>
      </a>
    </Link>
  );
}
