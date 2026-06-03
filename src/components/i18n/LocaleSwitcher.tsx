'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  getLocalizedPathname,
  persistWebsiteLocalePreference,
  websiteLocaleDirection,
  websiteLocaleNames,
  websiteLocales,
  type WebsiteLocale,
} from '@/lib/i18n'
import { useWebsiteI18n } from './LocaleProvider'

/**
 * Compact, length-invariant language switcher.
 *
 * The trigger shows a globe + the 2-letter base code (EN, FR, ZH…) so its width
 * is identical in every locale — this is what keeps the navbar from overflowing
 * when a language has long labels (e.g. fr "Réserver une session de travail").
 * Full native names + language code (e.g. "Deutsch · DE") stay in the dropdown
 * for clarity and quick scanning. No country flags — flags map to countries,
 * not languages, and our locales (ar, es, en, pt-BR, zh-Hans…) span many.
 *
 * Accessibility: a real <select> is layered transparently over the visual chip so
 * we keep the native, keyboard-operable dropdown and screen-reader semantics — the
 * chip is purely presentational (aria-hidden).
 */
function localeShortCode(locale: WebsiteLocale): string {
  return locale.split('-')[0].toUpperCase()
}

export function LocaleSwitcher() {
  const { locale, setLocale, messages } = useWebsiteI18n()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <label className="relative inline-flex items-center">
      <span className="sr-only">{messages.layout.languageSelector}</span>

      {/* Presentational compact chip — width is constant across all locales */}
      <span
        aria-hidden
        className="pointer-events-none inline-flex items-center gap-1.5 rounded-md border border-[var(--border-default)] bg-transparent px-2 py-1 text-xs font-medium text-[var(--text-secondary)] transition-colors"
      >
        <svg
          className="h-3.5 w-3.5 opacity-80"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
        </svg>
        <span className="tabular-nums tracking-wide">{localeShortCode(locale)}</span>
        <svg className="h-3 w-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>

      <select
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as WebsiteLocale
          if (nextLocale === locale) return

          const nextPathname = getLocalizedPathname(pathname, nextLocale)
          const search = searchParams.toString()
          const nextUrl = search ? `${nextPathname}?${search}` : nextPathname

          setLocale(nextLocale)
          document.documentElement.lang = nextLocale
          document.documentElement.dir = websiteLocaleDirection[nextLocale]
          persistWebsiteLocalePreference(nextLocale)
          router.push(nextUrl)
          router.refresh()
        }}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label={messages.layout.languageSelector}
      >
        {websiteLocales.map((item) => (
          <option key={item} value={item} className="text-slate-900">
            {`${websiteLocaleNames[item]} · ${localeShortCode(item)}`}
          </option>
        ))}
      </select>
    </label>
  )
}
