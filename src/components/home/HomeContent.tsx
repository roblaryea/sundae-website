'use client';

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion, useInView, useReducedMotion, MotionConfig } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { REPORT_APP_URL, SIGNUP_URL } from "@/lib/urls";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

// Count-up animation hook
function useCountUp(end: number, duration: number = 2000, isInView: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(startValue + (end - startValue) * easeOutQuart));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return count;
}

function StatCard({ insight, index, isInView, prefersReducedMotion }: { insight: { title: string; value: number; suffix: string; prefix?: string; trend: string; description: string }; index: number; isInView: boolean; prefersReducedMotion: boolean }) {
  const count = useCountUp(insight.value, prefersReducedMotion ? 0 : 2000, isInView);
  return (
    <motion.div
      className="text-center p-3 sm:p-6 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.1 }}
    >
      <div className="text-xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2 whitespace-nowrap">
        {insight.prefix}{count}{insight.suffix}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 text-xs sm:text-base leading-tight">{insight.title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-snug">{insight.description}</p>
    </motion.div>
  );
}

const productPillars: { name: string; subtitle: string; description: string; icon: SundaeIconName; screenshot: string; screenshotAlt: string; badge: string; badgeClass: string; link: string }[] = [
  {
    name: "Pulse",
    subtitle: "Intraday Operations Monitor",
    description: "Live sales pacing, labor productivity tracking, adaptive targets, server performance analytics, and AI coaching — every shift, every outlet.",
    icon: "pulse",
    screenshot: "/images/product/pulse-scorecard.png",
    screenshotAlt: "Pulse shift scorecard showing revenue, covers, top items, and server performance",
    badge: "REAL-TIME",
    badgeClass: "badge--popular",
    link: "/product/pulse"
  },
  {
    name: "Benchmarks",
    subtitle: "Competitive Intelligence",
    description: "See how you stack up. Anonymous peer benchmarks for RevPASH, check size, and more.",
    icon: "benchmarking",
    screenshot: "/images/product/benchmark-overview.png",
    screenshotAlt: "Benchmark dashboard with RevPASH Index, competitive comparison, and market insights",
    badge: "INTELLIGENCE",
    badgeClass: "badge--addon",
    link: "/benchmarking"
  },
  {
    name: "Watchtower",
    subtitle: "External Intelligence Engine",
    description: "AI-powered daily briefings, named competitor monitoring, local event impact analysis, and market trend intelligence — the outside world, contextualized for your restaurant.",
    icon: "watchtower",
    screenshot: "/images/product/watchtower.png",
    screenshotAlt: "Watchtower command center with weather impact, events, and competitor tracking",
    badge: "MARKET SIGNALS",
    badgeClass: "badge--addon",
    link: "/product/watchtower"
  },
  {
    name: "Insights",
    subtitle: "Intelligence Modules",
    description: "Deep-dive modules for revenue, labor, inventory, and every domain that matters.",
    icon: "insights",
    screenshot: "/images/product/core-insights-hub.png",
    screenshotAlt: "Insights hub showing intelligence modules for revenue, labor, inventory, and more",
    badge: "MODULES",
    badgeClass: "badge--addon",
    link: "/insights"
  },
  {
    name: "Sundae Intelligence",
    subtitle: "AI-Powered Analytics",
    description: "AI-powered insights across Chat, Monitor, and Briefing modes — on web, Slack, Teams, or Telegram.",
    icon: "conversation",
    screenshot: "/images/product/chat-with-data.png",
    screenshotAlt: "Sundae Intelligence conversational analytics interface",
    badge: "AI-POWERED",
    badgeClass: "badge--popular",
    link: "/chat-with-data"
  }
];

const decisionInsights = [
  { title: "Labor Cost Reduction", value: 18, suffix: "%", trend: "down", description: "Reported by early adopters" },
  { title: "Decision Speed", value: 3, suffix: "x", trend: "up", description: "Reported by early adopters" },
  { title: "Cost Variance Detected", value: 50, suffix: "K+", prefix: "$", trend: "saved", description: "Example from pilot operators" },
  { title: "ROI Timeline", value: 30, suffix: " days", trend: "up", description: "Typical for early rollouts" }
];

export default function HomeContent() {
  const cta = useCta();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const resultsRef = useRef(null);

  const resultsInView = useInView(resultsRef, { once: true, margin: "-100px" });

  return (
    <MotionConfig reducedMotion="user">
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50/80 via-purple-50/30 to-blue-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="absolute inset-0 gradient-mesh opacity-10"></div>

        <div className="max-w-7xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gradient-to-r from-[#F25929] via-[#D200FF] to-[#0373FF] text-xs sm:text-sm md:text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-white/90" />
                <span>Decision Intelligence for Restaurants</span>
              </div>
            </div>
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
              See Every Layer. Miss Nothing.
            </h1>
            <p className="body-xl text-gray-600 dark:text-slate-300 leading-relaxed mb-8 max-w-3xl mx-auto">
              Sundae turns your POS, labor, and ops data into real-time intelligence — and combines it with market signals, competitor moves, and local events to help your team act on what matters, before it matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              <Button
                variant="primary"
                size="lg"
                href={SIGNUP_URL}
                onClick={() => cta(SIGNUP_URL, "start_free_report_hero", { page: "/home" })}
              >
                Start Free
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => cta("/demo", "book_demo_hero", { page: "/home" })}
              >
                Book a Demo
              </Button>
            </div>
            <p className="body-sm text-gray-500 dark:text-slate-400">
              Free forever on Report. No credit card required.
            </p>
          </motion.div>
        </div>

        {/* Hero Product Screenshot — perspective tilt */}
        <motion.div
          className="max-w-5xl mx-auto mt-12 relative z-20 px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ perspective: '1200px' }}
        >
          <motion.div
            initial={{ rotateX: 8, rotateY: -4, scale: 0.95 }}
            animate={{ rotateX: 4, rotateY: -2, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] rounded-xl"
          >
            <BrowserFrame
              src="/images/product/pulse-sales-pacing.png"
              alt="Sundae Pulse — real-time sales pacing, targets, and gap analysis"
              priority
              animate="none"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Product Pillars — 5 Core Capabilities */}
      <section aria-labelledby="what-is-sundae-heading" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950/90">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow text-slate-500 mb-4">
              PLATFORM
            </p>
            <h2 id="what-is-sundae-heading" className="section-h2 text-gray-900 dark:text-white mb-4">
              Five Pillars. One Source of Truth.
            </h2>
            <p className="body-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Available across two tiers — <strong>Report</strong> (free, historical) and <strong>Core</strong> (real-time). Start with what you need, scale as you grow.
            </p>
          </div>

          {/* Top row: 3 product tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {productPillars.slice(0, 3).map((pillar, index) => (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group cursor-pointer"
                onClick={() => cta(pillar.link, `view_${pillar.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "product-pillars" })}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={pillar.screenshot}
                      alt={pillar.screenshotAlt}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-slate-900/80 to-transparent" />
                    <span className={`absolute top-3 right-3 badge ${pillar.badgeClass} text-[10px]`}>
                      {pillar.badge}
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-deep-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={pillar.icon} size="md" className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{pillar.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{pillar.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                    <span className="btn-link text-sm" role="link">
                      Learn more
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom row: 2 intelligence pillars (centered) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {productPillars.slice(3).map((pillar, index) => (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group cursor-pointer"
                onClick={() => cta(pillar.link, `view_${pillar.name.toLowerCase().replace(/\s+/g, "_")}`, { page: "/home", section: "product-pillars" })}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={pillar.screenshot}
                      alt={pillar.screenshotAlt}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-slate-900/80 to-transparent" />
                    <span className={`absolute top-3 right-3 badge ${pillar.badgeClass} text-[10px]`}>
                      {pillar.badge}
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-deep-blue rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={pillar.icon} size="md" className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{pillar.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{pillar.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      {pillar.description}
                    </p>
                    <span className="btn-link text-sm" role="link">
                      Learn more
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => cta("/insights", "explore_modules", { page: "/home", section: "product-pillars" })}
            >
              Explore specialized modules →
            </Button>
          </div>
        </div>
      </section>

      {/* Pulse Deep Dive — Hero Moment */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow text-slate-500 mb-4">
                SPOTLIGHT: PULSE
              </p>
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                The Shift Runs Through Pulse
              </h2>
              <p className="body-lg text-gray-600 dark:text-gray-300 mb-6">
                Sales pacing with adaptive AI targets, real-time labor productivity and shift costing, server performance leaderboards, leakage detection, and AI coaching — all live, all shift-level. Pulse doesn&apos;t just tell you what happened. It learns your patterns, adjusts for seasonality, and sets targets that reflect your actual business rhythm.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  "Sales & Pace Tracking",
                  "Adaptive Intelligence Targets",
                  "Labor Productivity & Shift Costing",
                  "Server Performance Analytics",
                  "Leakage Monitoring",
                  "AI Shift Coach",
                  "Alerts & Playbooks",
                  "Shift Scorecard",
                  "Portfolio Leaderboard",
                  "Wallboard Mode"
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-electric-blue flex-shrink-0">&#10003;</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => cta("/product/pulse", "explore_pulse_home", { page: "/home", section: "pulse-spotlight" })}
              >
                Explore Pulse →
              </Button>
            </motion.div>

            <div>
              <BrowserFrame
                src="/images/product/pulse-wallboard.png"
                alt="Pulse Wallboard — dark-mode real-time operations display showing live sales, targets, and pacing"
                width={800}
                height={500}
                animate="slide-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How Sundae Works - 4 Steps */}
      <section aria-labelledby="how-it-works-heading" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950/90">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow text-slate-500 mb-4">
              HOW IT WORKS
            </p>
            <h2 id="how-it-works-heading" className="section-h2 text-gray-900 dark:text-white mb-4">
              Data In. Decisions Out.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              {
                step: "1",
                title: "Connect",
                subtitle: "Data unification",
                description: "Plug in POS, workforce, inventory, and external data. Sundae cleans and unifies it behind the scenes.",
                icon: "integration" as SundaeIconName,
                color: "from-blue-500 to-blue-600"
              },
              {
                step: "2",
                title: "Understand",
                subtitle: "Patterns, Anomalies & External Context",
                description: "AI agents scan internal performance, spot statistical outliers, detect seasonality patterns, and layer in external signals — weather, events, competitor moves, and market shifts — to separate noise from what actually matters.",
                icon: "insights" as SundaeIconName,
                color: "from-purple-500 to-purple-600"
              },
              {
                step: "3",
                title: "Decide",
                subtitle: "Recommendations, Targets & Playbooks",
                description: "Sundae suggests specific actions — from adaptive daily targets to staffing changes to server coaching — with explainable logic grounded in your data AND your market context.",
                icon: "aiOs" as SundaeIconName,
                color: "from-green-500 to-green-600"
              },
              {
                step: "4",
                title: "Improve",
                subtitle: "Feedback & learning",
                description: "Every decision and outcome makes Sundae smarter, so your playbooks and benchmarks keep getting better.",
                icon: "growth" as SundaeIconName,
                color: "from-orange-500 to-orange-600"
              }
            ]).map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="text-center mb-4">
                      <div className={`inline-flex w-14 h-14 bg-gradient-to-br ${step.color} rounded-full items-center justify-center text-white mb-3 shadow-lg`}>
                        <SundaeIcon name={step.icon} size="lg" className="text-white" />
                      </div>
                      <div className="text-lg font-bold text-gray-400 dark:text-gray-500 mb-1">Step {step.step}</div>
                      <CardTitle className="text-lg text-gray-900 dark:text-white mb-1">{step.title}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{step.subtitle}</p>
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed text-center text-sm">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Sundae is For */}
      <section aria-labelledby="who-its-for-heading" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow text-slate-500 mb-4">
              BUILT FOR
            </p>
            <h2 id="who-its-for-heading" className="section-h2 text-gray-900 dark:text-white mb-4">
              Every Role. One Platform.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {([
              {
                title: "Operations leaders",
                description: "See which locations need help right now — and why. Live sales pacing, labor productivity, and server performance across every outlet. Adaptive targets that adjust for seasonality. Morning briefings that combine your numbers with what\u2019s happening in your market.",
                icon: "operators" as SundaeIconName,
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Finance & FP&A",
                description: "Understand the story behind every variance. See shift-level labor costs broken down by role. Track productivity ratios in real time. Model targets with year-over-year baselines and growth modifiers before you commit.",
                icon: "finance" as SundaeIconName,
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "C-suite & owners",
                description: "Get a unified view of performance across brands, geographies, and partners — with competitive intelligence, market positioning, and AI-synthesized daily briefings so you know what\u2019s happening inside and outside your business.",
                icon: "owners" as SundaeIconName,
                color: "from-green-500 to-green-600"
              },
              {
                title: "Data & technology teams",
                description: "Clean data pipelines, governed metrics, and an opinionated intelligence layer that integrates internal POS data with external APIs — Google Places, weather, events, market signals — without your team becoming the bottleneck.",
                icon: "technology" as SundaeIconName,
                color: "from-orange-500 to-orange-600"
              }
            ]).map((audience, index) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start space-x-4 p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/70 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className={`w-12 h-12 bg-gradient-to-br ${audience.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-lg`}>
                    <SundaeIcon name={audience.icon} size="lg" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{audience.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{audience.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof & Results */}
      <section ref={resultsRef} aria-labelledby="trust-heading" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950/90 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow text-slate-500 mb-4">
              RESULTS
            </p>
            <h2 id="trust-heading" className="section-h2 text-gray-900 dark:text-white mb-4">
              Operators See Results Fast
            </h2>
            <p className="body-sm text-gray-500 dark:text-gray-400">
              Based on results reported by multi-location restaurant groups during early rollouts
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {decisionInsights.map((insight, index) => (
              <StatCard key={insight.title} insight={insight} index={index} isInView={resultsInView} prefersReducedMotion={prefersReducedMotion} />
            ))}
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200/70 dark:border-slate-700">
              <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-slate-50 leading-relaxed mb-4">
                &ldquo;Sundae surfaced a margin gap across our lunch dayparts in days. Our teams finally see where to take action, not just where numbers moved. The labor optimization recommendations alone paid for the platform in the first quarter.&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Verified Operator — Group CFO</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Multi-brand restaurant group</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-semibold text-sky-600 dark:text-sky-400">+9%</p>
                  <p className="text-xs text-slate-500">Margin opportunity detected</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              'GLOBAL HOTEL GROUP',
              'MULTI-BRAND OPERATOR',
              'FRANCHISE PLATFORM',
              'EARLY ADOPTER (125+ SITES)',
            ].map(label => (
              <span
                key={label}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Your Stack — Integrations Snapshot */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <BrowserFrame
                src="/images/product/core-integrations.png"
                alt="Sundae integrations hub showing 11-domain vendor connections with POS, labor, inventory, and delivery categories"
                width={800}
                height={500}
                animate="slide-left"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="eyebrow text-slate-500 mb-4">
                INTEGRATIONS
              </p>
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                Plugs Into What You Already Run
              </h2>
              <p className="body-lg text-gray-600 dark:text-gray-300 mb-6">
                11 data domains — POS, labor, inventory, delivery, reservations, and more — unified into one intelligence layer.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["POS", "Labor", "Inventory", "Delivery", "Reservations", "Marketing", "Guest Experience", "Accounting", "Purchasing", "Flow", "CRM"].map((domain) => (
                  <span key={domain} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
                    {domain}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => cta("/integrations", "view_integrations", { page: "/home", section: "integrations" })}
                >
                  View all integrations →
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-deep-blue to-electric-blue dark:from-deep-blue dark:to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            See What You're Missing
          </h2>
          <p className="body-lg mb-8 opacity-90 max-w-3xl mx-auto">
            A 15-minute walkthrough that changes how you run your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-deep-blue hover:bg-gray-100"
              onClick={() => cta("/demo", "book_demo_footer_cta", { page: "/home" })}
            >
              Book a Demo
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => cta(SIGNUP_URL, "get_report_footer_cta", { page: "/home" })}
            >
              Start Free →
            </Button>
          </div>
        </div>
      </section>
    </>
    </MotionConfig>
  );
}
