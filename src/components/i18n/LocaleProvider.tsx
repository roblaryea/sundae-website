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
  WEBSITE_LOCALE_COOKIE,
  getWebsiteMessages,
  normalizeWebsiteLocale,
  type WebsiteMessages,
  websiteLocaleDirection,
  type WebsiteLocale,
} from '@/lib/i18n'

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
    const dir = websiteLocaleDirection[locale]
    document.documentElement.lang = locale
    document.documentElement.dir = dir
    document.cookie = `${WEBSITE_LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`
    window.localStorage.setItem(WEBSITE_LOCALE_COOKIE, locale)
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (nextLocale) => setLocaleState(normalizeWebsiteLocale(nextLocale)),
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
