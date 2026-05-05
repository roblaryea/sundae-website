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
  stat: string; // small subtitle under the SVG label
  headline: string;
  body: string;
}

const vertices: Vertex[] = [
  {
    id: "speed",
    label: "Speed",
    stat: "5-min refresh · seconds to answer",
    headline: "Live shift signals. Answers in seconds.",
    body: "Live Core refresh on Pulse. Sundae Intelligence answers in seconds with sources, not guesses. Forecasts that update every cycle.",
  },
  {
    id: "quality",
    label: "Quality",
    stat: "179 models · source-cited",
    headline: "Restaurant-specific. Source-cited.",
    body: "179 restaurant data models. Governed metrics. Peer-anchored benchmarks. Source-cited AI answers — not guesses.",
  },
  {
    id: "cost",
    label: "Cost",
    stat: "Lower total cost than BI stacks",
    headline: "Less to implement. Less to maintain.",
    body: "Generic BI tools are cheap on license — but expensive in analysts, custom modeling, integration consulting, and ongoing dashboard maintenance. Sundae ships restaurant-ready out of the box, with Report Lite free to start.",
  },
];

// Triangle geometry (viewBox 500×520 — extra space below for callouts).
// Anchor convention: each label extends OUTWARD from the triangle.
//   middle = centered above top vertex
//   start  = label starts at labelX and extends RIGHT (bottom-right vertex)
//   end    = label ends at labelX and extends LEFT (bottom-left vertex)
const trianglePoints: { x: number; y: number; labelX: number; labelY: number; anchor: "middle" | "start" | "end" }[] = [
  { x: 250, y: 80,  labelX: 250, labelY: 50,  anchor: "middle" }, // top — Speed
  { x: 420, y: 380, labelX: 432, labelY: 412, anchor: "start"  }, // bottom-right — Quality
  { x: 80,  y: 380, labelX: 68,  labelY: 412, anchor: "end"    }, // bottom-left — Cost
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
          <div className="relative w-full max-w-lg mx-auto">
            {/* Old-rule banner */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)] line-through decoration-[var(--text-faint)] decoration-1">
                Old rule: pick two
              </div>
              <div className="mt-2 text-[13px] uppercase tracking-[0.18em] text-[var(--electric-blue)] font-bold">
                ↓  Sundae rule: pick all three
              </div>
            </div>

            <svg viewBox="0 0 500 520" className="w-full h-auto" aria-hidden>
              <defs>
                {/* Triangle outline gradient */}
                <linearGradient id="triEdge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(28,71,255,0.7)" />
                  <stop offset="50%" stopColor="rgba(59,130,246,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
                </linearGradient>
                {/* Triangle fill — radial glow from center */}
                <radialGradient id="triFill" cx="50%" cy="55%" r="55%">
                  <stop offset="0%" stopColor="rgba(28,71,255,0.18)" />
                  <stop offset="60%" stopColor="rgba(28,71,255,0.05)" />
                  <stop offset="100%" stopColor="rgba(28,71,255,0)" />
                </radialGradient>
                {/* Tracer dot glow */}
                <filter id="tracerGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Hidden path for tracer animation (matches the visible polygon) */}
                <path
                  id="triTracerPath"
                  d={`M ${trianglePoints[0].x} ${trianglePoints[0].y} L ${trianglePoints[1].x} ${trianglePoints[1].y} L ${trianglePoints[2].x} ${trianglePoints[2].y} Z`}
                  fill="none"
                />
              </defs>

              {/* Filled triangle — adds depth */}
              <polygon
                points={trianglePoints.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="url(#triFill)"
                stroke="none"
              />
              {/* Triangle outline */}
              <polygon
                points={trianglePoints.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="none"
                stroke="url(#triEdge)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Pulse rings on active vertex */}
              {useAnimated && (
                <g>
                  {[0, 1].map((ringIdx) => (
                    <circle
                      key={ringIdx}
                      cx={trianglePoints[activeIdx].x}
                      cy={trianglePoints[activeIdx].y}
                      r="22"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="1.5"
                      opacity="0"
                      style={{
                        transformOrigin: `${trianglePoints[activeIdx].x}px ${trianglePoints[activeIdx].y}px`,
                      }}
                    >
                      <animate
                        attributeName="r"
                        from="22"
                        to="68"
                        dur="2.6s"
                        begin={`${ringIdx * 1.3}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0;0.55;0"
                        dur="2.6s"
                        begin={`${ringIdx * 1.3}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </g>
              )}

              {/* Orbital tracer — perpetually traces the perimeter */}
              {useAnimated && (
                <circle r="5" fill="#60A5FA" filter="url(#tracerGlow)">
                  <animateMotion dur="14s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#triTracerPath" />
                  </animateMotion>
                </circle>
              )}

              {/* Vertices — clickable, with stat callouts */}
              {trianglePoints.map((p, i) => {
                const isActive = !useAnimated || i === activeIdx;
                const v = vertices[i];
                return (
                  <g
                    key={v.id}
                    onClick={() => {
                      setActiveIdx(i);
                      setPaused(true);
                    }}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-label={`Show ${v.label}`}
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
                      r={isActive ? 50 : 24}
                      fill="#1C47FF"
                      opacity={isActive ? 0.28 : 0.08}
                      style={{ transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    />
                    {/* Inner glow */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 26 : 14}
                      fill="#1C47FF"
                      opacity={isActive ? 0.5 : 0.2}
                      style={{ transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    />
                    {/* Solid dot */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 12 : 10}
                      fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.45)"}
                      style={{ transition: "all 0.4s ease-out" }}
                    />
                    {/* Vertex number */}
                    <text
                      x={p.x}
                      y={p.y + 4}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="800"
                      fill={isActive ? "#1C47FF" : "rgba(28,71,255,0.5)"}
                      style={{ transition: "fill 0.4s ease-out" }}
                    >
                      {i + 1}
                    </text>
                    {/* Label */}
                    <text
                      x={p.labelX}
                      y={p.labelY}
                      textAnchor={p.anchor}
                      fontSize="24"
                      fontWeight="800"
                      letterSpacing="0.18em"
                      fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.6)"}
                      style={{ transition: "fill 0.4s ease-out" }}
                    >
                      {v.label.toUpperCase()}
                    </text>
                    {/* Stat callout under label */}
                    <text
                      x={p.labelX}
                      y={p.labelY + 18}
                      textAnchor={p.anchor}
                      fontSize="11"
                      fontWeight="500"
                      letterSpacing="0.02em"
                      fill={isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)"}
                      style={{ transition: "fill 0.4s ease-out" }}
                    >
                      {v.stat}
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
