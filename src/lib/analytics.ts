import { supabase } from "@/integrations/supabase/client";

/**
 * Privacy-conscious lead analytics.
 * Records only which part of the page produced a lead and which service/area was
 * chosen. No names, phone numbers, message text, cookies or cross-site identifiers.
 */

export type LeadEventType = "whatsapp_click" | "phone_call" | "form_submit" | "ai_recommendation" | "ai_booking";

export type LeadEvent = {
  event_type: LeadEventType;
  section: string;
  service?: string | null | undefined;
  area?: string | null | undefined;
};

const SESSION_STORAGE_KEY = "mc_session_key";

function sessionKey(): string | null {
  if (typeof window === "undefined") return null;
  try {
    let key = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!key) {
      key = Math.random().toString(36).slice(2, 12);
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, key);
    }
    return key;
  } catch {
    return null;
  }
}

export function trackLead(event: LeadEvent) {
  if (typeof window === "undefined") return;
  const payload = {
    event_type: event.event_type,
    section: event.section,
    service: event.service ?? null,
    area: event.area ?? null,
    device: window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop",
    session_key: sessionKey(),
  };
  void supabase
    .from("lead_events")
    .insert(payload)
    .then(({ error }) => {
      if (error) console.warn("lead event not recorded", error.message);
    });
}
