import { Navbar, Footer } from "@/components/layout/shell";
import { FadeIn } from "@/components/ui/motion";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, ArrowRight, User, Clock, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  tags: string[];
  image: string;
  publishedAt: string;
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading, error } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch blog post");
      return res.json();
    },
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-8 w-48 bg-white/5 rounded mb-4" />
              <div className="h-12 w-full bg-white/5 rounded mb-6" />
              <div className="h-6 w-64 bg-white/5 rounded mb-8" />
              <div className="aspect-[16/9] bg-white/5 rounded-2xl mb-12" />
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-white/5 rounded" />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-display font-bold text-white mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link href="/blog">
              <button className="inline-flex items-center gap-2 bg-accent text-black px-6 py-3 rounded-full font-bold hover:bg-accent/90 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const date = new Date(post.publishedAt);
  const formattedDate = date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const readTime = estimateReadTime(post.content);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main>
        <article className="pt-32 pb-20 md:pt-40 md:pb-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <FadeIn>
                <Link href="/blog">
                  <span 
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 cursor-pointer"
                    data-testid="back-to-blog"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                  </span>
                </Link>
                
                <span className="inline-block py-1 px-3 rounded-full border border-accent/30 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6">
                  {post.category}
                </span>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8 md:mb-12">
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {readTime} min read
                  </span>
                </div>
              </FadeIn>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12 md:mb-16"
              >
                <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="prose prose-lg prose-invert max-w-none
                  prose-headings:font-display prose-headings:text-white prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                  prose-li:my-2
                  prose-blockquote:border-l-accent prose-blockquote:bg-white/[0.02] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
                "
              >
                <ReactMarkdown
                  components={{
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    )
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </motion.div>
              
              {post.tags && post.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-12 pt-8 border-t border-white/10"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </article>

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
                  data-testid="blog-post-cta-button"
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
