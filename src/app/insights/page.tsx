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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <SundaeIcon name="insights" size="md" />
              <span>Sundae Insights — Intelligence Modules</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              Deep-Dive Intelligence
              <br />
              <span className="text-gradient">For Every Domain</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              Sundae Insights extends the platform with 12 specialized intelligence modules — revenue, labor, inventory, purchasing, marketing, reservations, profit, revenue assurance, delivery, guest experience, guest CRM, and cross-intelligence — each delivering AI-powered analytics for its operational domain.
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
                className="animate-pulse-glow"
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
          </div>

          {/* Module Categories Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <p className="text-center text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wide">
              12 Intelligence Modules
            </p>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {[
                { icon: "chart" as SundaeIconName, label: "Revenue" },
                { icon: "labor" as SundaeIconName, label: "Labor" },
                { icon: "insights" as SundaeIconName, label: "Inventory" },
                { icon: "cost" as SundaeIconName, label: "Purchasing" },
                { icon: "marketing" as SundaeIconName, label: "Marketing" },
                { icon: "reservations" as SundaeIconName, label: "Reservations" },
                { icon: "finance" as SundaeIconName, label: "Profit" },
                { icon: "risk" as SundaeIconName, label: "Revenue Assurance" },
                { icon: "delivery" as SundaeIconName, label: "Delivery" },
                { icon: "success" as SundaeIconName, label: "Guest Experience" },
                { icon: "operators" as SundaeIconName, label: "Guest CRM" },
                { icon: "integration" as SundaeIconName, label: "Cross-Intelligence" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.05) }}
                  className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={item.icon} size="md" className="text-white" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Add the modules you need — scale as you grow
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <SundaeIcon name="speed" size="md" className="text-blue-600" />
                <span className="font-semibold">AI-powered analytics per domain</span>
              </div>
              <div className="flex items-center space-x-2">
                <SundaeIcon name="finance" size="md" className="text-blue-600" />
                <span className="font-semibold">From $89/mo per module</span>
              </div>
              <div className="flex items-center space-x-2">
                <SundaeIcon name="performance" size="md" className="text-blue-600" />
                <span className="font-semibold">Available on Core tiers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 mb-2">Who It&apos;s For</h2>
            <p className="text-gray-600">Built for teams who need domain-specific intelligence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoItsFor.map((persona, index) => (
              <Card key={index} variant="elevated" className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={persona.icon} size="lg" className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{persona.title}</h3>
                <p className="text-sm text-gray-600">{persona.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence Modules Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Intelligence Modules
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Each module adds specialized analytical intelligence for a specific operational domain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <SundaeIcon name={module.icon} size="lg" className="text-white" />
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-700">
                        {module.category}
                      </span>
                    </div>
                    <CardTitle className="text-gray-900 mb-1 text-lg">{module.name}</CardTitle>
                    <p className="text-sm font-medium text-gray-700 mb-2">{module.headline}</p>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed mb-4">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5">
                      {module.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-blue-500 mt-0.5 flex-shrink-0">&#10003;</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Add modules to your Core subscription for domain-specific intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={step.icon} size="lg" className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fits the Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow text-blue-600 mb-4">HOW INSIGHTS FITS</p>
              <h2 className="section-h2 text-gray-900 mb-6">
                The Analytical Layer of Sundae
              </h2>
              <p className="body-lg text-gray-600">
                Pulse gives you real-time shift monitoring. Watchtower gives you external intelligence. Insights modules go deeper — providing domain-specific analytical dashboards for labor, inventory, purchasing, marketing, and more. Together, they form a complete intelligence stack for restaurant operations.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { name: "Pulse", desc: "Real-time shift monitoring", icon: "pulse" as SundaeIconName, color: "from-red-500 to-orange-600" },
                { name: "Watchtower", desc: "External market intelligence", icon: "watchtower" as SundaeIconName, color: "from-emerald-500 to-emerald-600" },
                { name: "Insights Modules", desc: "Domain-specific analytical intelligence", icon: "insights" as SundaeIconName, color: "from-blue-500 to-blue-600" }
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <SundaeIcon name={item.icon} size="md" className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Add the Intelligence Your Operations Need
          </h2>
          <p className="body-xl mb-8 opacity-90">
            Start with the modules that matter most. Add more as you grow. Every module available on Core tiers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
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
