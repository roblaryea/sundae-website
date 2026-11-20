import { NextRequest, NextResponse } from 'next/server'
import { resolveBookingLocale } from '@/lib/booking/locales'
import {
  WEBSITE_LOCALE_COOKIE,
  WEBSITE_LOCALE_HEADER,
  WEBSITE_PUBLIC_PATH_HEADER,
  defaultWebsiteLocale,
  getLocalizedPathname,
  normalizeWebsiteLocale,
  parseWebsiteLocaleFromPathname,
} from '@/lib/i18n'
import { isProfileCardPath, isProfileHandle, isProfileHandleCandidate } from '@/lib/profileHandles'
import { CARD_LOCALE_COOKIE, resolveCardLocale } from '@/lib/profileCardLocale'
import { getLegacyMarketingDestination } from '@/lib/legacyMarketingRedirects'
import { legacyPricingRedirect } from '@/lib/legacyPricingRedirect'
import { PRICING_URL } from '@/lib/urls'
import {
  getBlogEvidenceReviewRedirect,
} from '@/lib/blogEvidence'

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

export async function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase().split(':')[0]
  if (host && REDIRECT_HOSTS.has(host)) {
    const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, `https://${CANONICAL_HOST}`)
    return NextResponse.redirect(target, 308)
  }

  const { pathname, search } = request.nextUrl
  const { locale: localeFromPath, pathname: internalPathname } = parseWebsiteLocaleFromPathname(pathname)

  // The calculator is the pricing authority in every marketing language.
  // English aliases are handled by next.config; localized aliases reach here.
  const pricingDestination = legacyPricingRedirect(internalPathname, localeFromPath, search, PRICING_URL)
  if (pricingDestination) return NextResponse.redirect(pricingDestination, 308)

  // Retired module-shopping entry: preserve locale/query and land on package coverage.
  if (internalPathname.replace(/\/$/, '') === '/modules') {
    const target = request.nextUrl.clone()
    target.pathname = getLocalizedPathname('/core', localeFromPath ?? defaultWebsiteLocale)
    target.hash = 'packages'
    return NextResponse.redirect(target, 308)
  }

  // next.config handles the English aliases before the proxy. Apply the same
  // explicit successor mapping after stripping a locale, preserving language
  // and query parameters instead of rewriting an obsolete route to a 404.
  const legacyDestination = getLegacyMarketingDestination(internalPathname)
  if (legacyDestination) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = getLocalizedPathname(legacyDestination, localeFromPath ?? defaultWebsiteLocale)
    return NextResponse.redirect(redirectUrl, 308)
  }

  const blogSlug = internalPathname.match(/^\/blog\/([^/]+)\/?$/)?.[1]
  const evidenceRedirect = blogSlug ? getBlogEvidenceReviewRedirect(blogSlug) : null
  if (evidenceRedirect) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = getLocalizedPathname(
      evidenceRedirect,
      localeFromPath ?? defaultWebsiteLocale,
    )
    return NextResponse.redirect(redirectUrl, 308)
  }

  // Profile card handles are lowercase, but phone keyboards capitalise the first letter
  // when someone types sundae.io/Robert. Send any casing to the canonical lowercase path.
  const firstSegment = internalPathname.split('/')[1]
  if (firstSegment && firstSegment !== firstSegment.toLowerCase() && isProfileHandleCandidate(firstSegment.toLowerCase())) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = pathname.replace(`/${firstSegment}`, `/${firstSegment.toLowerCase()}`)
    return NextResponse.redirect(redirectUrl, 308)
  }
  // Public booking supports additional languages without exposing partially
  // translated marketing pages. Keep personal/manage URLs and credentials intact.
  if (internalPathname === '/book' || internalPathname.startsWith('/book/')) {
    const locale = resolveBookingLocale(request.nextUrl.searchParams.get('locale') || localeFromPath ||
      request.cookies.get(WEBSITE_LOCALE_COOKIE)?.value, request.headers.get('accept-language'))
    const requestHeaders = withLocaleHeaders(request, locale, pathname)
    const response = localeFromPath
      ? NextResponse.rewrite(new URL(`${internalPathname}${search}`, request.url), { request: { headers: requestHeaders } })
      : NextResponse.next({ request: { headers: requestHeaders } })
    response.cookies.set(WEBSITE_LOCALE_COOKIE, locale, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
    response.headers.set('Referrer-Policy', 'no-referrer')
    response.headers.set('Cache-Control', 'no-store')
    return response
  }
  const cookieLocale = normalizeWebsiteLocale(request.cookies.get(WEBSITE_LOCALE_COOKIE)?.value)

  // /p/... is the internal home of profile cards (see rewrites in next.config.ts). The
  // public URL is /<handle>; send direct hits there so /p/<anything> never serves a page.
  if (internalPathname === '/p' || internalPathname.startsWith('/p/')) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = pathname.replace(/\/p(?=\/|$)/, '') || '/'
    return NextResponse.redirect(redirectUrl, 308)
  }

  if (localeFromPath === defaultWebsiteLocale) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = internalPathname
    return NextResponse.redirect(redirectUrl)
  }

  // Two-letter paths are neither supported marketing locales nor valid profile handles.
  // Return the actual not-found status before the dynamic route can start streaming.
  if (!localeFromPath && /^\/[a-z]{2}\/?$/i.test(pathname)) {
    const response = NextResponse.rewrite(new URL('/404', request.url), { status: 404 })
    response.headers.set('Cache-Control', 'no-store')
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  // Resolve unknown root handles before streaming begins, so an absent card has
  // a real 404 status. Static marketing routes are excluded by the candidate guard.
  if (isProfileCardPath(internalPathname) && internalPathname.split('/').filter(Boolean).length === 1 && !isProfileHandle(firstSegment.toLowerCase())) {
    const base = (process.env.SUNDAE_BACKEND_URL || 'https://api.sundaetech.ai').replace(/\/$/, '')
    try {
      const lookup = await fetch(`${base}/api/v1/public/team-profiles/${encodeURIComponent(firstSegment.toLowerCase())}`, { signal: AbortSignal.timeout(2500) })
      if (lookup.status === 404) {
        const response = NextResponse.rewrite(new URL('/404', request.url), { status: 404 })
        response.headers.set('Cache-Control', 'no-store')
        response.headers.set('X-Robots-Tag', 'noindex, nofollow')
        return response
      }
    } catch {
      // The page's authoritative lookup reports an outage, never a false 404.
    }
  }

  // Profile cards are shown in 25 languages (the website's 22 plus Papiamento, Russian and
  // Azerbaijani). Decide the visitor's language here and hand it to the page, without redirecting
  // to a localized path and without touching the website language cookie. Order: explicit
  // ?lang=, the card-language cookie, a path locale, the website language cookie, then the
  // browser's Accept-Language.
  if (isProfileCardPath(internalPathname)) {
    const explicit = request.nextUrl.searchParams.get('lang')
    const cardLocale = resolveCardLocale(
      [
        explicit,
        request.cookies.get(CARD_LOCALE_COOKIE)?.value,
        localeFromPath,
        request.cookies.get(WEBSITE_LOCALE_COOKIE)?.value,
      ],
      request.headers.get('accept-language'),
    )
    const cardHeaders = new Headers(request.headers)
    cardHeaders.set(WEBSITE_LOCALE_HEADER, cardLocale)
    cardHeaders.set(WEBSITE_PUBLIC_PATH_HEADER, localeFromPath ? pathname : internalPathname)
    const cardResponse = localeFromPath
      ? NextResponse.rewrite(new URL(`${internalPathname}${search}`, request.url), { request: { headers: cardHeaders } })
      : NextResponse.next({ request: { headers: cardHeaders } })
    // An explicit ?lang= is a choice: remember it for this card experience only.
    if (explicit) {
      cardResponse.cookies.set(CARD_LOCALE_COOKIE, cardLocale, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' })
    }
    cardResponse.headers.append('Vary', 'Accept-Language, Cookie')
    return cardResponse
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
