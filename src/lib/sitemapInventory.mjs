/**
 * Canonical inventory for non-blog sitemap routes.
 *
 * Keep this data separate from the Next.js sitemap renderer so route coverage
 * can be checked without duplicating the inventory in a test.
 */
export const sitemapRouteGroups = {
  core: [
    '',
    '/about',
    '/demo',
    '/diagnostic',
    '/contact',
    '/blog',
    '/faq',
    '/tools',
    '/resources',
    '/getting-started',
    '/core',
    '/4d-intelligence',
    '/architecture',
    '/why-sundae',
    '/careers',
    '/privacy',
    '/terms',
    '/docs',
    '/security',
    '/integrations',
    '/solutions',
  ],
  product: [
    '/product',
    '/product/pulse',
    '/product/watchtower',
    '/product/foresight',
    '/product/cross-intelligence',
    '/product/intelligence',
    '/product/insights',
    '/product/benchmarking',
    '/product/recovery',
  ],
  crew: [
    '/crew',
    '/crew/scheduling',
    '/crew/time-attendance',
    '/crew/payroll',
    '/crew/people',
    '/crew/people-intelligence',
  ],
  solutions: [
    '/solutions/multi-location-groups',
    '/solutions/franchises',
    '/solutions/cloud-kitchens',
    '/solutions/hospitality-operators',
    '/solutions/regional-managers',
    '/solutions/c-suite-executives',
    '/solutions/finance-teams',
    '/solutions/marketing-teams',
    '/solutions/technology-teams',
    '/solutions/hr-teams',
  ],
  tools: [
    '/tools/labor-cost',
    '/tools/menu-margin',
    '/tools/breakeven-covers',
    '/tools/labor-analyzer',
    '/tools/benchmark-readiness',
    '/tools/multi-location-uplift',
    '/tools/daypart-margin-leak',
    '/tools/upsell-opportunity-index',
  ],
}

export const sitemapStaticRoutes = Object.values(sitemapRouteGroups).flat()
