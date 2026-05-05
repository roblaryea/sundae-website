"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Section 4 — Old Way vs Sundae Way (homepage-spec-v1.1).
 *
 * Conversion job: dramatize urgency. The Old Way list reveals slowly (each
 * line ~250ms), then the Sundae Way snaps in ~3× faster — the contrast in
 * pacing IS the message.
 *
 * Reduced-motion fallback: both columns and the replaces strip render in
 * their final state on first paint. Contrast is preserved via styling
 * (Old Way muted, Sundae Way electric blue).
 *
 * Claims used:
 *   CLM-202 ("The old way waits for reports...") APPROVED PUBLIC
 *   CLM-211 ("Same data. Different verdict.") APPROVED PUBLIC
 *   CLM-212 ("THE REAL ENEMY IS DASHBOARD BUREAUCRACY") APPROVED PUBLIC
 *   CLM-215 (replaces strip — generic, no named vendor) APPROVED PUBLIC
 */

const oldWay = [
  "Wait for reports.",
  "Debate the numbers.",
  "Ask an analyst.",
  "React next week.",
];

const sundaeWay = [
  "Detect the issue.",
  "Understand the cause.",
  "Compare the market.",
  "Act today.",
];

const replaces = [
  "Excel exports",
  "POS dashboards",
  "BI dashboards",
  "analyst queue",
  "weekly review meetings",
];

export function SectionOldWaySundaeWay() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="oldway-headline" className="relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="eyebrow mb-4">
            THE REAL ENEMY IS DASHBOARD BUREAUCRACY
          </div>
          <h2 id="oldway-headline" className="section-h2 text-balance">
            The old way waits for reports. Sundae acts while there&apos;s still
            time.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* Old Way — slow stagger (250ms per line) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-8"
          >
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-4">
              The old way
            </div>
            <ul className="space-y-2.5">
              {oldWay.map((line, i) => (
                <motion.li
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 0.2 + i * 0.25,
                    ease: "easeOut",
                  }}
                  className="text-lg text-[var(--text-supporting)]"
                >
                  {line}
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-[var(--border-default)] text-sm text-[var(--text-muted)]">
              By Friday&apos;s review meeting.
            </div>
          </motion.div>

          {/* Sundae Way — fast snap (~80ms per line, ~3× faster) */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-2xl border border-[var(--electric-blue)]/30 bg-gradient-to-br from-[var(--electric-blue)]/[0.10] to-[var(--electric-blue)]/[0.02] p-6 sm:p-8 shadow-[0_0_40px_rgba(28,71,255,0.12)]"
          >
            <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-4">
              The Sundae way
            </div>
            <ul className="space-y-2.5">
              {sundaeWay.map((line, i) => (
                <motion.li
                  key={line}
                  initial={reduceMotion ? false : { opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.18,
                    delay: 1.4 + i * 0.08,
                    ease: "easeOut",
                  }}
                  className="text-lg text-[var(--text-primary)] font-medium"
                >
                  {line}
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-[var(--electric-blue)]/20 text-sm text-[var(--text-secondary)]">
              By 11:14 Tuesday.
            </div>
          </motion.div>
        </div>

        {/* Replaces strip */}
        <div className="mt-12 sm:mt-14 max-w-4xl mx-auto text-center">
          <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-4">
            What Sundae replaces
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-2 text-sm sm:text-base text-[var(--text-supporting)]">
            {replaces.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                <span>{item}</span>
                {i < replaces.length - 1 && (
                  <span aria-hidden className="text-[var(--text-faint)]">
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Closing line */}
        <p className="mt-12 sm:mt-14 text-center text-xl sm:text-2xl text-[var(--text-primary)] italic font-light">
          Same data. Different verdict.
        </p>
      </div>
    </section>
  );
}
