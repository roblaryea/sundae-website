'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL, PRICING_URL } from "@/lib/urls";

export default function ReportVsCorePage() {
  const cta = useCta();

  const comparisonData = [
    {
      category: "Data Refresh",
      report: "Daily / Weekly / Monthly",
      reportDetail: "Perfect for strategic planning and historical analysis",
      core: "2-4 Hour Cycles",
      coreDetail: "Near real-time for operational decisions",
      icon: "speed" as SundaeIconName
    },
    {
      category: "Intelligence Dimensions",
      report: "1D + 2D + 4D (Limited)",
      reportDetail: "Full historical data, budget variance, basic predictions",
      core: "Full 4D (All Expanded)",
      coreDetail: "Real-time data + predictions + market context + recommendations",
      icon: "intelligence" as SundaeIconName
    },
    {
      category: "Data Sources",
      report: "POS Only",
      reportDetail: "Sales, revenue, covers from point-of-sale system",
      core: "POS + All Systems",
      coreDetail: "POS + Labor + Inventory + Marketing + Reservations + Purchasing",
      icon: "integration" as SundaeIconName
    },
    {
      category: "Primary Use Cases",
      report: "Strategic Analysis",
      reportDetail: "Historical trends, benchmarking, long-term planning",
      core: "Operational Decisions",
      coreDetail: "Real-time management, proactive alerts, daily operations",
      icon: "insights" as SundaeIconName
    },
    {
      category: "Best For",
      report: "1-5 Locations",
      reportDetail: "Proof of concept, testing Sundae, strategic analysis",
      core: "10+ Locations",
      coreDetail: "Operations requiring speed, multi-location portfolios",
      icon: "multiLocation" as SundaeIconName
    }
  ];

  const decisionTree = [
    {
      question: "Need operational speed?",
      yesAnswer: "Core",
      yesReason: "2-4 hour refresh for same-shift decisions",
      noAnswer: "Report",
      noReason: "Daily reports sufficient for strategic planning"
    },
    {
      question: "Need detailed POS insights + other systems?",
      yesAnswer: "Core",
      yesReason: "Integrates Labor, Inventory, Marketing, Reservations, Purchasing",
      noAnswer: "Report",
      noReason: "POS-only data meets your needs"
    },
    {
      question: "Managing 10+ locations?",
      yesAnswer: "Core",
      yesReason: "Multi-location coordination requires real-time visibility",
      noAnswer: "Report",
      noReason: "1-5 locations work well with historical analysis"
    },
    {
      question: "Want to test Sundae first?",
      yesAnswer: "Report",
      yesReason: "Start free with Report Lite, upgrade when ready",
      noAnswer: "Core",
      noReason: "Go real-time from day one"
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
              <SundaeIcon name="balance" size="md" />
              <span>Product Comparison</span>
            </div>
            <h1 className="hero-h1 text-gray-900 mb-6">
              Report vs Core: Choose Your Tier
            </h1>
            <p className="body-xl text-gray-600 mb-4 max-w-4xl mx-auto">
              Both tiers deliver decision intelligence. The difference? Speed and depth.
            </p>
            <p className="body-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              Report = historical analysis. Core = real-time operations. Choose based on how fast you need to act.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  See Exact Pricing
                </Button>
              </a>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => cta(REPORT_APP_URL, "start_free_from_comparison", { page: "/report-vs-core" })}
              >
                Start Free with Report
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Summary Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Report Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card variant="elevated" className="h-full border-2 border-blue-200">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <SundaeIcon name="report" size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">Sundae Report</CardTitle>
                  </div>
                  <CardDescription className="text-lg text-gray-700 font-semibold mb-4">
                    Historical analysis & strategic planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-2">Perfect when:</p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Daily/weekly reports are sufficient</li>
                        <li>• You need historical trends & benchmarking</li>
                        <li>• Testing Sundae before committing</li>
                        <li>• Managing 1-5 locations</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-blue-900 mb-1">Start Free Forever</p>
                      <p className="text-sm text-blue-700">Report Lite costs nothing. Prove the value, then upgrade.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Core Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card variant="elevated" className="h-full border-2 border-purple-200 bg-purple-50/30">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <SundaeIcon name="speed" size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900">Sundae Core</CardTitle>
                  </div>
                  <CardDescription className="text-lg text-gray-700 font-semibold mb-4">
                    Real-time operations & predictive intelligence
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 uppercase mb-2">Perfect when:</p>
                      <ul className="space-y-2 text-gray-600">
                        <li>• You need 2-4 hour refresh cycles</li>
                        <li>• Operational speed is critical</li>
                        <li>• Need system integrations (Labor, Inventory, etc.)</li>
                        <li>• Managing 10+ locations</li>
                      </ul>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-4">
                      <p className="text-sm font-semibold text-purple-900 mb-1">Everything in Report, Plus More</p>
                      <p className="text-sm text-purple-700">All Report features + real-time speed + system integrations.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Side-by-Side Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Side-by-Side Comparison
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Key differences that matter for your decision
            </p>
          </div>

          <div className="space-y-6">
            {comparisonData.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated" className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                    {/* Category */}
                    <div className="p-6 bg-gray-50 flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={item.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{item.category}</h3>
                      </div>
                    </div>

                    {/* Report */}
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <p className="font-bold text-gray-900">Report</p>
                      </div>
                      <p className="text-lg font-semibold text-blue-600 mb-2">{item.report}</p>
                      <p className="text-sm text-gray-600">{item.reportDetail}</p>
                    </div>

                    {/* Core */}
                    <div className="p-6 bg-purple-50/50">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <p className="font-bold text-gray-900">Core</p>
                      </div>
                      <p className="text-lg font-semibold text-purple-600 mb-2">{item.core}</p>
                      <p className="text-sm text-gray-600">{item.coreDetail}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decision Tree */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Decision Tree: Which Tier?
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Answer these questions to find your tier
            </p>
          </div>

          <div className="space-y-6">
            {decisionTree.map((decision, index) => (
              <motion.div
                key={decision.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 mb-6">{decision.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Yes Path */}
                      <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">✓</span>
                          <p className="font-bold text-green-900">YES</p>
                        </div>
                        <p className="font-bold text-lg text-gray-900 mb-2">→ {decision.yesAnswer}</p>
                        <p className="text-sm text-gray-600">{decision.yesReason}</p>
                      </div>

                      {/* No Path */}
                      <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">→</span>
                          <p className="font-bold text-blue-900">NO</p>
                        </div>
                        <p className="font-bold text-lg text-gray-900 mb-2">→ {decision.noAnswer}</p>
                        <p className="text-sm text-gray-600">{decision.noReason}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrade Path */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 mb-6">
            Not Sure? Start with Report
          </h2>
          <p className="body-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Many operators start with Report (free forever with Report Lite) to prove the value, then upgrade to Core when they need operational speed. All historical data is preserved when you upgrade — seamless transition, zero data loss.
          </p>
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <SundaeIcon name="report" size="xl" className="text-white" />
                </div>
                <p className="font-semibold text-gray-900">Report Lite</p>
                <p className="text-sm text-gray-500">Free Forever</p>
              </div>
              <div className="text-3xl text-gray-400">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <SundaeIcon name="report" size="xl" className="text-white" />
                </div>
                <p className="font-semibold text-gray-900">Report Plus/Pro</p>
                <p className="text-sm text-gray-500">Automated Analysis</p>
              </div>
              <div className="text-3xl text-gray-400">→</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <SundaeIcon name="speed" size="xl" className="text-white" />
                </div>
                <p className="font-semibold text-gray-900">Core</p>
                <p className="text-sm text-gray-500">Real-Time Intelligence</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              <strong>Seamless upgrades.</strong> Start free, upgrade when it makes sense, scale as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 mb-6">
            See Exact Pricing for Your Operation
          </h2>
          <p className="body-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Interactive pricing calculator shows costs for both Report and Core tiers based on your location count.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="calculator" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">See Exact Pricing</h3>
              <p className="text-sm text-gray-600 mb-4">Compare Report & Core pricing</p>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="primary" size="md" className="w-full">
                  Calculate Pricing →
                </Button>
              </a>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="report" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Start Free</h3>
              <p className="text-sm text-gray-600 mb-4">Report Lite, no credit card</p>
              <Button 
                variant="outline" 
                size="md"
                className="w-full"
                onClick={() => cta(REPORT_APP_URL, "start_free_from_comparison_bottom", { page: "/report-vs-core" })}
              >
                Start Free →
              </Button>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="visibility" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Book a Demo</h3>
              <p className="text-sm text-gray-600 mb-4">See both tiers in action</p>
              <Button 
                variant="outline" 
                size="md"
                className="w-full"
                onClick={() => cta("/demo", "book_demo_from_comparison", { page: "/report-vs-core" })}
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
