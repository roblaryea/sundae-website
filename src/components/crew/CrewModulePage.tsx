'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { FadeUp } from '@/components/ui/PageAnimations';
import { CreamBreak } from '@/components/ui/CreamBreak';
import { SundaeIcon } from '@/components/icons';
import { REPORT_APP_URL } from '@/lib/urls';
import { CREW_MODULES, type CrewModuleSlug } from './crewModules';

export type CrewModuleCopy = {
  badge: string;
  heroLine1: string;
  heroLine2: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  heroProof: { value: string; label: string }[];

  featuresEyebrow: string;
  featuresTitle: string;
  featuresDescription: string;
  features: { title: string; body: string; chips: string[] }[];

  howEyebrow: string;
  howTitle: string;
  howSteps: { title: string; body: string }[];

  loopLine: string;

  creamEyebrow: string;
  creamStatement: string;
  creamLede: string;

  relatedEyebrow: string;
  relatedTitle: string;

  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const fade = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
const ease = [0.22, 1, 0.36, 1] as const;

export function CrewModulePage({
  slug,
  copy,
  heroVisual,
}: {
  slug: CrewModuleSlug;
  copy: CrewModuleCopy;
  heroVisual: ReactNode;
}) {
  const related = CREW_MODULES.filter((m) => m.slug !== slug);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--navy-deep)]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,92,77,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-texture opacity-60" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.82fr)] lg:gap-14">
          <div>
            <motion.div {...fade} transition={{ duration: 0.7, ease }} className="mb-5">
              <Link
                href="/crew"
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,92,77,0.2)] bg-[rgba(255,92,77,0.12)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#FF8473] transition-colors hover:bg-[rgba(255,92,77,0.18)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF8473]" />
                {copy.badge}
              </Link>
            </motion.div>
            <motion.h1 {...fade} transition={{ duration: 0.8, ease, delay: 0.1 }} className="hero-h1 mb-6 text-balance">
              <span className="bg-gradient-to-b from-[var(--text-primary)] to-[var(--text-primary)]/80 bg-clip-text text-transparent">
                {copy.heroLine1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#FF8473] via-[var(--text-primary)] to-[#FFB59E] bg-clip-text text-transparent">
                {copy.heroLine2}
              </span>
            </motion.h1>
            <motion.p {...fade} transition={{ duration: 0.8, ease, delay: 0.2 }} className="body-xl mb-8 max-w-xl">
              {copy.description}
            </motion.p>
            <motion.div {...fade} transition={{ duration: 0.8, ease, delay: 0.3 }} className="flex flex-col gap-3 sm:flex-row">
              <Link href="/demo"><Button variant="primary" size="lg">{copy.primaryCta}</Button></Link>
              <a href={REPORT_APP_URL}><Button variant="outline-light" size="lg">{copy.secondaryCta}</Button></a>
            </motion.div>
            <motion.div {...fade} transition={{ duration: 0.8, ease, delay: 0.45 }} className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              {copy.heroProof.map((p) => (
                <div key={p.label} className="rounded-xl border border-[var(--border-default)] bg-white/[0.04] px-3 py-3">
                  <div className="text-2xl font-bold leading-none text-[var(--text-primary)] sm:text-[26px]">{p.value}</div>
                  <div className="mt-1 text-[11px] leading-tight text-[var(--text-muted)]">{p.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease, delay: 0.35 }} className="flex justify-center lg:justify-end">
            {heroVisual}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-mesh" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <FadeUp className="mx-auto mb-14 max-w-3xl text-center">
            <p className="eyebrow mb-4">{copy.featuresEyebrow}</p>
            <h2 className="section-h2 mb-5 text-balance">{copy.featuresTitle}</h2>
            <p className="body-lg mx-auto max-w-2xl">{copy.featuresDescription}</p>
          </FadeUp>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {copy.features.map((f) => (
              <FadeUp key={f.title}>
                <div className="h-full rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6">
                  <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">{f.title}</h3>
                  <p className="body-base mb-4">{f.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {f.chips.map((c) => (
                      <span key={c} className="rounded-full border border-[#1AA877]/30 bg-[#1AA877]/12 px-2.5 py-1 text-[11px] font-semibold text-[#1AA877] [html.light_&]:text-[#0F8A5E]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative z-10 mx-auto max-w-6xl">
          <FadeUp className="mx-auto mb-14 max-w-3xl text-center">
            <p className="eyebrow mb-4">{copy.howEyebrow}</p>
            <h2 className="section-h2 text-balance">{copy.howTitle}</h2>
          </FadeUp>
          <div className="grid gap-5 md:grid-cols-3">
            {copy.howSteps.map((s, i) => (
              <FadeUp key={s.title}>
                <div className="h-full rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5C4D] to-[#E9A24A] text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-[var(--text-primary)]">{s.title}</h3>
                  <p className="body-base">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-xl font-light italic text-[var(--text-primary)] sm:text-2xl">
            {copy.loopLine}
          </p>
        </div>
      </section>

      <CreamBreak eyebrow={copy.creamEyebrow} statement={copy.creamStatement} lede={copy.creamLede} />

      {/* ── Related modules ── */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-mesh" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <FadeUp className="mb-10 text-center">
            <p className="eyebrow mb-4">{copy.relatedEyebrow}</p>
            <h2 className="section-h2 text-balance">{copy.relatedTitle}</h2>
          </FadeUp>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((m) => (
              <Link
                key={m.slug}
                href={m.href}
                className="group rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-5 transition-all hover:border-[var(--warm-coral)]/40 hover:bg-[var(--surface-hover)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(255,92,77,0.12)]">
                  <SundaeIcon name={m.icon} size="sm" className="text-[#FF8473]" />
                </div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">{m.name}</div>
                <div className="mt-1 text-xs text-[var(--text-muted)]">{m.tagline}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,92,77,0.14),transparent_65%)]" />
        <FadeUp className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-4">{copy.ctaEyebrow}</p>
          <h2 className="section-h2 mb-5 text-balance">{copy.ctaTitle}</h2>
          <p className="body-lg mx-auto mb-8 max-w-2xl">{copy.ctaDescription}</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/demo"><Button variant="primary" size="lg">{copy.ctaPrimary}</Button></Link>
            <Link href="/crew"><Button variant="outline-light" size="lg">{copy.ctaSecondary}</Button></Link>
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
