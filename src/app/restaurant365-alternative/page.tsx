import Link from 'next/link'
import { BrandEmphasis } from '@/components/ui/BrandEmphasis'
import brandEmphasis from '@/content/brand-emphasis.json'
import { getCommercialCopy } from '@/lib/pricing/commercialCopy'
import { PRICING_URL } from '@/lib/urls'
import { Button } from '@/components/ui/Button'
import { NativeWorkflowProof } from '@/components/seo/NativeWorkflowProof'

import { cookies } from 'next/headers'
import { getLocalizedPathname, resolveWebsiteLocale } from '@/lib/i18n'
import { operatorWorkflowCopy } from '@/lib/operatorWorkflowCopy'

export default async function Restaurant365AlternativePage() {
  const locale = resolveWebsiteLocale(await cookies())
  const copy = operatorWorkflowCopy[locale as keyof typeof operatorWorkflowCopy].comparison
  const commercial = getCommercialCopy(locale)
  const questions = copy.questions.map((item, index) => ({ ...item, body: index === 0 ? commercial.accountingBoundary : index === 2 ? commercial.shortlist : item.body }))
  const { criteria } = copy
  const href = (path: string) => getLocalizedPathname(path, locale)
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.title,
      acceptedAnswer: { '@type': 'Answer', text: item.body },
    })),
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--navy-deep)] text-[var(--text-primary)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      <section className="search-hero relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-5xl">
          <p className="eyebrow search-hero-eyebrow mb-5">{copy.eyebrow}</p>
          <h1 className="hero-h1 max-w-4xl text-balance"><BrandEmphasis text={copy.title} phrase={brandEmphasis[locale as keyof typeof brandEmphasis][4]} /></h1>
          <p className="body-xl mt-7 max-w-3xl text-[var(--text-supporting)]">
            {copy.description}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={href('/demo')} variant="primary" size="lg" className="max-w-full whitespace-normal! text-center break-words" trackingLabel="platform_comparison_hero" trackingMetadata={{ destination: href('/demo') }}>{copy.primaryCta}</Button>
            <Button href={href('/restaurant-management-platform')} variant="outline-light" size="lg" className="max-w-full whitespace-normal! text-center break-words">{copy.secondaryCta}</Button>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 border-t border-[var(--border-default)] pt-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="section-h2 mb-5">{copy.questions[2].title}</h2>
            <p className="body-lg text-[var(--text-supporting)]">{commercial.shortlist}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              {['restaurant-task-management', 'restaurant-logbook', 'restaurant-tip-management'].map(slug => <Link key={slug} className="brand-action-link underline underline-offset-4 hover:text-[var(--warm-coral)]" href={href(`/${slug}`)}>{operatorWorkflowCopy[locale as keyof typeof operatorWorkflowCopy].pages[slug as keyof typeof operatorWorkflowCopy[typeof locale]['pages']].title} →</Link>)}
            </div>
          </div>
          <aside className="brand-evidence-surface border-s ps-7 py-6 pe-6">
            <h2 className="text-xl font-semibold mb-4">Core · Crew · Core + Crew</h2>
            <p className="text-[var(--text-supporting)] leading-relaxed">{commercial.costComparison}</p>
            <a className="brand-action-link mt-6 inline-flex font-semibold underline underline-offset-4" href={PRICING_URL}>pricing.sundae.io →</a>
            <a className="mt-4 block text-sm underline underline-offset-4 text-[var(--text-supporting)]" href="https://www.restaurant365.com/pricing/">Restaurant365 · restaurant365.com/pricing →</a>
          </aside>
        </div>
      </section>

      <NativeWorkflowProof locale={locale} view="tasks" />

      <section className="search-criteria border-y border-[var(--border-default)] bg-[var(--surface-faint)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow mb-4">{copy.criteriaEyebrow}</p>
          <h2 className="section-h2 mb-8 max-w-3xl">{copy.criteriaTitle}</h2>
          <dl className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)] md:hidden">
            {criteria.map(([area, question, surface]) => (
              <div key={area} className="py-6">
                <dt className="mb-3 text-lg font-semibold">{area}</dt>
                <dd className="space-y-4 text-[var(--text-supporting)]">
                  <p>{question}</p>
                  <p><span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-primary)]">{copy.columns[2]}</span>{surface}</p>
                </dd>
              </div>
            ))}
          </dl>
          <div className="hidden overflow-x-auto rounded-2xl border border-[var(--border-default)] md:block">
            <table className="min-w-[760px] w-full border-collapse text-start">
              <thead className="bg-white/[0.04]">
                <tr>
                  <th className="p-5 text-sm font-semibold">{copy.columns[0]}</th>
                  <th className="p-5 text-sm font-semibold">{copy.columns[1]}</th>
                  <th className="p-5 text-sm font-semibold">{copy.columns[2]}</th>
                </tr>
              </thead>
              <tbody>
                {criteria.map(([area, question, surface]) => (
                  <tr key={area} className="border-t border-[var(--border-default)] align-top">
                    <td className="p-5 font-semibold text-[var(--text-primary)]">{area}</td>
                    <td className="p-5 text-[var(--text-supporting)]">{question}</td>
                    <td className="p-5 text-[var(--text-supporting)]">{surface}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          {questions.slice(0, 2).map((item) => (
            <article key={item.title} className="border-t-2 border-[var(--warm-caramel)] pt-5">
              <h2 className="mb-3 text-lg font-semibold">{item.title}</h2>
              <p className="body-base text-[var(--text-supporting)]">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brand-evidence-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-4">{copy.sourcesEyebrow}</p>
          <h2 className="section-h2 mb-6">{copy.sourcesTitle}</h2>
          <p className="body-lg mb-8 text-[var(--text-supporting)]">
            {copy.sourcesDescription}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.restaurant365.com/accounting/" className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium hover:border-[#FF5C4D]/50">Restaurant365 Accounting →</a>
            <a href="https://www.restaurant365.com/ai-info/" className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium hover:border-[#FF5C4D]/50">{copy.sourceLabels[0]} →</a>
            <a href="https://www.restaurant365.com/workforce/" className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium hover:border-[#FF5C4D]/50">{copy.sourceLabels[1]} →</a>
            <a href="https://www.restaurant365.com/workforce/logbook/" className="rounded-full border border-[var(--border-default)] px-4 py-2 text-sm font-medium hover:border-[#FF5C4D]/50">{copy.sourceLabels[2]} →</a>
          </div>
        </div>
      </section>

      <section className="bg-[var(--cream)] px-4 py-20 text-center text-[var(--ink)] sm:px-6 lg:px-8">
        <h2 className="section-h2 mx-auto mb-5 max-w-3xl" style={{ color: 'var(--ink)' }}>{copy.ctaTitle}</h2>
        <p className="body-lg mx-auto mb-8 max-w-2xl text-black/65">{copy.ctaDescription}</p>
        <Button href={href('/demo')} variant="cta" size="lg" className="max-w-full whitespace-normal! text-center break-words" trackingLabel="platform_comparison_closing" trackingMetadata={{ destination: href('/demo') }}>{copy.ctaLabel}</Button>
      </section>
    </div>
  )
}
