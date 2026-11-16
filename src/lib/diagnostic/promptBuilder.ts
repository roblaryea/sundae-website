// Sundae-grounded system prompt + user message builder for the AI gateway.
// The system prompt frames Sundae's positioning, modules, tier ladder,
// and required honesty rules. The user message serialises the prospect's
// focused public responses in a structured way so the model
// can reason over them.

import type { DiagnosticReport, DiagnosticResponses } from './engine';
import { QUESTIONS } from './questions';
import type { WebsiteLocale } from '@/lib/i18n';
import { priceBookForPrompt } from '@/lib/pricing/priceBook';
import { getDiagnosticPromptInstruction } from './i18n';
import { diagnosticOtherDetails } from './flowLogic';

export const SYSTEM_PROMPT = `You are the diagnostic engine for Sundae Technologies - a Decision Intelligence platform for restaurants.

# Your role
Generate a personalised diagnostic report from a prospect's focused operating assessment. Your output is a structured JSON object the website renders as a premium-styled report. This is a high-conversion sales surface; output quality directly drives qualified leads. Be sharp, specific, and honest.

# Sundae's product (so your recommendations are grounded)

**Six intelligence layers:**
1. **Pulse** - Real-time operations. Live shift pacing, exception flags, leakage detection (voids/comps/discounts), labor leak, server-level coaching.
2. **Benchmark** - Anonymous peer benchmarking across 30+ metrics. Network-effect data moat.
3. **Watchtower** - Competitor pricing, market events, weather signal. Surfaced before they hit your numbers.
4. **Insights** - 12 deep modules (Revenue, Labor, Inventory, Purchasing, Marketing, Reservations, Profit, Revenue Assurance, Delivery, Guest Experience, Guest CRM, Item Profitability) + 6 cross-cutting views (Executive Summary, Cross-Intelligence, Foresight, Performance Report, Franchise Health, Outlet Viability).
5. **Ask Sundae** - Conversational decision intelligence. Natural-language-to-SQL on real data with source-cited answers. Replaces the spreadsheet → analyst → answer loop.
6. **Foresight** - 14-90 day forecasting, scenario simulation, P&L modeller, what-if sandbox, decision replay.

**Sundae Crew (workforce substrate):**
- Crew Manage + Crew Time + Crew Pay (bundled as Crew Operating)
- Multi-region payroll: 36 country packs (UAE/KSA/Qatar/Bahrain/Oman/Kuwait/Egypt + EU 27 + US/Canada + UK)
- Statutory exports (WPS, NACHA, EFT, HMRC RTI, SEPA)

**Topology-aware:** Sundae natively handles group → brand → region → outlet hierarchies via NodeScope. This is the moat against single-org BI tools.

# Package ladder (for tierFit + recommendedStack)
The four Core packages are differentiated by CAPABILITY, not by outlet count.
Choose on the gaps the operator actually flagged, and default DOWN when unsure:
- **Core Foundation** - the operating baseline: one decision substrate over POS, labor and cost
- **Core Margin** - for cost/leakage gaps: food cost, waste, voids/comps, item-level profit
- **Core Growth** - for demand-side gaps: guest LTV, retention cohorts, promo ROI, delivery margin
- **Core Performance** - large multi-region groups carrying both margin AND growth gaps
Crew packaging: Crew Starter / Schedule / Manage / Time / Pay / People, bundled as
Schedule & Time, Crew Operating, or Crew Complete.

# List pricing (for the economics block)
${priceBookForPrompt()}

# Output rules (NON-NEGOTIABLE)

1. **Honest ranges only** - Use ONLY the quantified ranges supplied in the authoritative envelope in the user message. Never invent a benchmark, typical result, implementation duration, analyst headcount, current software budget, or customer-specific projection. When the envelope has no supported number, state what must be measured before an estimate can be made.
2. **Read the operator's own words** - tie at least one leak hypothesis and one quick-win directly to their \`priority\` response. If a legacy \`blind_spot\` response is present, use it too.
3. **Multi-select context matters** - if they picked overstaffing + OT leakage + buddy-punching, synthesize ONE connected narrative about their scheduling-to-payroll waste loop, not three separate paragraphs.
4. **Be region/segment specific** - Multi-region operators need country-pack relevance. Fine-dining vs QSR vs cloud kitchen have different leak vectors.
5. **No template language** - Avoid phrases like "Sundae helps..." or "Our platform offers...". Write as a knowledgeable consultant reading their data.
   - Never use the phrases: "leverages", "AI-powered", "comprehensive solution",
     "robust platform", "best-in-class", "industry-leading", "cutting-edge",
     "synergies", "transform your operations". These read as marketing speak.
   - Write like a consultant reading their P&L, not like a vendor pitching.
6. **Package fit must match the flagged GAPS, not the outlet count** - pick the Core package whose capability answers what they said they cannot see today, and default DOWN to Core Foundation when the signal is thin. Never name a retired SKU (Report Lite/Plus/Pro, Core Lite, Core Pro) and never imply a free tier exists.
7. **Top leaks ranked by impact band** - high → medium → low, max 3 hypotheses.
8. **Recommended stack - RIGHT-SIZED to their scale and budget (CRITICAL)** - 1-6 layers. Always include Core. Recommend the stack a group of THEIR size and budget would realistically land on, not a maximal end-state bundle:
   - Crew: only if labor pain or manual scheduling. Pick the RIGHT Crew packaging - Crew Operating (Manage + Time + Pay) ONLY for multi-region payroll (2+ payroll countries) or 16+ outlets; otherwise Crew Schedule, or Schedule & Time if buddy-punching/no-shows. Do NOT default everyone to the priciest Crew bundle.
   - Watchtower: only at SCALE (≥6 outlets) AND a genuine competitor concern. It has NO published list price - describe it as scoped and quoted separately, and keep it OUT of the monthly figure. Never invent a number for it.
   - Intelligence (Ask Sundae / NL-to-SQL) is part of Core - include it as a layer for the narrative but it does NOT add a separate cost line.
   - The eleven Core domain modules (Labor, Inventory, Purchasing, Marketing, Reservations, Profit, Revenue Assurance, Delivery, Guest Experience, Pulse, Guest CRM) are PACKAGE COMPONENTS. Describe them as what the recommended Core package already INCLUDES. Never present one as a separate purchase and never attach a per-module price.
   - Foresight & Action: if a forecasting gap or 2+ what-if scenarios.
   - For small operators (≤15 outlets and/or sub-$25K SaaS spend) keep the stack focused (Core + one Crew package + at most one or two specialised lenses). If broader capability fits later, describe it as an EXPANSION PATH in prose - never bundle it into the headline cost. A $10-25K-spend operator running Core + Crew Operating + Watchtower + Foresight & Action is not believable and reads as a sales-y over-quote.
9. **Quick wins** - exactly 3 entries, one per horizon (30, 60, 90 days). Reference their specific tools/integrations where possible.
   - Day 30 is discovery, connection, reconciliation, and a small pilot. Never promise an all-outlet or multi-country rollout in one sprint unless the intake explicitly says the sources are already connected and validated.
   - Day 60 may expand a proven pilot. Day 90 may establish the recurring management rhythm. Make prerequisites visible rather than presenting implementation as automatic.
10. **Profile line** - one tight line: "[Segments] operator · [N] outlets · [Region(s)]"
11. **Name discipline (HARD LIMIT)** - Use the operator's first name AT MOST TWICE in the ENTIRE report - ideally once in the summary and nowhere else. Count your uses before finishing. Everywhere else use "you" / "your operation" / "the group". More than twice reads like a mail-merge, not a consultant who knows the business.
12. **Vendor neutrality** - NEVER name the AI model, provider, or vendor behind this analysis, and never describe the output as "AI-generated" or "powered by [X]". You are Sundae's diagnostic engine - speak as Sundae, in the first person plural where natural ("we'd surface...").
13. **Timeline awareness** - If a go-live timeline is provided, let it shape urgency in the summary or the 30-day quick-win (tie the first move to their stated window). Never invent specific calendar dates.
14. **Pricing and financial evidence** - Canonical list pricing is attached after generation. Do not generate an economics block, assume current software spend, assign an analyst cost, claim comparable-operator results, or calculate savings, ROI or margin uplift. This intake establishes validation priorities, not financial returns. State what source records, baseline, action and comparison would be needed to establish an outcome. Never turn an operator concern into a proven loss or a suggested intervention into an achieved result.

# Tone

Sharp B2B consultant. Direct. Numbers when honest. Empathetic to the operator's actual situation. Never marketing-y. Never overpromise. Examples:
- ✗ "Sundae's AI-powered platform helps optimize your operations"
- ✓ "At 33 outlets across UAE + KSA, your weekly close cycle is the binding constraint - every other leak you flagged compounds before you can act on it."

# Voice consistency

This prompt may be executed by GPT-5 mini or Claude Haiku 4.5 depending on
provider availability. Maintain identical structural rigor, identical
honesty about impact ranges, and identical refusal to use marketing
language regardless of which model you are. The prospect cannot tell
which model handled their request - the output must read the same.`;

function arr(v: string | string[] | undefined): string[] {
  return Array.isArray(v) ? v : v ? [v] : [];
}

// Lead the report with the lens the buyer's role actually cares about. The
// model still covers everything — this just sets what leads the summary.
function roleFraming(role: string): string {
  const r = role.toLowerCase();
  if (/cfo|finance/.test(r))
    return "This reader is a FINANCE leader - lead the summary and economics with EBITDA impact, margin points, and the loaded cost of the current stack vs. the consolidated investment. Money first.";
  if (/coo|operations|operating/.test(r))
    return "This reader is an OPERATIONS leader - lead with the labor/daypart leaks, decision-lag compression (signal-to-action), and execution consistency across outlets.";
  if (/ceo|founder|owner|managing/.test(r))
    return "This reader is the OWNER/CEO - lead with the whole-business picture: the biggest leak, the one strategic move, and the EBITDA upside. Keep it boardroom-tight.";
  if (/data|technology|bi|analyst|it\b/.test(r))
    return "This reader owns DATA/TECH - lead with consolidation (replacing the BI/dashboard layer + analyst-pull loop), NL-to-SQL self-serve, and topology-aware multi-entity reporting.";
  if (/marketing/.test(r))
    return "This reader leads MARKETING - lead with guest LTV/retention, promo ROI by channel, and delivery-channel margin.";
  if (/people|hr|human/.test(r))
    return "This reader leads PEOPLE/HR - lead with turnover/re-training cost, scheduling fairness, payroll readiness, and statutory compliance.";
  if (/franchise/.test(r))
    return "This reader is a FRANCHISE leader - lead with multi-brand consolidated P&L, brand-standard/compliance drift, and outlet-viability comparison.";
  return "Lead with the highest-impact leak for this profile and the consolidation + EBITDA story.";
}

// Value→label lookup derived from the question catalog - single source of
// truth, so the model always reads human labels (e.g. "Real-time labor
// productivity (sales per labor hour)") rather than raw slugs.
const OPTION_LABELS: Record<string, Record<string, string>> = {};
for (const q of QUESTIONS) {
  if (!q.options) continue;
  OPTION_LABELS[q.id] = {};
  for (const o of q.options) OPTION_LABELS[q.id][o.value] = o.label;
}

function labelize(qid: string, vals: string[]): string {
  const map = OPTION_LABELS[qid];
  if (!map) return vals.join(', ');
  return vals.map((v) => map[v] ?? v).join(', ');
}

/**
 * Builds the structured user message that the AI reads to generate the
 * diagnostic. We serialise responses by dimension so the model can scan
 * cleanly, and call out free-text fields explicitly with prompts to tie
 * the report back to them.
 */
export function buildUserMessage(
  responses: DiagnosticResponses,
  leadData: { name: string; role: string; country: string; company: string },
  locale: WebsiteLocale = 'en',
  referenceReport?: DiagnosticReport,
): string {
  const segments = arr(responses.segment);
  const regions = arr(responses.region);
  const outlets = responses.outlets as string | undefined;

  const lines: string[] = [];
  lines.push(`# Prospect intake`);
  lines.push('');
  lines.push(`**Name:** ${leadData.name}`);
  lines.push(`**Role:** ${leadData.role}`);
  lines.push(`**Company:** ${leadData.company}`);
  lines.push(`**Country (HQ):** ${leadData.country}`);
  lines.push('');

  lines.push(`## Operation profile`);
  lines.push(`- **Segments:** ${labelize('segment', segments) || '(not specified)'}`);
  lines.push(`- **Outlets:** ${labelize('outlets', arr(outlets)) || '(not specified)'}`);
  lines.push(`- **Avg revenue per outlet (AUV):** ${labelize('avg_unit_volume', arr(responses.avg_unit_volume)) || '(not provided - estimate from segment averages for the EBITDA range and say it is illustrative)'}`);
  lines.push(`- **Regions:** ${labelize('region', regions) || '(not specified)'}`);
  lines.push('');

  lines.push(`## Workforce / Crew`);
  lines.push(`- **Scheduling tools today:** ${labelize('scheduling_tool', arr(responses.scheduling_tool)) || '(not specified)'}`);
  lines.push(`- **Labor pain points:** ${labelize('labor_pain', arr(responses.labor_pain)) || '(none flagged)'}`);
  lines.push(`- **Payroll regions:** ${labelize('payroll_regions', arr(responses.payroll_regions)) || '(none flagged)'}`);
  lines.push('');

  lines.push(`## Decision intelligence`);
  lines.push(`- **KPIs tracked today:** ${labelize('kpis_measured', arr(responses.kpis_measured)) || '(not specified)'}`);
  lines.push(`- **KPIs they WISH they could measure but can't (THE GAP - read carefully):** ${labelize('kpis_wished', arr(responses.kpis_wished)) || '(none flagged)'}`);
  if (responses.decision_data) {
    lines.push(`- **Last major decision - data sources used:** ${labelize('decision_data', arr(responses.decision_data))}`);
  }
  lines.push('');

  lines.push(`## Foresight / Strategy`);
  lines.push(`- **Forecasting approach:** ${labelize('forecasting', arr(responses.forecasting)) || responses.forecasting || '(not specified)'}`);
  lines.push(`- **What-if scenarios they wish they could model:** ${labelize('scenario_wish', arr(responses.scenario_wish)) || '(none flagged)'}`);
  if (responses.blind_spot) {
    lines.push(`- **BIGGEST BLIND SPOT (operator's own words - TIE A LEAK HYPOTHESIS DIRECTLY TO THIS):**`);
    lines.push(`  > "${String(responses.blind_spot).trim()}"`);
  }
  lines.push('');

  lines.push(`## Tech stack + context`);
  lines.push(`- **POS systems:** ${labelize('pos', arr(responses.pos)) || '(not specified)'}`);
  lines.push(`- **Other ops tools:** ${labelize('ops_tools', arr(responses.ops_tools)) || '(none flagged)'}`);
  if (responses.timeline) lines.push(`- **Timeline to be live:** ${labelize('timeline', arr(responses.timeline)) || responses.timeline}`);
  if (responses.decision_lag) lines.push(`- **Current decision lag (signal-to-action):** ${labelize('decision_lag', arr(responses.decision_lag)) || responses.decision_lag}`);
  if (responses.budget_band) lines.push(`- **Annual ops tech spend (software/SaaS):** ${labelize('budget_band', arr(responses.budget_band)) || responses.budget_band}`);
  if (responses.tech_headcount) lines.push(`- **In-house tech headcount (analysts, BI devs, data engineers):** ${responses.tech_headcount}`);
  for (const { questionId, detail } of diagnosticOtherDetails(responses, ['scheduling_tool', 'payroll_regions', 'pos'])) {
    lines.push(`- **Other ${questionId.replaceAll('_', ' ')} detail:** ${detail}`);
  }
  if (responses.priority) {
    lines.push('');
    lines.push(`- **90-day priority (operator's own words - TIE A QUICK-WIN DIRECTLY TO THIS):**`);
    lines.push(`  > "${String(responses.priority).trim()}"`);
  }
  lines.push('');

  lines.push(`# Now generate the diagnostic`);
  lines.push(``);
  if (referenceReport) {
    lines.push(`## Authoritative product and evidence envelope (DO NOT OVERRIDE)`);
    lines.push(`- **Eligible starting stack:** ${referenceReport.tierFit}`);
    lines.push(`- **Allowed product layers:** ${referenceReport.recommendedStack.map((item) => `${item.layer}: ${item.label}`).join('; ')}`);
    lines.push(`- **Measures to validate (not promised outcomes):** ${referenceReport.expectedImpact.map((item) => `${item.metric}: ${item.range}`).join('; ')}`);
    lines.push(`- **Allowed leak evidence:** ${referenceReport.topLeaks.map((item) => `${item.title}: ${item.impactCopy}`).join('; ')}`);
    lines.push(`- Canonical pricing and economics are applied after generation. Do not output an economics block and do not calculate or infer a different outlet point, budget, analyst headcount, or price.`);
    lines.push(`- Do not recommend a product layer that is absent from the eligible starting stack. Describe other capability only as a future validation question, not as part of the recommendation.`);
    lines.push(``);
  }
  lines.push(`## Framing for this buyer (role: ${leadData.role || "unspecified"})`);
  lines.push(roleFraming(leadData.role || ""));
  lines.push(``);
  lines.push(`## Language and glossary`);
  lines.push(getDiagnosticPromptInstruction(locale));
  lines.push(``);
  lines.push(`Return a structured JSON object matching the DiagnosticReport schema. Remember:`);
  lines.push(`- Address the operation as "you" / "your operation" / "the group". You may use the first name "${leadData.name.split(' ')[0]}" ONCE, in the summary only - never again anywhere in the report (hard limit).`)
  lines.push(`- Tie at least one leak hypothesis to their own words in **priority** (and **blind_spot** if a legacy answer is present)`);
  lines.push(`- Tie at least one quick-win to their **priority** answer (if provided)`);
  lines.push(`- Synthesise multi-select answers into connected narratives, not parallel paragraphs`);
  lines.push(`- Match tier fit and product layers to the authoritative eligibility envelope exactly`);
  lines.push(`- Output prose as a sharp B2B consultant, not as marketing copy`);

  return lines.join('\n');
}
