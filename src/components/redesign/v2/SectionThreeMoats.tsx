"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Section 5 — The Three Moats (homepage-spec-v1.1).
 *
 * Conversion job: explain product. Reframe "Sundae has lots of features" into
 * "Sundae has a few defensible moats." Cards stagger-fade on scroll-into-view.
 *
 * SAFE FALLBACK: per user direction, this build uses generic BI language and
 * does NOT name Power BI / Tableau (CLM-203 awaiting Legal review). When
 * Legal approves, restore the named-vendor sentence in the subhead.
 *
 * Claims used:
 *   CLM-204 (eyebrow — generic BI) APPROVED PUBLIC
 *   CLM-205 (headline) APPROVED PUBLIC
 *   CLM-103 (Pulse domain language) APPROVED PUBLIC
 *   CLM-104 (Watchtower capabilities) APPROVED PUBLIC
 *   CLM-206 (market-wide BI vendor claim) NEEDS VALIDATION — omitted
 *   CLM-207 (Moat #3 — cold-start framing) APPROVED PUBLIC
 *   CLM-208 (closing line — category difference) APPROVED PUBLIC
 *
 * Excluded (awaiting Legal):
 *   CLM-203 (Power BI + Tableau steel-man sentence)
 *   CLM-206 (most BI vendors are not built to solve)
 */

const moats = [
  {
    badge: "Pulse",
    badgeColor: "var(--color-pulse)",
    title: "Live operations",
    why: 'Restaurant-shift-aware logic. Live Core refresh. Speaks "covers, voids, comps, walks" — not generic transaction data.',
  },
  {
    badge: "Watchtower",
    badgeColor: "var(--color-watchtower)",
    title: "External market intelligence",
    why: "Weather impact, local events, competitor pricing, daily AI briefings. Not a dashboard problem alone — it takes data partnerships, restaurant-domain modeling, and operating workflow.",
  },
  {
    badge: "Benchmarks",
    badgeColor: "var(--color-benchmarks)",
    title: "Anonymized peer network",
    why: "Anonymized peer comparisons across operators on the platform. Hard to recreate from a cold start: the comparison engine compounds with every restaurant that joins.",
  },
];

export function SectionThreeMoats() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="moats-headline" className="relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
          <div className="eyebrow mb-4">
            WHAT GENERIC BI TOOLS STRUGGLE TO RETROFIT
          </div>
          <h2 id="moats-headline" className="section-h2 text-balance mb-5">
            Three moats dashboards alone don&apos;t solve.
          </h2>
          <p className="body-lg max-w-2xl mx-auto">
            Generic BI tools are excellent at building dashboards. They were
            not built to run restaurant shifts. Sundae was — and these three
            layers are hard to retrofit because they combine data, workflow,
            and network depth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {moats.map((m, i) => (
            <motion.article
              key={m.badge}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.1,
              }}
              className="group rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-7 hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className="text-[10px] uppercase tracking-wider font-bold mb-3 inline-flex px-2.5 py-1 rounded-md"
                style={{
                  backgroundColor: `color-mix(in oklab, ${m.badgeColor} 18%, transparent)`,
                  color: m.badgeColor,
                }}
              >
                Moat #{i + 1} — {m.badge}
              </div>
              <h3 className="section-h3 mb-3">{m.title}</h3>
              <p className="body-base">{m.why}</p>
            </motion.article>
          ))}
        </div>

        <p className="mt-12 sm:mt-14 text-center text-lg sm:text-xl text-[var(--text-secondary)] italic">
          That&apos;s not a feature gap. That&apos;s a category difference.
        </p>
      </div>
    </section>
  );
}
