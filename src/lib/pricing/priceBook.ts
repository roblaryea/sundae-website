/**
 * Sundae canonical price book — v1.7.
 *
 * SINGLE SOURCE OF TRUTH for every price this marketing site renders,
 * computes, or hands to a model. Nothing on the public site may quote a
 * number that is not derived from this file.
 *
 * ── The two rules that keep us honest ──────────────────────────────────
 *
 * 1. BANDS ARE MARGINAL. A Core package (and Foresight & Action) is priced
 *    as a FIRST-UNIT anchor plus a marginal rate for each additional unit,
 *    where the marginal rate steps down as you cross a band boundary.
 *    Reaching a band does NOT reprice the units below it.
 *
 *      5 Core Foundation locations = 1195 + 4 x 175 = $1,895 / mo total.
 *
 *    Therefore: never render or compute a flat "$X per location" rate for a
 *    banded SKU, and never write "includes N locations" / "base covers 3,
 *    then $X/loc beyond 3". That is the RETIRED v1.6 mechanic and it is
 *    factually wrong under v1.7. A blended average (total ÷ units) may be
 *    shown ONLY when explicitly labelled as an average of the total.
 *
 * 2. THE ELEVEN CORE DOMAIN MODULES ARE PACKAGE COMPONENTS, never
 *    a-la-carte offers. They describe what a Core package INCLUDES. There
 *    is no per-module price on this site.
 *
 * ── Retired in v1.7 (must not be offered or advertised anywhere) ───────
 *    report_lite, report_plus, report_pro, core_lite, core_pro
 *    ("Report Lite / Plus / Pro", "Core Lite", "Core Pro").
 *    Those ids may survive ONLY as internal compatibility aliases when
 *    reading an existing subscription — never as something we sell.
 */

export const PRICE_BOOK_VERSION = 'v1.7'

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

/** Band boundaries are identical across every banded SKU in v1.7. */
export const MARGINAL_BAND_RANGES = [
  { fromUnit: 2, toUnit: 10 },
  { fromUnit: 11, toUnit: 25 },
  { fromUnit: 26, toUnit: 50 },
  { fromUnit: 51, toUnit: 100 },
] as const

/** Highest unit index the published bands cover. Above this: talk to us. */
export const BANDED_UNIT_CEILING = 100

function bands(rates: [number, number, number, number]): MarginalBand[] {
  return MARGINAL_BAND_RANGES.map((range, index) => ({
    fromUnit: range.fromUnit,
    toUnit: range.toUnit,
    monthlyPerUnit: rates[index],
  }))
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
}

export const CORE_PACKAGES: CorePackage[] = [
  {
    id: 'core_foundation',
    name: 'Core Foundation',
    firstUnitMonthly: 1195,
    bands: bands([175, 150, 125, 105]),
    aiCreditWallet: 14_000,
  },
  {
    id: 'core_margin',
    name: 'Core Margin',
    firstUnitMonthly: 1650,
    bands: bands([245, 210, 175, 145]),
    aiCreditWallet: 16_000,
  },
  {
    id: 'core_growth',
    name: 'Core Growth',
    firstUnitMonthly: 1925,
    bands: bands([260, 225, 190, 155]),
    aiCreditWallet: 18_000,
  },
  {
    id: 'core_performance',
    name: 'Core Performance',
    firstUnitMonthly: 2980,
    bands: bands([409, 348, 290, 236]),
    aiCreditWallet: 24_000,
  },
]

export const CORE_PACKAGES_BY_ID: Record<CorePackageId, CorePackage> =
  Object.fromEntries(CORE_PACKAGES.map((pkg) => [pkg.id, pkg])) as Record<
    CorePackageId,
    CorePackage
  >

/** Foresight & Action is banded on the same boundaries as the Core packages. */
export const FORESIGHT_AND_ACTION: BandedSku = {
  id: 'foresight_action',
  name: 'Foresight & Action',
  firstUnitMonthly: 495,
  bands: bands([65, 55, 45, 35]),
}

/* ────────────────────────────────────────────────────────────────────────
 * Flat monthly SKUs
 * ──────────────────────────────────────────────────────────────────────── */

export interface FlatSku {
  id: string
  name: string
  monthly: number
  /** Optional dependency note, e.g. a Crew SKU that requires Schedule. */
  note?: string
}

export const CREW_SKUS: FlatSku[] = [
  { id: 'crew_starter', name: 'Crew Starter', monthly: 99 },
  { id: 'crew_schedule', name: 'Crew Schedule', monthly: 179 },
  { id: 'crew_manage', name: 'Crew Manage', monthly: 399 },
  { id: 'crew_time', name: 'Crew Time', monthly: 99 },
  { id: 'crew_pay', name: 'Crew Pay', monthly: 129 },
  { id: 'crew_people', name: 'Crew People', monthly: 249 },
]

export const CREW_BUNDLES: FlatSku[] = [
  { id: 'crew_schedule_time', name: 'Schedule & Time', monthly: 249 },
  { id: 'crew_operating', name: 'Crew Operating', monthly: 499 },
  { id: 'crew_complete', name: 'Crew Complete', monthly: 699 },
]

/** Concept SKUs — the operating models an F&B group can switch on. */
export const CONCEPT_SKUS: FlatSku[] = [
  { id: 'concept_franchise', name: 'Franchise', monthly: 595 },
  { id: 'concept_hotel_fb', name: 'Hotel F&B', monthly: 395 },
  { id: 'concept_cloud_kitchen', name: 'Cloud Kitchen', monthly: 395 },
  { id: 'concept_catering', name: 'Catering', monthly: 349 },
  { id: 'concept_production', name: 'Production', monthly: 595 },
  { id: 'concept_rental_commissary', name: 'Rental Commissary', monthly: 395 },
]

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
  annual: 0.1,
  two_year: 0.15,
}

/** Volume + billing-cycle discounts stack, but never past this ceiling. */
export const COMBINED_DISCOUNT_CAP = 0.15

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
 * The eleven Core domain modules — PACKAGE COMPONENTS, never offers.
 * ──────────────────────────────────────────────────────────────────────── */

export interface CoreDomainModule {
  id: string
  name: string
  summary: string
}

export const CORE_DOMAIN_MODULES: CoreDomainModule[] = [
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
   * unit 100; above that the marginal rate is not published, so a caller MUST
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
  const pricedUnits = Math.min(requested, BANDED_UNIT_CEILING)

  let monthlyTotal = sku.firstUnitMonthly
  for (const band of sku.bands) {
    if (pricedUnits < band.fromUnit) break
    const upper = Math.min(pricedUnits, band.toUnit)
    monthlyTotal += (upper - band.fromUnit + 1) * band.monthlyPerUnit
  }

  return {
    monthlyTotal,
    pricedUnits,
    beyondBandedRange: requested > BANDED_UNIT_CEILING,
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
      `- ${pkg.name}: ${usd(pkg.firstUnitMonthly)} first location, then ${describeBands(pkg)} per ADDITIONAL location/mo. AI credit wallet ${pkg.aiCreditWallet.toLocaleString('en-US')}/mo.`,
  ).join('\n')

  const crew = CREW_SKUS.map((sku) => `${sku.name} ${usd(sku.monthly)}`).join(' · ')
  const crewBundles = CREW_BUNDLES.map((sku) => `${sku.name} ${usd(sku.monthly)}`).join(' · ')
  const concepts = CONCEPT_SKUS.map((sku) => `${sku.name} ${usd(sku.monthly)}`).join(' · ')
  const implementation = IMPLEMENTATION_CLASSES.map(
    (cls) => `${cls.name} ${cls.from ? 'from ' : ''}${usd(cls.oneOff)}`,
  ).join(' · ')
  const volume = VOLUME_LADDER.map(
    (band) => `${band.label} ${band.rate === null ? 'Enterprise (quoted)' : `${(band.rate * 100).toFixed(band.rate === 0.025 ? 1 : 0)}%`}`,
  ).join(' · ')

  return [
    `Sundae price book ${PRICE_BOOK_VERSION} (monthly ${PRICE_BOOK_CURRENCY}).`,
    '',
    'CORE PACKAGES — priced as a FIRST-LOCATION anchor plus MARGINAL bands.',
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
    `BILLING CYCLE: annual 10% · 2-year 15%. Volume + cycle discounts combined are capped at ${COMBINED_DISCOUNT_CAP * 100}%.`,
    `VOLUME LADDER: ${volume}`,
    '',
    'The eleven Core domain modules (Labor, Inventory, Purchasing, Marketing,',
    'Reservations, Profit, Revenue Assurance, Delivery, Guest Experience, Pulse,',
    'Guest CRM) are PACKAGE COMPONENTS. They are never sold a-la-carte and have',
    'no standalone price. Describe them as what a Core package includes.',
    '',
    'RETIRED — never quote, name, or recommend: Report Lite, Report Plus,',
    'Report Pro, Core Lite, Core Pro. There is no free tier.',
    '',
    'Treat every figure as indicative list pricing for sizing a range — never a quote.',
  ].join('\n')
}
