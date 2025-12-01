'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { motion } from "framer-motion";

export default function FinanceTeamsPage() {
  const challenges = [
    {
      title: "Fragmented Data Sources",
      description: "Financial data scattered across multiple systems—POS, payroll, inventory—making it difficult to get a complete picture.",
      icon: "📊"
    },
    {
      title: "Manual Data Compilation",
      description: "Hours spent pulling reports from different platforms and reconciling numbers in spreadsheets.",
      icon: "⏰"
    },
    {
      title: "Delayed Insights",
      description: "By the time you compile the data, it's already outdated—limiting your ability to make proactive decisions.",
      icon: "📉"
    },
    {
      title: "Limited Forecasting Accuracy",
      description: "Without real-time data and predictive analytics, forecasting remains guesswork rather than science.",
      icon: "🔮"
    }
  ];

  const howSundaeHelps = [
    {
      title: "Unified Financial Dashboard",
      description: "Sundae Canvas consolidates P&L, labor costs, COGS, and key financial metrics into one real-time view—no more spreadsheet juggling.",
      product: "Sundae Canvas",
      icon: "💰"
    },
    {
      title: "Automated Variance Analysis",
      description: "Sundae Insights automatically flags budget variances, margin compression, and cost anomalies before they impact the bottom line.",
      product: "Sundae Insights",
      icon: "🔍"
    },
    {
      title: "Instant Financial Queries",
      description: "Ask Sundae Nexus 'What's driving labor variance this month?' or 'Show me locations with declining margins' and get immediate answers.",
      product: "Sundae Nexus",
      icon: "💬"
    },
    {
      title: "Benchmark-Driven Forecasting",
      description: "Sundae Report provides industry benchmarks and historical trends to build more accurate forecasts and budgets.",
      product: "Sundae Report",
      icon: "📈"
    }
  ];

  const outcomes = [
    {
      title: "Reduce reporting time by 75%",
      description: "Automated data integration eliminates manual compilation and reconciliation",
      icon: "⚡"
    },
    {
      title: "Catch cost issues early",
      description: "Real-time alerts help you address margin compression before it compounds",
      icon: "🎯"
    },
    {
      title: "More accurate forecasts",
      description: "AI-powered predictions and benchmarks improve budget accuracy and planning",
      icon: "📊"
    },
    {
      title: "Better strategic focus",
      description: "Spend less time on data and more time on analysis and strategic planning",
      icon: "🚀"
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
              className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span>💰</span>
              <span>Finance & FP&A Teams</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              Financial Intelligence, Finally Unified
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Stop wrestling with fragmented data. Sundae unifies all your restaurant financial data—P&L, labor, COGS, and more—into one real-time platform, giving you the insights you need to drive profitability without the spreadsheet chaos.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  See Financial Dashboard
                </Button>
              </Link>
              <Link href="/report">
                <Button variant="outline" size="lg">
                  View Sample Financial Report
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
              Finance teams face data fragmentation and time-consuming manual processes
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
              Built for finance teams who need accuracy, speed, and unified data
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
              Real outcomes for finance teams using Sundae
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
          <h2 className="section-h2 mb-6">Transform Your Financial Operations</h2>
          <p className="body-xl mb-8 opacity-90">
            See how finance teams are using Sundae to eliminate manual reporting, improve forecast accuracy, and drive profitability across their restaurant portfolio.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book a Finance Team Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
