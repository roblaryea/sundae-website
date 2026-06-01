// Sundae-grounded system prompt + user message builder for the AI gateway.
// The system prompt frames Sundae's positioning, modules, tier ladder,
// and required honesty rules. The user message serialises the prospect's
// 18 chip-flow responses + free-text in a structured way so the model
// can reason over them.

import type { DiagnosticResponses } from './engine';

export const SYSTEM_PROMPT = `You are the diagnostic engine for Sundae Technologies — a Decision Intelligence platform for restaurants.

# Your role
Generate a personalised diagnostic report from a prospect's responses to a 15-question survey. Your output is a structured JSON object the website renders as a premium-styled report. This is a high-conversion sales surface; output quality directly drives qualified leads. Be sharp, specific, and honest.

# Sundae's product (so your recommendations are grounded)

**Six intelligence layers:**
1. **Pulse** — Real-time operations. Live shift pacing, exception flags, leakage detection (voids/comps/discounts), labor leak, server-level coaching.
2. **Benchmark** — Anonymous peer benchmarking across 30+ metrics. Network-effect data moat.
3. **Watchtower** — Competitor pricing, market events, weather signal. Surfaced before they hit your numbers.
4. **Insights** — 12 deep modules (Revenue, Labor, Inventory, Purchasing, Marketing, Reservations, Profit, Revenue Assurance, Delivery, Guest Experience, Guest CRM, Item Profitability) + 6 cross-cutting views (Executive Summary, Cross-Intelligence, Foresight, Performance Report, Franchise Health, Outlet Viability).
5. **Sundae Intelligence** — Conversational decision intelligence. Natural-language-to-SQL on real data with source-cited answers. Replaces the spreadsheet → analyst → answer loop.
6. **Foresight** — 14-90 day forecasting, scenario simulation, P&L modeller, what-if sandbox, decision replay.

**Sundae Crew (workforce substrate):**
- Crew Operations + Time & Attendance + Payroll
- Multi-region payroll: 36 country packs (UAE/KSA/Qatar/Bahrain/Oman/Kuwait/Egypt + EU 27 + US/Canada + UK)
- Statutory exports (WPS, NACHA, EFT, HMRC RTI, SEPA)

**Topology-aware:** Sundae natively handles group → brand → region → outlet hierarchies via NodeScope. This is the moat against single-org BI tools.

# Tier ladder (for tierFit + recommendedStack)
- **Report Pro** — 1 outlet, view-only intelligence
- **Core Lite** — 2-15 outlets, full intelligence platform
- **Core Plus** — 16+ outlets, multi-brand consolidation, advanced foresight
- **Crew Lite** — 1-5 outlets entry workforce
- **Crew Operating Suite** — Operations + T&A + Payroll bundle
- **Crew Complete Suite** — + People Intelligence

# Output rules (NON-NEGOTIABLE)

1. **Honest ranges only** — Every quantified impact must be a directional range derived from comparable operator engagements. NEVER a customer-specific projection. Use phrases like "Operators with similar profiles typically..." or "Comparable engagements show..."
2. **Read the free-text fields** (\`blind_spot\` and \`priority\`) and tie at least one leak hypothesis and one quick-win directly to what they wrote.
3. **Multi-select context matters** — if they picked overstaffing + OT leakage + buddy-punching, synthesize ONE connected narrative about their scheduling-to-payroll waste loop, not three separate paragraphs.
4. **Be region/segment specific** — Multi-region operators need country-pack relevance. Fine-dining vs QSR vs cloud kitchen have different leak vectors.
5. **No template language** — Avoid phrases like "Sundae helps..." or "Our platform offers...". Write as a knowledgeable consultant reading their data.
6. **Tier fit must match outlet count** — 1 outlet → Report Pro; 2-15 → Core Lite; 16+ → Core Plus.
7. **Top leaks ranked by impact band** — high → medium → low, max 3 hypotheses.
8. **Recommended stack** — 2-6 layers. Always include Core; only add Crew if labor pain selected; Watchtower if competitor concern; Intelligence if BI/analyst friction; Foresight if forecasting gap.
9. **Quick wins** — exactly 3 entries, one per horizon (30, 60, 90 days). Reference their specific tools/integrations where possible.
10. **Profile line** — one tight line: "[Segments] operator · [N] outlets · [Region(s)]"

# Tone

Sharp B2B consultant. Direct. Numbers when honest. Empathetic to the operator's actual situation. Never marketing-y. Never overpromise. Examples:
- ✗ "Sundae's AI-powered platform helps optimize your operations"
- ✓ "At 33 outlets across UAE + KSA, your weekly close cycle is the binding constraint — every other leak you flagged compounds before you can act on it."`;

function arr(v: string | string[] | undefined): string[] {
  return Array.isArray(v) ? v : v ? [v] : [];
}

const LABEL_MAPS = {
  segment: {
    qsr: 'QSR / Fast food', fast_casual: 'Fast-casual', casual: 'Casual dining',
    fine_dining: 'Fine dining', cloud: 'Cloud kitchen', hotel_fb: 'Hotel F&B',
    cafe_bakery: 'Café / Bakery', bar_nightlife: 'Bar / Nightlife',
    catering: 'Catering / Events', ghost_brand: 'Ghost / Virtual brand',
    franchise: 'Franchise / Master franchisee',
  },
  outlets: {
    '1': '1 outlet', '2_5': '2-5 outlets', '6_15': '6-15 outlets',
    '16_50': '16-50 outlets', '51_150': '51-150 outlets', '150_plus': '150+ outlets',
  },
  region: {
    us: 'United States', canada: 'Canada', uk: 'UK', ireland: 'Ireland',
    europe_west: 'Western Europe', europe_nord: 'Nordics', europe_east: 'Eastern Europe',
    uae: 'UAE', ksa: 'Saudi Arabia', qatar: 'Qatar', kuwait: 'Kuwait',
    bahrain: 'Bahrain', oman: 'Oman', egypt: 'Egypt', africa: 'Africa',
    sea: 'Southeast Asia', india: 'India', japan: 'Japan', korea: 'Korea',
    china_hk: 'China / Hong Kong', anzac: 'Australia / New Zealand',
    mexico: 'Mexico', brazil: 'Brazil', latam_other: 'LATAM (other)',
  },
} as Record<string, Record<string, string>>;

function labelize(qid: string, vals: string[]): string {
  const map = LABEL_MAPS[qid];
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
  lines.push(`- **Outlets:** ${LABEL_MAPS.outlets[outlets ?? ''] ?? '(not specified)'}`);
  lines.push(`- **Regions:** ${labelize('region', regions) || '(not specified)'}`);
  lines.push('');

  lines.push(`## Workforce / Crew`);
  lines.push(`- **Scheduling tools today:** ${arr(responses.scheduling_tool).join(', ') || '(not specified)'}`);
  lines.push(`- **Labor pain points:** ${arr(responses.labor_pain).join(', ') || '(none flagged)'}`);
  lines.push(`- **Payroll regions:** ${arr(responses.payroll_regions).join(', ') || '(none flagged)'}`);
  lines.push('');

  lines.push(`## Decision intelligence`);
  lines.push(`- **KPIs tracked today:** ${arr(responses.kpis_measured).join(', ') || '(not specified)'}`);
  lines.push(`- **KPIs they WISH they could measure but can't (THE GAP — read carefully):** ${arr(responses.kpis_wished).join(', ') || '(none flagged)'}`);
  lines.push(`- **Last major decision — data sources used:** ${arr(responses.decision_data).join(', ') || '(not specified)'}`);
  lines.push('');

  lines.push(`## Foresight / Strategy`);
  lines.push(`- **Forecasting approach:** ${responses.forecasting ?? '(not specified)'}`);
  lines.push(`- **What-if scenarios they wish they could model:** ${arr(responses.scenario_wish).join(', ') || '(none flagged)'}`);
  if (responses.blind_spot) {
    lines.push(`- **BIGGEST BLIND SPOT (operator's own words — TIE A LEAK HYPOTHESIS DIRECTLY TO THIS):**`);
    lines.push(`  > "${String(responses.blind_spot).trim()}"`);
  }
  lines.push('');

  lines.push(`## Tech stack + context`);
  lines.push(`- **POS systems:** ${arr(responses.pos).join(', ') || '(not specified)'}`);
  lines.push(`- **Other ops tools:** ${arr(responses.ops_tools).join(', ') || '(none flagged)'}`);
  lines.push(`- **Timeline to be live:** ${responses.timeline ?? '(not specified)'}`);
  lines.push(`- **Current decision lag (signal-to-action):** ${responses.decision_lag ?? '(not specified)'}`);
  lines.push(`- **Annual ops tech spend (software/SaaS):** ${responses.budget_band ?? '(not specified)'}`);
  lines.push(`- **In-house tech headcount (analysts, BI devs, data engineers):** ${responses.tech_headcount ?? '(not specified)'}`);
  if (responses.priority) {
    lines.push('');
    lines.push(`- **90-day priority (operator's own words — TIE A QUICK-WIN DIRECTLY TO THIS):**`);
    lines.push(`  > "${String(responses.priority).trim()}"`);
  }
  lines.push('');

  lines.push(`# Now generate the diagnostic`);
  lines.push(``);
  lines.push(`Return a structured JSON object matching the DiagnosticReport schema. Remember:`);
  lines.push(`- Reference ${leadData.name.split(' ')[0]}'s specific responses by name in your summary`);
  lines.push(`- Tie at least one leak hypothesis to their **blind_spot** answer (if provided)`);
  lines.push(`- Tie at least one quick-win to their **priority** answer (if provided)`);
  lines.push(`- Synthesise multi-select answers into connected narratives, not parallel paragraphs`);
  lines.push(`- Match tier fit to outlet count exactly`);
  lines.push(`- Output prose as a sharp B2B consultant, not as marketing copy`);

  return lines.join('\n');
}
