'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function DocumentationPage() {
  const sections: { title: string; description: string; icon: SundaeIconName; color: string; topics: string[] }[] = [
    {
      title: "Getting Started",
      description: "Learn how to onboard to Sundae and connect your data sources",
      icon: "growth",
      color: "bg-blue-600",
      topics: [
        "Creating your Sundae account",
        "Connecting your POS system",
        "Integrating payroll and HR data",
        "Linking budgets and forecasts",
        "Initial setup checklist"
      ]
    },
    {
      title: "Using Sundae Report",
      description: "Get the most out of free benchmarking and performance reports",
      icon: "benchmarking",
      color: "bg-green-600",
      topics: [
        "Uploading your data for benchmarking",
        "Understanding your benchmark report",
        "Comparing performance across locations",
        "Industry standards and peer groups",
        "Using insights to drive decisions"
      ]
    },
    {
      title: "Sundae Core Guide",
      description: "Master conversational business intelligence with natural language queries",
      icon: "intelligence",
      color: "bg-purple-600",
      topics: [
        "Asking questions in plain English",
        "Exploring dashboards and charts",
        "Creating custom views",
        "Saving and sharing insights",
        "Advanced query techniques"
      ]
    },
    {
      title: "Sundae Core",
      description: "Leverage AI-powered alerts and contextual intelligence",
      icon: "insights",
      color: "bg-orange-600",
      topics: [
        "Setting up proactive alerts",
        "Understanding anomaly detection",
        "Connecting external data (weather, events)",
        "Configuring notification preferences",
        "Acting on AI recommendations"
      ]
    },
    {
      title: "Sundae Core",
      description: "Build and customize dashboards for every team",
      icon: "chart",
      color: "bg-indigo-600",
      topics: [
        "Creating custom dashboards",
        "Configuring widgets and KPIs",
        "Setting up role-based views",
        "Scheduling automated reports",
        "Sharing dashboards with teams"
      ]
    },
    {
      title: "Security & Data Privacy",
      description: "Understand how Sundae protects your data",
      icon: "owners",
      color: "bg-teal-600",
      topics: [
        "Data encryption and security standards",
        "User access controls and permissions",
        "GDPR and compliance",
        "Data retention policies",
        "Privacy best practices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-graphite-black dark:via-gray-900 dark:to-deep-blue/10">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="document" size="md" />
              <span>Documentation</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Sundae Documentation
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
              Learn how to get the most out of Sundae — from setup to advanced features
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button variant="primary" size="lg">
                  Book a Demo
                </Button>
              </Link>
              <Link href="/report">
                <Button variant="outline" size="lg">
                  Try Sundae Report (Free)
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300 group dark:bg-gray-800">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        <SundaeIcon name={section.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {section.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Topics:</p>
                      <ul className="space-y-2">
                        {section.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <span className="text-blue-600 dark:text-blue-400 mt-0.5">→</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Quick Start Guide
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get up and running with Sundae in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {([
              {
                step: "1",
                title: "Connect Data Sources",
                description: "Link your POS, payroll, inventory, and budget systems to Sundae Scout",
                icon: "integration" as SundaeIconName
              },
              {
                step: "2",
                title: "Run Your First Benchmark",
                description: "Upload data to Sundae Report and see how you compare to similar restaurants",
                icon: "benchmarking" as SundaeIconName
              },
              {
                step: "3",
                title: "Ask Questions",
                description: "Use Sundae Core to query your data in plain English and get instant answers",
                icon: "intelligence" as SundaeIconName
              },
              {
                step: "4",
                title: "Set Up Alerts",
                description: "Configure Sundae Core to monitor key metrics and notify you of anomalies",
                icon: "warning" as SundaeIconName
              }
            ]).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="text-center h-full dark:bg-gray-800">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <SundaeIcon name={item.icon} size="xl" className="text-white" />
                    </div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">Step {item.step}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Need Help?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our team is here to help you get the most out of Sundae
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Contact Support
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-blue-600">
                Schedule Training
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-12">
            <div className="text-6xl mb-6">🚧</div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              More Documentation Coming Soon
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              We're continuously expanding our documentation. Check back soon for API references, video tutorials, and advanced guides.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Questions in the meantime?{" "}
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                Get in touch with our team →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
