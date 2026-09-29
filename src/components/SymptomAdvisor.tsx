import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MessageCircle, Sparkles, ShieldAlert } from "lucide-react";

import { getServiceRecommendation } from "@/lib/hvac-advisor.functions";
import { trackLead } from "@/lib/analytics";

type Diagnosis = Awaited<ReturnType<typeof getServiceRecommendation>>;

const propertyTypes = ["Home", "Office / Shop", "Factory / Plant", "Cold Storage", "Plaza / Mall"];
const equipmentTypes = ["Split AC", "Inverter AC", "Window AC", "Central / Ducted", "Chiller", "Cold Room / Freezer"];
const areaList = ["DHA", "Gulberg", "Walton / Cantt", "Model Town", "Johar Town", "Bahria Town", "Sundar Industrial Estate", "Other"];

export function SymptomAdvisor({ whatsappLink }: { whatsappLink: (m: string) => string }) {
  const recommend = useServerFn(getServiceRecommendation);
  const [symptoms, setSymptoms] = useState("");
  const [propertyType, setPropertyType] = useState<string>(propertyTypes[0]!);
  const [equipment, setEquipment] = useState<string>(equipmentTypes[0]!);
  const [area, setArea] = useState<string>(areaList[0]!);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const [summary, setSummary] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const r = await recommend({ data: { symptoms, propertyType, equipment, area } });
      setResult(r);
      setSummary(r.bookingSummary);
      trackLead({ event_type: "ai_recommendation", section: "symptom_advisor", service: r.recommendedService, area });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not get a recommendation. Please try again or message us directly.");
    } finally {
      setLoading(false);
    }
  }

  function book() {
    if (!result) return;
    trackLead({ event_type: "ai_booking", section: "symptom_advisor", service: result.recommendedService, area });
    window.open(whatsappLink(`Assalam-o-Alaikum Modern Cool. ${summary} (${propertyType}, ${equipment}, ${area}, Lahore)`), "_blank", "noopener,noreferrer");
  }

  const field = "mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold outline-none focus:border-cobalt";

  return (
    <section id="advisor" className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
      <div className="grid gap-8 rounded-3xl bg-secondary p-6 md:p-10 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <span className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold">+ Symptom helper +</span>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight">Not sure what's wrong? Describe it.</h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-muted-foreground">Tell us what your AC or cooling system is doing. We'll suggest the most relevant Modern Cool service and draft a WhatsApp message you can review before sending.</p>
          <p className="mt-4 text-xs font-semibold text-muted-foreground">Guidance only — a technician confirms the fault on site.</p>
        </div>
        <div>
          <form onSubmit={submit} className="grid gap-3 rounded-3xl bg-card p-5">
            <label className="text-xs font-bold uppercase text-muted-foreground">What's happening?
              <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} maxLength={1200} rows={4} required minLength={10} placeholder="e.g. AC runs but blows warm air, outdoor unit makes a clicking sound…" className={`${field} normal-case`} />
            </label>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className="text-xs font-bold uppercase text-muted-foreground">Property<select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className={`${field} normal-case`}>{propertyTypes.map((p) => <option key={p}>{p}</option>)}</select></label>
              <label className="text-xs font-bold uppercase text-muted-foreground">Equipment<select value={equipment} onChange={(e) => setEquipment(e.target.value)} className={`${field} normal-case`}>{equipmentTypes.map((p) => <option key={p}>{p}</option>)}</select></label>
              <label className="text-xs font-bold uppercase text-muted-foreground">Area<select value={area} onChange={(e) => setArea(e.target.value)} className={`${field} normal-case`}>{areaList.map((p) => <option key={p}>{p}</option>)}</select></label>
            </div>
            <button type="submit" disabled={loading} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-bold text-background transition-colors hover:bg-cobalt disabled:opacity-60"><Sparkles className="size-4" />{loading ? "Checking…" : "Get a recommendation"}</button>
            {error && <p role="alert" className="text-sm font-semibold text-destructive">{error}</p>}
          </form>
          {result && (
            <div className="mt-4 rounded-3xl bg-card p-5" aria-live="polite">
              <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-cobalt px-3 py-1 text-xs font-bold text-cobalt-foreground">{result.recommendedService}</span><span className="rounded-full bg-orange px-3 py-1 text-xs font-bold capitalize text-orange-foreground">{result.urgency}</span></div>
              <h3 className="mt-4 text-xl font-extrabold">{result.likelyIssue}</h3>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{result.explanation}</p>
              {result.steps.length > 0 && <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">{result.steps.map((s) => <li key={s}>{s}</li>)}</ul>}
              {result.safetyNote && <p className="mt-3 flex gap-2 text-xs font-semibold text-muted-foreground"><ShieldAlert className="size-4 shrink-0" />{result.safetyNote}</p>}
              <label className="mt-4 block text-xs font-bold uppercase text-muted-foreground">Your WhatsApp message (edit if needed)
                <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} className={`${field} normal-case`} />
              </label>
              <button type="button" onClick={book} className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-cobalt text-sm font-bold text-cobalt-foreground"><MessageCircle className="size-4" />Send on WhatsApp</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
