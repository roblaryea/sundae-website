"use client";

/**
 * Upsell Opportunity Index - depth-grade replacement for the shallow
 * menu-margin calculator. Quantifies the revenue Sundae's Guest Experience
 * + Revenue Intelligence modules would surface by analyzing attach-rate
 * gaps across menu categories.
 *
 * Why this is depth-grade:
 *   • Multi-category attach rate gap analysis (Sundae's actual signal)
 *   • Compares your numbers against industry attach-rate ranges
 *   • Computes a $/$ year opportunity from closing each gap
 *   • Outputs a ranked priority list with specific category names
 *
 * The in-product version computes this against your actual menu item
 * combinations, not just category aggregates. This estimator gives the
 * directional read.
 */

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SundaeIcon } from "@/components/icons";
import { CURRENCIES, CURRENCY_REGIONS, getCurrencySymbol } from "@/lib/currencies";

type CategoryId = "appetizers" | "sides" | "drinks" | "desserts" | "addons";

type CategoryInput = {
  id: CategoryId;
  label: string;
  /** Industry healthy attach-rate range (% of orders that include this category) */
  healthyMin: number;
  healthyMax: number;
  /** Average ticket impact when attached (in input currency) */
  avgTicketImpact: number;
  /** Current attach rate the user provides */
  currentAttach: string;
};

const DEFAULT_CATEGORIES: CategoryInput[] = [
  { id: "appetizers", label: "Appetizers / Starters", healthyMin: 35, healthyMax: 55, avgTicketImpact: 8,  currentAttach: "22" },
  { id: "sides",      label: "Sides",                 healthyMin: 60, healthyMax: 80, avgTicketImpact: 4,  currentAttach: "48" },
  { id: "drinks",     label: "Beverages (non-alc)",   healthyMin: 70, healthyMax: 90, avgTicketImpact: 5,  currentAttach: "55" },
  { id: "desserts",   label: "Desserts",              healthyMin: 18, healthyMax: 30, avgTicketImpact: 7,  currentAttach: "9" },
  { id: "addons",     label: "Add-ons / Upgrades",    healthyMin: 25, healthyMax: 45, avgTicketImpact: 3,  currentAttach: "12" },
];

// Realistic close-rate on the gap to healthy attach (you don't close the
// full gap with training + nudges - research and operator data put the
// achievable lift at 25-45% of the identified gap in the first 6 months).
const CLOSE_RATE_LOW = 0.25;
const CLOSE_RATE_HIGH = 0.45;
const OPERATING_DAYS = 350;

export default function UpsellOpportunityIndexPage() {
  const [dailyCovers, setDailyCovers] = useState("280");
  const [outletCount, setOutletCount] = useState("1");
  const [currency, setCurrency] = useState("USD");
  const [categories, setCategories] = useState<CategoryInput[]>(DEFAULT_CATEGORIES);
  const symbol = getCurrencySymbol(currency);

  const analysis = useMemo(() => {
    const covers = parseFloat(dailyCovers) || 0;
    const outlets = parseInt(outletCount) || 1;
    if (covers <= 0) return null;

    const rows = categories.map((cat) => {
      const current = parseFloat(cat.currentAttach) || 0;
      const gapToHealthy = Math.max(0, cat.healthyMin - current);
      const incrementalAttaches = covers * (gapToHealthy / 100);
      const dailyFullClose = incrementalAttaches * cat.avgTicketImpact;
      // Realistic recovery range - only 25-45% of the gap closes typically
      const annualLow = dailyFullClose * CLOSE_RATE_LOW * OPERATING_DAYS * outlets;
      const annualHigh = dailyFullClose * CLOSE_RATE_HIGH * OPERATING_DAYS * outlets;
      const annualMid = (annualLow + annualHigh) / 2;
      const status: "healthy" | "low" | "very_low" =
        current >= cat.healthyMin ? "healthy" :
        current >= cat.healthyMin - 10 ? "low" : "very_low";

      return { ...cat, current, gapToHealthy, incrementalAttaches, annualLow, annualHigh, annualMid, status };
    });

    const totalAnnualLow = rows.reduce((sum, r) => sum + r.annualLow, 0);
    const totalAnnualHigh = rows.reduce((sum, r) => sum + r.annualHigh, 0);
    const ranked = [...rows].sort((a, b) => b.annualMid - a.annualMid);
    const topThree = ranked.slice(0, 3).filter((r) => r.annualMid > 0);

    const indexScore = Math.round(
      (rows.reduce((sum, r) => {
        const healthyRatio = Math.min(1, r.current / r.healthyMin);
        return sum + healthyRatio;
      }, 0) / rows.length) * 100,
    );

    return { rows, ranked, topThree, totalAnnualLow, totalAnnualHigh, indexScore, outlets };
  }, [categories, dailyCovers, outletCount]);

  const fmt = (n: number) => `${symbol}${Math.round(n).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto">
          <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors">
            <SundaeIcon name="balance" size="sm" />
            Back to Tools
          </Link>
          <span className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--warm-coral)] mb-3">
            INSIGHT-GRADE · GUEST + REVENUE INTELLIGENCE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-3 text-balance">
            Upsell Opportunity Index
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-supporting)] max-w-2xl">
            Most operators feel they're under-attaching desserts, drinks, or add-ons
            - but can't put a number on it. This estimator scores your menu attach
            health 0-100 and quantifies the revenue gap to industry-healthy
            attach rates.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl border border-[var(--border-default)] bg-white/[0.02] p-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">Operation baseline</h2>
              <p className="text-xs text-[var(--text-muted)] mb-4">Per outlet, current operating average.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Daily covers / outlet</label>
                  <input type="number" value={dailyCovers} onChange={(e) => setDailyCovers(e.target.value)} className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Outlet count</label>
                  <input type="number" min="1" value={outletCount} onChange={(e) => setOutletCount(e.target.value)} className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">Currency</label>
                  <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-white/[0.04] border border-[var(--border-default)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]">
                    {CURRENCY_REGIONS.map((region) => (
                      <optgroup key={region} label={region}>
                        {CURRENCIES.filter((c) => c.region === region).map((c) => <option key={c.code} value={c.code}>{c.code} - {c.symbol}</option>)}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border-default)] bg-white/[0.02] p-6">
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-1">Current attach rates</h2>
              <p className="text-xs text-[var(--text-muted)] mb-4">% of orders that include the category. Healthy bands shown in grey.</p>
              <div className="space-y-3">
                {categories.map((cat, i) => (
                  <div key={cat.id} className="grid grid-cols-3 gap-3 items-center">
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">{cat.label}</div>
                      <div className="text-[10px] text-[var(--text-muted)]">Healthy: {cat.healthyMin}-{cat.healthyMax}%</div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number" min="0" max="100"
                          value={cat.currentAttach}
                          onChange={(e) => {
                            const next = [...categories];
                            next[i] = { ...cat, currentAttach: e.target.value };
                            setCategories(next);
                          }}
                          className="w-20 bg-white/[0.04] border border-[var(--border-default)] rounded-lg px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--warm-coral)]"
                        />
                        <span className="text-xs text-[var(--text-muted)]">%</span>
                        {/* Mini gauge */}
                        <div className="relative flex-1 h-2 bg-white/[0.04] rounded-full overflow-hidden">
                          <div
                            className="absolute h-full bg-emerald-500/30 rounded-full"
                            style={{ left: `${cat.healthyMin}%`, width: `${cat.healthyMax - cat.healthyMin}%` }}
                          />
                          <div
                            className="absolute top-0 w-1 h-full bg-[var(--warm-coral)]"
                            style={{ left: `${Math.min(100, parseFloat(cat.currentAttach) || 0)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {analysis && (
              <div className="lg:sticky lg:top-32 space-y-4">
                {/* Index score */}
                <div className="rounded-2xl border-2 border-[var(--warm-coral)]/40 bg-gradient-to-br from-[var(--warm-coral)]/8 to-transparent p-6 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--warm-coral)] mb-2">
                    Upsell Opportunity Index
                  </p>
                  <div className="text-5xl font-bold text-[var(--text-primary)] tabular-nums mb-1">
                    {analysis.indexScore}
                    <span className="text-2xl text-[var(--text-muted)]">/100</span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {analysis.indexScore >= 85 ? "Strong attach health across the menu" :
                     analysis.indexScore >= 65 ? "Several categories underperforming" :
                     "Significant attach-rate gaps across the menu"}
                  </div>
                </div>

                {/* Annual recoverable revenue · range */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300 mb-2">
                    Recoverable annual revenue · range
                  </p>
                  <div className="text-xl font-bold text-[var(--text-primary)] tabular-nums mb-1">
                    {fmt(analysis.totalAnnualLow)} <span className="text-base text-[var(--text-muted)] font-medium">to</span> {fmt(analysis.totalAnnualHigh)}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {analysis.outlets > 1 ? <>across {analysis.outlets} outlets</> : <>per outlet</>} · {OPERATING_DAYS} operating days/yr
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] italic mt-2 leading-snug">
                    Assumes {Math.round(CLOSE_RATE_LOW * 100)}-{Math.round(CLOSE_RATE_HIGH * 100)}% of the identified attach-gap closes in the first 6 months with training + nudges.
                  </p>
                </div>

                {/* Top 3 priorities */}
                {analysis.topThree.length > 0 && (
                  <div className="rounded-2xl border border-[var(--border-default)] bg-white/[0.02] p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <SundaeIcon name="performance" size="sm" className="text-[var(--warm-coral)]" />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        What Sundae would do - top 3 priorities
                      </p>
                    </div>
                    <ol className="space-y-3">
                      {analysis.topThree.map((r, i) => (
                        <li key={r.id} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--warm-coral)]/15 border border-[var(--warm-coral)]/30 text-[var(--warm-coral)] text-xs font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-[var(--text-primary)]">{r.label}</div>
                            <div className="text-[11px] text-[var(--text-muted)] leading-snug">
                              Lift attach from <span className="text-[var(--text-secondary)] font-semibold">{r.current.toFixed(0)}%</span> → <span className="text-emerald-300 font-semibold">{r.healthyMin}%</span> · recover <span className="text-emerald-300 font-semibold">{fmt(r.annualLow)}-{fmt(r.annualHigh)}/yr</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <Button href="/demo" variant="primary" className="w-full">
                  See this on your menu mix
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto rounded-xl border border-[var(--border-default)] bg-white/[0.015] p-4">
          <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
            <strong className="text-[var(--text-secondary)]">Methodology (conservative defaults):</strong>{" "}
            Index = average of each category&rsquo;s (current / healthy-floor) ratio, capped at 1.
            Gap-close revenue = covers × (healthy-floor − current) ÷ 100 × avg ticket impact ×
            close-rate range ({Math.round(CLOSE_RATE_LOW * 100)}-{Math.round(CLOSE_RATE_HIGH * 100)}% - what training + nudges actually move) ×
            {OPERATING_DAYS} operating days/yr. Output is a range, not a single optimistic figure.
            Healthy attach ranges are full-service / fast-casual industry medians; Sundae Guest CRM +
            Revenue Intelligence calibrate against your specific menu mix, daypart, and tenure cohort
            in production.
          </p>
        </div>
      </section>
    </div>
  );
}
