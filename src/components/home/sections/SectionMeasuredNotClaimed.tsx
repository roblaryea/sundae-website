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
    headlineLead: "Spotting the loss is the easy part.",
    headlineEmphasis: "Getting the money back is the job.",
    sub: "Most tools stop at the alert. Sundae opens the records behind it, names the item that is costing you, hands the job to one person, and writes down the number to beat before they start.",
    ladderLabel: "How much you can trust a number",
    rungs: [
      { label: "Measuring", note: "Work has started. We noted where the number was, so there is something to compare against." },
      { label: "Directional", note: "The number moved. We can show by how much - but we will not yet say the work caused it." },
      { label: "Operator confirmed", note: "The person who did the work says it worked." },
      { label: "Independently verified", note: "Someone else checked it against the evidence and agreed." },
    ],
    closer: "Sundae will not call money recovered until it is measured, or verified until someone else has checked it. Where the data cannot tell, it says so.",
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
          <p className="eyebrow">
            {c.eyebrow}
          </p>
          <h2
            id="measured-heading"
            className="section-h2 mt-3 text-[var(--text-primary)] text-balance"
          >
            <span className="block">{c.headlineLead}</span>
            <span className="block text-[var(--text-display)]">{c.headlineEmphasis}</span>
          </h2>
          <p className="mt-5 max-w-[64ch] text-base sm:text-lg leading-relaxed text-[var(--text-supporting)]">
            {c.sub}
          </p>
        </motion.div>

        {/* The ladder is the proof: each rung is a state the product actually
            tracks, and the last two are awarded by a person, never by Sundae.
            Rendered as an ascending ladder rather than a list, because the
            content is a progression of confidence - the shape should carry
            that, not just the words. Strength is derived from the rung index,
            so no new copy keys and all 22 locales get it for free. */}
        <div className="mt-12 sm:mt-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            {c.ladderLabel}
          </p>

          <ol className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-4">

            {c.rungs.map((r, i) => {
              const strength = i + 1;
              const attested = i >= 2; // confirmed / verified are human-awarded
              return (
                <motion.li
                  key={r.label}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.08 }}
                  className={[
                    "relative flex gap-4 rounded-2xl border p-5 md:flex-col md:gap-4",
                    attested
                      ? "border-[var(--trust-border)] bg-[var(--trust-bg)]"
                      : "border-[var(--border-default)] bg-[var(--surface-subtle)]",
                  ].join(" ")}
                >
                  {i < c.rungs.length - 1 && (
                    <span
                      aria-hidden
                      className={[
                        "absolute bg-[var(--border-default)]",
                        // sits in the gap, aligned to the centre of the discs
                        "left-10 -bottom-4 h-4 w-px sm:-bottom-5 sm:h-5",
                        "md:left-auto md:bottom-auto md:top-10 md:-right-5 md:h-px md:w-5",
                      ].join(" ")}
                    />
                  )}

                  <span
                    aria-hidden
                    className={[
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border text-sm font-semibold tabular-nums",
                      attested
                        ? "border-[var(--trust)] bg-[var(--trust)] text-[var(--ink)]"
                        : "border-[var(--border-default)] bg-[var(--surface-faint)] text-[var(--text-muted)]",
                    ].join(" ")}
                  >
                    {strength}
                  </span>

                  <div className="min-w-0">
                    {/* Confidence meter - four segments, filled to this rung. */}
                    <span aria-hidden className="mb-3 flex gap-1">
                      {[0, 1, 2, 3].map((seg) => (
                        <span
                          key={seg}
                          className={[
                            "h-1 w-5 rounded-full",
                            seg < strength
                              ? attested
                                ? "bg-[var(--trust)]"
                                : "bg-[var(--text-muted)]"
                              : "bg-[var(--border-default)]",
                          ].join(" ")}
                        />
                      ))}
                    </span>
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      {r.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                      {r.note}
                    </p>
                  </div>
                </motion.li>
              );
            })}
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
