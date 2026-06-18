'use client';

import Image from 'next/image';
import { Fragment, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { manifestoCopy, manifestoMoments } from './manifestoCopy';

// The three live moments of a service night slipping - locale-invariant times,
// localized status text (manifestoMoments). They accumulate, then the signal arrives.
const MOMENT_TIMES = ['7:15 PM', '7:22 PM', '7:31 PM'] as const;

/**
 * Manifesto - the "belief beat" that opens the page after the hero.
 *
 * The category-leader move (USHG: "Extending Enlightened Hospitality is at the
 * heart of everything we do"): state what you believe, large and copy-first,
 * before the product earns its place. Deliberately type-led with generous air -
 * no product UI, no imagery, so it reads as conviction, not a feature.
 */

// Theme-aware coral: --accent-warm is the bright coral (#FF5C4D) in dark and a
// deeper coral (#C8392A) in light, so accent text stays crisp on white.
const coral = { color: 'var(--accent-warm)' } as const;

/** Split on the `*…*` emphasis marker → warm-coral italic span (shared convention). */
function renderStatement(statement: string): ReactNode {
  return statement.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="not-italic font-medium" style={coral}>
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export function SectionManifesto() {
  const { locale } = useWebsiteI18n();
  const copy = manifestoCopy[locale as keyof typeof manifestoCopy] ?? manifestoCopy.en;
  const mm = manifestoMoments[locale as keyof typeof manifestoMoments] ?? manifestoMoments.en!;

  return (
    <section
      aria-label={copy.eyebrow}
      className="relative overflow-hidden border-y border-[var(--border-default)] py-24 sm:py-32"
    >
      {/* Subtle dark restaurant backdrop - the belief sits over the room. Dark-mode
          only (hidden in light) so the light theme stays clean; heavily darkened so
          the type always leads. */}
      <div aria-hidden className="absolute inset-0 [html.light_&]:hidden">
        <Image
          src="/images/editorial/dining-night.jpg"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover object-center opacity-[0.16]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 38%, color-mix(in srgb, var(--navy-deep) 55%, transparent) 0%, var(--navy-deep) 78%)',
          }}
        />
      </div>
      {/* Quiet warm radial - same family as the hero glow, dialed back so the type leads. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 32%, rgba(255,92,77,0.07) 0%, transparent 62%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <FadeUp>
          <span
            aria-hidden
            className="mx-auto mb-8 block h-px w-12"
            style={{ background: 'var(--accent-warm)' }}
          />
          <p className="mb-7 text-xs font-bold uppercase tracking-[0.22em] sm:text-sm" style={coral}>
            {copy.eyebrow}
          </p>
          <p className="font-display text-[1.65rem] font-medium leading-[1.22] tracking-[-0.02em] text-[var(--text-primary)] text-balance sm:text-3xl lg:text-[2.75rem] lg:leading-[1.18]">
            {renderStatement(copy.statement)}
          </p>
          <p className="mx-auto mt-9 max-w-2xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
            {copy.coda}
          </p>
        </FadeUp>

        {/* The night slipping - three quiet live moments, accumulating in sequence. */}
        <div className="mx-auto mt-12 flex max-w-xs flex-col gap-2.5 sm:mt-14">
          {mm.moments.map((text, i) => (
            <motion.div
              key={text}
              className="flex items-center gap-3 text-left"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.15 + i * 0.22, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-[12px] tabular-nums text-[var(--text-muted)]">
                {MOMENT_TIMES[i]}
              </span>
              <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-[#FF8A4C]" />
              <span className="text-sm text-[var(--text-secondary)]">{text}</span>
            </motion.div>
          ))}
        </div>

        {/* The hand-off into the night-turn section. */}
        <motion.p
          className="mt-9 font-display text-lg font-medium sm:text-xl"
          style={coral}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.15 + mm.moments.length * 0.22 + 0.1, duration: 0.7 }}
        >
          {mm.bridge}
        </motion.p>
      </div>
    </section>
  );
}
