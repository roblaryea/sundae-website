import type { WebsiteLocale } from '@/lib/i18n'
import storyCopy from '@/content/platform-story.json'
import discoveryCopy from '@/content/discovery-navigation.json'

export const CORE_CAPABILITY_PATHS = [
  '/product/pulse', '/product/benchmarking', '/product/watchtower',
  '/product/insights', '/product/intelligence', '/product/foresight', '/product/recovery',
] as const

type CoreLink = { name: string; description?: string; href: string }

/** Six intelligence layers plus the measured-action workflow, in every locale. */
export function getCoreNavigation(localizedLayers: readonly CoreLink[], locale: WebsiteLocale): CoreLink[] {
  const layers = new Map(localizedLayers.map(link => [link.href, link]))
  return CORE_CAPABILITY_PATHS.flatMap(path => {
    if (path === '/product/recovery') return [{
      name: 'Profit Recovery',
      description: storyCopy[locale as keyof typeof storyCopy].measureReason,
      href: path,
    }]
    const link = layers.get(path)
    if (!link) return []
    const copy = discoveryCopy[locale]
    if (path === '/product/benchmarking') return [{ ...link, description: copy.benchmarks }]
    if (path === '/product/insights') return [{ ...link, description: copy.insights }]
    return [link]
  })
}
