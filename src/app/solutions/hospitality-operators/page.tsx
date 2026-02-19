'use client';

import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function HospitalityOperatorsPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Complex Multi-Concept Operations",
      description: "Managing restaurants, bars, hotels, and catering under one roof with different metrics and KPIs for each.",
      icon: "multiLocation"
    },
    {
      title: "Seasonality & Demand Fluctuations",
      description: "Revenue swings based on tourism, events, and seasons make forecasting and staffing difficult.",
      icon: "benchmarking"
    },
    {
      title: "Guest Experience Consistency",
      description: "Maintaining service quality across multiple touchpoints—dining, room service, events, and more.",
      icon: "success"
    },
    {
      title: "Integrated F&B and Rooms Operations",
      description: "Coordinating between restaurant operations, banquets, and hotel services without unified visibility.",
      icon: "integration"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Unified Hospitality Dashboard",
      description: "Sundae Core consolidates F&B, rooms, events, and catering into one real-time view. Pulse monitors every shift with adaptive AI targets, labor productivity tracking, and server performance analytics.",
      product: "Sundae Core + Pulse",
      icon: "chart"
    },
    {
      title: "Event & Calendar Intelligence",
      description: "Watchtower discovers local events, public holidays, and religious observances (Ramadan-aware for MENA operations) — with AI impact assessments including staffing and prep recommendations tailored to each property.",
      product: "Watchtower (Core tier)",
      icon: "watchtower"
    },
    {
      title: "Competitive & Market Context",
      description: "Track named competitors via Google Places, monitor rating trends, and get daily AI briefings that combine your internal performance with weather forecasts, competitor activity, and market signals.",
      product: "Watchtower (Core tier)",
      icon: "balance"
    },
    {
      title: "Hospitality Benchmarking",
      description: "Sundae Report compares your F&B and hospitality metrics against similar properties and market leaders — with AI-powered analysis and recommendations.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Better demand forecasting",
      description: "Predict high-demand periods and optimize staffing and inventory accordingly",
      icon: "forecasting"
    },
    {
      title: "10-15% improvement in F&B margins",
      description: "Reduce waste and optimize pricing across restaurant, banquet, and room service",
      icon: "finance"
    },
    {
      title: "Enhanced guest experience",
      description: "Ensure consistent service quality across all touchpoints with real-time visibility",
      icon: "performance"
    },
    {
      title: "Unified multi-property view",
      description: "Manage multiple hotels or resorts from one intelligence platform",
      icon: "multiLocation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <section className="solution-hero solution-hero--operator pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="badge badge--operator inline-flex items-center gap-2"
            >
              <SundaeIcon name="hotel" size="md" />
              <span>Hospitality Operators</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              Every Touchpoint.
              <br />
              <span className="text-gradient">One Platform.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Restaurants, banquets, room service, catering — unified. Optimize every guest experience with one intelligence platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  See How Sundae Helps Hospitality
                </Button>
              </Link>
              <a href={REPORT_APP_URL}>
                <Button variant="outline" size="lg">
                  Get F&B Benchmark Report
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
              Multi-concept complexity. Seasonal swings. Disconnected systems.
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
              Unified F&B and rooms visibility. Demand-intelligent staffing.
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
              Better forecasting. Higher margins. Consistent guest experience.
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
          <h2 className="section-h2 mb-6">Ready to Unify Your Operations?</h2>
          <p className="body-xl mb-8 opacity-90">
            See how hospitality groups optimize every guest touchpoint.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book a Hospitality Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
