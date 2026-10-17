/**
 * Languages for profile cards (sundae.io/<handle>): the 22 website languages plus Papiamento,
 * Russian and Azerbaijani, the same 25 the booking flow supports. Cards deliberately use the
 * booking locale set rather than the website's: adding a card language must not advertise
 * untranslated marketing pages through the website locale selector.
 *
 * The visitor's language is decided per request (see resolveCardLocale) from, in order: an
 * explicit ?lang=, the card-language cookie set by the card's own language menu, the website
 * language cookie, then the browser's Accept-Language, then English.
 *
 * This module has no runtime imports so the unit tests can load it directly. The type-only import
 * keeps it honest: `Record<CardLocale, ...>` below fails to compile if the booking set gains or
 * loses a language and this table does not.
 */
import type { BookingLocale } from '@/lib/booking/locales'

export type CardLocale = BookingLocale

const CARD_LOCALE_PROFILES: Record<CardLocale, { nativeName: string; dir: 'ltr' | 'rtl'; intlLocale: string }> = {
  en: { nativeName: 'English', dir: 'ltr', intlLocale: 'en-US' },
  ar: { nativeName: 'العربية', dir: 'rtl', intlLocale: 'ar-AE' },
  fr: { nativeName: 'Français', dir: 'ltr', intlLocale: 'fr-FR' },
  es: { nativeName: 'Español', dir: 'ltr', intlLocale: 'es-ES' },
  de: { nativeName: 'Deutsch', dir: 'ltr', intlLocale: 'de-DE' },
  nl: { nativeName: 'Nederlands', dir: 'ltr', intlLocale: 'nl-NL' },
  pt: { nativeName: 'Português', dir: 'ltr', intlLocale: 'pt-BR' },
  hi: { nativeName: 'हिन्दी', dir: 'ltr', intlLocale: 'hi-IN' },
  ur: { nativeName: 'اردو', dir: 'rtl', intlLocale: 'ur-PK' },
  it: { nativeName: 'Italiano', dir: 'ltr', intlLocale: 'it-IT' },
  pl: { nativeName: 'Polski', dir: 'ltr', intlLocale: 'pl-PL' },
  tr: { nativeName: 'Türkçe', dir: 'ltr', intlLocale: 'tr-TR' },
  'zh-Hans': { nativeName: '简体中文', dir: 'ltr', intlLocale: 'zh-Hans-CN' },
  ja: { nativeName: '日本語', dir: 'ltr', intlLocale: 'ja-JP' },
  ko: { nativeName: '한국어', dir: 'ltr', intlLocale: 'ko-KR' },
  id: { nativeName: 'Bahasa Indonesia', dir: 'ltr', intlLocale: 'id-ID' },
  vi: { nativeName: 'Tiếng Việt', dir: 'ltr', intlLocale: 'vi-VN' },
  ro: { nativeName: 'Română', dir: 'ltr', intlLocale: 'ro-RO' },
  sv: { nativeName: 'Svenska', dir: 'ltr', intlLocale: 'sv-SE' },
  bn: { nativeName: 'বাংলা', dir: 'ltr', intlLocale: 'bn-BD' },
  th: { nativeName: 'ไทย', dir: 'ltr', intlLocale: 'th-TH' },
  ms: { nativeName: 'Bahasa Melayu', dir: 'ltr', intlLocale: 'ms-MY' },
  pap: { nativeName: 'Papiamento', dir: 'ltr', intlLocale: 'pap' },
  az: { nativeName: 'Azərbaycanca', dir: 'ltr', intlLocale: 'az-AZ' },
  ru: { nativeName: 'Русский', dir: 'ltr', intlLocale: 'ru-RU' },
}

export const CARD_LOCALES = Object.keys(CARD_LOCALE_PROFILES) as CardLocale[]

/** Set only when a visitor picks a language on a card, so it never changes the rest of the site. */
export const CARD_LOCALE_COOKIE = 'sundae_card_locale'

/** The supported language a tag names ("ru-RU", "zh_CN", "in"), or null. */
export function matchCardLocale(value?: string | null): CardLocale | null {
  if (!value) return null
  const tag = value.trim().replaceAll('_', '-').toLowerCase()
  if (!tag) return null
  if (['zh', 'zh-cn', 'zh-sg'].includes(tag)) return 'zh-Hans'
  if (tag === 'in') return 'id'
  return (
    CARD_LOCALES.find((locale) => locale.toLowerCase() === tag || CARD_LOCALE_PROFILES[locale].intlLocale.toLowerCase() === tag) ??
    CARD_LOCALES.find((locale) => locale.toLowerCase() === tag.split('-')[0]) ??
    null
  )
}

export function normalizeCardLocale(value?: string | null): CardLocale {
  return matchCardLocale(value) ?? 'en'
}

/**
 * The first explicit choice naming a supported language wins; otherwise the browser's
 * Accept-Language is read in quality order; otherwise English. "en" is a real choice, so an
 * explicit English selection is not overridden by a browser that prefers another language.
 */
export function resolveCardLocale(candidates: Array<string | null | undefined>, acceptLanguage?: string | null): CardLocale {
  for (const value of candidates) {
    const match = matchCardLocale(value)
    if (match) return match
  }
  const ranked = (acceptLanguage ?? '')
    .split(',')
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().split(';')
      const quality = parameters.find((item) => item.trim().startsWith('q='))
      return { tag, quality: quality ? Number(quality.trim().slice(2)) : 1 }
    })
    .filter((item) => item.quality > 0)
    .sort((a, b) => b.quality - a.quality)
  for (const candidate of ranked) {
    const match = matchCardLocale(candidate.tag)
    if (match) return match
  }
  return 'en'
}

export function cardLocaleDirection(locale: CardLocale): 'ltr' | 'rtl' {
  return CARD_LOCALE_PROFILES[locale].dir
}

export function cardLocaleNativeName(locale: CardLocale): string {
  return CARD_LOCALE_PROFILES[locale].nativeName
}
