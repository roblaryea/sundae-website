'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";

export default function CoreProductPage() {
  const cta = useCta();

  const coreTiers = [
    {
      name: "Core Lite",
      badge: "Growing Operations",
      subtitle: "Real-Time Intelligence for 1-10 Locations",
      description: "Perfect for restaurant groups scaling from single-location to multi-location operations.",
      features: [
        "4-hour refresh (6x daily)",
        "600 base AI credits + 120/location",
        "30 custom dashboards",
        "2-year retention",
        "Single POS integration",
        "Email + Chat + Phone support"
      ],
      bestFor: "1-10 locations, single-brand portfolios",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Core Pro",
      badge: "Most Popular",
      subtitle: "Optimized for 10-50 Location Portfolios",
      description: "For established multi-location operators who need faster refresh cycles and advanced forecasting.",
      features: [
        "2-hour refresh (12x daily)",
        "1,200 base AI credits + 240/location",
        "75 custom dashboards",
        "3-year retention",
        "Multi-POS support",
        "Priority phone support (2hr SLA)"
      ],
      bestFor: "10-50 locations, multi-brand operators",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Enterprise",
      badge: "Custom Everything",
      subtitle: "Built for 100+ Locations or Enterprise Features",
      description: "For large-scale operations or any organization requiring enterprise features regardless of scale.",
      features: [
        "Custom refresh frequency",
        "Unlimited AI credits",
        "Unlimited dashboards",
        "Custom retention",
        "White-label, SSO, dedicated CSM",
        "24/7 support with custom SLAs"
      ],
      bestFor: "100+ locations, multi-brand enterprises",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const fourDimensions = [
    {
      dimension: "1D",
      title: "What Happened",
      status: "✓✓✓ Real-Time",
      description: "Complete operational truth, updated every 2-4 hours. Near real-time visibility for same-shift interventions.",
      icon: "report" as SundaeIconName,
      color: "from-blue-500 to-blue-600"
    },
    {
      dimension: "2D",
      title: "Plan vs. Actual",
      status: "✓✓✓ Real-Time",
      description: "Real-time budget variance tracking. Flash reporting for finance teams. Week-to-date and month-to-date visibility.",
      icon: "marketing" as SundaeIconName,
      color: "from-purple-500 to-purple-600"
    },
    {
      dimension: "3D",
      title: "Market Context",
      status: "✓✓✓ Expanded",
      description: "Full benchmarking suite (30+ metrics). Portfolio comparisons. Identify best and worst performers. Competitive context via Watchtower.",
      icon: "multiLocation" as SundaeIconName,
      color: "from-green-500 to-green-600"
    },
    {
      dimension: "4D",
      title: "What's Next",
      status: "✓✓✓ Expanded",
      description: "14-30 day forecasting. Proactive alerts before problems escalate. AI recommendations with confidence scores. Predictive scheduling.",
      icon: "growth" as SundaeIconName,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const modules = [
    { name: "Labor Intelligence", description: "Real-time schedule optimization, predictive labor demand", icon: "benchmarking" as SundaeIconName },
    { name: "Inventory Intelligence", description: "Real-time waste tracking, automated par levels", icon: "insights" as SundaeIconName },
    { name: "Purchasing Intelligence", description: "Real-time price optimization, vendor comparison", icon: "marketing" as SundaeIconName },
    { name: "Marketing Intelligence", description: "Real-time campaign tracking, CAC monitoring", icon: "growth" as SundaeIconName },
    { name: "Reservations Intelligence", description: "Real-time booking patterns, table optimization", icon: "operators" as SundaeIconName }
  ];

  const integrations = [
    { category: "POS Systems", examples: "Oracle MICROS Simphony, Square, Toast, Clover, plus direct database connectors", icon: "integration" as SundaeIconName },
    { category: "Labor/Workforce", examples: "7shifts, HotSchedules, Deputy", icon: "benchmarking" as SundaeIconName },
    { category: "Inventory & Purchasing", examples: "MarketMan, Craftable, BinWise", icon: "insights" as SundaeIconName },
    { category: "Accounting", examples: "QuickBooks, Xero, Sage, FreshBooks", icon: "finance" as SundaeIconName },
    { category: "Reservations", examples: "OpenTable, Resy, SevenRooms, Tock", icon: "operators" as SundaeIconName },
    { category: "Delivery & Marketing", examples: "Deliverect, Uber Eats, DoorDash, Meta, Google Ads, Mailchimp", icon: "marketing" as SundaeIconName }
  ];

  const faqs = [
    {
      q: "What's the difference between Core Lite and Core Pro?",
      a: "Core Lite: 4-hour refresh, 600 base AI credits, 30 dashboards, single POS. Core Pro: 2-hour refresh, 1,200 base AI credits, 75 dashboards, multi-POS support."
    },
    {
      q: "Can I upgrade from Report to Core?",
      a: "Yes! All historical data is preserved. Seamless transition with no data loss."
    },
    {
      q: "Do I need Core if I only have 5 locations?",
      a: "Not required, but recommended if you need operational speed (2-4 hour refresh). Report tier works great for 1-10 locations if daily reports are sufficient."
    },
    {
      q: "Can Core handle multiple POS systems?",
      a: "Core Pro and Enterprise support multi-POS environments. Core Lite supports single POS across all locations."
    },
    {
      q: "Can I use Core with Watchtower?",
      a: "Yes! Highly recommended. Core provides internal intelligence, Watchtower adds external market intelligence for complete visibility."
    },
    {
      q: "Can I use Core with Modules?",
      a: "Yes! All 5 specialized modules work with Core to deepen intelligence in specific operational areas."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/80 via-purple-50/30 to-blue-50/60">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-5 py-2.5 rounded-full text-base font-semibold mb-6">
              <SundaeIcon name="core" size="md" />
              <span>Sundae Core</span>
            </div>
            <h1 className="hero-h1 text-gray-900 mb-6">
              Know Now. Act Fast. Stay Ahead.
            </h1>
            <p className="body-xl text-gray-600 mb-4 max-w-4xl mx-auto">
              Near real-time operational intelligence with predictive alerts. Connect your systems and get the clarity to manage your operation in the moment — not at end-of-day.
            </p>
            <p className="body-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              <strong>Includes everything from Report tier, plus operational speed.</strong> 2-4 hour refresh cycles. Predictive forecasting. Proactive recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
                Explore Core Tiers
              </a>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">
                Calculate Your Savings
              </a>
            </div>
          </motion.div>

          <div className="mt-12 max-w-4xl mx-auto">
            <BrowserFrame
              src="/images/product/core-overview.png"
              alt="Sundae Core — real-time operational intelligence dashboard"
              priority
              animate="scale"
            />
          </div>
        </div>
      </section>

      {/* What is Sundae Core */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 mb-4">
              What is Sundae Core?
            </h2>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto">
              Sundae Core is your real-time operational intelligence layer — built for operators who can't wait for end-of-day reports. Whether you're managing 10 locations or 100+, Core gives you the speed to see what's happening now, understand why it matters, and get recommended actions before problems escalate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="forecasting" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Intelligence That Predicts</h3>
              <p className="text-sm text-gray-600">Not dashboards that update. Get alerts before problems become expensive with AI recommendations for immediate action.</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="multiLocation" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Built for Multi-Location</h3>
              <p className="text-sm text-gray-600">Unified view across all locations with portfolio-level insights and location-level detail.</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="performance" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Scales Infinitely</h3>
              <p className="text-sm text-gray-600">From 10 to 1,000+ locations. Core Lite, Core Pro, or Enterprise — scale as you grow.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              CHOOSE YOUR TIER
            </p>
            <h2 className="section-h2 text-gray-900 mb-4">
              Three Tiers for Every Scale
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              From growing operations to global enterprises. Pick your speed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
              >
                <Card variant="elevated" className="h-full hover:shadow-2xl transition-all duration-300 relative">
                  {tier.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className={`px-4 py-1 bg-gradient-to-r ${tier.color} text-white text-xs font-semibold rounded-full shadow-lg`}>
                        {tier.badge}
                      </span>
                    </div>
                  )}
                  <CardHeader className="pt-8">
                    <CardTitle className="text-2xl text-gray-900 mb-2">{tier.name}</CardTitle>
                    <p className="text-sm font-semibold text-gray-700 mb-3">{tier.subtitle}</p>
                    <CardDescription className="text-gray-600 leading-relaxed mb-6">
                      {tier.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-gray-50 rounded-lg mb-6">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Best for:</p>
                      <p className="text-sm text-gray-700">{tier.bestFor}</p>
                    </div>
                    <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
                      <Button variant="primary" size="lg" className="w-full">
                        See {tier.name}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4D Intelligence Model for Core */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              The 4D Intelligence Model (Core Tier)
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Core delivers: <span className="font-semibold text-green-600">All 4D Expanded</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fourDimensions.map((dim, index) => (
              <motion.div
                key={dim.dimension}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="text-center mb-4">
                      <div className={`inline-flex w-16 h-16 bg-gradient-to-br ${dim.color} rounded-full items-center justify-center text-white mb-3 shadow-lg`}>
                        <SundaeIcon name={dim.icon} size="xl" className="text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{dim.dimension}</div>
                      <CardTitle className="text-lg text-gray-900 mb-2">{dim.title}</CardTitle>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        {dim.status}
                      </span>
                    </div>
                    <CardDescription className="text-gray-600 leading-relaxed text-center text-sm">
                      {dim.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pulse — Real-Time Operations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <SundaeIcon name="pulse" size="md" />
              <span>Included with Core</span>
            </div>
            <h2 className="section-h2 text-gray-900 mb-4">
              Pulse: Intraday Operations Monitor
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Detect, act, and confirm within the shift. Pulse monitors your operations in real time and coaches your team when things go off-track.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <BrowserFrame
              src="/images/product/pulse-scorecard.png"
              alt="Pulse scorecard — intraday operations monitoring"
              width={1000}
              height={600}
              animate="scale"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {([
              { name: "Sales & Pace", description: "Intraday sales pacing, KPIs, and hourly trend visualization", icon: "chart" as SundaeIconName },
              { name: "Labor Live", description: "Intraday labor pacing, overtime risk tracking, and break compliance", icon: "benchmarking" as SundaeIconName },
              { name: "Leakage Monitoring", description: "Real-time void, comp, and discount monitoring per shift", icon: "cost" as SundaeIconName },
              { name: "Service Speed & Flow", description: "Throughput bottlenecks, backlog, and kitchen pacing metrics", icon: "speed" as SundaeIconName },
              { name: "Menu Intelligence", description: "Item catalog, classification matrix (Stars/Plowhorses/Puzzles/Dogs)", icon: "insights" as SundaeIconName },
              { name: "Alerts & Playbooks", description: "Automated response workflows triggered by exceptions", icon: "forecasting" as SundaeIconName },
              { name: "AI Coach", description: "Shift-level coaching signals for Sales, Leakage, and Flow", icon: "intelligence" as SundaeIconName },
              { name: "Portfolio Leaderboard", description: "Multi-outlet performance comparison with streak tracking", icon: "multiLocation" as SundaeIconName },
              { name: "Wallboard Mode", description: "Full-screen display for kitchen or front-of-house screens", icon: "canvas" as SundaeIconName }
            ]).map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    <SundaeIcon name={feature.icon} size="md" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{feature.name}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Connect All Your Systems
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Core connects across 11 data domains with 30+ vendor integrations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={integration.icon} size="md" className="text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{integration.category}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{integration.examples}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Modules */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Add Modules for Specialized Intelligence
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Enhance Core with focused modules for your specific operational challenges
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {modules.map((module, index) => (
              <motion.div
                key={module.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-start space-x-3 p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 h-full">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    <SundaeIcon name={module.icon} size="md" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{module.name}</h3>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => cta("/modules", "explore_modules_from_core", { page: "/core-product" })}
            >
              Explore All Modules →
            </Button>
          </div>
        </div>
      </section>

      {/* Core + Watchtower */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <SundaeIcon name="watchtower" size="xl" className="text-white" />
          </div>
          <h2 className="section-h2 mb-6">
            Core + Watchtower = Complete Intelligence
          </h2>
          <p className="body-xl mb-4 opacity-90 max-w-3xl mx-auto">
            <strong>Core answers:</strong> "How are WE performing RIGHT NOW?"
          </p>
          <p className="body-xl mb-8 opacity-90 max-w-3xl mx-auto">
            <strong>Watchtower answers:</strong> "What's HAPPENING in the MARKET?"
          </p>
          <p className="text-lg mb-8 opacity-80">
            Combine Core's real-time internal intelligence with Watchtower's external market intelligence: Your real-time sales + competitor pricing. Your labor trends + local events. Your guest counts + market demand shifts.
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => cta("/watchtower", "learn_watchtower_from_core", { page: "/core-product" })}
          >
            Learn About Watchtower →
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => cta("/faq", "see_more_faqs", { page: "/core-product" })}
            >
              See More FAQs →
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 mb-6">
            See Core in Action
          </h2>
          <p className="body-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience real-time operational intelligence with your own data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="cost" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Calculate ROI</h3>
              <p className="text-sm text-gray-600 mb-4">Interactive simulator with your numbers</p>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="primary" size="md" className="w-full">
                  Calculate ROI →
                </Button>
              </a>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="chart" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compare Tiers</h3>
              <p className="text-sm text-gray-600 mb-4">See Lite vs Pro vs Enterprise</p>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" size="md" className="w-full">
                  Compare Tiers →
                </Button>
              </a>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="visibility" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Book a Demo</h3>
              <p className="text-sm text-gray-600 mb-4">Custom walkthrough with your data</p>
              <Button 
                variant="outline" 
                size="md"
                className="w-full"
                onClick={() => cta("/demo", "book_demo_from_core", { page: "/core-product" })}
              >
                Book Demo →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
