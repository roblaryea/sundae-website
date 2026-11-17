import type { WebsiteLocale } from '@/lib/i18n'
import { getCommercialCopy } from '@/lib/pricing/commercialCopy'
import { buildCrewCoverageUrl } from '@/lib/pricingNavigation'

export function CrewWorkflowCoverage({ locale, scope = 'overview', handover = false }: {
  locale: WebsiteLocale
  scope?: 'overview' | 'operations' | 'payroll'
  handover?: boolean
}) {
  const copy = getCommercialCopy(locale)
  const statements = scope === 'overview'
    ? [copy.crewOperationsCoverage, copy.crewPayrollCoverage]
    : [scope === 'payroll' ? copy.crewPayrollCoverage : copy.crewOperationsCoverage]
  const options = scope === 'payroll' ? ['operating', 'complete'] as const : ['operations', 'operating', 'complete'] as const
  const names = { operations: 'Crew Operations (Crew Manage)', operating: 'Crew Operating', complete: 'Crew Complete' }

  return (
    <section data-crew-coverage={scope} className="border-y border-[var(--border-default)] bg-[var(--navy-surface)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:gap-16">
        <h2 className="section-h3 text-[var(--text-warm)]">{copy.packageTitle}</h2>
        <div>
          <div className="space-y-4 text-base leading-relaxed text-[var(--text-supporting)]">
            {statements.map(statement => <p key={statement}>{statement}</p>)}
            <p>{copy.crewCoverageExclusions}</p>
            {(handover || scope === 'overview') && <p>{copy.crewHandoverCoverage}</p>}
          </div>
          <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:gap-x-7">
            {options.map(option => <a key={option} data-crew-coverage-option={option} href={buildCrewCoverageUrl(option)} className="brand-action-link inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">{names[option]} →</a>)}
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">{copy.crewEstimateNote}</p>
        </div>
      </div>
    </section>
  )
}
