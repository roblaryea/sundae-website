"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettledReducedMotion as useReducedMotion } from "@/lib/useSettledReducedMotion";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getWebsiteIntlLocale } from "@/lib/i18n";
import { heroDashboardCopy, currencyByLocale, coachItemsBehind } from "./heroDashboardCopy";

/**
 * Hero live dashboard — a product-accurate recreation of the Sundae Pulse "Sales
 * Pacing" surface. Visual design ported from the Claude Design `PacingModule`
 * (glowing tick-marked pace bar, projection sparkline, KPI sparklines, crafted
 * Coach cards), grafted onto the EXISTING engine: one source of truth (`revenue`,
 * `covers`, `serviceProgress`) ticks so every derived figure moves coherently,
 * the Coach rail streams a new recommendation on its own cadence, and the whole
 * thing stays localized across all 22 locales (heroDashboardCopy + currency).
 *
 * Reduced-motion: static initial values, no intervals, no flashes.
 */
const TICK_MS = 3800;
const COACH_MS = 4600;
const TARGET = 18200;
const NIGHT_TICKS = 14; // ticks per simulated night (~53s) before the scenario rolls over

const TONE = { positive: "#22C55E", warning: "#FBBF24", negative: "#FF5450", neutral: "#9a8f82" } as const;
type Tone = keyof typeof TONE;

// A real service night isn't a monotonic climb. The surface cycles through these
// scenarios so it shows genuine variation — ahead AND behind pace, labor running
// over, a red→green recovery — instead of an ever-climbing always-green readout.
//   pace(p)  = actual ÷ expected at night-progress p (1.0 = exactly on pace)
//   labor(p) = labor-cost ratio (kept in a believable ~24–33% band)
const SCENARIOS: { key: string; pace: (p: number) => number; labor: (p: number) => number }[] = [
  { key: "strong", pace: (p) => 1.0 + 0.08 * p, labor: (p) => 0.255 + 0.006 * Math.sin(p * 6) },
  { key: "behind", pace: (p) => 0.9 - 0.02 * p, labor: (p) => 0.305 + 0.022 * p },
  { key: "recovery", pace: (p) => 0.82 + 0.4 * Math.max(0, p - 0.4), labor: (p) => 0.325 - 0.05 * p },
  { key: "volatile", pace: (p) => 1.0 + 0.07 * Math.sin(p * 9), labor: (p) => 0.275 + 0.028 * Math.sin(p * 7) },
];

// Coach category by feed INDEX (icon + accent). Order MATCHES the copy arrays:
// CAT_AHEAD ↔ coachItems (upsell/labor/inventory/service/marketing),
// CAT_BEHIND ↔ coachItemsBehind (marketing/upsell/service/labor recovery actions).
type Category = "upsell" | "labor" | "inventory" | "service" | "marketing";
const CAT_AHEAD: Category[] = ["upsell", "labor", "inventory", "service", "marketing"];
const CAT_BEHIND: Category[] = ["marketing", "upsell", "service", "labor"];
const CAT_COLOR: Record<Category, string> = {
  upsell: "#FF7E6F",
  labor: "#FBBF24",
  inventory: "#9FB8FF",
  service: "#22C55E",
  marketing: "#FF5C4D",
};

function hexToRgba(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// Build an SVG sparkline (line + filled area + end point) over a fixed viewbox.
function sparkPath(arr: number[], w: number, h: number, pad: number) {
  const pts = arr && arr.length ? arr : [0, 0];
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  const rng = max - min || 1;
  const step = w / Math.max(1, pts.length - 1);
  const yOf = (v: number) => pad + (h - 2 * pad) - ((v - min) / rng) * (h - 2 * pad);
  let line = "";
  let ex = 0;
  let ey = 0;
  pts.forEach((v, i) => {
    const x = i * step;
    const yy = yOf(v);
    line += (i ? "L" : "M") + x.toFixed(1) + "," + yy.toFixed(1) + " ";
    ex = x;
    ey = yy;
  });
  return { line: line.trim(), area: line + `L ${w},${h} L 0,${h} Z`, ex, ey, yOf };
}

function CoachIcon({ category }: { category: Category }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} className="block">
      {category === "upsell" && (
        <>
          <path d="M3 17 L9 11 L13 15 L21 7" {...common} />
          <path d="M15.5 7 L21 7 L21 12.5" {...common} />
        </>
      )}
      {category === "labor" && (
        <>
          <circle cx={9} cy={8} r={3.1} fill="none" stroke="currentColor" strokeWidth={1.7} />
          <path d="M3.8 20 c0 -3.4 2.4 -5.4 5.2 -5.4 s5.2 2 5.2 5.4" {...common} />
          <path d="M16.5 6.4 a2.6 2.6 0 0 1 0 5" {...common} />
        </>
      )}
      {category === "inventory" && (
        <>
          <path d="M3.5 7.6 L12 3 L20.5 7.6 L20.5 16.4 L12 21 L3.5 16.4 Z" {...common} />
          <path d="M3.5 7.6 L12 12.2 L20.5 7.6" {...common} />
          <path d="M12 12.2 L12 21" {...common} />
        </>
      )}
      {category === "service" && (
        <>
          <path d="M6 16 V10.5 a6 6 0 0 1 12 0 V16 l1.8 2.2 H4.2 Z" {...common} />
          <path d="M10 19.4 a2 2 0 0 0 4 0" {...common} />
        </>
      )}
      {category === "marketing" && (
        <>
          <path d="M4 10 L4 14 L7.5 14 L13 18 L13 6 L7.5 10 Z" {...common} />
          <path d="M16.5 9 a4 4 0 0 1 0 6" {...common} />
        </>
      )}
    </svg>
  );
}

export function HeroLiveDashboard() {
  const { locale } = useWebsiteI18n();
  const copy = heroDashboardCopy[locale as keyof typeof heroDashboardCopy] ?? heroDashboardCopy.en;
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);
  const [coachIdx, setCoachIdx] = useState(0);
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setCoachIdx((i) => i + 1), COACH_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Live "updated at": real current day + time in the active locale.
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleString(getWebsiteIntlLocale(locale), { weekday: "long", hour: "numeric", minute: "2-digit" });
    const raf = requestAnimationFrame(() => setNow(fmt()));
    const id = reduceMotion ? undefined : setInterval(() => setNow(fmt()), 15000);
    return () => {
      cancelAnimationFrame(raf);
      if (id) clearInterval(id);
    };
  }, [locale, reduceMotion]);

  // ── Simulated service night — bounded + varied (see SCENARIOS) ──
  const scenario = SCENARIOS[Math.floor(tick / NIGHT_TICKS) % SCENARIOS.length];
  const localT = tick % NIGHT_TICKS;
  const p = 0.32 + 0.68 * (localT / (NIGHT_TICKS - 1)); // 0.32 → 1.0 through the night
  // deterministic per-tick jitter (stable across re-renders within a tick)
  const nz = (seed: number) => {
    const x = Math.sin((tick + 1) * (12.9898 + seed)) * 43758.5453;
    return x - Math.floor(x) - 0.5; // -0.5 .. 0.5
  };

  const paceRatio = scenario.pace(p) + nz(1) * 0.03;
  const expected = TARGET * p;
  const actual = expected * paceRatio;
  const aheadBy = actual - expected;
  const isAhead = aheadBy >= 0;
  const actualPct = (actual / TARGET) * 100;
  const fillPct = Math.min(100, actualPct);
  const expectedPct = Math.min(100, p * 100);
  const projection = actual / p; // projected full-night close
  const aboveTarget = projection - TARGET;
  const laborPct = Math.min(34, Math.max(22, scenario.labor(p) * 100 + nz(3) * 1.6));
  const avgCheckBase = 54 + nz(2) * 8;
  const covers = Math.max(1, Math.round(actual / avgCheckBase));
  const avgCheck = actual / covers;

  const cur = currencyByLocale[locale as keyof typeof currencyByLocale] ?? currencyByLocale.en;
  const money = new Intl.NumberFormat(getWebsiteIntlLocale(locale), { style: "currency", currency: cur.code, maximumFractionDigits: 0 });
  const fmt = (n: number) => money.format(n * cur.scale);

  // KPI tiles — tone/trend/delta reflect the LIVE scenario (so they go red/amber too).
  // Deltas are locale-formatted (sign, decimal separator, % placement) so every
  // figure stays correct across all 22 locales — only the labels are translated copy.
  const intlLoc = getWebsiteIntlLocale(locale);
  const pctFmt = new Intl.NumberFormat(intlLoc, { style: "percent", signDisplay: "exceptZero", maximumFractionDigits: 1 });
  const ptFmt = new Intl.NumberFormat(intlLoc, { signDisplay: "exceptZero", maximumFractionDigits: 1 });
  const pctNum = new Intl.NumberFormat(intlLoc, { style: "percent", maximumFractionDigits: 1 });
  const pctStr = (v: number) => pctFmt.format(v / 100);
  const upSpark = [3, 4, 4, 5, 6, 6, 7, 8, 9];
  const downSpark = [9, 8, 8, 7, 6, 6, 5, 4, 3];
  const revPct = (paceRatio - 1) * 100;
  const coversPct = revPct * 0.6 + nz(4) * 1.2;
  const checkPct = nz(5) * 2.6;
  const laborDelta = laborPct - 28;
  const kpiData: { label: string; value: string; delta: string; tone: Tone; trend: "up" | "down"; spark: number[]; flash: boolean }[] = [
    { label: copy.kpis[0]?.label ?? "Revenue", value: fmt(actual), delta: pctStr(revPct), tone: revPct >= 0 ? "positive" : "negative", trend: revPct >= 0 ? "up" : "down", spark: revPct >= 0 ? upSpark : downSpark, flash: true },
    { label: copy.kpis[1]?.label ?? "Covers", value: covers.toLocaleString(intlLoc), delta: pctStr(coversPct), tone: coversPct >= 0 ? "positive" : "negative", trend: coversPct >= 0 ? "up" : "down", spark: coversPct >= 0 ? upSpark : downSpark, flash: false },
    { label: copy.kpis[2]?.label ?? "Avg check", value: fmt(avgCheck), delta: pctStr(checkPct), tone: checkPct >= 0 ? "positive" : "warning", trend: checkPct >= 0 ? "up" : "down", spark: checkPct >= 0 ? upSpark : downSpark, flash: false },
    { label: copy.kpis[3]?.label ?? "Labor %", value: pctNum.format(laborPct / 100), delta: ptFmt.format(laborDelta), tone: laborPct > 30.5 ? "negative" : laborPct > 28.5 ? "warning" : "positive", trend: laborDelta >= 0 ? "up" : "down", spark: laborDelta >= 0 ? upSpark : downSpark, flash: false },
  ];

  const accent = isAhead ? TONE.positive : TONE.negative;
  const fillGrad = isAhead
    ? "linear-gradient(90deg, #16794a 0%, #22C55E 70%, #5ef0a0 100%)"
    : "linear-gradient(90deg, #8f2420 0%, #FF5450 80%, #ff8378 100%)";
  const edgeColor = isAhead ? "#7ff0b0" : "#ff9087";

  // Projection sparkline shape (only the curve + target line read).
  const projSeries = [expected * 0.92, expected * 0.96, expected, expected * 1.02, projection * 0.98, projection * 0.995, projection];
  const sp = sparkPath(projSeries, 120, 48, 5);
  const projTargetY = sp.yOf(TARGET);

  // Coach feed — RESPONSIVE to pace: when the night is behind (the behind night,
  // or the still-red phase of the recovery night) the rail surfaces recovery
  // actions; once it crosses back to ahead it returns to the growth playbook.
  // Tags reuse the localized ahead-set labels (by category) so the behind copy
  // only transcreates the recommendation text + impact.
  const coachBehind = scenario.key === "behind" || (scenario.key === "recovery" && !isAhead);
  const behindSet = coachItemsBehind[locale] ?? coachItemsBehind.en;
  const coachSet = coachBehind
    ? behindSet.map((it, i) => ({
        category: CAT_BEHIND[i],
        tag: copy.coachItems[CAT_AHEAD.indexOf(CAT_BEHIND[i])]?.tag ?? "",
        text: it.text,
        impact: it.impact,
      }))
    : copy.coachItems.map((it, i) => ({ category: CAT_AHEAD[i], tag: it.tag, text: it.text, impact: it.impact }));
  const n = coachSet.length;
  const at = (o: number) => {
    const idx = (((coachIdx - o) % n) + n) % n;
    return { ...coachSet[idx], idx };
  };
  const feed = [at(0), at(1), at(2)];

  const muted = "text-[var(--text-muted)]";

  return (
    <div className="text-[var(--text-primary)]">
      {/* ── Header ── */}
      <div className="mb-5 flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h3 className="m-0 text-[15px] sm:text-[17px] font-semibold tracking-[-0.012em] truncate">{copy.paceLabel}</h3>
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] sm:text-[9.5px] font-medium tracking-[0.16em] text-[#FF5C4D]">
              <span className="relative grid h-[7px] w-[7px] place-items-center">
                <span className="absolute h-[7px] w-[7px] rounded-full bg-[#FF5C4D]" />
                {!reduceMotion && <span className="absolute h-[7px] w-[7px] rounded-full bg-[#FF5C4D] animate-ping" />}
              </span>
              {copy.live}
            </span>
          </div>
          <div className={`mt-1 font-mono text-[10px] sm:text-[11px] tracking-[0.04em] ${muted}`}>{now ?? copy.updatedAt}</div>
        </div>
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em]"
          style={{ color: accent, background: hexToRgba(accent, 0.14), border: `1px solid ${hexToRgba(accent, 0.3)}` }}
        >
          <span className="h-[7px] w-[7px] rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
          {isAhead ? copy.statusOnTrack : copy.statusBehind}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-8">
        {/* LEFT */}
        <div className="flex flex-col gap-5 min-w-0">
          {/* pacing centerpiece */}
          <div>
            <div className={`mb-3 font-mono text-[9.5px] font-medium uppercase tracking-[0.18em] ${muted}`}>{copy.actualToday}</div>

            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex items-baseline gap-2.5">
                <motion.span
                  key={`rev-${tick}`}
                  initial={reduceMotion ? false : { color: accent }}
                  animate={reduceMotion ? {} : { color: "var(--text-primary)" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="font-mono tabular-nums text-[34px] sm:text-[44px] lg:text-[48px] font-medium leading-[0.9] tracking-[-0.02em]"
                >
                  {fmt(actual)}
                </motion.span>
                <span className={`font-mono text-[12px] sm:text-[13px] ${muted}`}>/ {fmt(TARGET)}</span>
              </div>
              <div
                className="inline-flex items-center rounded-full px-2.5 py-[5px] text-[11px] sm:text-[12px] font-semibold leading-none whitespace-nowrap"
                style={
                  isAhead
                    ? { color: "#15110D", background: "linear-gradient(120deg,#5ef0a0,#22C55E)" }
                    : { color: "#fff", background: "linear-gradient(120deg,#ff8378,#FF5450)" }
                }
              >
                {isAhead ? "▲" : "▼"}&nbsp;{isAhead ? "+" : ""}
                {fmt(aheadBy)} {copy.vsPace}
              </div>
            </div>

            {/* TRACK */}
            <div className="relative mt-6 h-[54px]">
              {/* expected marker callout */}
              <div
                className="absolute top-0 z-[4] flex -translate-x-1/2 flex-col items-center pointer-events-none"
                style={{ left: `${expectedPct}%` }}
              >
                <span className={`font-mono text-[8px] sm:text-[8.5px] font-semibold tracking-[0.12em] whitespace-nowrap ${muted}`}>
                  {copy.expectedPace.toUpperCase()}&nbsp;{Math.round(expectedPct)}%
                </span>
              </div>
              {/* the bar */}
              <div className="absolute inset-x-0 top-[26px] h-4 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.16) 0 1px, transparent 1px 5%)", opacity: 0.7 }}
                />
                <motion.div
                  className="absolute left-0 top-0 bottom-0 rounded-full"
                  style={{ background: fillGrad, boxShadow: `0 0 18px -2px ${hexToRgba(accent, 0.65)}` }}
                  initial={false}
                  animate={{ width: `${fillPct}%` }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    aria-hidden
                    className="absolute right-0 -top-0.5 -bottom-0.5 w-1 rounded-full"
                    style={{ background: edgeColor, boxShadow: `0 0 16px 3px ${hexToRgba(accent, 0.65)}` }}
                    animate={reduceMotion ? undefined : { opacity: [0.55, 1, 0.55] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                {/* expected vertical marker */}
                <div
                  className="absolute -top-2 -bottom-2 z-[3] w-0"
                  style={{ left: `${expectedPct}%`, borderLeft: "1.5px dashed rgba(255,255,255,0.5)" }}
                />
                {/* leading-edge % chip */}
                <div className="absolute top-6 z-[5] -translate-x-1/2 whitespace-nowrap" style={{ left: `${fillPct}%` }}>
                  <span className="font-mono text-[10px] font-semibold text-[var(--text-primary)]">{actualPct.toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* legend */}
            <div className={`mt-2 flex flex-wrap items-center gap-4 font-mono text-[10px] ${muted}`}>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-[9px] w-[9px] rounded-[2px]" style={{ background: edgeColor }} />
                {copy.actualToday} {actualPct.toFixed(1)}%
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-[11px] w-0" style={{ borderLeft: "1.5px dashed rgba(255,255,255,0.5)" }} />
                {copy.expectedPace} {Math.round(expectedPct)}%
              </span>
            </div>
          </div>

          {/* projection card */}
          <div className="flex items-center justify-between gap-4 rounded-[14px] border border-[var(--border-default)] bg-white/[0.03] px-4 py-[15px]">
            <div className="min-w-0">
              <div className={`flex items-center gap-2 font-mono text-[9.5px] font-medium uppercase tracking-[0.16em] ${muted}`}>
                {copy.projectionTitle}
                <span className="rounded border border-[#FBBF24]/25 bg-[#FBBF24]/10 px-1.5 py-0.5 text-[8px] font-semibold tracking-wider text-[#FBBF24]">
                  {copy.pacingModel}
                </span>
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="font-mono tabular-nums text-[22px] sm:text-[23px] font-medium tracking-[-0.015em]">{fmt(projection)}</span>
                <span className="font-mono text-[12px] font-semibold" style={{ color: aboveTarget >= 0 ? TONE.positive : TONE.negative }}>
                  {aboveTarget >= 0 ? "▲ " : "▼ "}
                  {copy.projectedAbove.replace("{amount}", fmt(aboveTarget))}
                </span>
              </div>
            </div>
            <svg viewBox="0 0 120 48" preserveAspectRatio="none" className="h-12 w-[120px] flex-none overflow-visible">
              <path d={sp.area} fill={hexToRgba(aboveTarget >= 0 ? TONE.positive : TONE.negative, 0.15)} />
              <path
                d={sp.line}
                fill="none"
                stroke={aboveTarget >= 0 ? TONE.positive : TONE.negative}
                strokeWidth={1.8}
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line x1={0} y1={projTargetY} x2={120} y2={projTargetY} stroke="var(--border-default)" strokeWidth={1.4} strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
              <circle cx={sp.ex} cy={sp.ey} r={2.4} fill={aboveTarget >= 0 ? TONE.positive : TONE.negative} />
            </svg>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {kpiData.map((k, i) => (
              <KpiTile
                key={i}
                label={k.label}
                value={k.value}
                delta={k.delta}
                tone={k.tone}
                trend={k.trend}
                spark={k.spark}
                flashKey={k.flash ? tick : undefined}
                reduce={!!reduceMotion}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Coach rail */}
        <div className="flex min-w-0 flex-col border-t border-[var(--border-default)] pt-5 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
          <div className="mb-3.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[14px] sm:text-[15px] tracking-[0.02em]" style={{ fontFamily: "var(--font-display)" }}>
                Sundae
              </span>
              <span className={`font-mono text-[9px] sm:text-[9.5px] font-medium uppercase tracking-[0.18em] ${muted}`}>{copy.coachTitle}</span>
            </div>
            <span className={`font-mono text-[8.5px] sm:text-[9px] uppercase tracking-[0.1em] ${muted}`}>
              {copy.signalsToday.replace("{n}", String(12 + (coachIdx % 6)))}
            </span>
          </div>
          <div className="flex flex-col gap-2.5">
            <AnimatePresence initial={false} mode="popLayout">
              {feed.map((c, slot) => (
                <motion.div
                  key={`${coachIdx}-${slot}`}
                  initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <CoachCard
                    category={c.category}
                    label={c.tag}
                    impact={c.impact.replace("{up}", fmt(420)).replace("{lab}", fmt(280))}
                    action={c.text}
                    emphasized={slot === 0}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className={`mt-3 flex items-center justify-between border-t border-[var(--border-default)] pt-2 font-mono text-[8.5px] sm:text-[9px] font-semibold uppercase tracking-wider ${muted}`}>
            <span>{copy.decisionIntelligence}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── KPI tile with sparkline + update flash ─── */

function KpiTile({
  label,
  value,
  delta,
  tone,
  trend,
  spark,
  flashKey,
  reduce,
}: {
  label: string;
  value: string;
  delta: string;
  tone: Tone;
  trend: "up" | "down" | "flat";
  spark: number[];
  flashKey?: number;
  reduce: boolean;
}) {
  const noData = !value;
  const c = noData ? TONE.neutral : TONE[tone];
  const arrow = noData ? "" : trend === "up" ? "↑" : trend === "down" ? "↓" : "→";
  const s = sparkPath(spark, 120, 30, 4);
  return (
    <div className="relative flex min-h-[100px] flex-col justify-between gap-2.5 overflow-hidden rounded-[14px] border border-[var(--border-default)] bg-white/[0.03] p-[14px]">
      {flashKey !== undefined && !reduce && (
        <motion.div
          key={flashKey}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[14px]"
          style={{ boxShadow: `inset 0 0 0 1.5px ${c}` }}
          initial={{ opacity: 0.85 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      )}
      <div className="relative z-[1] flex items-start justify-between gap-2">
        <span className="pt-0.5 font-mono text-[9px] sm:text-[9.5px] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">{label}</span>
        <span
          className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-[7px] py-0.5 font-mono text-[10px] sm:text-[11px] font-semibold leading-none tabular-nums"
          style={noData ? { color: "var(--text-muted)", border: "1px solid var(--border-default)" } : { color: c, background: hexToRgba(c, 0.15) }}
        >
          {arrow}
          {noData ? "—" : delta}
        </span>
      </div>
      <div className="relative z-[1] flex items-end gap-1.5">
        <span className="font-mono tabular-nums text-[22px] sm:text-[27px] font-medium leading-[0.95] tracking-[-0.015em]" style={{ color: noData ? "var(--text-muted)" : "var(--text-primary)" }}>
          {noData ? "—" : value}
        </span>
      </div>
      <svg viewBox="0 0 120 30" preserveAspectRatio="none" className="relative z-[1] block h-[26px] w-full overflow-visible">
        {!noData && (
          <>
            <path d={s.area} fill={hexToRgba(c, 0.16)} />
            <path d={s.line} fill="none" stroke={c} strokeWidth={1.7} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={s.ex} cy={s.ey} r={2.1} fill={c} />
          </>
        )}
        {noData && <line x1={0} y1={15} x2={120} y2={15} stroke="var(--border-default)" strokeWidth={1.5} strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />}
      </svg>
    </div>
  );
}

/* ─── Coach recommendation card ─── */

function CoachCard({
  category,
  label,
  impact,
  action,
  emphasized,
}: {
  category: Category;
  label: string;
  impact: string;
  action: string;
  emphasized: boolean;
}) {
  const accent = CAT_COLOR[category];
  return (
    <div
      className="relative rounded-[15px]"
      style={
        emphasized
          ? {
              padding: "16px 17px",
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${hexToRgba(accent, 0.38)}`,
              boxShadow: `0 18px 40px -22px rgba(0,0,0,0.5), 0 0 0 4px ${hexToRgba(accent, 0.07)}`,
            }
          : {
              padding: "14px 15px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border-default)",
              opacity: 0.66,
            }
      }
    >
      {emphasized && (
        <div className="mb-2.5 flex items-center gap-1.5">
          <span className="h-[5px] w-[5px] rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
          <span className="font-mono text-[8.5px] font-semibold tracking-[0.2em]" style={{ color: accent }}>
            {label.toUpperCase()}
          </span>
        </div>
      )}
      <div className="mb-2.5 flex items-center gap-2.5">
        <span
          className="grid h-7 w-7 flex-none place-items-center rounded-[9px]"
          style={{ color: accent, background: hexToRgba(accent, 0.15), border: `1px solid ${hexToRgba(accent, 0.24)}` }}
        >
          <CoachIcon category={category} />
        </span>
        {!emphasized && (
          <span className="rounded-full px-2 py-[3px] font-mono text-[9px] sm:text-[9.5px] font-semibold uppercase tracking-[0.16em]" style={{ color: accent, background: hexToRgba(accent, 0.13) }}>
            {label}
          </span>
        )}
        <span className="ml-auto font-mono text-[12px] sm:text-[13px] font-semibold tabular-nums tracking-[-0.01em]" style={{ color: accent }}>
          {impact}
        </span>
      </div>
      <p className="m-0 text-[13px] sm:text-[14px] font-medium leading-[1.42] text-[var(--text-primary)] [text-wrap:pretty]">{action}</p>
    </div>
  );
}
