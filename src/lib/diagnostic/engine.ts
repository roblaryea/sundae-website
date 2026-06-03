/**
 * Sundae Operations Diagnostic — analysis engine.
 *
 * Maps response patterns to:
 *   • A short narrative summary
 *   • Top 3 ranked margin-leak hypotheses with directional impact ranges
 *   • Recommended Sundae stack (modules + Crew SKUs + tier)
 *   • Expected-impact ranges (clearly directional, not promised)
 *   • 30/60/90-day quick-wins plan
 *
 * Built as a deterministic heuristic engine for the v1 ship. The
 * `/api/diagnostic/route.ts` POST endpoint wraps this and is the
 * swap-point: in v2 the engine call gets replaced with a live AI
 * gateway call that returns the same DiagnosticReport shape — no UI
 * changes needed.
 */

import { QUESTIONS } from "./questions";

export type DiagnosticResponses = Record<string, string | string[]>;

export interface LeakHypothesis {
  id: string;
  title: string;
  detail: string;
  impactBand: "high" | "medium" | "low";
  /** Directional only — never promised. */
  impactCopy: string;
}

export interface StackRecommendation {
  layer: "core" | "crew" | "watchtower" | "intelligence" | "foresight";
  label: string;
  why: string;
  /** Display label e.g. "Crew Operations + T&A + Payroll" */
  detail: string;
}

export interface QuickWin {
  horizon: "30" | "60" | "90";
  title: string;
  detail: string;
}

export interface SoftUplift {
  label: string;
  detail: string;
}

export interface Economics {
  monthlyCost: { range: string; basis: string };
  monthlySavings: { range: string; basis: string };
  ebitdaUplift: { pctRange: string; amountRange: string; basis: string };
  softUplifts: SoftUplift[];
}

export interface DiagnosticReport {
  /** Short narrative — one paragraph */
  summary: string;
  /** Sundae's read of their profile in one line */
  profileLine: string;
  topLeaks: LeakHypothesis[];
  recommendedStack: StackRecommendation[];
  expectedImpact: { metric: string; range: string }[];
  quickWins: QuickWin[];
  /** Tier suggestion, e.g. "Core Plus + Crew Operating Suite" */
  tierFit: string;
  /** Directional economics — cost, savings, EBITDA uplift, soft uplifts. Optional: present on the AI path and the heuristic path, absent only on sparse input. */
  economics?: Economics;
}

// ─── Helpers ────────────────────────────────────────────────────────
const arr = (v: string | string[] | undefined): string[] =>
  Array.isArray(v) ? v : v ? [v] : [];

const has = (v: string | string[] | undefined, t: string): boolean =>
  arr(v).includes(t);

const outletCountValue = (v?: string): number => {
  switch (v) {
    case "1": return 1;
    case "2_5": return 4;
    case "6_15": return 10;
    case "16_50": return 33;
    case "51_150": return 100;
    case "150_plus": return 200;
    default: return 1;
  }
};

const segmentLabel = (vals: string[]): string => {
  const map: Record<string, string> = {
    qsr: "QSR", fast_casual: "fast-casual", casual: "casual-dining",
    fine_dining: "fine-dining", cloud: "cloud-kitchen", hotel_fb: "hotel F&B",
    cafe_bakery: "café / bakery", bar_nightlife: "bar / nightlife",
    catering: "catering", ghost_brand: "ghost brand", franchise: "franchise",
  };
  const labels = vals.map((v) => map[v]).filter(Boolean);
  if (labels.length === 0) return "hospitality";
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} + ${labels[1]}`;
  return `multi-segment (${labels.slice(0, 2).join(", ")} + ${labels.length - 2} more)`;
};

const regionLabel = (vals: string[]): string => {
  const map: Record<string, string> = {
    us: "US", canada: "Canada", uk: "UK", ireland: "Ireland",
    europe_west: "Western Europe", europe_nord: "Nordics", europe_east: "Eastern Europe",
    uae: "UAE", ksa: "Saudi Arabia", qatar: "Qatar", kuwait: "Kuwait",
    bahrain: "Bahrain", oman: "Oman", egypt: "Egypt", africa: "Africa",
    sea: "Southeast Asia", india: "India", japan: "Japan", korea: "Korea",
    china_hk: "China / HK", anzac: "ANZ", mexico: "Mexico", brazil: "Brazil",
    latam_other: "LATAM",
  };
  const labels = vals.map((v) => map[v]).filter(Boolean);
  if (labels.length === 0) return "regional";
  if (labels.length === 1) return labels[0];
  if (labels.length <= 3) return labels.join(" + ");
  return `multi-region (${labels.length} markets including ${labels.slice(0, 2).join(", ")})`;
};

// ─── Engine ─────────────────────────────────────────────────────────
// ─── Economics helpers (directional list-pricing math) ──────────────
const AUV_MID: Record<string, number> = {
  under_500k: 400_000, "500k_1m": 750_000, "1m_2m": 1_500_000,
  "2m_4m": 3_000_000, "4m_7m": 5_500_000, "7m_plus": 9_000_000,
};
const BUDGET_MID: Record<string, number> = {
  under_10k: 7_000, "10_25k": 17_000, "25_50k": 37_000, "50_100k": 75_000,
  "100_250k": 175_000, "250_500k": 375_000, "500k_1m": 750_000, "1m_plus": 1_300_000,
};
const money = (n: number): string =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M`
  : n >= 10_000 ? `$${Math.round(n / 1000)}K`
  : n >= 1_000 ? `$${(n / 1000).toFixed(1)}K`   // sub-$10K: one decimal so ranges don't collapse
  : `$${Math.round(n / 10) * 10}`;

function computeEconomics(
  responses: DiagnosticResponses,
  stack: StackRecommendation[],
  outlets: number,
): Economics {
  const hasCrew = stack.some((s) => s.layer === "crew");
  const hasWatch = stack.some((s) => s.layer === "watchtower");
  const moduleCount = stack.filter((s) => s.layer === "intelligence" || s.layer === "foresight").length;

  const coreTier = outlets <= 1 ? "Report Pro" : outlets <= 15 ? "Core Lite" : "Core Pro";
  const [base, perLoc] = outlets <= 1 ? [159, 59] : outlets <= 15 ? [279, 79] : [449, 89];
  let monthly = base + perLoc * outlets;
  if (hasCrew) monthly += 502 + 102 * outlets;        // Crew Operating Suite
  if (hasWatch) monthly += 199 + 19 * outlets;        // Watchtower add-on (indicative)
  monthly += moduleCount * (149 + 14 * outlets) * 0.5; // specialized modules, dampened

  const budgetAnnual = BUDGET_MID[String(responses.budget_band ?? "")];
  const savings = budgetAnnual
    ? { range: `${money((budgetAnnual / 12) * 0.3)}–${money((budgetAnnual / 12) * 0.6)} / mo`,
        basis: `Consolidating roughly 30–60% of your ~${money(budgetAnnual / 12)}/mo current ops-tech spend (BI, scheduling, reporting).` }
    : { range: `${money(120 * outlets)}–${money(300 * outlets)} / mo`,
        basis: `Typical replaced-tooling savings across ~${outlets} outlets (BI, scheduling, reporting). Add your SaaS spend for a tighter figure.` };

  const auv = AUV_MID[String(responses.avg_unit_volume ?? "")];
  const annualRev = auv ? auv * outlets : 0;
  const ebitdaUplift = auv
    ? { pctRange: "+1–3 margin points",
        amountRange: `${money(annualRev * 0.01)}–${money(annualRev * 0.03)} / yr`,
        basis: `≈ the +1–3 margin-point range on est. ${money(annualRev)} revenue (${money(auv)} AUV × ${outlets} outlets). Illustrative ceiling assuming full realisation over ~12 months — not a quote.` }
    : { pctRange: "+1–3 margin points",
        amountRange: "Add your AUV to size this",
        basis: "Share average revenue per outlet to convert the margin-point range into an annual figure." };

  const softUplifts: SoftUplift[] = [];
  if (has(responses.labor_pain, "turnover")) {
    softUplifts.push({ label: "Lower turnover & re-training cost", detail: "Fairer, demand-matched scheduling cuts churn and the re-hire/retrain treadmill." });
  }
  softUplifts.push({ label: "Better-trained, more confident staff", detail: "Shift-level coaching and consistent playbooks raise floor execution without adding headcount." });
  softUplifts.push({ label: "Happier guests", detail: "Faster service and fewer stockouts/voids lift the experience that drives repeat visits." });
  softUplifts.push({ label: "Faster, calmer decisions", detail: "Signal-to-action drops from weekly close to same-day — the team acts before margin is booked." });

  return {
    monthlyCost: {
      range: `${money(monthly * 0.85)}–${money(monthly * 1.2)} / mo`,
      basis: `${coreTier}${hasCrew ? " + Crew Operating Suite" : ""}${hasWatch ? " + Watchtower" : ""} across ~${outlets} outlets (list pricing).`,
    },
    monthlySavings: savings,
    ebitdaUplift,
    softUplifts: softUplifts.slice(0, 4),
  };
}

export function runDiagnostic(responses: DiagnosticResponses): DiagnosticReport {
  const outlets = outletCountValue(responses.outlets as string | undefined);
  const segment = segmentLabel(arr(responses.segment));
  const region = regionLabel(arr(responses.region));

  // Profile line
  const profileLine = `${segment.charAt(0).toUpperCase() + segment.slice(1)} operator · ${outlets} outlet${outlets === 1 ? "" : "s"} · ${region}`;

  // ─── Leak hypotheses ─────────────────────────────────────────────
  const topLeaks: LeakHypothesis[] = [];

  // Labor leak (high signal)
  if (has(responses.labor_pain, "overstaffing")) {
    topLeaks.push({
      id: "daypart_overstaffing",
      title: "Daypart overstaffing leak",
      detail: "Slow windows are running with peak-hour FTE counts. Sundae Pulse identifies these in real time and surfaces the shift to cut before payroll is locked.",
      impactBand: "high",
      impactCopy: outlets >= 6
        ? `Operators with similar profiles typically recover 5–14% of weekly labor cost — at ${outlets} outlets this compounds significantly.`
        : "Operators with similar profiles typically recover 5–14% of weekly labor cost.",
    });
  }

  // OT leakage
  if (has(responses.labor_pain, "ot_leakage")) {
    topLeaks.push({
      id: "ot_leakage",
      title: "Overtime leakage",
      detail: "OT often compounds because schedule + actual hours aren't visible until payroll close. Sundae T&A + Pulse expose this live, before the threshold is crossed.",
      impactBand: "high",
      impactCopy: "Operators with similar profiles report 18–32% reduction in OT spend in the first quarter.",
    });
  }

  // Wished-KPI gaps
  if (has(responses.kpis_wished, "daypart_leak") || has(responses.kpis_wished, "real_time_margin")) {
    topLeaks.push({
      id: "real_time_margin",
      title: "Real-time margin blindness",
      detail: "You decide on yesterday's numbers. Sundae Pulse + Core surface live margin per shift — the leak gets caught while it can still be fixed.",
      impactBand: "medium",
      impactCopy: "Sub-week visibility consistently shaves 1–3 margin points across pilots.",
    });
  }

  if (has(responses.kpis_wished, "item_profitability")) {
    topLeaks.push({
      id: "item_profitability",
      title: "Item-level profitability gap",
      detail: "Without true item-level profit data, menu engineering decisions are made on gut. Sundae Insights → Item Profitability quantifies the gap per dish.",
      impactBand: "medium",
      impactCopy: "Typical 2–6 menu items account for 30%+ of margin drag and are usually invisible without this lens.",
    });
  }

  // Guest LTV / Retention
  if (has(responses.kpis_wished, "guest_ltv") || has(responses.kpis_wished, "guest_retention")) {
    topLeaks.push({
      id: "guest_retention",
      title: "Guest retention blind spot",
      detail: "Guest CRM Intelligence surfaces churn-at-risk cohorts before they go silent. The cost of losing a 12-month guest is consistently underestimated.",
      impactBand: "medium",
      impactCopy: "Recovered guest cohorts typically lift repeat-revenue 4–11% in the first 6 months.",
    });
  }

  // Voids / comps
  if (has(responses.kpis_measured, "void_comp") && !has(responses.labor_pain, "compliance")) {
    topLeaks.push({
      id: "void_audit",
      title: "Void + comp audit signal",
      detail: "Operators who track voids almost always under-detect override abuse. Sundae Revenue Assurance flags the patterns automatically.",
      impactBand: "low",
      impactCopy: "Typical recovery: $0.20–$0.80 per cover.",
    });
  }

  // Forecast
  if (responses.forecasting === "lyear_gut" || responses.forecasting === "none") {
    topLeaks.push({
      id: "forecast_gap",
      title: "No formal forecasting",
      detail: "Without forecasts you're firefighting variance instead of preventing it. Sundae Foresight projects 14–90 days out with confidence bands.",
      impactBand: "medium",
      impactCopy: "Forecast-driven operators consistently outperform peer cohorts on labor % and food cost % by 2–4 points.",
    });
  }

  // Cap at top 3, sorted by impact band
  const bandOrder = { high: 0, medium: 1, low: 2 };
  const ranked = topLeaks.sort((a, b) => bandOrder[a.impactBand] - bandOrder[b.impactBand]).slice(0, 3);

  // ─── Recommended stack ───────────────────────────────────────────
  const recommendedStack: StackRecommendation[] = [];

  // Core layer baseline
  recommendedStack.push({
    layer: "core",
    label: "Sundae Core",
    detail: outlets >= 16 ? "Core Plus" : outlets >= 2 ? "Core Lite" : "Report Pro",
    why: "Unifies POS + labor + cost + ops into one decision substrate — replaces the BI/dashboard layer entirely.",
  });

  // Pulse always
  recommendedStack.push({
    layer: "core",
    label: "Pulse (real-time ops)",
    detail: "Live shift-level pacing + leak surfacing",
    why: "Catches the daypart and labor leaks before they're locked into payroll.",
  });

  // Crew if labor pain or non-trivial scheduling
  if (arr(responses.labor_pain).some((p) => p !== "none") || responses.scheduling_tool === "manual" || responses.scheduling_tool === "none") {
    const payrollScope = arr(responses.payroll_regions);
    if (payrollScope.length >= 2) {
      recommendedStack.push({
        layer: "crew",
        label: "Crew Operating Suite",
        detail: "Operations + T&A + Payroll · multi-region country packs",
        why: `Covers ${payrollScope.length} payroll regions with statutory exports + readiness checks.`,
      });
    } else if (has(responses.labor_pain, "buddy_punching") || has(responses.labor_pain, "no_show")) {
      recommendedStack.push({
        layer: "crew",
        label: "Crew Scheduling + T&A",
        detail: "Schedule + clock-in with eligibility-checked assignment",
        why: "PWA clock-in eliminates buddy-punching and surfaces no-show risk before the shift starts.",
      });
    } else {
      recommendedStack.push({
        layer: "crew",
        label: "Crew Scheduling",
        detail: "Deep scheduling with AI Builder + marketplace",
        why: "Replaces manual scheduling with eligibility-checked assignment + AI-generated drafts.",
      });
    }
  }

  // Watchtower if competitor signal
  if (has(responses.kpis_wished, "competitor_pricing") || has(responses.scenario_wish, "competitor")) {
    recommendedStack.push({
      layer: "watchtower",
      label: "Watchtower",
      detail: "Competitor pricing + market signal",
      why: "Tracks competitor moves so you respond before they hit your numbers.",
    });
  }

  // Intelligence if NL-to-SQL use case — decision_data is now multi-select
  if (has(responses.decision_data, "spreadsheet") || has(responses.decision_data, "pos_report") || has(responses.decision_data, "bi_dashboard") || has(responses.decision_data, "in_house_data")) {
    recommendedStack.push({
      layer: "intelligence",
      label: "Sundae Intelligence",
      detail: "Ask-your-data NL → SQL with source citations",
      why: "Replaces the spreadsheet-pull → analyst → answer loop with sub-minute, sourced answers.",
    });
  }

  // Foresight if forecasting gap or scenario wish
  if (responses.forecasting === "lyear_gut" || responses.forecasting === "none" || arr(responses.scenario_wish).length >= 2) {
    recommendedStack.push({
      layer: "foresight",
      label: "Foresight",
      detail: "14–90 day forecasts + scenario modeling",
      why: "Lets you stress-test new locations, menu changes, and staffing models before committing.",
    });
  }

  // ─── Tier fit (one-line summary) ─────────────────────────────────
  const tierFit = (() => {
    const hasCrew = recommendedStack.some((s) => s.layer === "crew");
    const coreTier = outlets >= 16 ? "Core Plus" : outlets >= 2 ? "Core Lite" : "Report Pro";
    if (hasCrew && outlets >= 16) return `${coreTier} + Crew Operating Suite + Watchtower`;
    if (hasCrew) return `${coreTier} + Crew Operating Suite`;
    return `${coreTier} + ${recommendedStack.length >= 4 ? "Foresight" : "Core modules"}`;
  })();

  // ─── Expected impact ─────────────────────────────────────────────
  const expectedImpact: { metric: string; range: string }[] = [];
  if (ranked.some((l) => l.id === "daypart_overstaffing" || l.id === "ot_leakage")) {
    expectedImpact.push({ metric: "Labor cost reduction", range: "5–14% in first quarter" });
  }
  if (ranked.some((l) => l.id === "real_time_margin")) {
    expectedImpact.push({ metric: "Margin point lift", range: "1–3 points across 6 months" });
  }
  if (has(responses.kpis_wished, "forecast_per_outlet") || responses.forecasting === "lyear_gut") {
    expectedImpact.push({ metric: "Forecast accuracy", range: "+18–32% week-over-week" });
  }
  if (ranked.some((l) => l.id === "guest_retention")) {
    expectedImpact.push({ metric: "Repeat-guest revenue", range: "+4–11% in 6 months" });
  }
  // Default if empty
  if (expectedImpact.length === 0) {
    expectedImpact.push({ metric: "Decision speed", range: "Weekly close → Live (sub-shift)" });
    expectedImpact.push({ metric: "Tool consolidation", range: "Replaces 3–5 disconnected dashboards" });
  }

  // ─── Quick wins (30/60/90) ───────────────────────────────────────
  const quickWins: QuickWin[] = [];
  quickWins.push({
    horizon: "30",
    title: "Connect POS + scheduling",
    detail: "Most ${segment} integrations under 5 minutes. Pulse populates within 24 hours of data flow.".replace("${segment}", segment),
  });
  if (recommendedStack.some((s) => s.layer === "crew")) {
    quickWins.push({
      horizon: "60",
      title: "Crew live across pilot outlets",
      detail: "Scheduling + T&A live on 2–3 pilot outlets. Pulse surfaces the first labor leak fix in week 1.",
    });
  } else {
    quickWins.push({
      horizon: "60",
      title: "First operational decision shipped",
      detail: "Pulse-driven decision logged and re-measured. Decision Replay surface captures the loop.",
    });
  }
  if (recommendedStack.some((s) => s.layer === "foresight" || s.layer === "watchtower")) {
    quickWins.push({
      horizon: "90",
      title: "Foresight + competitive signal live",
      detail: "Forecasts and Watchtower briefings folded into weekly leadership rhythm. Scenario modeling unlocked.",
    });
  } else {
    quickWins.push({
      horizon: "90",
      title: "First quarter outcome review",
      detail: "Sundae-driven changes quantified against pre-deployment baseline. Pricing simulator opens for next-phase scope.",
    });
  }

  // ─── Summary narrative — incorporates new context ────────────────
  const blindSpotLine = responses.blind_spot
    ? ` You flagged: "${(responses.blind_spot as string).slice(0, 120)}". That's exactly the kind of blind spot Sundae's Decision Intelligence layer is designed to surface.`
    : "";
  const lagLine = (() => {
    const lag = responses.decision_lag as string | undefined;
    if (lag === "weeks" || lag === "months") {
      return ` At your current decision lag (${lag === "weeks" ? "weekly close cycle" : "quarterly review only"}), the margin is already booked before you can act — Sundae compresses signal-to-action to minutes.`;
    }
    if (lag === "days") {
      return " Sundae shifts you from a weekly close cycle to live signal-to-action.";
    }
    return "";
  })();
  const timelineLine = (() => {
    const t = responses.timeline as string | undefined;
    if (t === "asap" || t === "next_quarter") return " Given your timeline, the fastest path is starting with the highest-leak module above and layering up.";
    return "";
  })();
  const summary = `${profileLine}. Based on your responses, the highest-leverage moves are ${ranked.length > 0 ? ranked[0].title.toLowerCase() : "consolidating decision flow on Sundae"}${ranked.length > 1 ? ` and ${ranked[1].title.toLowerCase()}` : ""}.${blindSpotLine}${lagLine}${timelineLine} Your recommended stack starts with ${tierFit}.`;

  return {
    summary,
    profileLine,
    topLeaks: ranked,
    recommendedStack,
    expectedImpact,
    quickWins,
    tierFit,
    economics: computeEconomics(responses, recommendedStack, outlets),
  };
}

export { QUESTIONS };
