import type { Metadata, Viewport } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { profileCountryCode, profileLocation, profileRole } from '@/lib/profileCatalogue'
import { getProfileCardCopy } from '@/lib/profileCardCopy'
import { CARD_LOCALES, cardLocaleNativeName } from '@/lib/profileCardLocale'
import { getCardLocale, getVisitorCountryHeader } from '@/lib/profileCardLocale.server'
import { isLeadFormEnabled } from '@/lib/profileFeatures'
import { PROFILE_HANDLES } from '@/lib/profileHandles'
import { resolveDefaultPhoneCountry } from '@/lib/profilePhoneInput'
import { profilePhoto } from '@/lib/profilePhotos'
import { displayHost, getProfile, isProfileActive, linkedinHandle, profileFullName } from '@/lib/profiles'
import { DEMO_URL } from '@/lib/urls'
import { ProfileActions } from './ProfileActions'
import { ProfileArt } from './ProfileArt'
import { InactiveCard } from './InactiveCard'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ShareSheet } from './ShareSheet'
import { ThemeToggle } from './ThemeToggle'
import './profile-card.css'

/**
 * Profile card: the page behind the QR code on a Sundae business card
 * (sundae.io/<handle>, rewritten here from next.config.ts). One job: put the right person into the visitor's contacts in a
 * single tap, with no account. Unknown handles 404.
 */
export const dynamicParams = true
export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return PROFILE_HANDLES.map((handle) => ({ handle }))
}

type PageProps = { params: Promise<{ handle: string }> }

/** The card opens light (the espresso hero keeps it branded), so browser chrome matches paper. */
export const viewport: Viewport = {
  themeColor: '#FBF8F4',
}

/** Applies a stored light/dark choice before first paint, so a returning visitor sees no flash. */
const THEME_BOOT = "try{var t=localStorage.getItem('sundae-card-theme');if(t==='light'||t==='dark'){document.currentScript.parentElement.setAttribute('data-theme',t)}}catch(e){}"


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params
  const profile = await getProfile(handle)
  if (!profile) return {}
  if (!isProfileActive(profile)) {
    // A retired card shows no personal details, so neither does its preview.
    return { title: 'Sundae', robots: { index: false, follow: false } }
  }
  const locale = await getCardLocale()
  const copy = getProfileCardCopy(locale)
  const name = profileFullName(profile)
  const role = profileRole(profile, locale)
  const description = `${name} · ${role} · Sundae · ${copy.saveContact}`
  return {
    title: `${name} · ${profile.company}`,
    description,
    // Personal contact details: reachable by link and QR, not indexed.
    robots: { index: false, follow: false },
    openGraph: {
      title: `${name} · Sundae`,
      description,
      images: profile.handle === 'robert' ? [{ url: '/profile/robert-og.png', width: 1200, height: 630, alt: `${name}, ${role}` }] : [],
    },
    twitter: { card: 'summary_large_image', title: `${name} · Sundae`, description, images: profile.handle === 'robert' ? ['/profile/robert-og.png'] : [] },
  }
}

export default async function ProfilePage({ params }: PageProps) {
  const { handle } = await params
  const profile = await getProfile(handle)
  if (!profile) notFound()

  const locale = await getCardLocale()
  const copy = getProfileCardCopy(locale)
  if (!isProfileActive(profile)) return <InactiveCard copy={copy} />
  const name = profileFullName(profile)
  const role = profileRole(profile, locale)
  const location = profileLocation(profile, locale)
  // Always explicit, English included, so the file's language never depends on request headers.
  const vcardHref = `/${profile.handle}/contact.vcf?lang=${encodeURIComponent(locale)}`
  // The owner's own booking page (their availability, in the visitor's language); the general demo page only when they have none.
  const bookHref = profile.bookingSlug ? `/book/${encodeURIComponent(profile.bookingSlug)}?locale=${encodeURIComponent(locale)}` : DEMO_URL
  const photo = profilePhoto(profile.handle)
  const languageOptions = CARD_LOCALES.map((code) => ({ value: code, label: cardLocaleNativeName(code) }))
  // Where the phone country selector starts: the visitor's country, else the card language's, else the owner's.
  const exchange = isLeadFormEnabled()
    ? {
        ownerFirstName: profile.givenName,
        ownerEmail: profile.email,
        locale,
        phoneCountry: resolveDefaultPhoneCountry({ ipCountry: await getVisitorCountryHeader(), locale, ownerCountry: profileCountryCode(profile) }),
      }
    : undefined
  const rise = (delay: number) => ({ '--pc-delay': `${delay}ms` }) as React.CSSProperties

  return (
    <div className="pc-root" suppressHydrationWarning>
      <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      <div className="pc-shell">
        <aside className="pc-hero" aria-hidden="true">
          <div className="pc-glow" />
          <ProfileArt className="pc-art" />
        </aside>

        <div className="pc-content">
          <header className="pc-header">
            <Link href="/" aria-label="Sundae" className="inline-flex min-h-[44px] items-center">
              <Image src="/logos/sundae-wordmark-card-cream.svg" alt="Sundae" width={112} height={34} unoptimized priority className="pc-wm-cream h-[34px] w-auto" />
              <Image src="/logos/sundae-wordmark-card-ink.svg" alt="" width={112} height={34} unoptimized priority className="pc-wm-ink h-[34px] w-auto" />
            </Link>
            <div className="flex items-center gap-2">
              <LanguageSwitcher handle={profile.handle} label={copy.language} value={locale} options={languageOptions} />
              <ThemeToggle handle={profile.handle} label={copy.themeToggle} />
              <ShareSheet handle={profile.handle} name={name} copy={copy} />
            </div>
          </header>

          <main className="pc-main">
            {photo && (
              <Image src={photo.src} alt={name} width={photo.width} height={photo.height} sizes="(min-width: 1024px) 184px, 148px" priority className="pc-photo pc-rise" style={rise(0)} />
            )}
            <p className="pc-eyebrow pc-rise" style={rise(40)}>{copy.eyebrow}</p>
            <h1 className="pc-name pc-rise mt-3" style={rise(100)}>{name}</h1>
            <div className="pc-rise mt-3" style={rise(160)}>
              <p className="pc-role"><bdi>{role}</bdi></p>
              <p className="pc-line1 mt-2"><bdi>{profile.company}</bdi></p>
              <p className="pc-line2"><bdi>{location}</bdi></p>
              <p className="pc-tagline">{copy.tagline}</p>
            </div>

            <div className="pc-rise mt-8" style={rise(240)}>
              <ProfileActions
                handle={profile.handle}
                vcardHref={vcardHref}
                bookHref={bookHref}
                copy={copy}
                phone={profile.phone}
                phoneDisplay={profile.phoneDisplay}
                email={profile.email}
                linkedinUrl={profile.linkedin}
                linkedinHandle={profile.linkedin ? linkedinHandle(profile.linkedin) : undefined}
                websiteUrl={profile.website}
                websiteDisplay={displayHost(profile.website)}
                exchange={exchange}
              />
            </div>
          </main>

          <footer className="pc-muted flex flex-wrap items-center justify-between gap-x-6 gap-y-1 pt-2 text-[12px]">
            <bdi>{profile.company}</bdi>
            <nav aria-label={`${copy.privacy}, ${copy.terms}`} className="flex items-center gap-1">
              <Link href="/privacy" className="inline-flex min-h-[44px] items-center px-2">{copy.privacy}</Link>
              <Link href="/terms" className="inline-flex min-h-[44px] items-center px-2">{copy.terms}</Link>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  )
}
