CREATE TABLE public.lead_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  event_type text NOT NULL CHECK (event_type IN ('whatsapp_click','phone_call','form_submit','ai_recommendation','ai_booking')),
  section text NOT NULL,
  service text,
  area text,
  device text CHECK (device IN ('mobile','desktop')),
  session_key text
);

CREATE INDEX lead_events_created_at_idx ON public.lead_events (created_at DESC);
CREATE INDEX lead_events_section_idx ON public.lead_events (section);

GRANT INSERT ON public.lead_events TO anon;
GRANT INSERT ON public.lead_events TO authenticated;
GRANT ALL ON public.lead_events TO service_role;

ALTER TABLE public.lead_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record a lead event"
ON public.lead_events FOR INSERT TO anon, authenticated
WITH CHECK (true);
