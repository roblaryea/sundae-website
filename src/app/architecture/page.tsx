'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';

export default function ArchitecturePage() {
  const intelligenceStack: { title: string; subtitle: string; description: string; color: string; icon: SundaeIconName; size: string; textColor?: string }[] = [
    {
      title: "Decision Intelligence",
      subtitle: "Top Layer",
      description: "Benchmarks, insights, forecasting, automated decisions",
      color: "bg-gradient-to-r from-pink-500 to-rose-500",
      icon: "intelligence",
      size: "large"
    },
    {
      title: "AI Processing",
      subtitle: "Intelligence Layer",
      description: "Multi-agent AI, pattern detection, anomaly detection, reasoning",
      color: "bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900",
      textColor: "text-gray-900 dark:text-white",
      icon: "speed",
      size: "large"
    },
    {
      title: "Data Processing",
      subtitle: "Transformation Layer",
      description: "Cleaning, transformation, metrics logic, enrichment",
      color: "bg-gradient-to-r from-yellow-400 to-amber-400",
      icon: "data",
      size: "medium"
    },
    {
      title: "Data Integration",
      subtitle: "Unification Layer",
      description: "POS, labor, inventory, reservations, delivery aggregators, raw data unification",
      color: "bg-gradient-to-r from-orange-500 to-amber-600",
      icon: "integration",
      size: "medium"
    },
    {
      title: "Foundation / Infrastructure",
      subtitle: "Base Layer",
      description: "Secure pipelines, API ingestion, normalization, governance",
      color: "bg-gradient-to-r from-amber-700 to-orange-800",
      icon: "network",
      size: "base"
    }
  ];

  const modules: { name: string; description: string; icon: SundaeIconName; features: string[]; colorClass: string }[] = [
    {
      name: "Scout",
      description: "Universal data integration layer connecting 25+ restaurant systems",
      icon: "scout",
      features: ["POS Integration", "Labor Systems", "Inventory", "Real-time Sync"],
      colorClass: "component-icon--scout"
    },
    {
      name: "Pulse",
      description: "AI-powered anomaly detection and real-time alert system",
      icon: "pulse",
      features: ["Anomaly Detection", "Real-time Alerts", "Pattern Analysis", "Threshold Monitoring"],
      colorClass: "component-icon--pulse"
    },
    {
      name: "Forge",
      description: "Conversational AI engine for natural language intelligence",
      icon: "forge",
      features: ["Natural Language", "Context Understanding", "Query Engine", "AI Responses"],
      colorClass: "component-icon--forge"
    },
    {
      name: "Canvas",
      description: "Dynamic visualization and dashboard intelligence layer",
      icon: "canvas",
      features: ["Real-time Dashboards", "Custom Views", "Visual Analytics", "Interactive Reports"],
      colorClass: "component-icon--canvas"
    },
    {
      name: "Watchtower",
      description: "Market intelligence and competitive benchmarking engine",
      icon: "watchtower",
      features: ["Market Insights", "Competitor Data", "Trend Analysis", "Geographic Intelligence"],
      colorClass: "bg-gradient-to-br from-red-400 to-red-600"
    }
  ];

  const aiAgents: { name: string; description: string; icon: SundaeIconName }[] = [
    {
      name: "Pattern Agents",
      description: "Identify recurring operational patterns, seasonal trends, and hidden correlations across locations",
      icon: "visibility"
    },
    {
      name: "Forecasting Agents",
      description: "Predict sales, labor needs, inventory requirements, and operational demand using ML models",
      icon: "forecasting"
    },
    {
      name: "Context Agents",
      description: "Understand operational context, location specifics, and business rules to provide relevant insights",
      icon: "intelligence"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-white via-pure-white to-blue-50 dark:from-graphite-black dark:via-gray-900 dark:to-deep-blue/10">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-[42px] md:text-[48px] font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              The Sundae
              <br />
              <span className="text-gradient">Architecture</span>
            </h1>
            <p className="text-[17px] text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-[1.65]">
              Built on a foundation of unified data and powered by multi-agent AI, 
              Sundae creates a new category of restaurant intelligence that goes beyond traditional dashboards.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/demo">
                <Button variant="primary" size="lg" className="px-10 py-4 text-[16px] font-semibold shadow-lg hover:shadow-xl">
                  See Architecture Demo
                </Button>
              </Link>
              <Link href="/product">
                <Button variant="outline" size="lg" className="px-10 py-4 text-[16px] font-semibold">
                  Explore Modules
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intelligence Stack */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] md:text-[36px] font-bold text-gray-900 dark:text-white mb-6">
              The Sundae Intelligence Stack
            </h2>
            <p className="text-[17px] text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-[1.65]">
              Five layers that transform raw restaurant data into actionable intelligence
            </p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto">
            {/* Stacked Layers */}
            <div className="space-y-6">
              {intelligenceStack.map((layer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`${layer.color} ${layer.textColor || 'text-white'} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    layer.size === 'large' ? 'transform hover:scale-[1.02]' : 'transform hover:scale-[1.01]'
                  }`}>
                    <div className="flex items-start space-x-6">
                      <motion.div 
                        className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0"
                        animate={{ 
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <SundaeIcon name={layer.icon} size="xl" className={layer.textColor === 'text-gray-900 dark:text-white' ? 'text-blue-600' : 'text-white'} />
                      </motion.div>
                      <div className="flex-grow">
                        <div className={`text-sm font-semibold mb-2 ${layer.textColor === 'text-gray-900 dark:text-white' ? 'text-gray-600 dark:text-gray-400' : 'opacity-90'}`}>
                          {layer.subtitle}
                        </div>
                        <h3 className="text-[20px] md:text-[22px] font-bold mb-3">{layer.title}</h3>
                        <p className={`text-[17px] leading-[1.65] ${layer.textColor === 'text-gray-900 dark:text-white' ? 'text-gray-700 dark:text-gray-300' : 'opacity-95'}`}>
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Foundation Icon */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-8"
            >
              <div className="text-7xl mb-4">🍨</div>
              <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-[1.65]">
                Built on a solid foundation of security and reliability
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* From Data to Decisions */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-deep-blue/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] md:text-[36px] font-bold text-gray-900 dark:text-white mb-6">
              From Data to Decisions
            </h2>
            <p className="text-[17px] text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-[1.65]">
              How raw data becomes actionable intelligence in milliseconds
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {([
              {
                step: "1",
                title: "Data Collection",
                description: "Scout connects to 25+ restaurant systems and external data sources",
                icon: "integration" as SundaeIconName
              },
              {
                step: "2",
                title: "AI Processing",
                description: "Multi-agent AI analyzes data patterns and generates insights",
                icon: "intelligence" as SundaeIconName
              },
              {
                step: "3",
                title: "Intelligence Delivery",
                description: "Actionable recommendations delivered through natural language and visualizations",
                icon: "insights" as SundaeIconName
              }
            ]).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <motion.div 
                  className="w-24 h-24 bg-electric-blue rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <SundaeIcon name={step.icon} size="xl" className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-[16px] text-gray-600 dark:text-gray-400 leading-[1.65]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Agent AI Engine */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] md:text-[36px] font-bold text-gray-900 dark:text-white mb-6">
              Multi-Agent AI Engine
            </h2>
            <p className="text-[17px] text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-[1.65]">
              Specialized AI agents working together to deliver comprehensive intelligence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {aiAgents.map((agent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                      <SundaeIcon name={agent.icon} size="xl" className="text-white" />
                    </div>
                    <CardTitle className="text-center text-xl text-gray-900 dark:text-white mb-4">
                      {agent.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[16px] text-gray-600 dark:text-gray-400 text-center leading-[1.65]">
                      {agent.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Modules */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-deep-blue/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-[30px] md:text-[36px] font-bold text-gray-900 dark:text-white mb-6">
              Architecture Modules
            </h2>
            <p className="text-[17px] text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-[1.65]">
              Five core modules that power the Sundae Intelligence Stack
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${module.colorClass} rounded-lg flex items-center justify-center`}>
                        <SundaeIcon name={module.icon} size="lg" className="text-white" />
                      </div>
                      <CardTitle className="text-2xl text-gray-900 dark:text-white">{module.name}</CardTitle>
                    </div>
                    <CardDescription className="text-[16px] text-gray-600 dark:text-gray-400 leading-[1.65]">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-electric-blue rounded-full"></div>
                          <span className="text-[15px] text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Enterprise Security & Compliance
              </h2>
              <p className="text-[16px] text-gray-700 dark:text-gray-300 mb-8 leading-[1.65]">
                Bank-level security and compliance standards protecting your restaurant data
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    title: "End-to-End Encryption",
                    description: "AES-256 encryption for data in transit and at rest",
                    icon: "🔒"
                  },
                  {
                    title: "Access Control",
                    description: "Role-based access with multi-factor authentication",
                    icon: "🔑"
                  },
                  {
                    title: "Compliance Standards",
                    description: "SOC 2 Type II, GDPR, and CCPA compliant",
                    icon: "✅"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-3xl mt-1">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-[16px] text-gray-600 dark:text-gray-400 leading-[1.65]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10 rounded-2xl p-8 shadow-xl border-2 border-gray-200 dark:border-slate-800 dark:border-gray-700">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: "SOC 2 Type II", status: "Certified", color: "green" },
                    { name: "GDPR", status: "Compliant", color: "blue" },
                    { name: "CCPA", status: "Compliant", color: "purple" },
                    { name: "ISO 27001", status: "In Progress", color: "amber" }
                  ].map((cert, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 bg-${cert.color}-50 dark:bg-${cert.color}-900/20 rounded-xl border border-${cert.color}-200 dark:border-${cert.color}-800`}>
                      <span className="font-semibold text-gray-900 dark:text-white">{cert.name}</span>
                      <span className={`text-${cert.color}-600 dark:text-${cert.color}-400 text-sm font-medium`}>
                        {cert.status === "In Progress" ? "🔄" : "✓"} {cert.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium Engineering */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-deep-blue/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Built with Premium Engineering
            </h2>
            <p className="text-[16px] text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-[1.65]">
              Enterprise-grade technology crafted with the finest components and methodologies
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Premium Scoops",
                icon: "🍦",
                features: [
                  "Multi-agent AI engine",
                  "Continuous learning models",
                  "Predictive analytics",
                  "Natural language processing"
                ]
              },
              {
                title: "Perfect Texture",
                icon: "✨",
                features: [
                  "Real-time data processing",
                  "Sub-second response times",
                  "99.9% uptime SLA",
                  "Auto-scaling infrastructure"
                ]
              },
              {
                title: "Quality Ingredients",
                icon: "🥛",
                features: [
                  "25+ pre-built connectors",
                  "RESTful API architecture",
                  "Webhook support",
                  "Custom integration tools"
                ]
              },
              {
                title: "Secret Sauce",
                icon: "🍯",
                features: [
                  "Advanced algorithms",
                  "Machine learning models",
                  "Pattern recognition",
                  "Anomaly detection"
                ]
              },
              {
                title: "Fresh Toppings",
                icon: "🍓",
                features: [
                  "Interactive dashboards",
                  "Natural language queries",
                  "Mobile-responsive design",
                  "Real-time alerts"
                ]
              },
              {
                title: "Quality Control",
                icon: "🏆",
                features: [
                  "SOC 2 Type II compliant",
                  "End-to-end encryption",
                  "Role-based access",
                  "Regular audits"
                ]
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="text-3xl">{item.icon}</div>
                      <CardTitle className="text-xl text-gray-900 dark:text-white">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-electric-blue rounded-full mt-2"></div>
                          <span className="text-[15px] text-gray-600 dark:text-gray-400 leading-[1.65]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue via-electric-blue to-deep-blue dark:from-deep-blue dark:via-electric-blue dark:to-deep-blue relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[30px] md:text-[36px] font-bold text-white mb-8 tracking-tight">
              See the Full Technical Architecture
            </h2>
            <p className="text-[17px] text-white mb-12 leading-[1.65] font-medium">
              Get a personalized walkthrough of Sundae's intelligence architecture 
              and see how it can transform your restaurant operations
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/demo">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-electric-blue hover:bg-gray-100 font-semibold px-10 py-4 text-[16px] shadow-xl hover:shadow-2xl transition-all"
                >
                  Schedule Demo
                </Button>
              </Link>
              <Link href="/product">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-electric-blue font-semibold px-10 py-4 text-[16px] shadow-xl hover:shadow-2xl transition-all"
                >
                  Explore Modules
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
