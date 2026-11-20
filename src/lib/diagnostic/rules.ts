/**
 * Recommendation rules for the Operations Diagnostic (spec section 4).
 *
 * Pure and deterministic: the same answers always give the same package,
 * Crew option, add-ons, concept modules, hypotheses and price. No strings
 * live here; `engine.ts` turns a `Recommendation` into a localized report.
 */

import {
  BANDED_UNIT_CEILING,
  FORESIGHT_AND_ACTION,
  bandedMonthlyTotal,
  type CorePackageId,
} from "../pricing/priceBook";
import {
  CONCEPT_FOR_ANSWER,
  CORE_PACKAGE_FACTS,
  CREW_PRODUCT_FACTS,
  CREW_STARTER_MAX_LOCATIONS,
  WATCHTOWER_MIN_LOCATIONS,
  crewEntitlements,
  withCrewDependencies,
  type ConceptModuleId,
  type CrewModuleId,
  type CrewProductId,
} from "./productFacts";
import type { DiagnosticResponses } from "./questions";

const values = (value: string | string[] | undefined): string[] =>
  Array.isArray(value) ? value : value ? [value] : [];

// ─── Locations ───────────────────────────────────────────────────────

/** Zero digits of the scripts the site serves: Arabic-Indic, Persian/Urdu, Devanagari, Bengali, Thai, full-width. */
const LOCAL_ZEROS = [0x0660, 0x06f0, 0x0966, 0x09e6, 0x0e50, 0xff10];
const LOCAL_DIGITS = /[٠-٩۰-۹०-९০-৯๐-๙０-９]/g;

/** Converts locale digits to ASCII. */
export function toAsciiDigits(value: string): string {
  return value.replace(LOCAL_DIGITS, (digit) => {
    const code = digit.charCodeAt(0);
    const zero = LOCAL_ZEROS.find((start) => code >= start && code <= start + 9) ?? code;
    return String(code - zero);
  });
}

export const MIN_LOCATIONS = 1;
export const MAX_LOCATIONS = 9999;

/** The exact location count (1-9999), or null when the answer is not a whole number in range. */
export function parseLocationCount(value: string | string[] | undefined): number | null {
  const text = toAsciiDigits(String(Array.isArray(value) ? value[0] ?? "" : value ?? "")).trim();
  // A separator only counts as a thousands separator before exactly three digits ("1,200", "1.200").
  if (!/^\d{1,4}$/.test(text) && !/^\d{1,3}[,.\s\u066C\u00A0\u202F]\d{3}$/.test(text)) return null;
  const raw = text.replace(/\D/g, "");
  const count = Number(raw);
  return count >= MIN_LOCATIONS && count <= MAX_LOCATIONS ? count : null;
}

// ─── Core package (spec 4.1) ─────────────────────────────────────────

export type CoreNeed =
  | "labor"
  | "revenue_assurance"
  | "inventory"
  | "purchasing"
  | "delivery"
  | "reservations"
  | "guest_crm"
  | "guest_experience"
  | "foresight"
  | "watchtower";

/** Turn 9 chips → module needs. "not_sure" adds none. */
export const LEAK_CORE_NEEDS: Record<string, readonly CoreNeed[]> = {
  labor_vs_demand: ["labor"],
  voids_discounts: ["revenue_assurance"],
  food_cost: ["inventory"],
  stockouts: ["inventory"],
  supplier_prices: ["purchasing"],
  menu_margins: ["inventory"],
  delivery_commissions: ["delivery"],
  reservations_noshows: ["reservations"],
  guest_retention: ["guest_crm", "guest_experience"],
  planning: ["foresight"],
  competitors: ["watchtower"],
};

const COST_SIDE: readonly CoreNeed[] = ["inventory", "purchasing"];
const DEMAND_SIDE: readonly CoreNeed[] = ["reservations", "guest_crm", "guest_experience"];

export function coreNeeds(responses: DiagnosticResponses): Set<CoreNeed> {
  const needs = new Set<CoreNeed>();
  for (const answer of values(responses.money_leaks)) for (const need of LEAK_CORE_NEEDS[answer] ?? []) needs.add(need);
  return needs;
}

/** The smallest package that covers the needs. Delivery alone counts as Margin (cost side). */
export function pickCorePackage(needs: ReadonlySet<CoreNeed>): CorePackageId {
  const cost = COST_SIDE.some((need) => needs.has(need));
  const demand = DEMAND_SIDE.some((need) => needs.has(need));
  if (cost && demand) return "core_performance";
  if (demand) return "core_growth";
  if (cost || needs.has("delivery")) return "core_margin";
  return "core_foundation";
}

// ─── Crew (spec 4.2) ─────────────────────────────────────────────────

/** Turns 6 and 8 → Crew modules. Staff turnover adds none (narrative only). */
export const CREW_SIGNAL_MODULES: Record<string, readonly CrewModuleId[]> = {
  schedules: ["crew_scheduling"],
  time_attendance: ["crew_tna"],
  overtime: ["crew_tna"],
  no_shows: ["crew_tna"],
  buddy_punching: ["crew_tna"],
  checklists: ["crew_operations"],
  logbook: ["crew_operations"],
  staff_files: ["crew_operations"],
  compliance: ["crew_operations"],
  payroll_prep: ["crew_payroll"],
  payroll_errors: ["crew_payroll"],
  tips: ["crew_payroll"],
  training: ["crew_people_intelligence"],
};

/** Turn 6 and 8 answers the operator flagged, in question order (excluding "none"). */
export function crewSignals(responses: DiagnosticResponses): string[] {
  return [
    ...values(responses.paper_processes).filter((value) => value !== "none"),
    ...values(responses.team_costs).filter((value) => value !== "none"),
  ];
}

export function crewNeeds(responses: DiagnosticResponses): Set<CrewModuleId> {
  const needs = new Set<CrewModuleId>();
  for (const signal of crewSignals(responses)) for (const crewModule of CREW_SIGNAL_MODULES[signal] ?? []) needs.add(crewModule);
  return needs;
}

export interface CrewPlan {
  /** Products to buy, bundles first (e.g. ["crew_operating"] or ["crew_schedule_time", "crew_pay"]). */
  products: CrewProductId[];
  /** Modules the operator's answers need, before dependencies. */
  needed: CrewModuleId[];
  /** Module selection the pricing calculator receives (`crewSkus`). */
  selection: CrewModuleId[];
  /** Every module the plan entitles the operator to. */
  entitlements: CrewModuleId[];
  monthly: number;
  beyondPublishedBands: boolean;
}

const MODULE_PRODUCT: Record<CrewModuleId, CrewProductId> = {
  crew_lite: "crew_starter",
  crew_scheduling: "crew_schedule",
  crew_operations: "crew_manage",
  crew_tna: "crew_time",
  crew_payroll: "crew_pay",
  crew_people_intelligence: "crew_people",
};

const STANDALONE_ORDER: readonly CrewModuleId[] = [
  "crew_scheduling",
  "crew_operations",
  "crew_tna",
  "crew_payroll",
  "crew_people_intelligence",
];

const CREW_BUNDLE_IDS: readonly CrewProductId[] = ["crew_schedule_time", "crew_operating", "crew_complete"];

function productPrice(id: CrewProductId, locations: number) {
  return bandedMonthlyTotal(CREW_PRODUCT_FACTS[id].sku, locations);
}

function crewStarterEligible(needs: ReadonlySet<CrewModuleId>, locations: number, teamSize: string | undefined): boolean {
  return (
    locations <= CREW_STARTER_MAX_LOCATIONS &&
    teamSize === "up_to_15" &&
    needs.size === 1 &&
    needs.has("crew_scheduling")
  );
}

/**
 * The lowest list-price way to cover every needed module at the exact
 * location count. It mirrors the pricing calculator (`crewPricing.ts` in
 * sundae-pricing): dependencies attach first, then every combination of the
 * published bundles plus individually billed SKUs is priced, with Crew
 * Schedule free alongside Crew Manage. On equal price the bundle wins.
 * Crew Starter is offered only inside its caps and never combined.
 */
export function pickCrewPlan(
  needs: ReadonlySet<CrewModuleId>,
  locations: number,
  teamSize: string | undefined,
): CrewPlan | null {
  if (needs.size === 0) return null;
  const needed = [...needs];

  if (crewStarterEligible(needs, locations, teamSize)) {
    const quote = productPrice("crew_starter", locations);
    return {
      products: ["crew_starter"],
      needed,
      selection: ["crew_lite"],
      entitlements: ["crew_lite"],
      monthly: quote.monthlyTotal,
      beyondPublishedBands: quote.beyondBandedRange,
    };
  }

  const selection = withCrewDependencies(needs);
  let best: { bundles: CrewProductId[]; standalone: CrewModuleId[]; monthly: number; beyond: boolean } | null = null;

  for (let mask = 0; mask < 1 << CREW_BUNDLE_IDS.length; mask += 1) {
    const bundles = CREW_BUNDLE_IDS.filter((_, index) => mask & (1 << index));
    const covered = new Set<CrewModuleId>();
    for (const bundle of bundles) for (const crewModule of crewEntitlements(CREW_PRODUCT_FACTS[bundle].modules)) covered.add(crewModule);
    const standalone = [...selection].filter((crewModule) => !covered.has(crewModule));

    let monthly = 0;
    let beyond = false;
    for (const bundle of bundles) {
      const quote = productPrice(bundle, locations);
      monthly += quote.monthlyTotal;
      beyond ||= quote.beyondBandedRange;
    }
    for (const crewModule of standalone) {
      // Crew Manage carries Crew Schedule, so Schedule bills nothing beside it.
      if (crewModule === "crew_scheduling" && selection.has("crew_operations")) continue;
      const quote = productPrice(MODULE_PRODUCT[crewModule], locations);
      monthly += quote.monthlyTotal;
      beyond ||= quote.beyondBandedRange;
    }

    const wins =
      best === null ||
      monthly < best.monthly ||
      (monthly === best.monthly && bundles.length > 0 && best.bundles.length === 0) ||
      (monthly === best.monthly && bundles.length > 0 && bundles.length + standalone.length < best.bundles.length + best.standalone.length);
    if (wins) best = { bundles, standalone, monthly, beyond };
  }

  const plan = best!;
  const standaloneProducts = STANDALONE_ORDER.filter(
    (crewModule) => plan.standalone.includes(crewModule) && !(crewModule === "crew_scheduling" && selection.has("crew_operations")),
  ).map((crewModule) => MODULE_PRODUCT[crewModule]);
  const products = [...plan.bundles, ...standaloneProducts];
  const entitlements = new Set<CrewModuleId>();
  for (const product of products) for (const crewModule of crewEntitlements(CREW_PRODUCT_FACTS[product].modules)) entitlements.add(crewModule);

  return {
    products,
    needed,
    selection: [...new Set([...selection, ...entitlements])],
    entitlements: [...entitlements],
    monthly: plan.monthly,
    beyondPublishedBands: plan.beyond,
  };
}

// ─── Hypotheses (spec 3.3, up to three from turns 8-9) ───────────────

/** Every hypothesis has a Profit Recovery check in every package that can be recommended for it. */
export const HYPOTHESIS_PRIORITY = [
  "labor_vs_demand",
  "food_cost",
  "voids_discounts",
  "overtime",
  "supplier_prices",
  "menu_margins",
  "delivery_commissions",
  "stockouts",
  "guest_retention",
  "reservations_noshows",
  "no_shows",
  "payroll_errors",
  "buddy_punching",
] as const;
export type HypothesisId = (typeof HYPOTHESIS_PRIORITY)[number];

/** Used when the operator flags no leak: both are checks every Core package includes. */
export const DEFAULT_HYPOTHESES: readonly HypothesisId[] = ["labor_vs_demand", "voids_discounts"];

export interface Hypothesis {
  id: HypothesisId;
  source: "answer" | "default";
}

export function pickHypotheses(responses: DiagnosticResponses): Hypothesis[] {
  const flagged = new Set([...values(responses.money_leaks), ...values(responses.team_costs)]);
  const picked = HYPOTHESIS_PRIORITY.filter((id) => flagged.has(id)).slice(0, 3);
  if (picked.length > 0) return picked.map((id) => ({ id, source: "answer" }));
  return DEFAULT_HYPOTHESES.map((id) => ({ id, source: "default" }));
}

// ─── Recommendation ──────────────────────────────────────────────────

export type PriceQuote =
  | { kind: "list"; core: number; crew: number | null; total: number }
  | { kind: "quoted" };

export interface Recommendation {
  locations: number;
  corePackage: CorePackageId;
  coreNeeds: CoreNeed[];
  crew: CrewPlan | null;
  crewSignals: string[];
  /** "included" with Core Performance; "optional" add-on with the other packages. */
  foresight: "included" | "optional" | null;
  foresightPrice: { kind: "list"; monthly: number } | { kind: "quoted" } | null;
  /** "scoped" with Growth/Performance at 6+ locations; "unavailable" with Foundation/Margin. */
  watchtower: "scoped" | "unavailable" | null;
  concepts: ConceptModuleId[];
  hypotheses: Hypothesis[];
  price: PriceQuote;
  hasHrSystem: boolean;
  payrollNeeded: boolean;
}

export function recommend(responses: DiagnosticResponses): Recommendation {
  // The flow never completes without an exact count; 1 is a safe floor for
  // malformed direct API calls, which still never price a range midpoint.
  const locations = parseLocationCount(responses.locations) ?? 1;
  const needs = coreNeeds(responses);
  const corePackage = pickCorePackage(needs);
  const core = CORE_PACKAGE_FACTS[corePackage];
  const crew = pickCrewPlan(crewNeeds(responses), locations, values(responses.team_size)[0]);

  const foresight = needs.has("foresight")
    ? core.includedModuleIds.includes("foresight") ? "included" : "optional"
    : null;
  const foresightQuote = foresight === "optional" ? bandedMonthlyTotal(FORESIGHT_AND_ACTION, locations) : null;

  const watchtower = needs.has("watchtower")
    ? core.allowsWatchtower
      ? locations >= WATCHTOWER_MIN_LOCATIONS ? "scoped" : null
      : "unavailable"
    : null;

  const concepts = [...new Set(values(responses.concepts).map((answer) => CONCEPT_FOR_ANSWER[answer]).filter(Boolean))];

  const coreQuote = bandedMonthlyTotal(core.sku, locations);
  const beyond = locations > BANDED_UNIT_CEILING || coreQuote.beyondBandedRange || Boolean(crew?.beyondPublishedBands);
  const price: PriceQuote = beyond
    ? { kind: "quoted" }
    : {
        kind: "list",
        core: coreQuote.monthlyTotal,
        crew: crew ? crew.monthly : null,
        total: coreQuote.monthlyTotal + (crew?.monthly ?? 0),
      };

  return {
    locations,
    corePackage,
    coreNeeds: [...needs],
    crew,
    crewSignals: crewSignals(responses),
    foresight,
    foresightPrice: foresightQuote
      ? foresightQuote.beyondBandedRange
        ? { kind: "quoted" }
        : { kind: "list", monthly: foresightQuote.monthlyTotal }
      : null,
    watchtower,
    concepts,
    hypotheses: pickHypotheses(responses),
    price,
    hasHrSystem: values(responses.other_systems).includes("hr_payroll"),
    payrollNeeded: Boolean(crew?.needed.includes("crew_payroll")),
  };
}
