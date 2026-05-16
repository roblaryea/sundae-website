"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { ElegantShape } from "@/components/ui/ElegantShape";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { REPORT_APP_URL } from "@/lib/urls";
import {
  ExecutiveBriefingMockup,
  RevenueIntelligenceMockup,
  PulseDashboardMockup,
  LaborOpsMockup,
  IntegrationsHubMockup,
  MarketingPerformanceMockup,
  BenchmarkDashboardMockup,
} from "@/components/ui/MockupFrame";

type Persona = {
  slug: string;
  title: string;
  tagline: string;
  icon: SundaeIconName;
  accent: string;
};

type PersonaGroup = {
  eyebrow: string;
  title: string;
  description: string;
  personas: Persona[];
};

const groups: PersonaGroup[] = [
  {
    eyebrow: "LEADERSHIP & STRATEGY",
    title: "Run the portfolio with one source of truth.",
    description: "Decision intelligence built for the executive office, the finance function, and the group that owns the brands.",
    personas: [
      {
        slug: "c-suite-executives",
        title: "C-Suite & Owners",
        tagline: "Daily AI briefings across every brand. Margin variance the day it happens.",
        icon: "owners",
        accent: "from-[#1C47FF] to-[#3B82F6]",
      },
      {
        slug: "finance-teams",
        title: "Finance & FP&A",
        tagline: "Close in hours. Trace every dollar to the event that moved it.",
        icon: "finance",
        accent: "from-[#0EA5E9] to-[#0284C7]",
      },
      {
        slug: "multi-location-groups",
        title: "Multi-Location Groups",
        tagline: "Portfolio rollup, brand-vs-brand benchmarks, group-level strategic signal.",
        icon: "benchmarking",
        accent: "from-[#6366F1] to-[#4F46E5]",
      },
    ],
  },
  {
    eyebrow: "OPERATIONS & PEOPLE",
    title: "Steer the floor while the shift is still running.",
    description: "Live operational intelligence for the people closest to the guest, the schedule, and the service.",
    personas: [
      {
        slug: "regional-managers",
        title: "Regional & Area Managers",
        tagline: "Run twelve outlets like you're standing in one. Pacing flags the site that needs you now.",
        icon: "operators",
        accent: "from-[#EF4444] to-[#DC2626]",
      },
      {
        slug: "hr-teams",
        title: "HR & People",
        tagline: "Live labor variance. OT risk flagged before it lands. Schedules built from demand.",
        icon: "support",
        accent: "from-[#F59E0B] to-[#D97706]",
      },
      {
        slug: "hospitality-operators",
        title: "Hospitality Operators",
        tagline: "Every F&B outlet — restaurant, banquet, IRD, lobby — in one unified live view.",
        icon: "regional",
        accent: "from-[#A855F7] to-[#7C3AED]",
      },
    ],
  },
  {
    eyebrow: "GROWTH & TECHNOLOGY",
    title: "Build, market, and govern at scale.",
    description: "Tightly-defined intelligence layers for the teams that grow the brand and own the data.",
    personas: [
      {
        slug: "marketing-teams",
        title: "Marketing Leads",
        tagline: "Campaign ROI tied to net margin in 24h. Reallocate budget while it still matters.",
        icon: "marketing",
        accent: "from-[#EC4899] to-[#BE185D]",
      },
      {
        slug: "technology-teams",
        title: "Technology & Data",
        tagline: "12 sources, one governed schema. RBAC, audit trails, public API, webhooks.",
        icon: "data",
        accent: "from-[#0EA5E9] to-[#3B82F6]",
      },
    ],
  },
  {
    eyebrow: "SPECIALIZED FORMATS",
    title: "Built for how restaurants actually run today.",
    description: "Format-specific intelligence for cloud kitchens, virtual brands, and franchise networks.",
    personas: [
      {
        slug: "cloud-kitchens",
        title: "Cloud Kitchens & Virtual Brands",
        tagline: "Net margin per platform, per brand. Six dashboards collapsed into one ledger.",
        icon: "delivery",
        accent: "from-[#22C55E] to-[#16A34A]",
      },
      {
        slug: "franchises",
        title: "Franchises & Franchisors",
        tagline: "Brand standards measured live. Royalty reconciliation automated. Peer benchmarks anonymous.",
        icon: "network",
        accent: "from-[#F59E0B] to-[#EF4444]",
      },
    ],
  },
];

// Rotating hero mockup — cycles through 6 representative persona views
const ROTATING_MOCKUPS = [
  { Component: ExecutiveBriefingMockup, label: "C-Suite & Owners" },
  { Component: RevenueIntelligenceMockup, label: "Finance & FP&A" },
  { Component: PulseDashboardMockup, label: "Operations" },
  { Component: MarketingPerformanceMockup, label: "Marketing" },
  { Component: LaborOpsMockup, label: "People & HR" },
  { Component: IntegrationsHubMockup, label: "Tech & Data" },
  { Component: BenchmarkDashboardMockup, label: "Multi-brand groups" },
];
const ROTATION_MS = 5000;

export default function SolutionsHubPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const ActiveMockup = ROTATING_MOCKUPS[activeIdx].Component;
  const activeLabel = ROTATING_MOCKUPS[activeIdx].label;

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % ROTATING_MOCKUPS.length);
    }, ROTATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--navy-deep)] overflow-x-hidden">
        {/* ════════════════════════════════════════════════
            HERO — with rotating persona mockup
        ════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(28,71,255,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-grid-texture" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-white/[0.03]" className="left-[-10%] top-[15%]" />
            <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-white/[0.02]" className="right-[-5%] top-[60%]" />
            <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-white/[0.025]" className="left-[5%] bottom-[10%]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-[rgba(28,71,255,0.12)] border border-[rgba(28,71,255,0.2)] text-[#60A5FA]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#60A5FA] animate-pulse" />
                  SOLUTIONS · BY ROLE
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="hero-h1 mb-6 text-balance"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                  One platform.
                </span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#60A5FA] via-white to-[#93C5FD]">
                  Every role you run.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="body-xl max-w-xl mb-3"
              >
                Decision intelligence built around the person reading it — from the executive office to the floor.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-sm uppercase tracking-[0.2em] text-[#60A5FA]/80 mb-10 font-semibold"
              >
                Now showing: <span className="text-[#60A5FA]">{activeLabel}</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link href="/demo">
                  <Button variant="primary" size="lg">Book a Working Session</Button>
                </Link>
                <a href={REPORT_APP_URL}>
                  <Button variant="outline-light" size="lg">Start with Report Lite</Button>
                </a>
              </motion.div>
            </div>

            {/* Rotating mockup column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
              className="lg:pl-4"
              style={{ perspective: "1200px" }}
            >
              <motion.div
                initial={{ rotateX: 6 }}
                animate={{ rotateX: 1.5 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ActiveMockup />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SHAPED BY — defensible operator-coverage rail
        ════════════════════════════════════════════════ */}
        <section
          aria-label="Operator coverage"
          className="relative border-y border-[var(--border-default)] py-8 px-4 sm:px-6 lg:px-8 bg-white/[0.015]"
        >
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-semibold mb-3">
              Shaped by restaurant operators across
            </p>
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm sm:text-base text-[var(--text-secondary)]">
              <span className="font-medium">QSR</span>
              <span aria-hidden className="text-[var(--text-faint)]">·</span>
              <span className="font-medium">Casual Dining</span>
              <span aria-hidden className="text-[var(--text-faint)]">·</span>
              <span className="font-medium">Fine Dining</span>
              <span aria-hidden className="text-[var(--text-faint)]">·</span>
              <span className="font-medium">Cloud Kitchens</span>
              <span aria-hidden className="text-[var(--text-faint)]">·</span>
              <span className="font-medium">Hospitality Groups</span>
              <span aria-hidden className="text-[var(--text-faint)]">·</span>
              <span className="font-medium">Multi-Brand Operators</span>
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            PERSONA GROUPS
        ════════════════════════════════════════════════ */}
        {groups.map((group, gi) => (
          <section
            key={group.eyebrow}
            className="relative py-20 px-4 sm:px-6 lg:px-8"
          >
            {/* Alternate subtle backgrounds for rhythm */}
            <div
              className={`absolute inset-0 ${
                gi % 2 === 0
                  ? "bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.04),transparent_60%)]"
                  : "bg-mesh"
              }`}
            />

            <div className="relative z-10 max-w-7xl mx-auto">
              <FadeUp className="text-center max-w-3xl mx-auto mb-12">
                <p className="eyebrow mb-4">{group.eyebrow}</p>
                <h2 className="section-h2 text-[var(--text-primary)] mb-4 text-balance">
                  {group.title}
                </h2>
                <p className="body-lg text-[var(--text-supporting)]">{group.description}</p>
              </FadeUp>

              <StaggerContainer
                className={`grid gap-5 ${
                  group.personas.length === 2
                    ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {group.personas.map((p) => (
                  <StaggerItem key={p.slug}>
                    <Link
                      href={`/solutions/${p.slug}`}
                      className="group block h-full"
                    >
                      <div className="h-full p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-[var(--border-default)] hover:bg-[var(--surface-hover)] hover:border-[rgba(28,71,255,0.3)] hover:shadow-[0_0_40px_rgba(28,71,255,0.10)] transition-all duration-300 hover:-translate-y-1">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center text-white shadow-lg mb-5`}>
                          <SundaeIcon name={p.icon} size="md" className="text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2 leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                          {p.tagline}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#60A5FA] group-hover:text-[var(--text-primary)] transition-colors">
                          See {p.title} solution
                          <span className="inline-block transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        ))}

        {/* ════════════════════════════════════════════════
            "NOT SURE WHICH FITS" CLOSING CTA
        ════════════════════════════════════════════════ */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grad-deep">
          <div className="absolute inset-0 bg-grid-texture" />
          <ElegantShape delay={0} width={400} height={100} rotate={-12} gradient="from-white/[0.03]" className="left-[-8%] top-[20%]" />
          <ElegantShape delay={0.2} width={300} height={80} rotate={15} gradient="from-white/[0.02]" className="right-[-5%] bottom-[10%]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(28,71,255,0.06),transparent_70%)]" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <FadeUp>
              <p className="eyebrow mb-4">NOT SURE WHICH ONE</p>
              <h2 className="section-h2 mb-4">
                We&apos;ll tailor the session to your team.
              </h2>
              <p className="body-lg mb-10 max-w-xl mx-auto">
                30 minutes. Your data. The view that would matter most to the people in the room.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/demo">
                  <Button variant="cta" size="lg">Book a Guided Tour</Button>
                </Link>
                <Link href="/product">
                  <Button variant="outline-light" size="lg">See Platform Overview</Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </div>
    </MotionConfig>
  );
}
