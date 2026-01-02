'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function CanvasPage() {
  const capabilities: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Auto-Generated Dashboards",
      description: "Canvas detects key metrics and builds visualizations automatically — no configuration required.",
      icon: "speed"
    },
    {
      title: "Interactive Visuals",
      description: "Every chart is interactive, allowing you to drill down, filter, and explore your data.",
      icon: "canvas"
    },
    {
      title: "Real-Time Updates",
      description: "Dashboards refresh continuously as new data flows in, keeping insights always current.",
      icon: "sync"
    },
    {
      title: "Share & Embed",
      description: "Export, share, or embed dashboards across teams — from finance to operations to marketing.",
      icon: "network"
    }
  ];

  const whoItsFor: { icon: SundaeIconName; title: string; description: string }[] = [
    {
      icon: "owners",
      title: "Ops Leaders",
      description: "Real-time performance visibility across all locations"
    },
    {
      icon: "finance",
      title: "Finance & FP&A",
      description: "Cost analysis and variance tracking at a glance"
    },
    {
      icon: "regional",
      title: "Regional Managers",
      description: "Compare location performance side-by-side"
    }
  ];

  const dashboardExamples: { title: string; description: string; benefits: string[]; metrics: string[]; icon: SundaeIconName; featured: boolean }[] = [
    {
      title: "Executive Overview",
      description: "High-level KPIs for C-suite and ownership.",
      benefits: [
        "See portfolio-wide performance in real-time",
        "Drill into any location with one click"
      ],
      metrics: [
        "Net Revenue by Location & Concept",
        "EBITDA & Margin Trends",
        "Labor Cost % vs Target",
        "Food Cost % by Location",
        "Location Performance Rankings"
      ],
      icon: "benchmarking",
      featured: true
    },
    {
      title: "Ops Command Center",
      description: "Real-time operational metrics for managers.",
      benefits: [
        "Monitor service speed and guest satisfaction live"
      ],
      metrics: [
        "Hourly Sales by Daypart",
        "Labor Hours vs Forecast",
        "Inventory Levels & Reorder Alerts",
        "Order Accuracy %",
        "Average Service Time"
      ],
      icon: "forge",
      featured: false
    },
    {
      title: "Finance & Cost Control",
      description: "Detailed cost analysis for CFOs and controllers.",
      benefits: [
        "Spot cost leakage before it impacts margins"
      ],
      metrics: [
        "Food Cost Variance by Category",
        "Waste % by Menu Item",
        "Vendor Spend by Location",
        "Budget vs Actual by Week",
        "Margin Analysis by Concept"
      ],
      icon: "finance",
      featured: false
    },
    {
      title: "Marketing & Growth",
      description: "Customer acquisition and retention metrics.",
      benefits: [
        "Track campaign ROI and channel performance instantly"
      ],
      metrics: [
        "Guest Count Trends",
        "Repeat Customer Rate",
        "Channel Performance (Delivery/Dine-in/Takeout)",
        "Campaign ROI by Location",
        "Customer LTV by Segment"
      ],
      icon: "growth",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section - Dashboard Visual Focus */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <SundaeIcon name="chart" size="md" />
              <span>Sundae Canvas</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Your Data, Instantly Visualized
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto"
            >
              Transform complex datasets into clear, dynamic dashboards that update in real-time.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-sm text-gray-500 mb-8 max-w-3xl mx-auto"
            >
              Part of Sundae, the first AI decision intelligence platform for restaurants and hospitality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  Book a Canvas Walkthrough
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                See Dashboard Examples
              </Button>
            </motion.div>
          </div>

          {/* Large Dashboard Mock - Central Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 overflow-hidden">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Executive Overview</h3>
                  <p className="text-sm text-gray-500">Last updated: 2 minutes ago</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                    Export
                  </button>
                  <button className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                    Share
                  </button>
                </div>
              </div>

              {/* KPI Cards Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Revenue", value: "AED 2.4M", change: "+12%", positive: true },
                  { label: "Labor Cost %", value: "28.5%", change: "-2.1%", positive: true },
                  { label: "Food Cost %", value: "31.2%", change: "+0.8%", positive: false },
                  { label: "Locations", value: "12", change: "Active", positive: true }
                ].map((kpi, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-1">{kpi.label}</p>
                    <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
                    <p className={`text-xs font-medium ${kpi.positive ? 'text-green-600' : 'text-orange-600'}`}>
                      {kpi.change}
                    </p>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Revenue Trend Chart */}
                <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border border-blue-100">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Revenue Trend (Last 30 Days)</h4>
                  <div className="h-32 flex items-end space-x-1">
                    {[65, 72, 68, 80, 75, 88, 92, 85, 95, 100, 98, 105].map((height, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${height}%` }}></div>
                    ))}
                  </div>
                </div>

                {/* Location Performance */}
                <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-4 border border-green-100">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Top Locations by Revenue</h4>
                  <div className="space-y-2">
                    {[
                      { name: "Marina Mall", value: 100 },
                      { name: "Downtown", value: 85 },
                      { name: "JBR Walk", value: 72 },
                      { name: "City Centre", value: 68 }
                    ].map((loc, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-20 text-xs text-gray-600 font-medium truncate">{loc.name}</div>
                        <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                          <div className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full" style={{ width: `${loc.value}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dark Preview Strip - Signature Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Dashboards That Tell a Story
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Every visualization in Canvas is designed to surface insights, not just display data
            </p>
          </div>

          {/* Dashboard Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Sales Analytics", color: "from-blue-500 to-blue-600", icon: "📊" },
              { title: "Cost Intelligence", color: "from-purple-500 to-purple-600", icon: "💰" },
              { title: "Guest Insights", color: "from-green-500 to-green-600", icon: "👥" }
            ].map((dash, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{dash.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{dash.title}</h3>
                <div className={`h-24 bg-gradient-to-br ${dash.color} rounded-lg opacity-60 flex items-center justify-center`}>
                  <span className="text-white/80 text-xs font-medium">Interactive Dashboard</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600 mb-6">
              Trusted by leading restaurant groups across the Middle East and beyond
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Who It's For</h2>
            <p className="text-gray-600">Built for teams who need clarity at a glance</p>
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

      {/* How Canvas Fits the Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How Canvas Fits the Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The final layer in Sundae's intelligence architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <div className="text-3xl mb-3">🔌</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Scout</h3>
              <p className="text-gray-600 text-sm">
                Connects and unifies all data sources into a single layer
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Insights & Pulse</h3>
              <p className="text-gray-600 text-sm">
                AI analyzes patterns and generates actionable insights
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Canvas</h3>
              <p className="text-gray-600 text-sm">
                Visualizes everything in real-time, interactive dashboards
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600">
              Canvas sits at the top of Sundae's Intelligence Stack. 
              <Link href="/architecture" className="text-blue-600 hover:text-blue-700 ml-1 underline">
                Learn more about our architecture →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Canvas Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful visualization without the complexity
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
        </div>
      </section>

      {/* Dashboard Examples Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Dashboard Examples
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pre-built dashboards for every stakeholder
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {dashboardExamples.map((dashboard, index) => (
              <Card 
                key={index} 
                variant="elevated" 
                className={`hover:shadow-xl transition-shadow duration-300 ${
                  dashboard.featured ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name={dashboard.icon} size="lg" className="text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-gray-900 mb-2">{dashboard.title}</CardTitle>
                      <CardDescription className="text-gray-600 mb-3">
                        {dashboard.description}
                      </CardDescription>
                      {/* Benefits */}
                      <div className="space-y-1">
                        {dashboard.benefits.map((benefit, bIndex) => (
                          <p key={bIndex} className="text-sm text-blue-700 font-medium flex items-start space-x-2">
                            <span>→</span>
                            <span>{benefit}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Key Metrics:</p>
                    <ul className={`grid ${dashboard.featured ? 'md:grid-cols-2' : 'grid-cols-1'} gap-2`}>
                      {dashboard.metrics.map((metric, mIndex) => (
                        <li key={mIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See Your Data Come to Life
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Experience the clarity and power of Sundae Canvas. Book a walkthrough to see it in action.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book a Canvas Walkthrough
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
