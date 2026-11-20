/**
 * Deep link from a finished diagnostic into the pricing calculator
 * (pricing.sundae.io) with the report's selection prefilled, so the operator
 * sees the same list price there as in the report (spec 4.4).
 *
 * The link carries the headline selection only: the Core package, the Crew
 * modules and the exact location count. Optional add-ons (Foresight &
 * Action, Watchtower, concept modules) stay out of it, exactly as they stay
 * out of the report's price. Concept answers travel as operating models,
 * which only suggest relevant modules in the calculator and add no cost.
 * Contact details never go into the URL.
 */

import { encodePricingIntent, PAYROLL_COUNTRY_CODES, type PricingIntent } from "../pricingIntent";
import type { DiagnosticResponses } from "./questions";
import type { Recommendation } from "./rules";

const SIM_BASE = "https://pricing.sundae.io";

const OPERATING_MODEL_FOR_CONCEPT: Record<string, PricingIntent["operatingModels"][number]> = {
  franchise: "franchise",
  hotel_fb: "hotel_fb",
  cloud_kitchen: "cloud_kitchen",
  catering: "catering",
  central_kitchen: "production",
};

const values = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

export function buildSimPrefill(rec: Recommendation, responses: DiagnosticResponses): PricingIntent {
  const crewSkus = (rec.crew?.selection ?? []) as PricingIntent["crewSkus"];
  const operatingModels = [
    ...new Set(values(responses.concepts).map((concept) => OPERATING_MODEL_FOR_CONCEPT[concept]).filter(Boolean)),
  ];
  const payrollCountry = rec.crew
    ? values(responses.payroll_countries).find((code) => (PAYROLL_COUNTRY_CODES as readonly string[]).includes(code)) ?? ""
    : "";
  return {
    v: 2,
    layer: crewSkus.length ? "both" : "core",
    corePackage: rec.corePackage,
    locations: rec.locations,
    addOns: [],
    crewSkus,
    watchtowerModules: [],
    crossIntelligence: "none",
    billingCycle: "monthly",
    operatingModels,
    employees: null,
    payrollCountry,
  };
}

export function buildPricingSimUrl(rec: Recommendation, responses: DiagnosticResponses): string {
  const params = new URLSearchParams({ cfg: encodePricingIntent(buildSimPrefill(rec, responses)) });
  return `${SIM_BASE}/simulator?${params.toString()}`;
}
