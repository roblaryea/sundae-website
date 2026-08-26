"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { recoveryLoopCopy } from "./recoveryLoopCopy";
import { resolveRecoveryFigure, type RecoveryFigure } from "@/lib/recovery-figure";
import type { WebsiteLocale } from "@/lib/i18n";

/**
 * RecoveryLoop - the homepage hero-1 signature. The visual IS the message:
 * detect a margin leak, decide an owner, execute the fix, measure the recovery -
 * with the recovered value, measured against a baseline, at the center of the
 * loop. Pure SVG (no WebGL), so the hero stays fast; the 3D "sundae glass" now
 * lives deeper in the page as a brand motif.
 *
 * Alive by design: the recovered figure counts up on load, the four stages light
 * in sequence with the travelling comet, so the loop reads as running. The figure
 * is an illustrative, locale-currency demo value (consistent with the second
 * hero's Pulse strip) - never a claimed customer result. Reduced motion settles
 * everything to its final, static state.
 */

// ring geometry (viewBox units)
const CX = 236;
const CY = 190;
const R = 122;
const CIRC = 2 * Math.PI * R;

const STAGE_POS = [
  { x: CX, y: CY - R, anchor: "middle", lx: CX, ly: CY - R - 24 }, // Detect (top)
  { x: CX + R, y: CY, anchor: "start", lx: CX + R + 16, ly: CY + 4 }, // Decide (right)
  { x: CX, y: CY + R, anchor: "middle", lx: CX, ly: CY + R + 28 }, // Execute (bottom)
  { x: CX - R, y: CY, anchor: "end", lx: CX - R - 16, ly: CY + 4 }, // Measure (left)
] as const;

export function RecoveryLoop({ figure }: { figure?: RecoveryFigure } = {}) {
  const { locale } = useWebsiteI18n();
  const copy = recoveryLoopCopy[locale] ?? recoveryLoopCopy.en;
  // Currency + amount come geo-resolved from the server (page.tsx); fall back to
  // the language locale if the component is ever rendered without a figure.
  const fig = figure ?? resolveRecoveryFigure(locale as WebsiteLocale);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const rm = mounted && reduce;

  // Localized currency formatter: the visitor's language for grouping/digits, the
  // geo-resolved currency for the symbol.
  const fmt = useMemo(() => {
    try {
      return new Intl.NumberFormat(fig.intlLocale, { style: "currency", currency: fig.currency, currencyDisplay: "narrowSymbol", maximumFractionDigits: 0 });
    } catch {
      return new Intl.NumberFormat("en", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
    }
  }, [fig.intlLocale, fig.currency]);

  // Number font size is picked from the FINAL formatted length (stable while the
  // value counts up), so long-currency strings (IDR, VND, KRW) still fit the ring.
  const finalStr = fmt.format(fig.amount);
  const numFontSize = finalStr.length <= 8 ? 44 : finalStr.length <= 10 ? 38 : finalStr.length <= 12 ? 32 : 27;

  // Count-up. Reduced motion renders the final value directly (see `shown`), so
  // the effect never sets state synchronously.
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (rm) return;
    const controls = animate(0, fig.amount, {
      duration: 1.4,
      delay: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [rm, fig.amount]);
  const shown = rm ? fig.amount : value;

  // Sequential stage highlight, in step with the 6.5s comet (one lap = 4 stages).
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (rm) return;
    const id = setInterval(() => setActive((i) => (i + 1) % 4), 6500 / 4);
    return () => clearInterval(id);
  }, [rm]);

  return (
    <motion.div
      className="surface-always-dark relative w-full max-w-[560px]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* warm wash behind the card, so it sits in the room like the glass did */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,92,77,.18), rgba(233,162,74,.07) 44%, transparent 72%)", filter: "blur(56px)" }}
      />

      <div
        className="relative rounded-[20px] border border-white/10 px-6 pb-6 pt-5"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.01))",
          boxShadow: "0 40px 90px -46px rgba(0,0,0,0.9)",
        }}
      >
        {/* card header: what this is + a quiet live tick */}
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-[rgba(251,248,244,0.5)]" style={{ fontFamily: "var(--font-geist-mono)" }}>
            {copy.loopTitle}
          </span>
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            {!rm && <span className="absolute inline-flex h-full w-full rounded-full bg-[#F6C66B] opacity-60 motion-safe:animate-ping" />}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F6C66B]" />
          </span>
        </div>

        <svg viewBox="0 0 472 388" className="block w-full" role="img" aria-label={`${copy.loopTitle}: ${copy.stages.join(", ")}. ${finalStr} ${copy.recoveredThisWeek}, ${copy.measuredVsBaseline}.`}>
          <defs>
            <linearGradient id="recoveryLoopGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F6C66B" />
              <stop offset="0.5" stopColor="#FF7E6F" />
              <stop offset="1" stopColor="#E03E48" />
            </linearGradient>
            <filter id="recoveryCometGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* rings: faint base + faint coral, a soft glow arc, and the travelling comet */}
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="2" />
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#recoveryLoopGrad)" strokeWidth="2" opacity="0.24" />
          {!rm && (
            <>
              <motion.circle
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke="url(#recoveryLoopGrad)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={`70 ${CIRC - 70}`}
                transform={`rotate(-90 ${CX} ${CY})`}
                filter="url(#recoveryCometGlow)"
                opacity="0.5"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -CIRC }}
                transition={{ duration: 6.5, ease: "linear", repeat: Infinity }}
              />
              <motion.circle
                cx={CX}
                cy={CY}
                r={R}
                fill="none"
                stroke="url(#recoveryLoopGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`70 ${CIRC - 70}`}
                transform={`rotate(-90 ${CX} ${CY})`}
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -CIRC }}
                transition={{ duration: 6.5, ease: "linear", repeat: Infinity }}
              />
            </>
          )}
          {rm && <circle cx={CX} cy={CY} r={R} fill="none" stroke="url(#recoveryLoopGrad)" strokeWidth="3" opacity="0.5" />}

          {/* stage nodes + labels */}
          {STAGE_POS.map((p, i) => {
            const isLeak = i === 0;
            const on = !rm && active === i;
            return (
              <g key={i}>
                {on && <circle cx={p.x} cy={p.y} r="13" fill={isLeak ? "#E03E48" : "#F6C66B"} opacity="0.18" />}
                {isLeak ? (
                  <>
                    <circle cx={p.x} cy={p.y} r={on ? 8 : 7} fill="#15110D" stroke="#E03E48" strokeWidth="3" />
                    <circle cx={p.x} cy={p.y} r="2.6" fill="#FF6E5E" />
                  </>
                ) : (
                  <circle cx={p.x} cy={p.y} r={on ? 7 : 6} fill="#F6C66B" style={on ? { filter: "drop-shadow(0 0 6px rgba(246,198,107,0.8))" } : undefined} />
                )}
                <text
                  x={p.lx}
                  y={p.ly}
                  textAnchor={p.anchor}
                  fill={i === 0 || on ? "rgba(251,248,244,0.95)" : "rgba(251,248,244,0.66)"}
                  style={{ fontFamily: "var(--font-hanken)", fontSize: 13, fontWeight: i === 0 ? 600 : 500, transition: "fill .3s ease" }}
                >
                  {copy.stages[i]}
                </text>
              </g>
            );
          })}

          {/* center payoff: the money, counting up, measured back */}
          <text x={CX} y={CY - 18} textAnchor="middle" fill="rgba(251,248,244,0.5)" style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10.5, letterSpacing: "0.14em" }}>
            {copy.recoveredThisWeek.toUpperCase()}
          </text>
          <text x={CX} y={CY + 24} textAnchor="middle" fill="#F6C66B" style={{ fontFamily: "var(--font-display)", fontSize: numFontSize, fontWeight: 500, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
            {fmt.format(shown)}
          </text>
          <text x={CX} y={CY + 45} textAnchor="middle" fill="rgba(251,248,244,0.5)" style={{ fontFamily: "var(--font-geist-mono)", fontSize: 10.5 }}>
            {copy.measuredVsBaseline}
          </text>
        </svg>
      </div>
    </motion.div>
  );
}

export default RecoveryLoop;
