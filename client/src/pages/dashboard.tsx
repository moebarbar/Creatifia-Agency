import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  STEPPER_STAGES,
  STAGE_META,
  stageIndex,
} from "@shared/pipeline";
import type { EngagementStage } from "@shared/schema";
import { Check, Calendar, CreditCard, FileText, ArrowRight } from "lucide-react";

interface DashboardData {
  engagement: {
    id: string;
    stage: EngagementStage;
    businessName: string | null;
  };
  brief: { currentStep: number; completedAt: string | null } | null;
  meetings: { id: string; scheduledAt: string; meetingLink: string | null }[];
  subscription: { status: string } | null;
}

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { user, isLoading: authLoading, logout } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (!authLoading && user && user.role !== "client") navigate("/admin");
  }, [user, authLoading, navigate]);

  const { data, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/engagement"],
    enabled: !!user,
  });

  if (authLoading || isLoading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const currentIdx = stageIndex(data.engagement.stage);

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Top bar */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.png?v=3" alt="Créatifia" className="h-9" />
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground hidden sm:inline">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={() => logout.mutate()}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-display font-bold mb-1">
          {data.engagement.businessName
            ? `${data.engagement.businessName}'s project`
            : "Your project"}
        </h1>
        <p className="text-muted-foreground mb-8">
          {STAGE_META[data.engagement.stage].description}
        </p>

        {/* Pipeline stepper */}
        <Stepper currentIdx={currentIdx} stage={data.engagement.stage} />

        {/* Stage-driven action card */}
        <div className="mt-10">
          <ActionCard data={data} />
        </div>
      </main>
    </div>
  );
}

function Stepper({
  currentIdx,
  stage,
}: {
  currentIdx: number;
  stage: EngagementStage;
}) {
  if (stage === "cancelled") {
    return (
      <div className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-red-300">
        This subscription has been cancelled.
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-2">
      {STEPPER_STAGES.map((s, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div
            key={s}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              active
                ? "border-accent text-accent bg-accent/10"
                : done
                  ? "border-accent/40 text-accent/70"
                  : "border-white/10 text-muted-foreground"
            }`}
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[10px]">
              {done ? <Check className="h-3 w-3" /> : i + 1}
            </span>
            {STAGE_META[s].label}
          </div>
        );
      })}
    </div>
  );
}

function ActionCard({ data }: { data: DashboardData }) {
  const stage = data.engagement.stage;

  switch (stage) {
    case "signed_up":
    case "brief_in_progress":
      return (
        <Card
          icon={<FileText className="h-5 w-5" />}
          title="Complete your project brief"
          body="Tell us about your business so we can design the perfect site. Your answers save automatically — you can stop and resume anytime."
          cta={{ label: "Continue brief", href: "/dashboard/brief" }}
        />
      );
    case "brief_complete":
    case "call_scheduled":
      return <SchedulingCard data={data} />;
    case "awaiting_payment":
      return <PaymentCard />;
    case "active":
    case "in_design":
      return (
        <Card
          icon={<Check className="h-5 w-5" />}
          title="We're building your website 🚀"
          body="Your subscription is active and our team is on it. Expect your first draft within 5 business days."
        />
      );
    case "in_revision":
      return (
        <Card
          icon={<Check className="h-5 w-5" />}
          title="Refining your design"
          body="We're applying your feedback. Your designer will reach out with the next version."
        />
      );
    case "launched":
      return (
        <Card
          icon={<Check className="h-5 w-5" />}
          title="Your website is live 🎉"
          body="Need changes? Your subscription includes unlimited updates — just reply to your designer."
          manageBilling
        />
      );
    default:
      return null;
  }
}

function Card({
  icon,
  title,
  body,
  cta,
  manageBilling,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  cta?: { label: string; href: string };
  manageBilling?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
        {icon}
      </div>
      <h2 className="text-lg font-display font-bold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      {cta && (
        <Link href={cta.href}>
          <Button className="mt-4 bg-accent text-black hover:bg-accent/90 font-bold">
            {cta.label} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
      {manageBilling && <ManageBillingButton />}
    </div>
  );
}

function SchedulingCard({ data }: { data: DashboardData }) {
  const { toast } = useToast();
  const [when, setWhen] = useState("");
  const upcoming = data.meetings[0];

  const schedule = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/engagement/meeting", {
        scheduledAt: new Date(when).toISOString(),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/engagement"] });
      toast({ title: "Call booked!", description: "Check your email for confirmation." });
    },
    onError: (e: Error) =>
      toast({ title: "Could not book", description: e.message.replace(/^\d+:\s*/, ""), variant: "destructive" }),
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
        <Calendar className="h-5 w-5" />
      </div>
      <h2 className="text-lg font-display font-bold">Book your discovery call</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        A quick 30-minute Zoom so we can align on your vision before we start designing.
      </p>

      {upcoming && (
        <div className="mt-4 rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm">
          📅 Scheduled for {new Date(upcoming.scheduledAt).toLocaleString()}
          {upcoming.meetingLink && (
            <>
              {" — "}
              <a href={upcoming.meetingLink} className="text-accent underline">
                Join link
              </a>
            </>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <input
          type="datetime-local"
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          className="flex-1 rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <Button
          disabled={!when || schedule.isPending}
          onClick={() => schedule.mutate()}
          className="bg-accent text-black hover:bg-accent/90 font-bold"
        >
          {schedule.isPending ? "Booking…" : upcoming ? "Reschedule" : "Book call"}
        </Button>
      </div>

      {data.engagement.stage === "call_scheduled" && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <PaymentCard inline />
        </div>
      )}
    </div>
  );
}

function PaymentCard({ inline }: { inline?: boolean } = {}) {
  const { toast } = useToast();
  const checkout = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/payments/checkout");
      return res.json();
    },
    onSuccess: (d: { url: string }) => {
      window.location.href = d.url;
    },
    onError: (e: Error) =>
      toast({ title: "Payment unavailable", description: e.message.replace(/^\d+:\s*/, ""), variant: "destructive" }),
  });

  const inner = (
    <>
      {!inline && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CreditCard className="h-5 w-5" />
        </div>
      )}
      <h2 className="text-lg font-display font-bold">
        {inline ? "Ready to start? Subscribe now" : "Start your subscription"}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        $799/month — your website, content, SEO, and PPC management all included. Cancel anytime.
        Once payment is confirmed, our team begins your design.
      </p>
      <Button
        disabled={checkout.isPending}
        onClick={() => checkout.mutate()}
        className="mt-4 bg-accent text-black hover:bg-accent/90 font-bold"
      >
        {checkout.isPending ? "Redirecting…" : "Subscribe — $799/mo"}
      </Button>
    </>
  );

  if (inline) return <div>{inner}</div>;
  return <div className="rounded-2xl border border-white/10 bg-white/5 p-6">{inner}</div>;
}

function ManageBillingButton() {
  const { toast } = useToast();
  const portal = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/payments/portal");
      return res.json();
    },
    onSuccess: (d: { url: string }) => {
      window.location.href = d.url;
    },
    onError: (e: Error) =>
      toast({ title: "Unavailable", description: e.message.replace(/^\d+:\s*/, ""), variant: "destructive" }),
  });
  return (
    <Button variant="outline" className="mt-4 ml-0" onClick={() => portal.mutate()} disabled={portal.isPending}>
      Manage billing
    </Button>
  );
}
