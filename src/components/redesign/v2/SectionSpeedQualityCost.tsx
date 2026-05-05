"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

/**
 * Section 3 — Speed / Quality / Cost Triangle (homepage-spec-v1.1, polish r4).
 *
 * Conversion job: prove differentiation. The triangle visualizes Sundae
 * collapsing the classic "fast, good, cheap — pick two" tradeoff into all
 * three at once.
 *
 * Polish r4 changes:
 *   - Tracer dot is now SYNCHRONIZED with the active vertex. The dot travels
 *     edge-to-edge over 5s; on arrival at a vertex, that vertex becomes
 *     active. No more decoupled setInterval + orbital tracer.
 *   - ViewBox extended to 700×540 with the triangle shifted inward so labels
 *     and stat callouts no longer clip at the edges.
 *   - Copy reframed for assertiveness: "Days to deploy. Seconds to answer."
 *     "Restaurant-native. Source-cited." "Cheaper than building it in BI."
 *
 * Reduced-motion fallback: 3-card stack (all three lit at once), no tracer,
 * no rotation. Same DOM as SSR / pre-mount for hydration safety.
 */

interface Vertex {
  id: "speed" | "quality" | "cost";
  label: string;
  headline: string;
  body: string;
  chips: [string, string, string]; // proof chips shown at the bottom of the rotating card
}

const vertices: Vertex[] = [
  {
    id: "speed",
    label: "Speed",
    headline: "Deploy in days. Decide in seconds.",
    body: "Connect your stack fast. Pulse updates through the shift, and Sundae Intelligence answers with sources instead of sending teams back into the report queue.",
    chips: ["Days to deploy", "Live Core refresh", "Answers in seconds"],
  },
  {
    id: "quality",
    label: "Quality",
    headline: "Built for restaurants. Governed for decisions.",
    body: "Sundae ships with 179+ governed restaurant data models, peer-anchored benchmarks, and source-cited AI answers — so teams are not building from a blank BI canvas.",
    chips: ["179+ models", "Source-cited AI", "Peer benchmarks"],
  },
  {
    id: "cost",
    label: "Cost",
    headline: "Lower cost than rebuilding BI around restaurants.",
    body: "BI licenses are only the visible cost. The real spend is analysts, integrations, custom models, dashboard upkeep, and delayed decisions. Sundae is restaurant-ready from day one, with Report Lite free to start.",
    chips: ["Report Lite free", "Less custom BI", "Lower analyst load"],
  },
];

// Triangle geometry — viewBox 700×540 with generous label margins.
//   middle = label centered above top vertex
//   start  = label starts at labelX, extends RIGHT (bottom-right vertex)
//   end    = label ends at labelX, extends LEFT (bottom-left vertex)
//
// Tiny stat sublabels under the labels were removed in r7 — the proof chips
// in the rotating right-side card carry that information more readably and
// the labels were visually colliding with the active-vertex glow.
const trianglePoints: { x: number; y: number; labelX: number; labelY: number; anchor: "middle" | "start" | "end" }[] = [
  { x: 350, y: 90,  labelX: 350, labelY: 56,  anchor: "middle" }, // Speed (top)
  { x: 510, y: 380, labelX: 525, labelY: 416, anchor: "start"  }, // Quality (bottom-right)
  { x: 190, y: 380, labelX: 175, labelY: 416, anchor: "end"    }, // Cost (bottom-left)
];

// r8 timing: switched from JS-driven motion-value tracer (which was producing
// inconsistent visibility on the Quality→Cost segment) to SMIL animateMotion
// for continuous, guaranteed-visible orbit. 5s per segment = 15s full loop.
// The dimension content auto-cycles in lockstep via setInterval. Browser-driven
// SMIL is more reliable than React-state animation for this kind of vector
// movement and stays smooth even if the React tree re-renders.
const SEGMENT_DUR_S = 5;
const TOTAL_LOOP_S = SEGMENT_DUR_S * 3; // 15s full triangle orbit

export function SectionSpeedQualityCost() {
  const reduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Canonical hydration-safe mount detection.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const useAnimated = mounted && !reduceMotion;

  // SVG ref for SMIL pause/unpause control on hover.
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Auto-cycle the active dimension at the same cadence as the SMIL tracer
  // animation. SMIL drives the dot continuously (15s loop = 5s per segment);
  // this interval flips activeIdx every 5s so the right-card content updates
  // when the dot arrives at each vertex.
  useEffect(() => {
    if (!useAnimated || paused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % trianglePoints.length);
    }, SEGMENT_DUR_S * 1000);
    return () => clearInterval(id);
  }, [useAnimated, paused]);

  // Pause / unpause the SMIL animations when the user hovers the section.
  useEffect(() => {
    if (!useAnimated) return;
    const svg = svgRef.current;
    if (!svg) return;
    if (paused) svg.pauseAnimations();
    else svg.unpauseAnimations();
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
          {/* Triangle SVG */}
          <div className="relative w-full max-w-xl mx-auto">
            {/* Old-rule banner */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[var(--text-muted)] line-through decoration-[var(--text-faint)] decoration-1">
                Old rule: pick two
              </div>
              <div className="mt-2 text-[13px] uppercase tracking-[0.18em] text-[var(--electric-blue)] font-bold">
                ↓  Sundae rule: pick all three
              </div>
            </div>

            <svg
              ref={svgRef}
              viewBox="0 0 700 540"
              className="w-full h-auto"
              aria-hidden
            >
              <defs>
                <linearGradient id="triEdge" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(28,71,255,0.7)" />
                  <stop offset="50%" stopColor="rgba(59,130,246,0.4)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
                </linearGradient>
                <radialGradient id="triFill" cx="50%" cy="60%" r="55%">
                  <stop offset="0%" stopColor="rgba(28,71,255,0.18)" />
                  <stop offset="60%" stopColor="rgba(28,71,255,0.05)" />
                  <stop offset="100%" stopColor="rgba(28,71,255,0)" />
                </radialGradient>
                <filter id="tracerGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Hidden path — SMIL animateMotion follows this triangle perimeter */}
                <path
                  id="sqcTracerPath"
                  d={`M ${trianglePoints[0].x} ${trianglePoints[0].y} L ${trianglePoints[1].x} ${trianglePoints[1].y} L ${trianglePoints[2].x} ${trianglePoints[2].y} Z`}
                  fill="none"
                  stroke="none"
                />
              </defs>

              {/* Filled triangle */}
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

              {/* Tracer dots — SMIL animateMotion drives continuous orbit
                  along the triangle perimeter. 15s for a full loop = 5s per
                  segment, in sync with the activeIdx interval. */}
              {useAnimated && (
                <>
                  {/* Bright glow halo */}
                  <circle r="14" fill="#3B82F6" opacity="0.35" filter="url(#tracerGlow)">
                    <animateMotion
                      dur={`${TOTAL_LOOP_S}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#sqcTracerPath" />
                    </animateMotion>
                  </circle>
                  {/* Solid leading dot */}
                  <circle r="9" fill="#FFFFFF">
                    <animateMotion
                      dur={`${TOTAL_LOOP_S}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href="#sqcTracerPath" />
                    </animateMotion>
                  </circle>
                </>
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
                    {/* Label — grows when active for emphasis. Sublabel was
                        removed in r7 because tiny SVG text was clipping near
                        the active glow; proof chips in the right-side card
                        now carry that info more readably. */}
                    <text
                      x={p.labelX}
                      y={p.labelY}
                      textAnchor={p.anchor}
                      fontSize={isActive ? "28" : "22"}
                      fontWeight="800"
                      letterSpacing="0.18em"
                      fill={isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)"}
                      style={{ transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
                    >
                      {v.label.toUpperCase()}
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
                  <p className="body-base mb-4">{v.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {v.chips.map((chip) => (
                      <span
                        key={chip}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[var(--electric-blue)]/15 text-[var(--electric-blue)] border border-[var(--electric-blue)]/25"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Animated: rotating single panel with proof chips at the bottom
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

              {/* Proof chips for the active dimension — replaces dot
                  indicators with concrete factual signals. Triangle vertices
                  remain clickable for direct navigation. */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeIdx}-chips`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-6 pt-5 border-t border-[var(--border-default)] flex flex-wrap gap-2"
                >
                  {vertices[activeIdx].chips.map((chip) => (
                    <span
                      key={chip}
                      className="text-[12px] font-semibold px-3 py-1.5 rounded-full bg-[var(--electric-blue)]/15 text-[var(--electric-blue)] border border-[var(--electric-blue)]/25"
                    >
                      {chip}
                    </span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>

        <p className="mt-12 sm:mt-14 text-center text-xl sm:text-2xl text-[var(--text-primary)] italic font-light">
          That&apos;s not a tradeoff. That&apos;s your operating advantage.
        </p>
      </div>
    </section>
  );
}
