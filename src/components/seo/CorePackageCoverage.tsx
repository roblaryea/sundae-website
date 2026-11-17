import type { WebsiteLocale } from '@/lib/i18n'
import { getCommercialCopy } from '@/lib/pricing/commercialCopy'
import catalog from '@/lib/pricing/catalogSnapshot.json'
import { buildCoreCoverageUrl } from '@/lib/pricingNavigation'
import type { PricingIntent } from '@/lib/pricingIntent'

export function CorePackageCoverage({ locale }: { locale: WebsiteLocale }) {
  const copy = getCommercialCopy(locale)
  const descriptions = {
    foundation: copy.coreFoundationCoverage, margin: copy.coreMarginCoverage,
    growth: copy.coreGrowthCoverage, performance: copy.corePerformanceCoverage,
  }
  return (
    <section id="packages" data-core-coverage className="scroll-mt-24 bg-[var(--navy-deep)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-4">Sundae Core</p>
        <h2 className="section-h2 mb-10">{copy.packageTitle}</h2>
        <div data-core-universal className="brand-evidence-surface mb-10 border-s-2 px-6 py-7 sm:px-8">
          <h3 className="section-h3 mb-4"><span className="text-[var(--text-warm)]">{copy.coreUniversalTitle}</span></h3>
          <p className="body-lg mb-3 text-[var(--text-primary)]">{copy.coreUniversalBody}</p>
          <p className="max-w-4xl text-sm leading-relaxed text-[var(--text-supporting)]">{copy.coreUsageNote}</p>
        </div>
        <div className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
          {catalog.tiers.map(tier => (
            <div key={tier.id} data-core-coverage-tier={tier.id} className="grid gap-4 py-7 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)_auto] lg:items-start lg:gap-10">
              <h3 className="font-display text-xl font-semibold text-[var(--text-display)]">{tier.name}</h3>
              <p className="text-base leading-relaxed text-[var(--text-supporting)]">{descriptions[tier.id as keyof typeof descriptions]}</p>
              <a data-core-coverage-option={tier.id} aria-label={`${copy.comparePackages} — ${tier.name}`} href={buildCoreCoverageUrl(`core_${tier.id}` as PricingIntent['corePackage'])} className="brand-action-link inline-flex min-h-11 items-center self-start text-sm font-semibold underline underline-offset-4">{copy.comparePackages} →</a>
            </div>
          ))}
        </div>
        <p data-foresight-coverage className="mt-8 max-w-4xl text-base leading-relaxed text-[var(--text-supporting)]">{copy.foresightCoverage}</p>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[var(--text-muted)]">{copy.crewEstimateNote}</p>
      </div>
    </section>
  )
}
