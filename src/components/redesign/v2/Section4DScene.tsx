"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/**
 * Hydration discipline: server and client first render MUST match. We start
 * `mounted=false` so both server-side render and the first client render
 * produce the static stack. After hydration, useEffect flips `mounted=true`
 * and we upgrade to the GSAP-pinned animated path. No DOM mismatch.
 */

/**
 * Section 6 — 4D Intelligence Scroll Scene (homepage-spec-v1.1).
 *
 * Conversion job: explain product + dramatize urgency. Pinned scroll over
 * ~3 viewport heights reveals a single concrete operational scenario across
 * four dimensions: What Happened → Plan vs Actual → Market Context → What's Next.
 *
 * Reduced-motion fallback: section degrades to a vertical 4-card stack with
 * the same narrative. No pinning, no morphing. Closing line + CTA below.
 *
 * GSAP discipline (per §6 implementation constraints in spec):
 *   - ScrollTrigger dynamic-imported, only loads on this section
 *   - 'use client' module
 *   - All copy ships server-rendered as text (cards exist in DOM regardless of JS)
 *   - Cleanup on unmount (.kill() every ScrollTrigger instance)
 *
 * Claims (all CAPABILITY CLAIM ONLY · FN-3):
 *   CLM-501 (visible "ILLUSTRATIVE" badge — mandatory)
 *   CLM-502 (scenario specifics)
 *   CLM-503 (qualitative Coach projection — no quantified outcome)
 *   CLM-213 (closing line)
 */

interface Dimension {
  id: number;
  eyebrow: string;
  title: string;
  body: string;
}

const dimensions: Dimension[] = [
  {
    id: 1,
    eyebrow: "1D — WHAT HAPPENED",
    title: "Lunch covers down 22% week-over-week.",
    body: "Average check held flat. So this isn't pricing — it's traffic.",
  },
  {
    id: 2,
    eyebrow: "2D — PLAN VS ACTUAL",
    title: "Down $3,800 against today's forecast.",
    body: "Labor still on baseline — overstaffed for this volume. Margin eroding by the hour.",
  },
  {
    id: 3,
    eyebrow: "3D — MARKET CONTEXT",
    title: "External signals explain the gap.",
    body: "Watchtower flag: three competitors within 2km dropped lunch combos to $9.99 yesterday. Two-block office tower has a fire drill scheduled 11–12.",
  },
  {
    id: 4,
    eyebrow: "4D — WHAT'S NEXT",
    title: "Sundae Coach: act before lunch peak.",
    body: "Adjust one line-cook shift from 11–2 if coverage allows. Push the $11.99 lunch combo via your loyalty app. Projected impact: recover part of the gap if executed before lunch peak.",
  },
];

export function Section4DScene() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Canonical hydration-safe mount detection. The extra render is intentional —
    // it lets server/first-client render produce identical static markup, then
    // the client upgrades to the GSAP-pinned animated tree post-hydration.
    setMounted(true);
  }, []);

  const useAnimated = mounted && !reduceMotion;

  useEffect(() => {
    if (!useAnimated) return;
    const el = sectionRef.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { default: ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const trigger = ScrollTrigger.create({
        trigger: el,
        pin: true,
        start: "top top",
        end: "+=220%",
        scrub: 0.6,
        onUpdate: (self) => {
          const idx = Math.min(
            dimensions.length - 1,
            Math.floor(self.progress * dimensions.length)
          );
          setActiveIdx(idx);
        },
      });

      cleanup = () => {
        trigger.kill();
      };
    })();

    return () => {
      cleanup?.();
    };
  }, [useAnimated]);

  // Static path — used for SSR, first client render, AND reduced-motion users
  if (!useAnimated) {
    return (
      <section
        aria-labelledby="fourD-headline"
        className="relative bg-mesh"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
          <SceneHeader />
          <div className="mt-10 sm:mt-12 max-w-4xl mx-auto space-y-4">
            {dimensions.map((d) => (
              <article
                key={d.id}
                className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-8"
              >
                <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-2">
                  {d.eyebrow}
                </div>
                <h3 className="section-h3 mb-3">{d.title}</h3>
                <p className="body-lg">{d.body}</p>
              </article>
            ))}
          </div>
          <SceneFooter />
        </div>
      </section>
    );
  }

  // Animated: pinned section with morphing content
  return (
    <section
      aria-labelledby="fourD-headline"
      className="relative bg-mesh"
    >
      <div
        ref={sectionRef}
        className="relative h-screen flex flex-col"
      >
        <div className="flex-1 flex items-center max-w-7xl w-full mx-auto px-6 sm:px-8 py-12">
          <div className="w-full grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
            {/* Left — header + dimension content */}
            <div>
              <SceneHeader compact />

              <div className="mt-8 min-h-[260px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-3">
                      {dimensions[activeIdx].eyebrow}
                    </div>
                    <h3 className="section-h3 mb-4">
                      {dimensions[activeIdx].title}
                    </h3>
                    <p className="body-lg">{dimensions[activeIdx].body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress dots */}
              <div className="mt-6 flex gap-2" aria-hidden>
                {dimensions.map((d, i) => (
                  <span
                    key={d.id}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i <= activeIdx
                        ? "w-8 bg-[var(--electric-blue)]"
                        : "w-1.5 bg-[var(--text-faint)]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Right — visual that morphs across dimensions */}
            <div className="relative">
              <SceneVisual activeIdx={activeIdx} />
            </div>
          </div>
        </div>
      </div>

      {/* Post-pin: closing line + CTA */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 py-16 sm:py-20 text-center">
        <p className="text-xl sm:text-2xl text-[var(--text-primary)] italic font-light mb-6">
          Few dashboards connect the four dimensions. Sundae does it before the
          shift ends.
        </p>
        <Button href="/demo" variant="cta" size="lg">
          See it with your data →
        </Button>
      </div>
    </section>
  );
}

/* ─── Sub-components ─────────────────────────────────────────── */

function SceneHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "" : "max-w-3xl mx-auto text-center"}>
      <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md bg-[var(--brand-yellow)]/15 text-[var(--brand-yellow)] border border-[var(--brand-yellow)]/30 mb-4">
        ⚠ Illustrative scenario — Sundae Coach example
      </span>
      <div
        className={`eyebrow ${compact ? "text-left" : ""} mb-3`}
      >
        TUESDAY · 9:14 AM · DOWNTOWN
      </div>
      <h2
        id="fourD-headline"
        className={`section-h2 text-balance ${compact ? "text-left" : ""}`}
      >
        Lunch revenue is pacing 14% behind plan. Here&apos;s what happens next.
      </h2>
    </div>
  );
}

function SceneFooter() {
  return (
    <div className="mt-10 sm:mt-12 text-center">
      <p className="text-xl sm:text-2xl text-[var(--text-primary)] italic font-light mb-6">
        Few dashboards connect the four dimensions. Sundae does it before the
        shift ends.
      </p>
      <Button href="/demo" variant="cta" size="lg">
        See it with your data →
      </Button>
    </div>
  );
}

/**
 * The morphing right-side visual. Each dimension shows a different composition
 * of the same operational scene, building from a single chart toward a full
 * Coach recommendation.
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
        {/* Dimension 1: a single chart showing covers down */}
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

        {/* Dimension 2: forecast variance — appears for activeIdx >= 1 */}
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
                  <div className="text-[10px] text-[var(--text-muted)]">
                    Forecast
                  </div>
                  <div className="font-mono text-[var(--text-secondary)]">$18,620</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">
                    Actual run-rate
                  </div>
                  <div className="font-mono text-[#FF5450]">$14,820</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[var(--border-default)] text-[11px] text-[var(--text-muted)]">
                Labor still on baseline — overstaffed for this volume.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dimension 3: market context — appears for activeIdx >= 2 */}
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

        {/* Dimension 4: Sundae Coach recommendation — appears for activeIdx >= 3 */}
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
