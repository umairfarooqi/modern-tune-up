import { createServerFn } from "@tanstack/react-start";

export type InsightsSummary = {
  totalLeads: number;
  last7Days: number;
  byType: { label: string; count: number }[];
  bySection: { label: string; count: number }[];
  byService: { label: string; count: number }[];
  byArea: { label: string; count: number }[];
  byDevice: { label: string; count: number }[];
};

type Row = {
  created_at: string;
  event_type: string;
  section: string;
  service: string | null;
  area: string | null;
  device: string | null;
};

function tally(rows: Row[], pick: (row: Row) => string | null | undefined) {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const value = pick(row);
    if (!value) continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export const getLeadInsights = createServerFn({ method: "POST" })
  .inputValidator((input: { accessCode: string }) => ({ accessCode: String(input?.accessCode ?? "") }))
  .handler(async ({ data }): Promise<InsightsSummary> => {
    const expected = process.env["INSIGHTS_ACCESS_CODE"];
    if (!expected || data.accessCode.trim() !== expected) {
      throw new Error("That access code is not correct.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("lead_events")
      .select("created_at, event_type, section, service, area, device")
      .order("created_at", { ascending: false })
      .limit(5000);

    if (error) throw new Error(error.message);
    const events = (rows ?? []) as Row[];
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    return {
      totalLeads: events.length,
      last7Days: events.filter((row) => new Date(row.created_at).getTime() >= weekAgo).length,
      byType: tally(events, (row) => row.event_type),
      bySection: tally(events, (row) => row.section),
      byService: tally(events, (row) => row.service),
      byArea: tally(events, (row) => row.area),
      byDevice: tally(events, (row) => row.device),
    };
  });
