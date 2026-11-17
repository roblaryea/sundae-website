/** Stable purchase-entry identities; translation packs supply prose, never product routes. */
export const PRICING_ENTRY_PATHS = ['/core', '/crew', '/product/foresight'] as const

export function getPricingNavigation(descriptions: { core: string; crew: string; foresight: string }) {
  return [
    { name: 'Sundae Core', description: descriptions.core, href: PRICING_ENTRY_PATHS[0] },
    { name: 'Sundae Crew', description: descriptions.crew, href: PRICING_ENTRY_PATHS[1] },
    { name: 'Foresight & Action', description: descriptions.foresight, href: PRICING_ENTRY_PATHS[2] },
  ]
}
