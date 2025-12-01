'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function MarketingTeamsPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Attribution Blind Spots",
      description: "Struggling to connect marketing spend to actual restaurant performance and revenue impact.",
      icon: "marketing"
    },
    {
      title: "Fragmented Campaign Data",
      description: "Marketing data lives in one system, sales data in another—making it impossible to see the full picture.",
      icon: "benchmarking"
    },
    {
      title: "Generic Insights",
      description: "National-level metrics don't reveal which locations are responding best to campaigns or why.",
      icon: "multiLocation"
    },
    {
      title: "Slow Response Times",
      description: "By the time you get performance data, the campaign window has already closed.",
      icon: "time"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Real-Time Campaign Attribution",
      description: "Sundae Canvas connects marketing spend to sales lift at every location—see which campaigns are driving revenue in real time.",
      product: "Sundae Canvas",
      icon: "performance"
    },
    {
      title: "Location-Level Insights",
      description: "Sundae Insights shows which locations are responding to campaigns and which need different messaging or channels.",
      product: "Sundae Insights",
      icon: "insights"
    },
    {
      title: "Ask Marketing Questions",
      description: "Ask Sundae Nexus 'Which locations had the best ROI from our last promo?' or 'What's the average check lift from loyalty members?' and get instant answers.",
      product: "Sundae Nexus",
      icon: "nexus"
    },
    {
      title: "Benchmark Performance",
      description: "Sundae Report shows how your marketing-driven metrics compare to industry standards and top performers.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Optimize campaign spend",
      description: "Identify high-performing locations and channels to allocate budget more effectively",
      icon: "finance"
    },
    {
      title: "Prove marketing ROI",
      description: "Connect campaigns directly to revenue impact with location-level attribution",
      icon: "performance"
    },
    {
      title: "React faster to campaigns",
      description: "Real-time data lets you adjust campaigns mid-flight based on performance",
      icon: "speed"
    },
    {
      title: "Personalize by location",
      description: "Understand which locations respond to different messages and offers",
      icon: "canvas"
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
              className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span>🎨</span>
              <span>Marketing Teams</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              See What's Working.
              <br />
              <span className="text-gradient">Cut What's Not.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Connect campaigns to revenue. Get location-level attribution. Prove ROI with real data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  See Marketing Dashboard
                </Button>
              </Link>
              <Link href="/report">
                <Button variant="outline" size="lg">
                  View Campaign Analytics
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">The Problems You Know</h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Attribution blind spots. Siloed data. Slow feedback loops.
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
              Real-time attribution and location-level performance
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
              Smarter spend. Faster optimization. Provable ROI.
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
          <h2 className="section-h2 mb-6">Ready to Prove ROI?</h2>
          <p className="body-xl mb-8 opacity-90">
            See how marketing teams connect campaigns to revenue.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book a Marketing Team Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
