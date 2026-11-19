import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { resolveWebsiteLocale, getWebsiteMessages, getLocalizedPathname } from '@/lib/i18n'
import { buildResolvedPageMetadata } from '@/lib/solutionPageMetadata'
import { getWalkthroughSchema, productWalkthroughs, PRODUCT_WALKTHROUGHS_PATH } from '@/lib/productWalkthroughs'
import { WalkthroughPlayer } from '@/components/resources/WalkthroughPlayer'
import { OperatingCTA } from '@/components/product/OperatingCTA'
import { Button } from '@/components/ui/Button'
import openingCopy from '@/content/operator-openings.json'
import videoCopy from '@/content/product-walkthroughs.json'
import { getCommercialCopy } from '@/lib/pricing/commercialCopy'

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies())
  const copy = videoCopy[locale as keyof typeof videoCopy]
  return buildResolvedPageMetadata({ locale, pathname: PRODUCT_WALKTHROUGHS_PATH, title: `${copy.label} | Sundae`, description: `${copy.intro} ${copy.language}` })
}

export default async function ProductWalkthroughsPage() {
  const locale = resolveWebsiteLocale(await cookies())
  const copy = videoCopy[locale as keyof typeof videoCopy]
  const opening = openingCopy[locale as keyof typeof openingCopy]
  const messages = getWebsiteMessages(locale)
  const local = (path: string) => getLocalizedPathname(path, locale)

  return (
    <div className="search-brand-page min-h-screen bg-[var(--navy-deep)]" data-public-walkthroughs>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getWalkthroughSchema(locale)).replace(/</g, '\\u003c') }} />
      <section className="brand-editorial-wash px-6 pb-12 pt-14 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-5">{copy.label} · Sundae Core + Sundae Crew</p>
          <h1 className="max-w-4xl font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.08] tracking-tight text-balance text-[var(--text-display)]">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-supporting)] sm:text-lg">{copy.intro}</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">{copy.language}</p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6 pb-10 lg:px-0">
        {productWalkthroughs.map((film, index) => <article key={film.id} id={film.id} className="grid scroll-mt-28 gap-7 border-t border-[var(--border-default)] py-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12 lg:py-14" data-film={film.id}>
          <div>
            <p className="eyebrow">Sundae {film.family} <span className="mx-2" aria-hidden>·</span><bdi className="font-mono" dir="ltr">{Math.floor(Math.round(film.durationSeconds) / 60)}:{String(Math.round(film.durationSeconds) % 60).padStart(2, '0')}</bdi></p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-balance text-[var(--text-display)] sm:text-4xl">{copy[`${film.id}Title`]}</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-supporting)]">{copy[`${film.id}Body`]}</p>
            <Link href={local(film.productPath)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] underline underline-offset-4 transition-colors hover:text-[var(--text-display)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-display)]">{copy.product}<ArrowUpRight aria-hidden className="h-4 w-4 rtl:-scale-x-100" /></Link>
          </div>
          <div className="min-w-0">
            <WalkthroughPlayer film={film} title={copy[`${film.id}Title`]} watchLabel={copy.watch} errorLabel={copy.error} retryLabel={copy.retry} priority={index === 0} />
            <details className="mt-5 border-b border-[var(--border-default)] pb-4">
              <summary className="w-fit cursor-pointer text-sm font-medium text-[var(--text-primary)] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-display)]">{copy.transcript}</summary>
              <div lang="en" dir="ltr" className="mt-5 space-y-4 text-start text-sm leading-relaxed text-[var(--text-supporting)]">
                {film.transcript.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              </div>
            </details>
          </div>
        </article>)}
      </div>
      <OperatingCTA title={opening.demoTitle} description={getCommercialCopy(locale).sampleWalkthrough}>
        <Button href={local('/demo')} variant="cta" size="lg" trackingLabel="product_walkthroughs_demo">{messages.navbar.bookDemo}</Button>
      </OperatingCTA>
    </div>
  )
}
