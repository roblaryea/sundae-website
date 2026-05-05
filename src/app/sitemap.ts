import { MetadataRoute } from 'next'
import { getSourceBlogPosts } from '@/lib/blogTranslations'
import {
  buildWebsiteAlternateUrls,
  getLocalizedPathname,
  normalizeWebsitePathname,
  websiteLocales,
} from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sundae.io'
  
  // Core pages
  const corePages = [
    '',
    '/report',
    '/intelligence',
    '/insights',
    '/about',
    '/demo',
    '/contact',
    '/blog',
    '/tools',
    '/resources',
    '/4d-intelligence',
    '/architecture',
    '/benchmarking',
    '/why-sundae',
    '/careers',
    '/privacy',
    '/terms',
    '/docs',
    '/security',
    '/integrations',
    '/solutions',
  ]

  // Product pages
  const productPages = [
    '/product',
    '/product/pulse',
    '/product/watchtower',
    '/product/foresight',
    '/product/cross-intelligence',
    '/product/sundae-report',
  ]

  // Solutions pages
  const solutionPages = [
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
  ]

  // Tools pages
  const toolPages = [
    '/tools/labor-cost',
    '/tools/menu-margin',
    '/tools/breakeven-covers',
    '/tools/labor-analyzer',
    '/tools/benchmark-readiness',
    '/tools/multi-location-uplift',
  ]

  const staticRoutes = [...corePages, ...productPages, ...solutionPages, ...toolPages]

  const staticPages = staticRoutes.flatMap((route) => {
    const normalizedRoute = normalizeWebsitePathname(route)
    const alternates = buildWebsiteAlternateUrls(normalizedRoute, baseUrl)

    return websiteLocales.map((locale) => ({
      url: new URL(getLocalizedPathname(normalizedRoute, locale), baseUrl).toString(),
      lastModified: new Date(),
      changeFrequency: normalizedRoute === '/' ? 'weekly' as const : 'monthly' as const,
      priority: normalizedRoute === '/' ? 1.0 : normalizedRoute.startsWith('/product') ? 0.9 : 0.7,
      alternates: {
        languages: alternates.languages,
      },
    }))
  })

  const blogPostPages = getSourceBlogPosts().flatMap((post) => {
    const blogPath = `/blog/${post.slug}`
    const alternates = buildWebsiteAlternateUrls(blogPath, baseUrl)

    return websiteLocales.map((locale) => ({
      url: new URL(getLocalizedPathname(blogPath, locale), baseUrl).toString(),
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: alternates.languages,
      },
    }))
  })

  return [...staticPages, ...blogPostPages]
}
