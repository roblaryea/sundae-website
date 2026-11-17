import { encodePricingIntent, type PricingIntent } from './pricingIntent'
import { PRICING_URL } from './urls'

/** A menu entry opens an editable starting estimate, not a purchase or saved quote. */
export function buildPricingEntryUrl(layer: 'core' | 'crew') {
  const intent: PricingIntent = {
    v: 2, layer, corePackage: 'core_foundation', locations: 1,
    addOns: [], watchtowerModules: [],
    // Match the calculator's native first Crew selection: Operating, with Scheduling included.
    crewSkus: layer === 'crew' ? ['crew_operations', 'crew_scheduling', 'crew_tna', 'crew_payroll'] : [],
    crossIntelligence: 'none', billingCycle: 'monthly', operatingModels: [], employees: null, payrollCountry: '',
  }
  return `${PRICING_URL}/simulator?${new URLSearchParams({ cfg: encodePricingIntent(intent) })}`
}

/** Stable identities; translation packs supply prose, never pricing destinations. */
export const PRICING_ENTRY_PATHS = [buildPricingEntryUrl('core'), buildPricingEntryUrl('crew'), '/product/foresight'] as const

export function getPricingNavigation(descriptions: { core: string; crew: string; foresight: string }) {
  return [
    { name: 'Sundae Core', description: descriptions.core, href: PRICING_ENTRY_PATHS[0] },
    { name: 'Sundae Crew', description: descriptions.crew, href: PRICING_ENTRY_PATHS[1] },
    { name: 'Foresight & Action', description: descriptions.foresight, href: PRICING_ENTRY_PATHS[2] },
  ]
}
