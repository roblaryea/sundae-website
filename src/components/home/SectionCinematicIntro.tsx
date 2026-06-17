"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { cinematicIntroCopy } from "./sections/cinematicIntroCopy";

/**
 * Cinematic brand intro — the "glass" moment that opens the homepage and then
 * hands off into the live product site below. Locked brand: warm strata in a
 * glass (every layer of the business), the cherry as the signal, and the master
 * line "See every layer. Act in time." Fraunces (--font-display) + warm tokens.
 *
 * The glass is the INTRO device only; Pulse (the existing site below) is the proof.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

// strata, bottom → top (clay foundation → cream "next move")
const LAYERS = [
  { name: "Foundation", sub: "org topology", c: "#B23A1E" },
  { name: "Revenue", sub: "sales & mix", c: "#E03E48" },
  { name: "Labor", sub: "crew & cost", c: "#FF5C4D" },
  { name: "Inventory", sub: "stock & waste", c: "#F7A088" },
  { name: "Marketing", sub: "reach & ROI", c: "#E9A24A" },
  { name: "Guests", sub: "CRM & loyalty", c: "#F6C66B" },
  { name: "Next move", sub: "what to do now", c: "#F6F1E8" },
];

const TOP = 86;
const BOT = 318;
const BAND = (BOT - TOP) / LAYERS.length;

function Glass() {
  const [hover, setHover] = useState<number | null>(null);
  const { locale } = useWebsiteI18n();
  const copy = cinematicIntroCopy[locale] ?? cinematicIntroCopy.en;
  return (
    <div className="relative flex items-center justify-center">
      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 360,
          height: 360,
          background: "radial-gradient(circle, rgba(255,92,77,.3), transparent 64%)",
          filter: "blur(26px)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg width="304" viewBox="0 0 240 430" fill="none" className="relative z-10" aria-label="A glass of business layers — every layer, visible at once">
        <defs>
          <clipPath id="ci-bowl">
            <path d="M56,84 C56,200 78,300 120,318 C162,300 184,200 184,84 Z" />
          </clipPath>
          {/* curved glass gloss — bright on both edges, clear in the middle */}
          <linearGradient id="ci-gloss" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,.30)" />
            <stop offset=".17" stopColor="rgba(255,255,255,.05)" />
            <stop offset=".5" stopColor="rgba(255,255,255,0)" />
            <stop offset=".84" stopColor="rgba(255,255,255,.05)" />
            <stop offset="1" stopColor="rgba(255,255,255,.16)" />
          </linearGradient>
          {/* liquid depth — light at the surface, darker toward the base */}
          <linearGradient id="ci-depth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,.14)" />
            <stop offset=".1" stopColor="rgba(255,255,255,0)" />
            <stop offset=".68" stopColor="rgba(0,0,0,0)" />
            <stop offset="1" stopColor="rgba(58,18,8,.42)" />
          </linearGradient>
          <radialGradient id="ci-cherry" cx=".35" cy=".3" r=".85">
            <stop offset="0" stopColor="#FF8275" /><stop offset=".55" stopColor="#E8404A" /><stop offset="1" stopColor="#A81B29" />
          </radialGradient>
          <radialGradient id="ci-glint" cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="rgba(255,255,255,.95)" /><stop offset="1" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="ci-soft" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.2" /></filter>
          <filter id="ci-blur" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="6.5" /></filter>
        </defs>

        <g clipPath="url(#ci-bowl)">
          {/* empty-glass back tint */}
          <rect x="40" y="80" width="160" height="246" fill="rgba(18,11,7,.45)" />
          {LAYERS.map((L, i) => {
            const y = BOT - (i + 1) * BAND;
            return (
              <motion.rect
                key={i}
                x={40}
                y={y}
                width={160}
                height={BAND + 0.8}
                fill={L.c}
                style={{ transformBox: "fill-box", transformOrigin: "center bottom" }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1, opacity: hover === null || hover === i ? 1 : 0.3 }}
                transition={{ scaleY: { delay: 0.45 + i * 0.15, duration: 0.85, ease: EASE }, opacity: { duration: 0.3, ease: "easeOut" } }}
              />
            );
          })}
          {/* per-layer surface menisci (the liquid catching light) */}
          {LAYERS.map((L, i) => {
            const y = BOT - (i + 1) * BAND;
            return (
              <motion.ellipse key={`m${i}`} cx="120" cy={y + 1.4} rx="60" ry="3.4" fill="rgba(255,255,255,.20)"
                initial={{ opacity: 0 }} animate={{ opacity: hover === null || hover === i ? 0.9 : 0.25 }}
                transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }} />
            );
          })}
          {/* depth shading + glossy reflections */}
          <rect x="40" y="80" width="160" height="246" fill="url(#ci-depth)" />
          <ellipse cx="80" cy="180" rx="13" ry="118" fill="rgba(255,255,255,.16)" filter="url(#ci-blur)" />
          <ellipse cx="164" cy="172" rx="5" ry="88" fill="rgba(255,255,255,.07)" filter="url(#ci-blur)" />
          {/* rising bubbles */}
          {[0, 1, 2].map((bi) => (
            <motion.circle key={`b${bi}`} cx={96 + bi * 20} cy={300} r={1.5 + bi * 0.5} fill="rgba(255,255,255,.45)"
              style={{ transformBox: "fill-box" }}
              animate={{ y: [0, -185], opacity: [0, 0.6, 0] }}
              transition={{ duration: 4.6 + bi, repeat: Infinity, delay: 3 + bi * 1.4, ease: "easeOut" }} />
          ))}
          {/* light sweep */}
          <g transform="skewX(-14)">
            <motion.rect x={42} y={55} width={46} height={288} fill="rgba(255,255,255,.4)" style={{ transformBox: "fill-box" }}
              animate={{ x: [-95, 150, 150], opacity: [0, 0.5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2.6, times: [0, 0.34, 1] }} />
          </g>
        </g>

        {/* glass body gloss + outline */}
        <path d="M56,84 C56,200 78,300 120,318 C162,300 184,200 184,84" fill="url(#ci-gloss)" />
        <path d="M56,84 C56,200 78,300 120,318 C162,300 184,200 184,84" fill="none" stroke="rgba(251,248,244,.55)" strokeWidth="2" />
        {/* rim — surface + bright catch-light arc */}
        <ellipse cx="120" cy="84" rx="64" ry="11" fill="rgba(246,241,232,.55)" />
        <ellipse cx="120" cy="84" rx="64" ry="11" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="2" />
        <path d="M60,80 A64 11 0 0 1 150 77" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="2" strokeLinecap="round" />
        {/* stem + foot with highlight */}
        <path d="M120,318 L120,372" stroke="rgba(251,248,244,.36)" strokeWidth="7" strokeLinecap="round" />
        <path d="M118,321 L118,369" stroke="rgba(255,255,255,.4)" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="120" cy="378" rx="40" ry="7" fill="rgba(255,255,255,.05)" />
        <ellipse cx="120" cy="378" rx="40" ry="7" fill="none" stroke="rgba(251,248,244,.4)" strokeWidth="2.5" />

        {/* cherry — the signal, glossy + 3-D */}
        <motion.g initial={{ y: -56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.85, duration: 0.9, ease: EASE }}>
          <ellipse cx="116" cy="83" rx="15" ry="3.6" fill="rgba(58,18,8,.4)" filter="url(#ci-soft)" />
          <path d="M118 68 C118 48 132 43 142 33" stroke="#7d1f12" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <circle cx="114" cy="70" r="14" fill="url(#ci-cherry)" />
          <motion.ellipse cx="108" cy="64" rx="4.8" ry="3.2" fill="url(#ci-glint)"
            animate={{ opacity: [0.95, 0.55, 0.95] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <circle cx="120" cy="76" r="2" fill="rgba(255,255,255,.35)" />
        </motion.g>
      </svg>

      {/* layer labels — each anchored to its band's exact center */}
      <div className="absolute left-[calc(50%+100px)] top-0 hidden h-full w-[210px] lg:block">
        {LAYERS.map((L, i) => {
          const topPct = ((BOT - (i + 0.5) * BAND) / 430) * 100;
          return (
            <div key={i} className="absolute" style={{ top: `${topPct}%`, transform: "translateY(-50%)" }}>
              <motion.div
                className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap text-[14px]"
                style={{
                  color: hover === i ? "rgba(251,248,244,1)" : hover !== null ? "rgba(251,248,244,0.34)" : "rgba(251,248,244,0.9)",
                  transition: "color .25s ease",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 + i * 0.16, duration: 0.55, ease: EASE }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                <span style={{ width: hover === i ? 40 : 26, height: 2, borderRadius: 2, background: hover === i ? L.c : "rgba(251,248,244,.3)", transition: "all .25s ease" }} />
                <span style={{ width: hover === i ? 11 : 9, height: hover === i ? 11 : 9, borderRadius: "50%", background: L.c, boxShadow: hover === i ? `0 0 10px ${L.c}` : "none", transition: "all .25s ease" }} />
                <span>
                  <b style={{ color: "inherit", fontWeight: 600 }}>{copy.layers[i].name}</b> <span style={{ opacity: 0.72 }}>· {copy.layers[i].sub}</span>
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SectionCinematicIntro() {
  const { locale } = useWebsiteI18n();
  const copy = cinematicIntroCopy[locale] ?? cinematicIntroCopy.en;
  return (
    <section
      className="relative flex min-h-[88vh] items-center overflow-hidden px-6 pt-24 pb-14 sm:px-10"
      style={{
        background:
          "radial-gradient(115% 75% at 82% 14%, rgba(255,92,77,.16), transparent 55%), radial-gradient(80% 60% at 8% 92%, rgba(233,162,74,.12), transparent 55%), var(--navy-deep)",
      }}
      aria-label="Sundae — see every layer, act in time"
    >
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <motion.div
            className="text-[11.5px] font-semibold uppercase tracking-[0.24em]"
            style={{ color: "#FF5C4D" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
          >
            {copy.eyebrow}
          </motion.div>

          <h1
            className="mt-5 font-light leading-[0.88] tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(56px,9.5vw,138px)", color: "var(--text-primary)" }}
          >
            <span className="block overflow-hidden">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE }}>
                See every
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.12, duration: 1.1, ease: EASE }}>
                layer.
              </motion.span>
            </span>
            <motion.span
              className="mt-[0.12em] block italic"
              style={{ color: "#F6C66B", fontSize: "clamp(30px,5vw,62px)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
            >
              Act in time.
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-[52ch] text-[clamp(15.5px,1.55vw,18.5px)] leading-[1.62]"
            style={{ color: "rgba(251,248,244,0.86)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
          >
            {copy.sub}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
          >
            <a
              href="/book-a-demo"
              className="inline-flex items-center rounded-full px-6 py-3.5 text-[15px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(180deg,#FF7E6F,#E03E48)", boxShadow: "0 14px 38px -12px rgba(224,62,72,.6)" }}
            >
              {copy.cta}
            </a>
          </motion.div>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[560px]">
          <Glass />
        </div>
      </div>

      <motion.a
        href="#home-main"
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10.5px] uppercase tracking-[0.22em]"
        style={{ color: "var(--text-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span>Scroll</span>
        <motion.span
          style={{ width: 1, height: 34, background: "linear-gradient(#FF5C4D, transparent)", transformOrigin: "top" }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}

export default SectionCinematicIntro;
