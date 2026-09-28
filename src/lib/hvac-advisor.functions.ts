import { createServerFn } from "@tanstack/react-start";

export type AdvisorInput = {
  symptoms: string;
  propertyType: string;
  equipment: string;
  area: string;
};

function validate(input: AdvisorInput): AdvisorInput {
  const symptoms = String(input?.symptoms ?? "").trim();
  if (symptoms.length < 10) throw new Error("Please describe the problem in a little more detail.");
  return {
    symptoms: symptoms.slice(0, 1200),
    propertyType: String(input?.propertyType ?? "Home").slice(0, 60),
    equipment: String(input?.equipment ?? "Split AC").slice(0, 80),
    area: String(input?.area ?? "Lahore").slice(0, 60),
  };
}

export const getServiceRecommendation = createServerFn({ method: "POST" })
  .inputValidator(validate)
  .handler(async ({ data }) => {
    const { diagnoseSymptoms } = await import("./ai/diagnose.server");
    return diagnoseSymptoms(data);
  });
