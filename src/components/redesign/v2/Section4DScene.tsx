"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

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
  shortLabel: string;   // for breadcrumb pill ("1 · What happened")
  eyebrow: string;      // small eyebrow above the active panel content
  title: string;
  body: string;
}

const dimensions: Dimension[] = [
  {
    id: 1,
    shortLabel: "What happened",
    eyebrow: "WHAT HAPPENED",
    title: "Covers are down 22%.",
    body: "Average check is steady, so the issue is traffic — not pricing.",
  },
  {
    id: 2,
    shortLabel: "Plan vs actual",
    eyebrow: "PLAN VS ACTUAL",
    title: "The location is $3,800 behind forecast.",
    body: "Labor is still staffed to baseline, so margin is eroding by the hour.",
  },
  {
    id: 3,
    shortLabel: "Market context",
    eyebrow: "MARKET CONTEXT",
    title: "The market explains the gap.",
    body: "Nearby competitors dropped lunch combos, and a local office event is reducing foot traffic.",
  },
  {
    id: 4,
    shortLabel: "Next action",
    eyebrow: "NEXT ACTION",
    title: "Sundae Coach recommends the next move.",
    body: "Adjust labor if coverage allows, push the lunch offer, and recover part of the gap before peak ends.",
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
        {/* Section signposting — tightened to one headline + one-line subhead */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="eyebrow mb-4">THE 4D INTELLIGENCE MODEL</div>
          <h2 id="fourD-headline" className="section-h2 text-balance mb-5">
            Watch one revenue problem become a decision.
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Sundae connects what happened, plan vs actual, market context, and
            the next action — so teams can move before the shift is over.
          </p>
        </div>

        {/* Compact scenario hook — one line, no dual-stack title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="text-[12px] sm:text-[13px] uppercase tracking-[0.18em] text-[var(--electric-blue)] font-bold mb-3">
            TUESDAY · 9:14 AM · DOWNTOWN
          </div>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] text-balance leading-tight">
            Lunch revenue is pacing 14% behind plan.
          </p>
        </div>

        {/* Two-column: dimension content + visual.
            Pills sit ABOVE this row, spanning both columns, so the link
            between pill click → content + visual change is visually obvious. */}
        <div
          className="max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
        >
          {/* Dimension breadcrumb — now docked above the grid as a connector */}
          <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 text-[12px] sm:text-[13px] mb-7 sm:mb-8">
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
                  className={`px-3.5 py-1.5 rounded-full uppercase tracking-[0.12em] font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--electric-blue)] ${
                    isActive
                      ? "bg-[var(--electric-blue)] text-white shadow-[0_0_18px_rgba(28,71,255,0.45)]"
                      : "bg-[var(--surface-subtle)] text-[var(--text-supporting)] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  }`}
                  aria-label={`Show ${d.eyebrow}`}
                  aria-current={isActive}
                >
                  <span className="font-mono mr-2">{d.id}</span>
                  <span aria-hidden className="opacity-60 mr-1.5">·</span>
                  <span>{d.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Visual indicator: arrow connecting pills to the panel/visual below */}
          <div className="flex justify-center -mt-2 mb-4 text-[var(--electric-blue)]/60" aria-hidden>
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
              <path d="M9 14L1 4h16L9 14z" fill="currentColor" />
            </svg>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
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
        </div>

        {/* Closing line — section-level. Page-level closing CTA lives in the
            global Footer pre-CTA so we don't double up CTAs at the page bottom. */}
        <p className="text-center text-xl sm:text-2xl text-[var(--text-primary)] italic font-light max-w-2xl mx-auto mt-14 sm:mt-16">
          From signal to cause to action — before the shift ends.
        </p>
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
      {/* Title bar with subtle illustrative tag (CLM-501 disclosure, anchored
          to the visual rather than centered above the section) */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-b border-[var(--border-default)]">
        <span className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[11px] text-[var(--text-muted)] font-medium">
          Pulse — Downtown · Lunch Service
        </span>
        <span className="ml-auto text-[9px] uppercase tracking-[0.14em] font-bold text-[var(--brand-yellow)]/80">
          Illustrative
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
