"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HeroLiveKPIProps {
  label: string;
  initialValue: number;
  prefix?: string;
  suffix?: string;
  trend?: string;
  trendUp?: boolean;
  color?: string;
  /** Increment applied at each tick. Defaults to 40. */
  increment?: number;
  /** Tick interval in ms. Defaults to 6000 (every 6 seconds). */
  intervalMs?: number;
}

/**
 * Animated KPI tile for the Hero. Visually matches MockupKPI but ticks
 * its value periodically with a brief green flash to communicate "live".
 *
 * Conversion job: explain product (Sundae is live, not a static deck).
 * Reduced-motion fallback: renders the initial value, no tick, no flash.
 */
export function HeroLiveKPI({
  label,
  initialValue,
  prefix = "$",
  suffix = "",
  trend,
  trendUp = true,
  color = "#1C47FF",
  increment = 40,
  intervalMs = 6000,
}: HeroLiveKPIProps) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(initialValue);
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      setValue((v) => v + increment);
      setFlashKey((k) => k + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [reduceMotion, increment, intervalMs]);

  return (
    <div className="bg-white/[0.03] rounded-lg p-4 border border-[var(--border-default)] relative overflow-hidden">
      <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
        {label}
        {!reduceMotion && (
          <span
            aria-hidden
            className="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse"
          />
        )}
      </div>
      <motion.div
        key={flashKey}
        initial={
          reduceMotion ? false : { backgroundColor: "rgba(34, 197, 94, 0.18)" }
        }
        animate={reduceMotion ? {} : { backgroundColor: "rgba(34, 197, 94, 0)" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="rounded -mx-1 px-1"
      >
        <div
          className="text-2xl font-bold font-mono tabular-nums"
          style={{ color }}
          aria-live="polite"
          aria-atomic="true"
        >
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </div>
      </motion.div>
      {trend && (
        <div
          className={`text-[11px] mt-1 ${
            trendUp ? "text-[#22C55E]" : "text-[#FF5450]"
          }`}
        >
          {trendUp ? "▲" : "▼"} {trend}
        </div>
      )}
    </div>
  );
}
