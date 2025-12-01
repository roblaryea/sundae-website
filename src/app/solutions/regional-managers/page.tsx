'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function RegionalManagersPage() {
  const challenges = [
    {
      title: "Limited Visibility Across Locations",
      description: "You're responsible for multiple sites but lack real-time visibility into what's happening at each one.",
      icon: "👁️"
    },
    {
      title: "Firefighting Mode",
      description: "Spending more time reacting to problems than preventing them or driving strategic improvements.",
      icon: "🔥"
    },
    {
      title: "Inconsistent Performance",
      description: "Some locations excel while others lag, but you don't have clear data on why or how to fix it.",
      icon: "📊"
    },
    {
      title: "Time-Consuming Site Visits",
      description: "Physical visits are the only way to understand what's really happening, leaving little time for strategy.",
      icon: "🚗"
    }
  ];

  const howSundaeHelps = [
    {
      title: "Real-Time Regional Dashboard",
      description: "Sundae Canvas gives you a single view of all your locations—sales, labor, margins, and operations—updated in real time.",
      product: "Sundae Canvas",
      icon: "📊"
    },
    {
      title: "Proactive Alerts",
      description: "Sundae Insights flags issues before they become problems, letting you intervene early and coach more effectively.",
      product: "Sundae Insights",
      icon: "🚨"
    },
    {
      title: "Instant Answers",
      description: "Ask Sundae Nexus 'Which locations are trending up this week?' or 'Where is labor variance highest?' and get immediate, data-backed answers.",
      product: "Sundae Nexus",
      icon: "💬"
    },
    {
      title: "Performance Benchmarking",
      description: "Sundae Report shows how each location compares to your regional average and top performers, making coaching conversations data-driven.",
      product: "Sundae Report",
      icon: "📈"
    }
  ];

  const outcomes = [
    {
      title: "Spend less time firefighting",
      description: "Catch issues early with automated alerts and focus on strategic improvement",
      icon: "⚡"
    },
    {
      title: "More effective site visits",
      description: "Arrive with data-backed insights and have more productive conversations with GMs",
      icon: "🎯"
    },
    {
      title: "Lift underperforming locations faster",
      description: "Identify gaps quickly and replicate best practices across your region",
      icon: "📈"
    },
    {
      title: "Better work-life balance",
      description: "Manage your region from anywhere with mobile access to all key metrics",
      icon: "⚖️"
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
              <span>Regional Managers</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              Lead With Data, Not Guesswork
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              As a Regional Manager, you're juggling multiple locations, each with its own challenges. Sundae gives you real-time visibility into every site, proactive alerts when issues arise, and the insights you need to coach your teams effectively—all without spending your life on the road.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  See How Sundae Helps RMs
                </Button>
              </Link>
              <Link href="/report">
                <Button variant="outline" size="lg">
                  Get Regional Benchmark Report
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
              Regional managers face unique visibility and time management challenges
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
              Built for regional managers who need clarity, not complexity
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
              Real outcomes for regional managers using Sundae
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
          <h2 className="section-h2 mb-6">Manage Smarter, Not Harder</h2>
          <p className="body-xl mb-8 opacity-90">
            See how regional managers are using Sundae to gain visibility, catch issues early, and drive consistent performance across their territories.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book a Regional Manager Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
