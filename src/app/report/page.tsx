'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL, PRICING_URL } from "@/lib/urls";

export default function ReportProductPage() {
  const cta = useCta();

  const reportTiers = [
    {
      name: "Report Lite",
      badge: "Free Forever",
      subtitle: "Test Sundae. Prove the Value. Pay Nothing.",
      description: "Perfect for operators who want to test Sundae before committing, or small operations that just need basic benchmarking.",
      features: [
        "Manual CSV upload",
        "Benchmark 5 core metrics",
        "400 AI credits/month",
        "90-day retention",
        "20 pre-built visuals",
        "Email support (72hr response)"
      ],
      bestFor: "Testing, proof of concept, single-location cafés",
      color: "from-purple-400 to-purple-600",
      cta: "Start Free",
      link: "/report"
    },
    {
      name: "Report Plus",
      badge: "Most Popular",
      subtitle: "AI-Powered Analysis. Automated Insights.",
      description: "For serious operators who want advanced benchmarking and AI-powered insights without real-time complexity.",
      features: [
        "AI-parsed uploads (PDF, Excel, screenshots)",
        "Benchmark 15 metrics",
        "1,500 AI credits/month",
        "1-year retention",
        "50 comprehensive visuals",
        "Email + Chat support (24hr response)"
      ],
      bestFor: "Single-location upscale, small multi-location (2-5)",
      color: "from-purple-500 to-purple-600",
      cta: "See Report Plus",
      link: PRICING_URL
    },
    {
      name: "Report Pro",
      badge: "Maximum Intelligence",
      subtitle: "Full Automation. API Integration.",
      description: "For multi-location operators preparing to scale with zero manual work and maximum historical intelligence.",
      features: [
        "Fully automated API integration",
        "Benchmark 30 metrics",
        "4,000 AI credits/month",
        "2-year retention",
        "Up to 120 visuals",
        "Priority support (12hr response)"
      ],
      bestFor: "Multi-location groups (5-20), portfolio managers",
      color: "from-orange-500 to-orange-600",
      cta: "See Report Pro",
      link: PRICING_URL
    }
  ];

  const fourDimensions = [
    {
      dimension: "1D",
      title: "What Happened",
      status: "✓ Full",
      description: "Complete POS historical data. Sales, covers, revenue, transactions — unified from your point-of-sale system.",
      icon: "report" as SundaeIconName,
      color: "from-blue-500 to-blue-600"
    },
    {
      dimension: "2D",
      title: "Plan vs. Actual",
      status: "✓ Full",
      description: "Budget variance analysis, forecast vs actual comparisons, target tracking across locations.",
      icon: "marketing" as SundaeIconName,
      color: "from-purple-500 to-purple-600"
    },
    {
      dimension: "3D",
      title: "Market Context",
      status: "Limited",
      description: "Basic benchmarking against similar restaurants (5-30 metrics depending on tier). For expanded market intelligence and competitive analysis, upgrade to Core.",
      icon: "multiLocation" as SundaeIconName,
      color: "from-green-500 to-green-600"
    },
    {
      dimension: "4D",
      title: "What's Next",
      status: "✓ Limited",
      description: "AI pattern recognition, anomaly detection, basic recommendations. For expanded predictive intelligence, see Core tier.",
      icon: "growth" as SundaeIconName,
      color: "from-orange-500 to-orange-600"
    }
  ];

  const upgradeSignals = [
    {
      title: "Need Operational Speed",
      description: "Daily reports aren't fast enough — you need 2-4 hour refresh cycles to act during shifts.",
      icon: "speed" as SundaeIconName
    },
    {
      title: "Need Detailed POS Insights",
      description: "Menu item-level analysis, daypart breakdowns, server performance tracking.",
      icon: "menu" as SundaeIconName
    },
    {
      title: "Want System Integrations",
      description: "Labor, Inventory, Marketing, Reservations, Purchasing — integrate all operational systems.",
      icon: "integration" as SundaeIconName
    },
    {
      title: "Scaling to 10+ Locations",
      description: "Coordination complexity increases and real-time performance matters for intervention.",
      icon: "multiLocation" as SundaeIconName
    }
  ];

  const modules = [
    { name: "Labor Intelligence", description: "Schedule optimization, overtime reduction", icon: "benchmarking" as SundaeIconName },
    { name: "Inventory Intelligence", description: "Waste tracking, par levels", icon: "insights" as SundaeIconName },
    { name: "Purchasing Intelligence", description: "Vendor comparison, contracts", icon: "marketing" as SundaeIconName },
    { name: "Marketing Intelligence", description: "Campaign ROI, CAC tracking", icon: "growth" as SundaeIconName },
    { name: "Reservations Intelligence", description: "Booking patterns, no-shows", icon: "operators" as SundaeIconName }
  ];

  const faqs = [
    {
      q: "Is Report Lite really free forever?",
      a: "Yes. No credit card required. No commitment. Fair-use policy applies for reasonable operational usage."
    },
    {
      q: "Can I upgrade tiers later?",
      a: "Absolutely. Move between Report Lite, Plus, and Pro anytime. All historical data is preserved."
    },
    {
      q: "How do I get my data into Sundae?",
      a: "Report Lite: Upload CSV files. Report Plus: Upload PDFs/Excel/screenshots (we parse). Report Pro: API integration (automated)."
    },
    {
      q: "How is Report different from Core?",
      a: "Report = historical analysis (daily/weekly summaries). Core = near real-time operations (2-4 hour refresh). Report is perfect for analyzing the past. Core adds operational speed, system integrations (Labor, Inventory, etc.), modules, and Watchtower external intelligence."
    },
    {
      q: "When should I upgrade from Report to Core?",
      a: "When you need operational speed (2-4 hour refresh), detailed POS insights, system integrations, modules for specialized intelligence, or Watchtower for external market intelligence. Core is for operators who need to act during shifts with real-time data."
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
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-5 py-2.5 rounded-full text-base font-semibold mb-6">
              <SundaeIcon name="report" size="md" />
              <span>Sundae Report</span>
            </div>
            <h1 className="hero-h1 text-gray-900 mb-6">
              Turn Historical Data into Strategic Clarity
            </h1>
            <p className="body-xl text-gray-600 mb-4 max-w-4xl mx-auto">
              Upload your operational data and instantly understand where you stand. Compare performance against similar restaurants, identify margin opportunities, and build the case for real-time intelligence.
            </p>
            <p className="body-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              Start with Report Lite — free forever. No credit card. No commitment. Just upload your POS data and see where you rank.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href={REPORT_APP_URL} onClick={() => cta(REPORT_APP_URL, "start_free_benchmark", { page: "/report-product" })} className="btn-primary btn-lg">
                Start Free Benchmark
              </a>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-lg">
                See Report Tier Options
              </a>
            </div>
          </motion.div>

          <div className="mt-12 max-w-4xl mx-auto">
            <BrowserFrame
              src="/images/product/benchmark-overview.png"
              alt="Sundae Report — benchmarking and historical intelligence dashboard"
              priority
              animate="scale"
            />
          </div>
        </div>
      </section>

      {/* What is Sundae Report */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 mb-4">
              What is Sundae Report?
            </h2>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto">
              Sundae Report is your historical intelligence layer — the foundation of decision intelligence for restaurants. Whether you're testing Sundae for the first time or running deep historical analysis across dozens of locations, Report gives you the clarity to understand what happened, why it matters, and where you stand against the market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="intelligence" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Decision Intelligence</h3>
              <p className="text-sm text-gray-600">Not just dashboards. We tell you what the numbers mean and what to do about them.</p>
            </div>
            <div className="text-center p-6 bg-purple-50/70 rounded-xl">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="benchmarking" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real Benchmarking</h3>
              <p className="text-sm text-gray-600">Compare against restaurants like yours — not generic industry averages.</p>
            </div>
            <div className="text-center p-6 bg-purple-50/50 rounded-xl">
              <div className="text-3xl mb-3">🆓</div>
              <h3 className="font-semibold text-gray-900 mb-2">Start Free</h3>
              <p className="text-sm text-gray-600">Report Lite costs nothing, forever. Prove the value before you pay.</p>
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
              Three Tiers for Every Stage
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Start free. Upgrade when it makes sense. Scale as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reportTiers.map((tier, index) => (
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
                    {tier.link.startsWith('http') ? (
                      <a href={tier.link} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="primary" size="lg" className="w-full">
                          {tier.cta}
                        </Button>
                      </a>
                    ) : (
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full"
                        onClick={() => cta(tier.link, `explore_${tier.name.toLowerCase().replace(/\s+/g, '_')}`, { page: "/report-product" })}
                      >
                        {tier.cta}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4D Intelligence Model for Report */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              The 4D Intelligence Model (Report Tier)
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Report delivers: <span className="font-semibold text-green-600">Full (1D + 2D)</span> + <span className="font-semibold text-blue-600">Limited (3D + 4D)</span>
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
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${dim.status.includes('Full') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
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

      {/* When to Upgrade to Core */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              When to Upgrade from Report to Core
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Signs you're ready for real-time intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {upgradeSignals.map((signal, index) => (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    <SundaeIcon name={signal.icon} size="lg" className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{signal.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{signal.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => cta("/core", "explore_core_upgrade", { page: "/report-product" })}
            >
              Compare Report vs Core →
            </Button>
          </div>
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
              onClick={() => cta("/faq", "see_more_faqs", { page: "/report-product" })}
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
            Start Your Free Benchmark Today
          </h2>
          <p className="body-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Upload your operational data and see instant results. No credit card. No commitment. No risk.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-3xl mb-3">🆓</div>
              <h3 className="font-semibold text-gray-900 mb-2">Start Free</h3>
              <p className="text-sm text-gray-600 mb-4">Upload CSV, get instant benchmark</p>
              <Button 
                variant="primary" 
                size="md"
                className="w-full"
                onClick={() => cta(REPORT_APP_URL, "start_free_final_cta", { page: "/report-product" })}
              >
                Start Free →
              </Button>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="chart" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Explore Tiers</h3>
              <p className="text-sm text-gray-600 mb-4">See Plus and Pro capabilities</p>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button 
                  variant="outline" 
                  size="md"
                  className="w-full"
                >
                  Compare Tiers →
                </Button>
              </a>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="visibility" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Book a Demo</h3>
              <p className="text-sm text-gray-600 mb-4">See Report with your data</p>
              <Button 
                variant="outline" 
                size="md"
                className="w-full"
                onClick={() => cta("/demo", "book_demo_from_report", { page: "/report-product" })}
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
