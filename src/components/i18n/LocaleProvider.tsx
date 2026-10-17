'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  getWebsiteMessages,
  normalizeWebsiteLocale,
  parseWebsiteLocaleFromPathname,
  persistWebsiteLocalePreference,
  type WebsiteMessages,
  websiteLocaleDirection,
  type WebsiteLocale,
} from '@/lib/i18n'
import { isProfileCardPath } from '@/lib/profileHandles'

type LocaleContextValue = {
  locale: WebsiteLocale
  setLocale: (locale: WebsiteLocale) => void
  messages: WebsiteMessages
  dir: 'ltr' | 'rtl'
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: WebsiteLocale
  children: ReactNode
}) {
  const [locale, setLocaleState] = useState<WebsiteLocale>(initialLocale)

  useEffect(() => {
    setLocaleState(initialLocale)
  }, [initialLocale])

  useEffect(() => {
    // Booking owns a wider locale catalogue and a state-preserving picker.
    // Do not overwrite its language/cookie with the marketing-only catalogue.
    if (/\/(?:book)(?:\/|$)/.test(window.location.pathname)) return
    // Profile cards do the same: the server sets <html lang/dir> from the card's own 25-language
    // choice, and a visitor's card language must never rewrite their website language cookie.
    if (isProfileCardPath(parseWebsiteLocaleFromPathname(window.location.pathname).pathname)) return
    const dir = websiteLocaleDirection[locale]
    document.documentElement.lang = locale
    document.documentElement.dir = dir
    persistWebsiteLocalePreference(locale)
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => {
        const normalized = normalizeWebsiteLocale(nextLocale)
        persistWebsiteLocalePreference(normalized)
        setLocaleState(normalized)
      },
      messages: getWebsiteMessages(locale),
      dir: websiteLocaleDirection[locale],
    }),
    [locale]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useWebsiteI18n() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useWebsiteI18n must be used within LocaleProvider')
  }
  return context
}
