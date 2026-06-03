"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

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
 * "Sales Pacing" surface, rebuilt 2026-06 to match the shipped app (actual-vs-
 * target pace bar with an EXPECTED marker, end-of-day projection card with a
 * confidence badge, status pill, and product-styled KPI strip + leaderboard).
 *
 * Animated, not static: one source of truth (`revenue`, `covers`,
 * `serviceProgress`) ticks every TICK_MS and every derived figure — expected
 * pace, projection, above-target delta, avg check, labor % — moves coherently,
 * so the hero reads as a live shift rather than a screenshot. The KPI tiles
 * flash green on each tick and the pace bar animates toward the new fill.
 *
 * Reduced-motion fallback: static initial values, no interval, no flash.
 */
const TICK_MS = 3800;
const TARGET = 18200;
const LABOR_COST_BASE = 4055; // ≈ 28.4% of the $14,280 baseline

export function HeroLiveDashboard({
  kpis,
  paceLabel,
  tableHeaders,
  tableRows,
  coachAlert,
  updatedAt,
}: HeroLiveDashboardProps) {
  const reduceMotion = useReducedMotion();
  const [covers, setCovers] = useState(287);
  const [revenue, setRevenue] = useState(14280);
  const [serviceProgress, setServiceProgress] = useState(0.62); // fraction of service elapsed
  const [tickKey, setTickKey] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      const incCovers = Math.random() > 0.72 ? 2 : 1;
      const checkDrift = (Math.random() - 0.35) * 6; // slight positive bias
      const incRevenue = incCovers * (49 + checkDrift);
      setCovers((c) => c + incCovers);
      setRevenue((r) => r + incRevenue);
      setServiceProgress((p) => Math.min(0.93, p + 0.012));
      setTickKey((k) => k + 1);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Derived — every figure flows from the three state values above
  const avgCheck = revenue / covers;
  const laborPct = (LABOR_COST_BASE / revenue) * 100;
  const expected = TARGET * serviceProgress;
  const projection = revenue / serviceProgress;
  const aboveTarget = projection - TARGET;
  const aheadBy = revenue - expected;
  const isAhead = aheadBy >= 0;
  const fillPct = Math.min(100, (revenue / TARGET) * 100);
  const expectedPct = Math.min(100, (expected / TARGET) * 100);
  const fmt = (n: number) =>
    `$${Math.round(n).toLocaleString("en-US")}`;

  // Order matches i18n mockup.kpis: Revenue / Covers / Avg Check / Labor %
  const liveValues: Array<{ value: string; color: string }> = [
    { value: fmt(revenue), color: kpis[0]?.color ?? "#1C47FF" },
    { value: covers.toString(), color: kpis[1]?.color ?? "#22C55E" },
    { value: `$${avgCheck.toFixed(2)}`, color: kpis[2]?.color ?? "#FBBF24" },
    { value: `${laborPct.toFixed(1)}%`, color: kpis[3]?.color ?? "#22C55E" },
  ];

  return (
    <div className="space-y-3 sm:space-y-3.5">
      {/* ── Header: outlet · live status · pace badge ── */}
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
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider border ${
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

      {/* ── Pace block: actual vs target with EXPECTED marker ── */}
      <div className="rounded-xl border border-[var(--border-default)] bg-white/[0.025] p-3.5 sm:p-4">
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
              className="text-2xl sm:text-[28px] lg:text-3xl font-bold font-mono tabular-nums leading-none text-[var(--text-primary)]"
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

        {/* pace bar */}
        <div className="relative h-2.5 rounded-full bg-white/[0.06] overflow-visible">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#16A34A] to-[#22C55E]"
            initial={false}
            animate={{ width: `${fillPct}%` }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* EXPECTED marker */}
          <div
            className="absolute -top-1 -bottom-1 w-px bg-[var(--text-supporting)]/70"
            style={{ left: `${expectedPct}%` }}
          >
            <span className="absolute -top-[18px] left-1/2 -translate-x-1/2 whitespace-nowrap text-[7.5px] sm:text-[8.5px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Expected
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2.5">
          <span className="text-[9px] sm:text-[10px] text-[var(--text-muted)] font-mono">
            Expected {fmt(expected)}
          </span>
          <span
            className={`text-[9px] sm:text-[10px] font-semibold font-mono rounded-md px-1.5 py-0.5 ${
              isAhead
                ? "text-[#22C55E] bg-[#22C55E]/10"
                : "text-[#FF5450] bg-[#FF5450]/10"
            }`}
          >
            {isAhead ? "+" : ""}
            {fmt(aheadBy)} vs pace
          </span>
        </div>
      </div>

      {/* ── End-of-day projection ── */}
      <div className="rounded-xl border border-[var(--border-default)] bg-white/[0.025] p-3.5 sm:p-4">
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
          className="text-xl sm:text-2xl lg:text-[26px] font-bold font-mono tabular-nums leading-none text-[var(--text-primary)]"
        >
          {fmt(projection)}
        </motion.div>
        <div className="text-[9px] sm:text-[10px] text-[#22C55E] mt-1.5 font-medium">
          ▲ Projected {fmt(aboveTarget)} above target
        </div>
      </div>

      {/* ── KPI strip — ticks coherently with the pace ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
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

      {/* ── Outlet leaderboard mini-strip (from tableRows) ── */}
      {tableRows.length > 0 && (
        <div className="hidden sm:block rounded-xl border border-[var(--border-default)] overflow-hidden">
          <div className="px-3.5 py-2 bg-white/[0.02] text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-semibold border-b border-[var(--border-default)]">
            {tableHeaders.join(" · ")}
          </div>
          {tableRows.slice(0, 3).map((row, ri) => (
            <div
              key={ri}
              className="flex items-center gap-3 px-3.5 py-2 text-[11px] border-b border-[var(--border-default)] last:border-b-0"
            >
              <span className="w-4 text-[var(--text-muted)] font-mono">{ri + 1}</span>
              <span className="flex-1 text-[var(--text-supporting)] truncate">{row[0]}</span>
              <span className="font-mono tabular-nums text-[var(--text-primary)] font-semibold">
                {row[1]}
              </span>
              {row[2] && (
                <span className="font-mono tabular-nums text-[#22C55E] w-12 text-right">
                  {row[2]}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Coach insight ── */}
      <div className="flex items-start gap-2.5 rounded-xl border border-[#1C47FF]/25 bg-[#1C47FF]/[0.06] p-3">
        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-[#1C47FF]/15 text-[#5B8DEF] text-[11px]">
          ✦
        </span>
        <p className="text-[11px] sm:text-xs text-[var(--text-supporting)] leading-snug">
          {coachAlert}
        </p>
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
      className="rounded-lg p-2.5 sm:p-3 border border-[var(--border-default)] min-w-0 overflow-hidden"
    >
      <div className="text-[8.5px] sm:text-[10px] text-[var(--text-muted)] uppercase tracking-wider mb-1 truncate">
        {label}
      </div>
      <div
        className="text-sm sm:text-base lg:text-xl font-bold font-mono tabular-nums truncate"
        style={{ color }}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </div>
      {trend && (
        <div
          className={`text-[9px] sm:text-[10px] mt-0.5 truncate ${
            trendUp ? "text-[#22C55E]" : "text-[#FF5450]"
          }`}
        >
          {trendUp ? "▲" : "▼"} {trend}
        </div>
      )}
    </motion.div>
  );
}
