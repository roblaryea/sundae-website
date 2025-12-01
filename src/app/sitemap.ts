import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blogData'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sundae.ai'
  
  // Core pages
  const corePages = [
    '',
    '/report',
    '/nexus',
    '/insights',
    '/canvas',
    '/about',
    '/pricing',
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
  ]

  // Product pages
  const productPages = [
    '/product',
    '/product/scout',
    '/product/pulse',
    '/product/forge',
    '/product/canvas',
    '/product/watchtower',
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

  // Blog posts
  const blogPostPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Combine all static pages
  const staticPages = [...corePages, ...productPages, ...solutionPages, ...toolPages].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/product') || route === '/pricing' ? 0.9 : 0.7,
  }))

  return [...staticPages, ...blogPostPages]
}
