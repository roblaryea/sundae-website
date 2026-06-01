import type { Metadata } from "next";
import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/Button';
import { LeadCaptureForm } from '@/components/marketing/LeadCaptureForm';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { getWebsiteMessages, resolveWebsiteLocale } from '@/lib/i18n';
import { PRICING_URL } from '@/lib/links';

export async function generateMetadata(): Promise<Metadata> {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = getWebsiteMessages(locale).pages.demo;
  return {
    title: copy.metadataTitle,
    description: copy.metadataDescription,
  };
}

export default async function DemoPage() {
  const locale = resolveWebsiteLocale(await cookies());
  const copy = getWebsiteMessages(locale).pages.demo;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--electric-blue)] mb-4">{copy.badge}</span>
          <h1 className="hero-h1 text-[var(--text-primary)] mb-6">
            {copy.title}
          </h1>
          <p className="body-xl text-[var(--text-supporting)] mb-8 max-w-3xl mx-auto">
            {copy.description}
          </p>
        </div>
      </section>

      {/* AI Operations Diagnostic — primary path */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[var(--electric-blue)]/15 via-[var(--electric-blue)]/8 to-emerald-500/8 border border-[var(--electric-blue)]/30 p-6 md:p-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--electric-blue)]/15 border border-[var(--electric-blue)]/30 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--electric-blue)]">
              ✦ Recommended · 10 minutes · Premium report
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3 text-balance">
            Want substance before the call?
          </h2>
          <p className="text-base text-[var(--text-supporting)] mb-6 max-w-2xl mx-auto">
            Take the Sundae Operations Diagnostic — 15 strategic questions →
            personalized report showing the margin leaks we&rsquo;d surface, the
            recommended stack, and a 30/60/90 plan. Same outcome as a discovery
            call, on your time, with a shareable artifact at the end.
          </p>
          <a
            href="/diagnostic"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[var(--electric-blue)] to-emerald-500 text-white font-bold rounded-xl shadow-xl shadow-[var(--electric-blue)]/20 hover:shadow-[var(--electric-blue)]/40 transition-all"
          >
            Start your diagnostic
            <span aria-hidden>→</span>
          </a>
          <p className="text-[11px] text-[var(--text-muted)] mt-3">
            No credit card · Output is a directional read, never a promise
          </p>
        </div>
      </section>

      {/* Demo Form */}
      <section id="demo-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] border-b border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              {copy.requestTitle}
            </h2>
            <p className="body-lg text-[var(--text-supporting)]">
              {copy.requestDescription}
            </p>
          </div>

          <LeadCaptureForm
            ctaLabel={copy.ctaLabel}
            defaultMessage={copy.defaultMessage}
          />
        </div>
      </section>

      {/* What You'll See */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              {copy.whatYoullSeeTitle}
            </h2>
            <p className="body-lg text-[var(--text-supporting)]">
              {copy.whatYoullSeeDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {copy.benefits.map((benefit, index: number) => (
              <div key={index} className="bg-[var(--navy-deep)] rounded-2xl p-8 border border-[var(--border-default)] shadow-none">
                <div className="w-12 h-12 mb-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <SundaeIcon name={(index === 0 ? 'canvas' : index === 1 ? 'insights' : 'support') as SundaeIconName} size="lg" className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{benefit.title}</h3>
                <p className="text-sm text-[var(--text-supporting)] mb-5">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.details.map((detail, detailIndex: number) => (
                    <li key={detailIndex} className="flex items-center space-x-2">
                      <span className="text-[var(--text-muted)] text-xs">&#10003;</span>
                      <span className="text-[var(--text-supporting)] text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Operators Take the Call */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              {copy.whyOperatorsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {copy.stats.map((item, i: number) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-[var(--surface-faint)] border border-[var(--border-default)]">
                <span className="text-lg font-bold text-[var(--text-primary)] whitespace-nowrap">{item.stat}</span>
                <span className="text-sm text-[var(--text-supporting)]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] text-[var(--text-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            {copy.ctaTitle}
          </h2>
          <p className="body-xl mb-8 text-[var(--text-muted)]">
            {copy.ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#demo-form" className="w-full sm:w-auto">
              <Button variant="cta" size="lg" className="w-full sm:w-auto">
                {copy.bookDemo}
              </Button>
            </Link>
            <a href={PRICING_URL}>
              <Button variant="outline-light" size="lg">
                {copy.viewPricing}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
