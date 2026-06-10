import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ALL_STAGES, STAGE_META } from "@shared/pipeline";
import type { EngagementStage } from "@shared/schema";

interface AdminEngagement {
  id: string;
  stage: EngagementStage;
  businessName: string | null;
  assignedToId: string | null;
  updatedAt: string;
  owner: { id: string; email: string; name: string | null } | null;
  brief: { completedAt: string | null } | null;
  meetings: { scheduledAt: string }[];
  subscription: { status: string } | null;
}

interface Staff {
  id: string;
  email: string;
  name: string | null;
}

export default function AdminCRM() {
  const [, navigate] = useLocation();
  const { user, isLoading: authLoading, isStaff, logout } = useAuth();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
    if (!authLoading && user && !isStaff) navigate("/dashboard");
  }, [user, authLoading, isStaff, navigate]);

  const { data, isLoading } = useQuery<{ engagements: AdminEngagement[] }>({
    queryKey: ["/api/admin/engagements"],
    enabled: !!user && isStaff,
  });

  const { data: staffData } = useQuery<{ staff: Staff[] }>({
    queryKey: ["/api/admin/staff"],
    enabled: !!user && isStaff,
  });

  if (authLoading || isLoading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const byStage = (stage: EngagementStage) =>
    data.engagements.filter((e) => e.stage === stage);

  return (
    <div className="min-h-screen bg-background text-white">
      <header className="border-b border-white/10 sticky top-0 z-20 bg-background/90 backdrop-blur">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src="/logo.png?v=3" alt="Créatifia" className="h-9" />
            </Link>
            <span className="text-sm font-bold text-accent">CRM</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted-foreground hidden sm:inline">
              {user?.email} ({user?.role})
            </span>
            <Button variant="ghost" size="sm" onClick={() => logout.mutate()}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-display font-bold">Pipeline</h1>
          <span className="text-sm text-muted-foreground">
            {data.engagements.length} total
          </span>
        </div>

        {/* Kanban board */}
        <div className="flex gap-4 overflow-x-auto pb-4">
          {ALL_STAGES.map((stage) => {
            const items = byStage(stage);
            return (
              <div key={stage} className="w-72 flex-shrink-0">
                <div className="mb-2 flex items-center justify-between px-1">
                  <h2 className="text-sm font-bold">{STAGE_META[stage].label}</h2>
                  <span className="text-xs text-muted-foreground">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => setSelected(e.id)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-left hover:border-accent/40 transition-colors"
                    >
                      <div className="font-medium text-sm truncate">
                        {e.businessName || e.owner?.name || e.owner?.email || "Unknown"}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {e.owner?.email}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {e.brief?.completedAt && (
                          <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] text-accent">brief ✓</span>
                        )}
                        {e.meetings.length > 0 && (
                          <span className="rounded bg-blue-400/15 px-1.5 py-0.5 text-[10px] text-blue-300">call</span>
                        )}
                        {e.subscription?.status === "active" && (
                          <span className="rounded bg-green-400/15 px-1.5 py-0.5 text-[10px] text-green-300">paying</span>
                        )}
                      </div>
                    </button>
                  ))}
                  {items.length === 0 && (
                    <div className="rounded-lg border border-dashed border-white/10 p-3 text-center text-xs text-muted-foreground">
                      Empty
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {selected && (
        <DetailDrawer
          id={selected}
          staff={staffData?.staff ?? []}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

interface DetailData {
  engagement: AdminEngagement;
  owner: { email: string; name: string | null } | null;
  brief: { answers: Record<string, unknown>; completedAt: string | null } | null;
  meetings: { scheduledAt: string; meetingLink: string | null }[];
  subscription: { status: string; currentPeriodEnd: string | null } | null;
  activity: { id: string; type: string; message: string; createdAt: string }[];
  payments: { id: string; amount: number; status: string; createdAt: string }[];
}

function DetailDrawer({
  id,
  staff,
  onClose,
}: {
  id: string;
  staff: Staff[];
  onClose: () => void;
}) {
  const { toast } = useToast();
  const { data } = useQuery<DetailData>({
    queryKey: ["/api/admin/engagements", id],
    enabled: !!id,
  });
  const [note, setNote] = useState("");

  const update = useMutation({
    mutationFn: async (patch: Record<string, unknown>) => {
      const res = await apiRequest("PATCH", `/api/admin/engagements/${id}`, patch);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/engagements"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/engagements", id] });
    },
    onError: (e: Error) =>
      toast({ title: "Update failed", description: e.message.replace(/^\d+:\s*/, ""), variant: "destructive" }),
  });

  const addNote = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/admin/engagements/${id}/notes`, { message: note });
      return res.json();
    },
    onSuccess: () => {
      setNote("");
      queryClient.invalidateQueries({ queryKey: ["/api/admin/engagements", id] });
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative w-full max-w-lg overflow-y-auto bg-background border-l border-white/10 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {!data ? (
          <div className="flex h-full items-center justify-center">
            <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-display font-bold">
                  {data.engagement.businessName || data.owner?.email}
                </h2>
                <p className="text-sm text-muted-foreground">{data.owner?.email}</p>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-white">✕</button>
            </div>

            {/* Stage + assignment controls */}
            <div className="mt-6 grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Stage</label>
                <select
                  value={data.engagement.stage}
                  onChange={(e) => update.mutate({ stage: e.target.value })}
                  className="mt-1 w-full rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
                >
                  {ALL_STAGES.map((s) => (
                    <option key={s} value={s}>{STAGE_META[s].label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Assigned to</label>
                <select
                  value={data.engagement.assignedToId ?? ""}
                  onChange={(e) => update.mutate({ assignedToId: e.target.value || null })}
                  className="mt-1 w-full rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
                >
                  <option value="">Unassigned</option>
                  {staff.map((s) => (
                    <option key={s.id} value={s.id}>{s.name || s.email}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Subscription / payments */}
            <Section title="Billing">
              <p className="text-sm">
                Subscription:{" "}
                <span className={data.subscription?.status === "active" ? "text-green-400" : "text-muted-foreground"}>
                  {data.subscription?.status ?? "none"}
                </span>
              </p>
              {data.payments.length > 0 && (
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {data.payments.slice(0, 5).map((p) => (
                    <li key={p.id}>
                      ${(p.amount / 100).toFixed(2)} — {p.status} — {new Date(p.createdAt).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            {/* Brief answers */}
            <Section title={`Brief ${data.brief?.completedAt ? "(completed)" : "(in progress)"}`}>
              {data.brief && Object.keys(data.brief.answers).length > 0 ? (
                <dl className="space-y-2 text-sm">
                  {Object.entries(data.brief.answers).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs text-muted-foreground">{k}</dt>
                      <dd className="text-white">{Array.isArray(v) ? v.join(", ") : String(v)}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-muted-foreground">No answers yet.</p>
              )}
            </Section>

            {/* Meetings */}
            {data.meetings.length > 0 && (
              <Section title="Meetings">
                {data.meetings.map((m, i) => (
                  <p key={i} className="text-sm">
                    📅 {new Date(m.scheduledAt).toLocaleString()}
                    {m.meetingLink && (
                      <> — <a href={m.meetingLink} className="text-accent underline">link</a></>
                    )}
                  </p>
                ))}
              </Section>
            )}

            {/* Activity + notes */}
            <Section title="Activity & notes">
              <div className="flex gap-2">
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Add a note…"
                  className="flex-1 rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
                />
                <Button size="sm" disabled={!note || addNote.isPending} onClick={() => addNote.mutate()}>
                  Add
                </Button>
              </div>
              <ul className="mt-3 space-y-2">
                {data.activity.map((a) => (
                  <li key={a.id} className="text-xs">
                    <span className={a.type === "note" ? "text-white" : "text-muted-foreground"}>
                      {a.type === "note" ? "📝 " : "• "}{a.message}
                    </span>
                    <span className="text-muted-foreground/60"> — {new Date(a.createdAt).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </Section>
          </>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-white/10 pt-4">
      <h3 className="mb-2 text-sm font-bold text-accent">{title}</h3>
      {children}
    </div>
  );
}
