'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FadeUp } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { ecosystemCopy, CONNECTORS } from './ecosystemCopy';

/**
 * Ecosystem strip - quiet external-credibility, the USHG "badge" move done
 * honestly. Every connector named here is LIVE today (source of truth:
 * /integrations, all status "Live") across ten operational domains, so the
 * strip shows the real breadth of the stack Sundae plugs into rather than a
 * roadmap.
 *
 * Two opposing marquee rows of real connector wordmarks convey breadth without
 * stamping a count; they pause for prefers-reduced-motion (static wrap) and are
 * aria-hidden, with an sr-only list naming the connectors once for assistive
 * tech. Deliberately restrained and monochrome: it pairs above the enterprise
 * TrustStrip as a combined credibility zone.
 */
function ConnectorChip({ name }: { name: string }) {
  return (
    <span className="font-display shrink-0 whitespace-nowrap rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)]">
      {name}
    </span>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: readonly string[];
  reverse?: boolean;
  duration: number;
}) {
  // Duplicate the row so the -50% translation loops seamlessly.
  const seq = [...items, ...items];
  return (
    <div
      aria-hidden
      dir="ltr"
      className="relative overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
    >
      <motion.div
        className="flex w-max gap-3"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {seq.map((name, i) => (
          <ConnectorChip key={`${name}-${i}`} name={name} />
        ))}
      </motion.div>
    </div>
  );
}

export function SectionEcosystemStrip() {
  const { locale } = useWebsiteI18n();
  const reduceMotion = useReducedMotion();
  const copy = ecosystemCopy[locale as keyof typeof ecosystemCopy] ?? ecosystemCopy.en;

  const mid = Math.ceil(CONNECTORS.length / 2);
  const rowA = CONNECTORS.slice(0, mid);
  const rowB = CONNECTORS.slice(mid);

  return (
    <section aria-label={copy.eyebrow} className="relative px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <FadeUp className="text-center">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {copy.eyebrow}
          </p>

          {/* Live pill - present tense; everything below is shipped, not roadmap. */}
          <div className="mb-6 flex items-center justify-center gap-2">
            <span aria-hidden className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7FB98A]">
              {copy.liveLabel}
            </span>
          </div>
        </FadeUp>

        {/* Connector breadth - every wordmark is a Live /integrations connector. */}
        {reduceMotion ? (
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {CONNECTORS.map((name) => (
              <ConnectorChip key={name} name={name} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <MarqueeRow items={rowA} duration={46} />
            <MarqueeRow items={rowB} reverse duration={52} />
          </div>
        )}

        {/* sr-only inventory so the marquee's meaning reaches assistive tech once. */}
        <p className="sr-only">{CONNECTORS.join(', ')}</p>

        {/* Domain breadth - all live across the operational stack. */}
        <FadeUp className="mt-9 text-center">
          <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            {copy.stackLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
            {copy.domains.map((label, i) => (
              <span key={label} className="flex items-center gap-x-3 text-xs font-medium text-[var(--text-muted)]">
                {i > 0 && <span aria-hidden className="text-[var(--text-faint)]">·</span>}
                {label}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
