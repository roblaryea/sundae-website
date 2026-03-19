'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { REPORT_APP_URL } from "@/lib/urls";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import {
  PulseDashboardMockup,
  BenchmarkDashboardMockup,
  WatchtowerMockup,
  InsightsModuleMockup,
  IntelligenceChatMockup,
  ForesightDashboardMockup,
} from "@/components/ui/MockupFrame";

const pillars: {
  name: string;
  tagline: string;
  description: string;
  icon: SundaeIconName;
  features: string[];
  link: string;
  stat: string;
  statLabel: string;
  mockup: React.ComponentType;
}[] = [
  {
    name: "Pulse",
    tagline: "Intraday Operations",
    description:
      "Revenue pacing, labor cost, server performance, and leakage detection — updating every 5 minutes. A shift is a perishable asset. Once it's gone, the margin is gone.",
    icon: "pulse",
    features: [
      "Live sales pacing vs targets",
      "Server-level upsell tracking",
      "Leakage & void detection",
      "Sundae Coach shift signals",
      "Portfolio leaderboard",
      "Wallboard mode for the floor",
    ],
    link: "/product/pulse",
    stat: "$2K",
    statLabel: "saved per bad shift caught early",
    mockup: PulseDashboardMockup,
  },
  {
    name: "Benchmarks",
    tagline: "Competitive Intelligence",
    description:
      "RevPASH Index, seat occupancy, average check, and revenue indexes — compared against anonymized peers in your segment and market.",
    icon: "benchmarking",
    features: [
      "RevPASH & revenue indexes",
      "Compset peer comparisons",
      "Performance trend analysis",
      "Revenue forecasting",
      "Market positioning",
      "Priority insights by Sundae Coach",
    ],
    link: "/benchmarking",
    stat: "112",
    statLabel: "RevPASH Index — 12% above peers",
    mockup: BenchmarkDashboardMockup,
  },
  {
    name: "Watchtower",
    tagline: "Market Intelligence",
    description:
      "Competitor monitoring, weather revenue impact, event intelligence, and daily briefings — before the impact hits your numbers.",
    icon: "watchtower",
    features: [
      "Competitor price & menu tracking",
      "Weather revenue impact models",
      "Local event intelligence",
      "Daily Sundae Coach briefings",
      "Signal feed & alerts",
      "Market trend detection",
    ],
    link: "/product/watchtower",
    stat: "72h",
    statLabel: "early warning before impact",
    mockup: WatchtowerMockup,
  },
  {
    name: "Insights",
    tagline: "12 Intelligence Modules",
    description:
      "Revenue, labor, inventory, purchasing, marketing, reservations, delivery, guest experience, and more — each with recommendations from Sundae Coach.",
    icon: "insights",
    features: [
      "Revenue & profit intelligence",
      "Labor cost optimization",
      "Inventory waste & variance",
      "Purchasing & supplier scoring",
      "Marketing ROI attribution",
      "Cross-Intelligence correlation engine",
    ],
    link: "/insights",
    stat: "179+",
    statLabel: "data models across 13 domains",
    mockup: InsightsModuleMockup,
  },
  {
    name: "Sundae Intelligence",
    tagline: "Conversational Analytics",
    description:
      "Ask questions in plain language. Get answers backed by your real data — with sources, not guesses. Available on web, Telegram, Slack, and Microsoft Teams.",
    icon: "conversation",
    features: [
      "Natural language queries",
      "Monitor mode (real-time alerts)",
      "Briefing mode (daily summaries)",
      "Web + Telegram + Slack + Teams",
      "Conversation history",
      "Source-cited responses",
    ],
    link: "/intelligence",
    stat: "30s",
    statLabel: "from question to cited answer",
    mockup: IntelligenceChatMockup,
  },
  {
    name: "Foresight",
    tagline: "Predictive Intelligence",
    description:
      "Forward-looking forecasts for revenue, labor, food cost, and profit — with confidence bands, what-if scenarios, and weekly executive briefings. Stop reacting. Start anticipating.",
    icon: "forecasting",
    features: [
      "14–90 day multi-metric forecasts",
      "What-if scenario simulator",
      "Cross-module dependency graphs",
      "Forecast accuracy self-correction",
      "Weekly executive briefings",
      "External signal integration",
    ],
    link: "/product/foresight",
    stat: "91%",
    statLabel: "forecast accuracy with self-correction",
    mockup: ForesightDashboardMockup,
  },
];

export default function ProductPage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="The Sundae Platform"
        title="179 Data Models. 12 Domains. One Truth."
        description="Six intelligence layers that turn fragmented restaurant data into decisions that compound — shift by shift, outlet by outlet."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="cta" size="lg" onClick={() => cta(REPORT_APP_URL, "start_free_product_hero", { page: "/product" })}>
            Start Free with Report
          </Button>
          <Button variant="outline-light" size="lg" onClick={() => cta("/demo", "book_demo_product_hero", { page: "/product" })}>
            Book a Demo
          </Button>
        </div>
      </PageHero>

      {/* Two Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
                Start Free. Scale When Ready.
              </h2>
              <p className="body-lg text-[var(--text-supporting)]">
                Historical benchmarking at no cost. Real-time operations when you need the edge.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Report Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="elevated" className="h-full overflow-hidden border-2 border-blue-500/30">
                <div className="relative h-48 overflow-hidden bg-[var(--surface-subtle)] p-3">
                  <BenchmarkDashboardMockup />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-hover)] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 badge badge--free text-[10px] z-10">FREE FOREVER</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Sundae Report</h3>
                  <p className="text-sm text-[#60A5FA] font-semibold mb-3">Historical Analysis & Benchmarking</p>
                  <p className="text-[var(--text-supporting)] mb-4 leading-relaxed">
                    Upload your data. See where you stand against peers. Performance benchmarks, margin patterns, and competitive positioning — free, forever.
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Includes:</p>
                  <ul className="text-sm text-[var(--text-supporting)] space-y-1.5 mb-6">
                    <li className="flex items-center gap-2"><span className="text-blue-500">&#10003;</span> Benchmarks (competitive intelligence)</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">&#10003;</span> Performance Report</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">&#10003;</span> Sundae Intelligence</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">&#10003;</span> Integrations Hub</li>
                  </ul>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => cta("/report", "view_report_product", { page: "/product" })}
                  >
                    Explore Sundae Report →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Core Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card variant="elevated" className="h-full overflow-hidden border-2 border-purple-500/30">
                <div className="relative h-48 overflow-hidden bg-[var(--surface-subtle)] p-3">
                  <PulseDashboardMockup />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-hover)] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 right-3 badge badge--popular text-[10px] z-10">MOST POPULAR</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Sundae Core</h3>
                  <p className="text-sm text-purple-400 font-semibold mb-3">Real-Time Operations & Intelligence</p>
                  <p className="text-[var(--text-supporting)] mb-4 leading-relaxed">
                    Everything in Report, plus live operations. Intraday pacing, market signals, 12 intelligence modules, and Sundae Coach recommendations.
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)] mb-3">Everything in Report, plus:</p>
                  <ul className="text-sm text-[var(--text-supporting)] space-y-1.5 mb-6">
                    <li className="flex items-center gap-2"><span className="text-purple-400">&#10003;</span> Pulse (intraday operations)</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">&#10003;</span> Watchtower (market intelligence)</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">&#10003;</span> 12 Intelligence Modules</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">&#10003;</span> Foresight (predictive intelligence)</li>
                    <li className="flex items-center gap-2"><span className="text-purple-400">&#10003;</span> Sundae Coach & Playbooks</li>
                  </ul>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => cta("/core", "view_core_product", { page: "/product" })}
                  >
                    Explore Sundae Core →
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => cta("/report-vs-core", "compare_tiers_product", { page: "/product" })}
            >
              Compare Report vs Core →
            </Button>
          </div>
        </div>
      </section>

      {/* Six Intelligence Layers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="eyebrow text-[#60A5FA] mb-4">
                SIX INTELLIGENCE LAYERS
              </p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
                From Shift Floor to Boardroom
              </h2>
              <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
                Each layer handles a distinct dimension of restaurant performance. Together, they form a closed-loop intelligence system.
              </p>
            </div>
          </FadeUp>

          <div className="space-y-24">
            {pillars.map((pillar, index) => {
              const Mockup = pillar.mockup;
              return (
                <FadeUp key={pillar.name} delay={index * 0.05}>
                  <div className={`grid md:grid-cols-2 gap-10 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    {/* CSS Mockup */}
                    <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                      <Mockup />
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${
                          index === 0 ? 'from-red-500 to-rose-600' :
                          index === 1 ? 'from-blue-500 to-blue-600' :
                          index === 2 ? 'from-amber-500 to-orange-600' :
                          index === 3 ? 'from-purple-500 to-purple-600' :
                          index === 4 ? 'from-green-500 to-emerald-600' :
                          'from-cyan-500 to-blue-600'
                        } rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={pillar.icon} size="lg" className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[var(--text-primary)]">{pillar.name}</h3>
                          <p className="text-sm text-[var(--text-muted)] font-medium">{pillar.tagline}</p>
                        </div>
                      </div>

                      {/* Stat callout */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold font-mono text-[#1C47FF]">{pillar.stat}</span>
                        <span className="text-sm text-[var(--text-muted)]">{pillar.statLabel}</span>
                      </div>

                      <p className="text-[var(--text-supporting)] leading-relaxed mb-6">
                        {pillar.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {pillar.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-[var(--electric-blue)] flex-shrink-0">&#10003;</span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cta(pillar.link, `view_${pillar.name.toLowerCase().replace(/\s+/g, "_")}_product`, { page: "/product" })}
                      >
                        Explore {pillar.name} →
                      </Button>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Features — Integrations + Crew */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp>
            <div className="text-center mb-12">
              <p className="eyebrow text-[#60A5FA] mb-4">
                PLATFORM
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">
                Built for Multi-Location Operations
              </h2>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <StaggerItem>
              <div className="flex items-start gap-4 p-6 bg-[var(--surface-faint)] rounded-2xl border border-[var(--border-default)]/70 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <SundaeIcon name="integration" size="lg" className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">Integrations Hub</h3>
                  <p className="text-sm text-[var(--text-muted)] font-medium mb-2">Connect Every System</p>
                  <p className="text-sm text-[var(--text-supporting)] leading-relaxed">
                    POS, labor scheduling, inventory, delivery, reservations, reviews, and accounting — one connection per system. Health monitoring and activity logs included.
                  </p>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-start gap-4 p-6 bg-[var(--surface-faint)] rounded-2xl border border-[var(--border-default)]/70 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <SundaeIcon name="operators" size="lg" className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)] mb-1">Crew</h3>
                  <p className="text-sm text-[var(--text-muted)] font-medium mb-2">Organization & Access Control</p>
                  <p className="text-sm text-[var(--text-supporting)] leading-relaxed">
                    Multi-restaurant hierarchy, role-based permissions, department teams, and billing management. Every operator sees exactly what they need.
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Stop reconciling. Start deciding."
        description="30 minutes with your data. Real intelligence. No pitch deck."
      >
        <Button variant="cta" size="lg" href="/demo">Book a Demo</Button>
        <Button variant="outline-light" size="lg" href={REPORT_APP_URL}>Start Free</Button>
      </PageCTA>
    </div>
  );
}
