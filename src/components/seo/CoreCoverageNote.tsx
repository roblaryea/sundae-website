import { getLocalizedPathname, type WebsiteLocale } from '@/lib/i18n'
import { getCommercialCopy } from '@/lib/pricing/commercialCopy'

export function CoreCoverageNote({ locale, foresight = false }: { locale: WebsiteLocale; foresight?: boolean }) {
  const copy = getCommercialCopy(locale)
  return (
    <section data-core-coverage-note={foresight ? 'foresight' : 'insights'} className="border-y border-[var(--border-default)] bg-[var(--navy-surface)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:gap-16">
        <h2 className="section-h3"><span className="text-[var(--text-warm)]">{copy.packageTitle}</span></h2>
        <div className="space-y-4 text-base leading-relaxed text-[var(--text-supporting)]">
          {foresight ? <p>{copy.foresightCoverage}</p> : <>
            <p className="font-semibold text-[var(--text-primary)]">{copy.coreUniversalTitle}</p>
            <p>{copy.coreUniversalBody}</p>
            <p>{copy.packageScope}</p>
            <p className="text-sm">{copy.coreUsageNote}</p>
          </>}
          <a href={`${getLocalizedPathname('/core', locale)}#packages`} className="brand-action-link inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">{copy.comparePackages} →</a>
        </div>
      </div>
    </section>
  )
}
