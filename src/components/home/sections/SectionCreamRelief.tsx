'use client';

import Image from 'next/image';
import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { motion, animate, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { FadeUp } from '@/components/ui/PageAnimations';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { SundaeWordmark } from './SundaeWordmark';
import { creamReliefCopy, type UnifyVisualCopy } from './creamReliefCopy';

/**
 * Cream "relief" zone - a deliberately light, warm break in the dark scroll.
 *
 * The volume-system "low" beat: after dense, dark product sections the eye gets a
 * breath, a single editorial belief, and three macro "considered detail" frames
 * (the Mews lesson - impact builds in the details). Always cream (theme-independent)
 * so it reads as an intentional warm zone that breaks the monotony in both modes.
 *
 * Variant-driven so the homepage can place more than one beat:
 *  - 'decisions' (early): the "decisions, not dashboards" belief + three macro frames.
 *  - 'truth' (lower-half): the "one source of truth" belief + the animated UnifyVisual.
 *
 * All copy is resolved internally per locale (creamReliefCopy) with an English
 * fallback - no copy is passed via props.
 */

type SignalTone = 'caution' | 'good';

interface TrioItem {
  src: string;
  label: string;
  signal: string;
  cause: string;
  move: string;
  tone: SignalTone;
}

// Tone by frame index: the floor + pass read as live cautions, the room holds.
const TRIO_TONES: [SignalTone, SignalTone, SignalTone] = ['caution', 'caution', 'good'];
const TONE_COLOR: Record<SignalTone, string> = { caution: '#FF8A4C', good: '#46C97E' };

// Dedicated trio slots - independent of every other section's imagery, so these
// three frames can be art-directed for the exact moments (Floor / Pass / Room)
// without touching the hero, proof or closer. Seeded with the current best-fit
// photos; drop a stronger generated/sourced image at the same path to replace a
// frame with zero code changes. See the generation briefs in docs (or the PR).
const TRIO_SRCS: [string, string, string] = [
  '/images/editorial/floor-rush.jpg', // Floor - service in motion, wait time rising
  '/images/editorial/pass-fire.jpg',  // Pass  - the line under heat, fire time slipping
  '/images/editorial/room-glow.jpg',  // Room  - the dining room in service, margin holding
];

const cherry = { color: 'var(--warm-cherry)' } as const;

/**
 * Render an editorial statement that carries a single `*...*` emphasis span,
 * splitting on the marker so the wrapped phrase renders in cherry-italic <em>.
 * The marker convention holds across every locale (see creamReliefCopy).
 */
function renderStatement(statement: string): ReactNode {
  return statement.split(/\*([^*]+)\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="italic" style={cherry}>
        {part}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

export interface CreamReliefProps {
  variant: 'decisions' | 'truth';
  /** Render the "scattered systems → one surface → whole team trusts it" visual. */
  unify?: boolean;
}

export function SectionCreamRelief({ variant, unify = false }: CreamReliefProps) {
  const { locale } = useWebsiteI18n();
  const copy =
    creamReliefCopy[locale as keyof typeof creamReliefCopy] ?? creamReliefCopy.en;
  const variantCopy = copy[variant];
  const unifyCopy = copy.unify;
  // Which frame's receipt is pinned open (mobile tap). Desktop reveals on
  // hover / keyboard focus via CSS; tap pins it so touch users can read it.
  const [openCard, setOpenCard] = useState<number | null>(null);

  const trio: TrioItem[] =
    variant === 'decisions'
      ? variantCopy.trio.map((frame, i) => ({
          src: TRIO_SRCS[i],
          label: frame.label,
          signal: frame.signal,
          cause: frame.cause ?? '',
          move: frame.move ?? '',
          tone: TRIO_TONES[i],
        }))
      : [];

  return (
    <section
      aria-label={variantCopy.eyebrow}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: 'var(--cream)', color: 'var(--ink)' }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 26%, rgba(233,162,74,0.18) 0%, transparent 65%)',
        }}
      />
      {/* seam feathers - melt the top/bottom edges into the (dark or light) page
          bg of the neighbouring sections, so this relief reads as a soft warm
          break in one continuous scroll rather than a hard horizontal cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-16"
        style={{ background: 'linear-gradient(to bottom, color-mix(in srgb, var(--navy-deep) 55%, transparent), transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--navy-deep) 55%, transparent), transparent)' }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <FadeUp>
          <span
            className="mx-auto mb-7 block h-[3px] w-12 rounded-full"
            style={{ background: 'var(--warm-coral)' }}
          />
          <p
            className="mb-5 text-xs font-bold uppercase tracking-[0.2em] sm:text-sm"
            style={cherry}
          >
            {variantCopy.eyebrow}
          </p>
          <h2
            className="font-display mx-auto max-w-3xl text-3xl font-medium leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-[3.25rem]"
            style={{ color: 'var(--ink)' }}
          >
            {renderStatement(variantCopy.statement)}
          </h2>
          <p
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: 'var(--ink-soft, rgba(26,20,15,0.64))' }}
          >
            {variantCopy.lede}
          </p>
        </FadeUp>

        {unify && (
          <FadeUp delay={0.15}>
            <UnifyVisual copy={unifyCopy} />
          </FadeUp>
        )}

        {trio.length > 0 && (
        <>
          {/* Quiet proof line + inline CTA: names exactly what each frame proves -
              a signal, a cause, a next move - while the shift is still live.
              Stacks under the sentence on mobile, sits inline from sm up. */}
          {variantCopy.proof && (
            <FadeUp delay={0.12}>
              <div className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3.5">
                <p className="text-sm font-medium sm:text-[15px]" style={{ color: 'var(--ink-soft, rgba(26,20,15,0.64))' }}>
                  {variantCopy.proof}
                </p>
                <a
                  href="/product/pulse"
                  className="group/cta inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold transition-colors hover:opacity-80"
                  style={{ color: 'var(--warm-coral)' }}
                >
                  {variantCopy.ctaLabel}
                  <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden className="transition-transform duration-300 group-hover/cta:translate-x-0.5">
                    <path d="M3 6h6M6.5 3.5 9 6 6.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </FadeUp>
          )}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {trio.map((t, i) => {
              const isOpen = openCard === i;
              const good = t.tone === 'good';
              return (
              <FadeUp key={t.label} delay={0.08 * (i + 1)}>
                {/* Each frame is a live operating moment, not just atmosphere: the
                    place (Floor / Pass / Room) + the live signal Sundae reads there.
                    Hover / keyboard-focus (desktop) or tap (mobile) reveals the
                    compact "Sundae would flag" receipt - signal, cause, next move -
                    in-card (no modal), so the relief beat stays light. */}
                <button
                  type="button"
                  onClick={() => setOpenCard(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-label={`${t.label} - ${t.signal}. ${variantCopy.viewSignal ?? ''}`}
                  className="group block w-full text-left"
                >
                  <figure className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(26,20,15,0.5)] outline-none ring-2 ring-transparent transition-[box-shadow,transform] duration-300 group-hover:-translate-y-0.5 group-focus-visible:ring-[var(--warm-coral)]">
                    <Image
                      src={t.src}
                      alt={`${t.label} - ${t.signal}`}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                    />
                    {/* warm grade - kept lighter so the photo + overlays stay legible */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-45 mix-blend-soft-light"
                      style={{ background: 'linear-gradient(120deg, rgba(233,162,74,0.45), rgba(255,92,77,0.22))' }}
                    />
                    {/* resting legibility scrim for the label + signal pill */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(18,11,7,0.7) 0%, rgba(18,11,7,0.12) 38%, transparent 62%)' }}
                    />
                    {/* place label - top-left, always visible */}
                    <span
                      className="absolute left-3 top-3 z-20 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.55)' }}
                    >
                      {t.label}
                    </span>
                    {/* resting signal pill - fades out as the receipt reveals */}
                    <span
                      className={`absolute bottom-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0 ${isOpen ? 'opacity-0' : ''}`}
                    >
                      <span aria-hidden className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 motion-reduce:hidden" style={{ background: TONE_COLOR[t.tone] }} />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: TONE_COLOR[t.tone] }} />
                      </span>
                      {t.signal}
                    </span>
                    {/* "View signal" affordance - bottom-right, hints interactivity */}
                    {variantCopy.viewSignal && (
                      <span
                        className={`absolute bottom-3 right-3 z-20 inline-flex items-center gap-1 rounded-full bg-white/[0.14] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0 ${isOpen ? 'opacity-0' : ''}`}
                      >
                        {variantCopy.viewSignal}
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path d="M3 6h6M6.5 3.5 9 6 6.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    {/* RECEIPT reveal - in-card, reads like a receipt not a dashboard.
                        Cream text on a dark panel; coral only for the flag + dot;
                        green only for the "on pace" (good) status headline. */}
                    <div
                      className={`absolute inset-0 z-30 flex flex-col justify-end p-4 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    >
                      <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,9,6,0.93) 0%, rgba(14,9,6,0.8) 46%, rgba(14,9,6,0.42) 100%)' }} />
                      <div className="relative">
                        <span className="mb-2 inline-flex items-center gap-1.5">
                          <span aria-hidden className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 motion-reduce:hidden" style={{ background: 'var(--warm-coral)' }} />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: 'var(--warm-coral)' }} />
                          </span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: 'var(--warm-coral)' }}>
                            {variantCopy.flagLabel}
                          </span>
                        </span>
                        <p className="font-display text-base font-semibold leading-tight sm:text-[17px]" style={{ color: good ? '#84D6A2' : '#FBF6EE' }}>
                          {t.signal}
                        </p>
                        <p className="mt-2 text-[12.5px] leading-snug text-white/85">
                          <span className="font-semibold text-white/55">{variantCopy.causeLabel}: </span>{t.cause}
                        </p>
                        <p className="mt-1 text-[12.5px] leading-snug text-white/85">
                          <span className="font-semibold text-white/55">{variantCopy.moveLabel}: </span>{t.move}
                        </p>
                      </div>
                    </div>
                  </figure>
                </button>
              </FadeUp>
              );
            })}
          </div>
        </>
        )}
      </div>
    </section>
  );
}

/**
 * "One source of truth" visual: scattered systems converge into one Sundae
 * decision surface that the whole team (every role) trusts. Cream-friendly,
 * warm-accented - signifies unification + team trust without a stock photo.
 */
function UnifyVisual({ copy }: { copy: UnifyVisualCopy }) {
  const inputs = [
    copy.inputs.pos,
    copy.inputs.labor,
    copy.inputs.inventory,
    copy.inputs.delivery,
    copy.inputs.reservations,
  ];
  const roles = [
    copy.roles.gm,
    copy.roles.finance,
    copy.roles.headChef,
    copy.roles.owner,
    copy.roles.regional,
  ];
  const [vals, setVals] = useState({ rev: 128, lab: 28.4, mar: 21.2 });
  useEffect(() => {
    const id = setInterval(() => {
      setVals({
        rev: 122 + Math.round(Math.random() * 14),
        lab: Math.round((27.4 + Math.random() * 2) * 10) / 10,
        mar: Math.round((20.4 + Math.random() * 1.8) * 10) / 10,
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);
  const kpiConfig: { label: string; value: number; fmt: (n: number) => string; delta: string }[] = [
    { label: copy.kpis.revenue, value: vals.rev, fmt: (n) => '$' + Math.round(n) + 'k', delta: '+6%' },
    { label: copy.kpis.labor, value: vals.lab, fmt: (n) => n.toFixed(1) + '%', delta: 'on target' },
    { label: copy.kpis.margin, value: vals.mar, fmt: (n) => n.toFixed(1) + '%', delta: '+2.1%' },
  ];
  const xs = [8, 29, 50, 71, 92];
  return (
    <div className="mx-auto mt-14 w-full max-w-xl">
      {/* scattered inputs */}
      <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--ink-faint, rgba(26,20,15,0.42))' }}>
        {copy.scattered}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {inputs.map((x, i) => (
          <motion.span
            key={x}
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-full border px-3 py-1.5 text-xs font-semibold"
            style={{ borderColor: 'rgba(26,20,15,0.14)', color: 'var(--ink-soft, rgba(26,20,15,0.64))', background: 'rgba(255,255,255,0.55)' }}
          >
            {x}
          </motion.span>
        ))}
      </div>

      {/* animated convergence - signals stream into one surface */}
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" aria-hidden className="mx-auto mt-1 h-14 w-full max-w-[300px]">
        {xs.map((x, i) => (
          <line key={'l' + i} x1={x} y1="2" x2="50" y2="44" stroke="rgba(255,92,77,0.28)" strokeWidth="0.5" />
        ))}
        {xs.map((x, i) => (
          <motion.circle
            key={'d' + i}
            r="1.5"
            fill="#FF5C4D"
            initial={{ cx: x, cy: 2, opacity: 0 }}
            animate={{ cx: [x, 50], cy: [2, 44], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity, repeatDelay: 0.5, ease: 'easeIn' }}
          />
        ))}
      </svg>

      {/* one live decision surface */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-md overflow-hidden rounded-2xl border bg-white shadow-[0_30px_60px_-28px_rgba(26,20,15,0.45)]"
        style={{ borderColor: 'rgba(255,92,77,0.3)' }}
      >
        <div className="flex items-center gap-1.5 border-b px-3.5 py-2.5" style={{ borderColor: 'rgba(26,20,15,0.07)', background: 'rgba(255,248,242,0.9)' }}>
          <span className="h-2 w-2 rounded-full" style={{ background: '#FF5C4D' }} />
          <span className="h-2 w-2 rounded-full" style={{ background: '#E9A24A' }} />
          <span className="h-2 w-2 rounded-full" style={{ background: '#F6C66B' }} />
          <span className="ml-2 inline-flex items-center" style={{ color: 'var(--ink)' }}>
            <SundaeWordmark className="h-3.5 w-auto" />
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--warm-cherry)' }}>
            <motion.span className="h-1.5 w-1.5 rounded-full" style={{ background: '#22C55E' }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
            {copy.live}
          </span>
        </div>
        <div className="p-4">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--ink-faint, rgba(26,20,15,0.42))' }}>{copy.decisionSurface}</span>
            <span className="text-[10px] font-semibold" style={{ color: 'var(--warm-coral)' }}>{copy.allOutlets}</span>
          </div>
          <svg viewBox="0 0 200 44" preserveAspectRatio="none" className="mb-3 h-16 w-full" aria-hidden>
            <defs>
              <linearGradient id="uvspark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,92,77,0.22)" />
                <stop offset="100%" stopColor="rgba(255,92,77,0)" />
              </linearGradient>
            </defs>
            <path d="M0 34 L28 30 L56 32 L84 24 L112 26 L140 16 L168 18 L200 8 L200 44 L0 44 Z" fill="url(#uvspark)" />
            <motion.path
              d="M0 34 L28 30 L56 32 L84 24 L112 26 L140 16 L168 18 L200 8"
              fill="none" stroke="#FF5C4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: 'easeOut' }}
            />
            <motion.circle cx="200" cy="8" r="3" fill="#FF5C4D" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.6, repeat: Infinity }} />
          </svg>
          <div className="grid grid-cols-3 gap-2.5 text-center">
            {kpiConfig.map(({ label, value, fmt, delta }) => (
              <div key={label} className="rounded-xl py-3" style={{ background: 'rgba(233,162,74,0.1)' }}>
                <div className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--ink-faint, rgba(26,20,15,0.42))' }}>{label}</div>
                <div className="font-display text-xl font-semibold tabular-nums" style={{ color: 'var(--ink)' }}>
                  <LiveNumber value={value} format={fmt} />
                </div>
                <div className="text-[10px] font-semibold" style={{ color: 'var(--warm-cherry)' }}>{delta}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* whole team trusts it */}
      <p className="mb-2 mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--ink-faint, rgba(26,20,15,0.42))' }}>
        {copy.oneTruth}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {roles.map((r, i) => (
          <motion.span
            key={r}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: 'rgba(255,92,77,0.1)', color: 'var(--ink)' }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="var(--warm-coral)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {r}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/** A number that smoothly animates to its target whenever it changes (live ticker). */
function LiveNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const mv = useMotionValue(value);
  const [display, setDisplay] = useState(() => format(value));
  useMotionValueEvent(mv, 'change', (v) => setDisplay(format(v)));
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.9, ease: 'easeOut' });
    return () => controls.stop();
  }, [value, mv]);
  return <>{display}</>;
}
