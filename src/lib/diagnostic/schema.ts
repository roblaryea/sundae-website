// Zod schema for the AI-generated DiagnosticReport. Matches the engine's
// TypeScript shape exactly so swapping heuristic ↔ AI is transparent to
// the UI.

import { z } from 'zod';

export const LeakHypothesisSchema = z.object({
  id: z.string().describe('kebab-case slug of the leak'),
  title: z.string().describe('Short title - 4-8 words'),
  detail: z.string().describe('2-3 sentence explanation tied to the operator\'s specific responses'),
  impactBand: z.enum(['high', 'medium', 'low']),
  impactCopy: z.string().describe('Directional impact range - explicitly not a customer-specific projection'),
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
  range: z.string().describe('Directional range e.g. "5-14% in first quarter"'),
});

export const SoftUpliftSchema = z.object({
  label: z.string().describe('Short benefit e.g. "Lower turnover & re-training cost"'),
  detail: z.string().describe('One sentence tied to a specific response (pain, tool, segment)'),
});

export const EconomicsSchema = z.object({
  monthlyCost: z.object({
    range: z.string().describe('Indicative Sundae monthly investment as a range, sized to the RIGHT-SIZED starting stack (not a maximal bundle) e.g. "$1,400-2,100 / mo"'),
    basis: z.string().describe('One line: which SKUs × outlet band drove it; call it a starting footprint, not a quote'),
  }),
  currentSpend: z.object({
    range: z.string().describe('Like-for-like "what you spend on this today" — the LOADED cost of the tools + in-house analyst time Sundae consolidates (software slice + reporting headcount). NOT a savings figure. e.g. "$2,100-5,400 / mo"'),
    basis: z.string().describe('One line: the consolidatable software slice of their stated SaaS band PLUS the loaded in-house reporting time (from their analyst headcount). State it is loaded and directional, never a quote.'),
    net: z.string().describe('Honest one-line delta of monthlyCost vs this loaded current spend. If the investment is higher, say so plainly ("≈ +$X/mo over today\'s loaded spend, for one consolidated platform…before the EBITDA return"); only call it a net saving when the investment is genuinely lower. NEVER imply a saving the numbers contradict.'),
  }),
  ebitdaUplift: z.object({
    pctRange: z.string().describe('EBITDA-margin point uplift range, conservative and consistent with the expectedImpact margin lift e.g. "+1-3 margin points"'),
    amountRange: z.string().describe('ANNUAL absolute uplift across the group e.g. "$1.0M-3.0M / yr" - pctRange applied to est. annual revenue. Never monthly (a monthly figure overstates).'),
    basis: z.string().describe('Transparent ladder: pctRange × est. annual revenue (AUV × outlets). State it is an illustrative ceiling assuming full realisation over ~12 months, not a quote'),
  }),
  softUplifts: z.array(SoftUpliftSchema).min(2).max(5).describe('Non-financial uplifts: happier/better-trained staff, happier guests, faster decisions'),
}).describe('Directional economics - ranges derived from comparable operators and list pricing, never a customer-specific quote');

export const DiagnosticReportSchema = z.object({
  profileLine: z.string().describe('One-line summary: "QSR + casual operator · 16 outlets · UAE + KSA"'),
  summary: z.string().describe('2-3 sentence summary referencing their specific blind spot and priority'),
  topLeaks: z.array(LeakHypothesisSchema).min(2).max(3),
  recommendedStack: z.array(StackRecommendationSchema).min(2).max(6),
  expectedImpact: z.array(ExpectedImpactSchema).min(2).max(4),
  quickWins: z.array(QuickWinSchema).length(3).describe('Exactly one entry per horizon: 30, 60, 90'),
  tierFit: z.string().describe('One-line stack summary e.g. "Core Plus + Crew Operating Suite + Watchtower"'),
  economics: EconomicsSchema.optional().describe('Cost / savings / EBITDA uplift / soft uplifts - always include unless inputs are too sparse'),
});
