'use client';

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { REPORT_APP_URL } from "@/lib/urls";

const pillars: {
  name: string;
  tagline: string;
  description: string;
  icon: SundaeIconName;
  screenshot: string;
  screenshotAlt: string;
  features: string[];
  link: string;
  status: "live" | "coming-soon";
  color: string;
}[] = [
  {
    name: "Pulse",
    tagline: "Intraday Operations Monitor",
    description: "Real-time sales pacing, labor tracking, leakage detection, menu intelligence, and AI coaching — shift by shift, outlet by outlet. The operational nerve center for multi-unit operators.",
    icon: "pulse",
    screenshot: "/images/product/pulse-scorecard.png",
    screenshotAlt: "Pulse shift scorecard showing revenue, covers, top items, and server performance",
    features: ["Sales & Pace Tracking", "Labor Live", "Leakage Monitoring", "AI Coach", "Alerts & Playbooks", "Shift Scorecard", "Portfolio Leaderboard", "Wallboard Mode"],
    link: "/product/pulse",
    status: "live",
    color: "from-red-500 to-rose-600"
  },
  {
    name: "Benchmarks",
    tagline: "Competitive Intelligence",
    description: "Compare your performance against anonymized peer data. RevPASH Index, seat occupancy, average check, and revenue indexes — with trend analysis and AI-generated insights.",
    icon: "benchmarking",
    screenshot: "/images/product/benchmark-overview.png",
    screenshotAlt: "Benchmark dashboard with RevPASH Index, seat occupancy, and competitive comparison",
    features: ["RevPASH & Revenue Indexes", "Compset Comparisons", "Performance Trends", "Revenue Forecasting", "Market Intelligence", "AI Priority Insights"],
    link: "/benchmarking",
    status: "live",
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Watchtower",
    tagline: "External Market Intelligence",
    description: "See outside your four walls. Monitor competitor activity, weather revenue impact, local events, and market signals. Get AI-powered daily briefings that connect external context to your operations.",
    icon: "watchtower",
    screenshot: "/images/product/watchtower.png",
    screenshotAlt: "Watchtower command center with weather impact, events, and competitor tracking",
    features: ["Competitor Tracking", "Weather Revenue Impact", "Event Calendar", "AI Briefings", "Signal Feed", "Market Trends"],
    link: "/product/watchtower",
    status: "live",
    color: "from-amber-500 to-orange-600"
  },
  {
    name: "Insights",
    tagline: "Intelligence Modules",
    description: "Specialized analytical dashboards for every operational domain. Start with Performance Report, then add Revenue, Labor, Inventory, Purchasing, Marketing, and more as you grow.",
    icon: "insights",
    screenshot: "/images/product/core-insights-hub.png",
    screenshotAlt: "Insights hub showing 13 intelligence modules including Performance Report, Revenue, Labor, and Inventory",
    features: ["Performance Report (Live)", "Revenue Intelligence", "Labor Intelligence", "Inventory Intelligence", "Purchasing Intelligence", "Marketing Performance"],
    link: "/insights",
    status: "live",
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Chat with Data",
    tagline: "Conversational Analytics",
    description: "Ask questions in natural language and get answers backed by your real operational data. Available on web, Telegram, Slack, and Microsoft Teams — wherever your team already works.",
    icon: "conversation",
    screenshot: "/images/product/chat-with-data.png",
    screenshotAlt: "Chat with Data interface showing natural language querying with suggested questions",
    features: ["Natural Language Queries", "Web + Telegram + Slack + Teams", "Conversation History", "Scheduled Queries", "Multi-Outlet Scope", "AI Credit System"],
    link: "/chat-with-data",
    status: "live",
    color: "from-green-500 to-emerald-600"
  },
];

export default function ProductPage() {
  const cta = useCta();
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              THE SUNDAE PLATFORM
            </p>
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
              Decision Intelligence for Restaurants
            </h1>
            <p className="body-xl text-gray-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Five intelligence pillars that turn fragmented data into operational clarity. Start free with Report, scale to real-time intelligence with Core.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                size="lg"
                href={REPORT_APP_URL}
                onClick={() => cta(REPORT_APP_URL, "start_free_product_hero", { page: "/product" })}
              >
                Start Free with Report
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => cta("/demo", "book_demo_product_hero", { page: "/product" })}
              >
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Tiers — Report vs Core */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Two Product Tiers
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300">
              Choose historical analysis or real-time operations — or both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Report Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="elevated" className="h-full overflow-hidden border-2 border-blue-200 dark:border-blue-800">
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="/images/product/benchmark-overview.png"
                    alt="Sundae Report benchmarking dashboard"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
                  <span className="absolute top-3 right-3 badge badge--free text-[10px]">FREE FOREVER</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sundae Report</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3">Historical Analysis & Benchmarking</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Upload your data and instantly see where you stand. Performance benchmarking, margin analysis, and historical patterns — free to start.
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Includes:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 mb-6">
                    <li className="flex items-center gap-2"><span className="text-blue-500">&#10003;</span> Benchmarks (competitive intelligence)</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">&#10003;</span> Performance Report</li>
                    <li className="flex items-center gap-2"><span className="text-blue-500">&#10003;</span> Chat with Data</li>
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
              <Card variant="elevated" className="h-full overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image
                    src="/images/product/core-overview.png"
                    alt="Sundae Core operational dashboard"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
                  <span className="absolute top-3 right-3 badge badge--popular text-[10px]">MOST POPULAR</span>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sundae Core</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-3">Real-Time Operations & Predictions</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    Everything in Report, plus real-time intelligence. Pulse monitoring, predictive alerts, AI coaching, and Watchtower market signals.
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Everything in Report, plus:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 mb-6">
                    <li className="flex items-center gap-2"><span className="text-purple-500">&#10003;</span> Pulse (intraday operations)</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">&#10003;</span> Watchtower (market intelligence)</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">&#10003;</span> Intelligence Modules</li>
                    <li className="flex items-center gap-2"><span className="text-purple-500">&#10003;</span> AI Coach & Playbooks</li>
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

      {/* All Product Pillars */}
      <section ref={gridRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              PRODUCT PILLARS
            </p>
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Five Pillars of Decision Intelligence
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Each pillar handles a distinct dimension of your operations. Together, they form a complete decision intelligence platform.
            </p>
          </div>

          <div className="space-y-16">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.name}
                initial={{ opacity: 0, y: 30 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                  {/* Screenshot */}
                  <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                    <div className="rounded-xl overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-700 group">
                      <Image
                        src={pillar.screenshot}
                        alt={pillar.screenshotAlt}
                        width={800}
                        height={500}
                        className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${pillar.color} rounded-xl flex items-center justify-center`}>
                        <SundaeIcon name={pillar.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{pillar.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{pillar.tagline}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {pillar.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="text-electric-blue flex-shrink-0">&#10003;</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cta(pillar.link, `view_${pillar.name.toLowerCase().replace(/\s+/g, "_")}_product`, { page: "/product" })}
                    >
                      Learn more →
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features — Integrations + Crew */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              PLATFORM
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Also Included
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/70 dark:border-slate-700">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <SundaeIcon name="integration" size="lg" className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Integrations Hub</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">11-Domain Data Engine</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Connect POS, labor, inventory, delivery, and more. Health monitoring, activity logs, and webhook support included.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200/70 dark:border-slate-700">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <SundaeIcon name="operators" size="lg" className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">Crew</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">Organization & Team Management</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Multi-restaurant hierarchy, role-based access control, departments, teams, and billing management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            See the Full Platform in Action
          </h2>
          <p className="body-lg mb-8 opacity-90">
            A 15-minute walkthrough of Pulse, Benchmarks, Chat with Data, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => cta("/demo", "book_demo_product_cta", { page: "/product" })}
            >
              Book a Demo
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => cta(REPORT_APP_URL, "start_free_product_cta", { page: "/product" })}
            >
              Start Free with Report →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
