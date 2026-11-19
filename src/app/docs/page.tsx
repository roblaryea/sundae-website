'use client';

import { Button } from '@/components/ui/Button';
import resourceCopy from '@/content/buyer-clarity/resources.json';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { GuidanceClose, GuidanceHero, GuidanceReveal } from '@/components/support/GuidanceLayout';
import { getLocalizedPathname } from '@/lib/i18n';
import { trackCta } from '@/lib/cta';
import { appendCampaign } from '@/lib/campaign';
import copyByLocale from '@/content/support-guidance.json';

export default function DocumentationPage() {
  const { locale } = useWebsiteI18n();
  const walkthrough = resourceCopy[locale as keyof typeof resourceCopy].primaryCta;
  const copy = copyByLocale[locale as keyof typeof copyByLocale];
  const local = (path: string) => getLocalizedPathname(path, locale);
  const guides = [
    { title: copy.planCta, description: copy.startGuideBody, href: '/getting-started', label: copy.startLabel },
    { title: copy.coreGuideTitle, description: copy.coreGuideBody, href: '/core', label: copy.coreCta },
    { title: copy.crewGuideTitle, description: copy.crewGuideBody, href: '/crew', label: copy.crewCta },
    { title: copy.connectionsTitle, description: copy.connectionsBody, href: '/integrations', label: copy.connectionsCta },
  ];
  return (
    <div className="search-brand-page min-h-screen bg-[var(--navy-deep)]">
      <GuidanceHero label={copy.docsLabel} lead={copy.docsLead} emphasis={copy.docsEmphasis} description={copy.docsBody}>
        <Button variant="cta" size="lg" href={local('/getting-started')} trackingLabel="docs_plan_rollout" className="max-w-full whitespace-normal! text-start">{copy.planCta}</Button>
        <Button variant="outline-light" size="lg" href={local('/demo')} trackingLabel="docs_walkthrough" className="max-w-full whitespace-normal! text-start">{walkthrough}</Button>
      </GuidanceHero>
      <section className="bg-[#F7F2E9] px-6 py-16 text-[#241D17] sm:px-8 lg:px-12 lg:py-24" aria-labelledby="guidance-destinations">
        <div className="mx-auto max-w-7xl">
          <GuidanceReveal><h2 id="guidance-destinations" className="mb-12 max-w-4xl font-display text-3xl leading-tight sm:text-5xl">{copy.docsSectionTitle}</h2></GuidanceReveal>
          <div className="divide-y divide-[#241D17]/20 border-y border-[#241D17]/20">
            {guides.map((guide, index) => (
              <GuidanceReveal key={guide.href}>
                <article className="grid min-w-0 items-start gap-5 py-9 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12 lg:py-12">
                  <span aria-hidden="true" className="font-display text-4xl leading-none text-[#845128]">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="min-w-0 font-display text-2xl leading-tight sm:text-3xl">
                    {guide.title}
                  </h3>
                  <div className="min-w-0 sm:col-start-2 lg:col-start-auto">
                    <p className="text-lg leading-relaxed text-[#241D17]/80">{guide.description}</p>
                    <a href={local(guide.href)} onClick={event => { event.currentTarget.href = appendCampaign(local(guide.href)); trackCta('docs_product_guidance', { destination: guide.href }); }} className="group mt-4 inline-flex min-h-11 items-center gap-4 font-semibold underline decoration-[#845128]/40 underline-offset-4 transition-colors hover:text-[#845128] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#845128]">
                      {guide.label}<span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none rtl:rotate-180 rtl:group-hover:-translate-x-1">→</span>
                    </a>
                  </div>
                </article>
              </GuidanceReveal>
            ))}
          </div>
        </div>
      </section>
      <GuidanceClose title={copy.docsCloseTitle} description={copy.docsCloseBody}>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap">
          <Button variant="cta" size="lg" href={local('/demo')} trackingLabel="docs_close_walkthrough" className="max-w-full whitespace-normal! text-start">{walkthrough}</Button>
          <Button variant="outline-light" size="lg" href={local('/faq')} trackingLabel="docs_common_questions" className="max-w-full whitespace-normal! text-start">{copy.faqCta}</Button>
        </div>
      </GuidanceClose>
    </div>
  );
}
