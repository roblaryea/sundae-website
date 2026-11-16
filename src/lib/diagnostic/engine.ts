/**
 * Sundae Operations Diagnostic - analysis engine.
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
 * gateway call that returns the same DiagnosticReport shape - no UI
 * changes needed.
 */

import { normalizeWebsiteLocale, type WebsiteLocale } from "@/lib/i18n";
import {
  bandedMonthlyTotal,
  CORE_PACKAGES_BY_ID,
  FORESIGHT_AND_ACTION,
  CREW_BUNDLES,
  CREW_SKUS,
  describeBands,
  usd,
  type CorePackageId,
  PRICE_BOOK_VERSION,
  PRICE_BOOK_VERIFIED_ON,
} from "@/lib/pricing/priceBook";
import { QUESTIONS } from "./questions";
import { buildEvidenceSafeFallbackFindings } from "./fallbackFindings";

export type DiagnosticResponses = Record<string, string | string[]>;

export interface LeakHypothesis {
  id: string;
  title: string;
  detail: string;
  impactBand: "high" | "medium" | "low";
  /** Directional only - never promised. */
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
  /**
   * Like-for-like "what you spend on this today" — the loaded cost of the
   * tools + in-house analyst time Sundae consolidates. NOT a "savings" figure:
   * `net` states the honest delta vs. the monthly investment above.
   */
  currentSpend: { range: string; basis: string; net: string };
  ebitdaUplift: { pctRange: string; amountRange: string; basis: string };
  softUplifts: SoftUplift[];
}

export interface DiagnosticReport {
  /** Short narrative - one paragraph */
  summary: string;
  /** Sundae's read of their profile in one line */
  profileLine: string;
  topLeaks: LeakHypothesis[];
  recommendedStack: StackRecommendation[];
  expectedImpact: { metric: string; range: string }[];
  quickWins: QuickWin[];
  /** Package suggestion, e.g. "Core Margin + Crew Operating" */
  tierFit: string;
  /** Directional economics - cost, savings, EBITDA uplift, soft uplifts. Optional: present on the AI path and the heuristic path, absent only on sparse input. */
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

/**
 * Which Core PACKAGE fits this operator.
 *
 * v1.7 differentiates the four Core packages by CAPABILITY, not by outlet
 * count, so this is a product-fit heuristic driven by the gaps the operator
 * actually flagged — never by price. It deliberately defaults DOWN to
 * Foundation: under-recommending is recoverable, over-quoting is the exact
 * failure mode this cutover exists to remove.
 */
const MARGIN_SIGNALS = new Set([
  "real_time_margin", "daypart_leak", "hourly_food_cost", "theoretical_actual",
  "item_profitability", "menu_engineering", "inventory_shrinkage", "food_waste",
  "cash_variance", "void_comp",
]);
const GROWTH_SIGNALS = new Set([
  "guest_ltv", "cohort_retention", "guest_retention", "guest_sentiment",
  "promo_roi", "delivery_margin", "noshow_prediction",
]);

function pickCorePackage(
  responses: DiagnosticResponses,
  outlets: number,
): CorePackageId {
  const signals = [...arr(responses.kpis_wished), ...arr(responses.kpis_measured)];
  const wantsMargin = signals.some((s) => MARGIN_SIGNALS.has(s));
  const wantsGrowth = signals.some((s) => GROWTH_SIGNALS.has(s));
  const multiRegionPayroll = arr(responses.payroll_regions).length >= 2;

  // Large, multi-region groups carrying both margin AND growth gaps are the
  // Performance profile. Everything else steps down from there.
  if (wantsMargin && wantsGrowth || (outlets >= 26 && wantsMargin && multiRegionPayroll)) return "core_performance";
  if (wantsGrowth) return "core_growth";
  if (wantsMargin) return "core_margin";
  return "core_foundation";
}

function computeEconomics(
  responses: DiagnosticResponses,
  stack: StackRecommendation[],
  outlets: number,
): Economics {
  const crew = stack.find((s) => s.layer === "crew");
  const hasWatch = stack.some((s) => s.layer === "watchtower");
  const hasForesight = stack.some((s) => s.layer === "foresight");

  // ── Right-sized monthly investment ──────────────────────────────────
  // Price the STARTING footprint against the v1.7 price book — the substrate
  // the operator actually lands on, not a maximal end-state bundle.
  //
  // Core packages and Foresight & Action are MARGINAL-BAND SKUs: a first-
  // location anchor plus a marginal rate per additional location that steps
  // down across bands. Crossing a band never reprices earlier locations, and
  // there is no "included locations" allowance. Every figure below comes out
  // of `bandedMonthlyTotal` — we never multiply a flat per-location rate.
  const corePackage = CORE_PACKAGES_BY_ID[pickCorePackage(responses, outlets)];
  const coreQuote = bandedMonthlyTotal(corePackage, outlets);
  let monthly = coreQuote.monthlyTotal;   // Core includes Ask Sundae (NL-to-SQL)

  // Above the published band ceiling (100 locations) the marginal rate is not
  // published, so we must not extrapolate a number at all.
  let beyondPublishedBands = coreQuote.beyondBandedRange;

  // Crew: flat monthly SKUs in v1.7 — no per-location component.
  const crewOperating = CREW_BUNDLES.find((s) => s.id === "crew_operating")!;
  const crewScheduleTime = CREW_BUNDLES.find((s) => s.id === "crew_schedule_time")!;
  const crewSchedule = CREW_SKUS.find((s) => s.id === "crew_schedule")!;
  let crewLabel = "";
  if (crew) {
    if (/crew operating/i.test(crew.label)) {
      const quote = bandedMonthlyTotal(crewOperating, outlets); monthly += quote.monthlyTotal; beyondPublishedBands ||= quote.beyondBandedRange; crewLabel = crewOperating.name;
    } else if (/schedule & time/i.test(crew.label)) {
      const quote = bandedMonthlyTotal(crewScheduleTime, outlets); monthly += quote.monthlyTotal; beyondPublishedBands ||= quote.beyondBandedRange; crewLabel = crewScheduleTime.name;
    } else {
      const quote = bandedMonthlyTotal(crewSchedule, outlets); monthly += quote.monthlyTotal; beyondPublishedBands ||= quote.beyondBandedRange; crewLabel = crewSchedule.name;
    }
  }

  // Foresight & Action is banded on the same boundaries as the Core packages.
  const foresightQuote = hasForesight && !corePackage.includedModuleIds.includes("foresight") ? bandedMonthlyTotal(FORESIGHT_AND_ACTION, outlets) : null;
  if (foresightQuote) { monthly += foresightQuote.monthlyTotal; beyondPublishedBands ||= foresightQuote.beyondBandedRange; }

  // Watchtower carries no published v1.7 list price, so it is described as a
  // quoted capability and deliberately kept OUT of the arithmetic. Quoting a
  // number we do not have is exactly what this cutover removes.

  const costBasis = [
    `${corePackage.name} (${usd(corePackage.firstUnitMonthly)} first location, then ${describeBands(corePackage)} per additional location)`,
    crewLabel && `${crewLabel} (first-location price plus marginal additional-location bands)`,
    foresightQuote && `Foresight & Action (${usd(FORESIGHT_AND_ACTION.firstUnitMonthly)} first location, then ${describeBands(FORESIGHT_AND_ACTION)} per additional location)`,
  ].filter(Boolean).join(" + ");

  // ── Like-for-like: what you spend on this today (loaded) ────────────
  // The intake does not establish an audited software/time-cost baseline or
  // a causal margin improvement. Do not turn assumed fractions into savings.
  const currentSpend = {
    range: "Needs your current cost baseline",
    basis: "Reconcile current software contracts and reporting time before making a like-for-like comparison.",
    net: "No saving is established by this assessment.",
  };
  const ebitdaUplift = {
    pctRange: "Not estimated",
    amountRange: "Validate the opportunity first",
    basis: "Use reconciled revenue and cost data, an agreed baseline and measured actions before estimating financial benefit.",
  };

  const softUplifts: SoftUplift[] = [];
  if (has(responses.labor_pain, "turnover")) {
    softUplifts.push({ label: "Lower turnover & re-training cost", detail: "Fairer, demand-matched scheduling cuts churn and the re-hire/retrain treadmill." });
  }
  softUplifts.push({ label: "Better-trained, more confident staff", detail: "Shift-level coaching and consistent playbooks raise floor execution without adding headcount." });
  softUplifts.push({ label: "Happier guests", detail: "Faster service and fewer stockouts/voids lift the experience that drives repeat visits." });
  softUplifts.push({ label: "Faster, calmer decisions", detail: "Signal-to-action drops from weekly close to same-day - the team acts before margin is booked." });

  const expansionNote = hasWatch ? " Watchtower is scoped and quoted separately." : "";

  // Marginal bands are published to 100 locations. Past that we quote — we do
  // not extrapolate a rate that does not exist.
  const monthlyCost = beyondPublishedBands
    ? {
        range: "Enterprise - quoted",
        basis: `${costBasis}. This selection exceeds one or more published self-service ranges, so confirm a scoped estimate in the pricing calculator.${expansionNote}`,
      }
    : {
        range: `${usd(monthly)} / mo at list`,
        basis: `${costBasis}, across ~${outlets} outlet${outlets === 1 ? "" : "s"} - ${usd(monthly)}/mo at list, a ${usd(coreQuote.blendedAveragePerUnit)} blended average per location on the Core line (an average of the total, not a per-location rate). Catalogue snapshot ${PRICE_BOOK_VERSION}, verified ${PRICE_BOOK_VERIFIED_ON}. Indicative monthly list pricing before discounts, implementation fees, taxes and separately scoped extensions; confirm the current estimate in the pricing calculator.${expansionNote}`,
      };

  return {
    monthlyCost,
    currentSpend,
    ebitdaUplift,
    softUplifts: softUplifts.slice(0, 4),
  };
}

export function runDiagnostic(
  responses: DiagnosticResponses,
  locale: WebsiteLocale | string = "en",
): DiagnosticReport {
  const resolvedLocale = normalizeWebsiteLocale(locale);
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
      detail: "Your overstaffing answer flags a possible mismatch between demand and scheduled hours. Compare staffing, sales and service coverage by daypart before changing a shift.",
      impactBand: "high",
      impactCopy: "Measure labor cost and service coverage against the agreed baseline; no recovery percentage is established yet.",
    });
  }

  // OT leakage
  if (has(responses.labor_pain, "ot_leakage")) {
    topLeaks.push({
      id: "ot_leakage",
      title: "Overtime leakage",
      detail: "OT often compounds because schedule + actual hours aren't visible until payroll close. Sundae T&A + Pulse expose this live, before the threshold is crossed.",
      impactBand: "high",
      impactCopy: "Reconcile scheduled and actual hours, then measure overtime changes without weakening service coverage.",
    });
  }

  // Wished-KPI gaps
  if (has(responses.kpis_wished, "daypart_leak") || has(responses.kpis_wished, "real_time_margin")) {
    topLeaks.push({
      id: "real_time_margin",
      title: "Real-time margin blindness",
      detail: "You decide on yesterday's numbers. Sundae Pulse + Core surface live margin per shift - the leak gets caught while it can still be fixed.",
      impactBand: "medium",
      impactCopy: "Validate the cost inputs and decision timing before attributing any margin change to faster visibility.",
    });
  }

  if (has(responses.kpis_wished, "item_profitability")) {
    topLeaks.push({
      id: "item_profitability",
      title: "Item-level profitability gap",
      detail: "Without true item-level profit data, menu engineering decisions are made on gut. Sundae Insights → Item Profitability quantifies the gap per dish.",
      impactBand: "medium",
      impactCopy: "Reconcile ingredient costs, portions, discounts and channel fees before ranking item contribution.",
    });
  }

  // Guest LTV / Retention
  if (has(responses.kpis_wished, "guest_ltv") || has(responses.kpis_wished, "guest_retention")) {
    topLeaks.push({
      id: "guest_retention",
      title: "Guest retention blind spot",
      detail: "Guest CRM Intelligence surfaces churn-at-risk cohorts before they go silent. The cost of losing a 12-month guest is consistently underestimated.",
      impactBand: "medium",
      impactCopy: "Define comparable guest cohorts and a baseline period before measuring repeat-visit or revenue changes.",
    });
  }

  // Voids / comps
  if (has(responses.kpis_measured, "void_comp") && !has(responses.labor_pain, "compliance")) {
    topLeaks.push({
      id: "void_audit",
      title: "Void + comp audit signal",
      detail: "Review void and comp patterns with their shift context and approvals. An exception is a review signal, not evidence of abuse.",
      impactBand: "low",
      impactCopy: "Validate each exception and measure any confirmed change in voids or comps against a comparable baseline.",
    });
  }

  // Forecast
  if (responses.forecasting === "lyear_gut" || responses.forecasting === "none") {
    topLeaks.push({
      id: "forecast_gap",
      title: "No formal forecasting",
      detail: "Without forecasts you're firefighting variance instead of preventing it. Sundae Foresight projects 14-90 days out with confidence bands.",
      impactBand: "medium",
      impactCopy: "Back-test forecasts against your current planning method before claiming better accuracy or operating results.",
    });
  }

  // Sparse, mature, or highly selective responses should still produce a
  // useful assessment. These evidence-safe observations do not invent a loss
  // figure; they turn the required 90-day priority and selected systems into
  // concrete validation work.
  for (const finding of buildEvidenceSafeFallbackFindings(responses)) {
    if (topLeaks.length >= 2) break;
    if (!topLeaks.some((item) => item.id === finding.id)) topLeaks.push(finding);
  }

  // Cap at top 3, sorted by impact band
  const bandOrder = { high: 0, medium: 1, low: 2 };
  const ranked = topLeaks.sort((a, b) => bandOrder[a.impactBand] - bandOrder[b.impactBand]).slice(0, 3);

  // ─── Recommended stack ───────────────────────────────────────────
  const recommendedStack: StackRecommendation[] = [];

  // Package-specific entitlements come from the verified active catalogue.
  const corePackage = CORE_PACKAGES_BY_ID[pickCorePackage(responses, outlets)];
  recommendedStack.push({
    layer: "core",
    label: "Sundae Core",
    detail: corePackage.name,
    why: "Connects operating evidence for the selected Core package. Included capabilities vary by package; confirm extensions and integration scope during the walkthrough.",
  });

  // Pulse always
  recommendedStack.push({
    layer: "core",
    label: "Pulse (real-time ops)",
    detail: "Live shift-level pacing + leak surfacing",
    why: "Catches the daypart and labor leaks before they're locked into payroll.",
  });

  // Crew if labor pain or non-trivial scheduling
  if (
    arr(responses.labor_pain).some((p) => p !== "none") ||
    has(responses.scheduling_tool, "manual") ||
    has(responses.scheduling_tool, "none")
  ) {
    const payrollScope = arr(responses.payroll_regions);
    if (payrollScope.length >= 2) {
      recommendedStack.push({
        layer: "crew",
        label: "Crew Operating",
        detail: "Manage + Time + Pay · multi-region country packs",
        why: `Covers ${payrollScope.length} payroll regions with statutory exports + readiness checks.`,
      });
    } else if (has(responses.labor_pain, "buddy_punching") || has(responses.labor_pain, "no_show")) {
      recommendedStack.push({
        layer: "crew",
        label: "Schedule & Time",
        detail: "Schedule + clock-in with eligibility-checked assignment",
        why: "Time capture and attendance checks support manager review of clock-in exceptions and no-show risk.",
      });
    } else {
      recommendedStack.push({
        layer: "crew",
        label: "Crew Schedule",
        detail: "Deep scheduling with AI Builder + marketplace",
        why: "Replaces manual scheduling with eligibility-checked assignment + AI-generated drafts.",
      });
    }
  }

  // Watchtower if competitor signal — but only at scale (≥6 outlets). Its
  // network-effect market intelligence isn't worth a line item for a small
  // operator, and quoting it to one is exactly the over-scoping we're fixing.
  if (
    (corePackage.id === "core_growth" || corePackage.id === "core_performance") && outlets >= 6 &&
    (has(responses.kpis_wished, "competitor_pricing") || has(responses.scenario_wish, "competitor"))
  ) {
    recommendedStack.push({
      layer: "watchtower",
      label: "Watchtower",
      detail: "Competitor pricing + market signal",
      why: "Tracks competitor moves so you respond before they hit your numbers.",
    });
  }

  // Intelligence if NL-to-SQL use case - decision_data is now multi-select
  if (has(responses.decision_data, "spreadsheet") || has(responses.decision_data, "pos_report") || has(responses.decision_data, "bi_dashboard") || has(responses.decision_data, "in_house_data")) {
    recommendedStack.push({
      layer: "intelligence",
      label: "Ask Sundae",
      detail: "Ask-your-data NL → SQL with source citations",
      why: "Ask questions of connected operating data and review the supporting sources.",
    });
  }

  // Foresight if forecasting gap or scenario wish
  if (responses.forecasting === "lyear_gut" || responses.forecasting === "none" || arr(responses.scenario_wish).length >= 2) {
    recommendedStack.push({
      layer: "foresight",
      label: "Foresight & Action",
      detail: "14-90 day forecasts + scenario modeling",
      why: "Lets you stress-test new locations, menu changes, and staffing models before committing.",
    });
  }

  // ─── Tier fit (one-line summary) ─────────────────────────────────
  // Reflect the stack we ACTUALLY recommended (the real Crew tier, Watchtower
  // only if it cleared the scale gate) — never a hardcoded maximal bundle.
  const tierFit = (() => {
    const crewLabel = recommendedStack.find((s) => s.layer === "crew")?.label;
    const hasWatch = recommendedStack.some((s) => s.layer === "watchtower");
    const hasForesight = recommendedStack.some((s) => s.layer === "foresight");
    const parts = [corePackage.name];
    if (crewLabel) parts.push(crewLabel);
    if (hasForesight) parts.push("Foresight & Action");
    if (hasWatch) parts.push("Watchtower");
    return parts.join(" + ");
  })();

  // ─── Expected impact ─────────────────────────────────────────────
  const expectedImpact: { metric: string; range: string }[] = [];
  if (ranked.some((l) => l.id === "daypart_overstaffing" || l.id === "ot_leakage")) {
    expectedImpact.push({ metric: "Labor cost and coverage", range: "Compare scheduled and actual labor against demand and the agreed baseline" });
  }
  if (ranked.some((l) => l.id === "real_time_margin")) {
    expectedImpact.push({ metric: "Margin and decision timing", range: "Validate cost inputs, then measure the effect of a specific operating action" });
  }
  if (has(responses.kpis_wished, "forecast_per_outlet") || responses.forecasting === "lyear_gut") {
    expectedImpact.push({ metric: "Forecast accuracy", range: "Back-test against actual demand and your current planning method" });
  }
  if (ranked.some((l) => l.id === "guest_retention")) {
    expectedImpact.push({ metric: "Repeat-guest revenue", range: "Use comparable cohorts and account for campaign and seasonal effects" });
  }
  // Default if empty
  if (expectedImpact.length < 2) {
    expectedImpact.push({ metric: "Baseline readiness", range: "Source coverage and starting measure agreed in the first 30 days" });
    expectedImpact.push({ metric: "Integration confidence", range: "POS, workforce, and cost totals reconciled before any return claim" });
  }

  // ─── Quick wins (30/60/90) ───────────────────────────────────────
  const quickWins: QuickWin[] = [];
  const priority = typeof responses.priority === "string" ? responses.priority.trim() : "";
  quickWins.push({
    horizon: "30",
    title: priority ? "Baseline your 90-day priority" : "Connect POS + scheduling",
    detail: priority
      ? `You said: “${priority.slice(0, 160)}${priority.length > 160 ? "…" : ""}” Connect the relevant POS and workforce data, agree the starting measure, and name the owner before changing the process.`
      : "Connect the relevant POS and scheduling sources, confirm data completeness, and establish the starting operational baseline.",
  });
  const crewRecommendation = recommendedStack.find((s) => s.layer === "crew");
  if (crewRecommendation) {
    const includesTime = crewRecommendation.label === "Schedule & Time" || crewRecommendation.label === "Crew Operating";
    quickWins.push({
      horizon: "60",
      title: `${crewRecommendation.label} live across pilot outlets`,
      detail: includesTime
        ? "Scheduling and time capture live on 2-3 pilot outlets, with source totals reconciled before expansion."
        : "Scheduling live on 2-3 pilot outlets, with manager workflow and roster quality measured before expansion.",
    });
  } else {
    quickWins.push({
      horizon: "60",
      title: "First operational decision shipped",
      detail: "Pulse-driven decision logged and re-measured. Decision Replay surface captures the loop.",
    });
  }
  const hasForesight = recommendedStack.some((s) => s.layer === "foresight");
  const hasWatchtower = recommendedStack.some((s) => s.layer === "watchtower");
  if (hasForesight || hasWatchtower) {
    quickWins.push({
      horizon: "90",
      title: hasForesight && hasWatchtower
        ? "Forecasting and market signals in the weekly rhythm"
        : hasForesight
          ? "First scenario reviewed with Foresight"
          : "Market signals in the weekly rhythm",
      detail: hasForesight && hasWatchtower
        ? "Review the first measured forecast and Watchtower briefing with leadership, then record the decision and owner."
        : hasForesight
          ? "Review one priority scenario against the agreed baseline, record the decision, and measure the result before expanding the model."
          : "Review the first relevant market briefing with leadership, record the response, and measure the result.",
    });
  } else {
    quickWins.push({
      horizon: "90",
      title: "First quarter outcome review",
      detail: "Sundae-driven changes quantified against pre-deployment baseline. Pricing simulator opens for next-phase scope.",
    });
  }

  // ─── Summary narrative - incorporates new context ────────────────
  const blindSpotLine = responses.blind_spot
    ? ` You flagged: "${(responses.blind_spot as string).slice(0, 120)}". That's exactly the kind of blind spot Sundae's Decision Intelligence layer is designed to surface.`
    : "";
  const lagLine = (() => {
    const lag = responses.decision_lag as string | undefined;
    if (lag === "weeks" || lag === "months") {
      return ` At your current decision lag (${lag === "weeks" ? "weekly close cycle" : "quarterly review only"}), the margin is already booked before you can act - Sundae compresses signal-to-action to minutes.`;
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
  const priorityLine = priority
    ? ` Your 90-day priority is “${priority.slice(0, 160)}${priority.length > 160 ? "…" : ""}” — the first action below turns that into a measured baseline.`
    : "";
  const summary = `${profileLine}. Based on your responses, the highest-leverage moves are ${ranked.length > 0 ? ranked[0].title.toLowerCase() : "consolidating decision flow on Sundae"}${ranked.length > 1 ? ` and ${ranked[1].title.toLowerCase()}` : ""}.${priorityLine}${blindSpotLine}${lagLine}${timelineLine} Your recommended stack starts with ${tierFit}.`;

  const report: DiagnosticReport = {
    summary,
    profileLine,
    topLeaks: ranked,
    recommendedStack,
    expectedImpact,
    quickWins,
    tierFit,
    economics: computeEconomics(responses, recommendedStack, outlets),
  };

  if (resolvedLocale === "en") return report;

  return {
    ...report,
    summary: `${report.summary}\n\nFallback note: the live diagnostic generation path was unavailable, so Sundae returned this deterministic safety-net report. Regenerate the diagnostic to receive the fully localized native-language narrative.`,
  };
}

export { QUESTIONS };
