import releases from '@/content/product-walkthrough-media.json'
import copy from '@/content/product-walkthroughs.json'
import { SITE_URL } from '@/lib/urls'
import { getLocalizedPathname, type WebsiteLocale } from '@/lib/i18n'

export type ProductWalkthrough = {
  id: 'sales' | 'action' | 'attendance'
  family: 'Core' | 'Crew'
  source: string
  poster: string
  captions: string
  durationSeconds: number
  publishedAt: string
  productPath: string
  transcript: string[]
  sha256: string
}

export const productWalkthroughs = releases as ProductWalkthrough[]
export const PRODUCT_WALKTHROUGHS_PATH = '/resources/product-walkthroughs'

export function getWalkthroughSchema(locale: WebsiteLocale) {
  const words = copy[locale as keyof typeof copy]
  const pageUrl = new URL(getLocalizedPathname(PRODUCT_WALKTHROUGHS_PATH, locale), SITE_URL).toString()
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: words.label,
    description: words.intro,
    url: pageUrl,
    inLanguage: locale,
    mainEntity: productWalkthroughs.map(film => ({
      '@type': 'VideoObject',
      '@id': `${pageUrl}#${film.id}`,
      name: words[`${film.id}Title`],
      description: `${words[`${film.id}Body`]} ${words.language}`,
      contentUrl: new URL(film.source, SITE_URL).toString(),
      thumbnailUrl: [new URL(film.poster, SITE_URL).toString()],
      uploadDate: film.publishedAt,
      duration: `PT${film.durationSeconds}S`,
      inLanguage: 'en',
      isAccessibleForFree: true,
      transcript: film.transcript.join('\n\n'),
      publisher: { '@type': 'Organization', name: 'Sundae', url: SITE_URL },
    })),
  }
}
