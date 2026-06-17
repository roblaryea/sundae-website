"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { cinematicIntroCopy } from "./sections/cinematicIntroCopy";

// Fine film-grain tile (feTurbulence) - the premium cinematic "noise" layer.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// useLayoutEffect on the client, useEffect on the server (avoids the SSR warning).
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Measure the largest font (px) at which the hero headline still fits the column
// on ONE row, so every language stays single-line (English at the cap, longer
// locales scaled down). Mutates fontSize as a side effect of measuring.
function fitHeadlinePx(el: HTMLElement): number | null {
  const h1 = el.closest("h1");
  if (!h1) return null;
  const avail = h1.clientWidth;
  const REF = 100;
  el.style.fontSize = `${REF}px`;
  const natural = el.scrollWidth;
  if (!natural || !avail) return null;
  const cap = Math.min(104, window.innerWidth * 0.071); // mirrors clamp(_, 7.1vw, 104)
  const fitted = Math.min(cap, (REF * avail) / natural);
  el.style.fontSize = `${fitted}px`;
  return fitted;
}

// Largest font (px) at which the sub-paragraph's WIDEST clause fits the column on
// one row (desktop only) - keeps the clause-per-line wrap identical across locales.
function fitSubPx(el: HTMLElement): number | null {
  if (window.innerWidth < 1024) return null; // mobile: let the sentence flow naturally
  const avail = el.clientWidth;
  const REF = 100;
  el.style.fontSize = `${REF}px`;
  let maxW = 0;
  el.querySelectorAll(":scope > span").forEach((s) => {
    maxW = Math.max(maxW, (s as HTMLElement).scrollWidth);
  });
  el.style.fontSize = "";
  if (!maxW || !avail) return null;
  const cap = Math.min(18.5, window.innerWidth * 0.0155); // mirrors clamp(_, 1.55vw, 18.5)
  return Math.min(cap, (REF * avail) / maxW);
}

/**
 * Cinematic brand intro - the "glass" moment that opens the homepage and then
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

// Climax / heartbeat beat (s) - when the cherry lands and the pulse radiates.
const BEAT = 2.7;

function Glass() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const [tour, setTour] = useState<number | null>(null);
  const { locale } = useWebsiteI18n();
  const copy = cinematicIntroCopy[locale] ?? cinematicIntroCopy.en;
  // Alive-at-rest auto-tour: after the build, glow each layer in sequence so the
  // hero is never static and the hover affordance teaches itself. User hover
  // always overrides it; disabled entirely for reduced-motion.
  useEffect(() => {
    if (reduce) return;
    let i = 0;
    let loop: ReturnType<typeof setTimeout>;
    const tick = () => {
      setTour(i % LAYERS.length);
      i += 1;
      loop = setTimeout(tick, 1600);
    };
    const start = setTimeout(tick, 3300);
    return () => {
      clearTimeout(start);
      clearTimeout(loop);
    };
  }, [reduce]);
  const active = hover ?? tour;
  return (
    <div className="relative flex items-center justify-center">
      {/* caustic warm cast - large, slow, behind everything */}
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 560,
          height: 560,
          background:
            "radial-gradient(circle, rgba(255,92,77,.22), rgba(233,162,74,.10) 42%, transparent 68%)",
          filter: "blur(40px)",
        }}
        animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 380,
          height: 380,
          background: "radial-gradient(circle, rgba(255,92,77,.32), transparent 64%)",
          filter: "blur(26px)",
        }}
        animate={reduce ? undefined : { scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* climax pulse-ring - radiates from the cherry as "Act in time." lands,
          then beats slowly at rest. The payoff beat the hero was missing. */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute rounded-full border"
          style={{ top: "9%", width: 150, height: 150, borderColor: "rgba(255,124,111,.5)" }}
          initial={{ scale: 0.2, opacity: 0 }}
          animate={{ scale: [0.2, 2.2], opacity: [0, 0.5, 0] }}
          transition={{ duration: 2.6, ease: "easeOut", delay: BEAT, repeat: Infinity, repeatDelay: 3.6 }}
        />
      )}
      <svg width="360" viewBox="0 0 240 430" fill="none" className="relative z-10" aria-label="A glass of business layers - every layer, visible at once">
        <defs>
          <clipPath id="ci-bowl">
            <path d="M56,84 C56,200 78,300 120,318 C162,300 184,200 184,84 Z" />
          </clipPath>
          {/* curved glass gloss - bright on both edges, clear in the middle */}
          <linearGradient id="ci-gloss" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(255,255,255,.30)" />
            <stop offset=".17" stopColor="rgba(255,255,255,.05)" />
            <stop offset=".5" stopColor="rgba(255,255,255,0)" />
            <stop offset=".84" stopColor="rgba(255,255,255,.05)" />
            <stop offset="1" stopColor="rgba(255,255,255,.16)" />
          </linearGradient>
          {/* liquid depth - light at the surface, darker toward the base */}
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
                initial={reduce ? false : { scaleY: 0, opacity: 1 }}
                animate={{ scaleY: 1, opacity: active === null || active === i ? 1 : 0.28 }}
                transition={{ scaleY: { delay: 0.5 + i * 0.13, duration: 0.8, ease: EASE }, opacity: { duration: 0.35, ease: "easeOut" } }}
              />
            );
          })}
          {/* per-layer surface menisci (the liquid catching light) */}
          {LAYERS.map((L, i) => {
            const y = BOT - (i + 1) * BAND;
            return (
              <motion.ellipse key={`m${i}`} cx="120" cy={y + 1.4} rx="60" ry="3.4" fill="rgba(255,255,255,.20)"
                initial={reduce ? false : { opacity: 0 }} animate={{ opacity: active === null || active === i ? 0.9 : 0.25 }}
                transition={{ delay: 0.65 + i * 0.13, duration: 0.5 }} />
            );
          })}
          {/* depth shading + glossy reflections */}
          <rect x="40" y="80" width="160" height="246" fill="url(#ci-depth)" />
          <ellipse cx="80" cy="180" rx="13" ry="118" fill="rgba(255,255,255,.16)" filter="url(#ci-blur)" />
          <ellipse cx="164" cy="172" rx="5" ry="88" fill="rgba(255,255,255,.07)" filter="url(#ci-blur)" />
          {/* rising bubbles */}
          {!reduce && [0, 1, 2].map((bi) => (
            <motion.circle key={`b${bi}`} cx={96 + bi * 20} cy={300} r={1.5 + bi * 0.5} fill="rgba(255,255,255,.45)"
              style={{ transformBox: "fill-box" }}
              animate={{ y: [0, -185], opacity: [0, 0.6, 0] }}
              transition={{ duration: 4.6 + bi, repeat: Infinity, delay: 3 + bi * 1.4, ease: "easeOut" }} />
          ))}
          {/* light sweep */}
          {!reduce && (
            <g transform="skewX(-14)">
              <motion.rect x={42} y={55} width={46} height={288} fill="rgba(255,255,255,.4)" style={{ transformBox: "fill-box" }}
                animate={{ x: [-95, 150, 150], opacity: [0, 0.5, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2.6, times: [0, 0.34, 1] }} />
            </g>
          )}
        </g>

        {/* glass body gloss + outline */}
        <path d="M56,84 C56,200 78,300 120,318 C162,300 184,200 184,84" fill="url(#ci-gloss)" />
        <path d="M56,84 C56,200 78,300 120,318 C162,300 184,200 184,84" fill="none" stroke="rgba(251,248,244,.55)" strokeWidth="2" />
        {/* rim - surface + bright catch-light arc */}
        <ellipse cx="120" cy="84" rx="64" ry="11" fill="rgba(246,241,232,.55)" />
        <ellipse cx="120" cy="84" rx="64" ry="11" fill="none" stroke="rgba(255,255,255,.65)" strokeWidth="2" />
        <path d="M60,80 A64 11 0 0 1 150 77" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="2" strokeLinecap="round" />
        {/* stem + foot with highlight */}
        <path d="M120,318 L120,372" stroke="rgba(251,248,244,.36)" strokeWidth="7" strokeLinecap="round" />
        <path d="M118,321 L118,369" stroke="rgba(255,255,255,.4)" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="120" cy="378" rx="40" ry="7" fill="rgba(255,255,255,.05)" />
        <ellipse cx="120" cy="378" rx="40" ry="7" fill="none" stroke="rgba(251,248,244,.4)" strokeWidth="2.5" />

        {/* surface splash ring - radiates at the rim when the cherry lands */}
        {!reduce && (
          <motion.ellipse cx="120" cy="84" rx="40" ry="9" fill="none" stroke="rgba(255,160,136,.7)" strokeWidth="1.6"
            initial={{ scale: 0.5, opacity: 0 }} style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={{ scale: [0.5, 1.7], opacity: [0, 0.7, 0] }}
            transition={{ duration: 1.5, ease: "easeOut", delay: BEAT, repeat: Infinity, repeatDelay: 4.7 }} />
        )}
        {/* cherry - the signal, glossy + 3-D */}
        <motion.g initial={reduce ? false : { y: -56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.85, duration: 0.9, ease: EASE }}>
          <ellipse cx="116" cy="83" rx="15" ry="3.6" fill="rgba(58,18,8,.4)" filter="url(#ci-soft)" />
          <path d="M118 68 C118 48 132 43 142 33" stroke="#7d1f12" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <circle cx="114" cy="70" r="14" fill="url(#ci-cherry)" />
          <motion.ellipse cx="108" cy="64" rx="4.8" ry="3.2" fill="url(#ci-glint)"
            animate={reduce ? undefined : { opacity: [0.95, 0.55, 0.95] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
          <circle cx="120" cy="76" r="2" fill="rgba(255,255,255,.35)" />
        </motion.g>
      </svg>

      {/* layer labels - each anchored to its band's exact center */}
      {/* Label rail sits to the right of the glass; it needs a wide canvas or it
          clips off-screen (the labels can't fit beside the glass below ~1440px
          without overlapping it). Show only where it fits; the glass alone is the
          hero visual on narrower laptops. */}
      <div className="absolute left-[calc(50%+120px)] top-0 hidden h-full w-[220px] min-[1460px]:block">
        {LAYERS.map((L, i) => {
          const topPct = ((BOT - (i + 0.5) * BAND) / 430) * 100;
          const isActive = active === i;
          return (
            <div key={i} className="absolute" style={{ top: `${topPct}%`, transform: "translateY(-50%)" }}>
              <motion.div
                className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap text-[14px]"
                style={{
                  color: isActive ? "rgba(251,248,244,1)" : active !== null ? "rgba(251,248,244,0.34)" : "rgba(251,248,244,0.9)",
                  transition: "color .25s ease",
                }}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.16, duration: 0.55, ease: EASE }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                {/* keyline - draws in from the glass, lengthens + colors when active */}
                <motion.span
                  style={{ height: 2, borderRadius: 2, transformOrigin: "left center", width: isActive ? 44 : 26, background: isActive ? L.c : "rgba(251,248,244,.3)", transition: "width .25s ease, background .25s ease" }}
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.05 + i * 0.16, duration: 0.5, ease: EASE }}
                />
                <span style={{ width: isActive ? 11 : 9, height: isActive ? 11 : 9, borderRadius: "50%", background: L.c, boxShadow: isActive ? `0 0 12px ${L.c}` : "none", transition: "all .25s ease" }} />
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
  const reduceMotion = useReducedMotion();
  const copy = cinematicIntroCopy[locale] ?? cinematicIntroCopy.en;
  const headlineRef = useRef<HTMLSpanElement>(null);
  const [headlinePx, setHeadlinePx] = useState<number | null>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const [subPx, setSubPx] = useState<number | null>(null);

  useIsoLayoutEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const fit = () => setHeadlinePx(fitHeadlinePx(el));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [copy.headline]);

  useIsoLayoutEffect(() => {
    const el = subRef.current;
    if (!el) return;
    const fit = () => setSubPx(fitSubPx(el));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [copy.sub]);

  return (
    <section
      className="surface-always-dark relative flex min-h-svh items-center overflow-hidden px-6 pt-24 pb-14 sm:px-10"
      style={{
        background:
          "radial-gradient(115% 75% at 82% 14%, rgba(255,92,77,.16), transparent 55%), radial-gradient(80% 60% at 8% 92%, rgba(233,162,74,.12), transparent 55%), var(--navy-deep)",
      }}
      aria-label="Sundae - see every layer, act in time"
    >
      {/* drifting warm light - two large blurred fields that slowly cross, giving
          the flat navy real depth and motion behind the content. */}
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-0 z-0 h-[680px] w-[680px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(255,92,77,.16), transparent 62%)", filter: "blur(30px)" }}
            animate={{ x: [0, 120, 0], y: [0, 60, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-40 bottom-0 z-0 h-[620px] w-[620px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(233,162,74,.13), transparent 62%)", filter: "blur(34px)" }}
            animate={{ x: [0, -110, 0], y: [0, -50, 0] }}
            transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      {/* film grain - the premium cinematic texture layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />
      {/* vignette - draws the eye to the center, deepens the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(120% 120% at 50% 42%, transparent 52%, rgba(8,5,3,.55))" }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1320px] items-center gap-8 lg:grid-cols-[1.12fr_.88fr]">
        {/* min-w-0 so the nowrap headline can't expand this grid track past its
            fr share (lets the fit-to-width hook measure the real column width). */}
        <div className="min-w-0">
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
            className="mt-5 font-light leading-[0.94] tracking-[-0.04em]"
            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            aria-label={`${copy.headline} ${copy.tagline}`}
          >
            <span className="block overflow-hidden">
              <motion.span
                ref={headlineRef}
                className="block whitespace-nowrap"
                style={{ fontSize: headlinePx ? `${headlinePx}px` : "clamp(44px,7.1vw,104px)" }}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                {copy.headline}
              </motion.span>
            </span>{" "}
            <motion.span
              className="mt-[0.1em] block italic"
              style={{ color: "#F6C66B", fontSize: "clamp(30px,5vw,62px)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0, textShadow: ["0 0 0px rgba(246,198,107,0)", "0 0 26px rgba(246,198,107,.55)", "0 0 0px rgba(246,198,107,0)"] }
              }
              transition={{
                opacity: { delay: 0.5, duration: 0.9, ease: EASE },
                y: { delay: 0.5, duration: 0.9, ease: EASE },
                textShadow: { delay: BEAT, duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 },
              }}
            >
              {copy.tagline}
            </motion.span>
          </h1>

          <motion.p
            ref={subRef}
            className="mt-7 leading-[1.62]"
            style={{
              color: "rgba(251,248,244,0.86)",
              fontSize: subPx ? `${subPx}px` : "clamp(15.5px,1.55vw,18.5px)",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
          >
            {/* Break the sentence at its clause dashes: each clause on its own row
                on desktop (nowrap + per-locale fit keeps it to one line), flowing
                naturally on mobile. The \u00A0 before the dash glues it to the preceding word
                so it can never wrap onto a line by itself. */}
            {copy.sub.split(" - ").map((part, i, arr) => (
              <span key={i} className="lg:block lg:whitespace-nowrap">
                {i < arr.length - 1 ? `${part}\u00A0- ` : part}
              </span>
            ))}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
          >
            <a
              href="/demo"
              className="inline-flex items-center rounded-full px-6 py-3.5 text-[15px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(180deg,#FF7E6F,#E03E48)", boxShadow: "0 14px 38px -12px rgba(224,62,72,.6)" }}
            >
              {copy.cta}
            </a>
          </motion.div>
        </div>

        <div className="relative flex min-h-[460px] items-center justify-center lg:min-h-[640px]">
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
          animate={reduceMotion ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}

export default SectionCinematicIntro;
