'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSettledReducedMotion as useReducedMotion } from "@/lib/useSettledReducedMotion";
import { FadeUp } from '@/components/ui/PageAnimations';
import { MockupFrame } from '@/components/ui/MockupFrame';
import { useWebsiteI18n } from '@/components/i18n/LocaleProvider';
import { shiftMomentCopy } from './shiftMomentCopy';

/**
 * SIGNATURE INTERACTION - "Catch the night turning".
 *
 * A service night that PLAYS: the playhead advances from 5 PM to close, and at
 * 7:15 the forecast-vs-actual gap opens. The two modes then tell genuinely
 * different stories - "With Sundae" you got the signal at 7:15 and acted, so the
 * actual line RECOVERS toward forecast; "The old way" you only read it in
 * tomorrow's report, so the night stays behind. A "Projected close" readout
 * makes the outcome difference explicit.
 *
 * The visitor can also drag the scrubber at any time to step into the night
 * themselves (drag pauses the autoplay). Deterministic story, keyboard- and
 * screen-reader-accessible (native range + aria-live), reduced-motion safe.
 */

const SIGNAL_T = 135; // 7:15 PM, minutes from 17:00
const MAX_T = 360; // 11:00 PM
const DURATION = 8500; // full-night autoplay, ms

// Designed (not random) night. acO = "old way" actual (stays behind after 7:15);
// acS = "with Sundae" actual (recovers, because you acted on the 7:15 signal).
const KF: { t: number; fc: number; acO: number; acS: number; labO: number; labS: number }[] = [
  { t: 0, fc: 70, acO: 70, acS: 70, labO: 26, labS: 26 },
  { t: 30, fc: 96, acO: 96, acS: 96, labO: 26, labS: 26 },
  { t: 60, fc: 122, acO: 121, acS: 121, labO: 27, labS: 27 },
  { t: 90, fc: 150, acO: 147, acS: 147, labO: 27, labS: 27 },
  { t: 120, fc: 172, acO: 158, acS: 158, labO: 28, labS: 28 },
  { t: 135, fc: 178, acO: 146, acS: 146, labO: 30, labS: 30 },
  { t: 150, fc: 183, acO: 145, acS: 147, labO: 31, labS: 31 },
  { t: 180, fc: 189, acO: 150, acS: 171, labO: 31, labS: 30 },
  { t: 210, fc: 181, acO: 146, acS: 172, labO: 32, labS: 29 },
  { t: 240, fc: 165, acO: 136, acS: 158, labO: 32, labS: 28.5 },
  { t: 300, fc: 120, acO: 99, acS: 115, labO: 31, labS: 28 },
  { t: 360, fc: 74, acO: 62, acS: 71, labO: 30, labS: 28 },
];

type Frame = { fc: number; acO: number; acS: number; labO: number; labS: number };

function interp(t: number): Frame {
  const c = Math.max(0, Math.min(MAX_T, t));
  for (let i = 0; i < KF.length - 1; i++) {
    const a = KF[i];
    const b = KF[i + 1];
    if (c >= a.t && c <= b.t) {
      const r = b.t === a.t ? 0 : (c - a.t) / (b.t - a.t);
      const lerp = (x: number, y: number) => x + (y - x) * r;
      return {
        fc: lerp(a.fc, b.fc),
        acO: lerp(a.acO, b.acO),
        acS: lerp(a.acS, b.acS),
        labO: lerp(a.labO, b.labO),
        labS: lerp(a.labS, b.labS),
      };
    }
  }
  const last = KF[KF.length - 1];
  return { fc: last.fc, acO: last.acO, acS: last.acS, labO: last.labO, labS: last.labS };
}

function clock(t: number): string {
  const total = 17 * 60 + Math.round(t);
  let h = Math.floor(total / 60);
  const m = total % 60;
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ampm}`;
}

// Chart geometry
const W = 720;
const H = 300;
const PADT = 36; // headroom for the 7:15 pill
const PADB = 22;
const VMIN = 40;
const VMAX = 200;
const xOf = (t: number) => (t / MAX_T) * W;
const yOf = (v: number) => PADT + (1 - (v - VMIN) / (VMAX - VMIN)) * (H - PADT - PADB);

function samplePts(getV: (f: Frame) => number, fromT: number, toT: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let t = fromT; t < toT; t += 7.5) pts.push([xOf(t), yOf(getV(interp(t)))]);
  pts.push([xOf(toT), yOf(getV(interp(toT)))]);
  return pts;
}
// Catmull-Rom → cubic Bézier for smooth lines.
function smoothPath(getV: (f: Frame) => number, fromT: number, toT: number): string {
  const pts = samplePts(getV, fromT, toT);
  if (pts.length < 2) return '';
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d;
}
function smoothArea(getV: (f: Frame) => number, fromT: number, toT: number): string {
  const line = smoothPath(getV, fromT, toT);
  if (!line) return '';
  return `${line} L${xOf(toT).toFixed(1)},${(H - PADB).toFixed(1)} L${xOf(fromT).toFixed(1)},${(H - PADB).toFixed(1)} Z`;
}

export function SectionShiftMoment({ embedded = false }: { embedded?: boolean }) {
  const { locale } = useWebsiteI18n();
  const copy = shiftMomentCopy[locale as keyof typeof shiftMomentCopy] ?? shiftMomentCopy.en;
  const en = shiftMomentCopy.en;
  const reduce = useReducedMotion();

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [t, setT] = useState(reduce ? SIGNAL_T : 0);
  const [mode, setMode] = useState<'sundae' | 'old'>('sundae');
  const [paused, setPaused] = useState(false);
  // tRef holds the live playhead position for the rAF loop; it is mutated only
  // in callbacks (the tick + scrub/replay handlers), never during render.
  const tRef = useRef(t);

  // The night plays itself once in view. The loop runs only while not paused
  // (paused is a dep), advancing the playhead and stopping at close. No ref
  // writes or setState in the effect body - only inside the rAF callback.
  useEffect(() => {
    if (!inView || reduce || paused) return;
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (!last) last = now;
      const dt = now - last;
      last = now;
      const next = Math.min(MAX_T, tRef.current + dt * (MAX_T / DURATION));
      tRef.current = next;
      setT(next);
      if (next >= MAX_T) {
        setPaused(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, paused]);

  const f = interp(t);
  const actual = mode === 'sundae' ? f.acS : f.acO;
  const labor = mode === 'sundae' ? f.labS : f.labO;
  const getActual = (fr: Frame) => (mode === 'sundae' ? fr.acS : fr.acO);
  const getGhost = (fr: Frame) => (mode === 'sundae' ? fr.acO : fr.acS);
  const activeColor = mode === 'sundae' ? '#22C55E' : '#FF5450';
  const ghostColor = mode === 'sundae' ? '#FF5450' : '#22C55E';
  const pace = Math.round(((actual - f.fc) / f.fc) * 100);
  const behind = pace <= -4;
  const laborHot = labor >= 29.5;
  const past715 = t >= SIGNAL_T;
  const nearClose = t >= 240;
  const atEnd = t >= MAX_T - 0.5;

  // Explicit outcome: where the night lands for the current choice.
  const closeF = interp(MAX_T);
  const closePace = Math.round((((mode === 'sundae' ? closeF.acS : closeF.acO) - closeF.fc) / closeF.fc) * 100);
  const closeGood = closePace >= -6;

  const onScrub = (v: number) => {
    setPaused(true);
    tRef.current = v;
    setT(v);
  };
  const togglePlay = () => {
    if (atEnd) {
      tRef.current = 0;
      setT(0);
      setPaused(false);
    } else {
      setPaused((p) => !p);
    }
  };

  const dashboard = (
    <div className="px-4 py-4 sm:px-5 sm:py-5">
      {/* Header: clock + projected close + mode toggle */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)] tabular-nums">
            {clock(t)}
          </span>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              color: closeGood ? '#22C55E' : 'var(--accent-warm)',
              background: closeGood ? 'rgba(34,197,94,0.12)' : 'rgba(255,92,77,0.12)',
            }}
          >
            {copy.projectedClose ?? en.projectedClose} {closePace > 0 ? '+' : ''}
            {closePace}%
          </span>
        </div>
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
              className={`rounded-full px-3 py-1 font-semibold transition-colors ${
                mode === m ? 'text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              style={mode === m ? { background: m === 'sundae' ? '#22C55E' : '#FF5450' } : undefined}
            >
              {m === 'sundae' ? copy.withSundae : copy.oldWay}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="mb-4 grid grid-cols-3 gap-2.5">
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-3 py-2.5">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{copy.paceLabel}</div>
          <div className="font-display text-xl font-bold tabular-nums sm:text-2xl" style={{ color: behind ? 'var(--accent-warm)' : '#22C55E' }}>
            {pace > 0 ? '+' : ''}
            {pace}%
          </div>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-3 py-2.5">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{copy.coversLabel}</div>
          <div className="font-display text-xl font-bold tabular-nums text-[var(--text-primary)] sm:text-2xl">
            {Math.round(actual)}
            <span className="text-sm font-medium text-[var(--text-muted)]"> / {Math.round(f.fc)}</span>
          </div>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-3 py-2.5">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{copy.laborLabel}</div>
          <div className="font-display text-xl font-bold tabular-nums sm:text-2xl" style={{ color: laborHot ? '#FBBF24' : '#22C55E' }}>
            {labor.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Sparkline: forecast vs actual, with the path-not-taken as a faint ghost */}
      <div className="relative mb-1 overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--surface-faint)] p-3">
        <div className="mb-2 flex items-center gap-4 text-[10px] font-medium">
          <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
            <span className="inline-block h-0 w-3 border-t border-dashed border-[var(--text-faint)]" />
            {copy.forecastLabel}
          </span>
          <span className="inline-flex items-center gap-1.5" style={{ color: activeColor }}>
            <span className="inline-block h-[3px] w-3 rounded-full" style={{ background: activeColor }} />
            {copy.actualLabel}
          </span>
        </div>
        <div className="relative h-44 w-full">
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="sm-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={activeColor} stopOpacity={0.28} />
                <stop offset="70%" stopColor={activeColor} stopOpacity={0.05} />
                <stop offset="100%" stopColor={activeColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* gridlines */}
            {[80, 120, 160].map((v) => (
              <line key={v} x1={0} y1={yOf(v)} x2={W} y2={yOf(v)} stroke="var(--text-faint)" strokeWidth={1} opacity={0.5} />
            ))}
            {/* area under the revealed active line */}
            <path d={smoothArea(getActual, 0, Math.max(1, t))} fill="url(#sm-area)" />
            {/* forecast reference (dashed, full) */}
            <path d={smoothPath((fr) => fr.fc, 0, MAX_T)} fill="none" stroke="var(--text-muted)" strokeWidth={1.6} strokeDasharray="3 6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {/* the path not taken (other mode), faint */}
            <path d={smoothPath(getGhost, 0, MAX_T)} fill="none" stroke={ghostColor} strokeWidth={1.4} opacity={0.3} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {/* active line: future dim, past bright */}
            <path d={smoothPath(getActual, 0, MAX_T)} fill="none" stroke={activeColor} strokeWidth={1.6} opacity={0.25} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <path d={smoothPath(getActual, 0, Math.max(1, t))} fill="none" stroke={activeColor} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            {/* 7:15 signal + playhead verticals */}
            <line x1={xOf(SIGNAL_T)} y1={PADT - 8} x2={xOf(SIGNAL_T)} y2={H - PADB} stroke="#FF5C4D" strokeWidth={1} strokeDasharray="2 4" opacity={0.6} />
            <line x1={xOf(t)} y1={PADT - 8} x2={xOf(t)} y2={H - PADB} stroke="var(--text-secondary)" strokeWidth={1} opacity={0.45} />
          </svg>
          {/* crisp overlays (not stretched by the SVG) */}
          <span
            className="pointer-events-none absolute -translate-x-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold leading-none"
            style={{ left: `${(SIGNAL_T / MAX_T) * 100}%`, top: 2, background: '#FF5C4D', color: '#15110D' }}
          >
            7:15
          </span>
          <span
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${(xOf(t) / W) * 100}%`, top: `${(yOf(actual) / H) * 100}%`, width: 20, height: 20, background: activeColor, opacity: 0.18 }}
          />
          <span
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${(xOf(t) / W) * 100}%`, top: `${(yOf(actual) / H) * 100}%`, width: 10, height: 10, background: activeColor, boxShadow: `0 0 10px ${activeColor}` }}
          />
        </div>
      </div>

      {/* Transport: play / pause / replay + scrubber (drag to step in any time) */}
      <div className="mt-3 flex items-center gap-3">
        {!reduce && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={atEnd ? 'Replay the night' : paused ? 'Play the night' : 'Pause'}
            className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
            style={{ background: 'var(--accent-warm)' }}
          >
            {atEnd ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            ) : paused ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            )}
          </button>
        )}
        <div className="flex-1">
          <input
            type="range"
            min={0}
            max={MAX_T}
            step={5}
            value={Math.round(t)}
            onChange={(e) => onScrub(Number(e.target.value))}
            aria-label={copy.scrubAria}
            aria-valuetext={clock(t)}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[var(--surface-emphasis)]"
            style={{ accentColor: '#FF5C4D' }}
          />
          <div className="mt-1.5 flex items-center justify-between text-[10px] font-medium text-[var(--text-faint)]">
            <span>5 PM</span>
            <span style={{ color: 'var(--accent-warm)' }}>7:15</span>
            <span>Close</span>
          </div>
        </div>
      </div>

      {/* The decision card - the payoff, switching on time + mode */}
      <div className="mt-4 min-h-[96px]" aria-live="polite">
        {!past715 ? (
          <div className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] px-4 py-3 text-sm text-[var(--text-muted)]">
            {copy.preSignal}
          </div>
        ) : mode === 'sundae' ? (
          <motion.div
            key={nearClose ? 'saved' : 'signal'}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl border px-4 py-3"
            style={{ borderColor: 'rgba(255,92,77,0.4)', background: 'rgba(255,92,77,0.08)' }}
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: nearClose ? '#22C55E' : 'var(--accent-warm)' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: nearClose ? '#22C55E' : 'var(--accent-warm)' }}>
                {nearClose ? (copy.savedTitle ?? en.savedTitle) : copy.signalTitle}
              </span>
            </div>
            <p className="text-sm leading-snug text-[var(--text-secondary)]">{nearClose ? (copy.savedBody ?? en.savedBody) : copy.signalBody}</p>
            {!nearClose && <p className="mt-1.5 text-sm font-semibold text-[var(--text-primary)]">{copy.signalAction}</p>}
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
