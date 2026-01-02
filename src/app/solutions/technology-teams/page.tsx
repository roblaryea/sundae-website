'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function TechnologyTeamsPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Integration Complexity",
      description: "Managing data pipelines from dozens of restaurant systems with different APIs and data formats.",
      icon: "integration"
    },
    {
      title: "Data Quality Issues",
      description: "Inconsistent data, missing fields, and reconciliation nightmares across POS, payroll, and inventory systems.",
      icon: "alerts"
    },
    {
      title: "Scalability Demands",
      description: "As the restaurant group grows, data infrastructure struggles to keep pace with increasing complexity.",
      icon: "performance"
    },
    {
      title: "Reporting Bottlenecks",
      description: "Every new report request means custom ETL work, taking time away from strategic initiatives.",
      icon: "time"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Pre-Built Integrations",
      description: "Sundae Scout connects to 25+ restaurant systems out of the box—POS, labor, inventory, CRM—with automatic data normalization.",
      product: "Sundae Scout",
      icon: "scout"
    },
    {
      title: "Automated Data Quality",
      description: "Sundae Pulse monitors data pipelines, flags anomalies, and alerts you to integration issues before they impact reporting.",
      product: "Sundae Pulse",
      icon: "pulse"
    },
    {
      title: "Self-Service Analytics",
      description: "Sundae Core lets business users query data directly with natural language—reducing IT reporting backlog by 75%.",
      product: "Sundae Core",
      icon: "intelligence"
    },
    {
      title: "API-First Architecture",
      description: "Sundae's RESTful API lets you build custom integrations, push data to your warehouse, or embed intelligence into existing tools.",
      product: "Sundae API",
      icon: "technology"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Reduce integration time by 80%",
      description: "Pre-built connectors eliminate months of custom integration work",
      icon: "speed"
    },
    {
      title: "Eliminate reporting bottlenecks",
      description: "Self-service analytics free your team to focus on strategic projects",
      icon: "growth"
    },
    {
      title: "Scale data infrastructure",
      description: "Auto-scaling architecture grows with your restaurant portfolio",
      icon: "benchmarking"
    },
    {
      title: "Improve data quality",
      description: "Automated monitoring and validation ensure clean, reliable data",
      icon: "success"
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
              className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <SundaeIcon name="technology" size="md" />
              <span>Data & Technology Teams</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hero-h1 text-gray-900 mb-6"
            >
              Connect Once.
              <br />
              <span className="text-gradient">Access Everything.</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Pre-built connectors. Automated data quality. Self-service analytics. Stop plumbing data and start building value.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/demo">
                <Button variant="primary" size="lg" className="animate-pulse-glow">
                  See Technical Architecture
                </Button>
              </Link>
              <Link href="/architecture">
                <Button variant="outline" size="lg">
                  View API Documentation
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
              Custom ETL. Data quality issues. Endless report requests.
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
              Scalable infrastructure that works out of the box
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
              Less plumbing. More innovation.
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
          <h2 className="section-h2 mb-6">Ready to Simplify Your Stack?</h2>
          <p className="body-xl mb-8 opacity-90">
            See how technology teams eliminate integration complexity.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Book a Technical Deep Dive
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
