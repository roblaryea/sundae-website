// Zod schema for the AI-generated DiagnosticReport. Matches the engine's
// TypeScript shape exactly so swapping heuristic ↔ AI is transparent to
// the UI.

import { z } from 'zod';

export const LeakHypothesisSchema = z.object({
  id: z.string().describe('kebab-case slug of the leak'),
  title: z.string().describe('Short title — 4-8 words'),
  detail: z.string().describe('2-3 sentence explanation tied to the operator\'s specific responses'),
  impactBand: z.enum(['high', 'medium', 'low']),
  impactCopy: z.string().describe('Directional impact range — explicitly not a customer-specific projection'),
});

export const StackRecommendationSchema = z.object({
  layer: z.enum(['core', 'crew', 'watchtower', 'intelligence', 'foresight']),
  label: z.string().describe('Product name e.g. "Sundae Core" or "Crew Operating Suite"'),
  why: z.string().describe('One-sentence rationale tied to a specific response'),
  detail: z.string().describe('Brief description of what it includes for this prospect'),
});

export const QuickWinSchema = z.object({
  horizon: z.enum(['30', '60', '90']),
  title: z.string().describe('Specific action e.g. "Connect POS + scheduling"'),
  detail: z.string().describe('1-2 sentences referencing their specific situation'),
});

export const ExpectedImpactSchema = z.object({
  metric: z.string().describe('e.g. "Labor cost reduction"'),
  range: z.string().describe('Directional range e.g. "5–14% in first quarter"'),
});

export const DiagnosticReportSchema = z.object({
  profileLine: z.string().describe('One-line summary: "QSR + casual operator · 16 outlets · UAE + KSA"'),
  summary: z.string().describe('2-3 sentence summary referencing their specific blind spot and priority'),
  topLeaks: z.array(LeakHypothesisSchema).min(2).max(3),
  recommendedStack: z.array(StackRecommendationSchema).min(2).max(6),
  expectedImpact: z.array(ExpectedImpactSchema).min(2).max(4),
  quickWins: z.array(QuickWinSchema).length(3).describe('Exactly one entry per horizon: 30, 60, 90'),
  tierFit: z.string().describe('One-line stack summary e.g. "Core Plus + Crew Operating Suite + Watchtower"'),
});
