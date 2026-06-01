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

const segmentLabel = (v?: string): string => {
  const map: Record<string, string> = {
    qsr: "QSR", fast_casual: "fast-casual", casual: "casual-dining",
    fine_dining: "fine-dining", cloud: "cloud-kitchen", hotel_fb: "hotel F&B",
    multi: "multi-concept", cafe_bakery: "café / bakery",
  };
  return map[v ?? ""] ?? "hospitality";
};

const regionLabel = (v?: string): string => {
  const map: Record<string, string> = {
    us: "US", canada: "Canadian", europe: "European", uk: "UK",
    mea: "Middle East / GCC", apac: "APAC", latam: "LATAM",
    africa: "African", multi: "multi-region",
  };
  return map[v ?? ""] ?? "regional";
};

// ─── Engine ─────────────────────────────────────────────────────────
export function runDiagnostic(responses: DiagnosticResponses): DiagnosticReport {
  const outlets = outletCountValue(responses.outlets as string | undefined);
  const segment = segmentLabel(responses.segment as string | undefined);
  const region = regionLabel(responses.region as string | undefined);

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

  // Intelligence if NL-to-SQL use case
  if (responses.decision_data === "spreadsheet" || responses.decision_data === "pos_report" || responses.decision_data === "bi_dashboard") {
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

  // ─── Summary narrative ───────────────────────────────────────────
  const blindSpotLine = responses.blind_spot
    ? ` You flagged: "${(responses.blind_spot as string).slice(0, 120)}". That's exactly the kind of blind spot Sundae's Decision Intelligence layer is designed to surface.`
    : "";
  const summary = `${profileLine}. Based on your responses, the highest-leverage moves are ${ranked.length > 0 ? ranked[0].title.toLowerCase() : "consolidating decision flow on Sundae"}${ranked.length > 1 ? ` and ${ranked[1].title.toLowerCase()}` : ""}.${blindSpotLine} Your recommended stack starts with ${tierFit}.`;

  return {
    summary,
    profileLine,
    topLeaks: ranked,
    recommendedStack,
    expectedImpact,
    quickWins,
    tierFit,
  };
}

export { QUESTIONS };
