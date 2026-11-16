'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PageHero, PageCTA, FadeUp } from '@/components/ui/PageAnimations'
import { CreamBreak } from '@/components/ui/CreamBreak'
import { PlatformOfferings } from '@/components/product/PlatformOfferings'
import { NativeWorkflowProof } from '@/components/seo/NativeWorkflowProof'
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider'
import { getLocalizedPathname } from '@/lib/i18n'
import { getCommercialCopy } from '@/lib/pricing/commercialCopy'
import { operatorWorkflowCopy } from '@/lib/operatorWorkflowCopy'
import storyCopy from '@/content/platform-story.json'
import proofCopy from '@/content/workflow-proof.json'

export default function WhySundaePage() {
  const { locale, messages } = useWebsiteI18n()
  const copy = operatorWorkflowCopy[locale as keyof typeof operatorWorkflowCopy]
  const story = storyCopy[locale as keyof typeof storyCopy]
  const commercial = getCommercialCopy(locale)
  const href = (path: string) => getLocalizedPathname(path, locale)

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--navy-deep)]">
      <PageHero badge={proofCopy[locale as keyof typeof proofCopy].whySundae} title={copy.brand.editorialHeadline} description={commercial.shortlist}>
        <Button variant="cta" size="lg" href={href('/demo')} trackingLabel="why_sundae_hero_walkthrough" trackingMetadata={{ destination: href('/demo') }}>{messages.navbar.bookDemo}</Button>
      </PageHero>
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28" data-choice-reasons>
        <div className="mx-auto max-w-6xl">
          <FadeUp className="mb-12 max-w-3xl">
            <p className="eyebrow mb-4">{proofCopy[locale as keyof typeof proofCopy].whySundae}</p>
            <h2 className="section-h2">{copy.shared.connectedTitle}</h2>
          </FadeUp>
          {[
            { title: copy.comparison.criteria[0][0], description: story.workReason, paths: ['/crew', '/core'] },
            { title: copy.comparison.criteria[2][0], description: story.contextReason, paths: ['/product/pulse', '/product/benchmarking', '/product/watchtower'] },
            { title: copy.comparison.criteria[3][0], description: story.measureReason, paths: ['/product/recovery'] },
          ].map(reason => <div key={reason.title} className="grid gap-5 border-t border-[var(--border-default)] py-8 md:grid-cols-[0.7fr_1.3fr] md:gap-14" data-choice-reason>
            <h3 className="font-display text-2xl font-semibold text-[var(--text-display)]">{reason.title}</h3>
            <div>
              <p className="body-lg text-[var(--text-supporting)]">{reason.description}</p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {reason.paths.map(path => <Link key={path} href={href(path)} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] underline underline-offset-4 transition-colors hover:text-[var(--warm-coral)]">
                  {messages.navbar.pillars.find(item => item.href === path)?.name ?? (path === '/core' ? 'Sundae Core' : 'Sundae Crew')}<ArrowUpRight aria-hidden className="h-4 w-4 rtl:-scale-x-100" />
                </Link>)}
              </div>
            </div>
          </div>)}
        </div>
      </section>
      <PlatformOfferings showIntro={false} />
      <CreamBreak eyebrow={copy.shared.connectedEyebrow} statement={copy.shared.creamStatement} lede={copy.shared.connectedDescription} />
      <NativeWorkflowProof locale={locale} view="tasks" />
      <PageCTA title={copy.shared.ctaTitle} description={commercial.sampleWalkthrough}>
        <Button variant="cta" size="lg" href={href('/demo')} trackingLabel="why_sundae_closing_walkthrough" trackingMetadata={{ destination: href('/demo') }}>{messages.navbar.bookDemo}</Button>
        <Button variant="outline-ink" size="lg" href={href('/restaurant365-alternative')}>{copy.links.comparison}</Button>
      </PageCTA>
    </div>
  )
}
