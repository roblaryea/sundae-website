"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ─── Mockup Frame Shell ─── */

interface MockupFrameProps {
  label?: string;
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}

export function MockupFrame({ label, children, glow = true, className = "" }: MockupFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mockup-frame ${glow ? "animate-glow-pulse" : ""} ${className}`}
    >
      {/* Title bar */}
      <div className="mockup-titlebar">
        <span className="mockup-dot mockup-dot-r" />
        <span className="mockup-dot mockup-dot-y" />
        <span className="mockup-dot mockup-dot-g" />
        {label && (
          <span className="ml-3 text-[11px] text-[var(--text-muted)] font-medium truncate">
            {label}
          </span>
        )}
      </div>
      {/* Dashboard body */}
      <div className="mockup-body">{children}</div>
    </motion.div>
  );
}

/* ─── Inner Building Blocks ─── */

// KPI row inside a mockup
interface MockupKPIProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export function MockupKPI({ label, value, trend, trendUp, color = "#1C47FF" }: MockupKPIProps) {
  return (
    <div className="bg-white/[0.03] rounded-lg p-4 border border-[var(--border-default)]">
      <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider mb-1">{label}</div>
      <div className="text-2xl font-bold font-mono" style={{ color }}>{value}</div>
      {trend && (
        <div className={`text-[11px] mt-1 ${trendUp ? "text-[#22C55E]" : "text-[#FF5450]"}`}>
          {trendUp ? "▲" : "▼"} {trend}
        </div>
      )}
    </div>
  );
}

// Pace bar (horizontal progress)
interface MockupPaceBarProps {
  label: string;
  current: number;
  target: number;
  unit?: string;
}

export function MockupPaceBar({ label, current, target, unit = "" }: MockupPaceBarProps) {
  const pct = Math.min((current / target) * 100, 100);
  const isAhead = current >= target;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px]">
        <span className="text-[var(--text-muted)]">{label}</span>
        <span className="text-[var(--text-secondary)] font-mono">
          {unit}{current.toLocaleString()} / {unit}{target.toLocaleString()}
        </span>
      </div>
      <div className="h-2 rounded-full bg-[var(--surface-hover)] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${pct}%`,
            background: isAhead
              ? "linear-gradient(90deg, #22C55E, #16A34A)"
              : "linear-gradient(90deg, #1C47FF, #3B82F6)",
          }}
        />
      </div>
    </div>
  );
}

// Mini bar chart
interface MockupBarChartProps {
  data: { label: string; value: number; color?: string }[];
  maxHeight?: number;
}

export function MockupBarChart({ data, maxHeight = 80 }: MockupBarChartProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="flex items-end gap-1 sm:gap-2" style={{ height: maxHeight }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-sm min-h-[4px] transition-all duration-700"
            style={{
              height: `${(d.value / max) * maxHeight * 0.85}px`,
              background: d.color || "linear-gradient(180deg, #1C47FF, #0A1E8C)",
            }}
          />
          <span className="text-[9px] text-[var(--text-muted)] truncate w-full text-center">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// Table row
interface MockupTableProps {
  headers: string[];
  rows: string[][];
}

export function MockupTable({ headers, rows }: MockupTableProps) {
  return (
    <div className="rounded-lg border border-[var(--border-default)] overflow-hidden">
      <div className="flex bg-[var(--surface-subtle)] border-b border-[var(--border-default)]">
        {headers.map((h, i) => (
          <div key={i} className="flex-1 px-3 py-2 text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
            {h}
          </div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} className={`flex ${ri % 2 === 1 ? "bg-[var(--surface-faint)]" : ""} border-b border-[var(--border-default)] last:border-0`}>
          {row.map((cell, ci) => (
            <div key={ci} className="flex-1 px-3 py-2 text-[12px] text-[var(--text-supporting)] font-mono">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Alert / Coach signal
interface MockupAlertProps {
  type?: "info" | "warning" | "critical" | "coach";
  children: React.ReactNode;
}

const alertColors = {
  info: { border: "#1C47FF", bg: "rgba(28,71,255,0.08)", icon: "ℹ" },
  warning: { border: "#F59E0B", bg: "rgba(245,158,11,0.08)", icon: "⚠" },
  critical: { border: "#DC2626", bg: "rgba(220,38,38,0.08)", icon: "●" },
  coach: { border: "#1C47FF", bg: "rgba(28,71,255,0.06)", icon: "💡" },
};

export function MockupAlert({ type = "info", children }: MockupAlertProps) {
  const c = alertColors[type];
  return (
    <div
      className="rounded-lg px-3 py-2.5 text-[12px] text-[var(--text-secondary)] flex items-start gap-2"
      style={{
        background: c.bg,
        borderLeft: `3px solid ${c.border}`,
      }}
    >
      <span className="text-[10px] mt-0.5 shrink-0">{c.icon}</span>
      <span>{children}</span>
    </div>
  );
}

// Live indicator dot
export function MockupLiveDot({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] ${className}`}>
      <span className="animate-live-dot" />
      LIVE
    </span>
  );
}

/* ─── Pre-built Dashboard Presets ─── */

// Pulse Dashboard — the hero mockup
export function PulseDashboardMockup() {
  return (
    <MockupFrame label="Pulse — Sales Pacing" glow>
      <div className="space-y-4">
        {/* Live indicator */}
        <div className="flex items-center justify-between">
          <MockupLiveDot />
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Tuesday, 7:42 PM</span>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label="Revenue" value="$14,280" trend="+12% vs target" trendUp />
          <MockupKPI label="Covers" value="287" trend="+12 vs plan" trendUp color="#22C55E" />
          <MockupKPI label="Avg Check" value="$49.50" trend="-2.1%" trendUp={false} color="#FBBF24" />
          <MockupKPI label="Labor %" value="28.4%" trend="Under 30% target" trendUp color="#22C55E" />
        </div>

        {/* Pace bar */}
        <MockupPaceBar label="Revenue Pace" current={14280} target={18200} unit="$" />

        {/* Server table */}
        <MockupTable
          headers={["Server", "Sales", "Upsell %", "Avg Check"]}
          rows={[
            ["Sarah M.", "$2,840", "32%", "$52.10"],
            ["Marcus J.", "$2,410", "28%", "$48.20"],
            ["James K.", "$1,960", "18%", "$44.50"],
          ]}
        />

        {/* Coach signal */}
        <MockupAlert type="coach">
          James K. upsell rate is 14% below shift average. Consider pairing with Sarah for the next 2 tables.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

// Benchmark Dashboard
export function BenchmarkDashboardMockup() {
  return (
    <MockupFrame label="Benchmarks — Competitive Position">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="RevPASH Index" value="112" trend="12% above peers" trendUp color="#22C55E" />
          <MockupKPI label="Seat Occupancy" value="74%" trend="vs 68% market" trendUp color="#1C47FF" />
          <MockupKPI label="Avg Check Index" value="98" trend="2% below peers" trendUp={false} color="#FBBF24" />
        </div>
        <MockupBarChart
          data={[
            { label: "Mon", value: 65, color: "#1C47FF" },
            { label: "Tue", value: 78, color: "#1C47FF" },
            { label: "Wed", value: 82, color: "#22C55E" },
            { label: "Thu", value: 91, color: "#22C55E" },
            { label: "Fri", value: 110, color: "#22C55E" },
            { label: "Sat", value: 105, color: "#22C55E" },
            { label: "Sun", value: 72, color: "#1C47FF" },
          ]}
        />
      </div>
    </MockupFrame>
  );
}

// Revenue Assurance Dashboard
export function RevenueAssuranceMockup() {
  return (
    <MockupFrame label="Revenue Assurance — Leakage Detection">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Total Leakage" value="$2,630" color="#FF5450" />
          <MockupKPI label="Void Rate" value="3.2%" trend="+0.8% vs avg" trendUp={false} color="#FBBF24" />
          <MockupKPI label="Exceptions" value="14" color="#FF5450" />
        </div>
        <MockupTable
          headers={["Type", "Count", "Amount", "Server"]}
          rows={[
            ["Void after print", "6", "$840", "Multiple"],
            ["Unauthorized disc.", "4", "$620", "James K."],
            ["Price override", "3", "$480", "Marcus J."],
            ["Comp no approval", "1", "$690", "James K."],
          ]}
        />
        <MockupAlert type="critical">
          James K. has 5 exceptions this shift — 3x the team average. Review recommended.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}
