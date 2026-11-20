/**
 * Product facts for the Operations Diagnostic: packages, Crew, add-ons and
 * concept modules. The rules engine, the AI prompt and the report all read
 * from here, so a fact is written once.
 *
 * Package contents and prices come from the verified catalogue snapshot
 * (`src/lib/pricing/catalogSnapshot.json`), never from prose. English text is
 * the canonical form; visitors see the same key translated in the locale
 * packs (`copy/<locale>.ts`).
 *
 * Phase B merges the shared notes below with the guided booking's
 * `leadConversation/packageNotes.ts`, so their English wording must stay
 * identical to that file.
 */

import catalog from "../pricing/catalogSnapshot.json";
import {
  CONCEPT_SKUS,
  CORE_PACKAGES,
  CREW_BUNDLES,
  CREW_SKUS,
  FORESIGHT_AND_ACTION,
  type BandedSku,
  type CorePackageId,
} from "../pricing/priceBook";

// ─── Core ────────────────────────────────────────────────────────────

export const CORE_PACKAGE_ORDER: readonly CorePackageId[] = [
  "core_foundation",
  "core_margin",
  "core_growth",
  "core_performance",
];

export interface CorePackageFact {
  id: CorePackageId;
  name: string;
  includedModuleIds: readonly string[];
  allowsWatchtower: boolean;
  sku: BandedSku;
}

export const CORE_PACKAGE_FACTS: Record<CorePackageId, CorePackageFact> = Object.fromEntries(
  CORE_PACKAGES.map((pkg) => {
    const tier = catalog.tiers.find((item) => `core_${item.id}` === pkg.id);
    return [
      pkg.id,
      {
        id: pkg.id,
        name: pkg.name,
        includedModuleIds: pkg.includedModuleIds,
        allowsWatchtower: tier?.allowsWatchtower === true,
        sku: pkg,
      },
    ];
  }),
) as unknown as Record<CorePackageId, CorePackageFact>;

/** Core module ids in display order (Pulse is shown in the "included" row). */
export const CORE_MODULE_ORDER = [
  "labor",
  "profit",
  "revenue_assurance",
  "inventory",
  "purchasing",
  "delivery",
  "marketing",
  "reservations",
  "guest_experience",
  "guest_crm",
  "foresight",
] as const;
export type CoreModuleId = (typeof CORE_MODULE_ORDER)[number] | "pulse";

export const CORE_MODULE_NAMES_EN: Record<CoreModuleId, string> = {
  labor: "Labour",
  profit: "Profit",
  revenue_assurance: "Revenue assurance",
  inventory: "Inventory and recipes",
  purchasing: "Purchasing",
  delivery: "Delivery",
  marketing: "Marketing",
  reservations: "Reservations",
  guest_experience: "Guest experience",
  guest_crm: "Guest CRM",
  foresight: "Foresight",
  pulse: "Pulse",
};

/** Included with every Core package (owner, 17 Nov 2026). */
export const INCLUDED_WITH_EVERY_CORE = ["pulse", "benchmarks", "ask_sundae", "profit_recovery"] as const;
export type IncludedCapabilityId = (typeof INCLUDED_WITH_EVERY_CORE)[number];

export const INCLUDED_CAPABILITY_NAMES: Record<IncludedCapabilityId, string> = {
  pulse: "Pulse",
  benchmarks: "Benchmarks",
  ask_sundae: "Ask Sundae",
  profit_recovery: "Profit Recovery",
};

export const INCLUDED_CAPABILITY_DESCRIPTIONS_EN: Record<IncludedCapabilityId, string> = {
  pulse: "Live shift pacing and exceptions",
  benchmarks: "Anonymous comparison with peer operators",
  ask_sundae: "Plain-language questions answered from your connected data, with sources",
  profit_recovery: "Find a leak, give the fix to one owner and measure what came back",
};

// ─── Crew ────────────────────────────────────────────────────────────

/** Crew entitlement modules, as the pricing intent and catalogue name them. */
export const CREW_MODULE_ORDER = [
  "crew_scheduling",
  "crew_tna",
  "crew_operations",
  "crew_payroll",
  "crew_people_intelligence",
] as const;
export type CrewModuleId = (typeof CREW_MODULE_ORDER)[number] | "crew_lite";

export const CREW_MODULE_DESCRIPTIONS_EN: Record<CrewModuleId, string> = {
  crew_lite: "Basic scheduling and staff self-service for small teams",
  crew_scheduling: "Schedules, availability, open shifts and swaps",
  crew_tna: "Time clock, attendance and hours approval",
  crew_operations: "Tasks and checklists, shift logbook and handover, staff files and onboarding",
  crew_payroll: "Payroll preparation, payslips and tip workflows",
  crew_people_intelligence: "Training, performance and recruiting",
};

export type CrewProductId =
  | "crew_starter"
  | "crew_schedule"
  | "crew_manage"
  | "crew_time"
  | "crew_pay"
  | "crew_people"
  | "crew_schedule_time"
  | "crew_operating"
  | "crew_complete";

export interface CrewProductFact {
  id: CrewProductId;
  name: string;
  kind: "sku" | "bundle";
  /** Modules bought outright (before entitlement expansion). */
  modules: readonly CrewModuleId[];
  sku: BandedSku;
}

const SKU_MODULE: Record<string, CrewModuleId> = {
  crew_starter: "crew_lite",
  crew_schedule: "crew_scheduling",
  crew_manage: "crew_operations",
  crew_time: "crew_tna",
  crew_pay: "crew_payroll",
  crew_people: "crew_people_intelligence",
};

const BUNDLE_MODULES: Record<string, readonly CrewModuleId[]> = Object.fromEntries(
  catalog.bundles.map((bundle) => [
    bundle.id === "crew_suite_bundle" ? "crew_operating" : bundle.id.replace(/_bundle$/, ""),
    bundle.moduleIds as CrewModuleId[],
  ]),
);

export const CREW_PRODUCT_FACTS: Record<CrewProductId, CrewProductFact> = Object.fromEntries([
  ...CREW_SKUS.map((sku) => [
    sku.id,
    { id: sku.id as CrewProductId, name: sku.name, kind: "sku", modules: [SKU_MODULE[sku.id]], sku },
  ]),
  ...CREW_BUNDLES.map((bundle) => [
    bundle.id,
    { id: bundle.id as CrewProductId, name: bundle.name, kind: "bundle", modules: BUNDLE_MODULES[bundle.id] ?? [], sku: bundle },
  ]),
]) as Record<CrewProductId, CrewProductFact>;

/** What buying these modules entitles you to: Crew Manage carries Crew Schedule. */
export function crewEntitlements(modules: Iterable<CrewModuleId>): Set<CrewModuleId> {
  const granted = new Set<CrewModuleId>(modules);
  if (granted.has("crew_operations")) granted.add("crew_scheduling");
  return granted;
}

/**
 * Dependencies the pricing calculator attaches automatically
 * (`normalizeCrewSelection` in `pricingIntent.ts`): Pay and People need
 * Manage; Manage and Time need Schedule.
 */
export function withCrewDependencies(modules: Iterable<CrewModuleId>): Set<CrewModuleId> {
  const selected = new Set<CrewModuleId>(modules);
  if (selected.has("crew_payroll") || selected.has("crew_people_intelligence")) selected.add("crew_operations");
  if (selected.has("crew_operations") || selected.has("crew_tna")) selected.add("crew_scheduling");
  return selected;
}

/** Crew Starter limits (backend entitlement: 5-location hard cap, 15 people per location soft cap). */
export const CREW_STARTER_MAX_LOCATIONS = CREW_PRODUCT_FACTS.crew_starter.sku.bands.at(-1)?.toUnit ?? 5;
export const CREW_STARTER_TEAM_CAP = 15;

// ─── Add-ons and concept modules ─────────────────────────────────────

export const FORESIGHT_ACTION_NAME = FORESIGHT_AND_ACTION.name;
export const WATCHTOWER_NAME = "Watchtower";
/** Watchtower is recommended only at this many locations or more (spec 4.1). */
export const WATCHTOWER_MIN_LOCATIONS = 6;

export const WATCHTOWER_PACKAGES: readonly CorePackageId[] = CORE_PACKAGE_ORDER.filter(
  (id) => CORE_PACKAGE_FACTS[id].allowsWatchtower,
);

export type ConceptModuleId = "concept_hotel_fb" | "concept_franchise" | "concept_cloud_kitchen" | "concept_catering" | "concept_production";

/** Turn 2 answers → concept modules (spec 4.3). Listed, never priced in the headline. */
export const CONCEPT_FOR_ANSWER: Record<string, ConceptModuleId> = {
  hotel_fb: "concept_hotel_fb",
  franchise: "concept_franchise",
  cloud_kitchen: "concept_cloud_kitchen",
  catering: "concept_catering",
  central_kitchen: "concept_production",
};

export const CONCEPT_MODULE_NAMES: Record<ConceptModuleId, string> = Object.fromEntries(
  CONCEPT_SKUS.filter((sku) => sku.id !== "concept_rental_commissary").map((sku) => [sku.id, sku.name]),
) as Record<ConceptModuleId, string>;

// ─── Shared notes (same wording as the guided booking) ──────────────

export const SHARED_PACKAGE_NOTES = {
  tasks_logbook: "Tasks and the logbook are in Crew Manage, Crew Operating and Crew Complete.",
  tips: "Tip workflows are in Crew Operating and Crew Complete, or with Crew Pay.",
  payroll: "Payroll availability is confirmed for your country before setup.",
  watchtower: "Watchtower is available with Core Growth and Core Performance.",
  foresight: "Foresight is included in Core Performance and available with the other packages.",
} as const;
export type SharedNoteKey = keyof typeof SHARED_PACKAGE_NOTES;

// ─── Names the report guard recognises ───────────────────────────────

/** Every product name a model could put into prose, longest first. */
export const ALL_PRODUCT_NAMES: readonly string[] = [
  ...CORE_PACKAGES.map((pkg) => pkg.name),
  ...Object.values(CREW_PRODUCT_FACTS).map((product) => product.name),
  "Crew Payroll",
  "Crew Lite",
  FORESIGHT_ACTION_NAME,
  WATCHTOWER_NAME,
].sort((a, b) => b.length - a.length);

/** Internal language that must never reach a customer (spec 5.4). */
export const INTERNAL_TERMS = ["moat", "NodeScope", "substrate", "network effect", "network-effect"] as const;

// ─── Prompt section, generated from the facts above ──────────────────

function moduleList(ids: readonly string[]): string {
  return ids
    .filter((id) => id !== "pulse")
    .map((id) => CORE_MODULE_NAMES_EN[id as CoreModuleId] ?? id)
    .join(", ");
}

/** Plain-text product facts for the AI prompt. Generated, never hand-written. */
export function productFactsForPrompt(): string {
  const packages = CORE_PACKAGE_ORDER.map((id) => {
    const pkg = CORE_PACKAGE_FACTS[id];
    return `- ${pkg.name}: ${moduleList(pkg.includedModuleIds)}.`;
  }).join("\n");
  const included = INCLUDED_WITH_EVERY_CORE.map(
    (id) => `- ${INCLUDED_CAPABILITY_NAMES[id]}: ${INCLUDED_CAPABILITY_DESCRIPTIONS_EN[id]}.`,
  ).join("\n");
  const crew = Object.values(CREW_PRODUCT_FACTS)
    .map((product) => {
      const covered = [...crewEntitlements(product.modules)].map((crewModule) => CREW_MODULE_DESCRIPTIONS_EN[crewModule]).join("; ");
      return `- ${product.name} (${product.kind}): ${covered}.`;
    })
    .join("\n");
  const notes = Object.values(SHARED_PACKAGE_NOTES).map((note) => `- ${note}`).join("\n");

  return [
    "Core packages (the modules each one includes):",
    packages,
    "",
    "Included with every Core package:",
    included,
    "",
    "Profit Recovery is the loop in every Core package: detect a likely leak from operating data, decide, give the fix to one named owner as one tracked action, then measure the result against a baseline frozen when the work is done. Results stay directional until confirmed against the operator's own records.",
    "",
    "Crew (optional; an operator can keep their existing HR and payroll system):",
    crew,
    `- Crew Starter is for up to ${CREW_STARTER_MAX_LOCATIONS} locations and ${CREW_STARTER_TEAM_CAP} people per location, and is not combined with other Crew products.`,
    "",
    "Add-ons:",
    `- ${FORESIGHT_ACTION_NAME}: forecasting and scenario planning. Included in Core Performance; an optional add-on with the other packages.`,
    `- ${WATCHTOWER_NAME}: competitor and local event signals. Available with ${WATCHTOWER_PACKAGES.map((id) => CORE_PACKAGE_FACTS[id].name).join(" and ")} only, and scoped separately.`,
    `- Concept modules (${Object.values(CONCEPT_MODULE_NAMES).join(", ")}): listed when relevant, priced in the calculator.`,
    "",
    "Shared notes:",
    notes,
  ].join("\n");
}
