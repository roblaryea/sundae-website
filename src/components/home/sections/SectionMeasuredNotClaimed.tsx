"use client";

import { motion } from "framer-motion";
import { useSettledReducedMotion as useReducedMotion } from "@/lib/useSettledReducedMotion";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getLocalizedCopy, type RequiredEnglishLocalizedRecord } from "@/lib/i18n";

/**
 * Beat 5 - "Identified is not recovered."
 *
 * The differentiator the homepage never made. Every competitor can flag a
 * problem; almost none will state, in public, that they refuse to call a
 * saving real until it has been measured against a baseline frozen before
 * the work started. Both customer documents lead on exactly this, and the
 * page had no equivalent.
 *
 * Deliberately quiet: three plain claims and an escalating attribution
 * ladder. The restraint is the argument. Nothing here is a number the page
 * cannot stand behind, and the ladder ends at a state Sundae will not award
 * itself.
 */

type Rung = { label: string; note: string };
type MeasuredCopy = {
  eyebrow: string;
  headlineLead: string;
  headlineEmphasis: string;
  sub: string;
  ladderLabel: string;
  rungs: Rung[];
  closer: string;
};

const copy: RequiredEnglishLocalizedRecord<MeasuredCopy> = {
  en: {
    eyebrow: "Measure and learn",
    headlineLead: "Identified is not recovered.",
    headlineEmphasis: "So Sundae keeps going until it is.",
    sub: "Most tools stop at the flag. Sundae opens the records behind it, names the item doing the damage, gives the work to one person, and freezes the number it will be judged against before that work begins.",
    ladderLabel: "How far a number can be trusted",
    rungs: [
      { label: "Measuring", note: "Work has started and the baseline is frozen. No claim yet." },
      { label: "Directional", note: "Measured against that baseline, and labelled as directional rather than causal." },
      { label: "Operator confirmed", note: "A person who did the work has confirmed the result." },
      { label: "Independently verified", note: "A second authorised reviewer has checked it against evidence." },
    ],
    closer: "Sundae will not call a number recovered until it has been measured, and will not call it verified until someone else has checked it. Where the data does not cover a case, it abstains instead of inferring one.",
  },
};

export function SectionMeasuredNotClaimed() {
  const { locale } = useWebsiteI18n();
  const c = getLocalizedCopy(copy, locale);
  const reduce = useReducedMotion();

  return (
    <section
      id="chapter-measured"
      aria-labelledby="measured-heading"
      className="scroll-mt-24 py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--warm-coral)]">
            {c.eyebrow}
          </p>
          <h2
            id="measured-heading"
            className="section-h2 mt-3 text-[var(--text-primary)] text-balance"
          >
            <span className="block">{c.headlineLead}</span>
            <span className="block text-[var(--warm-coral)]">{c.headlineEmphasis}</span>
          </h2>
          <p className="mt-5 max-w-[64ch] text-base sm:text-lg leading-relaxed text-[var(--text-supporting)]">
            {c.sub}
          </p>
        </motion.div>

        {/* The ladder is the proof: each rung is a state the product actually
            tracks, and the last one is awarded by a person, never by Sundae. */}
        <div className="mt-12 sm:mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {c.ladderLabel}
          </p>
          <ol className="mt-5 flex flex-col">
            {c.rungs.map((r, i) => (
              <motion.li
                key={r.label}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.07 }}
                className="grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6 border-t border-[var(--border-default)] py-5"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-xs tabular-nums text-[var(--warm-coral)] pt-1"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)]">
                    {r.label}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[var(--text-muted)] max-w-[62ch]">
                    {r.note}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-10 max-w-[70ch] border-t border-[var(--border-default)] pt-6 text-sm sm:text-base leading-relaxed text-[var(--text-supporting)]"
        >
          {c.closer}
        </motion.p>
      </div>
    </section>
  );
}
