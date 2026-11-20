'use client'

import { BookDemoButton } from '@/components/ui/BookDemoButton';

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { OperatingCTA } from '@/components/product/OperatingCTA'
import { ThemedShot } from '@/components/ui/ThemedShot'
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider'
import { getLocalizedPathname } from '@/lib/i18n'
import { getCommercialCopy } from '@/lib/pricing/commercialCopy'
import openingCopy from '@/content/operator-openings.json'
import closerCopy from '@/content/positioning-closer.json'
import storyCopy from '@/content/platform-story.json'
import proofCopy from '@/content/workflow-proof.json'
import sharedCopy from '@/content/buyer-clarity/shared.json'
import depthCopy from '@/content/operator-depth.json'
import { operatorNavigationCopy } from '@/content/operator-workflows/navigation'
import tasks from '../../../public/images/product/native-2026-11-16/tasks.png'
import styles from './persuasion.module.css'

export default function WhySundaePage() {
  const { locale, messages } = useWebsiteI18n()
  const copy = closerCopy[locale as keyof typeof closerCopy]
  const opening = openingCopy[locale as keyof typeof openingCopy]
  const story = storyCopy[locale as keyof typeof storyCopy]
  const proof = proofCopy[locale as keyof typeof proofCopy]
  const shared = sharedCopy[locale as keyof typeof sharedCopy]
  const depth = depthCopy[locale as keyof typeof depthCopy]
  const commercial = getCommercialCopy(locale)
  const workflow = operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy]
  const href = (path: string) => getLocalizedPathname(path, locale)
  const reasons = [
    { body: story.workReason, path: '/product', link: 'Sundae Core + Sundae Crew' },
    { body: story.contextReason, path: '/product/watchtower', link: 'Watchtower' },
    { body: story.measureReason, path: '/product/recovery', link: messages.navbar.pillars.find(p => p.href === '/product/recovery')?.name ?? 'Profit Recovery' },
  ]

  return (
    <div className={`search-brand-page min-h-screen overflow-x-clip bg-[var(--navy-deep)] ${styles.page}`}>
      <section className="brand-editorial-wash px-6 pb-12 pt-16 sm:pt-20 lg:px-8" data-why-opening>
        <div className="mx-auto max-w-6xl">
          <div className={`${styles.entrance} mx-auto max-w-4xl text-center`}>
            <p className="eyebrow mb-5">{proof.whySundae}</p>
            <h1 className="font-display text-[clamp(2.6rem,5.5vw,5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--text-primary)] text-balance">
              {copy.whyTop}<br /><em className="font-semibold text-[var(--text-warm)]">{copy.whyAccent}</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-supporting)] sm:text-lg">{opening.whyDescription}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <BookDemoButton variant="cta" size="lg" href={href('/demo')} trackingLabel="why_sundae_hero_walkthrough" />
              <Button variant="outline-light" size="lg" href={href('/results')}>{shared.proofLink}</Button>
            </div>
          </div>
          <figure className={`${styles.productReveal} mx-auto mt-12 max-w-5xl`}>
            <ThemedShot dark="/images/product/2026-fresh/recovery-brief-dark.png" light="/images/product/2026-fresh/recovery-brief.png" alt={copy.proofTitle} width={1600} height={1000} priority framed sizes="(max-width: 1024px) 100vw, 1024px" />
            <figcaption className="mt-4 text-center text-xs leading-relaxed text-[var(--text-muted)]">{proof.disclosure}</figcaption>
          </figure>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-8 lg:py-20" data-choice-reasons>
        <div className="mx-auto max-w-6xl">
          <h2 className="section-h2 max-w-3xl text-balance">{copy.reasonsTitle}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {reasons.map((reason, i) => <article key={reason.path} className={`${styles.reason} border-t border-[var(--border-emphasis)] pt-5`} data-choice-reason>
              <span className="font-display text-3xl italic text-[var(--text-warm)]" aria-hidden>0{i + 1}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-[var(--text-primary)]">{copy.reasonLabels[i]}</h3>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-supporting)]">{reason.body}</p>
              <Link href={href(reason.path)} className={`${styles.link} brand-action-link mt-5 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4`}>{reason.link}<ArrowUpRight aria-hidden className="h-4 w-4 rtl:-scale-x-100" /></Link>
            </article>)}
          </div>
          <p className="mt-8 max-w-4xl text-xs leading-relaxed text-[var(--text-muted)]">{commercial.watchtowerEligibility}</p>
        </div>
      </section>

      <section className="brand-editorial-wash px-6 py-16 lg:px-8 lg:py-20" data-native-proof="tasks">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-14">
          <div>
            <p className="eyebrow mb-4">Sundae Crew</p>
            <h2 className="section-h2 text-balance">{copy.proofTitle}</h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--text-supporting)]">{depth.crewWorkBody}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              {[[workflow.links.tasks, '/restaurant-task-management'], [workflow.links.logbook, '/restaurant-logbook'], [workflow.links.tips, '/restaurant-tip-management']].map(([label, path]) => <Link key={path} href={href(path)} className={`${styles.link} brand-action-link text-sm font-semibold underline underline-offset-4`}>{label}</Link>)}
            </div>
          </div>
          <figure className="min-w-0">
            <a href="/images/product/native-2026-11-16/tasks.png" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-[var(--border-default)] bg-[#FAF7F2]" aria-label={`${proof.tasks} · ${proof.openImage}`}>
              <Image src={tasks} alt={proof.tasks} sizes="(max-width: 1024px) 100vw, 700px" className="h-auto w-full" />
            </a>
            <figcaption className="mt-4 text-xs leading-relaxed text-[var(--text-muted)]">{proof.disclosure}</figcaption>
          </figure>
        </div>
      </section>

      <section className="px-6 py-12 lg:px-8" data-offering-fit>
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 md:gap-14">
            {[{ name: 'Core', role: story.coreRole, body: opening.coreDescription }, { name: 'Crew', role: story.crewRole, body: opening.crewDescription }].map(item => <article key={item.name} className="border-t border-[var(--border-default)] pt-6" data-offering={item.name.toLowerCase()}>
              <Link href={href(`/${item.name.toLowerCase()}`)} className={`${styles.link} inline-flex items-center gap-3 font-display text-3xl font-semibold text-[var(--text-primary)]`}>Sundae {item.name}<ArrowUpRight aria-hidden className="h-5 w-5 text-[var(--warm-coral)] rtl:-scale-x-100" /></Link>
              <p className="mt-2 text-sm font-semibold text-[var(--text-warm)]">{item.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-supporting)]">{item.body}</p>
            </article>)}
          </div>
          <p className="mt-8 text-base text-[var(--text-primary)]">{opening.compatibility}</p>
          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-[var(--text-muted)]">{commercial.packageScope}</p>
        </div>
      </section>
      <OperatingCTA title={opening.demoTitle} description={commercial.sampleWalkthrough}>
        <BookDemoButton variant="cta" size="lg" href={href('/demo')} trackingLabel="why_sundae_closing_walkthrough" />
        <Button variant="outline-ink" size="lg" href={href('/restaurant365-alternative')}>{workflow.links.comparison}</Button>
      </OperatingCTA>
    </div>
  )
}
