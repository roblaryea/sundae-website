'use client';

import { BookDemoButton } from '@/components/ui/BookDemoButton';

import { Button } from '@/components/ui/Button';
import { GuidanceReveal } from '@/components/support/GuidanceLayout';
import { getLocalizedPathname, type WebsiteLocale } from '@/lib/i18n';
import { getCommercialCopy } from '@/lib/pricing/commercialCopy';
import guidanceByLocale from '@/content/support-guidance.json';
import systemByLocale from '@/content/support-system.json';
import onboardingByLocale from '@/content/buyer-depth/onboarding.json';

export function SystemSequence({ stages, inputs }: {
  stages: Array<{ title: string; body: string }>;
  inputs?: string[];
}) {
  return (
    <ol data-system-sequence className="grid gap-10 border-s border-[var(--border-emphasis)] ps-6 lg:grid-cols-5 lg:gap-7 lg:border-s-0 lg:border-t lg:ps-0 lg:pt-8">
      {stages.map((stage, index) => (
        <li key={stage.title} className="relative min-w-0">
          <GuidanceReveal>
            <span aria-hidden="true" className="font-display text-4xl text-[var(--text-warm)]">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-5 font-display text-2xl leading-tight text-[var(--text-primary)]">{stage.title}</h3>
            {index === 0 && inputs && <ul className="mt-5 space-y-2 text-sm font-semibold text-[var(--text-warm)]">{inputs.map(input => <li key={input}>{input}</li>)}</ul>}
            <p className="mt-5 text-base leading-relaxed text-[var(--text-supporting)]">{stage.body}</p>
            {index < stages.length - 1 && <span aria-hidden="true" className="absolute -end-4 top-2 hidden text-[var(--text-warm)] lg:block rtl:rotate-180">→</span>}
          </GuidanceReveal>
        </li>
      ))}
    </ol>
  );
}

export function SystemCloseActions({ locale, secondaryHref, secondaryLabel, prefix, sample = false }: {
  locale: WebsiteLocale; secondaryHref: string; secondaryLabel: string; prefix: string; sample?: boolean;
}) {
  const commercial = getCommercialCopy(locale);
  return (
    <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-8">
      <div className="max-w-md">
        <BookDemoButton variant="cta" size="lg" href={getLocalizedPathname('/demo', locale)} trackingLabel={`${prefix}_walkthrough`} className="max-w-full whitespace-normal! text-start" />
        {sample && <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">{commercial.sampleWalkthrough}</p>}
      </div>
      <Button variant="outline-light" size="lg" href={getLocalizedPathname(secondaryHref, locale)} trackingLabel={`${prefix}_continuation`} className="max-w-full whitespace-normal! text-start">{secondaryLabel}</Button>
    </div>
  );
}

export function CoreCrewScope({ locale }: { locale: WebsiteLocale }) {
  const guidance = guidanceByLocale[locale as keyof typeof guidanceByLocale];
  const system = systemByLocale[locale as keyof typeof systemByLocale];
  const onboarding = onboardingByLocale[locale as keyof typeof onboardingByLocale];
  return (
    <section data-system-products className="bg-[#F7F2E9] px-6 py-16 text-[#241D17] sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <GuidanceReveal><h2 className="max-w-4xl font-display text-3xl leading-tight sm:text-5xl">{onboarding.steps[1].title}</h2></GuidanceReveal>
        <div className="mt-12 grid divide-y divide-[#241D17]/20 border-y border-[#241D17]/20 lg:grid-cols-2 lg:divide-x lg:divide-y-0 rtl:lg:divide-x-reverse">
          {[{ title: 'Sundae Core', body: guidance.coreBody, href: '/core', cta: guidance.coreCta }, { title: 'Sundae Crew', body: guidance.crewBody, href: '/crew', cta: guidance.crewCta }].map((item, index) => (
            <GuidanceReveal key={item.href} className="py-9 lg:pe-12 lg:last:pe-0 lg:last:ps-12">
              <h3 className="font-display text-3xl">{item.title}</h3>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#241D17]/80">{item.body}</p>
              {index === 1 && <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#241D17]/70">{system.crewScope}</p>}
              <Button variant="outline-ink" href={getLocalizedPathname(item.href, locale)} trackingLabel="architecture_product_scope" trackingMetadata={{ destination: item.href }} className="mt-6 max-w-full whitespace-normal! text-start">{item.cta}<span aria-hidden="true" className="rtl:rotate-180">→</span></Button>
            </GuidanceReveal>
          ))}
        </div>
        <GuidanceReveal className="mt-8 flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-lg leading-relaxed text-[#241D17]/80">{guidance.bothBody}</p>
          <Button href={getLocalizedPathname('/product', locale)} variant="outline-ink" trackingLabel="architecture_platform_scope" className="max-w-full whitespace-normal! text-start">{guidance.platformCta}<span aria-hidden="true" className="rtl:rotate-180">→</span></Button>
        </GuidanceReveal>
      </div>
    </section>
  );
}
