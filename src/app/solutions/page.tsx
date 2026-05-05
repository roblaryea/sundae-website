"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ROLE_META,
  SEGMENT_META,
  type SolutionMeta,
} from "@/components/nav/solutionsMeta";

/**
 * /solutions hub page — fixes the 404 that the breadcrumb on every
 * /solutions/<persona>/ page was linking to. Lists all six role pages
 * and four segment pages with the same icon + value-prop treatment used
 * in the navbar mega-menu.
 */

interface SolutionLink {
  name: string;
  href: string;
  meta: SolutionMeta;
}

const ROLES: SolutionLink[] = [
  {
    name: "Operations Leaders",
    href: "/solutions/regional-managers",
    meta: ROLE_META["/solutions/regional-managers"],
  },
  {
    name: "Finance & FP&A",
    href: "/solutions/finance-teams",
    meta: ROLE_META["/solutions/finance-teams"],
  },
  {
    name: "Marketing Teams",
    href: "/solutions/marketing-teams",
    meta: ROLE_META["/solutions/marketing-teams"],
  },
  {
    name: "C-Suite & Owners",
    href: "/solutions/c-suite-executives",
    meta: ROLE_META["/solutions/c-suite-executives"],
  },
  {
    name: "Data & Technology",
    href: "/solutions/technology-teams",
    meta: ROLE_META["/solutions/technology-teams"],
  },
  {
    name: "People & HR",
    href: "/solutions/hr-teams",
    meta: ROLE_META["/solutions/hr-teams"],
  },
];

const SEGMENTS: SolutionLink[] = [
  {
    name: "Multi-location Restaurants",
    href: "/solutions/multi-location-groups",
    meta: SEGMENT_META["/solutions/multi-location-groups"],
  },
  {
    name: "Franchises",
    href: "/solutions/franchises",
    meta: SEGMENT_META["/solutions/franchises"],
  },
  {
    name: "Cloud Kitchens",
    href: "/solutions/cloud-kitchens",
    meta: SEGMENT_META["/solutions/cloud-kitchens"],
  },
  {
    name: "Enterprise Hospitality",
    href: "/solutions/hospitality-operators",
    meta: SEGMENT_META["/solutions/hospitality-operators"],
  },
];

export default function SolutionsHubPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main>
      {/* Hero */}
      <section
        aria-labelledby="solutions-hub-hero"
        className="relative overflow-hidden theme-hero-surface"
      >
        <div aria-hidden className="absolute inset-0 bg-grid-texture pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="eyebrow mb-5">SOLUTIONS</div>
            <h1 className="hero-h1 mb-6 text-balance">
              Sundae for every role. Sundae for every restaurant shape.
            </h1>
            <p className="body-xl max-w-2xl">
              Decision intelligence built for the way restaurants actually
              run — packaged for the operators, finance teams, marketers,
              and technology leads who run them, and for the segments where
              they operate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* By Role */}
      <section aria-labelledby="by-role" className="relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-18 lg:py-20">
          <h2 id="by-role" className="eyebrow mb-6">
            BY ROLE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {ROLES.map((role) => {
              const Icon = role.meta.Icon;
              return (
                <Link
                  key={role.href}
                  href={role.href}
                  className="group flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-[var(--electric-blue)]/15 text-[var(--electric-blue)] flex items-center justify-center shrink-0 group-hover:bg-[var(--electric-blue)]/25 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[var(--text-primary)] text-base mb-1">
                      {role.name}
                    </div>
                    <div className="text-sm text-[var(--text-supporting)] leading-snug">
                      {role.meta.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* By Segment */}
      <section aria-labelledby="by-segment" className="relative border-t border-[var(--border-default)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-18 lg:py-20">
          <h2 id="by-segment" className="eyebrow mb-6">
            BY SEGMENT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {SEGMENTS.map((seg) => {
              const Icon = seg.meta.Icon;
              return (
                <Link
                  key={seg.href}
                  href={seg.href}
                  className="group flex items-start gap-4 p-5 sm:p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-[var(--electric-blue)]/15 text-[var(--electric-blue)] flex items-center justify-center shrink-0 group-hover:bg-[var(--electric-blue)]/25 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[var(--text-primary)] text-base mb-1">
                      {seg.name}
                    </div>
                    <div className="text-sm text-[var(--text-supporting)] leading-snug">
                      {seg.meta.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
