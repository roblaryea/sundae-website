/**
 * Public list-price snapshot verified against the authoritative active database
 * catalogue. The live pricing calculator remains the authority for an estimate.
 * Run `npm run pricing:check` to detect changed rates, scopes or entitlements.
 * Rates are marginal; a package includes only its listed module IDs.
 */
import catalog from './catalogSnapshot.json';

export const PRICE_BOOK_VERSION = catalog.versionName
export const PRICE_BOOK_VERIFIED_ON = catalog.verifiedOn

/** Every price in this file is monthly USD unless the field says otherwise. */
export const PRICE_BOOK_CURRENCY = 'USD'

/* ────────────────────────────────────────────────────────────────────────
 * Retired catalogue keys — exported so guards/tests can assert we never
 * offer them again. Not for rendering.
 * ──────────────────────────────────────────────────────────────────────── */
export const RETIRED_CATALOG_KEYS = [
  'report_lite',
  'report_plus',
  'report_pro',
  'core_lite',
  'core_pro',
] as const

export type RetiredCatalogKey = (typeof RETIRED_CATALOG_KEYS)[number]

/* ────────────────────────────────────────────────────────────────────────
 * Banded SKUs (Core packages + Foresight & Action)
 * ──────────────────────────────────────────────────────────────────────── */

export interface MarginalBand {
  /** First unit index this rate applies to (unit 1 is the anchor). */
  fromUnit: number
  /** Last unit index this rate applies to, inclusive. */
  toUnit: number
  /** Marginal monthly price for EACH unit inside this band. */
  monthlyPerUnit: number
}

/** Highest unit index the published bands cover. Above this: talk to us. */
export const BANDED_UNIT_CEILING = 249

function bands(raw: number[][]): MarginalBand[] {
  return raw.slice(1).map(([toUnit, monthlyPerUnit], index) => ({
    fromUnit: raw[index][0] + 1,
    toUnit: Math.min(toUnit, BANDED_UNIT_CEILING),
    monthlyPerUnit,
  })).filter(band => band.fromUnit <= BANDED_UNIT_CEILING);
}

export interface BandedSku {
  id: string
  name: string
  /** Monthly price of the first unit — the anchor. */
  firstUnitMonthly: number
  /** Marginal monthly rate for units 2-10 / 11-25 / 26-50 / 51-100. */
  bands: MarginalBand[]
}

export type CorePackageId =
  | 'core_foundation'
  | 'core_margin'
  | 'core_growth'
  | 'core_performance'

export interface CorePackage extends BandedSku {
  id: CorePackageId
  /** Monthly AI credit wallet included with the package. */
  aiCreditWallet: number
  includedModuleIds: readonly string[]
}

export const CORE_PACKAGES: CorePackage[] = catalog.tiers.map(tier => ({
  id: `core_${tier.id}` as CorePackageId,
  name: tier.name,
  firstUnitMonthly: tier.basePrice,
  bands: bands(tier.locationBands),
  aiCreditWallet: tier.aiCreditsBase,
  includedModuleIds: tier.includedModuleIds,
}));

export const CORE_PACKAGES_BY_ID: Record<CorePackageId, CorePackage> =
  Object.fromEntries(CORE_PACKAGES.map((pkg) => [pkg.id, pkg])) as Record<
    CorePackageId,
    CorePackage
  >

/** Foresight & Action is banded on the same boundaries as the Core packages. */
function moduleSku(id: string, name: string): BandedSku {
  const item = catalog.modules.find(item => item.id === id);
  if (!item?.locationBands?.length) throw new Error(`Missing published location bands: ${id}`);
  return { id, name, firstUnitMonthly: item.locationBands[0][1], bands: bands(item.locationBands) };
}
export const FORESIGHT_AND_ACTION = moduleSku('foresight', 'Foresight & Action');

/* ────────────────────────────────────────────────────────────────────────
 * Location-priced SKUs
 * ──────────────────────────────────────────────────────────────────────── */

export interface LocationSku extends BandedSku {
  id: string
  name: string
  monthly: number
  /** Monthly is the first-location anchor, retained for existing teaser consumers. */
  note?: string
}

const crewSku = (id: string, sourceId: string, name: string): LocationSku => {
  const item = moduleSku(sourceId, name);
  return { ...item, id, monthly: item.firstUnitMonthly };
};
export const CREW_SKUS: LocationSku[] = [
  crewSku('crew_starter', 'crew_lite', 'Crew Starter'),
  crewSku('crew_schedule', 'crew_scheduling', 'Crew Schedule'),
  crewSku('crew_manage', 'crew_operations', 'Crew Manage'),
  crewSku('crew_time', 'crew_tna', 'Crew Time'),
  crewSku('crew_pay', 'crew_payroll', 'Crew Pay'),
  crewSku('crew_people', 'crew_people_intelligence', 'Crew People'),
];
export const CREW_BUNDLES: LocationSku[] = catalog.bundles.map(item => ({
  id: item.id === 'crew_suite_bundle' ? 'crew_operating' : item.id.replace(/_bundle$/, ''),
  name: item.name,
  monthly: item.basePrice,
  firstUnitMonthly: item.basePrice,
  bands: bands(item.locationBands),
}));
export const CONCEPT_SKUS: LocationSku[] = [
  crewSku('concept_franchise', 'franchise_intelligence', 'Franchise'),
  crewSku('concept_hotel_fb', 'hotel_fb_analytics', 'Hotel F&B'),
  crewSku('concept_cloud_kitchen', 'cloud_kitchen', 'Cloud Kitchen'),
  crewSku('concept_catering', 'crew_catering', 'Catering'),
  crewSku('concept_production', 'crew_production', 'Production'),
  crewSku('concept_rental_commissary', 'rental_commissary', 'Rental Commissary'),
];

/* ────────────────────────────────────────────────────────────────────────
 * Implementation — charged ONCE, at the highest class in the selection.
 * ──────────────────────────────────────────────────────────────────────── */

export interface ImplementationClass {
  id: 'self_service' | 'a' | 'b' | 'c' | 'd'
  name: string
  /** One-off USD. `from` = quoted upward from this figure. */
  oneOff: number
  from?: boolean
}

export const IMPLEMENTATION_CLASSES: ImplementationClass[] = [
  { id: 'self_service', name: 'Self-service', oneOff: 0 },
  { id: 'a', name: 'Class A', oneOff: 1500 },
  { id: 'b', name: 'Class B', oneOff: 2500 },
  { id: 'c', name: 'Class C', oneOff: 7500 },
  { id: 'd', name: 'Class D', oneOff: 12_500, from: true },
]

/* ────────────────────────────────────────────────────────────────────────
 * Discounts
 * ──────────────────────────────────────────────────────────────────────── */

export type BillingCycle = 'monthly' | 'annual' | 'two_year'

export const BILLING_CYCLE_DISCOUNTS: Record<BillingCycle, number> = {
  monthly: 0,
  annual: 0.12,
  two_year: 0.20,
}

/** Volume + billing-cycle discounts stack, but never past this ceiling. */
export const COMBINED_DISCOUNT_CAP = catalog.maxCombinedDiscountPercent / 100

export interface VolumeBand {
  fromUnits: number
  /** null = open-ended. */
  toUnits: number | null
  /** null = no self-serve rate; this band is Enterprise, quoted. */
  rate: number | null
  label: string
}

export const VOLUME_LADDER: VolumeBand[] = [
  { fromUnits: 1, toUnits: 49, rate: 0, label: 'Under 50 locations' },
  { fromUnits: 50, toUnits: 99, rate: 0.025, label: '50-99 locations' },
  { fromUnits: 100, toUnits: 199, rate: 0.05, label: '100-199 locations' },
  { fromUnits: 200, toUnits: 249, rate: 0.07, label: '200-249 locations' },
  { fromUnits: 250, toUnits: null, rate: null, label: '250+ locations' },
]

/* ────────────────────────────────────────────────────────────────────────
 * The Core module catalogue — PACKAGE COMPONENTS, never offers.
 * ──────────────────────────────────────────────────────────────────────── */

export interface CoreDomainModule {
  id: string
  name: string
  summary: string
}

export const CORE_DOMAIN_MODULES: CoreDomainModule[] = [
  { id: 'foresight', name: 'Foresight Intelligence', summary: 'Forecasts and scenario planning, subject to selected package and data readiness.' },
  { id: 'labor', name: 'Labor Intelligence', summary: 'Schedule vs. actual, overtime leakage, productivity per labor hour.' },
  { id: 'inventory', name: 'Inventory Intelligence', summary: 'Theoretical vs. actual usage, waste, shrinkage, par levels.' },
  { id: 'purchasing', name: 'Purchasing Intelligence', summary: 'Vendor price movement, contract adherence, order consolidation.' },
  { id: 'marketing', name: 'Marketing Performance', summary: 'Promo ROI by channel, acquisition cost, campaign attribution.' },
  { id: 'reservations', name: 'Reservations Intelligence', summary: 'Cover pacing, no-show risk, table turn and capacity yield.' },
  { id: 'profit', name: 'Profit Intelligence', summary: 'Item and outlet-level contribution, menu engineering, margin drag.' },
  { id: 'revenue_assurance', name: 'Revenue Assurance', summary: 'Void, comp, discount and cash-variance pattern detection.' },
  { id: 'delivery', name: 'Delivery Intelligence', summary: 'Channel margin after commission, prep time, order accuracy.' },
  { id: 'guest_experience', name: 'Guest Experience', summary: 'Review and sentiment signal tied back to shift and outlet.' },
  { id: 'pulse', name: 'Pulse', summary: 'Real-time shift pacing, exception flags and live leak surfacing.' },
  { id: 'guest_crm', name: 'Guest CRM Intelligence', summary: 'Cohort retention, guest LTV, churn-at-risk segments.' },
]

/* ────────────────────────────────────────────────────────────────────────
 * Calculators
 * ──────────────────────────────────────────────────────────────────────── */

export interface BandedQuote {
  /** Total monthly list price for `units` units, before any discount. */
  monthlyTotal: number
  /** Units actually priced by the published bands. */
  pricedUnits: number
  /**
   * True when `units` exceeds the published band ceiling. The bands stop at
   * the applicable product ceiling; above it the marginal rate is not published, so a caller MUST
   * present "talk to us" rather than extrapolate.
   */
  beyondBandedRange: boolean
  /**
   * monthlyTotal / pricedUnits. A DERIVED AVERAGE of the total — it is not a
   * rate card and must always be labelled as an average when displayed.
   */
  blendedAveragePerUnit: number
}

/**
 * Marginal-band total for a banded SKU.
 *
 *   bandedMonthlyTotal(CORE_PACKAGES_BY_ID.core_foundation, 5).monthlyTotal
 *     === 1195 + 4 * 175 === 1895
 */
export function bandedMonthlyTotal(sku: BandedSku, units: number): BandedQuote {
  const requested = Math.max(1, Math.floor(units))
  const ceiling = Math.min(BANDED_UNIT_CEILING, sku.bands.at(-1)?.toUnit ?? 1)
  const pricedUnits = Math.min(requested, ceiling)

  let monthlyTotal = sku.firstUnitMonthly
  for (const band of sku.bands) {
    if (pricedUnits < band.fromUnit) break
    const upper = Math.min(pricedUnits, band.toUnit)
    monthlyTotal += (upper - band.fromUnit + 1) * band.monthlyPerUnit
  }

  return {
    monthlyTotal,
    pricedUnits,
    beyondBandedRange: requested > ceiling,
    blendedAveragePerUnit: Math.round(monthlyTotal / pricedUnits),
  }
}

/** Volume band for a given location count. */
export function volumeBandFor(units: number): VolumeBand {
  return (
    VOLUME_LADDER.find(
      (band) => units >= band.fromUnits && (band.toUnits === null || units <= band.toUnits),
    ) ?? VOLUME_LADDER[0]
  )
}

/** Volume discount rate, or null when the count falls in the Enterprise band. */
export function volumeDiscountRate(units: number): number | null {
  return volumeBandFor(units).rate
}

/**
 * Volume + billing-cycle discount, capped at COMBINED_DISCOUNT_CAP.
 * Returns null when the location count is Enterprise-only (no self-serve rate).
 */
export function combinedDiscountRate(units: number, cycle: BillingCycle): number | null {
  const volume = volumeDiscountRate(units)
  if (volume === null) return null
  return Math.min(volume + BILLING_CYCLE_DISCOUNTS[cycle], COMBINED_DISCOUNT_CAP)
}

/** Implementation is charged once, at the highest class in the selection. */
export function implementationFor(
  classIds: ImplementationClass['id'][],
): ImplementationClass {
  const ordered = IMPLEMENTATION_CLASSES.filter((cls) => classIds.includes(cls.id))
  return ordered.length > 0
    ? ordered[ordered.length - 1]
    : IMPLEMENTATION_CLASSES[0]
}

/* ────────────────────────────────────────────────────────────────────────
 * Formatting helpers (plain USD; locale-aware rendering lives in the views)
 * ──────────────────────────────────────────────────────────────────────── */

export function usd(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-US')}`
}

/**
 * "then $175 (2-10) / $150 (11-25) / $125 (26-50) / $105 (51-100) per
 * additional location per month" — the only sanctioned way to render bands
 * as a single line. Never collapses to one flat per-location number.
 */
export function describeBands(sku: BandedSku): string {
  return sku.bands
    .map((band) => `${usd(band.monthlyPerUnit)} (${band.fromUnit}-${band.toUnit})`)
    .join(' / ')
}

/**
 * The banded price book rendered as plain text — used to ground the
 * diagnostic system prompt so the model can never anchor on a retired
 * ladder. Generated, never hand-written, so it cannot drift from the data.
 */
export function priceBookForPrompt(): string {
  const core = CORE_PACKAGES.map(
    (pkg) =>
      `- ${pkg.name}: ${usd(pkg.firstUnitMonthly)} first location, then ${describeBands(pkg)} per ADDITIONAL location/mo. AI base credits ${pkg.aiCreditWallet.toLocaleString('en-US')}/mo. Included module IDs: ${pkg.includedModuleIds.join(', ')}.`,
  ).join('\n')

  const crew = CREW_SKUS.map((sku) => `${sku.name}: ${usd(sku.monthly)} first location, then ${describeBands(sku)} per additional location/mo`).join(' · ')
  const crewBundles = CREW_BUNDLES.map((sku) => `${sku.name}: ${usd(sku.monthly)} first location, then ${describeBands(sku)} per additional location/mo`).join(' · ')
  const concepts = CONCEPT_SKUS.map((sku) => `${sku.name}: ${usd(sku.monthly)} first location, then ${describeBands(sku)} per additional location/mo`).join(' · ')
  const implementation = IMPLEMENTATION_CLASSES.map(
    (cls) => `${cls.name} ${cls.from ? 'from ' : ''}${usd(cls.oneOff)}`,
  ).join(' · ')
  const volume = VOLUME_LADDER.map(
    (band) => `${band.label} ${band.rate === null ? 'Enterprise (quoted)' : `${(band.rate * 100).toFixed(band.rate === 0.025 ? 1 : 0)}%`}`,
  ).join(' · ')

  return [
    `Verified Sundae catalogue snapshot ${PRICE_BOOK_VERSION} (${PRICE_BOOK_VERIFIED_ON}) (monthly ${PRICE_BOOK_CURRENCY}).`,
    '',
    'CORE PACKAGES - priced as a FIRST-LOCATION anchor plus MARGINAL bands.',
    'Bands are marginal: crossing a band does NOT reprice earlier locations.',
    'Worked example: 5 Core Foundation locations = 1195 + 4 x 175 = $1,895/mo total (a $379 blended average, NOT a rate).',
    'A banded SKU has NO "included locations". Never say "base covers N, then $X/loc beyond N".',
    core,
    '',
    `FORESIGHT & ACTION: ${usd(FORESIGHT_AND_ACTION.firstUnitMonthly)} first location, then ${describeBands(FORESIGHT_AND_ACTION)} per ADDITIONAL location/mo.`,
    '',
    `CREW: ${crew}`,
    `CREW BUNDLES: ${crewBundles}`,
    `CONCEPTS: ${concepts}`,
    '',
    `IMPLEMENTATION (one-off, charged ONCE at the highest class in the selection): ${implementation}`,
    `BILLING CYCLE: annual upfront 12% · 2-year upfront 20%; annual paid quarterly 5%. Volume + cycle discounts combined are capped at ${COMBINED_DISCOUNT_CAP * 100}%.`,
    `VOLUME LADDER: ${volume}`,
    '',
    'The Core module catalogue (Labor, Inventory, Purchasing, Marketing,',
    'Reservations, Profit, Revenue Assurance, Delivery, Guest Experience, Pulse,',
    'Guest CRM) are not all included in every package. Only list the included',
    'module IDs for the selected package. Extensions depend on eligibility.',
    '',
    'RETIRED - never quote, name, or recommend: Report Lite, Report Plus,',
    'Report Pro, Core Lite, Core Pro. There is no free tier.',
    '',
    'Treat every figure as indicative list pricing for sizing a range - never a quote.',
  ].join('\n')
}
