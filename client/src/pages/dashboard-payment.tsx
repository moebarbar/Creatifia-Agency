import { useEffect } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";

/**
 * Landing page after returning from Stripe Checkout.
 * ?status=success — payment done (webhook will activate the engagement).
 * ?status=cancelled — user backed out.
 */
export default function PaymentReturn() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const params = new URLSearchParams(search);
  const status = params.get("status");

  useEffect(() => {
    // Refresh pipeline state so the dashboard reflects the new stage.
    queryClient.invalidateQueries({ queryKey: ["/api/engagement"] });
  }, []);

  const success = status === "success";

  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        {success ? (
          <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
        ) : (
          <XCircle className="mx-auto h-16 w-16 text-muted-foreground" />
        )}
        <h1 className="mt-6 text-2xl font-display font-bold">
          {success ? "Payment received! 🎉" : "Checkout cancelled"}
        </h1>
        <p className="mt-3 text-muted-foreground">
          {success
            ? "Your subscription is active and our team is starting on your website. You'll see your first draft within 5 business days."
            : "No charge was made. You can start your subscription anytime from your dashboard."}
        </p>
        <Button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-accent text-black hover:bg-accent/90 font-bold"
        >
          Back to dashboard
        </Button>
        <div className="mt-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-white">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
