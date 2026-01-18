import { Navbar, Footer } from "@/components/layout/shell";
import { FadeIn, TextReveal } from "@/components/ui/motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

async function submitContact(data: z.infer<typeof formSchema>) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to submit contact form");
  return response.json();
}

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  return (
    <div className="min-h-screen bg-background pt-32">
      <Navbar />

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h1 className="text-[10vw] font-display font-bold uppercase leading-[0.85] mb-12">
            <TextReveal>Let's</TextReveal> <br/>
            <span className="text-stroke text-transparent"><TextReveal>Talk</TextReveal></span>
          </h1>
          <FadeIn delay={0.2}>
            <p className="text-xl text-muted-foreground max-w-md font-light mb-12">
              Ready to take your frontend to the next level? Tell us about your project, your timeline, and your vision.
            </p>
            
            <div className="space-y-2 text-lg">
              <p className="text-white">hello@pixelperfect.agency</p>
              <p className="text-white">+1 (555) 000-0000</p>
              <p className="text-white">San Francisco, CA</p>
            </div>
          </FadeIn>
        </div>

        <div className="bg-secondary/30 p-8 md:p-12 border border-white/5 h-fit">
          <FadeIn delay={0.3}>
            <h2 className="text-2xl font-display font-bold mb-8 uppercase">Start a Project</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs tracking-widest text-muted-foreground">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-background border-white/10 focus:border-accent h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs tracking-widest text-muted-foreground">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-background border-white/10 focus:border-accent h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs tracking-widest text-muted-foreground">Project Details</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about what you want to build..." {...field} className="bg-background border-white/10 focus:border-accent min-h-[150px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  data-testid="button-submit-contact"
                  disabled={mutation.isPending}
                  className="w-full bg-white text-black hover:bg-accent font-bold uppercase tracking-widest py-6"
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </FadeIn>
        </div>
      </div>

      <Footer />
    </div>
  );
}
