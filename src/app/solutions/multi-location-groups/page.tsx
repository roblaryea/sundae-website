'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function MultiLocationGroupsPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Fragmented Data Across Locations",
      description: "Each location uses different systems, making it impossible to see a unified view of performance.",
      icon: "benchmarking"
    },
    {
      title: "Inconsistent Performance",
      description: "Some locations thrive while others underperform, but you don't know why or how to replicate success.",
      icon: "decrease"
    },
    {
      title: "Slow Decision-Making",
      description: "By the time you collect and analyze data from all locations, the opportunity to act has passed.",
      icon: "time"
    },
    {
      title: "Labor & Cost Control Issues",
      description: "Labor costs and food waste vary wildly across locations with no clear visibility into the root causes.",
      icon: "finance"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Unified Real-Time Dashboard",
      description: "Sundae Core brings all your locations into one view. See sales, labor, margins, and operations across every site in real-time.",
      product: "Sundae Core",
      icon: "chart"
    },
    {
      title: "Instant AI Insights",
      description: "Sundae Core automatically flags anomalies, opportunities, and risks across your portfolio before they impact your bottom line.",
      product: "Sundae Core",
      icon: "intelligence"
    },
    {
      title: "Conversational Intelligence",
      description: "Ask Sundae Core questions like 'Which locations are underperforming on labor cost?' and get instant answers with context.",
      product: "Sundae Core",
      icon: "intelligence"
    },
    {
      title: "Benchmark Performance",
      description: "Sundae Report compares each location against your top performers and industry benchmarks, showing you exactly where to improve.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "10-15% improvement in underperforming locations",
      description: "Identify and replicate best practices from your top sites",
      icon: "growth"
    },
    {
      title: "5-8% reduction in labor costs",
      description: "Optimize staffing across all locations based on real demand patterns",
      icon: "speed"
    },
    {
      title: "Faster decision-making",
      description: "Act on opportunities and issues in hours, not days or weeks",
      icon: "performance"
    },
    {
      title: "Consistent operational excellence",
      description: "Standardize processes while adapting to local market conditions",
      icon: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section - Operator (Blue) */}
      <section className="solution-hero solution-hero--operator pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="badge badge--operator inline-flex items-center gap-2 mb-6">
                <SundaeIcon name="franchise" size="md" />
                SOLUTIONS FOR MULTI-LOCATION GROUPS
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              Unify. Optimize.
              <br />
              <span className="text-gradient">Scale.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Every location. One platform. Real-time visibility and AI-powered insights to replicate success everywhere.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  See How Sundae Helps Multi-Location Groups
                </Button>
              </Link>
              <Link href="/report">
                <Button variant="outline" size="lg">
                  Get Free Benchmark Report
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Challenges Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              The Problems You Know
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Fragmented data. Inconsistent performance. Slow decisions.
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
                      <CardDescription className="text-gray-600 dark:text-slate-300">
                        {challenge.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Sundae Helps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              How Sundae Changes That
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              One dashboard. Real-time insights. Portfolio-wide benchmarking.
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
                      <CardDescription className="text-gray-600 dark:text-slate-300">
                        {item.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              What Changes
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Lift underperformers. Reduce costs. Scale faster.
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
                      <CardDescription className="text-gray-600 dark:text-slate-300">
                        {outcome.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Ready to Unify Your Portfolio?
          </h2>
          <p className="body-xl mb-8 opacity-90">
            See how multi-location groups replicate success everywhere.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book a Strategy Session
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
