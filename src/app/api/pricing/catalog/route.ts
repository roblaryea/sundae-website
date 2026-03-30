import { NextResponse } from 'next/server'
import { APP_URL } from '@/lib/urls'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const NO_CACHE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
  Pragma: 'no-cache',
}

export async function GET() {
  try {
    const response = await fetch(`${APP_URL}/api/pricing/catalog/active`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: 'Failed to fetch active pricing catalog',
      }))
      return NextResponse.json(error, { status: response.status, headers: NO_CACHE_HEADERS })
    }

    const data = await response.json()
    return NextResponse.json(data, { headers: NO_CACHE_HEADERS })
  } catch (error) {
    console.error('[WebsitePricingCatalog] Failed to proxy active catalog:', error)
    return NextResponse.json(
      { error: 'Failed to fetch active pricing catalog' },
      { status: 503, headers: NO_CACHE_HEADERS }
    )
  }
}
