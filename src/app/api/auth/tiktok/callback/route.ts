import { NextRequest, NextResponse } from 'next/server'
import {
  exchangeCodeForSession,
  sealTikTokSession,
  statesMatch,
  TIKTOK_NEXT_COOKIE,
  TIKTOK_SESSION_COOKIE,
  TIKTOK_STATE_COOKIE,
} from '@/lib/tiktok'

export const dynamic = 'force-dynamic'

const ADMIN_OAUTH_RELAY_BASE = process.env.ADMIN_OAUTH_RELAY_BASE || 'https://dev.sundaetech.ai'

export async function GET(request: NextRequest) {
  const expectedState = request.cookies.get(TIKTOK_STATE_COOKIE)?.value
  const nextPath = sanitizeNextPath(request.cookies.get(TIKTOK_NEXT_COOKIE)?.value)
  const state = request.nextUrl.searchParams.get('state')

  const finish = (params: Record<string, string>) => {
    const response = NextResponse.redirect(buildReturnUrl(request, nextPath, params))
    response.cookies.set(TIKTOK_STATE_COOKIE, '', buildCookieOptions(request, 0))
    response.cookies.set(TIKTOK_NEXT_COOKIE, '', buildCookieOptions(request, 0))
    return response
  }

  const error = request.nextUrl.searchParams.get('error')
  const errorDescription = request.nextUrl.searchParams.get('error_description')
  if (error) {
    if (state && !statesMatch(expectedState, state)) {
      return NextResponse.redirect(buildAdminRelayUrl(request, 'tiktok'))
    }

    return finish({
      auth: 'error',
      error: errorDescription || error,
    })
  }

  if (!statesMatch(expectedState, state)) {
    if (state) {
      return NextResponse.redirect(buildAdminRelayUrl(request, 'tiktok'))
    }

    return finish({
      auth: 'error',
      error: 'TikTok authorization state did not match. Please try again.',
    })
  }

  const code = request.nextUrl.searchParams.get('code')
  if (!code) {
    return finish({
      auth: 'error',
      error: 'TikTok did not return an authorization code.',
    })
  }

  try {
    const session = await exchangeCodeForSession(code)
    const response = finish({ auth: 'connected' })
    response.cookies.set(TIKTOK_SESSION_COOKIE, sealTikTokSession(session), buildCookieOptions(request, 60 * 60 * 24 * 7))
    return response
  } catch (err) {
    return finish({
      auth: 'error',
      error: err instanceof Error ? err.message : 'TikTok authorization failed.',
    })
  }
}

function sanitizeNextPath(value?: string | null) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/tiktok-review'
  return value
}

function buildReturnUrl(request: NextRequest, nextPath: string, params: Record<string, string>) {
  const url = new URL(nextPath, request.nextUrl.origin)
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value)
  }
  return url
}

function buildAdminRelayUrl(request: NextRequest, provider: 'tiktok') {
  const url = new URL(`/api/auth/${provider}/callback`, ADMIN_OAUTH_RELAY_BASE)
  for (const key of ['code', 'state', 'error', 'error_description']) {
    const value = request.nextUrl.searchParams.get(key)
    if (value) url.searchParams.set(key, value)
  }
  return url
}

function buildCookieOptions(request: NextRequest, maxAge: number) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: request.nextUrl.protocol === 'https:',
    path: '/',
    maxAge,
  }
}
