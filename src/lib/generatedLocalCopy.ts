const STRUCTURAL_COPY_KEYS = new Set([
  'id',
  'key',
  'slug',
  'href',
  'url',
  'src',
  'path',
  'ctaLink',
  'link',
  'product',
  'icon',
  'iconName',
  'color',
  'gradient',
  'className',
  'variant',
  'type',
])

export function mergeGeneratedCopy<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base

  if (Array.isArray(base)) {
    if (!Array.isArray(override)) return base
    return base.map((item, index) => mergeGeneratedCopy(item, override[index])) as T
  }

  if (typeof base === 'object' && base !== null) {
    if (typeof override !== 'object' || override === null || Array.isArray(override)) return base

    const merged: Record<string, unknown> = { ...(base as Record<string, unknown>) }
    for (const [key, value] of Object.entries(override)) {
      if (STRUCTURAL_COPY_KEYS.has(key)) continue
      merged[key] = key in merged ? mergeGeneratedCopy(merged[key], value) : value
    }
    return merged as T
  }

  return override as T
}

export function getGeneratedLocalCopy<T>(
  source: Record<string, T>,
  generatedByLocale: unknown,
  locale: string,
): T | undefined {
  const base = source.en
  if (base === undefined) return undefined
  if (!generatedByLocale || typeof generatedByLocale !== 'object') return undefined
  const override = (generatedByLocale as Record<string, unknown>)[locale]
  if (override === undefined) return undefined
  return mergeGeneratedCopy(base, override)
}
