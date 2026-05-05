"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Section 3 — Speed / Quality / Cost Triangle (homepage-spec-v1.1).
 *
 * Conversion job: prove differentiation. The triangle visualizes Sundae
 * collapsing the classic "fast, good, cheap — pick two" tradeoff into all
 * three at once. One vertex is active at a time, auto-rotating every 5s
 * with hover/click pause. Detail panel cross-fades to match.
 *
 * Reduced-motion fallback: the triangle renders with all three vertices lit
 * and the rotating panel is replaced by a 3-card grid showing all three
 * positions side-by-side. No interval, no AnimatePresence.
 *
 * Claims used:
 *   CLM-209 (headline) APPROVED PUBLIC
 *   CLM-210 (closing) APPROVED PUBLIC
 *   CLM-006 (Live Core refresh) CAPABILITY CLAIM ONLY · FN-1
 *   CLM-007 (30-second answers) NEEDS VALIDATION → softened to "answers in seconds"
 *   CLM-008 (Report Lite is free) APPROVED PUBLIC
 *   CLM-105/110/111 (quality framing) APPROVED PUBLIC
 *   CLM-112/113 (cost framing) CAPABILITY CLAIM ONLY
 */

interface Vertex {
  id: "speed" | "quality" | "cost";
  label: string;
  headline: string;
  body: string;
}

const vertices: Vertex[] = [
  {
    id: "speed",
    label: "Speed",
    headline: "Live shift signals. Answers in seconds.",
    body: "Live Core refresh on Pulse. Sundae Intelligence answers in seconds with sources, not guesses. Forecasts that update every cycle.",
  },
  {
    id: "quality",
    label: "Quality",
    headline: "Restaurant-specific. Source-cited.",
    body: "179 restaurant data models. Governed metrics. Peer-anchored benchmarks. Source-cited AI answers — not guesses.",
  },
  {
    id: "cost",
    label: "Cost",
    headline: "Free benchmark to start. Without adding to your analyst queue.",
    body: "Report Lite is free. Core reduces dependence on custom BI dashboards, manual reports, and analyst backlogs.",
  },
];

// Triangle geometry (viewBox 460×460 with extra label padding)
const trianglePoints: { x: number; y: number; labelX: number; labelY: number; anchor: "middle" | "start" | "end" }[] = [
  { x: 230, y: 70, labelX: 230, labelY: 38, anchor: "middle" },   // top — Speed
  { x: 400, y: 360, labelX: 410, labelY: 400, anchor: "end" },    // bottom-right — Quality
  { x: 60, y: 360, labelX: 50, labelY: 400, anchor: "start" },    // bottom-left — Cost
];

export function SectionSpeedQualityCost() {
  const reduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Canonical hydration-safe mount detection — see Section4DScene for rationale.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Hydration discipline: server + first client render produce the static
  // 3-card stack. After mount we upgrade to the rotating panel.
  const useAnimated = mounted && !reduceMotion;

  // Auto-rotate every 5s when animated and not paused
  useEffect(() => {
    if (!useAnimated || paused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % vertices.length);
    }, 5000);
    return () => clearInterval(id);
  }, [useAnimated, paused]);

  return (
    <section
      aria-labelledby="sqc-headline"
      className="relative bg-mesh"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <div className="eyebrow mb-4">THE OLD TRADEOFF IS DEAD</div>
          <h2 id="sqc-headline" className="section-h2 text-balance mb-5">
            Fast. Right. Affordable. Pick all three.
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Restaurants used to choose between speed, quality, and cost. Sundae
            was built to deliver all three at once — that&apos;s the entire
            point.
          </p>
        </div>

        <div
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Triangle SVG with old-rule → Sundae-rule contrast */}
          <div className="relative w-full max-w-md mx-auto">
            {/* Old-rule banner */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-wider text-[var(--text-muted)] line-through decoration-[var(--text-faint)] decoration-1">
                Old rule: pick two
              </div>
              <div className="mt-1.5 text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold">
                Sundae rule: pick all three
              </div>
            </div>

            <svg viewBox="0 0 460 460" className="w-full h-auto">
              {/* Triangle outline with subtle gradient stroke */}
              <defs>
                <linearGradient id="triEdge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(28,71,255,0.5)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.15)" />
                </linearGradient>
              </defs>
              <polygon
                points={trianglePoints
                  .map((p) => `${p.x},${p.y}`)
                  .join(" ")}
                fill="none"
                stroke="url(#triEdge)"
                strokeWidth="2"
                strokeLinejoin="round"
              />

              {/* Vertices — clickable */}
              {trianglePoints.map((p, i) => {
                const isActive = !useAnimated || i === activeIdx;
                return (
                  <g
                    key={vertices[i].id}
                    onClick={() => {
                      setActiveIdx(i);
                      setPaused(true);
                    }}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Show ${vertices[i].label}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveIdx(i);
                        setPaused(true);
                      }
                    }}
                  >
                    {/* Outer glow */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 44 : 22}
                      fill="#1C47FF"
                      opacity={isActive ? 0.25 : 0.08}
                      style={{ transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    />
                    {/* Inner glow */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 22 : 12}
                      fill="#1C47FF"
                      opacity={isActive ? 0.45 : 0.18}
                      style={{ transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    />
                    {/* Solid dot */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={10}
                      fill={isActive ? "#3B82F6" : "rgba(255,255,255,0.4)"}
                      style={{ transition: "fill 0.4s ease-out" }}
                    />
                    {/* Label */}
                    <text
                      x={p.labelX}
                      y={p.labelY}
                      textAnchor={p.anchor}
                      fontSize="22"
                      fontWeight="800"
                      letterSpacing="0.16em"
                      fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)"}
                      style={{ transition: "fill 0.4s ease-out" }}
                    >
                      {vertices[i].label.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail panel */}
          {!useAnimated ? (
            // Static path: 3-card stack, all visible (SSR + reduced-motion)
            <div className="space-y-3">
              {vertices.map((v) => (
                <div
                  key={v.id}
                  className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-5"
                >
                  <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-2">
                    {v.label}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                    {v.headline}
                  </h3>
                  <p className="body-base">{v.body}</p>
                </div>
              ))}
            </div>
          ) : (
            // Animated: rotating single panel
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-8 min-h-[300px] flex flex-col">
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-3">
                      {vertices[activeIdx].label}
                    </div>
                    <h3 className="section-h3 mb-4">
                      {vertices[activeIdx].headline}
                    </h3>
                    <p className="body-lg">{vertices[activeIdx].body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Indicator dots */}
              <div className="mt-6 flex gap-2 justify-center">
                {vertices.map((v, i) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setActiveIdx(i);
                      setPaused(true);
                    }}
                    aria-label={`Show ${v.label}`}
                    aria-current={i === activeIdx}
                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--electric-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-subtle)] ${
                      i === activeIdx
                        ? "w-8 bg-[var(--electric-blue)]"
                        : "w-1.5 bg-[var(--text-faint)] hover:bg-[var(--text-muted)]"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="mt-12 sm:mt-14 text-center text-xl sm:text-2xl text-[var(--text-primary)] italic font-light">
          That&apos;s not a tradeoff. That&apos;s the moat.
        </p>
      </div>
    </section>
  );
}
