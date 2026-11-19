'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { OperatingCTA } from '@/components/product/OperatingCTA'
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider'
import { getLocalizedPathname } from '@/lib/i18n'
import { getOperatorAudienceCopy } from '@/lib/operatorAudienceCopy'
import { getCommercialCopy } from '@/lib/pricing/commercialCopy'
import closerCopy from '@/content/positioning-closer.json'
import openingCopy from '@/content/operator-openings.json'
import storyCopy from '@/content/platform-story.json'
import sharedCopy from '@/content/buyer-clarity/shared.json'
import proofCopy from '@/content/workflow-proof.json'
import { operatorNavigationCopy } from '@/content/operator-workflows/navigation'
import logbook from '../../../public/images/product/native-2026-11-16/logbook.png'
import depthCopy from '@/content/operator-depth.json'
import styles from '../why-sundae/persuasion.module.css'
import { SectionPersonaSwitcher } from '@/components/home/sections/SectionPersonaSwitcher'

export default function SolutionsHubPage() {
  const { locale, messages } = useWebsiteI18n()
  const copy = closerCopy[locale as keyof typeof closerCopy]
  const opening = openingCopy[locale as keyof typeof openingCopy]
  const story = storyCopy[locale as keyof typeof storyCopy]
  const shared = sharedCopy[locale as keyof typeof sharedCopy]
  const proof = proofCopy[locale as keyof typeof proofCopy]
  const workflow = operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy]
  const commercial = getCommercialCopy(locale)
  const audience = getOperatorAudienceCopy(locale)
  const depth = depthCopy[locale as keyof typeof depthCopy]
  const nav = messages.navbar
  const href = (path: string) => getLocalizedPathname(path, locale)
  const offerings = [
    { name: 'Crew', title: story.crewRole, body: opening.crewDescription },
    { name: 'Core', title: story.coreRole, body: opening.coreDescription },
  ]


  return (
    <div className={`search-brand-page min-h-screen overflow-x-clip bg-[var(--navy-deep)] ${styles.page}`}>
      <section className="brand-editorial-wash px-6 pb-16 pt-16 sm:pt-20 lg:px-8" data-solutions-opening>
        <div className={`${styles.entrance} mx-auto max-w-6xl`}>
          <p className="eyebrow mb-5">{nav.solutions} · Sundae Core + Sundae Crew</p>
          <h1 className="max-w-4xl font-display text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[1.07] tracking-[-0.035em] text-[var(--text-primary)] text-balance">{copy.solutionsTop}<br /><em className="text-[var(--text-warm)]">{copy.solutionsAccent}</em></h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-supporting)] sm:text-lg">{audience.solutions}</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Button href={href('/demo')} variant="cta" size="lg" trackingLabel="solutions_primaryCta">{nav.bookDemo}</Button>
            <Button href="#by-role" variant="outline-light" size="lg">{nav.byRole}</Button>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8" data-solutions-work>
        <div className="mx-auto max-w-6xl">
          <h2 className="section-h2 max-w-3xl">{workflow.links.title}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-16">
            {offerings.map((item, index) => <article key={item.name} className={`${styles.reason} border-t border-[var(--border-emphasis)] pt-5`} data-offering={item.name.toLowerCase()}>
              <p className="eyebrow">Sundae {item.name}</p>
              <h3 className="mt-4 font-display text-3xl font-semibold leading-tight text-[var(--text-primary)]">{item.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-supporting)]">{item.body}</p>
              <Link href={href(`/${item.name.toLowerCase()}`)} className={`${styles.link} brand-action-link mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4`}>Sundae {item.name}<ArrowUpRight aria-hidden className="h-4 w-4 rtl:-scale-x-100" /></Link>
              {index === 0 && <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                {[[workflow.links.tasks, '/restaurant-task-management'], [workflow.links.logbook, '/restaurant-logbook'], [workflow.links.tips, '/restaurant-tip-management']].map(([label, path]) => <Link key={path} href={href(path)} className={`${styles.link} text-sm text-[var(--text-supporting)] underline underline-offset-4`}>{label}</Link>)}
              </div>}
            </article>)}
          </div>
          <p className="mt-7 max-w-3xl text-xs leading-relaxed text-[var(--text-muted)]">{commercial.packageScope}</p>
        </div>
      </section>

      <section className="brand-editorial-wash px-6 py-14 lg:px-8" data-solutions-product-proof>
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-4">Sundae Crew</p>
            <h2 className="section-h2">{depth.logbookTitle}</h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--text-supporting)]">{depth.logbookBody}</p>
            <Link href={href('/restaurant-logbook')} className={`${styles.link} brand-action-link mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4`}>{workflow.links.logbook}<ArrowUpRight aria-hidden className="h-4 w-4 rtl:-scale-x-100" /></Link>
          </div>
          <figure className="min-w-0">
            <a href="/images/product/native-2026-11-16/logbook.png" target="_blank" rel="noreferrer" aria-label={`${proof.logbook} · ${proof.openImage}`} className="block overflow-hidden rounded-xl border border-[var(--border-default)]">
              <Image src={logbook} alt={proof.logbook} sizes="(max-width: 1024px) 100vw, 700px" className="h-auto w-full" />
            </a>
            <figcaption className="mt-4 text-xs leading-relaxed text-[var(--text-muted)]">{proof.disclosure}</figcaption>
          </figure>
        </div>
      </section>

      <SectionPersonaSwitcher placement="solutions" />
      <section className="px-6 pb-16 lg:px-8" data-solutions-formats>
        <div className="mx-auto max-w-6xl">
          <div className="mt-14 border-t border-[var(--border-emphasis)] pt-7">
            <h3 className="eyebrow mb-5">{nav.bySegment}</h3>
            <div className="flex flex-wrap gap-x-8 gap-y-5">
              {nav.solutionsSegments.map(segment => <Link key={segment.href} href={href(segment.href)} className={`${styles.link} inline-flex items-center gap-2 text-base font-medium text-[var(--text-primary)] underline decoration-[var(--border-emphasis)] underline-offset-4`}>{segment.name}<ArrowUpRight aria-hidden className="h-4 w-4 rtl:-scale-x-100" /></Link>)}
            </div>
          </div>
        </div>
      </section>
      <OperatingCTA title={opening.demoTitle} description={shared.roleCtaDescription}>
        <Button href={href('/demo')} variant="cta" size="lg" trackingLabel="solutions_closingPrimaryCta">{nav.bookDemo}</Button>
        <Button href={href('/why-sundae')} variant="outline-ink" size="lg">{proof.whySundae}</Button>
      </OperatingCTA>
    </div>
  )
}
