"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Briefcase,
  Building2,
  Calendar,
  ChartArea,
  Code,
  Coins,
  Compass,
  Database,
  Eye,
  GitBranch,
  Hotel,
  Layers,
  LineChart,
  Lock,
  Megaphone,
  Network,
  Repeat,
  ScanSearch,
  Target,
  Truck,
  Users,
  Wifi,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { REPORT_APP_URL } from "@/lib/urls";
import {
  PulseDashboardMockup,
  RevenueIntelligenceMockup,
  IntelligenceChatMockup,
  MarketingPerformanceMockup,
  LaborOpsMockup,
  IntegrationsHubMockup,
  BenchmarkDashboardMockup,
  ForesightDashboardMockup,
} from "@/components/ui/MockupFrame";

/**
 * Shared layout for every /solutions/* role and segment page.
 *
 * Mirrors the new homepage's voice and structure:
 *   1. Hero            — eyebrow + pain headline + outcome subhead + CTAs + mockup
 *   2. Today vs Sundae — pacing-contrast comparison (mirrors homepage §4)
 *   3. Capabilities    — 3 cards with icon + title + body + intel-layer chip
 *   4. Closing         — italic line; footer carries page-level CTA
 *
 * Each page is a thin (server component) wrapper that imports plain data
 * (string keys for icons + mockups) and renders this client template.
 * Keeps all 10 pages consistent and avoids passing React component refs
 * across the server/client boundary (which crashes at hydration).
 */

const mockupRegistry = {
  pulse: PulseDashboardMockup,
  revenueIntelligence: RevenueIntelligenceMockup,
  intelligenceChat: IntelligenceChatMockup,
  marketingPerformance: MarketingPerformanceMockup,
  laborOps: LaborOpsMockup,
  integrationsHub: IntegrationsHubMockup,
  benchmark: BenchmarkDashboardMockup,
  foresight: ForesightDashboardMockup,
} as const;

const iconRegistry = {
  activity: Activity,
  briefcase: Briefcase,
  building2: Building2,
  calendar: Calendar,
  chartArea: ChartArea,
  code: Code,
  coins: Coins,
  compass: Compass,
  database: Database,
  eye: Eye,
  gitBranch: GitBranch,
  hotel: Hotel,
  layers: Layers,
  lineChart: LineChart,
  lock: Lock,
  megaphone: Megaphone,
  network: Network,
  repeat: Repeat,
  scanSearch: ScanSearch,
  target: Target,
  truck: Truck,
  users: Users,
  wifi: Wifi,
  workflow: Workflow,
  zap: Zap,
} as const;

export type MockupKey = keyof typeof mockupRegistry;
export type IconKey = keyof typeof iconRegistry;

export interface SolutionCapability {
  iconKey: IconKey;
  title: string;
  body: string;
  intelLayer?: string;
}

export interface SolutionPageData {
  // Hero
  eyebrow: string;
  headline: string;
  subhead: string;

  // Today / With Sundae comparison
  todayTitle: string;
  todayPoints: string[];
  todayFooter?: string;
  withSundaeTitle: string;
  withSundaePoints: string[];
  withSundaeFooter?: string;

  // Capabilities
  capabilitiesEyebrow: string;
  capabilitiesHeadline: string;
  capabilities: [SolutionCapability, SolutionCapability, SolutionCapability];

  // Mockup (string key — looked up in mockupRegistry)
  mockupKey: MockupKey;

  // Connected systems — proof/depth strip showing data sources Sundae unifies
  // for this persona. Renders as a chip row above the closing line.
  connectedSystemsEyebrow?: string;
  connectedSystems?: string[];

  // Closing
  closingLine: string;
}

export function SolutionPageTemplate({ data }: { data: SolutionPageData }) {
  const reduceMotion = useReducedMotion();
  const Mockup = mockupRegistry[data.mockupKey];

  return (
    <main>
      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="solution-hero"
        className="relative overflow-hidden theme-hero-surface"
      >
        <div aria-hidden className="absolute inset-0 bg-grid-texture pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-18 lg:pb-20">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-12 xl:gap-16 items-center">
            {/* Copy */}
            <div>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="eyebrow mb-5">{data.eyebrow}</div>
                <h1 id="solution-hero" className="hero-h1 mb-6 text-balance">
                  {data.headline}
                </h1>
                <p className="body-xl max-w-xl">{data.subhead}</p>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <Button href="/demo" variant="cta" size="lg">
                  Book a Working Session
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14" />
                    <path d="m13 5 7 7-7 7" />
                  </svg>
                </Button>
                <Button href={REPORT_APP_URL} variant="outline-light" size="lg">
                  Start with Report Lite
                </Button>
              </motion.div>
            </div>

            {/* Mockup — looked up via registry to avoid passing React
                component refs through props from server pages */}
            <div className="lg:pl-4">
              <Mockup />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Today vs With Sundae ──────────────────────────────── */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {/* Today */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-8"
            >
              <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-4">
                {data.todayTitle}
              </div>
              <ul className="space-y-2.5">
                {data.todayPoints.map((line) => (
                  <li
                    key={line}
                    className="text-base sm:text-lg text-[var(--text-supporting)]"
                  >
                    {line}
                  </li>
                ))}
              </ul>
              {data.todayFooter && (
                <div className="mt-6 pt-4 border-t border-[var(--border-default)] text-sm text-[var(--text-muted)]">
                  {data.todayFooter}
                </div>
              )}
            </motion.div>

            {/* With Sundae */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-[var(--electric-blue)]/30 bg-gradient-to-br from-[var(--electric-blue)]/[0.10] to-[var(--electric-blue)]/[0.02] p-6 sm:p-8 shadow-[0_0_40px_rgba(28,71,255,0.12)]"
            >
              <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-4">
                {data.withSundaeTitle}
              </div>
              <ul className="space-y-2.5">
                {data.withSundaePoints.map((line) => (
                  <li
                    key={line}
                    className="text-base sm:text-lg text-[var(--text-primary)] font-medium"
                  >
                    {line}
                  </li>
                ))}
              </ul>
              {data.withSundaeFooter && (
                <div className="mt-6 pt-4 border-t border-[var(--electric-blue)]/20 text-sm text-[var(--text-secondary)]">
                  {data.withSundaeFooter}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Capabilities ─────────────────────────────────────── */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
            <div className="eyebrow mb-4">{data.capabilitiesEyebrow}</div>
            <h2 className="section-h2 text-balance">{data.capabilitiesHeadline}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {data.capabilities.map((c, i) => {
              const Icon = iconRegistry[c.iconKey];
              return (
                <motion.article
                  key={c.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-6 sm:p-7 hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-[var(--electric-blue)]/15 text-[var(--electric-blue)] flex items-center justify-center mb-4 group-hover:bg-[var(--electric-blue)]/25 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <h3 className="section-h3 mb-3">{c.title}</h3>
                  <p className="body-base mb-4">{c.body}</p>
                  {c.intelLayer && (
                    <div className="inline-flex items-center text-[11px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md bg-[var(--electric-blue)]/15 text-[var(--electric-blue)] border border-[var(--electric-blue)]/25">
                      {c.intelLayer}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Connected systems ────────────────────────────────── */}
      {data.connectedSystems && data.connectedSystems.length > 0 && (
        <section className="relative border-t border-[var(--border-default)]">
          <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-14">
            <div className="text-center">
              <div className="eyebrow mb-5">
                {data.connectedSystemsEyebrow ?? "CONNECTED SYSTEMS"}
              </div>
              <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-2.5">
                {data.connectedSystems.map((sys) => (
                  <span
                    key={sys}
                    className="text-[12px] sm:text-[13px] font-semibold px-3 py-1.5 rounded-full bg-[var(--surface-subtle)] border border-[var(--border-default)] text-[var(--text-supporting)]"
                  >
                    {sys}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Closing line ─────────────────────────────────────── */}
      <section className="relative">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16 text-center">
          <p className="text-xl sm:text-2xl text-[var(--text-primary)] italic font-light">
            {data.closingLine}
          </p>
        </div>
      </section>
    </main>
  );
}
