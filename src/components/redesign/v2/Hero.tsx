"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { REPORT_APP_URL } from "@/lib/urls";
import { HeroPulseMockup } from "./HeroPulseMockup";

/**
 * Section 1 — Hero (homepage-spec-v1.1).
 *
 * Conversion job: explain product (subtle live data tick on the mockup).
 * Universal claim — persona-flexed subhead handled in §2 (Persona Switcher).
 *
 * Claims used (claims-bank.md):
 *   CLM-001 (12 data domains) APPROVED PUBLIC
 *   CLM-006 (Live Core refresh) CAPABILITY CLAIM ONLY · FN-1 footnote
 *   CLM-002 (179 restaurant data models) APPROVED PUBLIC
 *   CLM-004 (500+ represented locations) APPROVED PUBLIC — lives in §7 proof,
 *   not in the hero proof strip.
 *
 * CTA hierarchy:
 *   Primary  — `Book a Working Session` (high-intent, sales-led)
 *   Secondary — `Start with Report Lite` (acquisition)
 */
export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative overflow-hidden theme-hero-surface"
    >
      <div aria-hidden className="absolute inset-0 bg-grid-texture pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Left column — copy, CTAs, proof strip */}
          <div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="eyebrow mb-5">
                DECISION INTELLIGENCE FOR RESTAURANTS
              </div>
              <h1 id="hero-headline" className="hero-h1 mb-6 text-balance">
                Know what to do before the margin disappears.
              </h1>
              <p className="body-xl max-w-xl">
                Sundae turns scattered restaurant data into live decisions:
                what changed, why it changed, how you compare, and what each
                team should do next.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
              className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
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
              <Button href={REPORT_APP_URL} variant="outline-light" size="lg">
                Start with Report Lite
              </Button>
            </motion.div>

            <p className="mt-3 text-[12px] text-[var(--text-muted)]">
              Free to start. Build your benchmark profile as your data connects.
            </p>

            {/* Proof strip — static, no animation (credibility numbers don't fade) */}
            <div className="mt-7 sm:mt-9">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm sm:text-base text-[var(--text-supporting)]">
                <span>
                  <strong className="text-[var(--text-primary)] font-semibold">
                    12
                  </strong>{" "}
                  data domains unified
                </span>
                <span aria-hidden className="text-[var(--text-faint)]">
                  ·
                </span>
                <span>
                  <strong className="text-[var(--text-primary)] font-semibold">
                    Live
                  </strong>{" "}
                  Core refresh
                  <sup className="ml-0.5 text-[var(--text-muted)]">*</sup>
                </span>
                <span aria-hidden className="text-[var(--text-faint)]">
                  ·
                </span>
                <span>
                  <strong className="text-[var(--text-primary)] font-semibold">
                    179+
                  </strong>{" "}
                  restaurant data models
                </span>
              </div>
              <p className="mt-2 text-[11px] text-[var(--text-muted)] italic">
                *Refresh frequency varies by Core tier.
              </p>
            </div>
          </div>

          {/* Right column — hero mockup, visible in first viewport on desktop */}
          <div className="lg:pl-4">
            <HeroPulseMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
