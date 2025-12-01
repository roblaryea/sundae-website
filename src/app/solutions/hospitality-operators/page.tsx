'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function HospitalityOperatorsPage() {
  const challenges = [
    {
      title: "Complex Multi-Concept Operations",
      description: "Managing restaurants, bars, hotels, and catering under one roof with different metrics and KPIs for each.",
      icon: "🏨"
    },
    {
      title: "Seasonality & Demand Fluctuations",
      description: "Revenue swings based on tourism, events, and seasons make forecasting and staffing difficult.",
      icon: "📊"
    },
    {
      title: "Guest Experience Consistency",
      description: "Maintaining service quality across multiple touchpoints—dining, room service, events, and more.",
      icon: "⭐"
    },
    {
      title: "Integrated F&B and Rooms Operations",
      description: "Coordinating between restaurant operations, banquets, and hotel services without unified visibility.",
      icon: "🔗"
    }
  ];

  const howSundaeHelps = [
    {
      title: "Unified Hospitality Dashboard",
      description: "Sundae Canvas consolidates F&B, rooms, events, and catering into one real-time view of your entire operation.",
      product: "Sundae Canvas",
      icon: "🎯"
    },
    {
      title: "Demand & Event Intelligence",
      description: "Sundae Insights correlates bookings, local events, weather, and tourism data to optimize staffing and inventory ahead of demand spikes.",
      product: "Sundae Insights",
      icon: "📈"
    },
    {
      title: "Conversational Operations",
      description: "Ask Sundae Nexus 'What's driving the banquet revenue increase?' or 'Compare F&B performance across properties' for instant answers.",
      product: "Sundae Nexus",
      icon: "💬"
    },
    {
      title: "Hospitality Benchmarking",
      description: "Sundae Report compares your F&B and hospitality metrics against similar properties and market leaders.",
      product: "Sundae Report",
      icon: "📊"
    }
  ];

  const outcomes = [
    {
      title: "Better demand forecasting",
      description: "Predict high-demand periods and optimize staffing and inventory accordingly",
      icon: "🎯"
    },
    {
      title: "10-15% improvement in F&B margins",
      description: "Reduce waste and optimize pricing across restaurant, banquet, and room service",
      icon: "💰"
    },
    {
      title: "Enhanced guest experience",
      description: "Ensure consistent service quality across all touchpoints with real-time visibility",
      icon: "⭐"
    },
    {
      title: "Unified multi-property view",
      description: "Manage multiple hotels or resorts from one intelligence platform",
      icon: "🏨"
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
              <span>🏨</span>
              <span>Hospitality Operators</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              Hospitality Intelligence, Unified
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Running hotels, resorts, or multi-concept hospitality groups means managing complex, interconnected operations—from restaurants and banquets to room service and catering. Sundae unifies all your F&B and hospitality data into one decision intelligence platform, giving you the clarity to optimize every guest touchpoint.
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
              <Link href="/report">
                <Button variant="outline" size="lg">
                  Get F&B Benchmark Report
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
              Hospitality operations face unique complexity and coordination challenges
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
              Built for hospitality groups managing complex, multi-concept operations
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
              Real outcomes from hospitality groups using Sundae
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
          <h2 className="section-h2 mb-6">Elevate Your Hospitality Operations</h2>
          <p className="body-xl mb-8 opacity-90">
            Join hospitality groups using Sundae to unify F&B and rooms operations, optimize guest experiences, and drive profitability.
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
