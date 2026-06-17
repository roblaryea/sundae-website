"use client";

/**
 * Daypart Margin Leak Estimator - depth-grade replacement for the shallow
 * labor-cost calculator. Computes daypart-level overstaffing leakage by
 * correlating labor hours against revenue density per daypart, then
 * projects annual leakage and surfaces the highest-leak daypart with a
 * specific corrective action.
 *
 * Why this is depth-grade (and why operators can't do it in Excel without
 * heavy modeling):
 *   • Multi-daypart correlation (not a single % calc)
 *   • Productivity ratio per daypart (revenue / labor hour)
 *   • Identifies the WORST daypart by leakage, not just an aggregate
 *   • Outputs a specific corrective action with $/$wk impact
 *   • Annualized projection across outlets
 *
 * This is the kind of calculation Sundae's Labor Intelligence + Pulse run
 * continuously in-product. The calculator gives prospects a taste of what
 * the platform surfaces every day, automatically, across every outlet.
 */

import { useState, useMemo, type ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SundaeIcon } from "@/components/icons";
import { CURRENCIES, CURRENCY_REGIONS, getCurrencySymbol } from "@/lib/currencies";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { type RequiredEnglishLocalizedRecord } from "@/lib/i18n";
import { getGeneratedLocalCopy } from "@/lib/generatedLocalCopy";
import { generatedLocalCopy } from "@/generated-locales/app_tools_daypart_margin_leak_page";

type DaypartCopy = {
  back: string;
  hero: { badge: string; title: string; description: string };
  baseline: { title: string; subtitle: string };
  fields: {
    segment: string;
    currency: string;
    targetSuffix: string; // "{pct}% target"
    dailyRevenue: string;
    hourlyLabor: string;
    outletCount: string;
  };
  segments: Record<keyof typeof SEGMENT_TARGETS, string>;
  breakdown: { title: string; subtitle: string };
  dayparts: Record<DaypartId, string>;
  placeholders: { revPct: string; fte: string };
  results: {
    recoverableTitle: string;
    to: string; // "to" connector in the "{low} to {high}" range
    multiOutlet: string; // "across {outlets} outlets · midpoint ≈ {mid}/yr per outlet · over {days} operating days"
    singleOutlet: string; // "per outlet · {days} operating days/yr · conservative recovery factor applied"
    assumes: string; // "{low}-{high}% ..."
  };
  heatmap: { title: string; perDay: string }; // "{amt}/day recoverable"
  recommend: {
    label: string;
    /** "{daypart} shows the largest gap to the {pct}% {segment} target. A trim of ~{fteHours} FTE-hours would recover an estimated {range}/wk per outlet - pending a coverage-floor review." */
    body: string;
    note: string;
  };
  cta: string;
  footnoteLabel: string;
  footnote: string; // "... {low}-{high}% ... {days} ..."
};

type DaypartId = "morning" | "lunch" | "afternoon" | "dinner" | "lateNight";

type DaypartInput = {
  id: DaypartId;
  label: string;
  hours: string;       // e.g. "06:00-10:30"
  revenuePct: string;  // 0-100, share of daily revenue
  staffFte: string;    // FTE during this window
};

const DEFAULT_DAYPARTS: DaypartInput[] = [
  { id: "morning",    label: "Morning",     hours: "06:00-10:30", revenuePct: "8",  staffFte: "4" },
  { id: "lunch",      label: "Lunch",       hours: "11:00-14:30", revenuePct: "32", staffFte: "9" },
  { id: "afternoon",  label: "Afternoon",   hours: "14:30-17:00", revenuePct: "6",  staffFte: "7" },
  { id: "dinner",     label: "Dinner",      hours: "17:00-22:00", revenuePct: "48", staffFte: "11" },
  { id: "lateNight",  label: "Late Night",  hours: "22:00-01:00", revenuePct: "6",  staffFte: "5" },
];

// Segment-aware target labor cost % - replaces the prior single 28% heuristic
// with industry-honest ranges. Used as the upper-bound target (anything
// above this band is potentially trimmable, conservatively).
const SEGMENT_TARGETS: Record<string, { label: string; targetPct: number }> = {
  qsr:          { label: "QSR / Fast food",       targetPct: 0.25 },
  fast_casual:  { label: "Fast-casual",           targetPct: 0.28 },
  casual:       { label: "Casual dining",         targetPct: 0.32 },
  fine_dining:  { label: "Fine dining",           targetPct: 0.36 },
  hotel_fb:     { label: "Hotel F&B",             targetPct: 0.34 },
  cloud:        { label: "Cloud kitchen",         targetPct: 0.22 },
  cafe_bakery:  { label: "Café / Bakery",         targetPct: 0.27 },
};

// Conservative recovery factor: only ~35-50% of identified overspend
// is realistically recoverable in the first quarter (you can't fully
// match staffing to demand without breaking service or coverage floors).
const RECOVERY_FACTOR_LOW = 0.35;
const RECOVERY_FACTOR_HIGH = 0.50;
// Account for closed days - most operators close 10-20 days a year
// for holidays, deep cleans, renovations.
const OPERATING_DAYS = 350;

const localizedCopy: RequiredEnglishLocalizedRecord<DaypartCopy> = {
  en: {
    back: "Back to Tools",
    hero: {
      badge: "INSIGHT-GRADE · LABOR INTELLIGENCE",
      title: "Daypart Margin Leak Estimator",
      description:
        "Find the daypart bleeding margin from overstaffing. Most labor-cost calculators give you one aggregate %. This one breaks the day into five windows and surfaces the worst offender - with a specific corrective action and annualized impact.",
    },
    baseline: { title: "Outlet baseline", subtitle: "Per outlet, current operating average." },
    fields: {
      segment: "Segment",
      currency: "Currency",
      targetSuffix: "{pct}% target",
      dailyRevenue: "Daily revenue / outlet",
      hourlyLabor: "Hourly labor cost",
      outletCount: "Outlet count",
    },
    segments: {
      qsr: "QSR / Fast food",
      fast_casual: "Fast-casual",
      casual: "Casual dining",
      fine_dining: "Fine dining",
      hotel_fb: "Hotel F&B",
      cloud: "Cloud kitchen",
      cafe_bakery: "Café / Bakery",
    },
    breakdown: {
      title: "Daypart breakdown",
      subtitle:
        "Share of daily revenue and current FTE staffing per window. Revenue % across all dayparts should sum to ~100.",
    },
    dayparts: {
      morning: "Morning",
      lunch: "Lunch",
      afternoon: "Afternoon",
      dinner: "Dinner",
      lateNight: "Late Night",
    },
    placeholders: { revPct: "Rev %", fte: "FTE" },
    results: {
      recoverableTitle: "Recoverable annual labor cost · range",
      to: "to",
      multiOutlet:
        "across {outlets} outlets · midpoint ≈ {mid}/yr per outlet · over {days} operating days",
      singleOutlet: "per outlet · {days} operating days/yr · conservative recovery factor applied",
      assumes:
        "Assumes {low}-{high}% of identified overspend is realistically recoverable in the first quarter - the rest is service-floor staffing you can’t trim without breaking coverage.",
    },
    heatmap: { title: "Daypart leak heatmap", perDay: "{amt}/day recoverable" },
    recommend: {
      label: "What Sundae would investigate first",
      body:
        "{daypart} shows the largest gap to the {pct}% {segment} target. A trim of ~{fteHours} FTE-hours would recover an estimated {range}/wk per outlet - pending a coverage-floor review.",
      note: "In production, Sundae Pulse calibrates the target against your historical productivity curves (not a fixed segment band), respects per-outlet coverage floors, and surfaces the candidate shift before payroll is locked.",
    },
    cta: "See this live on your data",
    footnoteLabel: "Methodology (conservative defaults):",
    footnote:
      "Daypart labor cost = FTE × duration × hourly wage. Target = segment-specific labor % of daypart revenue (QSR 25% → fine dining 36%). Identified overspend = current − target. Only {low}-{high}% of identified overspend is counted as realistically recoverable - the rest is service-floor staffing or unavoidable coverage. Annualized over {days} operating days/yr. Output is a range, never a single optimistic figure. Sundae Pulse calibrates against your historical productivity curves per-outlet and respects per-shift coverage floors - the in-product version is consistently sharper and more conservative than this estimator.",
  },
};

/** Plain string interpolation: replaces {token} with the matching value. */
function tpl(s: string, v: Record<string, string | number>): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in v ? String(v[k]) : `{${k}}`));
}

/**
 * Token interpolation that keeps the dynamic values bold while leaving word
 * order to the translation - splits on {token} and swaps in ReactNodes.
 */
function interpolateNodes(s: string, v: Record<string, ReactNode>): ReactNode[] {
  return s.split(/(\{\w+\})/g).map((part, i) => {
    const m = part.match(/^\{(\w+)\}$/);
    return m && m[1] in v ? <span key={i}>{v[m[1]]}</span> : <span key={i}>{part}</span>;
  });
}

export default function DaypartMarginLeakPage() {
  const { locale } = useWebsiteI18n();
  const copy =
    localizedCopy[locale as keyof typeof localizedCopy] ??
    getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ??
    localizedCopy.en;
  const [dailyRevenue, setDailyRevenue] = useState("4500");
  const [hourlyLaborCost, setHourlyLaborCost] = useState("18");
  const [outletCount, setOutletCount] = useState("1");
  const [currency, setCurrency] = useState("USD");
  const [segment, setSegment] = useState<keyof typeof SEGMENT_TARGETS>("casual");
  const [dayparts, setDayparts] = useState<DaypartInput[]>(DEFAULT_DAYPARTS);
  const symbol = getCurrencySymbol(currency);
  const segmentTargetPct = SEGMENT_TARGETS[segment]?.targetPct ?? 0.32;

  // Calculation: revenue density per daypart × current staff FTE → identify
  // overstaffing. Output is a RANGE (low → high) using conservative
  // recovery factors, not a single optimistic number.
  const analysis = useMemo(() => {
    const rev = parseFloat(dailyRevenue) || 0;
    const wage = parseFloat(hourlyLaborCost) || 0;
    const outlets = parseInt(outletCount) || 1;
    if (rev <= 0 || wage <= 0) return null;

    const HOURS_PER_DAYPART: Record<DaypartId, number> = {
      morning: 4.5, lunch: 3.5, afternoon: 2.5, dinner: 5, lateNight: 3,
    };

    const rows = dayparts.map((dp) => {
      const revPct = parseFloat(dp.revenuePct) || 0;
      const fte = parseFloat(dp.staffFte) || 0;
      const durationHrs = HOURS_PER_DAYPART[dp.id];
      const dayRev = rev * (revPct / 100);
      const laborCost = fte * durationHrs * wage;
      // Target labor cost based on segment (not a flat 28%)
      const targetLaborCost = dayRev * segmentTargetPct;
      // Identified overspend (before applying recovery factor)
      const identifiedOverspend = Math.max(0, laborCost - targetLaborCost);
      // Conservative recovery range - only a fraction is realistically trimmable
      const recoverableLow = identifiedOverspend * RECOVERY_FACTOR_LOW;
      const recoverableHigh = identifiedOverspend * RECOVERY_FACTOR_HIGH;
      // Trim suggestion based on midpoint
      const recoverableMid = (recoverableLow + recoverableHigh) / 2;
      const trimmableFteHours = wage > 0 ? recoverableMid / wage : 0;
      return {
        ...dp,
        durationHrs,
        dayRev,
        laborCost,
        targetLaborCost,
        identifiedOverspend,
        recoverableLow,
        recoverableHigh,
        trimmableFteHours,
      };
    });

    const totalDailyLeakLow = rows.reduce((sum, r) => sum + r.recoverableLow, 0);
    const totalDailyLeakHigh = rows.reduce((sum, r) => sum + r.recoverableHigh, 0);
    const annualLeakLow = totalDailyLeakLow * OPERATING_DAYS * outlets;
    const annualLeakHigh = totalDailyLeakHigh * OPERATING_DAYS * outlets;
    const annualLeakPerOutletMid = ((totalDailyLeakLow + totalDailyLeakHigh) / 2) * OPERATING_DAYS;

    const worst = [...rows].sort((a, b) => b.identifiedOverspend - a.identifiedOverspend)[0];

    return {
      rows,
      annualLeakLow,
      annualLeakHigh,
      annualLeakPerOutletMid,
      worst,
      outlets,
    };
  }, [dayparts, dailyRevenue, hourlyLaborCost, outletCount, segmentTargetPct]);

  const fmt = (n: number) => `${symbol}${Math.round(n).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors"
          >
            <SundaeIcon name="balance" size="sm" />
            {copy.back}
          </Link>
          <span className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--warm-coral)] mb-3">
            {copy.hero.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-3 text-balance">
            {copy.hero.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-supporting)] max-w-2xl">
            {copy.hero.description}
          </p>
        </div>
      </section>

      {/* Inputs */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column: inputs */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-[var(--border-default)] bg-white/[0.02] p-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                {copy.baseline.title}
              </h2>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                {copy.baseline.subtitle}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                    {copy.fields.segment}
                  </label>
                  <select
                    value={segment}
                    onChange={(e) => setSegment(e.target.value as keyof typeof SEGMENT_TARGETS)}
                    className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]"
                  >
                    {Object.entries(SEGMENT_TARGETS).map(([k, v]) => (
                      <option key={k} value={k}>
                        {copy.segments[k as keyof typeof SEGMENT_TARGETS]} ({tpl(copy.fields.targetSuffix, { pct: Math.round(v.targetPct * 100) })})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                    {copy.fields.currency}
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]"
                  >
                    {CURRENCY_REGIONS.map((region) => (
                      <optgroup key={region} label={region}>
                        {CURRENCIES.filter((c) => c.region === region).map((c) => (
                          <option key={c.code} value={c.code}>{c.code} - {c.symbol}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                    {copy.fields.dailyRevenue}
                  </label>
                  <div className="flex">
                    <span className="bg-white/[0.04] border border-[var(--border-default)] border-r-0 rounded-l-lg px-3 py-2 text-sm text-[var(--text-muted)]">
                      {symbol}
                    </span>
                    <input
                      type="number"
                      value={dailyRevenue}
                      onChange={(e) => setDailyRevenue(e.target.value)}
                      className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-r-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                    {copy.fields.hourlyLabor}
                  </label>
                  <div className="flex">
                    <span className="bg-white/[0.04] border border-[var(--border-default)] border-r-0 rounded-l-lg px-3 py-2 text-sm text-[var(--text-muted)]">
                      {symbol}
                    </span>
                    <input
                      type="number"
                      value={hourlyLaborCost}
                      onChange={(e) => setHourlyLaborCost(e.target.value)}
                      className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-r-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                    {copy.fields.outletCount}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={outletCount}
                    onChange={(e) => setOutletCount(e.target.value)}
                    className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-default)] bg-white/[0.02] p-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                {copy.breakdown.title}
              </h2>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                {copy.breakdown.subtitle}
              </p>
              <div className="space-y-2">
                {dayparts.map((dp, i) => (
                  <div key={dp.id} className="grid grid-cols-4 gap-2 items-center">
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{copy.dayparts[dp.id]}</div>
                      <div className="text-[10px] text-[var(--text-muted)]">{dp.hours}</div>
                    </div>
                    <div className="col-span-3 grid grid-cols-2 gap-2">
                      <div className="flex">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={dp.revenuePct}
                          onChange={(e) => {
                            const next = [...dayparts];
                            next[i] = { ...dp, revenuePct: e.target.value };
                            setDayparts(next);
                          }}
                          className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-l-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]"
                          placeholder={copy.placeholders.revPct}
                        />
                        <span className="bg-white/[0.04] border border-[var(--border-default)] border-l-0 rounded-r-lg px-2 py-2 text-xs text-[var(--text-muted)]">
                          %
                        </span>
                      </div>
                      <div className="flex">
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={dp.staffFte}
                          onChange={(e) => {
                            const next = [...dayparts];
                            next[i] = { ...dp, staffFte: e.target.value };
                            setDayparts(next);
                          }}
                          className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-l-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]"
                          placeholder={copy.placeholders.fte}
                        />
                        <span className="bg-white/[0.04] border border-[var(--border-default)] border-l-0 rounded-r-lg px-2 py-2 text-xs text-[var(--text-muted)]">
                          FTE
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: results */}
          <div className="lg:col-span-2">
            {analysis && (
              <div className="lg:sticky lg:top-32 space-y-4">
                <div className="rounded-2xl border-2 border-[var(--warm-coral)]/40 bg-gradient-to-br from-[var(--warm-coral)]/8 to-transparent p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--warm-coral)] mb-2">
                    {copy.results.recoverableTitle}
                  </p>
                  <div className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tabular-nums mb-1">
                    {fmt(analysis.annualLeakLow)} <span className="text-base text-[var(--text-muted)] font-medium">{copy.results.to}</span> {fmt(analysis.annualLeakHigh)}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {analysis.outlets > 1
                      ? tpl(copy.results.multiOutlet, { outlets: analysis.outlets, mid: fmt(analysis.annualLeakPerOutletMid), days: OPERATING_DAYS })
                      : tpl(copy.results.singleOutlet, { days: OPERATING_DAYS })}
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] italic mt-2 leading-snug">
                    {tpl(copy.results.assumes, { low: Math.round(RECOVERY_FACTOR_LOW * 100), high: Math.round(RECOVERY_FACTOR_HIGH * 100) })}
                  </p>
                </div>

                {/* Daypart heatmap */}
                <div className="rounded-2xl border border-[var(--border-default)] bg-white/[0.02] p-5">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">
                    {copy.heatmap.title}
                  </h3>
                  <div className="space-y-2">
                    {analysis.rows.map((r) => {
                      const maxLeak = Math.max(...analysis.rows.map((x) => x.identifiedOverspend), 1);
                      const widthPct = (r.identifiedOverspend / maxLeak) * 100;
                      const isWorst = r.id === analysis.worst?.id && r.identifiedOverspend > 0;
                      // Show recoverable midpoint, not raw overspend
                      const recoverableMid = (r.recoverableLow + r.recoverableHigh) / 2;
                      return (
                        <div key={r.id}>
                          <div className="flex justify-between text-[11px] mb-0.5">
                            <span className={isWorst ? "text-red-300 font-semibold" : "text-[var(--text-secondary)]"}>
                              {copy.dayparts[r.id]}
                            </span>
                            <span className="text-[var(--text-muted)] tabular-nums">
                              {tpl(copy.heatmap.perDay, { amt: fmt(recoverableMid) })}
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                isWorst ? "bg-red-400" : "bg-[var(--warm-coral)]/70"
                              }`}
                              style={{ width: `${Math.max(2, widthPct)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* What Sundae would do - softer, range-based */}
                {analysis.worst && analysis.worst.identifiedOverspend > 0 && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <SundaeIcon name="speed" size="sm" className="text-emerald-300" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                        {copy.recommend.label}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-3">
                      {interpolateNodes(copy.recommend.body, {
                        daypart: <strong className="text-emerald-200">{copy.dayparts[analysis.worst.id]}</strong>,
                        pct: Math.round(segmentTargetPct * 100),
                        segment: copy.segments[segment],
                        fteHours: <strong className="text-emerald-200">{Math.ceil(analysis.worst.trimmableFteHours)}</strong>,
                        range: <strong className="text-emerald-200">{fmt(analysis.worst.recoverableLow * 7)}-{fmt(analysis.worst.recoverableHigh * 7)}</strong>,
                      })}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                      {copy.recommend.note}
                    </p>
                  </div>
                )}

                <Button href="/demo" variant="primary" className="w-full">
                  {copy.cta}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footnote */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto rounded-xl border border-[var(--border-default)] bg-white/[0.015] p-4">
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            <strong className="text-[var(--text-secondary)]">{copy.footnoteLabel}</strong>{" "}
            {tpl(copy.footnote, {
              low: Math.round(RECOVERY_FACTOR_LOW * 100),
              high: Math.round(RECOVERY_FACTOR_HIGH * 100),
              days: OPERATING_DAYS,
            })}
          </p>
        </div>
      </section>
    </div>
  );
}
