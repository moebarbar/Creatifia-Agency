import { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  BRIEF_STEPS,
  TOTAL_BRIEF_STEPS,
  isBriefComplete,
  type BriefField,
} from "@shared/brief-questions";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

type Answers = Record<string, unknown>;

interface EngagementResponse {
  brief: { answers: Answers; currentStep: number } | null;
}

export default function BriefWizard() {
  const [, navigate] = useLocation();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  const { data, isLoading } = useQuery<EngagementResponse>({
    queryKey: ["/api/engagement"],
    enabled: !!user,
  });

  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");
  const hydrated = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate once from the server.
  useEffect(() => {
    if (data?.brief && !hydrated.current) {
      setAnswers(data.brief.answers ?? {});
      setStep(Math.min(data.brief.currentStep ?? 0, TOTAL_BRIEF_STEPS - 1));
      hydrated.current = true;
    }
  }, [data]);

  const save = useMutation({
    mutationFn: async (vars: { answers: Answers; currentStep: number }) => {
      const res = await apiRequest("PATCH", "/api/engagement/brief", vars);
      return res.json();
    },
    onMutate: () => setSaveState("saving"),
    onSuccess: () => {
      setSaveState("saved");
      queryClient.invalidateQueries({ queryKey: ["/api/engagement"] });
    },
    onError: () => setSaveState("idle"),
  });

  // Debounced autosave — persists progress even mid-step / incomplete.
  const scheduleSave = useCallback(
    (next: Answers, currentStep: number) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        save.mutate({ answers: next, currentStep });
      }, 800);
    },
    [save],
  );

  function setField(id: string, value: unknown) {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      scheduleSave(next, step);
      return next;
    });
  }

  // Flush save immediately on step change / unmount.
  function flushSave(currentStep: number) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    save.mutate({ answers, currentStep });
  }

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  const submit = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/engagement/brief/submit");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/engagement"] });
      toast({ title: "Brief submitted! 🎉", description: "Next: book your discovery call." });
      navigate("/dashboard");
    },
    onError: (e: Error) =>
      toast({ title: "Not so fast", description: e.message.replace(/^\d+:\s*/, ""), variant: "destructive" }),
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const current = BRIEF_STEPS[step];
  const isLast = step === TOTAL_BRIEF_STEPS - 1;
  const complete = isBriefComplete(answers);

  function goNext() {
    if (isLast) return;
    const next = step + 1;
    setStep(next);
    flushSave(next);
  }
  function goPrev() {
    if (step === 0) return;
    const prev = step - 1;
    setStep(prev);
    flushSave(prev);
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard">
            <img src="/logo.png?v=3" alt="Créatifia" className="h-9" />
          </Link>
          <SaveIndicator state={saveState} />
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Step {step + 1} of {TOTAL_BRIEF_STEPS}</span>
            <span>{Math.round(((step + 1) / TOTAL_BRIEF_STEPS) * 100)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${((step + 1) / TOTAL_BRIEF_STEPS) * 100}%` }}
            />
          </div>
        </div>

        {/* Step header with explanation + example */}
        <h1 className="text-2xl font-display font-bold">{current.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{current.description}</p>
        {current.example && (
          <p className="mt-3 rounded-lg border border-accent/20 bg-accent/5 p-3 text-sm text-accent/90 italic">
            {current.example}
          </p>
        )}

        {/* Fields */}
        <div className="mt-8 space-y-6">
          {current.fields.map((field) => (
            <Field
              key={field.id}
              field={field}
              value={answers[field.id]}
              onChange={(v) => setField(field.id, v)}
            />
          ))}
        </div>

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between">
          <Button variant="ghost" onClick={goPrev} disabled={step === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {isLast ? (
            <Button
              onClick={() => submit.mutate()}
              disabled={!complete || submit.isPending}
              className="bg-accent text-black hover:bg-accent/90 font-bold"
            >
              {submit.isPending ? "Submitting…" : "Submit brief"}
              <Check className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={goNext} className="bg-accent text-black hover:bg-accent/90 font-bold">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {isLast && !complete && (
          <p className="mt-4 text-right text-xs text-amber-400">
            Please fill in all required fields (marked *) across all steps to submit.
          </p>
        )}
      </main>
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: BriefField;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const label = (
    <Label htmlFor={field.id}>
      {field.label}
      {field.required && <span className="text-accent"> *</span>}
    </Label>
  );

  return (
    <div className="space-y-2">
      {label}
      {field.type === "textarea" ? (
        <Textarea
          id={field.id}
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
        />
      ) : field.type === "select" ? (
        <select
          id={field.id}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        >
          <option value="">Select…</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : field.type === "multiselect" ? (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((opt) => {
            const arr = Array.isArray(value) ? (value as string[]) : [];
            const selected = arr.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  onChange(
                    selected ? arr.filter((o) => o !== opt) : [...arr, opt],
                  )
                }
                className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                  selected
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-white/15 text-muted-foreground hover:border-white/30"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      ) : (
        <Input
          id={field.id}
          type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
          value={(value as string) ?? ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      {field.help && <p className="text-xs text-muted-foreground">{field.help}</p>}
    </div>
  );
}

function SaveIndicator({ state }: { state: "idle" | "saving" | "saved" }) {
  if (state === "saving")
    return (
      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" /> Saving…
      </span>
    );
  if (state === "saved")
    return (
      <span className="flex items-center gap-1.5 text-xs text-accent">
        <Check className="h-3 w-3" /> Saved
      </span>
    );
  return <span className="text-xs text-muted-foreground">Autosaves as you type</span>;
}
