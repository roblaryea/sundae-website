"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { cinematicIntroCopy } from "./sections/cinematicIntroCopy";
import HeroGlassLazy from "./hero3d/HeroGlassLazy";
import { HERO_LAYER_FRACTIONS, HERO_CHERRY_FRACTION } from "./hero3d/heroLayout";

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

// Climax / heartbeat beat (s) - when the cherry lands and the pulse radiates.
const BEAT = 2.7;

// Out-of-focus "service lights" - soft warm bokeh that drifts behind the glass
// so the hero reads as a room, not a standalone object. Positions are relative
// to the glass wrapper; a few spill beyond it into the section.
const BOKEH = [
  { x: -64, y: 40, s: 22, b: 12, c: "rgba(255,150,110,.3)", o: 0.2, dx: 8, dy: -7, d: 22, delay: 0 },
  { x: 290, y: 120, s: 26, b: 15, c: "rgba(246,198,107,.26)", o: 0.16, dx: -9, dy: 7, d: 26, delay: 1.4 },
  { x: 220, y: 360, s: 18, b: 11, c: "rgba(255,124,111,.26)", o: 0.16, dx: -7, dy: -8, d: 24, delay: 0.8 },
];

function Glass() {
  const reduce = useReducedMotion();
  // SSR and the first client render must match, but useReducedMotion() is false
  // on the server and true on a reduced-motion client. Gate every SSR-affecting
  // motion guard (element presence / initial / style) behind `mounted` so the
  // first render is always the full-motion path; reduced users settle after mount.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const rm = mounted && reduce;
  const [hover, setHover] = useState<number | null>(null);
  const [tour, setTour] = useState<number | null>(null);
  // Measured on-screen vertical fraction of each 3D stratum (from the live camera),
  // so the label rail lines up with the rendered layers. Falls back to the static
  // estimate until the canvas reports (or when the SVG poster is showing).
  const [layerFr, setLayerFr] = useState<number[] | null>(null);
  const { locale } = useWebsiteI18n();
  const copy = cinematicIntroCopy[locale as keyof typeof cinematicIntroCopy] ?? cinematicIntroCopy.en;
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
      {/* One soft, static warm wash — grounds the glass in the navy without a
          bright tight "spotlight" oval that read as a container. */}
      <div
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 680,
          height: 680,
          background: "radial-gradient(circle, rgba(255,92,77,.12), rgba(233,162,74,.045) 46%, transparent 72%)",
          filter: "blur(70px)",
        }}
      />
      {/* restaurant-scene atmosphere - drifting service-light bokeh, a kitchen-
          pass glow from the lower left, and a table light-pool under the foot, so
          the glass sits in a room instead of floating. */}
      {!rm &&
        BOKEH.map((dot, i) => (
          <motion.span
            key={`bok${i}`}
            aria-hidden
            className="absolute rounded-full"
            style={{ width: dot.s, height: dot.s, left: dot.x, top: dot.y, background: dot.c, filter: `blur(${dot.b}px)` }}
            animate={{ x: [0, dot.dx, 0], y: [0, dot.dy, 0], opacity: [dot.o * 0.55, dot.o, dot.o * 0.55] }}
            transition={{ duration: dot.d, repeat: Infinity, ease: "easeInOut", delay: dot.delay }}
          />
        ))}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-3 h-44 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,140,90,.16), transparent 70%)", filter: "blur(28px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[7%] h-10 w-56 rounded-[50%]"
        style={{ background: "radial-gradient(ellipse, rgba(255,170,120,.2), transparent 72%)", filter: "blur(13px)" }}
      />

      <HeroGlassLazy
        active={active}
        onHover={setHover}
        onLayout={setLayerFr}
        className="relative z-10 w-[260px] sm:w-[330px] lg:w-[420px] aspect-[240/430]"
        poster={
      <Image
        src="/images/hero/sundae-glass.png"
        alt="A sundae glass of the business layers — every layer visible at once, the cherry the signal to act"
        fill
        sizes="(min-width: 1024px) 420px, 70vw"
        className="object-contain"
        priority
      />
        }
      />

      {/* layer labels - each anchored to its band's exact center */}
      {/* Label rail sits to the right of the glass; it needs a wide canvas or it
          clips off-screen (the labels can't fit beside the glass below ~1440px
          without overlapping it). Show only where it fits; the glass alone is the
          hero visual on narrower laptops. */}
      <div className="absolute left-[calc(50%+150px)] top-0 hidden h-full w-[220px] min-[1460px]:block">
        {LAYERS.map((L, i) => {
          // Align each label to the real 3D stratum's MEASURED on-screen position
          // (reported by the live camera), falling back to the static estimate.
          const topPct = ((layerFr ?? HERO_LAYER_FRACTIONS)[i] ?? 0.5) * 100;
          const isActive = active === i;
          return (
            <div key={i} className="absolute" style={{ top: `${topPct}%`, transform: "translateY(-50%)" }}>
              <motion.div
                className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap text-[14px]"
                style={{
                  color: isActive ? "rgba(251,248,244,1)" : active !== null ? "rgba(251,248,244,0.34)" : "rgba(251,248,244,0.9)",
                  transition: "color .25s ease",
                }}
                initial={rm ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 + i * 0.16, duration: 0.55, ease: EASE }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
              >
                {/* keyline - draws in from the glass, lengthens + colors when active */}
                <motion.span
                  style={{ height: 2, borderRadius: 2, transformOrigin: "left center", width: isActive ? 44 : 26, background: isActive ? L.c : "rgba(251,248,244,.3)", transition: "width .25s ease, background .25s ease" }}
                  initial={rm ? false : { scaleX: 0 }}
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

        {/* The cherry — "the signal" — attributed like the layers, anchored to its
            measured on-screen position above the strata. */}
        <div
          className="absolute"
          style={{ top: `${((layerFr?.[LAYERS.length] ?? HERO_CHERRY_FRACTION) * 100).toFixed(3)}%`, transform: "translateY(-50%)" }}
        >
          <motion.div
            className="flex items-center gap-2.5 whitespace-nowrap text-[14px]"
            style={{ color: "rgba(251,248,244,0.95)" }}
            initial={rm ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.55, ease: EASE }}
          >
            <span style={{ height: 2, width: 30, borderRadius: 2, background: "#E8404A" }} />
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 30%, #FF8275, #A81B29)",
                boxShadow: "0 0 12px rgba(232,64,74,.6)",
              }}
            />
            <span className="italic" style={{ color: "#F6C66B", fontFamily: "var(--font-display)", fontSize: "15px" }}>
              {copy.tagline}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function SectionCinematicIntro() {
  const { locale } = useWebsiteI18n();
  const reduceMotion = useReducedMotion();
  // See Glass: gate SSR-affecting motion guards behind `mounted` so the first
  // render always matches the server (full-motion path), avoiding a reduced-
  // motion hydration mismatch. `rm` settles to the real preference after mount.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const rm = mounted && reduceMotion;
  const copy = cinematicIntroCopy[locale as keyof typeof cinematicIntroCopy] ?? cinematicIntroCopy.en;
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLSpanElement>(null);

  // Theatrical hand-off: as the glass scene scrolls away the content dissolves
  // and the glass pushes in + lifts, so the restaurant DI section waiting below
  // is "entered" rather than abruptly cut to. Identity values for reduced motion.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -56]);
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
      ref={sectionRef}
      className="surface-always-dark relative flex min-h-svh items-center overflow-hidden px-6 pt-24 pb-14 sm:px-10"
      style={{
        background:
          "radial-gradient(115% 75% at 82% 14%, rgba(255,92,77,.16), transparent 55%), radial-gradient(80% 60% at 8% 92%, rgba(233,162,74,.12), transparent 55%), var(--navy-deep)",
      }}
      aria-label="Sundae - see every layer, act in time"
    >
      {/* drifting warm light - two large blurred fields that slowly cross, giving
          the flat navy real depth and motion behind the content. */}
      {/* Static, low warm fields — give the navy depth without the busy drift
          animation that competed with the glass. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 z-0 h-[720px] w-[720px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(255,92,77,.08), transparent 64%)", filter: "blur(44px)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 z-0 h-[660px] w-[660px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(233,162,74,.055), transparent 64%)", filter: "blur(48px)" }}
      />
      {/* film grain - the premium cinematic texture layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />
      {/* vignette - draws the eye to the center, deepens the edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(125% 125% at 50% 44%, transparent 60%, rgba(8,5,3,.4))" }}
      />
      {/* seam bridge - the strata's warmth bleeds down into the restaurant section
          below so the hand-off reads as one continuous space, not a hard cut. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44"
        style={{ background: "linear-gradient(to top, rgba(255,92,77,.12), rgba(233,162,74,.05) 45%, transparent)" }}
      />

      <motion.div
        className="relative z-10 mx-auto grid w-full max-w-[1320px] items-center gap-4 sm:gap-8 lg:grid-cols-[1.12fr_.88fr]"
        style={rm ? undefined : { opacity: sceneOpacity, y: sceneY }}
      >
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
            // Warm off-white (#FBF8F4), matching the subhead + wordmark - not clinical
            // pure white. The hero is surface-always-dark, so this is correct in both themes.
            style={{ fontFamily: "var(--font-display)", color: "#FBF8F4" }}
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

        <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[420px] lg:min-h-[640px]">
          <Glass />
        </div>
      </motion.div>

      <motion.a
        href="#home-main"
        // Hidden on mobile: the glass fills the small viewport, so the cue overlapped
        // the bottom (Revenue) band. Swiping is natural on touch; show it from sm up.
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] sm:flex"
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
