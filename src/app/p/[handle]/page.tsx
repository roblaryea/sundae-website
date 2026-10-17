import type { Metadata, Viewport } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { locationText, roleTitle } from '@/lib/profileCatalogue'
import { getProfileCardCopy } from '@/lib/profileCardCopy'
import { CARD_LOCALES, cardLocaleNativeName } from '@/lib/profileCardLocale'
import { getCardLocale } from '@/lib/profileCardLocale.server'
import { isLeadFormEnabled } from '@/lib/profileFeatures'
import { PROFILE_HANDLES } from '@/lib/profileHandles'
import { displayHost, getProfile, linkedinHandle, profileFullName } from '@/lib/profiles'
import { DEMO_URL } from '@/lib/urls'
import { ProfileActions } from './ProfileActions'
import { ProfileArt } from './ProfileArt'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ShareButton } from './ShareButton'
import { ShowQr } from './ShowQr'
import { ThemeToggle } from './ThemeToggle'
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

/** Browser chrome follows the visitor's system theme, matching the card's own default. */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FBF8F4' },
    { media: '(prefers-color-scheme: dark)', color: '#171210' },
  ],
}

/** Applies a stored light/dark choice before first paint, so a returning visitor sees no flash. */
const THEME_BOOT = "try{var t=localStorage.getItem('sundae-card-theme');if(t==='light'||t==='dark'){document.currentScript.parentElement.setAttribute('data-theme',t)}}catch(e){}"


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params
  const profile = getProfile(handle)
  if (!profile) return {}
  const locale = await getCardLocale()
  const copy = getProfileCardCopy(locale)
  const name = profileFullName(profile)
  const role = roleTitle(profile.roleKey, profile.titleForm, locale)
  const description = `${name} · ${role} · Sundae · ${copy.saveContact}`
  return {
    title: `${name} · ${profile.company}`,
    description,
    // Personal contact details: reachable by link and QR, not indexed.
    robots: { index: false, follow: false },
    openGraph: {
      title: `${name} · Sundae`,
      description,
      images: [{ url: `/profile/${profile.handle}-og.png`, width: 1200, height: 630, alt: `${name}, ${role}` }],
    },
    twitter: { card: 'summary_large_image', title: `${name} · Sundae`, description, images: [`/profile/${profile.handle}-og.png`] },
  }
}

export default async function ProfilePage({ params }: PageProps) {
  const { handle } = await params
  const profile = getProfile(handle)
  if (!profile) notFound()

  const locale = await getCardLocale()
  const copy = getProfileCardCopy(locale)
  const name = profileFullName(profile)
  const role = roleTitle(profile.roleKey, profile.titleForm, locale)
  const location = locationText(profile.cityKey, locale)
  const vcardHref = `/${profile.handle}/contact.vcf${locale === 'en' ? '' : `?lang=${encodeURIComponent(locale)}`}`
  const languageOptions = CARD_LOCALES.map((code) => ({ value: code, label: cardLocaleNativeName(code) }))
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
              <ShowQr handle={profile.handle} showLabel={copy.showQr} title={copy.qrTitle} closeLabel={copy.close} />
              <ThemeToggle handle={profile.handle} label={copy.themeToggle} />
              <ShareButton handle={profile.handle} title={name} shareLabel={copy.share} copiedLabel={copy.linkCopied} />
            </div>
          </header>

          <main className="pc-main">
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
                {isLeadFormEnabled() && (
                  <ShareDetails handle={profile.handle} ownerFirstName={profile.givenName} ownerEmail={profile.email} locale={locale} copy={copy} />
                )}
              </ProfileActions>
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
