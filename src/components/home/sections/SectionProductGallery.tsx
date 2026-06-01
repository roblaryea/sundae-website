"use client";

/**
 * Product gallery section — addresses the "show me the product" critique
 * from external reviewers. Surfaces 12 curated screenshots from the live
 * Sundae app, tagged by persona, deep-linked to the relevant product page.
 *
 * Layout:
 *   • Persona filter chips at top (All / Operations / C-Suite / CFO /
 *     Multi-location / HR / Marketing)
 *   • Responsive grid of screenshot cards
 *   • Each card: screenshot + persona tag + what-you-see caption +
 *     deep link to relevant product page
 *
 * All assets already exist in /public/images/product/ — no new
 * captures needed for v1. Future passes can swap in higher-resolution
 * captures or persona-specific synthetic-data variants.
 */

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FadeUp } from "@/components/ui/PageAnimations";

type Persona =
  | "operations"
  | "c_suite"
  | "cfo"
  | "multi_loc"
  | "hr"
  | "marketing"
  | "tech";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  whatYouSee: string;
  personas: Persona[];
  productHref: string;
  productLabel: string;
};

const GALLERY: GalleryItem[] = [
  {
    id: "pulse-wallboard",
    src: "/images/product/pulse-wallboard.png",
    alt: "Pulse wallboard — live shift performance display",
    caption: "Pulse — Live Wallboard",
    whatYouSee:
      "Live revenue pacing, labor %, and exception flags across every outlet on a single shift-floor display.",
    personas: ["operations", "multi_loc"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-coach",
    src: "/images/product/pulse_coach.png",
    alt: "Pulse Coach — AI shift coaching surface",
    caption: "Pulse — AI Coach",
    whatYouSee:
      "Specific shift-level coaching nudges generated from server-level performance signals — not generic dashboards.",
    personas: ["operations"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-leakage",
    src: "/images/product/pulse-leakage.png",
    alt: "Pulse leakage detection — margin leak surface",
    caption: "Pulse — Leakage Detection",
    whatYouSee:
      "Voids, comps, discounts, and overrides surfaced as leak vectors with dollar impact and corrective action.",
    personas: ["cfo", "operations"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "core-overview",
    src: "/images/product/core-overview.png",
    alt: "Sundae Core — overview dashboard",
    caption: "Sundae Core — Overview",
    whatYouSee:
      "The unified operator dashboard. Performance, operations, and competitive intelligence in one view.",
    personas: ["c_suite", "multi_loc"],
    productHref: "/core",
    productLabel: "Sundae Core →",
  },
  {
    id: "core-insights-hub",
    src: "/images/product/core-insights-hub.png",
    alt: "Sundae Insights — 12-module intelligence hub",
    caption: "Insights — Module Hub",
    whatYouSee:
      "12 deep analytics modules + 6 cross-cutting views — revenue, labor, inventory, marketing, profitability, and more.",
    personas: ["c_suite", "cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "benchmark-overview",
    src: "/images/product/benchmark-overview.png",
    alt: "Sundae Benchmark — peer benchmarking",
    caption: "Benchmark — Peer Coverage",
    whatYouSee:
      "Anonymous peer benchmarks across 30+ metrics. Know where you stand against your real cohort.",
    personas: ["c_suite", "multi_loc"],
    productHref: "/benchmarking",
    productLabel: "Benchmark →",
  },
  {
    id: "benchmark-forecast",
    src: "/images/product/benchmark-forecast.png",
    alt: "Foresight forecasting — 14-90 day projection",
    caption: "Foresight — Forecasting",
    whatYouSee:
      "14–90 day forecasts per outlet with confidence bands, scenario modeling, and what-if simulation.",
    personas: ["cfo", "c_suite"],
    productHref: "/product/foresight",
    productLabel: "Foresight →",
  },
  {
    id: "watchtower",
    src: "/images/product/watchtower.png",
    alt: "Watchtower — market intelligence surface",
    caption: "Watchtower — Market Signal",
    whatYouSee:
      "Competitor pricing, weather, events, and market trends — before they hit your numbers.",
    personas: ["marketing", "c_suite"],
    productHref: "/product/watchtower",
    productLabel: "Watchtower →",
  },
  {
    id: "chat-with-data",
    src: "/images/product/chat-with-data.png",
    alt: "Sundae Intelligence — natural language to SQL",
    caption: "Sundae Intelligence",
    whatYouSee:
      "Ask your data anything. Source-cited answers in seconds — replaces the spreadsheet-pull → analyst → answer loop.",
    personas: ["operations", "cfo", "c_suite"],
    productHref: "/intelligence",
    productLabel: "Sundae Intelligence →",
  },
  {
    id: "daily-insights",
    src: "/images/product/daily-insights.png",
    alt: "Daily Insights — morning brief surface",
    caption: "Daily Insights — Morning Brief",
    whatYouSee:
      "AI-generated morning brief: yesterday's performance, today's risks, this week's priorities. One page.",
    personas: ["c_suite", "multi_loc"],
    productHref: "/core",
    productLabel: "Sundae Core →",
  },
  {
    id: "crew-people",
    src: "/images/product/crew-people.png",
    alt: "Crew — people management surface",
    caption: "Crew — People",
    whatYouSee:
      "HR records, credentials, certifications, and assets in one place. Sub-page of the workforce operational suite.",
    personas: ["hr"],
    productHref: "/crew",
    productLabel: "Sundae Crew →",
  },
  {
    id: "pulse-leaderboard",
    src: "/images/product/pulse-leaderboard.png",
    alt: "Pulse leaderboard — server performance ranking",
    caption: "Pulse — Server Leaderboard",
    whatYouSee:
      "Server-level performance ranked by sales, upsell %, and avg check. Coaching gets specific and actionable.",
    personas: ["operations"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
];

const PERSONA_FILTERS: { id: Persona | "all"; label: string }[] = [
  { id: "all",        label: "All views" },
  { id: "operations", label: "Operations" },
  { id: "c_suite",    label: "C-Suite" },
  { id: "cfo",        label: "Finance" },
  { id: "multi_loc",  label: "Multi-location" },
  { id: "hr",         label: "HR" },
  { id: "marketing",  label: "Marketing" },
];

export function SectionProductGallery() {
  const [activePersona, setActivePersona] = useState<Persona | "all">("all");

  const filtered = useMemo(() => {
    if (activePersona === "all") return GALLERY;
    return GALLERY.filter((item) => item.personas.includes(activePersona));
  }, [activePersona]);

  return (
    <section
      aria-labelledby="product-gallery-headline"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-y border-[var(--border-default)] bg-[var(--surface-faint)]"
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-10">
          <p className="eyebrow mb-3">SEE THE PRODUCT</p>
          <h2
            id="product-gallery-headline"
            className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] text-balance mb-3"
          >
            This is what your team actually sees.
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
            Filter by who&rsquo;s logging in. Every surface deep-links to the
            relevant product page so you can dig in.
          </p>
        </FadeUp>

        {/* Persona filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PERSONA_FILTERS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActivePersona(p.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activePersona === p.id
                  ? "bg-[var(--electric-blue)] text-white"
                  : "bg-white/[0.04] text-[var(--text-secondary)] border border-[var(--border-default)] hover:border-[var(--electric-blue)]/40"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePersona}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="group rounded-2xl border border-[var(--border-default)] bg-[var(--navy-deep)] overflow-hidden hover:border-[var(--electric-blue)]/40 transition-colors"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] bg-black overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-transparent to-transparent opacity-60" />
                </div>

                {/* Caption */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold text-[var(--text-primary)]">
                      {item.caption}
                    </h3>
                    <div className="flex gap-1">
                      {item.personas.slice(0, 2).map((p) => (
                        <span
                          key={p}
                          className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[var(--electric-blue)]/15 text-[var(--electric-blue)] border border-[var(--electric-blue)]/30 font-bold"
                        >
                          {PERSONA_FILTERS.find((f) => f.id === p)?.label ?? p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-supporting)] leading-relaxed mb-3 min-h-[3em]">
                    {item.whatYouSee}
                  </p>
                  <Link
                    href={item.productHref}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--electric-blue)] hover:underline"
                  >
                    {item.productLabel}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <p className="text-center text-xs text-[var(--text-muted)] mt-10 italic max-w-2xl mx-auto">
          Screenshots represent live in-product surfaces. Synthetic data shown
          for illustration. Take the{" "}
          <Link href="/diagnostic" className="text-[var(--electric-blue)] hover:underline font-semibold not-italic">
            Operations Diagnostic
          </Link>{" "}
          to see what your view would look like.
        </p>
      </div>
    </section>
  );
}
