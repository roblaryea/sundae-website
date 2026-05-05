"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

/**
 * Section 8 — CTA (homepage-spec-v1.1).
 *
 * Conversion job: NONE (intentionally static — buyer has decided by here).
 * Only the section enter has a soft fade-in. CTAs use the existing Button
 * hover/focus micro-interactions.
 *
 * Claims used:
 *   CLM-214 ("Stop running your restaurants on yesterday's numbers.") APPROVED PUBLIC
 *   CLM-301/302/303 (working-session commitments) NEEDS VALIDATION — Sales must confirm
 *
 * Sales sign-off note: the trust line below is what we currently ship in copy.
 * If Sales operates differently, update the copy in this file and the bank entry.
 */
export function SectionCTA() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="cta-headline"
      className="relative overflow-hidden"
    >
      <div aria-hidden className="absolute inset-0 bg-grad-deep" />
      <div aria-hidden className="absolute inset-0 bg-grid-texture opacity-50" />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-8 py-20 sm:py-28 lg:py-32 text-center">
        <motion.h2
          id="cta-headline"
          className="section-h2 text-balance"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Stop running your restaurants on yesterday&apos;s numbers.
        </motion.h2>

        <motion.p
          className="body-xl mt-5 max-w-xl mx-auto"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          30 minutes with our team and your data — see whether Sundae would
          genuinely help your operation.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button href="/demo" variant="cta" size="lg">
            Book a Working Session
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m13 5 7 7-7 7" />
            </svg>
          </Button>
          <Button href="/report" variant="outline-light" size="lg">
            Get Your Free Benchmark
          </Button>
        </motion.div>

        <p className="mt-8 text-sm text-[var(--text-muted)] max-w-lg mx-auto">
          Working session is free. No generic demo. We work from your data
          where available, or from a representative restaurant scenario.
        </p>
      </div>
    </section>
  );
}
