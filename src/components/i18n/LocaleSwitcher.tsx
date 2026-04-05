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

export function LocaleSwitcher() {
  const { locale, setLocale, messages } = useWebsiteI18n()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  return (
    <label className="inline-flex items-center">
      <span className="sr-only">{messages.layout.languageSelector}</span>
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
