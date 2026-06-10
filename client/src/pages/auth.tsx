import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function AuthPage() {
  const [, navigate] = useLocation();
  const { user, isLoading, login, register } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("signup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");

  // Already signed in → go to the right place.
  useEffect(() => {
    if (!isLoading && user) {
      navigate(user.role === "client" ? "/dashboard" : "/admin");
    }
  }, [user, isLoading, navigate]);

  const pending = login.isPending || register.isPending;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result =
        mode === "signup"
          ? await register.mutateAsync({
              email: email.trim(),
              password,
              // Send undefined (not "") so blank optional fields are omitted.
              name: name.trim() || undefined,
              businessName: businessName.trim() || undefined,
            })
          : await login.mutateAsync({ email: email.trim(), password });
      const role = result?.user?.role;
      navigate(!role || role === "client" ? "/dashboard" : "/admin");
    } catch (err) {
      toast({
        title: mode === "signup" ? "Couldn't create account" : "Couldn't log in",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img src="/logo.png?v=3" alt="Créatifia" className="h-10 mx-auto" />
          </Link>
          <h1 className="text-2xl font-display font-bold text-white">
            {mode === "signup" ? "Start your project" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {mode === "signup"
              ? "Create your account to begin — it only takes a minute."
              : "Log in to manage your project."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 space-y-4"
        >
          {mode === "signup" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessName">Business name</Label>
                <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Bloom Bakery" />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@business.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === "signup" ? "At least 8 characters" : "Your password"} />
          </div>

          <Button type="submit" disabled={pending} className="w-full bg-accent text-black hover:bg-accent/90 font-bold">
            {pending ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {mode === "signup" ? "Already have an account?" : "New here?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "signup" ? "login" : "signup")}
              className="text-accent hover:underline"
            >
              {mode === "signup" ? "Log in" : "Create one"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
