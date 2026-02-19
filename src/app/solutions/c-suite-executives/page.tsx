'use client';

import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function CSuiteExecutivesPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Lack of Real-Time Visibility",
      description: "Critical decisions are made with yesterday's data, leading to missed opportunities and reactive management.",
      icon: "benchmarking"
    },
    {
      title: "Disconnected Data Sources",
      description: "Finance, operations, and marketing data live in silos, making it impossible to see the complete picture.",
      icon: "integration"
    },
    {
      title: "No Predictive Intelligence",
      description: "You can see what happened, but not what's about to happen or why it's happening.",
      icon: "forecasting"
    },
    {
      title: "Strategic vs. Operational Trade-off",
      description: "You're forced to choose between strategic thinking and operational firefighting—there's no time for both.",
      icon: "balance"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Executive Command Center",
      description: "Sundae Core delivers a real-time executive dashboard with KPIs that matter — revenue, margins, labor productivity, and performance across your entire portfolio. Pulse monitors every shift with adaptive AI targets and server performance analytics.",
      product: "Sundae Core + Pulse",
      icon: "chart"
    },
    {
      title: "Competitive & Market Intelligence",
      description: "Watchtower tracks named competitors, monitors local events, and surfaces market trends — synthesized with your internal data into AI-powered daily briefings so you know what\u2019s happening inside and outside your business.",
      product: "Watchtower (Core tier)",
      icon: "watchtower"
    },
    {
      title: "Instant Strategic Answers",
      description: "Ask Sundae \u2018What\u2019s driving margin compression?\u2019 or \u2018Which locations are losing to competitor promotions?\u2019 and get data-backed answers that combine internal performance with external market context.",
      product: "Chat with Data",
      icon: "intelligence"
    },
    {
      title: "Historical Benchmarking",
      description: "Sundae Report shows how you compare to industry leaders and identifies gaps in performance, efficiency, and growth — with AI credits for deeper analysis.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Make faster, data-backed decisions",
      description: "Move from monthly reviews to real-time intelligence, enabling agile strategic adjustments",
      icon: "speed"
    },
    {
      title: "15-20% improvement in key metrics",
      description: "Optimize margins, reduce costs, and improve operational efficiency across the portfolio",
      icon: "performance"
    },
    {
      title: "Reduce strategic risk",
      description: "Identify threats and opportunities early with predictive AI insights and market intelligence",
      icon: "owners"
    },
    {
      title: "Unite your leadership team",
      description: "Give everyone access to the same real-time data and insights, aligning strategy and execution",
      icon: "support"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <section className="solution-hero solution-hero--role pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge badge--role inline-flex items-center gap-2"
            >
              <SundaeIcon name="owners" size="md" />
              <span>C-Suite Executives</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              Lead with Clarity.
              <br />
              <span className="text-gradient">Not Guesswork.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Real-time visibility. Predictive insights. One platform that unifies everything you need to make confident decisions at scale.
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
              <a href={REPORT_APP_URL}>
                <Button variant="outline" size="lg">
                  Get Executive Benchmark Report
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">The Problems You Know</h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Silos, stale data, and reactive decision-making
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name={challenge.icon} size="lg" className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 mb-2">{challenge.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-slate-300">{challenge.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">How Sundae Changes That</h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Intelligence built for executive decision-making
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {howSundaeHelps.map((item, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name={item.icon} size="lg" className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-semibold mb-1">{item.product}</div>
                      <CardTitle className="text-gray-900 mb-2">{item.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-slate-300">{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">What Changes</h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Measurable impact on speed, visibility, and growth
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {outcomes.map((outcome, index) => (
              <Card key={index} variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name={outcome.icon} size="lg" className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-900 mb-2">{outcome.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-slate-300">{outcome.description}</CardDescription>
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
          <h2 className="section-h2 mb-6">Ready to Lead Smarter?</h2>
          <p className="body-xl mb-8 opacity-90">
            See how Sundae gives executives the clarity to make confident decisions.
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
