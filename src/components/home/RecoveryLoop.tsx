"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { recoveryLoopCopy } from "./recoveryLoopCopy";

/**
 * RecoveryLoop - the homepage hero-1 signature. The visual IS the message:
 * detect a margin leak, decide an owner, execute the fix, measure the recovery -
 * with the recovered dollars, measured against a baseline, at the center of the
 * loop. Pure SVG (no WebGL), so the hero stays fast; the 3D "sundae glass" now
 * lives deeper in the page as a brand motif.
 *
 * The figure is an illustrative demo value, consistent with the second hero's
 * Pulse "recovered this week" strip. It is never presented as a live guarantee.
 */

const RECOVERED = "$5,120"; // illustrative, matches the second-hero demo strip

// ring geometry
const CX = 230;
const CY = 182;
const R = 110;
const CIRC = 2 * Math.PI * R; // ~691.15

export function RecoveryLoop() {
  const { locale } = useWebsiteI18n();
  const copy = recoveryLoopCopy[locale] ?? recoveryLoopCopy.en;
  const reduce = useReducedMotion();
  // Match SSR to the first client render (see SectionCinematicIntro): full-motion
  // path on the server, reduced users settle after mount.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const rm = mounted && reduce;

  return (
    <motion.div
      className="surface-always-dark relative w-full max-w-[460px]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* warm wash behind the card, so it sits in the room like the glass did */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,92,77,.14), rgba(233,162,74,.05) 46%, transparent 72%)", filter: "blur(52px)" }}
      />

      <div
        className="relative rounded-2xl border border-white/10 px-5 pb-5 pt-4"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.008))",
          boxShadow: "0 30px 70px -44px rgba(0,0,0,0.85)",
        }}
      >
        {/* card header: what this is + a quiet live tick */}
        <div className="mb-1 flex items-center justify-between">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[rgba(251,248,244,0.5)]" style={{ fontFamily: "var(--font-geist-mono)" }}>
            {copy.loopTitle}
          </span>
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            {!rm && <span className="absolute inline-flex h-full w-full rounded-full bg-[#F6C66B] opacity-60 motion-safe:animate-ping" />}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F6C66B]" />
          </span>
        </div>

        <svg viewBox="0 0 460 360" className="block w-full" role="img" aria-label={`${copy.loopTitle}: ${copy.stages.join(", ")}. ${RECOVERED} ${copy.recoveredThisWeek}, ${copy.measuredVsBaseline}.`}>
          <defs>
            <linearGradient id="recoveryLoopGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F6C66B" />
              <stop offset="0.5" stopColor="#FF7E6F" />
              <stop offset="1" stopColor="#E03E48" />
            </linearGradient>
          </defs>

          {/* rings: faint base + faint coral, with a travelling comet for flow */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="2" />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#recoveryLoopGrad)" strokeWidth="2" opacity="0.26" />
          <motion.circle
            cx={CX}
            cy={CY}
            r={R}
            fill="none"
            stroke="url(#recoveryLoopGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`80 ${CIRC - 80}`}
            transform={`rotate(-90 ${CX} ${CY})`}
            initial={{ strokeDashoffset: 0 }}
            animate={rm ? { strokeDashoffset: 0 } : { strokeDashoffset: -CIRC }}
            transition={rm ? undefined : { duration: 6.5, ease: "linear", repeat: Infinity }}
            style={rm ? { opacity: 0.5 } : undefined}
          />
          {/* clockwise-flow arrowhead just past the top */}
          <path d="M248,76 l8,-3 l-2,8 z" fill="#F6C66B" />

          {/* DETECT (top) - the leak, coral node */}
          <circle cx={CX} cy={CY - R} r="7" fill="#15110D" stroke="#E03E48" strokeWidth="3" />
          <circle cx={CX} cy={CY - R} r="2.5" fill="#FF6E5E" />
          <text x={CX} y={CY - R - 22} textAnchor="middle" className="fill-[rgba(251,248,244,0.92)]" style={{ fontFamily: "var(--font-hanken)", fontSize: 13, fontWeight: 600 }}>
            {copy.stages[0]}
          </text>

          {/* DECIDE (right) */}
          <circle cx={CX + R} cy={CY} r="6" fill="#F6C66B" />
          <text x={CX + R + 16} y={CY + 4} textAnchor="start" className="fill-[rgba(251,248,244,0.7)]" style={{ fontFamily: "var(--font-hanken)", fontSize: 13, fontWeight: 500 }}>
            {copy.stages[1]}
          </text>

          {/* EXECUTE (bottom) */}
          <circle cx={CX} cy={CY + R} r="6" fill="#F6C66B" />
          <text x={CX} y={CY + R + 26} textAnchor="middle" className="fill-[rgba(251,248,244,0.7)]" style={{ fontFamily: "var(--font-hanken)", fontSize: 13, fontWeight: 500 }}>
            {copy.stages[2]}
          </text>

          {/* MEASURE (left) */}
          <circle cx={CX - R} cy={CY} r="6" fill="#F6C66B" />
          <text x={CX - R - 16} y={CY + 4} textAnchor="end" className="fill-[rgba(251,248,244,0.7)]" style={{ fontFamily: "var(--font-hanken)", fontSize: 13, fontWeight: 500 }}>
            {copy.stages[3]}
          </text>

          {/* center payoff: the money, measured back */}
          <text x={CX} y={CY - 16} textAnchor="middle" className="fill-[rgba(251,248,244,0.5)]" style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {copy.recoveredThisWeek}
          </text>
          <text x={CX} y={CY + 22} textAnchor="middle" fill="#F6C66B" style={{ fontFamily: "var(--font-display)", fontSize: 42, fontWeight: 500, letterSpacing: "-0.02em" }}>
            {RECOVERED}
          </text>
          <text x={CX} y={CY + 42} textAnchor="middle" className="fill-[rgba(251,248,244,0.5)]" style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10 }}>
            {copy.measuredVsBaseline}
          </text>
        </svg>
      </div>
    </motion.div>
  );
}

export default RecoveryLoop;
