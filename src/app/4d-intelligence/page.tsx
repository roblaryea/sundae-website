'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';

export default function FourDIntelligencePage() {
  const dimensions = [
    {
      id: "1D",
      title: "Internal Actuals",
      subtitle: "What Happened?",
      description: "This is where most tools stop. Traditional BI platforms show you sales, labor, covers, voids, and waste from your POS, payroll, and inventory systems. But they only tell you what happened in the past—with no context, no comparison, and no prediction.",
      icon: "📊",
      color: "from-blue-500 to-blue-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      examples: [
        "Daily sales by location and daypart",
        "Labor hours and costs from payroll",
        "Inventory usage and waste reports",
        "Cover counts and average check",
        "Void and comp tracking"
      ]
    },
    {
      id: "2D",
      title: "Actual vs Plan",
      subtitle: "What Should Have Happened?",
      description: "Layer in your budgets, forecasts, and targets. Now you can see variance—are you ahead or behind plan? This adds planning context, but still no market intelligence or predictive power.",
      icon: "🎯",
      color: "from-purple-500 to-purple-600",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      examples: [
        "Budget vs actual sales variance",
        "Labor cost % against targets",
        "Food cost variance by period",
        "Location-level performance to plan",
        "Forecast accuracy tracking"
      ]
    },
    {
      id: "3D",
      title: "Market & Competitors",
      subtitle: "How Do We Compare?",
      description: "Add benchmarks, peer groups, and competitive intelligence. See how your performance stacks up against similar restaurants in your category and region. Understand market context, not just internal metrics.",
      icon: "🗺️",
      color: "from-green-500 to-green-600",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      examples: [
        "Sales per square foot vs peer group",
        "Labor cost % compared to benchmarks",
        "Competitor pricing and promotions",
        "Category and territory trends",
        "Market share and positioning"
      ]
    },
    {
      id: "4D",
      title: "AI Foresight & Actions",
      subtitle: "What Will Happen Next, and What Should We Do?",
      description: "The final dimension: predictions, alerts, and AI-generated recommendations. Sundae's multi-agent AI forecasts outcomes, flags anomalies before they escalate, and tells you exactly what action to take.",
      icon: "🚀",
      color: "from-orange-500 to-orange-600",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      examples: [
        "Predicted sales and demand forecasts",
        "Proactive alerts for labor cost spikes",
        "AI-recommended menu pricing changes",
        "Staffing optimization suggestions",
        "Anomaly detection and root cause analysis"
      ]
    }
  ];

  const businessOutcomes = [
    {
      title: "Higher Margins and Revenue Quality",
      description: "Catch margin erosion early, optimize pricing, and reduce waste before it impacts the P&L.",
      icon: "💰"
    },
    {
      title: "Faster, More Confident Decisions",
      description: "No more waiting for monthly reports. Get real-time intelligence and act on issues as they emerge.",
      icon: "⚡"
    },
    {
      title: "Less Firefighting, More Proactive Leadership",
      description: "Move from reactive management to strategic planning with predictive signals and early warnings.",
      icon: "🎯"
    },
    {
      title: "Stronger Competitive Position",
      description: "Understand your market context, benchmark against peers, and respond to competitor moves in real-time.",
      icon: "🏆"
    }
  ];

  const exampleAlerts = [
    {
      type: "Labor Cost Alert",
      location: "Downtown Location",
      message: "Labor cost is 12% above benchmark for similar restaurants. Recommended action: Review scheduling efficiency and consider staffing adjustment.",
      severity: "warning",
      action: "Review Schedule",
      icon: "⚠️"
    },
    {
      type: "Sales Opportunity",
      location: "Airport Location",
      message: "Sales trending 8% above forecast. Weather and local events suggest continued strong demand. Recommended action: Increase inventory orders.",
      severity: "success",
      action: "Adjust Inventory",
      icon: "✨"
    },
    {
      type: "Competitor Alert",
      location: "Market Area",
      message: "Major competitor launched 20% off promotion. Your traffic is down 5% this week. Recommended action: Consider limited-time offer or targeted marketing.",
      severity: "info",
      action: "Review Promotions",
      icon: "👁️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>🚀</span>
              <span>Decision Intelligence</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              The Sundae <span className="text-gradient">4D Intelligence</span> Engine
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A new way to see, understand, and run your business—from 1D reports to 4D intelligence
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem: 1D Status Quo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Most Restaurant Tools Are Stuck in 1D
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              They show you what happened last week or last month. But they can't tell you why, how you compare, or what to do next.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card variant="elevated" className="bg-gradient-to-br from-gray-50 to-gray-100">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                      📉
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Reactive, Not Proactive</h3>
                      <p className="text-gray-600 leading-relaxed">
                        You discover problems at month-end when they're already expensive to fix. No early warnings, no predictive signals.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                      🕶️
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No Market Context</h3>
                      <p className="text-gray-600 leading-relaxed">
                        You don't know how you compare to competitors, what the market is doing, or whether your performance is good or bad relative to peers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                      ❓
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">No Recommended Actions</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Even when you see a problem, the system doesn't tell you what to do about it. You're left to figure out the next steps on your own.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The 4 Dimensions Explained */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Sundae's 4 Dimensions of Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each dimension builds on the last, creating a complete picture of your business
            </p>
          </div>

          <div className="space-y-16">
            {dimensions.map((dim, index) => (
              <motion.div
                key={dim.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className={`h-2 bg-gradient-to-r ${dim.color}`}></div>
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-5 gap-8 items-start">
                      <div className="md:col-span-2">
                        <div className={`inline-flex w-20 h-20 bg-gradient-to-br ${dim.color} rounded-2xl items-center justify-center text-white text-4xl mb-4 shadow-lg`}>
                          {dim.icon}
                        </div>
                        <div className={`text-4xl font-bold ${dim.textColor} mb-2`}>{dim.id}</div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{dim.title}</h3>
                        <p className="text-lg font-semibold text-gray-600 mb-4">{dim.subtitle}</p>
                        <p className="text-gray-600 leading-relaxed">
                          {dim.description}
                        </p>
                      </div>
                      
                      <div className="md:col-span-3">
                        <div className={`${dim.bgColor} rounded-xl p-6`}>
                          <h4 className="font-bold text-gray-900 mb-4">Examples:</h4>
                          <ul className="space-y-3">
                            {dim.examples.map((example, idx) => (
                              <li key={idx} className="flex items-start space-x-3">
                                <span className={`${dim.textColor} text-xl mt-0.5`}>•</span>
                                <span className="text-gray-700 leading-relaxed">{example}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4D in Action: Example Alerts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              4D Intelligence in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how Sundae's AI agents deliver proactive alerts and recommended actions
            </p>
          </div>

          <div className="grid gap-8 max-w-5xl mx-auto">
            {exampleAlerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`text-4xl mt-1`}>{alert.icon}</div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{alert.type}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            alert.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                            alert.severity === 'success' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {alert.location}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">{alert.message}</p>
                        <Button variant="outline" size="sm">
                          {alert.action} →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why 4D Intelligence Matters */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why 4D Intelligence Matters
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Business outcomes that move the needle for restaurant operators
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {businessOutcomes.map((outcome, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg">
                        {outcome.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900 mb-3">{outcome.title}</CardTitle>
                        <CardDescription className="text-gray-600 leading-relaxed">
                          {outcome.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Sundae Delivers 4D Intelligence */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Sundae Delivers 4D Intelligence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on the Sundae Intelligence Stack with AI-powered analysis at every layer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Unified Data Layer",
                description: "Scout integrates 25+ systems—POS, labor, inventory, budgets, and external data sources—into one intelligent foundation.",
                icon: "🔗"
              },
              {
                title: "Multi-Agent AI Engine",
                description: "Specialized AI agents analyze patterns, detect anomalies, forecast outcomes, and generate recommendations across all four dimensions.",
                icon: "🤖"
              },
              {
                title: "Actionable Intelligence",
                description: "Canvas dashboards, Nexus natural language queries, and proactive alerts deliver insights when and where you need them.",
                icon: "💡"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full text-center hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to See Your Business in 4D?
            </h2>
            <p className="text-xl mb-8 opacity-90 leading-relaxed">
              Book a demo to see 4D Intelligence with your own data—past performance, plan variance, market benchmarks, and AI-powered predictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Book a Demo
                </Button>
              </Link>
              <Link href="/architecture">
                <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600">
                  Explore the Architecture
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
