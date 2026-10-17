import { resolveCardLocale } from '@/lib/profileCardLocale'
import { PROFILE_AVATAR_PNG_BASE64 } from '@/lib/profileAvatar'
import { cityName, countryName, roleTitle } from '@/lib/profileCatalogue'
import { PROFILE_HANDLES } from '@/lib/profileHandles'
import { getProfile } from '@/lib/profiles'
import { buildVCard, vCardFilename } from '@/lib/vcard'

/**
 * Downloadable contact file for a profile card (sundae.io/<handle>/contact.vcf).
 * Served inline with a vCard content type, which makes iOS and macOS offer "Add
 * Contact" directly and makes Android and desktop browsers hand the file to the
 * contacts app. Content comes only from the typed profile registry. The optional
 * ?lang= parameter is normalized against the supported locales and only selects the
 * language of the job title and place names; it never reaches the file as text.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return PROFILE_HANDLES.map((handle) => ({ handle }))
}

export async function GET(request: Request, { params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  const profile = getProfile(handle)
  if (!profile) return new Response('Not found', { status: 404 })

  // ?lang= is what the page's Save contact link sends; a direct hit falls back to the browser language.
  const lang = new URL(request.url).searchParams.get('lang')
  const locale = resolveCardLocale([lang], request.headers.get('accept-language'))

  const body = buildVCard(profile, {
    title: roleTitle(profile.roleKey, profile.titleForm, locale),
    city: cityName(profile.cityKey, locale),
    country: countryName(profile.cityKey, locale),
    photoPngBase64: PROFILE_AVATAR_PNG_BASE64,
  })
  // With ?lang= the URL itself identifies the language, so shared caching is safe. Without it the
  // language comes from the Accept-Language header, which a shared cache may not key on, so that
  // response is private and always revalidated.
  const explicitLanguage = lang !== null && lang !== ''
  return new Response(body, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': `inline; filename="${vCardFilename(profile)}"`,
      'Cache-Control': explicitLanguage
        ? 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
        : 'private, max-age=0, must-revalidate',
      Vary: 'Accept-Language',
      'X-Robots-Tag': 'noindex, nofollow',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
