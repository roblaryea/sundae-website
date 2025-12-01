'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function NexusPage() {
  const capabilities: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Natural Language Questions",
      description: "Ask questions in plain English — no SQL, no technical knowledge required.",
      icon: "nexus"
    },
    {
      title: "Unified Data Window",
      description: "Every connected data source accessible from a single conversational interface.",
      icon: "integration"
    },
    {
      title: "Visual Answers",
      description: "Instant charts, tables, and visual summaries generated automatically.",
      icon: "benchmarking"
    },
    {
      title: "Conversation Memory",
      description: "Context-aware responses that remember previous questions and build on them.",
      icon: "intelligence"
    }
  ];

  const whoItsFor: { icon: SundaeIconName; title: string; description: string }[] = [
    {
      icon: "owners",
      title: "C-Suite Executives",
      description: "Make decisions with live answers, not month-end decks"
    },
    {
      icon: "benchmarking",
      title: "Strategy & Planning",
      description: "Test hypotheses instantly without waiting for analysts"
    },
    {
      icon: "technology",
      title: "Data & BI Teams",
      description: "Scale insights across teams with self-service AI"
    }
  ];

  const howItWorks: { step: number; title: string; description: string; icon: SundaeIconName }[] = [
    {
      step: 1,
      title: "Connect your data",
      description: "Sundae automatically integrates with your POS, labor, inventory, and operational systems.",
      icon: "integration"
    },
    {
      step: 2,
      title: "Ask your question",
      description: "Type or speak naturally — like asking a colleague who knows everything about your business.",
      icon: "search"
    },
    {
      step: 3,
      title: "Act on the answer",
      description: "Get instant visual insights with AI-generated context, ready to inform your next decision.",
      icon: "speed"
    }
  ];

  const sampleQuestions = [
    {
      category: "Operations",
      chip: "Ops",
      description: "Daily performance and efficiency questions",
      questions: [
        "What were my top five performing locations last weekend by covers?",
        "Compare sales to footfall in Marina vs Downtown this month",
        "Show me labor cost variance by location and daypart",
        "Which menu items have the highest waste percentage across all sites?"
      ]
    },
    {
      category: "Financial",
      chip: "Financial",
      description: "Revenue, cost, and margin analysis",
      questions: [
        "What's my current food cost percentage vs budget by location?",
        "Show revenue trends for the past 90 days with weekly comparison",
        "Which locations are underperforming on margin and why?",
        "Compare actual vs forecasted sales this quarter by concept"
      ]
    },
    {
      category: "Strategic",
      chip: "Strategic",
      description: "Growth insights and pattern analysis",
      questions: [
        "What's driving the revenue increase in Location A vs last year?",
        "Identify my most and least profitable dayparts by concept",
        "Show correlation between weather and sales patterns by location",
        "Which customer segments are growing fastest and where?"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section - Light Blue Gradient */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
              >
                <span>🚀</span>
                <span>Sundae Nexus</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hero-h1 text-gray-900 mb-6"
              >
                Ask a Question. Get the Answer.
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="body-xl text-gray-600 mb-4"
              >
                Skip the dashboards. Ask about sales, labor, covers, or margins in plain English — and get instant answers with context.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="body-sm text-gray-500 mb-6"
              >
                Powered by Sundae's decision intelligence platform.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="body-base text-blue-700 mb-8 bg-blue-50 p-4 rounded-lg border border-blue-100"
              >
                <strong>Nexus speaks restaurant.</strong> Locations, dayparts, covers, channels, categories — talk like an operator, not a data analyst.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="body-lg text-gray-600 mb-8"
              >
                <p className="font-semibold text-gray-900 body-xl">
                  No SQL. No waiting. Just ask, explore, decide.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link href="/demo">
                  <Button variant="primary" size="lg" className="animate-pulse-glow">
                    Book a Nexus Demo
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  See Example Questions
                </Button>
              </motion.div>
            </div>

            {/* Right: Chat Mock Component */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-4">
                {/* User Question */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">👤</span>
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 flex-1">
                    <p className="text-gray-900 font-medium">
                      What were my top 5 locations by revenue last week?
                    </p>
                  </div>
                </div>

                {/* Nexus Answer */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">N</span>
                  </div>
                  <div className="bg-blue-50 rounded-2xl rounded-tl-none p-4 flex-1 border border-blue-100">
                    <p className="text-gray-900 mb-4">
                      Here are your top 5 locations by revenue for Nov 15-21, 2024:
                    </p>
                    
                    {/* Mini Chart */}
                    <div className="bg-white rounded-lg p-3 mb-4 border border-gray-200">
                      <div className="space-y-2">
                        {[
                          { name: "Marina Mall", rev: "AED 125K", pct: 100 },
                          { name: "Downtown", rev: "AED 118K", pct: 94 },
                          { name: "JBR Walk", rev: "AED 102K", pct: 82 },
                          { name: "City Centre", rev: "AED 95K", pct: 76 },
                          { name: "Palm West", rev: "AED 88K", pct: 70 }
                        ].map((loc, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="w-24 text-xs text-gray-600 font-medium">{loc.name}</div>
                            <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                              <div 
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${loc.pct}%` }}
                              />
                              <span className="absolute inset-0 flex items-center justify-end pr-2 text-xs font-semibold text-gray-700">
                                {loc.rev}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-900">Key insights:</p>
                      <ul className="space-y-1">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-sm text-gray-700">Marina Mall up 12% vs last week due to weekend event</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-sm text-gray-700">Downtown showing consistent lunch performance</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span className="text-sm text-gray-700">Palm West dipped 8% — recommend staffing review</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex items-center space-x-2 text-gray-400 text-sm pl-11">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span>Nexus is typing...</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Trusted by operators who need answers, not reports
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">3x faster decisions</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💰</span>
                <span className="font-semibold">$50K+ variance detected per site annually</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📊</span>
                <span className="font-semibold">18% labor cost reduction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h3 text-gray-900 mb-2">Built for Decision Makers</h2>
            <p className="text-gray-600">Get answers in seconds, not spreadsheets in days</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whoItsFor.map((persona, index) => (
              <Card key={index} variant="elevated" className="text-center p-6">
                <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={persona.icon} size="lg" className="text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{persona.title}</h3>
                <p className="text-sm text-gray-600 font-medium">{persona.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              What Makes Nexus Different
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              A real conversation with your data — not another dashboard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name={capability.icon} size="lg" className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 mb-2">{capability.title}</CardTitle>
                      <CardDescription className="text-gray-600">
                        {capability.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">
              Nexus sits on top of Sundae's Intelligence Stack. 
              <Link href="/architecture" className="text-blue-600 hover:text-blue-700 ml-1 underline">
                Learn more about our architecture →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              From Question to Answer in Seconds
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Connect your data. Ask your question. Act on the answer.
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
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center">
                  <SundaeIcon name={step.icon} size="lg" className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Questions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Questions You Can Ask Right Now
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Real questions. Instant answers. Zero SQL required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleQuestions.map((category, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-gray-900">{category.category}</CardTitle>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                      {category.chip}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 leading-relaxed text-sm">{question}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Ready to Stop Waiting for Reports?
          </h2>
          <p className="body-xl mb-8 opacity-90">
            See how fast you can get answers when you just ask. Book a Nexus demo today.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book a Nexus Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
