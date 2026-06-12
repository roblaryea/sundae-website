'use client';

import { FadeUp } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { ecosystemCopy, POS_SYSTEMS } from './ecosystemCopy';

/**
 * Ecosystem strip — quiet external-credibility, the USHG "badge" move done
 * honestly. Names ONLY the Live POS connectors (verbatim from /integrations)
 * and labels the rest explicitly as roadmap, so nothing reads as shipped that
 * is still "Upcoming".
 *
 * Deliberately restrained and monochrome: it pairs above the enterprise
 * TrustStrip as a combined credibility zone, and never competes with the
 * product sections for attention.
 */
export function SectionEcosystemStrip() {
  const { locale } = useWebsiteI18n();
  const copy = ecosystemCopy[locale as keyof typeof ecosystemCopy] ?? ecosystemCopy.en;

  return (
    <section aria-label={copy.eyebrow} className="relative px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeUp className="text-center">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {copy.eyebrow}
          </p>

          {/* Live POS connectors — accurate, named wordmarks. */}
          <div className="mb-3 flex items-center justify-center gap-2">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7FB98A]">
              {copy.liveLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2.5 sm:gap-x-4">
            {POS_SYSTEMS.map((name) => (
              <span
                key={name}
                className="font-display rounded-xl border border-[var(--border-default)] bg-white/[0.025] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:border-[rgba(255,92,77,0.25)] hover:text-[var(--text-primary)]"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Roadmap — honestly framed as not-yet-live. */}
          <div className="mt-8">
            <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-faint)]">
              {copy.roadmapLabel}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
              {copy.roadmap.map((label, i) => (
                <span key={label} className="flex items-center gap-x-3 text-xs font-medium text-[var(--text-muted)]">
                  {i > 0 && <span aria-hidden className="text-[var(--text-faint)]">·</span>}
                  {label}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
