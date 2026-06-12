'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FadeUp } from '@/components/ui/PageAnimations';
import { MockupFrame } from '@/components/ui/MockupFrame';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { shiftMomentCopy } from './shiftMomentCopy';

/**
 * SIGNATURE INTERACTION - "Watch the night turn".
 *
 * The one screenshot-worthy moment: a scrubbable service-night timeline that
 * makes Sundae's whole thesis tangible. Drag from 5 PM to close; at 7:15 the
 * gap between forecast and actual covers opens up and Sundae surfaces THE
 * signal - the decision you can still act on. A toggle contrasts "the old way"
 * (you read it in tomorrow's report) with "with Sundae" (now, in time).
 *
 * It is the interactive proof of the manifesto + operator-voice copy, and an
 * ownable brand motif reused on the Pulse product page (where it is most
 * literally true). Deterministic story (no random noise), fully keyboard- and
 * screen-reader-accessible (native range + aria-live), reduced-motion safe.
 */

const SIGNAL_T = 135; // 7:15 PM, in minutes from 17:00
const MAX_T = 360; // 11:00 PM

// Designed (not random) service-night curve: forecast vs actual covers/hr + labor%.
const KF: { t: number; fc: number; ac: number; lab: number }[] = [
  { t: 0, fc: 70, ac: 70, lab: 26 },
  { t: 30, fc: 96, ac: 96, lab: 26 },
  { t: 60, fc: 122, ac: 121, lab: 27 },
  { t: 90, fc: 150, ac: 147, lab: 27 },
  { t: 120, fc: 172, ac: 158, lab: 28 },
  { t: 135, fc: 178, ac: 146, lab: 30 },
  { t: 150, fc: 183, ac: 145, lab: 31 },
  { t: 180, fc: 189, ac: 150, lab: 31 },
  { t: 210, fc: 181, ac: 149, lab: 31 },
  { t: 240, fc: 165, ac: 138, lab: 30 },
  { t: 300, fc: 120, ac: 103, lab: 29 },
  { t: 360, fc: 74, ac: 65, lab: 28 },
];

type Frame = { fc: number; ac: number; lab: number };

function interp(t: number): Frame {
  const c = Math.max(0, Math.min(MAX_T, t));
  for (let i = 0; i < KF.length - 1; i++) {
    const a = KF[i];
    const b = KF[i + 1];
    if (c >= a.t && c <= b.t) {
      const r = b.t === a.t ? 0 : (c - a.t) / (b.t - a.t);
      return {
        fc: a.fc + (b.fc - a.fc) * r,
        ac: a.ac + (b.ac - a.ac) * r,
        lab: a.lab + (b.lab - a.lab) * r,
      };
    }
  }
  return { fc: KF[KF.length - 1].fc, ac: KF[KF.length - 1].ac, lab: KF[KF.length - 1].lab };
}

function clock(t: number): string {
  const total = 17 * 60 + Math.round(t);
  let h = Math.floor(total / 60);
  const m = total % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ampm}`;
}

// Sparkline geometry
const W = 320;
const H = 92;
const VMIN = 50;
const VMAX = 200;
const xOf = (t: number) => (t / MAX_T) * W;
const yOf = (v: number) => H - 6 - ((v - VMIN) / (VMAX - VMIN)) * (H - 18);

function linePath(key: 'fc' | 'ac', fromT: number, toT: number): string {
  const pts: string[] = [];
  for (let t = fromT; t <= toT + 0.1; t += 5) {
    const f = interp(t);
    pts.push(`${xOf(t).toFixed(1)} ${yOf(f[key]).toFixed(1)}`);
  }
  return 'M' + pts.join(' L ');
}

function gapPolygon(toT: number): string {
  const fwd: string[] = [];
  const back: string[] = [];
  for (let t = 0; t <= toT + 0.1; t += 5) {
    const f = interp(t);
    fwd.push(`${xOf(t).toFixed(1)} ${yOf(f.ac).toFixed(1)}`);
    back.unshift(`${xOf(t).toFixed(1)} ${yOf(f.fc).toFixed(1)}`);
  }
  return 'M' + fwd.join(' L ') + ' L ' + back.join(' L ') + ' Z';
}

export function SectionShiftMoment({ embedded = false }: { embedded?: boolean }) {
  const { locale } = useWebsiteI18n();
  const copy = shiftMomentCopy[locale as keyof typeof shiftMomentCopy] ?? shiftMomentCopy.en;
  const reduce = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [t, setT] = useState(SIGNAL_T);
  const [mode, setMode] = useState<'sundae' | 'old'>('sundae');
  const [touched, setTouched] = useState(false);

  // Autoplay once into view: sweep from open to 7:15 so the gap "arrives", then
  // hand control to the visitor. Reduced motion / already-touched: stay put.
  useEffect(() => {
    if (!inView || reduce || touched) return;
    let raf = 0;
    const start = performance.now();
    const dur = 2000;
    // First rAF frame seeds t≈0, then eases up to 7:15 (no synchronous setState in the effect body).
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setT(Math.round((SIGNAL_T * eased) / 5) * 5);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, touched]);

  const f = interp(t);
  const pace = Math.round(((f.ac - f.fc) / f.fc) * 100);
  const behind = pace <= -4;
  const laborHot = f.lab >= 29.5;
  const past715 = t >= SIGNAL_T;

  const onScrub = (v: number) => {
    if (!touched) setTouched(true);
    setT(v);
  };

  const dashboard = (
    <div className="px-4 py-4 sm:px-5 sm:py-5">
      {/* Mode toggle */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          {clock(t)}
        </span>
        <div
          role="tablist"
          aria-label="View mode"
          className="inline-flex rounded-full border border-[var(--border-default)] bg-[var(--surface-subtle)] p-0.5 text-[11px] font-semibold"
        >
          {(['sundae', 'old'] as const).map((m) => (
            <button
              key={m}
              role="tab"
              aria-selected={mode === m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-full px-3 py-1 transition-colors ${
                mode === m
                  ? 'bg-[var(--accent-warm)] text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {m === 'sundae' ? copy.withSundae : copy.oldWay}
            </button>
          ))}
        </div>
      </div>

      {/* Metric row */}
      <div className="mb-4 grid grid-cols-3 gap-2.5">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-3 py-2.5">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{copy.paceLabel}</div>
          <div
            className="font-display text-xl font-bold tabular-nums sm:text-2xl"
            style={{ color: behind ? 'var(--accent-warm)' : '#22C55E' }}
          >
            {pace > 0 ? '+' : ''}
            {pace}%
          </div>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-3 py-2.5">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{copy.coversLabel}</div>
          <div className="font-display text-xl font-bold tabular-nums text-[var(--text-primary)] sm:text-2xl">
            {Math.round(f.ac)}
            <span className="text-sm font-medium text-[var(--text-muted)]"> / {Math.round(f.fc)}</span>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-3 py-2.5">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{copy.laborLabel}</div>
          <div
            className="font-display text-xl font-bold tabular-nums sm:text-2xl"
            style={{ color: laborHot ? '#FBBF24' : 'var(--text-primary)' }}
          >
            {f.lab.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Forecast vs actual sparkline */}
      <div className="relative mb-1 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--surface-faint)] p-3">
        <div className="mb-2 flex items-center gap-4 text-[10px] font-medium">
          <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
            <span className="inline-block h-0 w-3 border-t border-dashed border-[var(--text-faint)]" />
            {copy.forecastLabel}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[var(--text-secondary)]">
            <span className="inline-block h-[2px] w-3 rounded-full" style={{ background: 'var(--accent-warm)' }} />
            {copy.actualLabel}
          </span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-24 w-full" aria-hidden>
          {/* gap shading up to current time */}
          <path d={gapPolygon(t)} fill="var(--accent-warm)" opacity={0.12} />
          {/* forecast (dashed, muted, full) */}
          <path d={linePath('fc', 0, MAX_T)} fill="none" stroke="var(--text-faint)" strokeWidth={1.5} strokeDasharray="3 3" />
          {/* actual future (dim) */}
          <path d={linePath('ac', 0, MAX_T)} fill="none" stroke="var(--accent-warm)" strokeWidth={1.5} opacity={0.28} />
          {/* actual past (bright, revealed up to t) */}
          <path d={linePath('ac', 0, t)} fill="none" stroke="var(--accent-warm)" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          {/* 7:15 marker pip on the axis */}
          <line x1={xOf(SIGNAL_T)} y1={0} x2={xOf(SIGNAL_T)} y2={H} stroke="var(--accent-warm)" strokeWidth={0.75} strokeDasharray="2 3" opacity={0.5} />
          {/* current-time marker */}
          <line x1={xOf(t)} y1={0} x2={xOf(t)} y2={H} stroke="var(--text-secondary)" strokeWidth={0.75} opacity={0.5} />
          <circle cx={xOf(t)} cy={yOf(f.ac)} r={3.5} fill="var(--accent-warm)" />
          {past715 && (
            <circle cx={xOf(t)} cy={yOf(f.ac)} r={3.5} fill="none" stroke="var(--accent-warm)" strokeWidth={1}>
              <animate attributeName="r" from="3.5" to="9" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.7" to="0" dur="1.4s" repeatCount="indefinite" />
            </circle>
          )}
        </svg>
      </div>

      {/* Scrubber */}
      <div className="mt-3">
        <input
          type="range"
          min={0}
          max={MAX_T}
          step={5}
          value={t}
          onChange={(e) => onScrub(Number(e.target.value))}
          aria-label={copy.scrubAria}
          aria-valuetext={clock(t)}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--surface-emphasis)] accent-[#FF5C4D]"
          style={{ accentColor: '#FF5C4D' }}
        />
        <div className="mt-1.5 flex items-center justify-between text-[10px] font-medium text-[var(--text-faint)]">
          <span>5 PM</span>
          <span style={{ color: 'var(--accent-warm)' }}>7:15</span>
          <span>Close</span>
        </div>
      </div>

      {/* The decision card - the payoff */}
      <div className="mt-4 min-h-[92px]" aria-live="polite">
        {!past715 ? (
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--text-muted)]">
            {copy.preSignal}
          </div>
        ) : mode === 'sundae' ? (
          <motion.div
            key="sundae"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl border px-4 py-3"
            style={{ borderColor: 'rgba(255,92,77,0.4)', background: 'rgba(255,92,77,0.08)' }}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: 'var(--accent-warm)' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: 'var(--accent-warm)' }}>
                {copy.signalTitle}
              </span>
            </div>
            <p className="text-sm leading-snug text-[var(--text-secondary)]">{copy.signalBody}</p>
            <p className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">{copy.signalAction}</p>
          </motion.div>
        ) : (
          <motion.div
            key="old"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-4 py-3 opacity-90"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--text-faint)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">{copy.oldTitle}</span>
            </div>
            <p className="text-sm leading-snug text-[var(--text-muted)]">{copy.oldBody}</p>
            <p className="mt-1.5 text-sm font-semibold text-[var(--text-supporting)]">{copy.oldAction}</p>
          </motion.div>
        )}
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div ref={ref}>
        <MockupFrame label={copy.frameLabel} glow>
          {dashboard}
        </MockupFrame>
      </div>
    );
  }

  return (
    <section ref={ref} aria-label={copy.eyebrow} className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_30%,rgba(255,92,77,0.06),transparent_62%)]" />
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <FadeUp>
          <div className="max-w-lg">
            <div className="mb-3.5 flex items-center gap-2.5">
              <span aria-hidden className="h-px w-7" style={{ background: 'var(--accent-warm)' }} />
              <span className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: 'var(--accent-warm)' }}>
                {copy.eyebrow}
              </span>
            </div>
            <h2 className="section-h2 text-balance mb-5">{copy.heading}</h2>
            <p className="body-lg max-w-md">{copy.sub}</p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
              <span aria-hidden className="text-[var(--accent-warm)]">&#8596;</span>
              {copy.scrubHint}
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="lg:pl-2">
            <MockupFrame label={copy.frameLabel} glow>
              {dashboard}
            </MockupFrame>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
