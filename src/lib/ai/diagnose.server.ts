import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";

import { createLovableAiGatewayRunIdFetch } from "./run-id";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";

export const MODERN_COOL_SERVICES = [
  "Split AC Deep Chemical Wash",
  "Inverter AC PCB Repair & Troubleshooting",
  "Refrigerant Leak Detection & Gas Charge (R32 / R410A)",
  "AC Installation & Relocation",
  "Industrial Chiller Maintenance & Overhaul",
  "Cold Storage & Blast Freezer AMC",
] as const;

export type Diagnosis = {
  likelyIssue: string;
  recommendedService: string;
  urgency: "routine" | "soon" | "urgent";
  explanation: string;
  steps: string[];
  safetyNote: string;
  bookingSummary: string;
};

const SYSTEM_PROMPT = `You are a senior HVAC and refrigeration service advisor for Modern Cool, a company in Lahore, Pakistan.
Customers describe cooling problems in plain language (homeowners and factory/facility managers).

Rules:
- Recommend exactly one service from this list, copied verbatim: ${MODERN_COOL_SERVICES.join(" | ")}
- Never claim a confirmed diagnosis; say what is most likely and that a technician must verify on site.
- Mention electrical/gas safety when relevant. Never tell the customer to open sealed refrigerant circuits or live electrical parts.
- Keep language simple, warm and locally natural for Lahore. No jargon dumps.
- bookingSummary: 2-3 short sentences written in first person as the customer, for sending on WhatsApp. Include the symptom, likely issue and the recommended service. No greetings, no phone numbers.

Reply with ONLY a JSON object, no markdown fences, using exactly these keys:
{"likelyIssue":string,"recommendedService":string,"urgency":"routine"|"soon"|"urgent","explanation":string,"steps":string[],"safetyNote":string,"bookingSummary":string}
Keep explanation under 60 words and give 2-4 steps.`;

function extractJson(text: string): unknown {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON in model response");
  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function diagnoseSymptoms(input: {
  symptoms: string;
  propertyType: string;
  equipment: string;
  area: string;
}): Promise<Diagnosis> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) throw new Error("AI service is not configured.");

  const runIdFetch = createLovableAiGatewayRunIdFetch();
  const provider = createOpenAI({
    baseURL: GATEWAY_URL,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const messages: ModelMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: `Property type: ${input.propertyType}
Equipment: ${input.equipment}
Area in Lahore: ${input.area}
Symptoms described: ${input.symptoms}`,
    },
  ];

  const result = streamText({
    model: provider.responses(MODEL),
    messages,
    maxRetries: 0,
    providerOptions: {
      openai: {
        store: false,
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const text = await result.text;
  const parsed = extractJson(text) as Diagnosis;

  const recommendedService = MODERN_COOL_SERVICES.includes(
    parsed.recommendedService as (typeof MODERN_COOL_SERVICES)[number],
  )
    ? parsed.recommendedService
    : MODERN_COOL_SERVICES[0];

  return {
    likelyIssue: String(parsed.likelyIssue ?? "Needs an on-site check"),
    recommendedService,
    urgency: (["routine", "soon", "urgent"] as const).includes(parsed.urgency) ? parsed.urgency : "soon",
    explanation: String(parsed.explanation ?? ""),
    steps: Array.isArray(parsed.steps) ? parsed.steps.slice(0, 4).map(String) : [],
    safetyNote: String(parsed.safetyNote ?? "A trained technician should verify this on site."),
    bookingSummary: String(parsed.bookingSummary ?? input.symptoms),
  };
}
