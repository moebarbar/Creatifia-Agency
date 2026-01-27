import { Navbar, Footer } from "@/components/layout/shell";
import { FadeIn } from "@/components/ui/motion";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Clock, User } from "lucide-react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  tags: string[];
  image: string;
  publishedAt: string;
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const date = new Date(post.publishedAt);
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
      data-testid={`blog-card-${post.slug}`}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 h-full flex flex-col">
          <div className="aspect-[16/9] overflow-hidden relative">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-black/70 backdrop-blur-sm border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-accent">
                {post.category}
              </span>
            </div>
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
            </div>
            
            <h2 className="text-xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
              {post.title}
            </h2>
            
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-grow">
              {post.excerpt}
            </p>
            
            <div className="flex items-center text-accent text-sm font-medium group-hover:gap-3 gap-2 transition-all duration-300 mt-auto">
              Read Article
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const res = await fetch("/api/blog");
      if (!res.ok) throw new Error("Failed to fetch blog posts");
      return res.json();
    }
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(145,255,0,0.08),transparent_60%)]" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
              <FadeIn>
                <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  Blog & Insights
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
                  Web Design <span className="text-accent">Insights</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Expert advice on web design, performance, conversions, and building websites that grow your business.
                </p>
              </FadeIn>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden animate-pulse">
                    <div className="aspect-[16/9] bg-white/5" />
                    <div className="p-6 space-y-3">
                      <div className="h-4 w-32 bg-white/5 rounded" />
                      <div className="h-6 w-full bg-white/5 rounded" />
                      <div className="h-4 w-full bg-white/5 rounded" />
                      <div className="h-4 w-2/3 bg-white/5 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {posts?.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-20 md:py-32 bg-accent relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-black rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-black mb-6">
                Ready for a Website That Converts?
              </h2>
              <p className="text-lg text-black/70 mb-8 max-w-2xl mx-auto">
                Get a premium custom website for just $299/month. Design, hosting, SEO, and unlimited updates included.
              </p>
              <Link href="/contact">
                <button 
                  data-testid="blog-cta-button"
                  className="inline-flex items-center gap-2 bg-black text-accent px-8 py-4 rounded-full font-bold text-lg hover:bg-black/90 transition-colors"
                >
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
