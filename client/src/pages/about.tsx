import { Navbar, Footer } from "@/components/layout/shell";
import { FadeIn, TextReveal } from "@/components/ui/motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32">
      <Navbar />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <div>
            <h1 className="text-[8vw] font-display font-bold uppercase leading-[0.85] mb-12 sticky top-32">
              <TextReveal>About</TextReveal> <br/>
              <span className="text-accent"><TextReveal>The Studio</TextReveal></span>
            </h1>
          </div>
          <div className="pt-4 md:pt-12">
            <FadeIn className="space-y-12 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
              <p>
                <strong className="text-white font-bold">We are PixelPerfect.</strong> A specialized frontend studio based in the cloud. We were founded on a simple premise: Most agencies are "full-stack" but master neither. We chose to master one half of the equation.
              </p>
              <p>
                We believe that the <span className="text-white">Frontend is the Product</span>. It's what your users touch, see, and feel. A great backend with a mediocre frontend is a failed product. A great frontend can elevate even a simple backend into a premium experience.
              </p>
              <p>
                Our team consists of "Design Engineers" – developers with the eye of a designer, and designers who think in code. We don't just implement designs; we interpret, enhance, and perfect them.
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 gap-12 mt-20">
              <FadeIn delay={0.2}>
                <h3 className="text-4xl font-display font-bold text-white mb-2">100+</h3>
                <p className="text-sm uppercase tracking-widest">Projects Delivered</p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <h3 className="text-4xl font-display font-bold text-white mb-2">50+</h3>
                <p className="text-sm uppercase tracking-widest">Happy Clients</p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <h3 className="text-4xl font-display font-bold text-white mb-2">100%</h3>
                <p className="text-sm uppercase tracking-widest">Frontend Focused</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      <section className="py-32 bg-white text-black">
        <div className="container mx-auto px-6">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 uppercase text-center">Our Core Values</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FadeIn delay={0.1} className="border-l-2 border-black pl-8">
              <h3 className="text-2xl font-bold mb-4 uppercase">Precision</h3>
              <p className="opacity-70">We sweat the small stuff. One pixel off is a mile off. We test on every device, every screen size.</p>
            </FadeIn>
            <FadeIn delay={0.2} className="border-l-2 border-black pl-8">
              <h3 className="text-2xl font-bold mb-4 uppercase">Performance</h3>
              <p className="opacity-70">A beautiful site that loads slowly is a broken site. We optimize images, code splitting, and bundle sizes.</p>
            </FadeIn>
            <FadeIn delay={0.3} className="border-l-2 border-black pl-8">
              <h3 className="text-2xl font-bold mb-4 uppercase">Transparency</h3>
              <p className="opacity-70">No black boxes. You see our code, our commits, and our progress. We work as an extension of your team.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
