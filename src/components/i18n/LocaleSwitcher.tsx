'use client'

import { websiteLocaleNames, websiteLocales, type WebsiteLocale } from '@/lib/i18n'
import { useWebsiteI18n } from './LocaleProvider'
import { WEBSITE_LOCALE_COOKIE, websiteLocaleDirection } from '@/lib/i18n'

export function LocaleSwitcher() {
  const { locale, setLocale, messages } = useWebsiteI18n()

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">{messages.layout.languageSelector}</span>
      <select
        value={locale}
        onChange={(event) => {
          const nextLocale = event.target.value as WebsiteLocale
          if (nextLocale === locale) return
          setLocale(nextLocale)
          document.documentElement.lang = nextLocale
          document.documentElement.dir = websiteLocaleDirection[nextLocale]
          document.cookie = `${WEBSITE_LOCALE_COOKIE}=${nextLocale}; path=/; max-age=31536000; samesite=lax`
          window.localStorage.setItem(WEBSITE_LOCALE_COOKIE, nextLocale)
          window.location.reload()
        }}
        className="rounded-md border border-[var(--border-default)] bg-transparent px-2 py-1 text-xs text-[var(--text-secondary)] outline-none transition-colors hover:text-[var(--text-primary)]"
        aria-label={messages.layout.languageSelector}
      >
        {websiteLocales.map((item) => (
          <option key={item} value={item} className="text-slate-900">
            {websiteLocaleNames[item]}
          </option>
        ))}
      </select>
    </label>
  )
}
