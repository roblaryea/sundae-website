import { NextRequest, NextResponse } from 'next/server'
import {
  WEBSITE_LOCALE_COOKIE,
  WEBSITE_LOCALE_HEADER,
  WEBSITE_PUBLIC_PATH_HEADER,
  defaultWebsiteLocale,
  getLocalizedPathname,
  normalizeWebsiteLocale,
  parseWebsiteLocaleFromPathname,
} from '@/lib/i18n'

function withLocaleHeaders(request: NextRequest, locale: string, publicPathname: string) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set(WEBSITE_LOCALE_HEADER, locale)
  requestHeaders.set(WEBSITE_PUBLIC_PATH_HEADER, publicPathname)

  const cookieHeader = request.headers.get('cookie')
  const localeCookie = `${WEBSITE_LOCALE_COOKIE}=${locale}`
  const preservedCookies = cookieHeader
    ?.split(';')
    .map((cookie) => cookie.trim())
    .filter((cookie) => cookie && !cookie.startsWith(`${WEBSITE_LOCALE_COOKIE}=`))
  requestHeaders.set('cookie', [...(preservedCookies ?? []), localeCookie].join('; '))

  return requestHeaders
}

// Canonical marketing domain. The site is also reachable on sundaetech.ai
// (legacy/company domain); send those to the brand domain with a permanent
// redirect so there's one canonical host (no duplicate-content split).
const CANONICAL_HOST = 'www.sundae.io'
const REDIRECT_HOSTS = new Set(['sundaetech.ai', 'www.sundaetech.ai'])

export function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase().split(':')[0]
  if (host && REDIRECT_HOSTS.has(host)) {
    const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, `https://${CANONICAL_HOST}`)
    return NextResponse.redirect(target, 308)
  }

  const { pathname, search } = request.nextUrl
  const { locale: localeFromPath, pathname: internalPathname } = parseWebsiteLocaleFromPathname(pathname)
  const cookieLocale = normalizeWebsiteLocale(request.cookies.get(WEBSITE_LOCALE_COOKIE)?.value)

  if (localeFromPath === defaultWebsiteLocale) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = internalPathname
    return NextResponse.redirect(redirectUrl)
  }

  if (!localeFromPath && cookieLocale !== defaultWebsiteLocale) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = getLocalizedPathname(pathname, cookieLocale)
    return NextResponse.redirect(redirectUrl)
  }

  const locale = localeFromPath ?? defaultWebsiteLocale
  const publicPathname = localeFromPath ? pathname : internalPathname
  const requestHeaders = withLocaleHeaders(request, locale, publicPathname)

  const response = localeFromPath
    ? NextResponse.rewrite(new URL(`${internalPathname}${search}`, request.url), {
        request: { headers: requestHeaders },
      })
    : NextResponse.next({
        request: { headers: requestHeaders },
      })

  response.cookies.set(WEBSITE_LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
