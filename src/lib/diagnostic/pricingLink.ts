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
import { encodePricingIntent, type PricingIntent } from "../pricingIntent";

const SIM_BASE = "https://pricing.sundae.io";

const OUTLET_TO_LOCATIONS: Record<string, number> = {
  "1": 1, "2_5": 4, "6_15": 10, "16_50": 33, "51_150": 100, "150_plus": 200,
};

export type SimPrefill = PricingIntent;

function crewSkusFromStack(report: DiagnosticReport): string[] {
  const crew = report.recommendedStack.find((s) => s.layer === "crew");
  if (!crew) return [];
  // Match the v1.7 Crew names the engine now emits (Crew Operating /
  // Schedule & Time / Crew Schedule). The emitted IDS below are the
  // simulator's wire format, NOT sellable SKU keys — see the note above.
  if (/crew operating/i.test(crew.label)) {
    return ["crew_operations", "crew_scheduling", "crew_tna", "crew_payroll"];
  }
  if (/schedule & time/i.test(crew.label)) return ["crew_scheduling", "crew_tna"];
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

  const core = report.recommendedStack.find((s) => s.layer === 'core');
  const label = core?.label ?? '';
  const corePackage = /performance/i.test(label) ? 'core_performance'
    : /growth/i.test(label) ? 'core_growth' : /margin/i.test(label) ? 'core_margin' : 'core_foundation';
  const crewSkus = crewSkusFromStack(report) as PricingIntent['crewSkus'];
  const watchtower = report.recommendedStack.some((s) => s.layer === 'watchtower') && ['core_growth','core_performance'].includes(corePackage);
  return {
    v: 2, layer: crewSkus.length ? (core ? 'both' : 'crew') : 'core', corePackage,
    locations, addOns: [], crewSkus, watchtowerModules: watchtower ? ['bundle'] : [],
    crossIntelligence: 'none', billingCycle: 'monthly', operatingModels: [], employees: null, payrollCountry: '',
  };
}

export function buildPricingSimUrl(
  responses: DiagnosticResponses,
  report: DiagnosticReport,
  ..._unusedLeadContext: [{ email: string; name: string; company: string; country: string }]
): string {
  void _unusedLeadContext; // Contact details belong in the lead record, never the simulator URL.
  const params = new URLSearchParams({ cfg: encodePricingIntent(buildSimPrefill(responses, report)) });
  return `${SIM_BASE}/simulator?${params.toString()}`;
}
