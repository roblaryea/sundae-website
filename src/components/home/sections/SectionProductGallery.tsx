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
  | "tech"
  | "topology";

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

// Gallery references fresh screenshots captured 2026-06-01 directly from
// dev.sundaetech.ai (user 97 / org 33 "Demo Org" + org 7403 "Topology
// Group"), visually validated one-by-one before inclusion. Each item
// below shows a real Sundae surface with populated operator data
// (Amber Ash & Eatery, Palmstone Grillhouse, Amber Glow US, Mallow &
// Mint Cafe, plus MENA outlets for the topology cards).
//
// Cookie banner was pre-dismissed via localStorage init script so it
// doesn't appear in any capture.
const GALLERY: GalleryItem[] = [
  // ─── C-suite + Executive ──────────────────────────────────────
  {
    id: "insights-exec-summary",
    src: "/images/product/2026-fresh/insights-exec-summary.png",
    alt: "Executive Summary — KPIs, alerts, and health scores across every module",
    caption: "Executive Summary",
    whatYouSee:
      "Bird's-eye view: 78/100 avg health, 10 open alerts (7 high-severity), Revenue 93 / Labor 100 / Inventory 73 module scorecards. \"Most pressing: Food cost variance at 19.2% exceeds 5% critical threshold.\"",
    personas: ["c_suite"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "daily-insights",
    src: "/images/product/2026-fresh/daily-insights.png",
    alt: "Daily Insights — weather, competitor watch, and tomorrow's recommendation",
    caption: "Daily Insights",
    whatYouSee:
      "69.6°F partly cloudy — \"Dine-in risk: Low.\" Expected lunch traffic +5%, dinner +3%. Tomorrow's recommendation: \"Staff +1 FOH for lunch window.\" Competitor Watch ranks 4 nearby restaurants by rating.",
    personas: ["c_suite", "multi_loc"],
    productHref: "/core",
    productLabel: "Sundae Core →",
  },
  {
    id: "intelligence",
    src: "/images/product/2026-fresh/intelligence.png",
    alt: "Sundae Intelligence — conversational decision interface",
    caption: "Sundae Intelligence",
    whatYouSee:
      "AED 96,555 today's revenue, 379 orders, \"New York Strip (40 sold).\" Threads sidebar with Collections (Delivery, Menu, Revenue, Labor). Suggested: \"Banana Bread surged into top sellers yesterday — what's driving this?\"",
    personas: ["operations", "cfo", "c_suite"],
    productHref: "/intelligence",
    productLabel: "Sundae Intelligence →",
  },

  // ─── Pulse — Operations command ──────────────────────────────
  {
    id: "pulse-wallboard",
    src: "/images/product/2026-fresh/pulse-wallboard.png",
    alt: "Pulse Wallboard — live shift performance with target gap",
    caption: "Pulse — Live Wallboard",
    whatYouSee:
      "Mallow & Mint Cafe — Actual AED 10,300 vs Target AED 28,000. \"Need AED 9,133.21/hr to hit target.\" Gap to expected AED -14,060. 37% progress with outlet selector + Behind status indicator.",
    personas: ["operations", "multi_loc"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-leaderboard",
    src: "/images/product/2026-fresh/pulse-leaderboard.png",
    alt: "Pulse Leaderboard — multi-outlet portfolio comparison",
    caption: "Pulse — Portfolio Leaderboard",
    whatYouSee:
      "4 outlets ranked: Amber Ash & Eatery 🥇 AED 46,200 (231% vs target), Palmstone Grillhouse 🥈, Amber Glow US 🥉, Mallow & Mint Cafe (At Risk · 69% vs target). Avg vs Target 147% across the portfolio.",
    personas: ["operations", "multi_loc"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-coach",
    src: "/images/product/2026-fresh/pulse-coach.png",
    alt: "Pulse Coach — specific shift-level coaching with action items",
    caption: "Pulse — AI Coach",
    whatYouSee:
      "Shift Coach for Mallow & Mint Cafe. Today's Priorities (3): \"Sales Coaching · Team — Shift is behind pace, 1.9h remaining to close the gap.\" \"Leakage Coaching · James W. has a higher-than-average void count.\"",
    personas: ["operations"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-leakage",
    src: "/images/product/2026-fresh/pulse-leakage.png",
    alt: "Pulse Leakage — live voids, comps, and discount alerts",
    caption: "Pulse — Leakage Detection",
    whatYouSee:
      "Voids 5 (AED 500), Comps 4 (AED 500), Refunds 1 (AED 85). Active alerts: \"Elevated comp rate — Maria C. issued 4 comps in 3 hours, 2 flagged as policy violations. Immediate manager review required.\" + Review/Approval action buttons.",
    personas: ["cfo", "operations"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },

  // ─── Insights — Module depth ─────────────────────────────────
  {
    id: "insights-revenue",
    src: "/images/product/2026-fresh/insights-revenue.png",
    alt: "Revenue Intelligence — module with health score and KPIs",
    caption: "Insights — Revenue Intelligence",
    whatYouSee:
      "Module Health Score 93. NET REVENUE AED 4,018,134 (On Track, +0.5%), REVENUE GROWTH 1.3% (Critical), AVG CHECK AED 1,330, RevPASH AED 92.62, TOTAL COVERS 43,489. Six sub-tabs: Sales, Menu & Mix, Daypart, Servers, Channels, Alerts.",
    personas: ["cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "insights-labor",
    src: "/images/product/2026-fresh/insights-labor.png",
    alt: "Labor Intelligence — workforce cost + productivity analytics",
    caption: "Insights — Labor Intelligence",
    whatYouSee:
      "Module Health Score 100. LABOR COST % 25.3% (On Track), SPLH AED 713.14 (+2.5%), OVERTIME 2.0%, SCHED VARIANCE 2.7%, REV/LABOR AED 26.06, UTILIZATION 100%. Sparklines under each KPI + 9 sub-tabs including Workforce Health and No-Show Benchmark.",
    personas: ["cfo", "operations"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "insights-profit",
    src: "/images/product/2026-fresh/insights-profit.png",
    alt: "Profit Intelligence — P&L analysis with cost waterfall",
    caption: "Insights — Profit Intelligence",
    whatYouSee:
      "Module Health 83. PRIME COST 66.9% (Critical — exceeds 70% threshold), NET PROFIT MARGIN 23.1%, BREAK-EVEN RATIO 76.9%. P&L Summary + Cost Waterfall: REVENUE AED 2,617,798 → TOTAL COSTS AED 2,058,961 → NET PROFIT AED 558,837.",
    personas: ["cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "insights-marketing",
    src: "/images/product/2026-fresh/insights-marketing.png",
    alt: "Marketing Intelligence — ROAS, CAC, and channel performance",
    caption: "Insights — Marketing Performance",
    whatYouSee:
      "Module Health 52. ROAS 1.2x (Critical — below 2x threshold), CAC AED 23,312 (Critical), LTV:CAC 0.7x (Critical), CONVERSION 7.1% (On Track), TOTAL SPEND AED 495,665. Six sub-tabs: Channels, Customers, Campaigns, Alerts.",
    personas: ["marketing", "cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },

  // ─── Foresight — Predictive intelligence ─────────────────────
  {
    id: "foresight-scenarios",
    src: "/images/product/2026-fresh/foresight-scenarios.png",
    alt: "Foresight Scenarios — scenario library with quick-start templates",
    caption: "Foresight — Scenarios",
    whatYouSee:
      "5 scenarios saved, 10 pre-built templates: 5% Price Increase, 10% Labor Reduction, Supplier Cost Increase (+8%), Marketing Campaign Push, Peak Season Surge, Off-Peak Dip, Delivery Channel Expansion, Capacity Expansion, Worst Case. Sidebar: PREDICT / MODEL / TRUST / DECIDE.",
    personas: ["cfo", "c_suite"],
    productHref: "/product/foresight",
    productLabel: "Foresight →",
  },
  {
    id: "foresight-modeler",
    src: "/images/product/2026-fresh/foresight-modeler.png",
    alt: "Foresight Modeler — restaurant P&L modelling with elasticity",
    caption: "Foresight — P&L Modeler",
    whatYouSee:
      "Restaurant P&L Modeler · 30d horizon · 75% AI. SCENARIO REVENUE AED 546,699, OPERATING PROFIT -AED 38,816, OPERATING MARGIN -7.1%. Elasticity ON, P&L Statement with Dine-In Revenue AED 405,453, Delivery AED 129,557. \"Connected inventory data is informing this starting point.\"",
    personas: ["cfo"],
    productHref: "/product/foresight",
    productLabel: "Foresight →",
  },
  {
    id: "intelligence-simulator",
    src: "/images/product/2026-fresh/intelligence-simulator.png",
    alt: "Intelligence Simulator — what-if scenario cascade",
    caption: "Intelligence — Scenario Simulator",
    whatYouSee:
      "Baseline vs Scenario cascade: 1,200 Covers @ $65 → Revenue $78,000 → Food Cost $23,400 (30%) → Labor cost $7,560 (9.7%) → EBITDA $25,040 (32.1% margin). Sliders for each driver + sensitivity analysis below.",
    personas: ["cfo", "operations"],
    productHref: "/intelligence",
    productLabel: "Sundae Intelligence →",
  },

  // ─── Topology-aware (multi-brand / multi-region moat) ───────
  {
    id: "topology-franchise-health",
    src: "/images/product/2026-fresh/topology-franchise-health.png",
    alt: "Franchise Health — 4 outlets across MENA cities",
    caption: "Topology — Franchise Health",
    whatYouSee:
      "Per-unit composite health (0–100) across 4 MENA outlets — Abu Dhabi Mall, Dubai Marina, Cairo Festival, Riyadh Park. TOTAL MONTHLY REVENUE AED 407,656 with Risk Matrix + By Region + Metrics Table views. \"Scope: All locations\" topology selector active.",
    personas: ["topology", "multi_loc", "c_suite"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "topology-outlet-viability",
    src: "/images/product/2026-fresh/topology-outlet-viability.png",
    alt: "Outlet Viability — new-outlet NPV + break-even modeller",
    caption: "Topology — Outlet Viability",
    whatYouSee:
      "Project a new outlet's break-even, NPV, and 12-month P&L. BREAK-EVEN: Not in 12mo. 12-MO NPV: AED -668,843. YEAR-END P&L: AED -652,500. Sliders for capex, rent, food cost%, labor%, overhead, ramp. \"Pull cost levers down or recapitalise the build before signing the lease.\"",
    personas: ["topology", "cfo", "c_suite"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "topology-org-tree",
    src: "/images/product/2026-fresh/topology-org-tree.png",
    alt: "Crew Organization Tree — 75-node reporting structure",
    caption: "Topology — Organization Tree",
    whatYouSee:
      "75 nodes mapped into the org. Max Depth, Orphan Nodes detection, Last Synced 0s ago. Photo Cards view with org card + member tree (Omar Hassan / Yara Hassan visible). Tabs: Workforce Health, Classic, Statistics.",
    personas: ["topology", "hr"],
    productHref: "/crew",
    productLabel: "Sundae Crew →",
  },

  // ─── Crew — Multi-region payroll + HR ───────────────────────
  {
    id: "crew-payroll",
    src: "/images/product/2026-fresh/crew-payroll.png",
    alt: "Crew Payroll — country-pack control center",
    caption: "Crew — Multi-region Payroll",
    whatYouSee:
      "36 country packs (27 EU, 6 GCC, 3 NA). Country coverage matrix shows UAE, Saudi Arabia, Qatar, Bahrain, Oman all \"Ready\" with rules / WPS exports / setup data columns. Run readiness gate checklist + approval and audit trail panel.",
    personas: ["hr", "cfo"],
    productHref: "/crew",
    productLabel: "Sundae Crew →",
  },
  {
    id: "crew-people",
    src: "/images/product/2026-fresh/crew-people.png",
    alt: "Crew People — 122-employee HR management",
    caption: "Crew — People",
    whatYouSee:
      "122 active headcount, 0 onboarding in progress. Filter by department / role / state / outlet. Employee table: Mateo Rivera (Cleaning), Noura Saleh (Operations Manager), Khalid Mansour (Operations Manager), Fatima Qureshi (Kitchen), etc. — with role / department / outlet / manager columns.",
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
  { id: "topology",   label: "Topology-aware" },
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
