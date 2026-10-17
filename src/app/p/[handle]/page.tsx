import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { getLocalizedCopy, resolveWebsiteLocale } from '@/lib/i18n'
import { locationText, roleTitle } from '@/lib/profileCatalogue'
import { profileCardCopy } from '@/lib/profileCardCopy'
import { PROFILE_HANDLES } from '@/lib/profileHandles'
import { displayHost, getProfile, linkedinHandle, profileFullName } from '@/lib/profiles'
import { DEMO_URL } from '@/lib/urls'
import { ProfileActions } from './ProfileActions'
import { ProfileArt } from './ProfileArt'
import { ShareButton } from './ShareButton'
import { ShareDetails } from './ShareDetails'
import './profile-card.css'

/**
 * Profile card: the page behind the QR code on a Sundae business card
 * (sundae.io/<handle>, rewritten here from next.config.ts). One job: put the right person into the visitor's contacts in a
 * single tap, with no account. Unknown handles 404.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return PROFILE_HANDLES.map((handle) => ({ handle }))
}

type PageProps = { params: Promise<{ handle: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params
  const profile = getProfile(handle)
  if (!profile) return {}
  const locale = resolveWebsiteLocale(await cookies())
  const copy = getLocalizedCopy(profileCardCopy, locale)
  const name = profileFullName(profile)
  const role = roleTitle(profile.roleKey, profile.titleForm, locale)
  const description = `${name} · ${role} · Sundae · ${copy.saveContact}`
  return {
    title: `${name} · ${profile.company}`,
    description,
    // Personal contact details: reachable by link and QR, not indexed.
    robots: { index: false, follow: false },
    openGraph: { title: `${name} · Sundae`, description },
  }
}

export default async function ProfilePage({ params }: PageProps) {
  const { handle } = await params
  const profile = getProfile(handle)
  if (!profile) notFound()

  const locale = resolveWebsiteLocale(await cookies())
  const copy = getLocalizedCopy(profileCardCopy, locale)
  const name = profileFullName(profile)
  const role = roleTitle(profile.roleKey, profile.titleForm, locale)
  const location = locationText(profile.cityKey, locale)
  const vcardHref = `/${profile.handle}/contact.vcf${locale === 'en' ? '' : `?lang=${encodeURIComponent(locale)}`}`

  return (
    <div className="pc-root relative isolate min-h-[100dvh] overflow-hidden bg-[#171210] text-[#FBF8F4]">
      <div className="pc-glow absolute inset-0 -z-10" aria-hidden="true" />
      <ProfileArt className="pc-art" />
      <div className="pc-fade" aria-hidden="true" />

      <div
        className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-[1180px] flex-col px-6 sm:px-10 lg:px-16"
        style={{
          paddingTop: 'max(1.5rem, env(safe-area-inset-top))',
          paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        }}
      >
        <header className="flex items-center justify-between">
          <Link href="/" aria-label="Sundae" className="inline-flex min-h-[44px] items-center">
            <Image
              src="/logos/sundae-wordmark-card-cream.svg"
              alt="Sundae"
              width={112}
              height={34}
              unoptimized
              priority
              className="h-[34px] w-auto"
            />
          </Link>
          <ShareButton handle={profile.handle} title={name} shareLabel={copy.share} copiedLabel={copy.linkCopied} />
        </header>

        <main className="my-auto w-full max-w-[460px] pb-10 pt-[min(41vh,340px)] lg:pt-10">
          <p className="pc-rise text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FF5C4D]" style={{ '--pc-delay': '40ms' } as React.CSSProperties}>
            {copy.eyebrow}
          </p>
          <h1 className="pc-name pc-rise mt-3 text-[clamp(2.6rem,10vw,3.75rem)]" style={{ '--pc-delay': '100ms' } as React.CSSProperties}>
            {name}
          </h1>
          <div className="pc-rise mt-3" style={{ '--pc-delay': '160ms' } as React.CSSProperties}>
            <p className="text-[18px] font-semibold text-[#FF5C4D]"><bdi>{role}</bdi></p>
            <p className="mt-2 text-[15px] leading-snug text-[#FBF8F4]/90"><bdi>{profile.company}</bdi></p>
            <p className="mt-0.5 text-[15px] leading-snug text-[#D8CBBD]">
              <bdi>{location}</bdi>
            </p>
            <p className="mt-4 max-w-[30ch] text-balance text-[14px] leading-snug text-[#9A8B7C]">{copy.tagline}</p>
          </div>

          <div className="pc-rise mt-8" style={{ '--pc-delay': '240ms' } as React.CSSProperties}>
            <ProfileActions
              handle={profile.handle}
              vcardHref={vcardHref}
              bookHref={DEMO_URL}
              copy={copy}
              phone={profile.phone}
              phoneDisplay={profile.phoneDisplay}
              email={profile.email}
              linkedinUrl={profile.linkedin}
              linkedinHandle={profile.linkedin ? linkedinHandle(profile.linkedin) : undefined}
              websiteUrl={profile.website}
              websiteDisplay={displayHost(profile.website)}
            >
              <ShareDetails
                handle={profile.handle}
                ownerFirstName={profile.givenName}
                ownerEmail={profile.email}
                locale={locale}
                copy={copy}
              />
            </ProfileActions>
          </div>
        </main>

        <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 pt-4 text-[12px] text-[#9A8B7C]">
          <bdi>{profile.company}</bdi>
          <nav aria-label={`${copy.privacy}, ${copy.terms}`} className="flex items-center gap-1">
            <Link href="/privacy" className="inline-flex min-h-[44px] items-center px-2 hover:text-[#FBF8F4]">
              {copy.privacy}
            </Link>
            <Link href="/terms" className="inline-flex min-h-[44px] items-center px-2 hover:text-[#FBF8F4]">
              {copy.terms}
            </Link>
          </nav>
        </footer>
      </div>
    </div>
  )
}
