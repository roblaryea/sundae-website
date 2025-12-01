'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function CSuiteExecutivesPage() {
  const challenges = [
    {
      title: "Lack of Real-Time Visibility",
      description: "Critical decisions are made with yesterday's data, leading to missed opportunities and reactive management.",
      icon: "📊"
    },
    {
      title: "Disconnected Data Sources",
      description: "Finance, operations, and marketing data live in silos, making it impossible to see the complete picture.",
      icon: "🔗"
    },
    {
      title: "No Predictive Intelligence",
      description: "You can see what happened, but not what's about to happen or why it's happening.",
      icon: "🔮"
    },
    {
      title: "Strategic vs. Operational Trade-off",
      description: "You're forced to choose between strategic thinking and operational firefighting—there's no time for both.",
      icon: "⚖️"
    }
  ];

  const howSundaeHelps = [
    {
      title: "Executive Command Center",
      description: "Sundae Canvas delivers a real-time executive dashboard with KPIs that matter—revenue, margins, costs, and performance across your entire portfolio.",
      product: "Sundae Canvas",
      icon: "🎯"
    },
    {
      title: "AI-Powered Strategic Insights",
      description: "Sundae Insights proactively identifies risks, opportunities, and trends across operations, finance, and market conditions before they impact your bottom line.",
      product: "Sundae Insights",
      icon: "🤖"
    },
    {
      title: "Instant Strategic Answers",
      description: "Ask Sundae Nexus 'What's driving margin compression?' or 'Which markets should we expand into?' and get data-backed answers instantly.",
      product: "Sundae Nexus",
      icon: "💬"
    },
    {
      title: "Competitive Benchmarking",
      description: "Sundae Report shows how you compare to industry leaders and identifies gaps in performance, efficiency, and growth.",
      product: "Sundae Report",
      icon: "📈"
    }
  ];

  const outcomes = [
    {
      title: "Make faster, data-backed decisions",
      description: "Move from monthly reviews to real-time intelligence, enabling agile strategic adjustments",
      icon: "⚡"
    },
    {
      title: "15-20% improvement in key metrics",
      description: "Optimize margins, reduce costs, and improve operational efficiency across the portfolio",
      icon: "📈"
    },
    {
      title: "Reduce strategic risk",
      description: "Identify threats and opportunities early with predictive AI insights and market intelligence",
      icon: "🛡️"
    },
    {
      title: "Unite your leadership team",
      description: "Give everyone access to the same real-time data and insights, aligning strategy and execution",
      icon: "🤝"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span>👔</span>
              <span>C-Suite Executives</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              Strategic Intelligence for Leaders
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              As a CEO, CFO, or COO, you need more than reports—you need intelligence. Sundae unifies financial, operational, and market data into a single decision intelligence platform, giving you real-time visibility, predictive insights, and the clarity to lead with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  See How Sundae Helps Executives
                </Button>
              </Link>
              <Link href="/report">
                <Button variant="outline" size="lg">
                  Get Executive Benchmark Report
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">Key Challenges</h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              C-suite executives face unique visibility and strategic decision challenges
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                      {challenge.icon}
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 mb-2">{challenge.title}</CardTitle>
                      <CardDescription className="text-gray-600">{challenge.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">How Sundae Helps</h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Decision intelligence built for CEOs, CFOs, and COOs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {howSundaeHelps.map((item, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-semibold mb-1">{item.product}</div>
                      <CardTitle className="text-gray-900 mb-2">{item.title}</CardTitle>
                      <CardDescription className="text-gray-600">{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">What You Can Achieve</h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Real outcomes for C-suite executives using Sundae
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {outcomes.map((outcome, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-2xl flex-shrink-0">
                      {outcome.icon}
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 mb-2">{outcome.title}</CardTitle>
                      <CardDescription className="text-gray-600">{outcome.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">Lead With Intelligence</h2>
          <p className="body-xl mb-8 opacity-90">
            Join CEOs, CFOs, and COOs who are using Sundae to make faster, smarter decisions and drive sustainable growth.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book an Executive Briefing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
