import { MetadataRoute } from 'next'
import { getAvailableBlogPostLocales, getSourceBlogPosts } from '@/lib/blogTranslations'
import {
  buildWebsiteAlternateUrls,
  getLocalizedPathname,
  normalizeWebsitePathname,
  websiteLocales,
} from '@/lib/i18n'
import { sitemapStaticRoutes } from '@/lib/sitemapInventory.mjs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sundae.io'
  
  const staticPages = sitemapStaticRoutes.flatMap((route) => {
    const normalizedRoute = normalizeWebsitePathname(route)
    const alternates = buildWebsiteAlternateUrls(normalizedRoute, baseUrl)

    return websiteLocales.map((locale) => ({
      url: new URL(getLocalizedPathname(normalizedRoute, locale), baseUrl).toString(),
      changeFrequency: normalizedRoute === '/' ? 'weekly' as const : 'monthly' as const,
      priority: normalizedRoute === '/' ? 1.0 : normalizedRoute.startsWith('/product') ? 0.9 : 0.7,
      alternates: {
        languages: alternates.languages,
      },
    }))
  })

  const blogPostPages = getSourceBlogPosts().flatMap((post) => {
    const blogPath = `/blog/${post.slug}`
    const availableLocales = getAvailableBlogPostLocales(post.slug)
    const localizedUrls = Object.fromEntries(
      availableLocales.map((locale) => [
        locale,
        new URL(getLocalizedPathname(blogPath, locale), baseUrl).toString(),
      ]),
    )
    const languages = {
      ...localizedUrls,
      'x-default': new URL(getLocalizedPathname(blogPath, 'en'), baseUrl).toString(),
    }

    return availableLocales.map((locale) => ({
      url: new URL(getLocalizedPathname(blogPath, locale), baseUrl).toString(),
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages,
      },
    }))
  })

  return [...staticPages, ...blogPostPages]
}
