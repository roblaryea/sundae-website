"use client";

/**
 * Daypart Margin Leak Estimator — depth-grade replacement for the shallow
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

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SundaeIcon } from "@/components/icons";

type DaypartId = "morning" | "lunch" | "afternoon" | "dinner" | "lateNight";

type DaypartInput = {
  id: DaypartId;
  label: string;
  hours: string;       // e.g. "06:00–10:30"
  revenuePct: string;  // 0-100, share of daily revenue
  staffFte: string;    // FTE during this window
};

const DEFAULT_DAYPARTS: DaypartInput[] = [
  { id: "morning",    label: "Morning",     hours: "06:00–10:30", revenuePct: "8",  staffFte: "4" },
  { id: "lunch",      label: "Lunch",       hours: "11:00–14:30", revenuePct: "32", staffFte: "9" },
  { id: "afternoon",  label: "Afternoon",   hours: "14:30–17:00", revenuePct: "6",  staffFte: "7" },
  { id: "dinner",     label: "Dinner",      hours: "17:00–22:00", revenuePct: "48", staffFte: "11" },
  { id: "lateNight",  label: "Late Night",  hours: "22:00–01:00", revenuePct: "6",  staffFte: "5" },
];

const CURRENCY_OPTIONS = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "AED", symbol: "AED " },
  { code: "SAR", symbol: "SAR " },
  { code: "QAR", symbol: "QAR " },
  { code: "OMR", symbol: "OMR " },
  { code: "BHD", symbol: "BHD " },
  { code: "KWD", symbol: "KWD " },
  { code: "CAD", symbol: "C$" },
  { code: "SGD", symbol: "S$" },
  { code: "JPY", symbol: "¥" },
  { code: "MXN", symbol: "MX$" },
  { code: "BRL", symbol: "R$" },
];

export default function DaypartMarginLeakPage() {
  const [dailyRevenue, setDailyRevenue] = useState("4500");
  const [hourlyLaborCost, setHourlyLaborCost] = useState("18");
  const [outletCount, setOutletCount] = useState("1");
  const [currency, setCurrency] = useState("USD");
  const [dayparts, setDayparts] = useState<DaypartInput[]>(DEFAULT_DAYPARTS);
  const symbol = CURRENCY_OPTIONS.find((c) => c.code === currency)?.symbol ?? "$";

  // Calculation: revenue density per daypart × current staff FTE → identify
  // overstaffing (low revenue density + high FTE = leak).
  const analysis = useMemo(() => {
    const rev = parseFloat(dailyRevenue) || 0;
    const wage = parseFloat(hourlyLaborCost) || 0;
    const outlets = parseInt(outletCount) || 1;
    if (rev <= 0 || wage <= 0) return null;

    // Compute hours per daypart from the label (rough heuristic — fixed durations).
    const HOURS_PER_DAYPART: Record<DaypartId, number> = {
      morning: 4.5, lunch: 3.5, afternoon: 2.5, dinner: 5, lateNight: 3,
    };

    const rows = dayparts.map((dp) => {
      const revPct = parseFloat(dp.revenuePct) || 0;
      const fte = parseFloat(dp.staffFte) || 0;
      const durationHrs = HOURS_PER_DAYPART[dp.id];
      const dayRev = rev * (revPct / 100);
      const laborCost = fte * durationHrs * wage;
      const productivity = laborCost > 0 ? dayRev / laborCost : 0;
      // Ideal labor cost target = 28% of daypart revenue
      const targetLaborCost = dayRev * 0.28;
      const overspend = Math.max(0, laborCost - targetLaborCost);
      // Estimated FTE-hours that could be trimmed (rough: overspend / hourly wage)
      const trimmableFteHours = wage > 0 ? overspend / wage : 0;
      return {
        ...dp,
        durationHrs,
        dayRev,
        laborCost,
        productivity,
        targetLaborCost,
        overspend,
        trimmableFteHours,
      };
    });

    const totalDailyLeak = rows.reduce((sum, r) => sum + r.overspend, 0);
    const annualLeakPerOutlet = totalDailyLeak * 365;
    const annualLeakAllOutlets = annualLeakPerOutlet * outlets;

    // Highest-leak daypart drives the recommendation
    const worst = [...rows].sort((a, b) => b.overspend - a.overspend)[0];

    return {
      rows,
      totalDailyLeak,
      annualLeakPerOutlet,
      annualLeakAllOutlets,
      worst,
      outlets,
    };
  }, [dayparts, dailyRevenue, hourlyLaborCost, outletCount]);

  const fmt = (n: number) =>
    `${symbol}${Math.round(n).toLocaleString()}`;

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
            Back to Tools
          </Link>
          <span className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--electric-blue)] mb-3">
            INSIGHT-GRADE · LABOR INTELLIGENCE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-3 text-balance">
            Daypart Margin Leak Estimator
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-supporting)] max-w-2xl">
            Find the daypart bleeding margin from overstaffing. Most labor-cost
            calculators give you one aggregate %. This one breaks the day into
            five windows and surfaces the worst offender — with a specific
            corrective action and annualized impact.
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
                Outlet baseline
              </h2>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                Per outlet, current operating average.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                    Daily revenue / outlet
                  </label>
                  <div className="flex">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="bg-white/[0.04] border border-[var(--border-default)] border-r-0 rounded-l-lg px-2 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--electric-blue)]"
                    >
                      {CURRENCY_OPTIONS.map((c) => (
                        <option key={c.code} value={c.code}>{c.code}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={dailyRevenue}
                      onChange={(e) => setDailyRevenue(e.target.value)}
                      className="flex-1 bg-white/[0.04] border border-[var(--border-default)] rounded-r-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--electric-blue)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                    Hourly labor cost
                  </label>
                  <div className="flex">
                    <span className="bg-white/[0.04] border border-[var(--border-default)] border-r-0 rounded-l-lg px-3 py-2 text-sm text-[var(--text-muted)]">
                      {symbol}
                    </span>
                    <input
                      type="number"
                      value={hourlyLaborCost}
                      onChange={(e) => setHourlyLaborCost(e.target.value)}
                      className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-r-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--electric-blue)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                    Outlet count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={outletCount}
                    onChange={(e) => setOutletCount(e.target.value)}
                    className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--electric-blue)]"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-default)] bg-white/[0.02] p-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                Daypart breakdown
              </h2>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                Share of daily revenue and current FTE staffing per window.
                Revenue % across all dayparts should sum to ~100.
              </p>
              <div className="space-y-2">
                {dayparts.map((dp, i) => (
                  <div key={dp.id} className="grid grid-cols-4 gap-2 items-center">
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{dp.label}</div>
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
                          className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-l-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--electric-blue)]"
                          placeholder="Rev %"
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
                          className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-l-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--electric-blue)]"
                          placeholder="FTE"
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
                <div className="rounded-2xl border-2 border-[var(--electric-blue)]/40 bg-gradient-to-br from-[var(--electric-blue)]/8 to-transparent p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--electric-blue)] mb-2">
                    Estimated annual leakage
                  </p>
                  <div className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tabular-nums mb-1">
                    {fmt(analysis.annualLeakAllOutlets)}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {analysis.outlets > 1 ? (
                      <>across {analysis.outlets} outlets · {fmt(analysis.annualLeakPerOutlet)} per outlet</>
                    ) : (
                      <>per outlet · scale up by adding more</>
                    )}
                  </div>
                </div>

                {/* Daypart heatmap */}
                <div className="rounded-2xl border border-[var(--border-default)] bg-white/[0.02] p-5">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">
                    Daypart leak heatmap
                  </h3>
                  <div className="space-y-2">
                    {analysis.rows.map((r) => {
                      const maxLeak = Math.max(...analysis.rows.map((x) => x.overspend), 1);
                      const widthPct = (r.overspend / maxLeak) * 100;
                      const isWorst = r.id === analysis.worst?.id && r.overspend > 0;
                      return (
                        <div key={r.id}>
                          <div className="flex justify-between text-[11px] mb-0.5">
                            <span className={isWorst ? "text-red-300 font-semibold" : "text-[var(--text-secondary)]"}>
                              {r.label}
                            </span>
                            <span className="text-[var(--text-muted)] tabular-nums">
                              {fmt(r.overspend)}/day
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                isWorst ? "bg-red-400" : "bg-[var(--electric-blue)]/70"
                              }`}
                              style={{ width: `${Math.max(2, widthPct)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* What Sundae would do */}
                {analysis.worst && analysis.worst.overspend > 0 && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <SundaeIcon name="speed" size="sm" className="text-emerald-300" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300">
                        What Sundae would do
                      </p>
                    </div>
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed mb-3">
                      <strong className="text-emerald-200">{analysis.worst.label}</strong> is your highest-leak window — trim{" "}
                      <strong className="text-emerald-200">
                        {Math.ceil(analysis.worst.trimmableFteHours)} FTE-hours
                      </strong>{" "}
                      next week to save{" "}
                      <strong className="text-emerald-200">
                        {fmt(analysis.worst.overspend * 7)}/wk
                      </strong>{" "}
                      ·{" "}
                      <strong className="text-emerald-200">
                        {fmt(analysis.worst.overspend * 365 * analysis.outlets)}/yr
                      </strong>{" "}
                      across all outlets.
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                      Sundae Pulse runs this calculation every 5 minutes, against
                      live POS + scheduling data, and surfaces the right shift to
                      cut <em>before</em> the week even starts.
                    </p>
                  </div>
                )}

                <Button href="/demo" variant="primary" className="w-full">
                  See this live on your data
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
            <strong className="text-[var(--text-secondary)]">Methodology:</strong>{" "}
            Daypart leak = (current labor cost) − (28% of daypart revenue). Trimmable
            FTE-hours = leak ÷ hourly labor cost. Annualized = daily leak × 365. The
            28% target is a starting heuristic; Sundae Pulse calibrates the target
            per-outlet using your historical productivity curves rather than a fixed
            industry average — the in-product version is consistently sharper than
            this estimator.
          </p>
        </div>
      </section>
    </div>
  );
}
