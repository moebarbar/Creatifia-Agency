import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { memo } from "react";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  url?: string | null;
  id: string;
  className?: string;
}

export const ProjectCard = memo(function ProjectCard({ title, category, image, url, id, className }: ProjectCardProps) {
  const cardContent = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-white rounded-xl m-2">
        {url ? (
          <>
            <iframe
              src={url}
              title={title}
              className="w-[1280px] h-[800px] origin-top-left pointer-events-none"
              style={{ transform: 'scale(0.35)', transformOrigin: 'top left' }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </>
        ) : (
          <>
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              src={image}
              alt={title}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
          </>
        )}
      </div>
      <div className="mt-4 md:mt-6 flex justify-between items-start px-2 pb-2">
        <div>
          <h3 className="text-xl md:text-2xl font-display font-bold mb-1 group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-xs md:text-sm uppercase tracking-widest">{category}</p>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          {url ? <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-accent" /> : <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-accent" />}
        </div>
      </div>
    </>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={`block group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl hover:border-accent/30 transition-all duration-500 ${className}`} data-testid={`card-project-${id}`}>
        {cardContent}
      </a>
    );
  }

  return (
    <div className={`block group relative overflow-hidden ${className}`} data-testid={`card-project-${id}`}>
      {cardContent}
    </div>
  );
});
