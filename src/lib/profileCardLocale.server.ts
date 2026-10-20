import { cookies, headers } from 'next/headers'
import { WEBSITE_LOCALE_COOKIE, WEBSITE_LOCALE_HEADER } from '@/lib/i18n'
import { CARD_LOCALE_COOKIE, normalizeCardLocale, resolveCardLocale, type CardLocale } from './profileCardLocale'

/**
 * The language a profile card is shown in for this request. The proxy decides it (explicit
 * ?lang=, the card-language cookie, the website language cookie, then Accept-Language) and passes
 * it in the locale header; if that header is somehow absent the same rules run here.
 */
export async function getCardLocale(): Promise<CardLocale> {
  const headerStore = await headers()
  const fromProxy = headerStore.get(WEBSITE_LOCALE_HEADER)
  if (fromProxy) return normalizeCardLocale(fromProxy)
  const cookieStore = await cookies()
  return resolveCardLocale(
    [cookieStore.get(CARD_LOCALE_COOKIE)?.value, cookieStore.get(WEBSITE_LOCALE_COOKIE)?.value],
    headerStore.get('accept-language'),
  )
}

/**
 * The visitor's country as reported by the hosting platform (`x-vercel-ip-country`, an ISO 3166-1
 * alpha-2 code), or null. Only a starting point for the phone country selector; values such as "XX"
 * or "T1" are rejected by the caller. Never used to store anything about the visitor.
 */
export async function getVisitorCountryHeader(): Promise<string | null> {
  return (await headers()).get('x-vercel-ip-country')
}
