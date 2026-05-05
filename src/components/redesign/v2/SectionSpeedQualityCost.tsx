"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
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

// r7 timing: shorter dwell (2.5s reading) + longer travel (3.5s motion) makes
// the tracer's edge-to-edge movement clearly visible. r6's 3.5s dwell + 2.5s
// travel was making the travel feel too brief — buyers saw vertices "light up"
// without registering the motion in between.
const DWELL_DUR_MS = 2500;
const TRAVEL_DUR_S = 3.5;

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

  // Tracer position bound to motion values — synced to activeIdx so the dot
  // arrives at a vertex exactly as that vertex becomes active. Each cycle is
  // a DWELL phase (ball stationary at active vertex while buyer reads the
  // panel) followed by a TRAVEL phase (ball moves to next vertex).
  const tracerX = useMotionValue(trianglePoints[0].x);
  const tracerY = useMotionValue(trianglePoints[0].y);
  const travelCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!useAnimated || paused) return;

    const from = trianglePoints[activeIdx];
    const to = trianglePoints[(activeIdx + 1) % trianglePoints.length];

    // Snap tracer to the current vertex.
    tracerX.set(from.x);
    tracerY.set(from.y);

    // DWELL phase — ball sits at the active vertex while content is read.
    const dwellTimer = setTimeout(() => {
      // TRAVEL phase — animate to next vertex; advance activeIdx on arrival.
      const ctrlX = animate(tracerX, to.x, {
        duration: TRAVEL_DUR_S,
        ease: "easeInOut",
      });
      const ctrlY = animate(tracerY, to.y, {
        duration: TRAVEL_DUR_S,
        ease: "easeInOut",
        onComplete: () => {
          setActiveIdx((i) => (i + 1) % trianglePoints.length);
        },
      });
      travelCleanupRef.current = () => {
        ctrlX.stop();
        ctrlY.stop();
      };
    }, DWELL_DUR_MS);

    return () => {
      clearTimeout(dwellTimer);
      travelCleanupRef.current?.();
      travelCleanupRef.current = null;
    };
  }, [useAnimated, paused, activeIdx, tracerX, tracerY]);

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

            <svg viewBox="0 0 700 540" className="w-full h-auto" aria-hidden>
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

              {/* Tracer dot — synced to activeIdx via motion values.
                  Bigger + brighter glow in r7 so the Quality→Cost segment
                  (and any horizontal travel) reads clearly. */}
              {useAnimated && (
                <>
                  {/* Bright glow halo */}
                  <motion.circle
                    r="14"
                    fill="#3B82F6"
                    opacity="0.35"
                    filter="url(#tracerGlow)"
                    cx={tracerX}
                    cy={tracerY}
                  />
                  {/* Solid leading dot */}
                  <motion.circle
                    r="9"
                    fill="#FFFFFF"
                    cx={tracerX}
                    cy={tracerY}
                  />
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
