"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

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
  const { locale } = useWebsiteI18n();
  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] ${className}`}>
      <span className="animate-live-dot" />
      {locale === "ar" ? "مباشر" : locale === "fr" ? "EN DIRECT" : locale === "es" ? "EN VIVO" : "LIVE"}
    </span>
  );
}

/* ─── Pre-built Dashboard Presets ─── */

// Pulse Dashboard — the hero mockup
export function PulseDashboardMockup() {
  const { locale } = useWebsiteI18n();
  const label = locale === "ar" ? "Pulse — وتيرة المبيعات" : locale === "fr" ? "Pulse - Rythme des ventes" : locale === "es" ? "Pulse - Ritmo de ventas" : "Pulse — Sales Pacing";
  const live = locale === "ar" ? "مباشر" : locale === "fr" ? "EN DIRECT" : locale === "es" ? "EN VIVO" : "LIVE";
  const updatedAt = locale === "ar" ? "الثلاثاء، 7:42 مساءً" : locale === "fr" ? "Mardi, 19:42" : locale === "es" ? "Martes, 7:42 PM" : "Tuesday, 7:42 PM";
  const revenue = locale === "ar" ? "الايراد" : locale === "fr" ? "Revenu" : locale === "es" ? "Ingresos" : "Revenue";
  const covers = locale === "ar" ? "الضيوف" : locale === "fr" ? "Couverts" : locale === "es" ? "Cubiertos" : "Covers";
  const avgCheck = locale === "ar" ? "متوسط الفاتورة" : locale === "fr" ? "Ticket moyen" : locale === "es" ? "Ticket medio" : "Avg Check";
  const labor = locale === "ar" ? "العمالة %" : locale === "fr" ? "Main-d'oeuvre %" : locale === "es" ? "% Labor" : "Labor %";
  const paceLabel = locale === "ar" ? "وتيرة الايراد" : locale === "fr" ? "Rythme du revenu" : locale === "es" ? "Ritmo de ingresos" : "Revenue Pace";
  const headers = locale === "ar" ? ["الموظف", "المبيعات", "نسبة البيع الاضافي", "متوسط الفاتورة"] : locale === "fr" ? ["Serveur", "Ventes", "Ventes additionnelles %", "Ticket moyen"] : locale === "es" ? ["Mesero", "Ventas", "Venta adicional %", "Ticket medio"] : ["Server", "Sales", "Upsell %", "Avg Check"];
  const coachAlert = locale === "ar"
    ? "معدل البيع الاضافي لدى James K. اقل بـ 14 نقطة عن متوسط الوردية. فكر في إقرانه مع Sarah للطلبتين القادمتين."
    : locale === "fr"
      ? "Le taux de vente additionnelle de James K. est 14 points sous la moyenne du service. Pensez a le faire travailler avec Sarah pour les 2 prochaines tables."
      : locale === "es"
        ? "La tasa de venta adicional de James K. esta 14 puntos por debajo del promedio del turno. Considera emparejarlo con Sarah para las proximas 2 mesas."
        : "James K. upsell rate is 14pp below shift average. Consider pairing with Sarah for the next 2 tables.";

  return (
    <MockupFrame label={label} glow>
      <div className="space-y-4">
        {/* Live indicator */}
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
            <span className="animate-live-dot" />
            {live}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] font-mono">{updatedAt}</span>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-4 gap-3">
          <MockupKPI label={revenue} value="$14,280" trend={locale === "ar" ? "+12% مقابل الهدف" : locale === "fr" ? "+12% vs objectif" : locale === "es" ? "+12% vs objetivo" : "+12% vs target"} trendUp />
          <MockupKPI label={covers} value="287" trend={locale === "ar" ? "+12 مقابل الخطة" : locale === "fr" ? "+12 vs plan" : locale === "es" ? "+12 vs plan" : "+12 vs plan"} trendUp color="#22C55E" />
          <MockupKPI label={avgCheck} value="$49.50" trend="-2.1%" trendUp={false} color="#FBBF24" />
          <MockupKPI label={labor} value="28.4%" trend={locale === "ar" ? "اقل من 30% هدف" : locale === "fr" ? "Sous l objectif 30%" : locale === "es" ? "Bajo objetivo 30%" : "Under 30% target"} trendUp color="#22C55E" />
        </div>

        {/* Pace bar */}
        <MockupPaceBar label={paceLabel} current={14280} target={18200} unit="$" />

        {/* Server table */}
        <MockupTable
          headers={headers}
          rows={[
            ["Sarah M.", "$2,840", "32%", "$52.10"],
            ["Marcus J.", "$2,410", "28%", "$48.20"],
            ["James K.", "$1,960", "18%", "$44.50"],
          ]}
        />

        {/* Coach signal */}
        <MockupAlert type="coach">
          {coachAlert}
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

// Watchtower Command Center
export function WatchtowerMockup() {
  return (
    <MockupFrame label="Watchtower — Market Intelligence">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <MockupLiveDot />
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Signals: 14 active</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Competitor Changes" value="7" color="#F59E0B" />
          <MockupKPI label="Weather Impact" value="-12%" trend="Rain forecast Fri" trendUp={false} color="#FF5450" />
          <MockupKPI label="Local Events" value="3" trend="High-impact weekend" trendUp color="#22C55E" />
        </div>

        <MockupAlert type="warning">
          Competitor &quot;Noma 2.0&quot; dropped lunch prices 15% — 0.3 mi away. Your footfall may shift.
        </MockupAlert>

        <MockupTable
          headers={["Signal", "Impact", "Action"]}
          rows={[
            ["Friday rain forecast", "−$2,400 est.", "Push delivery promo"],
            ["Marathon Sunday", "+$5,100 est.", "Staff +3 for brunch"],
            ["New competitor menu", "Medium risk", "Monitor 7 days"],
          ]}
        />

        <MockupAlert type="coach">
          Weekend forecast: +18% foot traffic from marathon. Pre-order prep ingredients by Thursday EOD.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

// Insights Module Grid
export function InsightsModuleMockup() {
  const modules = [
    { name: "Revenue", value: "$847K", trend: "+8.2%", up: true },
    { name: "Labor", value: "28.1%", trend: "−0.4pp", up: true },
    { name: "Inventory", value: "2.1%", trend: "Waste ↓", up: true },
    { name: "Marketing", value: "4.2x", trend: "ROAS", up: true },
    { name: "Guest CRM", value: "68%", trend: "Retention", up: true },
    { name: "Purchasing", value: "$12K", trend: "Saved", up: true },
  ];

  return (
    <MockupFrame label="Insights — 12 Intelligence Modules">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {modules.map((m) => (
            <div key={m.name} className="bg-white/[0.03] rounded-lg p-3 border border-[var(--border-default)]">
              <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-wider">{m.name}</div>
              <div className="text-lg font-bold font-mono text-[#1C47FF]">{m.value}</div>
              <div className="text-[10px] text-[#22C55E]">▲ {m.trend}</div>
            </div>
          ))}
        </div>

        <MockupAlert type="coach">
          Cross-Intelligence: Labor cost spike on Tuesdays correlates with 23% lower covers. Consider restructuring Tuesday shifts.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

// Intelligence Chat Interface
export function IntelligenceChatMockup() {
  return (
    <MockupFrame label="Sundae Intelligence — Chat">
      <div className="space-y-3">
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-[#1C47FF]/20 border border-[#1C47FF]/30 rounded-xl rounded-br-sm px-3 py-2 max-w-[75%]">
            <p className="text-[12px] text-[var(--text-secondary)]">
              What was my best performing outlet last week and why?
            </p>
          </div>
        </div>

        {/* AI response */}
        <div className="flex justify-start">
          <div className="bg-white/[0.04] border border-[var(--border-default)] rounded-xl rounded-bl-sm px-3 py-2.5 max-w-[85%]">
            <p className="text-[12px] text-[var(--text-secondary)] leading-relaxed">
              <span className="text-[#1C47FF] font-semibold">Downtown</span> led with <span className="font-mono text-[#22C55E]">$127K</span> revenue (+14% WoW). Key drivers:
            </p>
            <ul className="text-[11px] text-[var(--text-muted)] mt-1.5 space-y-0.5 pl-3">
              <li>• Avg check up $4.20 from new prix fixe</li>
              <li>• Saturday covers hit 340 (capacity: 92%)</li>
              <li>• Server upsell rate 31% vs 24% portfolio avg</li>
            </ul>
          </div>
        </div>

        {/* Follow-up */}
        <div className="flex justify-end">
          <div className="bg-[#1C47FF]/20 border border-[#1C47FF]/30 rounded-xl rounded-br-sm px-3 py-2 max-w-[75%]">
            <p className="text-[12px] text-[var(--text-secondary)]">
              Replicate that prix fixe across all outlets?
            </p>
          </div>
        </div>

        {/* Typing indicator */}
        <div className="flex justify-start">
          <div className="bg-white/[0.04] border border-[var(--border-default)] rounded-xl rounded-bl-sm px-3 py-2">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-pulse [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        </div>
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

/* ─── Foresight Intelligence Mockup ─── */

export function ForesightDashboardMockup() {
  return (
    <MockupFrame label="Foresight — 14-Day Revenue Forecast">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Forecast Revenue" value="$248K" trend="+6.2% vs last period" trendUp />
          <MockupKPI label="Confidence" value="91%" color="#22C55E" />
          <MockupKPI label="MAPE" value="3.8%" trend="↓ from 5.1%" trendUp color="#22C55E" />
        </div>
        {/* Forecast timeline with confidence band */}
        <div className="space-y-1.5">
          <div className="text-[10px] text-[var(--text-muted)] font-medium">14-DAY FORECAST · CONFIDENCE BAND</div>
          <div className="relative h-20 bg-[var(--surface-faint)] rounded-lg overflow-hidden">
            {/* Confidence band */}
            <div className="absolute inset-0 flex items-end">
              <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
                {/* Confidence fill */}
                <path d="M0,40 L15,38 L30,35 L45,32 L60,30 L75,28 L90,25 L105,22 L120,20 L135,18 L150,22 L165,25 L180,20 L200,18 L200,50 L180,42 L165,45 L150,44 L135,38 L120,40 L105,42 L90,45 L75,48 L60,50 L45,50 L30,52 L15,52 L0,54 Z" fill="rgba(28,71,255,0.12)" />
                {/* Forecast line */}
                <path d="M0,47 L15,45 L30,43 L45,41 L60,40 L75,38 L90,35 L105,32 L120,30 L135,28 L150,33 L165,35 L180,31 L200,28" fill="none" stroke="#1C47FF" strokeWidth="1.5" />
                {/* Actual line (past) */}
                <path d="M0,47 L15,45 L30,43 L45,41 L60,40 L75,38 L90,35" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeDasharray="3,2" />
                {/* Today marker */}
                <line x1="90" y1="0" x2="90" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2,2" />
                <text x="90" y="8" fill="rgba(255,255,255,0.4)" fontSize="4" textAnchor="middle">Today</text>
              </svg>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[9px] text-[var(--text-muted)]">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 rounded-full bg-[#22C55E]" /> Actual</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 rounded-full bg-[#1C47FF]" /> Forecast</span>
            <span className="flex items-center gap-1"><span className="w-3 h-1.5 rounded-sm bg-[rgba(28,71,255,0.12)]" /> Confidence</span>
          </div>
        </div>
        {/* AI Briefing snippet */}
        <div className="p-2.5 rounded-lg bg-[rgba(28,71,255,0.06)] border border-[rgba(28,71,255,0.15)]">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-4 h-4 rounded-full bg-[#1C47FF] flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">S</span>
            </div>
            <span className="text-[10px] font-semibold text-[var(--text-secondary)]">Sundae Coach Briefing</span>
          </div>
          <p className="text-[9px] text-[var(--text-supporting)] leading-relaxed">
            Weekend revenue projected +8% above baseline. Thursday shows 12% downside risk — 2 staff vacations overlap with a local sports event. Consider calling in backup.
          </p>
        </div>
        <MockupAlert type="info">3 scenarios simulated · Baseline confidence: 91% · Next briefing: Tomorrow 6:00 AM</MockupAlert>
      </div>
    </MockupFrame>
  );
}

/* ─── Marketing Performance Mockup (Marketing persona — Insights:Marketing) ─── */

export function MarketingPerformanceMockup() {
  return (
    <MockupFrame label="Marketing Performance — Campaign ROI">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <MockupLiveDot />
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Last 7 days</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Blended ROAS" value="4.2x" trend="+0.6 vs LW" trendUp color="#22C55E" />
          <MockupKPI label="Attributed covers" value="1,840" trend="38% of total" trendUp color="#1C47FF" />
          <MockupKPI label="Cost per cover" value="$2.10" trend="−$0.40 vs LW" trendUp color="#22C55E" />
        </div>

        <MockupTable
          headers={["Channel", "Spend", "Covers", "ROAS"]}
          rows={[
            ["Loyalty push", "$1,400", "612", "5.8x"],
            ["Paid social", "$2,200", "548", "3.9x"],
            ["Search", "$1,100", "412", "4.4x"],
            ["Email", "$320", "268", "6.1x"],
          ]}
        />

        <MockupAlert type="coach">
          Cross-Intelligence: Loyalty-push covers convert at 2.3× search rate when paired with the lunch combo. Reallocate $400 from search → loyalty next week.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

/* ─── Revenue Intelligence Mockup (CFO persona — Insights:Revenue) ─── */

export function RevenueIntelligenceMockup() {
  return (
    <MockupFrame label="Revenue Intelligence — Portfolio Today">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <MockupLiveDot />
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Today · vs forecast</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Net revenue today" value="$184K" trend="+3.2% vs forecast" trendUp color="#22C55E" />
          <MockupKPI label="Gross margin" value="62.4%" trend="−0.8pp WoW" trendUp={false} color="#FBBF24" />
          <MockupKPI label="Variance MTD" value="+$5.8K" trend="vs plan" trendUp color="#22C55E" />
        </div>

        <MockupTable
          headers={["Channel", "Today", "Mix %", "vs LW"]}
          rows={[
            ["Dine-in", "$112K", "61%", "+4.1%"],
            ["Delivery", "$48K", "26%", "+1.8%"],
            ["Catering", "$18K", "10%", "−2.4%"],
            ["Retail", "$6K", "3%", "+0.6%"],
          ]}
        />

        <MockupAlert type="coach">
          Catering down WoW driven by 2 cancelled corporate orders. Net revenue still pacing +3.2% on dine-in strength.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

/* ─── Labor Operations Mockup (HR / People persona) ─── */

export function LaborOpsMockup() {
  return (
    <MockupFrame label="Labor — Live Variance">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <MockupLiveDot />
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Saturday · 1:24 PM</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Labor % portfolio" value="29.6%" trend="+1.2pp vs target" trendUp={false} color="#FBBF24" />
          <MockupKPI label="OT exposure" value="$840" trend="3 locations" trendUp={false} color="#FF5450" />
          <MockupKPI label="Productivity" value="6.8" trend="covers per FOH hr" trendUp color="#22C55E" />
        </div>

        <MockupTable
          headers={["Location", "Labor %", "OT risk", "Cover/hr"]}
          rows={[
            ["Downtown", "32.1%", "High", "5.4"],
            ["Marina", "28.4%", "Low", "7.2"],
            ["Airport", "30.8%", "Med", "6.1"],
            ["Suburbs", "27.2%", "Low", "7.8"],
          ]}
        />

        <MockupAlert type="warning">
          Downtown schedule is 11% above plan for Sat 7–11pm. Reassign 2 covers to Marina staff or trim one shift.
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}

/* ─── Integrations Hub Mockup (Tech / Data persona) ─── */

const INTEGRATIONS_STATUS: Array<[string, "OK" | "Lag 8m" | "OK"]> = [
  ["POS · Toast", "OK"],
  ["POS · Square", "OK"],
  ["Labor · 7shifts", "OK"],
  ["Inventory · Crunchtime", "OK"],
  ["Delivery · DoorDash", "OK"],
  ["Delivery · UberEats", "Lag 8m"],
  ["Accounting · QuickBooks", "OK"],
  ["Reservations · OpenTable", "OK"],
];

export function IntegrationsHubMockup() {
  return (
    <MockupFrame label="Integrations — Data Health">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <MockupLiveDot />
          <span className="text-[10px] text-[var(--text-muted)] font-mono">Last sync: 14m ago</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <MockupKPI label="Active sources" value="14" trend="12 domains" trendUp color="#1C47FF" />
          <MockupKPI label="Sync rate (7d)" value="99.4%" trend="SLO: 99%" trendUp color="#22C55E" />
          <MockupKPI label="p95 lag" value="4.2m" color="#1C47FF" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {INTEGRATIONS_STATUS.map(([name, status]) => {
            const isOk = status === "OK";
            return (
              <div
                key={name}
                className="flex items-center justify-between bg-white/[0.03] border border-[var(--border-default)] rounded-lg px-3 py-2 text-[11px]"
              >
                <span className="text-[var(--text-secondary)] truncate">{name}</span>
                <span className={isOk ? "text-[#22C55E]" : "text-[#FBBF24]"}>
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle" style={{ backgroundColor: isOk ? "#22C55E" : "#FBBF24" }} />
                  {status}
                </span>
              </div>
            );
          })}
        </div>

        <MockupAlert type="info">
          179 governed data models · public API · webhooks · RBAC · audit trails
        </MockupAlert>
      </div>
    </MockupFrame>
  );
}
