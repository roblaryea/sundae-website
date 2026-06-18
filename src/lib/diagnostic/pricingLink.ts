/**
 * Builds a deep-link from a completed diagnostic into the pricing simulator
 * (the separate `sundae-pricing` Vite app at pricing.sundae.io) with the
 * operator's configuration PRE-FILLED — so "Open pricing simulator" lands them
 * on a populated cost summary instead of restarting the whole questionnaire.
 *
 * The simulator reads the `cfg` param (see Simulator.tsx in sundae-pricing),
 * seeds its Zustand store, and jumps straight to the Review & Launch summary.
 * Keep `SimPrefill` in sync with the reader on the simulator side.
 */

import type { DiagnosticResponses, DiagnosticReport } from "./engine";

const SIM_BASE = "https://pricing.sundae.io";

const OUTLET_TO_LOCATIONS: Record<string, number> = {
  "1": 1, "2_5": 4, "6_15": 10, "16_50": 33, "51_150": 100, "150_plus": 200,
};

// diagnostic kpis_wished value → pricing-simulator module id. Unmapped wishes
// (benchmark, watchtower, foresight, cross-cutting) are handled elsewhere or
// skipped. Simulator module ids: labor, inventory, marketing, purchasing,
// reservations, profit, revenue, delivery, guest, accounting, guest_crm, economic.
const KPI_TO_MODULE: Record<string, string> = {
  real_time_margin: "labor", daypart_leak: "labor", labor_productivity: "labor",
  live_labor_vs_demand: "labor", overtime_leakage: "labor", scheduling_eff: "labor",
  payroll_readiness: "labor", gratuity_distribution: "labor", speed_of_service: "labor",
  daypart_revpash: "revenue", cannibalization: "revenue", server_upsell: "revenue",
  cash_variance: "revenue",
  hourly_food_cost: "inventory", theoretical_actual: "inventory",
  inventory_shrinkage: "inventory", food_waste: "inventory",
  item_profitability: "profit", menu_engineering: "profit",
  promo_roi: "marketing",
  delivery_margin: "delivery",
  guest_ltv: "guest_crm", cohort_retention: "guest_crm", guest_sentiment: "guest_crm",
  noshow_prediction: "reservations",
};

// diagnostic ops_tools value → simulator module id (coarse).
const OPS_TOOL_TO_MODULE: Record<string, string> = {
  purchasing: "purchasing", reservations: "reservations", crm: "guest_crm",
};

const MAX_MODULES = 6;

export interface SimPrefill {
  v: 1;
  layer: "report" | "core";
  tier: "lite" | "pro";
  locations: number;
  modules: string[];
  watchtower: boolean;
  crewSkus: string[];
}

const arr = (v: string | string[] | undefined): string[] =>
  Array.isArray(v) ? v : v ? [v] : [];

function crewSkusFromStack(report: DiagnosticReport): string[] {
  const crew = report.recommendedStack.find((s) => s.layer === "crew");
  if (!crew) return [];
  if (/operating suite/i.test(crew.label)) {
    return ["crew_operations", "crew_scheduling", "crew_tna", "crew_payroll"];
  }
  if (/t&a/i.test(crew.label)) return ["crew_scheduling", "crew_tna"];
  return ["crew_scheduling"];
}

export function buildSimPrefill(
  responses: DiagnosticResponses,
  report: DiagnosticReport,
): SimPrefill {
  const outletKey = String(
    Array.isArray(responses.outlets) ? responses.outlets[0] : responses.outlets ?? "",
  );
  const locations = OUTLET_TO_LOCATIONS[outletKey] ?? 1;

  // 1 outlet → Report Pro; 2-15 → Core Lite; 16+ → Core Pro.
  const layer: SimPrefill["layer"] = locations <= 1 ? "report" : "core";
  const tier: SimPrefill["tier"] = locations >= 16 ? "pro" : layer === "report" ? "pro" : "lite";

  // Modules only apply on the Core path.
  const modules: string[] = [];
  if (layer === "core") {
    const seen = new Set<string>();
    for (const w of arr(responses.kpis_wished)) {
      const m = KPI_TO_MODULE[w];
      if (m && !seen.has(m)) { seen.add(m); modules.push(m); }
    }
    for (const t of arr(responses.ops_tools)) {
      const m = OPS_TOOL_TO_MODULE[t];
      if (m && !seen.has(m)) { seen.add(m); modules.push(m); }
    }
  }

  const watchtower = report.recommendedStack.some((s) => s.layer === "watchtower");

  return {
    v: 1,
    layer,
    tier,
    locations,
    modules: modules.slice(0, MAX_MODULES),
    watchtower,
    crewSkus: crewSkusFromStack(report),
  };
}

// Base64url encode (cfg is pure ASCII: ids + numbers, so btoa is safe).
function encodeCfg(prefill: SimPrefill): string {
  const json = JSON.stringify(prefill);
  const b64 = typeof btoa !== "undefined"
    ? btoa(json)
    : Buffer.from(json, "utf8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function buildPricingSimUrl(
  responses: DiagnosticResponses,
  report: DiagnosticReport,
  leadData: { email: string; name: string; company: string; country: string },
): string {
  const params = new URLSearchParams({
    cfg: encodeCfg(buildSimPrefill(responses, report)),
    email: leadData.email,
    name: leadData.name,
    company: leadData.company || "",
    country: leadData.country,
  });
  return `${SIM_BASE}/simulator?${params.toString()}`;
}
