"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FadeUp } from "@/components/ui/PageAnimations";

/**
 * Section — What You Retire When You Adopt Sundae.
 *
 * Conversion job: make the BI-replacement positioning explicit.
 * Per brand voice: Sundae REPLACES the restaurant decision intelligence
 * layer — never complementary, never additive. This section converts
 * the implicit category claim into a side-by-side comparison.
 *
 * Tone: confident but face-saving — generic BI is great for analysts;
 * restaurants need restaurant-native.
 */

const todaysStack = [
  "Power BI / Tableau / Looker dashboards on POS exports",
  "Hand-built spreadsheets the team won't open",
  "Custom analyst queue for daily questions",
  "Six vendor portals open at once",
  "Weekly recap meetings instead of live action",
];

const withSundae = [
  "Six intelligence layers, restaurant-native",
  "179+ governed restaurant data models",
  "Source-cited answers in seconds",
  "12 data domains unified in one ledger",
  "Live shift intelligence, not Friday recaps",
];

export function SectionWhatYouRetire() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="retire-headline"
      className="relative py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.04),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <FadeUp className="text-center max-w-3xl mx-auto mb-14">
          <p className="eyebrow mb-4">WHAT YOU RETIRE</p>
          <h2 id="retire-headline" className="section-h2 text-balance mb-5">
            Replace the restaurant BI stack.
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Generic BI was built for analysts. Sundae was built for the people running restaurants.
          </p>
        </FadeUp>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {/* TODAY'S STACK — struck-through, dimmed */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-7 sm:p-8"
          >
            <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-5">
              Today&apos;s stack
            </div>
            <ul className="space-y-3.5">
              {todaysStack.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="inline-block w-1 h-1 rounded-full bg-[var(--text-faint)] flex-shrink-0 mt-2.5" />
                  <span className="text-[15px] text-[var(--text-muted)] line-through decoration-[var(--text-faint)] decoration-1 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Arrow column — desktop only */}
          <div className="hidden lg:flex items-center justify-center px-2">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1C47FF] to-[#3B82F6] flex items-center justify-center shadow-[0_0_30px_rgba(28,71,255,0.4)]"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m13 5 7 7-7 7" />
              </svg>
            </motion.div>
          </div>

          {/* WITH SUNDAE — alive, gradient accent */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-[var(--electric-blue)]/30 bg-gradient-to-br from-[var(--electric-blue)]/[0.10] to-[var(--electric-blue)]/[0.02] p-7 sm:p-8 shadow-[0_0_40px_rgba(28,71,255,0.10)]"
          >
            <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-5">
              With Sundae
            </div>
            <ul className="space-y-3.5">
              {withSundae.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-[#60A5FA] flex-shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span className="text-[15px] text-[var(--text-primary)] font-medium leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <p className="mt-12 sm:mt-14 text-center text-xl sm:text-2xl text-[var(--text-primary)] italic font-light max-w-2xl mx-auto">
          One platform. Restaurant-native from day one.
        </p>
      </div>
    </section>
  );
}
