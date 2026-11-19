"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getHomeAboutAlignment } from '@/lib/homeAboutAlignment';
import { cinematicIntroCopy } from "./sections/cinematicIntroCopy";
import { RecoveryLoop } from "./RecoveryLoop";
import type { RecoveryFigure } from "@/lib/recovery-figure";

// Fine film-grain tile (feTurbulence) - the premium cinematic "noise" layer.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * Cinematic brand intro - the opening moment of the homepage. Operations
 * management leads; the RecoveryLoop illustrates how teams can follow through.
 * The live Pulse section below explains the in-shift job.
 * Fraunces (--font-display) + warm tokens.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

export function SectionCinematicIntro({ recoveryFigure }: { recoveryFigure?: RecoveryFigure } = {}) {
  const { locale } = useWebsiteI18n();
  const reduceMotion = useReducedMotion();
  // See Glass: gate SSR-affecting motion guards behind `mounted` so the first
  // render always matches the server (full-motion path), avoiding a reduced-
  // motion hydration mismatch. `rm` settles to the real preference after mount.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  const rm = mounted && reduceMotion;
  const alignment = getHomeAboutAlignment(locale);
  const copy = { ...cinematicIntroCopy[locale as keyof typeof cinematicIntroCopy], headline: alignment.primaryHeadline, tagline: alignment.primaryTagline, outcome: alignment.primaryOutcome, eyebrow: alignment.eyebrow, sub: alignment.primarySupport };
  const sectionRef = useRef<HTMLElement>(null);

  // Theatrical hand-off: as the glass scene scrolls away the content dissolves
  // and the glass pushes in + lifts, so the restaurant DI section waiting below
  // is "entered" rather than abruptly cut to. Identity values for reduced motion.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.62], [1, 0]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -56]);

  return (
    <section
      ref={sectionRef}
      className="surface-always-dark relative flex min-h-svh items-center overflow-hidden px-6 pt-24 pb-14 sm:px-10"
      style={{
        background:
          "radial-gradient(115% 75% at 82% 14%, rgba(255,92,77,.16), transparent 55%), radial-gradient(80% 60% at 8% 92%, rgba(233,162,74,.12), transparent 55%), var(--navy-deep)",
      }}
      aria-label={`Sundae - ${copy.headline} ${copy.tagline} ${copy.outcome}`}
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
        className="relative z-10 mx-auto grid w-full max-w-[1320px] items-center gap-8 sm:gap-10 lg:gap-14 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]"
        style={rm ? undefined : { opacity: sceneOpacity, y: sceneY }}
      >
        {/* Keep the text within its grid track, including before hydration. */}
        <div className="min-w-0">
          <motion.div
            className="text-[12px] font-semibold uppercase tracking-[0.24em]"
            style={{ color: "#FF5C4D" }}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
          >
            <span className="block">SUNDAE</span>
            <span className="mt-2 block text-[10.5px] leading-relaxed tracking-[0.14em]" style={{ color: "rgba(251,248,244,0.72)" }}>
              {copy.eyebrow}
            </span>
          </motion.div>

          <h1
            className="mt-5 text-[clamp(32px,8.7vw,44px)] font-light leading-[1.04] tracking-[-0.04em] lg:text-[clamp(44px,4.8vw,72px)]"
            // Warm off-white (#FBF8F4), matching the subhead + wordmark - not clinical
            // pure white. The hero is surface-always-dark, so this is correct in both themes.
            style={{ fontFamily: "var(--font-display)", color: "#FBF8F4" }}
            aria-label={`${copy.headline} ${copy.tagline} ${copy.outcome}`}
          >
            <motion.span
              data-brand-clause
              className="block whitespace-normal [overflow-wrap:anywhere]"
              initial={false}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              {copy.headline}
            </motion.span>{" "}
            <motion.span
              data-brand-clause
              className="mt-[0.06em] block whitespace-normal [overflow-wrap:anywhere]"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                opacity: { delay: 0.5, duration: 0.9, ease: EASE },
                y: { delay: 0.5, duration: 0.9, ease: EASE },
              }}
            >
              {copy.tagline}
            </motion.span>{" "}
            <motion.span
              data-brand-clause
              className="mt-[0.06em] block whitespace-normal italic [overflow-wrap:anywhere]"
              style={{ color: "#F6C66B" }}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.9, ease: EASE }}
            >
              {copy.outcome}
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 text-[clamp(15.5px,1.55vw,18.5px)] leading-[1.62]"
            style={{
              color: "rgba(251,248,244,0.86)",
            }}
            // This is the mobile LCP text: keep it readable in server HTML,
            // together with the headline, loop and opening action.
            initial={false}
            animate={{ opacity: 1, y: 0 }}
          >
            {copy.sub}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: EASE }}
          >
            <Link
              href="/demo"
              className="inline-flex items-center rounded-full px-6 py-3.5 text-[15px] font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(180deg,#FF7E6F,#E03E48)", boxShadow: "0 14px 38px -12px rgba(224,62,72,.6)" }}
            >
              {copy.cta}
            </Link>
          </motion.div>
        </div>

        <div className="relative flex min-h-[300px] items-center justify-center sm:min-h-[420px] lg:min-h-[640px]">
          <RecoveryLoop figure={recoveryFigure} />
        </div>
      </motion.div>

      <motion.a
        href="#home-main"
        // Hidden on mobile: the glass fills the small viewport, so the cue overlapped
        // the bottom (Revenue) band. Swiping is natural on touch; show it from sm up.
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] sm:flex"
        style={{ color: "var(--text-muted)" }}
        initial={false}
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
