'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { FadeUp } from '@/components/ui/PageAnimations';
import { SundaeWordmark } from './SundaeWordmark';

/**
 * Cream "relief" zone — a deliberately light, warm break in the dark scroll.
 *
 * The volume-system "low" beat: after dense, dark product sections the eye gets a
 * breath, a single editorial belief, and three macro "considered detail" frames
 * (the Mews lesson — impact builds in the details). Always cream (theme-independent)
 * so it reads as an intentional warm zone that breaks the monotony in both modes.
 *
 * Prop-driven so the homepage can place more than one beat (early + lower-half)
 * with distinct copy + imagery, keeping warmth distributed across the long page.
 */
interface TrioItem {
  src: string;
  cap: string;
}

export interface CreamReliefProps {
  /** aria-label for the section. */
  label?: string;
  eyebrow?: string;
  /** The big editorial belief (ReactNode so it can carry <em> accents). */
  statement?: ReactNode;
  lede?: string;
  /** Three macro frames. */
  trio?: TrioItem[];
  /** Render the "scattered systems → one surface → whole team trusts it" visual. */
  unify?: boolean;
}

const DEFAULT_TRIO: TrioItem[] = [
  { src: '/images/editorial/plating.jpg', cap: 'The plate' },
  { src: '/images/editorial/kitchen-flame.jpg', cap: 'The line' },
  { src: '/images/editorial/service-warm.jpg', cap: 'The room' },
];

const cherry = { color: 'var(--warm-cherry)' } as const;

const DEFAULT_STATEMENT: ReactNode = (
  <>
    Every plate, every cover, every shift is a{' '}
    <em className="italic" style={cherry}>
      decision.
    </em>{' '}
    Sundae is in all of them — with you, on the floor.
  </>
);

export function SectionCreamRelief({
  label = 'Decisions, not dashboards',
  eyebrow = 'Decisions, not dashboards',
  statement = DEFAULT_STATEMENT,
  lede = 'The work happens on the line, not in a dashboard. Sundae turns the live shift into the next right move — for the person who has to make it.',
  trio = DEFAULT_TRIO,
  unify = false,
}: CreamReliefProps = {}) {
  return (
    <section
      aria-label={label}
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
            {eyebrow}
          </p>
          <h2
            className="font-display mx-auto max-w-3xl text-3xl font-medium leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-[3.25rem]"
            style={{ color: 'var(--ink)' }}
          >
            {statement}
          </h2>
          <p
            className="mx-auto mt-7 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: 'var(--ink-soft, rgba(26,20,15,0.64))' }}
          >
            {lede}
          </p>
        </FadeUp>

        {unify && (
          <FadeUp delay={0.15}>
            <UnifyVisual />
          </FadeUp>
        )}

        {trio.length > 0 && (
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {trio.map((t, i) => (
            <FadeUp key={t.cap} delay={0.08 * (i + 1)}>
              <figure className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_24px_48px_-24px_rgba(26,20,15,0.5)]">
                  <Image
                    src={t.src}
                    alt={t.cap}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-70 mix-blend-soft-light"
                    style={{
                      background:
                        'linear-gradient(120deg, rgba(233,162,74,0.45), rgba(255,92,77,0.22))',
                    }}
                  />
                </div>
                <figcaption
                  className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
                  style={{ color: 'var(--ink-faint, rgba(26,20,15,0.42))' }}
                >
                  {t.cap}
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

/**
 * "One source of truth" visual: scattered systems converge into one Sundae
 * decision surface that the whole team (every role) trusts. Cream-friendly,
 * warm-accented — signifies unification + team trust without a stock photo.
 */
function UnifyVisual() {
  const inputs = ['POS', 'Labor', 'Inventory', 'Delivery', 'Reservations'];
  const roles = ['GM', 'Finance', 'Head chef', 'Owner', 'Regional'];
  return (
    <div className="mx-auto mt-14 w-full max-w-xl">
      <p
        className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: 'var(--ink-faint, rgba(26,20,15,0.42))' }}
      >
        Your systems, scattered
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {inputs.map((x) => (
          <span
            key={x}
            className="rounded-full border px-3 py-1.5 text-xs font-semibold"
            style={{
              borderColor: 'rgba(26,20,15,0.14)',
              color: 'var(--ink-soft, rgba(26,20,15,0.64))',
              background: 'rgba(255,255,255,0.55)',
            }}
          >
            {x}
          </span>
        ))}
      </div>

      <svg
        viewBox="0 0 100 34"
        preserveAspectRatio="none"
        aria-hidden
        className="mx-auto my-2 h-9 w-full max-w-[260px]"
      >
        {[8, 29, 50, 71, 92].map((x, i) => (
          <line key={i} x1={x} y1="1" x2="50" y2="33" stroke="rgba(255,92,77,0.5)" strokeWidth="0.7" />
        ))}
      </svg>

      <div
        className="mx-auto max-w-sm rounded-2xl border bg-white p-4 shadow-[0_24px_48px_-24px_rgba(26,20,15,0.4)]"
        style={{ borderColor: 'rgba(255,92,77,0.3)' }}
      >
        <div
          className="flex items-center justify-between border-b pb-3"
          style={{ borderColor: 'rgba(26,20,15,0.08)' }}
        >
          <span className="inline-flex items-center" style={{ color: 'var(--ink)' }}>
            <SundaeWordmark className="h-[14px] w-auto" />
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: 'var(--warm-cherry)' }}
          >
            One decision surface
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          {['Revenue', 'Labor', 'Margin'].map((k) => (
            <div key={k} className="rounded-lg py-2.5" style={{ background: 'rgba(233,162,74,0.12)' }}>
              <div className="text-xs font-semibold" style={{ color: 'var(--ink)' }}>{k}</div>
              <div className="text-[9px] uppercase tracking-wider" style={{ color: 'var(--ink-faint, rgba(26,20,15,0.42))' }}>
                one source
              </div>
            </div>
          ))}
        </div>
      </div>

      <p
        className="mb-2 mt-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: 'var(--ink-faint, rgba(26,20,15,0.42))' }}
      >
        One truth, the whole team
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {roles.map((r) => (
          <span
            key={r}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
            style={{ background: 'rgba(255,92,77,0.10)', color: 'var(--ink)' }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 6.5l2.5 2.5 4.5-5" stroke="var(--warm-coral)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}
