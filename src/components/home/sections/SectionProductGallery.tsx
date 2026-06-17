"use client";

/**
 * Product gallery section - addresses the "show me the product" critique
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
 * All assets already exist in /public/images/product/ - no new
 * captures needed for v1. Future passes can swap in higher-resolution
 * captures or persona-specific synthetic-data variants.
 */

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeUp } from "@/components/ui/PageAnimations";
import { ThemedShot } from "@/components/ui/ThemedShot";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getGeneratedLocalCopy } from "@/lib/generatedLocalCopy";
import { generatedLocalCopy } from "@/generated-locales/components_home_sections_SectionProductGallery";

// Cards whose dark twin can't be captured cleanly fall back to the light shot
// in both themes: the Watchtower detail subroutes render an empty shell
// standalone, and the Wallboard sits behind a "launch mode" gate.
const NO_DARK_TWIN = new Set([
  "watchtower-competitor-intel",
  "watchtower-market-trends",
  "pulse-wallboard",
]);

/** Resolve the dark-theme twin for a gallery src, or fall back to light. */
function darkTwin(src: string): string {
  const base = src.replace(/^.*\//, "").replace(/\.png$/, "");
  return NO_DARK_TWIN.has(base) ? src : src.replace(/\.png$/, "-dark.png");
}

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
    alt: "Executive Summary - KPIs, alerts, and health scores across every module",
    caption: "Executive Summary",
    whatYouSee:
      "One health score across every module - revenue, labor, inventory - surfaces the single thing that needs you today, here a food-cost variance running well above where it should be, so nothing important hides in a report until it's too late.",
    personas: ["c_suite"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "daily-insights",
    src: "/images/product/2026-fresh/daily-insights.png",
    alt: "Daily Insights - weather, competitor watch, and tomorrow's recommendation",
    caption: "Daily Insights",
    whatYouSee:
      "Tomorrow read before it happens - weather, expected lunch and dinner traffic, and nearby competitor activity all fold into one clear recommendation, like staffing an extra front-of-house hand for the lunch window, so you plan the day instead of reacting to it.",
    personas: ["c_suite", "multi_loc"],
    productHref: "/core",
    productLabel: "Sundae Core →",
  },
  {
    id: "intelligence",
    src: "/images/product/2026-fresh/intelligence.png",
    alt: "Sundae Intelligence - conversational decision interface",
    caption: "Sundae Intelligence",
    whatYouSee:
      "Ask your data in plain language and get an answer grounded in tonight's real numbers - AED 96,555 in revenue across 379 orders, your top sellers, and a suggested follow-up when something like Banana Bread suddenly climbs the menu. Threads and collections keep every line of questioning where you left it.",
    personas: ["operations", "cfo", "c_suite"],
    productHref: "/intelligence",
    productLabel: "Sundae Intelligence →",
  },

  // ─── Pulse - Operations command ──────────────────────────────
  {
    id: "pulse-wallboard",
    src: "/images/product/2026-fresh/pulse-wallboard.png",
    alt: "Pulse Wallboard - live shift performance with target gap",
    caption: "Pulse - Live Wallboard",
    whatYouSee:
      "The live shift, in one glance - actual sales against target for Mallow & Mint Cafe, with the exact hourly pace it takes to close the gap before service ends. The manager knows where the day stands while there's still time to act on it.",
    personas: ["operations", "multi_loc"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-leaderboard",
    src: "/images/product/2026-fresh/pulse-leaderboard.png",
    alt: "Pulse Leaderboard - multi-outlet portfolio comparison",
    caption: "Pulse - Portfolio Leaderboard",
    whatYouSee:
      "Every outlet ranked against its own target on one board - Amber Ash & Eatery leading at 231%, the portfolio averaging 147% - so you see in seconds which locations are carrying the week and which one needs your attention next.",
    personas: ["operations", "multi_loc"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-coach",
    src: "/images/product/2026-fresh/pulse-coach.png",
    alt: "Pulse Coach - specific shift-level coaching with action items",
    caption: "Pulse - AI Coach",
    whatYouSee:
      "The shift turned into a short, ranked list of what to do right now - where to push sales with hours still on the clock, and which server to quietly check in with on voids - so coaching is specific and timely instead of a debrief after the day is already lost.",
    personas: ["operations"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },
  {
    id: "pulse-leakage",
    src: "/images/product/2026-fresh/pulse-leakage.png",
    alt: "Pulse Leakage - live voids, comps, and discount alerts",
    caption: "Pulse - Leakage Detection",
    whatYouSee:
      "Every void, comp, and refund as it happens, with the unusual ones surfaced by server - here a run of comps worth a closer look - and review and approval controls right beside them, so margin that quietly leaks at the till gets caught the same shift, not at month-end.",
    personas: ["cfo", "operations"],
    productHref: "/product/pulse",
    productLabel: "Pulse →",
  },

  // ─── Insights - Module depth ─────────────────────────────────
  {
    id: "insights-revenue",
    src: "/images/product/2026-fresh/insights-revenue.png",
    alt: "Revenue Intelligence - module with health score and KPIs",
    caption: "Insights - Revenue Intelligence",
    whatYouSee:
      "Your revenue picture on one screen - net revenue, average check, RevPASH and covers, scored into a single health number - then drill straight into sales, menu mix, daypart, servers, or channels to see exactly where the growth is coming from.",
    personas: ["cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "insights-labor",
    src: "/images/product/2026-fresh/insights-labor.png",
    alt: "Labor Intelligence - workforce cost + productivity analytics",
    caption: "Insights - Labor Intelligence",
    whatYouSee:
      "The whole labor story in one place - cost percentage, sales per labor hour, overtime, schedule variance and utilization, each with its own trend - extending all the way into workforce health and a no-show benchmark, so you manage the team by signal rather than gut feel.",
    personas: ["cfo", "operations"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "insights-profit",
    src: "/images/product/2026-fresh/insights-profit.png",
    alt: "Profit Intelligence - P&L analysis with cost waterfall",
    caption: "Insights - Profit Intelligence",
    whatYouSee:
      "A full P&L read at a glance - prime cost, net margin and break-even ratio - with a cost waterfall that walks revenue down through every cost line to net profit, so you can see precisely where each dirham goes and which lever moves the bottom line.",
    personas: ["cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "insights-marketing",
    src: "/images/product/2026-fresh/insights-marketing.png",
    alt: "Marketing Intelligence - ROAS, CAC, and channel performance",
    caption: "Insights - Marketing Performance",
    whatYouSee:
      "The honest return on every marketing dirham - ROAS, cost to acquire a customer, LTV-to-CAC and conversion against total spend - so you can tell which campaigns and channels actually pay for themselves before you renew the budget.",
    personas: ["marketing", "cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "marketing-channels",
    src: "/images/product/2026-fresh/marketing-channels.png",
    alt: "Marketing Intelligence - channel attribution and efficiency frontier",
    caption: "Insights - Channel Attribution",
    whatYouSee:
      "Every paid channel attributed back to the revenue it actually drove - Meta out front of TikTok and the rest - with an efficiency frontier and a budget optimizer that show you exactly where the next dollar should go instead of where it went last month.",
    personas: ["marketing"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "marketing-customers",
    src: "/images/product/2026-fresh/marketing-customers.png",
    alt: "Marketing Intelligence - customer segments, retention, and lifetime value",
    caption: "Insights - Customer Intelligence",
    whatYouSee:
      "Who's coming back and who you're losing - new against returning guests over a cohort retention curve - broken into segments from regulars to corporate to tourists, each with its own spend, visit frequency and lifetime value, so loyalty becomes a number you can grow on purpose.",
    personas: ["marketing"],
    productHref: "/insights",
    productLabel: "Insights →",
  },

  // ─── Foresight - Predictive intelligence ─────────────────────
  {
    id: "foresight-scenarios",
    src: "/images/product/2026-fresh/foresight-scenarios.png",
    alt: "Foresight Scenarios - scenario library with quick-start templates",
    caption: "Foresight - Scenarios",
    whatYouSee:
      "Model the decision before you commit to it. Start from a ready-made scenario - a 5% price move, a 10% labor cut, a supplier increase, a peak-season surge - and save your own, so the big calls get pressure-tested on paper first.",
    personas: ["cfo", "c_suite"],
    productHref: "/product/foresight",
    productLabel: "Foresight →",
  },
  {
    id: "foresight-modeler",
    src: "/images/product/2026-fresh/foresight-modeler.png",
    alt: "Foresight Modeler - restaurant P&L modelling with elasticity",
    caption: "Foresight - P&L Modeler",
    whatYouSee:
      "A full restaurant P&L you can flex over a 30-day horizon - projected revenue, operating profit and margin, split across dine-in and delivery - with price elasticity built in and your real connected data setting the starting point, so the model reflects your restaurant, not a generic template.",
    personas: ["cfo"],
    productHref: "/product/foresight",
    productLabel: "Foresight →",
  },
  {
    id: "intelligence-simulator",
    src: "/images/product/2026-fresh/intelligence-simulator.png",
    alt: "Intelligence Simulator - what-if scenario cascade",
    caption: "Intelligence - Scenario Simulator",
    whatYouSee:
      "Pull one lever and watch it ripple through the whole model - covers and ticket flow into revenue, then food cost and labor, all the way down to EBITDA - with every driver on a slider, so you can see what a single change is really worth before you make it.",
    personas: ["cfo", "operations"],
    productHref: "/intelligence",
    productLabel: "Sundae Intelligence →",
  },

  // ─── Watchtower - Competitive & market intelligence ──────────
  {
    id: "watchtower-command-center",
    src: "/images/product/2026-fresh/watchtower-command-center.png",
    alt: "Watchtower Command Center - competitor, weather, and market signals",
    caption: "Watchtower - Command Center",
    whatYouSee:
      "What changed outside your four walls today, in one morning briefing - weather, local events, competitor moves and market signals pulled together, then turned into a short list of actions and automations, so the world beyond your restaurant becomes something you can plan around.",
    personas: ["c_suite", "operations", "multi_loc"],
    productHref: "/product/watchtower",
    productLabel: "Watchtower →",
  },
  {
    id: "watchtower-competitor-intel",
    src: "/images/product/2026-fresh/watchtower-competitor-intel.png",
    alt: "Watchtower Competitor Intelligence - rank, ratings, promos, delivery",
    caption: "Watchtower - Competitor Intelligence",
    whatYouSee:
      "Who's competing for your guests inside a 5km catchment - where you rank on rating and price, a live promo radar catching rivals' deals as they launch, your delivery standing across Deliveroo, Noon and Talabat, and a plain-language read on why guests pick them over you.",
    personas: ["c_suite", "marketing", "operations"],
    productHref: "/product/watchtower",
    productLabel: "Watchtower →",
  },
  {
    id: "watchtower-market-trends",
    src: "/images/product/2026-fresh/watchtower-market-trends.png",
    alt: "Watchtower Market Trends - supply, cuisine landscape, demand",
    caption: "Watchtower - Market Trends",
    whatYouSee:
      "The dining landscape around you, read like a market map - how your area rates, who's opening and closing nearby, which cuisines are crowded or wide open, and where delivery is heading - so you can spot the shift in demand before your neighbours do.",
    personas: ["c_suite", "marketing", "multi_loc"],
    productHref: "/product/watchtower",
    productLabel: "Watchtower →",
  },

  // ─── Benchmark - Network-effect peer comparison ──────────────
  {
    id: "benchmark-revpash-trend",
    src: "/images/product/2026-fresh/benchmark-revpash-trend.png",
    alt: "Benchmark - RevPASH vs compset over time with P25-P75 percentile band",
    caption: "Benchmark - RevPASH vs Compset",
    whatYouSee:
      "Your RevPASH plotted against an anonymized peer set, week by week - your line riding the market median inside a shaded percentile band - so you finally know whether a soft week is you or the whole market, and can click any week to dig into why. The network-effect data moat, made visible.",
    personas: ["c_suite", "cfo", "multi_loc"],
    productHref: "/benchmarking",
    productLabel: "Benchmark →",
  },
  {
    id: "benchmark-performance",
    src: "/images/product/2026-fresh/benchmark-performance.png",
    alt: "Benchmark - per-metric YOU vs market with percentile rank",
    caption: "Benchmark - Performance Percentiles",
    whatYouSee:
      "Every metric ranked against the anonymized market - you versus the median, as percentile bars and index badges - so average check, RevPASH and transactions each tell you where you genuinely lead and where the biggest upside is, called out and ready to drill into.",
    personas: ["c_suite", "cfo", "multi_loc"],
    productHref: "/benchmarking",
    productLabel: "Benchmark →",
  },

  // ─── Spatial Floor Intelligence - one floor plan, every lens ─
  {
    id: "floor-table-performance",
    src: "/images/product/2026-fresh/floor-table-performance.png",
    alt: "Table Performance Floor - per-table revenue on the published floor plan",
    caption: "Spatial - Table Performance Floor",
    whatYouSee:
      "Your published floor plan becomes a revenue lens - sales colour-flowing across every table so the rooms that quietly carry the night stand out at a glance. Roll it up by section, see who's serving the strongest tables, then click any seat for its full 360° fingerprint.",
    personas: ["c_suite", "operations", "cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "floor-guest-sentiment",
    src: "/images/product/2026-fresh/floor-guest-sentiment.png",
    alt: "Guest Sentiment Floor - per-table guest rating on the same floor plan",
    caption: "Spatial - Guest Sentiment Floor",
    whatYouSee:
      "The same floor plan, now a guest-experience lens - average rating per table, drawn from hundreds of responses, with the seats guests enjoy least surfaced for a fix. Publish one floor plan and Sundae turns it into a revenue, labor and guest lens, table by table.",
    personas: ["c_suite", "operations", "marketing"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "floor-live",
    src: "/images/product/2026-fresh/floor-live.png",
    alt: "Live Floor - real-time table occupancy on the published floor plan",
    caption: "Spatial - Live Floor",
    whatYouSee:
      "Live table occupancy on your own floor plan - what's seated, turning, or free, and how much revenue is open on the floor right now - so the manager can read the room and move on the rush before it arrives, not after.",
    personas: ["operations", "c_suite"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "floor-table-turn",
    src: "/images/product/2026-fresh/floor-table-turn.png",
    alt: "Table Turn & Dwell - turn rate and dwell time per table",
    caption: "Spatial - Table Turn & Dwell",
    whatYouSee:
      "Turn rate and dwell time mapped table by table - the fast-flipping seats and the slow-sitting ones laid out right on the plan - so you can find the tables quietly costing you covers every service and reset them.",
    personas: ["operations", "cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "floor-section-optimizer",
    src: "/images/product/2026-fresh/floor-section-optimizer.png",
    alt: "Server-Section Optimizer - balance sections across the team",
    caption: "Spatial - Server-Section Optimizer",
    whatYouSee:
      "Balance the floor across your team - see how evenly sections are covered, with specific moves suggested so no server is buried while another idles, and every guest gets the same pace of service.",
    personas: ["operations", "multi_loc"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "floor-demand-forecast",
    src: "/images/product/2026-fresh/floor-demand-forecast.png",
    alt: "Demand Forecast - forward covers and revenue on the floor",
    caption: "Spatial - Demand Forecast",
    whatYouSee:
      "Forward demand projected onto the floor - covers and revenue expected over the next seven days, broken out by daypart - so you staff and prep to the curve that's coming instead of reacting to the one that just hit.",
    personas: ["operations", "c_suite", "cfo"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "floor-capacity-simulator",
    src: "/images/product/2026-fresh/floor-capacity-simulator.png",
    alt: "Capacity Simulator - model floor changes before you make them",
    caption: "Spatial - Capacity Simulator",
    whatYouSee:
      "Model a floor change before you commit to it - add seats or reshape a section and see the revenue impact projected over the next 30 days, rendered right on the plan, so the trade-off is visible before anything moves.",
    personas: ["c_suite", "cfo", "operations"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "floor-seat-viability",
    src: "/images/product/2026-fresh/floor-seat-viability.png",
    alt: "Seat Viability - per-seat contribution economics",
    caption: "Spatial - Seat Viability",
    whatYouSee:
      "Per-seat economics laid over the floor plan - the contribution each seat actually earns - so you can see which ones pay their way and which to rethink before you spend on the next refit.",
    personas: ["cfo", "c_suite"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "floor-skim-detection",
    src: "/images/product/2026-fresh/floor-skim-detection.png",
    alt: "Skim Detection - revenue-assurance heatmap on the floor",
    caption: "Spatial - Skim Detection",
    whatYouSee:
      "Revenue assurance mapped to the floor - the tables and servers whose void and refund patterns sit far outside the norm, surfaced spatially, so the loss patterns that hide in a spreadsheet become impossible to miss here.",
    personas: ["cfo", "operations"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "floor-vip-seating",
    src: "/images/product/2026-fresh/floor-vip-seating.png",
    alt: "VIP Seating - know your VIP guests by table",
    caption: "Spatial - VIP Seating",
    whatYouSee:
      "Know your VIPs by table - who's seated where on the floor tonight and which seats hold your highest-value guests - so the team can lavish attention exactly where it earns the most loyalty.",
    personas: ["operations", "marketing", "c_suite"],
    productHref: "/insights",
    productLabel: "Insights →",
  },

  // ─── Topology-aware (multi-brand / multi-region moat) ───────
  {
    id: "topology-franchise-health",
    src: "/images/product/2026-fresh/topology-franchise-health.png",
    alt: "Franchise Health - 4 outlets across MENA cities",
    caption: "Topology - Franchise Health",
    whatYouSee:
      "One composite health score per outlet across your whole estate - Abu Dhabi, Dubai, Cairo, Riyadh on a single risk matrix - so you can see at a glance which units are thriving and which need a visit, then scope the view to any brand or region in a click.",
    personas: ["topology", "multi_loc", "c_suite"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "topology-outlet-viability",
    src: "/images/product/2026-fresh/topology-outlet-viability.png",
    alt: "Outlet Viability - new-outlet NPV + break-even modeller",
    caption: "Topology - Outlet Viability",
    whatYouSee:
      "Underwrite a new outlet before you sign the lease - project its break-even, NPV and first-year P&L, then move sliders for capex, rent, food and labor cost, overhead and ramp until the deal works. The site that pencils out and the one that doesn't, settled on screen instead of after the build.",
    personas: ["topology", "cfo", "c_suite"],
    productHref: "/insights",
    productLabel: "Insights →",
  },
  {
    id: "topology-org-tree",
    src: "/images/product/2026-fresh/topology-org-tree.png",
    alt: "Crew Organization Tree - 75-node reporting structure",
    caption: "Topology - Organization Tree",
    whatYouSee:
      "Your entire reporting structure mapped into one living org tree - dozens of nodes from group down to outlet, rendered as photo cards with every reporting line drawn in - so who answers to whom across brands and regions is finally one clear picture, not a stack of spreadsheets.",
    personas: ["topology", "hr"],
    productHref: "/crew",
    productLabel: "Sundae Crew →",
  },

  // ─── Crew - Multi-region payroll + HR ───────────────────────
  {
    id: "crew-payroll",
    src: "/images/product/2026-fresh/crew-payroll.png",
    alt: "Crew Payroll - country-pack control center",
    caption: "Crew - Multi-region Payroll",
    whatYouSee:
      "Run payroll across dozens of countries from one control center - the UAE, Saudi, Qatar and the rest each showing green on rules, statutory exports and setup - with a readiness gate and a full approval and audit trail, so every run is right and provable before it leaves the building.",
    personas: ["hr", "cfo"],
    productHref: "/crew",
    productLabel: "Sundae Crew →",
  },
  {
    id: "crew-people",
    src: "/images/product/2026-fresh/crew-people.png",
    alt: "Crew People - 122-employee HR management",
    caption: "Crew - People",
    whatYouSee:
      "Your whole team in one searchable record - every employee with their role, department, outlet and manager - filterable by location or function, so the people side of a multi-outlet operation lives in one place instead of scattered across folders and group chats.",
    personas: ["hr"],
    productHref: "/crew",
    productLabel: "Sundae Crew →",
  },
  {
    id: "crew-leave",
    src: "/images/product/2026-fresh/crew-leave.png",
    alt: "Crew Leave Admin - liability, policies, and per-employee balances",
    caption: "Crew - Leave Admin",
    whatYouSee:
      "Leave as a managed liability, not a guess - total days owed across the team, every employee's annual, sick and unpaid balance, and accruals and public holidays that run automatically per country, so what you owe staff is always current and audit-ready.",
    personas: ["hr"],
    productHref: "/crew",
    productLabel: "Sundae Crew →",
  },
  {
    id: "crew-benefits",
    src: "/images/product/2026-fresh/crew-benefits.png",
    alt: "Crew Benefits - enrollments, plans, and employer cost",
    caption: "Crew - Benefits",
    whatYouSee:
      "Manage health benefits without becoming a broker - each member's plan, the employee and employer split, renewals coming due and your monthly cost, all through a provider-neutral adapter, so enrollments and deductions stay in sync with payroll instead of living in the insurer's portal.",
    personas: ["hr"],
    productHref: "/crew",
    productLabel: "Sundae Crew →",
  },
  {
    id: "crew-attendance",
    src: "/images/product/2026-fresh/crew-attendance.png",
    alt: "Crew Time & Attendance - geofenced biometric clock-in",
    caption: "Crew - Time & Attendance",
    whatYouSee:
      "Clock-in you can trust - staff punch in at the outlet with a passkey via fingerprint or Face ID, inside a geofence and with optional photo proof, so buddy-punching and off-site punches simply can't happen, while roster, anomalies and timesheets sit one tab away for the manager.",
    personas: ["hr", "operations"],
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

// All translatable copy for the gallery. en lives here; the other 21 locales are
// natively transcreated in the generated pack and merged via getGeneratedLocalCopy
// (structural card fields - id/src/href/personas - are preserved from en).
type LocalizedGallery = {
  heading: { eyebrow: string; title: string; subtitle: string };
  filterLabels: Record<Persona | "all", string>;
  ui: {
    openFull: string; // "{x}" is replaced with the card caption
    footerLead: string;
    footerLink: string;
    footerTail: string;
    closeLightbox: string;
    prevImage: string;
    nextImage: string;
    lightboxHint: string;
  };
  cards: GalleryItem[];
};

const localizedCopy: Record<"en", LocalizedGallery> = {
  en: {
    heading: {
      eyebrow: "SEE THE PRODUCT",
      title: "This is what your team actually sees.",
      subtitle:
        "Filter by who's logging in. Every surface deep-links to the relevant product page so you can dig in.",
    },
    filterLabels: {
      all: "All views",
      operations: "Operations",
      c_suite: "C-Suite",
      cfo: "Finance",
      multi_loc: "Multi-location",
      topology: "Topology-aware",
      hr: "HR",
      marketing: "Marketing",
      tech: "Technology",
    },
    ui: {
      openFull: "Open {x} at full size",
      footerLead:
        "Screenshots represent live in-product surfaces. Click any image to enlarge. Synthetic data shown for illustration. Take the",
      footerLink: "Operations Diagnostic",
      footerTail: "to see what your view would look like.",
      closeLightbox: "Close lightbox",
      prevImage: "Previous image",
      nextImage: "Next image",
      lightboxHint: "Esc to close · ← → to navigate",
    },
    cards: GALLERY,
  },
};

interface SectionProductGalleryProps {
  /**
   * When set, restricts the gallery to cards whose productHref matches
   * this prefix (e.g. "/product/pulse" → only Pulse cards). Used on
   * product pages to surface just the relevant surfaces.
   */
  productFilter?: string;
  /** Pre-select a persona chip - used on solutions pages */
  defaultPersona?: Persona | "all";
  /** Override the section heading (defaults to the homepage copy) */
  headingOverride?: { eyebrow?: string; title?: string; subtitle?: string };
  /** Hide the persona filter row (useful for product-specific galleries) */
  hideFilter?: boolean;
}

export function SectionProductGallery({
  productFilter,
  defaultPersona = "all",
  headingOverride,
  hideFilter = false,
}: SectionProductGalleryProps = {}) {
  const [activePersona, setActivePersona] = useState<Persona | "all">(defaultPersona);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { locale } = useWebsiteI18n();
  const copy =
    getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;

  // First apply productFilter (if set), then persona filter
  const productScoped = useMemo(
    () =>
      productFilter
        ? copy.cards.filter((item) => item.productHref.startsWith(productFilter))
        : copy.cards,
    [productFilter, copy.cards],
  );

  const filtered = useMemo(() => {
    if (activePersona === "all") return productScoped;
    const matches = productScoped.filter((item) => item.personas.includes(activePersona));
    // Never render an empty grid: if a pre-selected persona (e.g. solutions
    // pages) has no tagged surfaces, fall back to the full product-scoped set.
    return matches.length > 0 ? matches : productScoped;
  }, [activePersona, productScoped]);

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  // When a product page filters to a surface set we have no captures for yet
  // (e.g. /product/watchtower, /benchmarking), render nothing rather than an
  // empty heading + blank grid. The section lights up automatically once a
  // matching screenshot is added to GALLERY.
  const isEmpty = productScoped.length === 0;

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

  if (isEmpty) return null;

  return (
    <section
      aria-labelledby="product-gallery-headline"
      className="relative py-20 px-4 sm:px-6 lg:px-8 border-y border-[var(--border-default)] bg-[var(--surface-faint)]"
    >
      <div className="max-w-7xl mx-auto">
        <FadeUp className="text-center mb-10">
          <p className="eyebrow mb-3">{headingOverride?.eyebrow ?? copy.heading.eyebrow}</p>
          <h2
            id="product-gallery-headline"
            className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] text-balance mb-3"
          >
            {headingOverride?.title ?? copy.heading.title}
          </h2>
          <p className="text-base sm:text-lg text-[var(--text-supporting)] max-w-2xl mx-auto">
            {headingOverride?.subtitle ?? copy.heading.subtitle}
          </p>
        </FadeUp>

        {!hideFilter && (
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
              {copy.filterLabels[p.id] ?? p.label}
            </button>
          ))}
        </div>
        )}

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
                {/* Image - click to open lightbox */}
                <button
                  onClick={() => setLightboxIndex(i)}
                  className="relative aspect-[16/10] bg-black overflow-hidden w-full block cursor-zoom-in"
                  aria-label={copy.ui.openFull.replace("{x}", item.caption)}
                >
                  <ThemedShot
                    fill
                    dark={darkTwin(item.src)}
                    light={item.src}
                    alt={item.alt}
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
                          {copy.filterLabels[p] ?? p}
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
          {copy.ui.footerLead}{" "}
          <Link href="/diagnostic" className="text-[var(--electric-blue)] hover:underline font-semibold not-italic">
            {copy.ui.footerLink}
          </Link>{" "}
          {copy.ui.footerTail}
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
              aria-label={copy.ui.closeLightbox}
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
                  aria-label={copy.ui.prevImage}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
                  }}
                  className="absolute right-4 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label={copy.ui.nextImage}
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
                <ThemedShot
                  dark={darkTwin(lightboxItem.src)}
                  light={lightboxItem.src}
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
                    {lightboxIndex + 1} / {filtered.length} · {copy.ui.lightboxHint}
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
