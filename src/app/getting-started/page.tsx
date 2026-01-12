'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL } from "@/lib/urls";

export default function GettingStartedPage() {
  const cta = useCta();

  const steps = [
    {
      number: 1,
      title: "Start Free (Report Lite)",
      subtitle: "Prove the value. Pay nothing.",
      description: "Upload your POS data and get instant benchmarking. No credit card required. See where you stand against similar restaurants within minutes.",
      actions: [
        "Upload POS data (CSV format)",
        "Instant benchmark against peers",
        "Identify top 3 opportunities",
        "Build internal business case"
      ],
      timeline: "Instant",
      cta: "Start Free",
      ctaLink: "/report",
      icon: "report" as SundaeIconName,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: 2,
      title: "Understand Your Baseline",
      subtitle: "See where you stand vs peers.",
      description: "Use Report Lite to understand your performance across 5 core metrics. Compare against restaurants like yours. Build the case for deeper intelligence.",
      actions: [
        "Benchmark sales per square foot",
        "Compare labor cost % to peers",
        "Identify margin opportunities",
        "Share insights with leadership"
      ],
      timeline: "1-2 weeks to build case",
      cta: "Learn About Report",
      ctaLink: "/report",
      icon: "benchmarking" as SundaeIconName,
      color: "from-purple-500 to-purple-600"
    },
    {
      number: 3,
      title: "Decide Upgrade Path",
      subtitle: "Report Plus/Pro or Core?",
      description: "Once you've proven the value with Report Lite, choose your upgrade path based on speed and depth needs.",
      actions: [
        "Need AI-powered insights? → Report Plus/Pro",
        "Need operational speed? → Core",
        "Daily reports sufficient? → Report Plus/Pro",
        "10+ locations? → Core"
      ],
      timeline: "Report Plus/Pro: 1-2 days | Core: 1-2 weeks",
      cta: "Compare Options",
      ctaLink: "/report-vs-core",
      icon: "balance" as SundaeIconName,
      color: "from-green-500 to-green-600"
    },
    {
      number: 4,
      title: "Add Modules (Optional)",
      subtitle: "Go deeper where it matters most.",
      description: "Choose specialized modules based on your biggest operational pain points. Requires Core tier for real-time specialized intelligence.",
      actions: [
        "High labor cost? → Labor Intelligence",
        "High food cost/waste? → Inventory Intelligence",
        "Complex vendors? → Purchasing Intelligence",
        "Heavy marketing? → Marketing Intelligence",
        "Reservation-driven? → Reservations Intelligence"
      ],
      timeline: "1-2 weeks per module",
      cta: "Explore Modules",
      ctaLink: "/modules",
      icon: "network" as SundaeIconName,
      color: "from-orange-500 to-orange-600"
    },
    {
      number: 5,
      title: "Consider Watchtower (Optional)",
      subtitle: "Add external intelligence.",
      description: "See what's happening outside your four walls. Track competitors, predict demand from events, and understand market dynamics.",
      actions: [
        "Track up to 10 competitors per location",
        "Monitor pricing & promotions",
        "Predict demand from weather/events",
        "Strategic market intelligence"
      ],
      timeline: "1 week setup",
      cta: "Learn About Watchtower",
      ctaLink: "/product/watchtower",
      icon: "watchtower" as SundaeIconName,
      color: "from-indigo-500 to-indigo-600"
    },
    {
      number: 6,
      title: "Scale to Enterprise",
      subtitle: "100+ locations or custom needs.",
      description: "Custom refresh frequency, unlimited AI credits, white-label options, SSO, dedicated CSM, and 24/7 support with custom SLAs.",
      actions: [
        "Custom refresh frequency",
        "Unlimited AI credits & dashboards",
        "White-label & SSO",
        "Dedicated customer success manager",
        "24/7 support with custom SLAs"
      ],
      timeline: "2-4 weeks (custom implementation)",
      cta: "Contact Sales",
      ctaLink: "/contact",
      icon: "multiLocation" as SundaeIconName,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const timelines = [
    { tier: "Report Lite", time: "Instant", description: "Upload CSV, get benchmark immediately" },
    { tier: "Report Plus/Pro", time: "1-2 Days", description: "AI parsing setup & integration" },
    { tier: "Core Lite/Pro", time: "1-2 Weeks", description: "POS integration & real-time setup" },
    { tier: "Enterprise", time: "2-4 Weeks", description: "Custom implementation & training" }
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
              <SundaeIcon name="document" size="md" />
              <span>Getting Started Guide</span>
            </div>
            <h1 className="hero-h1 text-gray-900 mb-6">
              Your Journey with Sundae
            </h1>
            <p className="body-xl text-gray-600 mb-4 max-w-4xl mx-auto">
              Six steps from free benchmarking to complete operational intelligence. Start small, scale at your pace.
            </p>
            <p className="body-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              Most operators start with Report Lite (free forever), prove the value, then expand. You control the timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => cta(REPORT_APP_URL, "start_free_from_getting_started", { page: "/getting-started" })}
              >
                Start Free
              </Button>
              <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  Calculate Your Path
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6-Step Journey */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              The Sundae Journey: 6 Steps
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              From free benchmarking to enterprise intelligence
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated" className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Step Number & Icon */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex flex-col items-center justify-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg`}>
                        {step.number}
                      </div>
                      <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center`}>
                        <SundaeIcon name={step.icon} size="xl" className="text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-7 p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-lg font-semibold text-gray-600 mb-4">{step.subtitle}</p>
                      <p className="text-gray-700 mb-6 leading-relaxed">{step.description}</p>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-semibold text-gray-500 uppercase mb-3">What You'll Do:</p>
                        <ul className="space-y-2">
                          {step.actions.map((action, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span className="text-sm text-gray-700">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Timeline & CTA */}
                    <div className="lg:col-span-3 bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-6 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Timeline</p>
                        <p className="text-lg font-bold text-gray-900 mb-6">{step.timeline}</p>
                      </div>
                      
                      {step.ctaLink.startsWith('http') ? (
                        <a href={step.ctaLink} target="_blank" rel="noopener noreferrer" className="block">
                          <Button variant="primary" size="lg" className="w-full">
                            {step.cta} →
                          </Button>
                        </a>
                      ) : (
                        <Button 
                          variant="primary" 
                          size="lg" 
                          className="w-full"
                          onClick={() => cta(step.ctaLink, `step_${step.number}_cta`, { page: "/getting-started" })}
                        >
                          {step.cta} →
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Timelines */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Implementation Timelines
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              How long does each tier take to implement?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timelines.map((timeline, index) => (
              <motion.div
                key={timeline.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated" className="h-full text-center hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 mb-2">{timeline.tier}</CardTitle>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      {timeline.time}
                    </div>
                    <CardDescription className="text-gray-600">
                      {timeline.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-3">No Forced Timelines</h3>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Start with Report Lite today. Upgrade to Report Plus/Pro next month. Add Core in Q3. Scale to Enterprise in Q4. You control the pace based on your priorities and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Decision Framework */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Common Journeys
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              How do operators typically progress through Sundae?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Small Operator Journey */}
            <Card variant="elevated" className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                  <SundaeIcon name="labor" size="lg" className="text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-4">1-5 Location Operator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <p className="text-sm text-gray-700">Start with Report Lite (free)</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <p className="text-sm text-gray-700">Upgrade to Report Plus for AI insights</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <p className="text-sm text-gray-700">Consider Core when scaling to 10+ locations</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mid-Size Operator Journey */}
            <Card variant="elevated" className="hover:shadow-xl transition-all duration-300 border-2 border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <SundaeIcon name="multiLocation" size="lg" className="text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-4">10-50 Location Operator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <p className="text-sm text-gray-700">Start with Core Lite for real-time ops</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <p className="text-sm text-gray-700">Add 1-2 modules (Labor, Inventory)</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <p className="text-sm text-gray-700">Add Watchtower for market intelligence</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Journey */}
            <Card variant="elevated" className="hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                  <SundaeIcon name="growth" size="lg" className="text-white" />
                </div>
                <CardTitle className="text-xl text-gray-900 mb-4">100+ Location Enterprise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                    <p className="text-sm text-gray-700">Start with Enterprise tier</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                    <p className="text-sm text-gray-700">Full module suite + Watchtower</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                    <p className="text-sm text-gray-700">Custom integrations & white-label</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="body-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Begin with Report Lite (free forever) or calculate your custom path with the pricing calculator.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="report" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Start Free</h3>
              <p className="text-sm text-gray-600 mb-4">Report Lite, no credit card</p>
              <Button 
                variant="primary" 
                size="md"
                className="w-full"
                onClick={() => cta(REPORT_APP_URL, "start_free_from_getting_started_bottom", { page: "/getting-started" })}
              >
                Start Free →
              </Button>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="calculator" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Calculate Your Path</h3>
              <p className="text-sm text-gray-600 mb-4">Interactive pricing calculator</p>
              <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" size="md" className="w-full">
                  Calculate Pricing →
                </Button>
              </a>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="conversation" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Talk to an Expert</h3>
              <p className="text-sm text-gray-600 mb-4">Custom recommendations</p>
              <Button 
                variant="outline" 
                size="md"
                className="w-full"
                onClick={() => cta("/demo", "book_demo_from_getting_started", { page: "/getting-started" })}
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
