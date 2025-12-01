'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function HRTeamsPage() {
  const challenges = [
    {
      title: "Workforce Analytics Blind Spots",
      description: "Labor data is trapped in payroll systems, making it impossible to connect staffing decisions to restaurant performance.",
      icon: "👥"
    },
    {
      title: "Turnover Crisis",
      description: "High turnover rates but no clear visibility into which locations or roles have the biggest retention issues.",
      icon: "🔄"
    },
    {
      title: "Scheduling Inefficiency",
      description: "Over-staffing hurts margins, under-staffing hurts service—but you lack real-time data to optimize the balance.",
      icon: "📅"
    },
    {
      title: "Compliance & Risk",
      description: "Managing labor compliance across locations is manual and reactive rather than proactive and data-driven.",
      icon: "⚖️"
    }
  ];

  const howSundaeHelps = [
    {
      title: "Unified Workforce Dashboard",
      description: "Sundae Canvas connects labor, payroll, and performance data—see turnover, productivity, and labor costs by location in real time.",
      product: "Sundae Canvas",
      icon: "📊"
    },
    {
      title: "Proactive Turnover Alerts",
      description: "Sundae Insights flags locations with rising turnover, overtime spikes, or compliance risks before they become crises.",
      product: "Sundae Insights",
      icon: "🚨"
    },
    {
      title: "Ask HR Questions",
      description: "Ask Sundae Nexus 'Which locations have the highest turnover?' or 'What's the average tenure by role?' and get instant, data-backed answers.",
      product: "Sundae Nexus",
      icon: "💬"
    },
    {
      title: "Labor Benchmarking",
      description: "Sundae Report shows how your labor metrics compare to industry standards—helping you set realistic goals and identify best practices.",
      product: "Sundae Report",
      icon: "📈"
    }
  ];

  const outcomes = [
    {
      title: "Reduce turnover by 20%",
      description: "Identify retention issues early and implement targeted interventions",
      icon: "⬇️"
    },
    {
      title: "Optimize labor costs",
      description: "Balance staffing levels with demand to improve margins without sacrificing service",
      icon: "💰"
    },
    {
      title: "Improve compliance",
      description: "Automated monitoring helps you stay ahead of labor law changes and violations",
      icon: "✅"
    },
    {
      title: "Data-driven staffing",
      description: "Make hiring and scheduling decisions based on real performance data, not gut feel",
      icon: "📊"
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
              className="inline-flex items-center space-x-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span>👥</span>
              <span>People & HR Teams</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              Workforce Intelligence That Drives Retention
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Stop guessing at turnover causes. Sundae unifies labor, payroll, and performance data—giving you real-time visibility into workforce trends, proactive retention alerts, and the insights you need to build a stronger, more stable team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  See Workforce Dashboard
                </Button>
              </Link>
              <Link href="/report">
                <Button variant="outline" size="lg">
                  View Labor Benchmarks
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
              HR teams struggle with fragmented workforce data and reactive management
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
              Built for HR teams who need data-driven workforce insights
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
              Real outcomes for HR teams using Sundae
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
          <h2 className="section-h2 mb-6">Build a Stronger, More Stable Workforce</h2>
          <p className="body-xl mb-8 opacity-90">
            See how HR teams are using Sundae to reduce turnover, optimize labor costs, and make data-driven staffing decisions across their restaurant portfolio.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book an HR Team Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

