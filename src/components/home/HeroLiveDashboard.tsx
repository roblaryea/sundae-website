"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MockupPaceBar,
  MockupTable,
  MockupAlert,
  MockupLiveDot,
} from "@/components/ui/MockupFrame";

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
 * Hero live dashboard — Pulse view with correlated ticking KPIs.
 *
 * One source of truth: `covers` and `revenue` state. AvgCheck, Labor%, and the
 * pace bar all derive from those two — so when one cover is served, every
 * number shifts coherently:
 *   covers → +1 (or +2 occasionally)
 *   revenue → +avgCheckSize (with small drift)
 *   avgCheck → revenue / covers (recomputed)
 *   labor% → labor_cost_base / revenue × 100 (drops as revenue grows)
 *   pace bar → tracks revenue progression toward target
 *
 * On every tick the four KPI tiles flash green briefly to communicate "live".
 * Reduced-motion fallback: static initial values, no tick.
 */
const TICK_MS = 4500;
const TARGET = 18200;
const LABOR_COST_BASE = 4055; // = 28.4% of $14,280 baseline

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
  const [tickKey, setTickKey] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      const incCovers = Math.random() > 0.72 ? 2 : 1;
      const checkDrift = (Math.random() - 0.35) * 6; // slight positive bias
      const incRevenue = incCovers * (49 + checkDrift);
      setCovers((c) => c + incCovers);
      setRevenue((r) => r + incRevenue);
      setTickKey((k) => k + 1);
    }, TICK_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const avgCheck = revenue / covers;
  const laborPct = (LABOR_COST_BASE / revenue) * 100;

  // Order matches the i18n.ts mockup.kpis order: Revenue / Covers / Avg Check / Labor %
  const liveValues: Array<{ value: string; color: string }> = [
    { value: `$${Math.round(revenue).toLocaleString()}`, color: kpis[0].color ?? "#1C47FF" },
    { value: covers.toString(), color: kpis[1].color ?? "#22C55E" },
    { value: `$${avgCheck.toFixed(2)}`, color: kpis[2].color ?? "#FBBF24" },
    { value: `${laborPct.toFixed(1)}%`, color: kpis[3].color ?? "#22C55E" },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <MockupLiveDot />
        <span className="text-[10px] text-[var(--text-muted)] font-mono">{updatedAt}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((kpi, i) => (
          <LiveKPITile
            key={kpi.label}
            tickKey={tickKey}
            label={kpi.label}
            value={liveValues[i].value}
            trend={kpi.trend}
            trendUp={kpi.trendUp}
            color={liveValues[i].color}
            reduceMotion={!!reduceMotion}
          />
        ))}
      </div>
      <MockupPaceBar
        label={paceLabel}
        current={Math.round(revenue)}
        target={TARGET}
        unit="$"
      />
      <div className="hidden sm:block">
        <MockupTable headers={tableHeaders} rows={tableRows} />
      </div>
      <MockupAlert type="coach">{coachAlert}</MockupAlert>
    </div>
  );
}

/* ─── Tile with green flash on each tick ─── */

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
      initial={
        reduceMotion ? false : { backgroundColor: "rgba(34, 197, 94, 0.18)" }
      }
      animate={
        reduceMotion ? {} : { backgroundColor: "rgba(255, 255, 255, 0.03)" }
      }
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="rounded-lg p-2.5 sm:p-3.5 lg:p-4 border border-[var(--border-default)] min-w-0 overflow-hidden"
    >
      <div className="text-[9px] sm:text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-1 flex items-center gap-1 truncate">
        <span className="truncate">{label}</span>
        {!reduceMotion && (
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse flex-shrink-0"
          />
        )}
      </div>
      <div
        className="text-base sm:text-lg lg:text-2xl font-bold font-mono tabular-nums truncate"
        style={{ color }}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </div>
      {trend && (
        <div
          className={`text-[10px] sm:text-[11px] mt-0.5 sm:mt-1 truncate ${
            trendUp ? "text-[#22C55E]" : "text-[#FF5450]"
          }`}
        >
          {trendUp ? "▲" : "▼"} {trend}
        </div>
      )}
    </motion.div>
  );
}
