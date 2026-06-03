"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface HeroLiveDashboardProps {
  kpis: Array<{
    label: string;
    value: string;
    trend: string;
    trendUp: boolean;
    color?: string;
  }>;
  paceLabel: string;
  tableHeaders: string[];
  tableRows: string[][];
  coachAlert: string;
  updatedAt: string;
}

/**
 * Hero live dashboard — a product-accurate recreation of the real Sundae Pulse
 * "Sales Pacing" surface, in a two-column ops layout: a live pacing dashboard
 * on the left and a full-height **Sundae Coach** recommendation rail on the
 * right. The Coach is a co-equal half of the frame (not a footnote), so the
 * hero says "decision intelligence" — a stream of prioritized AI actions
 * across upsell, labor, inventory, service, and marketing — rather than just
 * "a dashboard".
 *
 * Animated, not static: one source of truth (`revenue`, `covers`,
 * `serviceProgress`) ticks so every derived figure (expected pace, projection,
 * above-target delta, avg check, labor %) moves coherently; the Coach rail
 * streams a new recommendation to the top on its own cadence.
 *
 * Reduced-motion fallback: static initial values, no intervals, no flashes.
 */
const TICK_MS = 3800;
const COACH_MS = 4600;
const TARGET = 18200;
const LABOR_COST_BASE = 4055; // ≈ 28.4% of the $14,280 baseline

export function HeroLiveDashboard({
  kpis,
  paceLabel,
  coachAlert,
  updatedAt,
}: HeroLiveDashboardProps) {
  const reduceMotion = useReducedMotion();
  const [covers, setCovers] = useState(287);
  const [revenue, setRevenue] = useState(14280);
  const [serviceProgress, setServiceProgress] = useState(0.62);
  const [tickKey, setTickKey] = useState(0);
  const [coachIdx, setCoachIdx] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      const incCovers = Math.random() > 0.72 ? 2 : 1;
      const checkDrift = (Math.random() - 0.35) * 6;
      setCovers((c) => c + incCovers);
      setRevenue((r) => r + incCovers * (49 + checkDrift));
      setServiceProgress((p) => Math.min(0.93, p + 0.012));
      setTickKey((k) => k + 1);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setCoachIdx((i) => i + 1), COACH_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Derived — every figure flows from the three state values
  const avgCheck = revenue / covers;
  const laborPct = (LABOR_COST_BASE / revenue) * 100;
  const expected = TARGET * serviceProgress;
  const projection = revenue / serviceProgress;
  const aboveTarget = projection - TARGET;
  const aheadBy = revenue - expected;
  const isAhead = aheadBy >= 0;
  const fillPct = Math.min(100, (revenue / TARGET) * 100);
  const expectedPct = Math.min(100, (expected / TARGET) * 100);
  const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

  const liveValues: Array<{ value: string; color: string }> = [
    { value: fmt(revenue), color: kpis[0]?.color ?? "#1C47FF" },
    { value: covers.toString(), color: kpis[1]?.color ?? "#22C55E" },
    { value: `$${avgCheck.toFixed(2)}`, color: kpis[2]?.color ?? "#FBBF24" },
    { value: `${laborPct.toFixed(1)}%`, color: kpis[3]?.color ?? "#22C55E" },
  ];

  // Sundae Coach feed — recommendation #1 is the localized coachAlert; the rest
  // demonstrate the breadth Sundae surfaces across the operation.
  const coachItems: Array<{ tag: string; text: string; impact: string }> = [
    { tag: "Upsell", text: coachAlert, impact: "+$420 / shift" },
    { tag: "Labor", text: "Hold the 9 PM cut — you're tracking 1.5 labor hours under budget.", impact: "-$280 cost" },
    { tag: "Inventory", text: "Ribeye is selling 22% ahead of forecast — 86 risk by 8:30 PM. Prep 6 more.", impact: "6 covers at risk" },
    { tag: "Service", text: "Table 12 seated 47 min with no entrée fired — nudge the kitchen.", impact: "guest NPS" },
    { tag: "Marketing", text: "Repeat last Tuesday's happy-hour — it lifted covers 9%.", impact: "+9% covers" },
  ];
  const at = (o: number) => coachItems[(((coachIdx - o) % coachItems.length) + coachItems.length) % coachItems.length];
  const feed = [at(0), at(1), at(2)];

  const tagColor: Record<string, string> = {
    Upsell: "#5B8DEF",
    Labor: "#22C55E",
    Inventory: "#FBBF24",
    Service: "#F472B6",
    Marketing: "#A78BFA",
  };

  return (
    <div className="space-y-3">
      {/* ── Header bar (full width) ── */}
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[12px] sm:text-sm font-semibold text-[var(--text-primary)] truncate">
            {paceLabel}
          </div>
          <div className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-mono mt-0.5">
            {updatedAt}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider border ${
              isAhead
                ? "bg-[#22C55E]/12 text-[#22C55E] border-[#22C55E]/30"
                : "bg-[#FBBF24]/12 text-[#FBBF24] border-[#FBBF24]/30"
            }`}
          >
            {isAhead ? "On Track" : "Behind"}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">
            {!reduceMotion && (
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
              </span>
            )}
            Live
          </span>
        </div>
      </div>

      {/* ── Two columns: pacing dashboard + Sundae Coach rail ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-3">
        {/* LEFT — pacing dashboard */}
        <div className="space-y-3">
          {/* Pace block */}
          <div className="rounded-xl border border-[var(--border-default)] bg-white/[0.025] p-3.5">
            <div className="flex items-end justify-between gap-3 mb-3">
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Actual today
                </div>
                <motion.div
                  key={`rev-${tickKey}`}
                  initial={reduceMotion ? false : { color: "#22C55E" }}
                  animate={reduceMotion ? {} : { color: "var(--text-primary)" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="text-2xl sm:text-[26px] lg:text-[28px] font-bold font-mono tabular-nums leading-none text-[var(--text-primary)]"
                >
                  {fmt(revenue)}
                </motion.div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--text-muted)] mb-1">
                  Target
                </div>
                <div className="text-sm sm:text-base font-semibold font-mono tabular-nums text-[var(--text-supporting)]">
                  {fmt(TARGET)}
                </div>
              </div>
            </div>
            <div className="relative h-2.5 rounded-full bg-white/[0.06] overflow-visible">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#16A34A] to-[#22C55E]"
                initial={false}
                animate={{ width: `${fillPct}%` }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
              <div
                className="absolute -top-1.5 -bottom-1.5 w-0.5 rounded-full bg-[var(--text-primary)]/85"
                style={{ left: `calc(${expectedPct}% - 1px)` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2.5">
              <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-mono inline-flex items-center gap-1.5">
                <span className="inline-block w-2 h-[2px] rounded-full bg-[var(--text-primary)]/85" />
                Expected pace {fmt(expected)}
              </span>
              <span
                className={`text-[9px] sm:text-[10px] font-semibold font-mono rounded-md px-1.5 py-0.5 ${
                  isAhead ? "text-[#22C55E] bg-[#22C55E]/10" : "text-[#FF5450] bg-[#FF5450]/10"
                }`}
              >
                {isAhead ? "+" : ""}
                {fmt(aheadBy)} vs pace
              </span>
            </div>
          </div>

          {/* Projection */}
          <div className="rounded-xl border border-[var(--border-default)] bg-white/[0.025] p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                End-of-day projection
              </span>
              <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider text-[#FBBF24] bg-[#FBBF24]/10 border border-[#FBBF24]/25 rounded px-1.5 py-0.5">
                Pacing model
              </span>
            </div>
            <motion.div
              key={`proj-${tickKey}`}
              initial={reduceMotion ? false : { opacity: 0.5 }}
              animate={reduceMotion ? {} : { opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl font-bold font-mono tabular-nums leading-none text-[var(--text-primary)]"
            >
              {fmt(projection)}
            </motion.div>
            <div className="text-[9px] sm:text-[10px] text-[#22C55E] mt-1.5 font-medium">
              ▲ Projected {fmt(aboveTarget)} above target
            </div>
          </div>

          {/* KPI strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {kpis.map((kpi, i) => (
              <LiveKPITile
                key={kpi.label}
                tickKey={tickKey}
                label={kpi.label}
                value={liveValues[i]?.value ?? kpi.value}
                trend={kpi.trend}
                trendUp={kpi.trendUp}
                color={liveValues[i]?.color ?? "#1C47FF"}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Sundae Coach rail */}
        <div className="rounded-xl border border-[#1C47FF]/30 bg-gradient-to-b from-[#1C47FF]/[0.10] to-[#1C47FF]/[0.02] p-3 flex flex-col">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-[#1C47FF]/20 text-[#5B8DEF] text-[11px]">
              ✦
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5B8DEF]">
              Sundae Coach
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-[8.5px] sm:text-[9px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              {!reduceMotion && <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#5B8DEF] animate-pulse" />}
              Live
            </span>
          </div>

          <div className="flex-1 space-y-2">
            <AnimatePresence initial={false} mode="popLayout">
              {feed.map((c, slot) => (
                <motion.div
                  key={`${coachIdx}-${slot}`}
                  initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                  animate={{ opacity: slot === 0 ? 1 : 0.5, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`rounded-lg border p-2.5 ${
                    slot === 0
                      ? "border-[#1C47FF]/35 bg-white/[0.04]"
                      : "border-[var(--border-default)] bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: tagColor[c.tag] ?? "#5B8DEF" }}
                    />
                    <span
                      className="text-[8.5px] sm:text-[9px] font-bold uppercase tracking-wider"
                      style={{ color: tagColor[c.tag] ?? "#5B8DEF" }}
                    >
                      {c.tag}
                    </span>
                    <span className="ml-auto text-[8.5px] sm:text-[9px] font-mono tabular-nums text-[var(--text-supporting)]">
                      {c.impact}
                    </span>
                  </div>
                  <p className="text-[10.5px] sm:text-[11px] leading-snug text-[var(--text-primary)]">
                    {c.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-2 pt-2 border-t border-[#1C47FF]/15 flex items-center justify-between text-[8.5px] sm:text-[9px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">
            <span>Decision intelligence</span>
            <span className="font-mono">{12 + (coachIdx % 6)} signals today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── KPI tile with green flash on each tick ─── */

function LiveKPITile({
  tickKey,
  label,
  value,
  trend,
  trendUp,
  color,
  reduceMotion,
}: {
  tickKey: number;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color: string;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      key={tickKey}
      initial={reduceMotion ? false : { backgroundColor: "rgba(34, 197, 94, 0.16)" }}
      animate={reduceMotion ? {} : { backgroundColor: "rgba(255, 255, 255, 0.025)" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="rounded-lg p-2.5 border border-[var(--border-default)] min-w-0 overflow-hidden"
    >
      <div className="text-[8.5px] sm:text-[9.5px] text-[var(--text-muted)] uppercase tracking-wider mb-1 truncate">
        {label}
      </div>
      <div
        className="text-sm sm:text-base font-bold font-mono tabular-nums truncate"
        style={{ color }}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </div>
      {trend && (
        <div
          className={`text-[9px] mt-0.5 truncate ${
            trendUp ? "text-[#22C55E]" : "text-[#FF5450]"
          }`}
        >
          {trendUp ? "▲" : "▼"} {trend}
        </div>
      )}
    </motion.div>
  );
}
