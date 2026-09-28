import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { Lock, TrendingUp } from "lucide-react";
import { useState, type FormEvent } from "react";

import { getLeadInsights, type InsightsSummary } from "@/lib/insights.functions";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({
    meta: [
      { title: "Lead Insights | Modern Cool" },
      { name: "description", content: "Private lead overview for Modern Cool: which sections of the site bring enquiries." },
      { property: "og:title", content: "Lead Insights | Modern Cool" },
      { property: "og:description", content: "Private lead overview for Modern Cool." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const typeLabels: Record<string, string> = {
  whatsapp_click: "WhatsApp bookings",
  phone_call: "Phone calls",
  form_submit: "Booking form",
  ai_recommendation: "AI checks",
  ai_booking: "AI bookings",
};

function Breakdown({ title, rows, total }: { title: string; rows: { label: string; count: number }[]; total: number }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6">
      <h2 className="text-lg font-extrabold tracking-tight">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">Nothing recorded yet.</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {rows.map((row) => (
            <li key={row.label}>
              <div className="flex items-baseline justify-between gap-4 text-sm font-semibold">
                <span className="min-w-0 truncate">{typeLabels[row.label] ?? row.label}</span>
                <span className="shrink-0 text-muted-foreground">{row.count}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-cobalt" style={{ width: `${total ? (row.count / total) * 100 : 0}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function InsightsPage() {
  const [accessCode, setAccessCode] = useState("");
  const loadInsights = useServerFn(getLeadInsights);
  const { mutate, data, isPending, error } = useMutation<InsightsSummary, Error, string>({
    mutationFn: (code) => loadInsights({ data: { accessCode: code } }),
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutate(accessCode);
  }

  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground md:px-8">
      <div className="mx-auto max-w-5xl">
        <span className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold">+ Private dashboard +</span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">Where your leads come from</h1>
        <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-muted-foreground">
          Counts only. No customer names, numbers or message content is stored, and there are no advertising cookies.
        </p>

        <form onSubmit={submit} className="mt-8 flex max-w-md flex-wrap gap-2 rounded-3xl border border-border bg-card p-2">
          <label className="flex min-w-0 flex-1 items-center gap-2 px-4">
            <Lock className="size-4 shrink-0 text-cobalt" />
            <input
              type="password"
              value={accessCode}
              onChange={(event) => setAccessCode(event.target.value)}
              placeholder="Access code"
              className="min-h-11 w-full bg-transparent text-sm font-bold outline-none"
            />
          </label>
          <button type="submit" disabled={isPending} className="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-foreground px-6 text-sm font-bold text-background disabled:opacity-60">
            <TrendingUp className="size-4" /> {isPending ? "Loading…" : "View"}
          </button>
        </form>

        {error && <p className="mt-4 text-sm font-bold text-rose-foreground">{error.message}</p>}

        {data && (
          <div className="mt-10 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-cobalt p-7 text-cobalt-foreground">
                <strong className="text-5xl font-extrabold">{data.totalLeads}</strong>
                <p className="mt-2 text-sm font-semibold">Total lead actions</p>
              </div>
              <div className="rounded-3xl bg-mint p-7 text-mint-foreground">
                <strong className="text-5xl font-extrabold">{data.last7Days}</strong>
                <p className="mt-2 text-sm font-semibold">In the last 7 days</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Breakdown title="By section of the page" rows={data.bySection} total={data.totalLeads} />
              <Breakdown title="By action" rows={data.byType} total={data.totalLeads} />
              <Breakdown title="Most requested services" rows={data.byService} total={data.totalLeads} />
              <Breakdown title="Areas of Lahore" rows={data.byArea} total={data.totalLeads} />
              <Breakdown title="Phone vs computer" rows={data.byDevice} total={data.totalLeads} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
