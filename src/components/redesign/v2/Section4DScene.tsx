"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/**
 * Section 6 — 4D Intelligence Model (homepage-spec-v1.1, polish r4 refactor).
 *
 * Conversion job: explain product. ONE concrete operational scenario unfolds
 * across four dimensions (What happened → Plan vs actual → Market context →
 * What's next), demonstrating Sundae's cross-dimensional reasoning.
 *
 * Polish r4 changes (vs r1 GSAP-pinned implementation):
 *   - Removed GSAP ScrollTrigger and the h-screen pin (was creating dead space
 *     and overstating section weight without adding clarity)
 *   - Added explicit section signposting — buyer now knows it's the "4D
 *     Intelligence Model" and what dimensions to expect before content starts
 *   - Auto-cycle every 5.5s with hover/click pause — section is alive without
 *     scroll dependency
 *   - Dimension eyebrows promoted to global eyebrow class (now 13/14/15px
 *     responsive) for proper hierarchy
 *   - Visibly labeled as illustrative (mandatory CLM-501 disclosure)
 *
 * Hydration: same DOM in all paths. activeIdx starts at 0 server + first
 * client render. The auto-cycle interval only runs after mount.
 */

interface Dimension {
  id: number;
  shortLabel: string;   // for breadcrumb (1D · What happened)
  eyebrow: string;      // big eyebrow for active panel
  title: string;
  body: string;
}

const dimensions: Dimension[] = [
  {
    id: 1,
    shortLabel: "What happened",
    eyebrow: "1D — WHAT HAPPENED",
    title: "Lunch covers down 22% week-over-week.",
    body: "Average check held flat. So this isn't pricing — it's traffic.",
  },
  {
    id: 2,
    shortLabel: "Plan vs actual",
    eyebrow: "2D — PLAN VS ACTUAL",
    title: "Down $3,800 against today's forecast.",
    body: "Labor still on baseline — overstaffed for this volume. Margin eroding by the hour.",
  },
  {
    id: 3,
    shortLabel: "Market context",
    eyebrow: "3D — MARKET CONTEXT",
    title: "External signals explain the gap.",
    body: "Watchtower flag: three competitors within 2km dropped lunch combos to $9.99 yesterday. Two-block office tower has a fire drill scheduled 11–12.",
  },
  {
    id: 4,
    shortLabel: "What's next",
    eyebrow: "4D — WHAT'S NEXT",
    title: "Sundae Coach: act before lunch peak.",
    body: "Adjust one line-cook shift from 11–2 if coverage allows. Push the $11.99 lunch combo via your loyalty app. Projected impact: recover part of the gap if executed before lunch peak.",
  },
];

export function Section4DScene() {
  const reduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-cycle through dimensions every 5.5s — pauses on hover/focus
  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % dimensions.length);
    }, 5500);
    return () => clearInterval(id);
  }, [reduceMotion, paused]);

  return (
    <section
      aria-labelledby="fourD-headline"
      className="relative bg-mesh"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
        {/* Section signposting */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="eyebrow mb-4">THE 4D INTELLIGENCE MODEL</div>
          <h2 id="fourD-headline" className="section-h2 text-balance mb-5">
            One scenario. Four dimensions. <span className="text-[var(--text-secondary)]">Connected in real time.</span>
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Most dashboards stop at &quot;what happened.&quot; Sundae layers in
            plan vs actual, the market around you, and the next action — before
            the shift ends.
          </p>

          {/* Dimension breadcrumb — clickable */}
          <div className="mt-7 flex flex-wrap justify-center items-center gap-x-2 gap-y-2 text-[12px] sm:text-[13px]">
            {dimensions.map((d, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setActiveIdx(i);
                    setPaused(true);
                  }}
                  className={`px-3 py-1.5 rounded-full uppercase tracking-[0.12em] font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--electric-blue)] ${
                    isActive
                      ? "bg-[var(--electric-blue)] text-white shadow-[0_0_18px_rgba(28,71,255,0.45)]"
                      : "bg-[var(--surface-subtle)] text-[var(--text-supporting)] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-label={`Show ${d.eyebrow}`}
                  aria-current={isActive}
                >
                  <span className="font-mono mr-1.5">{d.id}D</span>
                  <span className="hidden sm:inline">·&nbsp;</span>
                  <span>{d.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Illustrative-scenario badge + scenario hook */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.16em] font-bold px-3 py-1.5 rounded-md bg-[var(--brand-yellow)]/15 text-[var(--brand-yellow)] border border-[var(--brand-yellow)]/30 mb-5">
            ⚠ Illustrative scenario — Sundae Coach example
          </span>
          <div className="text-[13px] sm:text-[14px] uppercase tracking-[0.18em] text-[var(--electric-blue)] font-bold mb-3">
            TUESDAY · 9:14 AM · DOWNTOWN
          </div>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] text-balance leading-tight">
            Lunch revenue is pacing 14% behind plan.
            <span className="block mt-2 text-[var(--text-secondary)] font-semibold text-xl sm:text-2xl lg:text-3xl">
              Here&apos;s what happens next.
            </span>
          </p>
        </div>

        {/* Two-column: dimension content + visual */}
        <div
          className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-start max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
        >
          {/* Active dimension content */}
          <div className="min-h-[260px] lg:min-h-[300px] lg:pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="eyebrow mb-4">
                  {dimensions[activeIdx].eyebrow}
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[var(--text-primary)] mb-4 leading-tight tracking-tight">
                  {dimensions[activeIdx].title}
                </h3>
                <p className="body-lg">{dimensions[activeIdx].body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Visual — morphs with active dimension */}
          <div>
            <SceneVisual activeIdx={activeIdx} />
          </div>
        </div>

        {/* Closing line + CTA */}
        <div className="text-center max-w-2xl mx-auto mt-14 sm:mt-16">
          <p className="text-xl sm:text-2xl text-[var(--text-primary)] italic font-light mb-6">
            Few dashboards connect the four dimensions. Sundae does it before
            the shift ends.
          </p>
          <Button href="/demo" variant="cta" size="lg">
            See it with your data →
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Morphing visual ──────────────────────────────────────── */

/**
 * The right-side visual that builds up across dimensions. Each new dimension
 * adds its own panel below the running composition so the buyer literally
 * sees Sundae layering data → plan → market → recommendation.
 */
function SceneVisual({ activeIdx }: { activeIdx: number }) {
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--navy)] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5),0_0_60px_rgba(28,71,255,0.12)]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-b border-[var(--border-default)]">
        <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px] text-[var(--text-muted)] font-medium">
          Pulse — Downtown · Lunch Service
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Dimension 1: lunch covers chart (always visible) */}
        <div className="rounded-lg bg-[var(--surface-subtle)] border border-[var(--border-default)] p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
              Lunch covers — today vs same day last week
            </div>
            <span className="text-[10px] text-[#FF5450] font-mono">−22% WoW</span>
          </div>
          <svg viewBox="0 0 320 80" className="w-full h-20" preserveAspectRatio="none" aria-hidden>
            <path
              d="M0 30 L40 28 L80 25 L120 22 L160 20 L200 18 L240 17 L280 15 L320 14"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M0 35 L40 38 L80 42 L120 48 L160 55 L200 60 L240 64 L280 67 L320 68"
              stroke="#FF5450"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Dimension 2: forecast variance */}
        <AnimatePresence>
          {activeIdx >= 1 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg bg-[var(--surface-subtle)] border border-[var(--border-default)] p-4 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                  Plan vs actual
                </div>
                <span className="text-[10px] text-[#FF5450] font-mono">
                  −$3,800 vs forecast
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">Forecast</div>
                  <div className="font-mono text-[var(--text-secondary)]">$18,620</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">Actual run-rate</div>
                  <div className="font-mono text-[#FF5450]">$14,820</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--border-default)] text-[11px] text-[var(--text-muted)]">
                Labor still on baseline — overstaffed for this volume.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dimension 3: market context */}
        <AnimatePresence>
          {activeIdx >= 2 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg p-4 overflow-hidden"
              style={{
                background: "rgba(245,158,11,0.08)",
                borderLeft: "3px solid #F59E0B",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#F59E0B]">
                  Watchtower
                </span>
              </div>
              <ul className="text-[12px] text-[var(--text-secondary)] space-y-1">
                <li>
                  <span className="text-[var(--text-muted)]">·</span> 3
                  competitors within 2km dropped lunch combos to $9.99 yesterday
                </li>
                <li>
                  <span className="text-[var(--text-muted)]">·</span>{" "}
                  Office-tower fire drill scheduled 11–12, 2 blocks away
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dimension 4: Sundae Coach recommendation */}
        <AnimatePresence>
          {activeIdx >= 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg p-4 overflow-hidden"
              style={{
                background: "rgba(28,71,255,0.08)",
                borderLeft: "3px solid #1C47FF",
              }}
            >
              <div className="text-[10px] uppercase tracking-wider font-bold text-[var(--electric-blue)] mb-2">
                Sundae Coach
              </div>
              <p className="text-[12px] text-[var(--text-primary)] leading-relaxed">
                Adjust one line-cook shift from 11–2 if coverage allows. Push
                the $11.99 lunch combo via loyalty.{" "}
                <span className="text-[var(--text-secondary)]">
                  Projected impact: recover part of the gap if executed before
                  lunch peak.
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
