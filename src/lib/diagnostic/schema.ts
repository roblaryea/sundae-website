// Structured output for the AI narrative (spec 5.1). The model writes only
// these four fields; every other part of the report comes from the rules
// engine. Every property is required so OpenAI strict schemas accept it.

import { z } from "zod";

export const DiagnosticNarrativeSchema = z.object({
  summary: z
    .string()
    .describe("2-3 sentences tying the operator's answers and 90-day priority together. No figures."),
  leaks: z
    .array(
      z.object({
        id: z.string().describe("The hypothesis id exactly as given"),
        explanation: z
          .string()
          .describe("2 sentences: why this hypothesis fits their answers, and what to check with which data. No figures."),
      }),
    )
    .describe("One entry per hypothesis id given, in the same order"),
  plan: z
    .array(
      z.object({
        horizon: z.enum(["30", "60", "90"]),
        title: z.string().describe("Short action, 3-7 words"),
        detail: z.string().describe("1-2 sentences referencing their situation"),
      }),
    )
    .length(3)
    .describe("Exactly one entry per horizon: 30, 60, 90"),
  crewSentence: z
    .string()
    .describe("One sentence on what the Crew package changes for the items they flagged, or an empty string when there is no Crew package"),
});

export type DiagnosticNarrative = z.infer<typeof DiagnosticNarrativeSchema>;
