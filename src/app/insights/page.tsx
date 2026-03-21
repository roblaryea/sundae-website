'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";

export default function InsightsPage() {
  const cta = useCta();

  const modules: { name: string; icon: SundaeIconName; headline: string; description: string; capabilities: string[]; category: string; color: string }[] = [
    {
      name: "Revenue Intelligence",
      icon: "chart",
      headline: "Deep-Dive Into Sales. By Daypart. By Channel. By Item.",
      description: "Go beyond top-line revenue. Understand menu mix, daypart timing, channel segments, and revenue trends to identify exactly where growth is coming from — and where it's leaking.",
      capabilities: [
        "Menu mix and item-level analysis",
        "Daypart timing optimization",
        "Channel segment breakdown",
        "Revenue trend forecasting"
      ],
      category: "Core Operations",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      name: "Labor Intelligence",
      icon: "labor",
      headline: "Optimize Scheduling. Reduce Overtime. Forecast Demand.",
      description: "Transform labor from your biggest expense into your most optimized asset with AI-powered scheduling recommendations and demand forecasting.",
      capabilities: [
        "AI-recommended schedules",
        "Real-time labor cost tracking",
        "14-30 day demand forecasting",
        "Shift performance analysis",
        "Overtime early warnings"
      ],
      category: "Core Operations",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Inventory Intelligence",
      icon: "insights",
      headline: "Track Waste. Automate Par Levels. Optimize Costs.",
      description: "Turn inventory management from a daily headache into an optimized system with real-time tracking and automated recommendations.",
      capabilities: [
        "Real-time waste tracking",
        "Automated par level adjustments",
        "Recipe-level costing",
        "Vendor performance monitoring",
        "Inventory turn optimization"
      ],
      category: "Core Operations",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Purchasing Intelligence",
      icon: "cost",
      headline: "Compare Vendors. Optimize Prices. Manage Contracts.",
      description: "Stop overpaying. Purchasing Intelligence compares pricing across vendors, tracks contract compliance, and identifies savings opportunities.",
      capabilities: [
        "Vendor price comparison",
        "Contract compliance tracking",
        "Purchase pattern analysis",
        "Savings opportunity alerts"
      ],
      category: "Support",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Marketing Performance",
      icon: "marketing",
      headline: "Measure Campaigns. Attribute Revenue. Optimize Spend.",
      description: "Connect marketing spend to actual revenue impact. See which campaigns drive covers, which channels convert, and where to double down.",
      capabilities: [
        "Campaign-to-revenue attribution",
        "Channel performance tracking",
        "ROI analysis by campaign",
        "Promotional impact measurement"
      ],
      category: "Growth",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Reservations Intelligence",
      icon: "reservations",
      headline: "Predict No-Shows. Optimize Seating. Maximize Turns.",
      description: "Go beyond booking management. Predict no-shows, optimize table turns, and align front-of-house capacity with demand patterns.",
      capabilities: [
        "No-show prediction with AI scoring",
        "Table turn optimization",
        "Demand-based seating recommendations",
        "Walk-in vs. reservation analytics"
      ],
      category: "Support",
      color: "from-teal-500 to-teal-600"
    },
    {
      name: "Profit Intelligence",
      icon: "finance",
      headline: "See True Profitability. By Shift. By Menu Item. By Location.",
      description: "Combine revenue, labor, inventory, and overhead into a real-time profitability view. See which shifts, items, and locations actually make money.",
      capabilities: [
        "Real-time profit margin tracking",
        "Shift-level profitability analysis",
        "Menu item contribution analysis",
        "Location-level P&L intelligence"
      ],
      category: "Super Premium",
      color: "from-amber-500 to-amber-600"
    },
    {
      name: "Revenue Assurance",
      icon: "risk",
      headline: "Catch Leakage. Protect Margins. Prevent Loss.",
      description: "Automated detection of revenue leakage patterns — voids, discounts, refunds, and pricing anomalies — across your entire portfolio.",
      capabilities: [
        "Automated leakage pattern detection",
        "Pricing anomaly alerts",
        "Discount abuse identification",
        "Revenue protection scoring"
      ],
      category: "Protection",
      color: "from-red-500 to-red-600"
    },
    {
      name: "Delivery Intelligence",
      icon: "delivery",
      headline: "Track Platform Costs. Optimize Margins. Compare Channels.",
      description: "Understand the true economics of delivery across platforms. Track commissions, compare channel profitability, and optimize your delivery mix.",
      capabilities: [
        "Per-platform cost tracking",
        "Channel profitability comparison",
        "Commission impact analysis",
        "Delivery menu optimization"
      ],
      category: "Channel",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      name: "Guest Experience",
      icon: "success",
      headline: "Listen to Guests. Spot Trends. Act Fast.",
      description: "Aggregate guest feedback from reviews, surveys, and social mentions into a unified sentiment view with AI-powered trend detection.",
      capabilities: [
        "Multi-source review aggregation",
        "AI sentiment analysis",
        "Service quality trend tracking",
        "Guest satisfaction scoring"
      ],
      category: "Insight",
      color: "from-pink-500 to-pink-600"
    },
    {
      name: "Guest CRM Intelligence",
      icon: "operators",
      headline: "Know Your Guests. Retain Your Best. Win Back the Rest.",
      description: "Segment guests by value, track lifetime spend, monitor loyalty engagement, and detect churn risk — turning transactional data into lasting relationships.",
      capabilities: [
        "Guest segmentation and lifetime value",
        "Loyalty program analytics",
        "Churn risk detection and alerts",
        "Retention campaign triggers"
      ],
      category: "Insight",
      color: "from-rose-500 to-rose-600"
    },
    {
      name: "Cross-Intelligence",
      icon: "integration",
      headline: "Connect the Dots Across Every Domain.",
      description: "Automatically surfaces hidden correlations across all active modules — labor vs. revenue, inventory vs. waste, marketing vs. covers. Auto-enables when 3+ modules are active.",
      capabilities: [
        "Cross-domain correlation analysis",
        "Automated insight surfacing",
        "Attribution and cannibalization detection",
        "Multi-module health scoring"
      ],
      category: "Platform",
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  const whoItsFor: { icon: SundaeIconName; title: string; description: string }[] = [
    {
      icon: "owners",
      title: "Ops Leaders",
      description: "Deep-dive into specific operational domains without building custom reports"
    },
    {
      icon: "finance",
      title: "Finance & FP&A",
      description: "Profit intelligence, cost analysis, and revenue assurance in real time"
    },
    {
      icon: "regional",
      title: "Regional Managers",
      description: "Module-level performance visibility across every location in your territory"
    }
  ];

  const howItWorks: { step: number; title: string; description: string; icon: SundaeIconName }[] = [
    {
      step: 1,
      title: "Choose your modules",
      description: "Select the intelligence modules that match your operational priorities — labor, inventory, marketing, or all twelve.",
      icon: "modules"
    },
    {
      step: 2,
      title: "Connect your data",
      description: "Sundae integrates with your POS, labor, inventory, and operational systems to power each module with live data.",
      icon: "integration"
    },
    {
      step: 3,
      title: "Get domain-specific intelligence",
      description: "Each module delivers AI-powered analytics, recommendations, and alerts tailored to that operational area.",
      icon: "intelligence"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-4">SUNDAE INSIGHTS</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-h1 text-[var(--text-primary)] mb-6"
          >
            Go Deeper Into Every Part of Your Operation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="body-xl text-[var(--text-supporting)] mb-8 max-w-3xl mx-auto"
          >
            14 specialized modules — revenue, labor, inventory, purchasing, marketing, reservations, profit, delivery, guest experience, CRM, revenue assurance, cross-intelligence, foresight intelligence, and executive summary. Each one gives you AI-powered analytics for a specific operational domain.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => cta("/demo", "book_demo_insights_hero", { page: "/insights" })}
            >
              Book a Demo
            </Button>
            <Link href="/modules">
              <Button variant="outline" size="lg">
                See Module Pricing
              </Button>
            </Link>
          </motion.div>

          {/* Module Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
              {[
                { icon: "chart" as SundaeIconName, label: "Revenue" },
                { icon: "labor" as SundaeIconName, label: "Labor" },
                { icon: "insights" as SundaeIconName, label: "Inventory" },
                { icon: "cost" as SundaeIconName, label: "Purchasing" },
                { icon: "marketing" as SundaeIconName, label: "Marketing" },
                { icon: "reservations" as SundaeIconName, label: "Reservations" },
                { icon: "finance" as SundaeIconName, label: "Profit" },
                { icon: "risk" as SundaeIconName, label: "Rev. Assurance" },
                { icon: "delivery" as SundaeIconName, label: "Delivery" },
                { icon: "success" as SundaeIconName, label: "Guest Experience" },
                { icon: "operators" as SundaeIconName, label: "Guest CRM" },
                { icon: "integration" as SundaeIconName, label: "Cross-Intel" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.05) }}
                  className="bg-[var(--navy-deep)] rounded-xl p-3 text-center border border-[var(--border-default)] hover:border-white/[0.1] transition-colors"
                >
                  <div className="w-9 h-9 mx-auto mb-1.5 bg-slate-900 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={item.icon} size="sm" className="text-[var(--text-primary)]" />
                  </div>
                  <p className="text-[11px] font-medium text-[var(--text-supporting)]">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] border-b border-[var(--border-default)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-[var(--text-muted)]">
            <span className="font-medium">Add modules as you need them</span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="font-medium">AI-powered analytics per domain</span>
            <span className="text-[var(--text-muted)]">|</span>
            <span className="font-medium">Available on Core tiers</span>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-2">Who It&apos;s For</h2>
            <p className="body-lg text-[var(--text-supporting)]">Teams who need domain-specific depth, not just dashboards</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoItsFor.map((persona, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-[var(--surface-faint)] border border-[var(--border-default)]">
                <div className="w-11 h-11 mx-auto mb-3 bg-slate-900 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={persona.icon} size="md" className="text-[var(--text-primary)]" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{persona.title}</h3>
                <p className="text-sm text-[var(--text-supporting)]">{persona.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Modules Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              12 Modules. One Platform.
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              Each module delivers AI-powered analytics for a specific operational domain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="h-full bg-[var(--navy-deep)] rounded-2xl border border-[var(--border-default)] p-6 hover:border-white/[0.1] transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name={module.icon} size="md" className="text-[var(--text-primary)]" />
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--surface-subtle)] text-[var(--text-supporting)] uppercase tracking-wide">
                    {module.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">{module.name}</h3>
                <p className="text-xs font-medium text-[var(--text-secondary)] mb-2">{module.headline}</p>
                <p className="text-sm text-[var(--text-supporting)] leading-relaxed mb-4">
                  {module.description}
                </p>
                <ul className="space-y-1.5">
                  {module.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2 text-sm text-[var(--text-supporting)]">
                      <span className="text-[var(--text-muted)] mt-0.5 flex-shrink-0 text-xs">&#10003;</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              How It Works
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              Add modules to your Core subscription as your needs grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-supporting)] text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                <p className="text-sm text-[var(--text-supporting)]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fits the Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)] border-y border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--text-muted)] mb-4 block">HOW INSIGHTS FITS</span>
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                The Analytical Layer
              </h2>
              <p className="body-lg text-[var(--text-supporting)]">
                Pulse monitors your shift in real time. Watchtower tracks what&apos;s happening outside your walls. Insights modules go deeper — domain-specific dashboards for labor, inventory, purchasing, marketing, and more. Together, they form a complete intelligence stack.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { name: "Pulse", desc: "Real-time shift monitoring", icon: "pulse" as SundaeIconName },
                { name: "Watchtower", desc: "External market intelligence", icon: "watchtower" as SundaeIconName },
                { name: "Insights", desc: "Domain-specific analytical intelligence", icon: "insights" as SundaeIconName }
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-4 bg-[var(--navy-deep)] rounded-xl border border-[var(--border-default)]">
                  <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <SundaeIcon name={item.icon} size="md" className="text-[var(--text-primary)]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] text-sm">{item.name}</h4>
                    <p className="text-xs text-[var(--text-supporting)]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] text-[var(--text-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Start With What Matters Most
          </h2>
          <p className="body-xl mb-8 text-[var(--text-muted)]">
            Add the modules your operation needs. Scale as you grow. Every module available on Core tiers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-[var(--navy-deep)] text-[var(--text-primary)] hover:bg-[var(--surface-subtle)]"
              onClick={() => cta("/demo", "book_demo_insights_cta", { page: "/insights" })}
            >
              Book a Demo
            </Button>
            <Link href="/modules">
              <Button variant="outline-light" size="lg">
                See Module Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
