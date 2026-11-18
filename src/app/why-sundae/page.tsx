'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PageHero, PageCTA, FadeUp } from '@/components/ui/PageAnimations'
import { PlatformOfferings } from '@/components/product/PlatformOfferings'
import { NativeWorkflowProof } from '@/components/seo/NativeWorkflowProof'
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider'
import { getLocalizedPathname } from '@/lib/i18n'
import { getCommercialCopy } from '@/lib/pricing/commercialCopy'
import { operatorWorkflowCopy } from '@/lib/operatorWorkflowCopy'
import proofCopy from '@/content/workflow-proof.json'
import { OperatorOpeningTitle } from '@/components/ui/OperatorOpeningTitle'
import depthCopy from '@/content/operator-depth.json'
import openingCopy from '@/content/operator-openings.json'
import { operatorNavigationCopy } from '@/content/operator-workflows/navigation'
import { getCoreNavigation } from '@/lib/coreNavigation'

export default function WhySundaePage() {
  const { locale, messages } = useWebsiteI18n()
  const copy = operatorWorkflowCopy[locale as keyof typeof operatorWorkflowCopy]
  const commercial = getCommercialCopy(locale)
  const opening = openingCopy[locale as keyof typeof openingCopy]
  const depth = depthCopy[locale as keyof typeof depthCopy]
  const coreLinks = getCoreNavigation(messages.navbar.pillars, locale)
  const href = (path: string) => getLocalizedPathname(path, locale)
  const labels: Record<string, string> = {
    ...Object.fromEntries(coreLinks.map(link => [link.href, link.name])),
    '/core': 'Sundae Core', '/crew': 'Sundae Crew',
    '/restaurant-task-management': operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy].links.tasks,
    '/restaurant-logbook': operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy].links.logbook,
  }
  const reasons = [
    { id: 'observe', title: depth.whyObserveTitle, description: depth.whyObserveBody, paths: ['/product/pulse', '/product/benchmarking', '/product/watchtower'] },
    { id: 'act', title: depth.whyActTitle, description: depth.whyActBody, paths: ['/crew', '/restaurant-task-management', '/restaurant-logbook'] },
    { id: 'review', title: depth.whyReviewTitle, description: depth.whyReviewBody, paths: ['/core', '/product/recovery'] },
  ]

  return (
    <div className="search-brand-page min-h-screen overflow-x-hidden bg-[var(--navy-deep)]">
      <PageHero badge={`${proofCopy[locale as keyof typeof proofCopy].whySundae} · ${operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy].brand.eyebrow}`} title={<OperatorOpeningTitle text={opening.whyTitle} accent={opening.whyAccent} />} description={opening.whyDescription}>
        <Button variant="cta" size="lg" href={href('/demo')} trackingLabel="why_sundae_hero_walkthrough" trackingMetadata={{ destination: href('/demo') }}>{messages.navbar.bookDemo}</Button>
      </PageHero>
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-choice-reasons data-operator-scenario>
        <div className="mx-auto max-w-6xl">
          <FadeUp className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4">{proofCopy[locale as keyof typeof proofCopy].whySundae}</p>
            <h2 className="section-h2">{opening.choiceTitle}</h2>
            <p className="body-lg mt-5 text-[var(--text-supporting)]">{depth.whyIntro}</p>
            <p className="mt-4 text-sm text-[var(--text-muted)]">{operatorNavigationCopy[locale as keyof typeof operatorNavigationCopy].brand.illustrationDisclosure}</p>
          </FadeUp>
          {reasons.map(reason => <div key={reason.id} className="grid gap-5 border-t border-[var(--border-default)] py-8 md:grid-cols-[0.7fr_1.3fr] md:gap-14" data-choice-reason data-operator-step={reason.id}>
            <h3 className="font-display text-2xl font-semibold text-[var(--text-display)]">{reason.title}</h3>
            <div>
              <p className="body-lg text-[var(--text-supporting)]">{reason.description}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {reason.paths.map(path => <Link key={path} href={href(path)} className="brand-action-link inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 transition-colors hover:text-[var(--warm-coral)]">
                  {labels[path]}<ArrowUpRight aria-hidden className="h-4 w-4 rtl:-scale-x-100" />
                </Link>)}
              </div>
            </div>
          </div>)}
          <p className="mt-8 max-w-3xl text-base leading-relaxed text-[var(--text-supporting)]">{depth.whyCarry}</p>
          <p className="mt-5 max-w-4xl border-s-2 border-[var(--trust-border)] ps-5 text-sm leading-relaxed text-[var(--text-muted)]">{commercial.watchtowerEligibility}</p>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--text-supporting)]">{opening.compatibility}</p>
        </div>
      </section>
      <PlatformOfferings showIntro={false} />
      <NativeWorkflowProof locale={locale} view="tasks" />
      <PageCTA title={copy.shared.ctaTitle} description={commercial.sampleWalkthrough}>
        <Button variant="cta" size="lg" href={href('/demo')} trackingLabel="why_sundae_closing_walkthrough" trackingMetadata={{ destination: href('/demo') }}>{messages.navbar.bookDemo}</Button>
        <Button variant="outline-ink" size="lg" href={href('/restaurant365-alternative')}>{copy.links.comparison}</Button>
      </PageCTA>
    </div>
  )
}
