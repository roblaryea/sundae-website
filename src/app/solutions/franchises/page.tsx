'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function FranchisesPage() {
  const challenges = [
    {
      title: "Franchisee Performance Variability",
      description: "Wide performance gaps between franchisees with no clear way to identify and address underperformance early.",
      icon: "📊"
    },
    {
      title: "Brand Consistency Challenges",
      description: "Ensuring quality, service standards, and operational compliance across independently owned locations.",
      icon: "🏷️"
    },
    {
      title: "Data Fragmentation",
      description: "Each franchisee may use different systems, making network-wide insights nearly impossible.",
      icon: "🔗"
    },
    {
      title: "Support & Training Gaps",
      description: "Identifying which franchisees need help and what kind of support will actually move the needle.",
      icon: "🎯"
    }
  ];

  const howSundaeHelps = [
    {
      title: "Network-Wide Visibility",
      description: "Sundae Canvas unifies data from all franchisees into one dashboard, giving you real-time visibility into every location's performance.",
      product: "Sundae Canvas",
      icon: "🌐"
    },
    {
      title: "Automated Performance Alerts",
      description: "Sundae Insights flags underperforming franchisees and identifies the specific areas needing attention before issues escalate.",
      product: "Sundae Insights",
      icon: "🚨"
    },
    {
      title: "Benchmarking & Best Practices",
      description: "Sundae Report shows each franchisee how they compare to network leaders, creating healthy competition and clear improvement targets.",
      product: "Sundae Report",
      icon: "📈"
    },
    {
      title: "Conversational Support",
      description: "Ask Sundae Nexus 'Which franchisees have the highest labor variance?' and get instant answers to guide your support efforts.",
      product: "Sundae Nexus",
      icon: "💬"
    }
  ];

  const outcomes = [
    {
      title: "15-20% improvement in underperforming franchisees",
      description: "Identify issues early and provide targeted support to lift lagging locations",
      icon: "📈"
    },
    {
      title: "Better franchisee relationships",
      description: "Use data to have constructive conversations and provide value-added support",
      icon: "🤝"
    },
    {
      title: "Faster network growth",
      description: "Attract new franchisees by demonstrating your data-driven support system",
      icon: "🚀"
    },
    {
      title: "Reduced brand risk",
      description: "Catch compliance and quality issues before they impact your reputation",
      icon: "🛡️"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span>🏪</span>
              <span>Franchises</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Empower Every Franchisee
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Managing a franchise network means balancing brand consistency with franchisee autonomy. Sundae gives you real-time visibility into every location's performance while empowering franchisees with the insights they need to succeed—creating a win-win relationship built on data, not assumptions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  See How Sundae Helps Franchises
                </Button>
              </Link>
              <Link href="/report">
                <Button variant="outline" size="lg">
                  Get Free Network Analysis
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Challenges Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Key Challenges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Franchise networks face unique operational and relationship challenges
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
                      <CardDescription className="text-gray-600">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How Sundae Helps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for franchise networks that want to support, not micromanage
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
                      <CardDescription className="text-gray-600">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What You Can Achieve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real outcomes from franchise networks using Sundae
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
                      <CardDescription className="text-gray-600">
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Support Your Network With Data
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join franchise brands using Sundae to drive consistency, support franchisees, and accelerate network growth.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book a Franchise Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
