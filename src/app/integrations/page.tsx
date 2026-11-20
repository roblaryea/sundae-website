'use client';

import { BookDemoButton } from '@/components/ui/BookDemoButton';

import { Button } from '@/components/ui/Button';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { GuidanceClose, GuidanceHero, GuidanceReveal } from '@/components/support/GuidanceLayout';
import { SystemCloseActions } from '@/components/support/SystemPresentation';
import { getLocalizedPathname } from '@/lib/i18n';
import copyByLocale from '@/content/support-system.json';
import guidanceByLocale from '@/content/support-guidance.json';
import sources from '@/content/integration-source-examples.json';

export default function IntegrationsPage() {
  const { locale } = useWebsiteI18n();
  const copy = copyByLocale[locale as keyof typeof copyByLocale];
  const guidance = guidanceByLocale[locale as keyof typeof guidanceByLocale];
  const labels = sources.labels[locale as keyof typeof sources.labels];
  const local = (path: string) => getLocalizedPathname(path, locale);
  const steps = [{ title: copy.i1t, body: copy.i1b }, { title: copy.i2t, body: copy.i2b }, { title: copy.i3t, body: copy.i3b }, { title: copy.i4t, body: copy.i4b }];
  return (
    <div className="search-brand-page min-h-screen bg-[var(--navy-deep)]">
      <GuidanceHero label={copy.iLabel} lead={copy.iLead} emphasis={copy.iEm} description={copy.iBody} compactDescription>
        <BookDemoButton variant="cta" size="lg" href={local('/demo')} trackingLabel="integrations_system_review" className="max-w-full whitespace-normal! text-start" />
        <Button variant="outline-light" size="lg" href={local('/architecture')} trackingLabel="integrations_architecture" className="max-w-full whitespace-normal! text-start">{copy.architectureCta}</Button>
      </GuidanceHero>
      <section id="sources" className="bg-[#F7F2E9] px-6 py-16 text-[#241D17] sm:px-8 lg:px-12 lg:py-24" aria-labelledby="sources-title">
        <div className="mx-auto max-w-7xl">
          <GuidanceReveal className="max-w-4xl">
            <h2 id="sources-title" className="font-display text-3xl leading-tight sm:text-5xl">{copy.iDirectory}</h2>
            <p data-source-coverage className="mt-6 max-w-3xl text-base leading-relaxed text-[#241D17]/75">{copy.iNote}</p>
          </GuidanceReveal>
          <dl data-source-directory className="mt-12 grid border-t border-[#241D17]/20 lg:grid-cols-2 lg:gap-x-16">
            {sources.examples.map((names, index) => (
              <div key={labels[index]} className="min-w-0 border-b border-[#241D17]/20 py-7">
                <dt className="font-display text-2xl leading-tight">{labels[index]}</dt>
                <dd className="mt-3 text-base leading-relaxed text-[#241D17]/75">{names.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section id="connection-scope" className="px-6 py-16 sm:px-8 lg:px-12 lg:py-24" aria-labelledby="connection-scope-title">
        <div className="mx-auto max-w-7xl">
          <GuidanceReveal><h2 id="connection-scope-title" className="mb-12 max-w-4xl font-display text-3xl leading-tight text-[var(--text-primary)] sm:text-5xl">{copy.iScopeTitle}</h2></GuidanceReveal>
          <ol className="divide-y divide-[var(--border-default)] border-y border-[var(--border-default)]">
            {steps.map((step, index) => <li key={step.title} className="py-8 sm:py-10"><GuidanceReveal className="grid gap-5 sm:grid-cols-[3rem_minmax(0,1fr)] lg:grid-cols-[4rem_minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12"><span aria-hidden="true" className="font-display text-4xl text-[var(--text-warm)]">{String(index + 1).padStart(2, '0')}</span><h3 className="min-w-0 font-display text-2xl text-[var(--text-primary)] sm:text-3xl">{step.title}</h3><p className="min-w-0 text-lg leading-relaxed text-[var(--text-supporting)] sm:col-start-2 lg:col-start-auto">{step.body}</p></GuidanceReveal></li>)}
          </ol>
        </div>
      </section>
      <GuidanceClose title={copy.iCloseTitle} description={copy.iCloseBody}>
        <SystemCloseActions locale={locale} secondaryHref="/getting-started" secondaryLabel={guidance.planCta} prefix="integrations_close" />
      </GuidanceClose>
    </div>
  );
}
