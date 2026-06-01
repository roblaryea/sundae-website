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

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
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

// Gallery references fresh screenshots captured directly from
// dev.sundaetech.ai (org 33, user 97) on 2026-06-01. These reflect the
// current production UI/UX, not the older mockups previously in
// public/images/product/. Each item below is a real Sundae surface
// with seeded fictitious operator data ("Demo Org", Amber Glow US,
// Palmstone Grillhouse, etc.).
const GALLERY: GalleryItem[] = [
  {
    id: "core-overview",
    src: "/images/product/2026-fresh/core-overview.png",
    alt: "Sundae Core — operator landing surface with morning brief",
    caption: "Sundae Core — Overview",
    whatYouSee:
      "Operator landing surface: active outlets, exceptions, data health, integrations, Watchtower signals, open tickets — plus a personalised morning brief.",
    personas: ["c_suite", "multi_loc", "operations"],
    productHref: "/core",
    productLabel: "Sundae Core →",
  },
  {
    id: "daily-insights",
    src: "/images/product/2026-fresh/daily-insights.png",
    alt: "Daily Insights — what-changed surface",
    caption: "Daily Insights — Morning Brief",
    whatYouSee:
      "AI-generated daily brief: yesterday's performance, today's risks, this week's priorities. One page for the executive office.",
    personas: ["c_suite", "multi_loc"],
    productHref: "/core",
    productLabel: "Sundae Core →",
  },
  {
    id: "pulse-wallboard",
    src: "/images/product/2026-fresh/pulse-wallboard.png",
    alt: "Pulse — live shift wallboard",
    caption: "Pulse — Live Wallboard",
    whatYouSee:
      "Real-time revenue pacing, labor %, and exception flags across every outlet on a single shift-floor display.",
    personas: ["operations", "multi_loc"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-coach",
    src: "/images/product/2026-fresh/pulse-coach.png",
    alt: "Pulse Coach — shift coaching nudges",
    caption: "Pulse — AI Coach",
    whatYouSee:
      "Specific shift-level coaching nudges generated from server + cover performance signals — not generic dashboards.",
    personas: ["operations"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-leakage",
    src: "/images/product/2026-fresh/pulse-leakage.png",
    alt: "Pulse Leakage — voids, comps, discount audit",
    caption: "Pulse — Leakage Detection",
    whatYouSee:
      "Voids, comps, discounts, and overrides surfaced as leak vectors with dollar impact and corrective action.",
    personas: ["cfo", "operations"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-leaderboard",
    src: "/images/product/2026-fresh/pulse-leaderboard.png",
    alt: "Pulse Leaderboard — server performance ranking",
    caption: "Pulse — Server Leaderboard",
    whatYouSee:
      "Server-level performance ranked by sales, upsell %, and avg check. Coaching gets specific and actionable.",
    personas: ["operations"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "insights-hub",
    src: "/images/product/2026-fresh/insights-hub.png",
    alt: "Sundae Insights — 12 module hub",
    caption: "Insights — Module Hub",
    whatYouSee:
      "Twelve enabled intelligence modules: Revenue, Labor, Inventory, Purchasing, Marketing, Reservations, Profit, Revenue Assurance, Delivery, Cross-Intelligence — plus Executive Summary and Performance Report.",
    personas: ["c_suite", "cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "insights-cross",
    src: "/images/product/2026-fresh/insights-cross.png",
    alt: "Cross-Intelligence — multi-module correlation engine",
    caption: "Insights — Cross-Intelligence",
    whatYouSee:
      "Cross-module correlation engine — impact timelines, attribution waterfalls, and cannibalization detection across every Insights module.",
    personas: ["c_suite", "cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "insights-exec-summary",
    src: "/images/product/2026-fresh/insights-exec-summary.png",
    alt: "Executive Summary — bird's-eye KPI surface",
    caption: "Insights — Executive Summary",
    whatYouSee:
      "Bird's-eye view of KPIs, health scores, and alerts across every intelligence module. The C-suite's one-page read.",
    personas: ["c_suite"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "benchmark-overview",
    src: "/images/product/2026-fresh/benchmark-overview.png",
    alt: "Sundae Benchmark — peer cohort overview",
    caption: "Benchmark — Peer Coverage",
    whatYouSee:
      "Anonymous peer benchmarks across 30+ metrics. Know exactly where you stand against operators of your size and segment.",
    personas: ["c_suite", "multi_loc"],
    productHref: "/benchmarking",
    productLabel: "Benchmark →",
  },
  {
    id: "watchtower-competitive",
    src: "/images/product/2026-fresh/watchtower-competitive.png",
    alt: "Watchtower — competitive intelligence surface",
    caption: "Watchtower — Competitive Intelligence",
    whatYouSee:
      "Competitor pricing, menu changes, promotional moves, and market positioning — surfaced before they hit your numbers.",
    personas: ["marketing", "c_suite"],
    productHref: "/product/watchtower",
    productLabel: "Watchtower →",
  },
  {
    id: "foresight",
    src: "/images/product/2026-fresh/foresight.png",
    alt: "Foresight Intelligence — forecasting + scenario modelling",
    caption: "Foresight — Forecasting + Scenarios",
    whatYouSee:
      "Integrated forecasting, scenario simulation, and predictive intelligence. Pick an outlet, run planning intake, generate briefings — the calm forecast layer for what-if modelling and exec sign-off.",
    personas: ["cfo", "c_suite"],
    productHref: "/product/foresight",
    productLabel: "Foresight →",
  },
  {
    id: "intelligence",
    src: "/images/product/2026-fresh/intelligence.png",
    alt: "Sundae Intelligence — conversational decision intelligence",
    caption: "Sundae Intelligence",
    whatYouSee:
      "AI-powered decision intelligence with conversation threads, suggested questions, and source-cited answers. Replaces the spreadsheet-pull → analyst → answer loop.",
    personas: ["operations", "cfo", "c_suite"],
    productHref: "/intelligence",
    productLabel: "Sundae Intelligence →",
  },
  {
    id: "intelligence-simulator",
    src: "/images/product/2026-fresh/intelligence-simulator.png",
    alt: "Sundae Intelligence Simulator — scenario what-if",
    caption: "Intelligence — Scenario Simulator",
    whatYouSee:
      "What-if simulation surface for menu, pricing, staffing, and promo decisions — model the impact before you commit.",
    personas: ["cfo", "operations"],
    productHref: "/intelligence",
    productLabel: "Sundae Intelligence →",
  },
  {
    id: "crew-scheduling",
    src: "/images/product/2026-fresh/crew-scheduling.png",
    alt: "Crew — workforce scheduling surface",
    caption: "Crew — Scheduling",
    whatYouSee:
      "Depth-5 scheduling reference: four view modes, eligibility-checked assignment, AI Builder Sheet, headcount chart, marketplace + swap workflows.",
    personas: ["operations", "hr"],
    productHref: "/crew",
    productLabel: "Sundae Crew →",
  },
  {
    id: "crew-people",
    src: "/images/product/2026-fresh/crew-people.png",
    alt: "Crew — HR records + people management",
    caption: "Crew — People",
    whatYouSee:
      "HR records, credentials, certifications, and assets in one place. The people-side of the workforce operational suite.",
    personas: ["hr"],
    productHref: "/crew",
    productLabel: "Sundae Crew →",
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activePersona === "all") return GALLERY;
    return GALLERY.filter((item) => item.personas.includes(activePersona));
  }, [activePersona]);

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, filtered.length]);

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
                {/* Image — click to open lightbox */}
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="relative aspect-[16/10] bg-black overflow-hidden w-full block cursor-zoom-in"
                  aria-label={`Open ${item.caption} at full size`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)] via-transparent to-transparent opacity-60" />
                  {/* Zoom indicator overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-[var(--electric-blue)] text-white rounded-full p-3 shadow-2xl">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </button>

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
          Screenshots represent live in-product surfaces. Click any image to enlarge.
          Synthetic data shown for illustration. Take the{" "}
          <Link href="/diagnostic" className="text-[var(--electric-blue)] hover:underline font-semibold not-italic">
            Operations Diagnostic
          </Link>{" "}
          to see what your view would look like.
        </p>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Prev / Next */}
            {filtered.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
                  }}
                  className="absolute left-4 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
                  }}
                  className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}

            {/* Image + caption */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-6xl w-full max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1 min-h-0 bg-black rounded-xl overflow-hidden">
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  width={1600}
                  height={1000}
                  className="w-full h-auto max-h-[80vh] object-contain"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-white mb-1">{lightboxItem.caption}</h3>
                <p className="text-sm text-white/70 max-w-2xl mx-auto">{lightboxItem.whatYouSee}</p>
                {lightboxIndex !== null && (
                  <p className="text-[10px] text-white/40 mt-3 uppercase tracking-wider">
                    {lightboxIndex + 1} / {filtered.length} · Esc to close · ← → to navigate
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
