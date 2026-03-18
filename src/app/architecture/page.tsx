'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/PageAnimations';

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
      color: "bg-gradient-to-r from-slate-50 to-blue-50",
      textColor: "text-[var(--text-primary)]",
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
      description: "Universal data integration layer connecting 30+ restaurant systems across 12 data domains",
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
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <PageHero
        badge="Platform Architecture"
        title="Five Layers of Intelligence"
        description="From raw data ingestion to AI-powered decisions — see how Sundae transforms fragmented restaurant data into operational clarity."
      />

      {/* Intelligence Stack */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-[30px] md:text-[36px] font-bold text-[var(--text-primary)] mb-6">
              The Sundae Intelligence Stack
            </h2>
            <p className="text-[17px] text-[var(--text-secondary)] max-w-3xl mx-auto leading-[1.65]">
              Five layers that transform raw restaurant data into actionable intelligence
            </p>
          </FadeUp>

          <div className="relative max-w-5xl mx-auto">
            {/* Stacked Layers */}
            <StaggerContainer className="space-y-6" staggerDelay={0.12}>
              {intelligenceStack.map((layer, index) => (
                <StaggerItem key={index}>
                  <div className={`${layer.color} ${layer.textColor || 'text-[var(--text-primary)]'} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    layer.size === 'large' ? 'transform hover:scale-[1.02]' : 'transform hover:scale-[1.01]'
                  }`}>
                    <div className="flex items-start space-x-6">
                      <div
                        className="w-14 h-14 bg-[var(--navy-deep)]/20 rounded-lg flex items-center justify-center flex-shrink-0"
                      >
                        <SundaeIcon name={layer.icon} size="xl" className={layer.textColor === 'text-[var(--text-primary)]' ? 'text-[#60A5FA]' : 'text-[var(--text-primary)]'} />
                      </div>
                      <div className="flex-grow">
                        <div className={`text-sm font-semibold mb-2 ${layer.textColor === 'text-[var(--text-primary)]' ? 'text-[var(--text-supporting)]' : 'opacity-90'}`}>
                          {layer.subtitle}
                        </div>
                        <h3 className="text-[20px] md:text-[22px] font-bold mb-3">{layer.title}</h3>
                        <p className={`text-[17px] leading-[1.65] ${layer.textColor === 'text-[var(--text-primary)]' ? 'text-[var(--text-secondary)]' : 'opacity-95'}`}>
                          {layer.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Foundation Icon */}
            <FadeUp delay={0.5} className="text-center mt-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-700 to-orange-800 rounded-full flex items-center justify-center">
                <SundaeIcon name="network" size="xl" className="text-[var(--text-primary)]" />
              </div>
              <p className="text-[15px] text-[var(--text-supporting)] leading-[1.65]">
                Built on a solid foundation of security, governance, and reliability
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* From Data to Decisions */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-[30px] md:text-[36px] font-bold text-[var(--text-primary)] mb-6">
              From Data to Decisions
            </h2>
            <p className="text-[17px] text-[var(--text-secondary)] max-w-3xl mx-auto leading-[1.65]">
              How raw data becomes actionable intelligence in milliseconds
            </p>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {([
              {
                step: "1",
                title: "Data Collection",
                description: "Scout connects to 30+ restaurant systems across 12 data domains and external data sources",
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
              <StaggerItem key={index} className="text-center">
                <motion.div
                  className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center text-[var(--text-primary)] mx-auto mb-6 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <SundaeIcon name={step.icon} size="xl" className="text-[var(--text-primary)]" />
                </motion.div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{step.title}</h3>
                <p className="text-[16px] text-[var(--text-supporting)] leading-[1.65]">{step.description}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Multi-Agent AI Engine */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-[30px] md:text-[36px] font-bold text-[var(--text-primary)] mb-6">
              Multi-Agent AI Engine
            </h2>
            <p className="text-[17px] text-[var(--text-secondary)] max-w-3xl mx-auto leading-[1.65]">
              Specialized AI agents working together to deliver comprehensive intelligence
            </p>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {aiAgents.map((agent, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                      <SundaeIcon name={agent.icon} size="xl" className="text-[var(--text-primary)]" />
                    </div>
                    <CardTitle className="text-center text-xl text-[var(--text-primary)] mb-4">
                      {agent.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[16px] text-[var(--text-supporting)] text-center leading-[1.65]">
                      {agent.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Architecture Modules */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-[30px] md:text-[36px] font-bold text-[var(--text-primary)] mb-6">
              Architecture Modules
            </h2>
            <p className="text-[17px] text-[var(--text-secondary)] max-w-3xl mx-auto leading-[1.65]">
              Five core modules that power the Sundae Intelligence Stack
            </p>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {modules.map((module, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${module.colorClass} rounded-lg flex items-center justify-center`}>
                        <SundaeIcon name={module.icon} size="lg" className="text-[var(--text-primary)]" />
                      </div>
                      <CardTitle className="text-2xl text-[var(--text-primary)]">{module.name}</CardTitle>
                    </div>
                    <CardDescription className="text-[16px] text-[var(--text-supporting)] leading-[1.65]">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {module.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                          <span className="text-[15px] text-[var(--text-secondary)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <FadeUp>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
                Enterprise Security & Compliance
              </h2>
              <p className="text-[16px] text-[var(--text-secondary)] mb-8 leading-[1.65]">
                Bank-level security and compliance standards protecting your restaurant data
              </p>

              <div className="space-y-6">
                {([
                  {
                    title: "End-to-End Encryption",
                    description: "AES-256 encryption for data in transit and at rest",
                    icon: "risk" as SundaeIconName
                  },
                  {
                    title: "Access Control",
                    description: "Role-based access with multi-factor authentication",
                    icon: "integration" as SundaeIconName
                  },
                  {
                    title: "Compliance Standards",
                    description: "SOC 2 Type II, GDPR, and CCPA compliant",
                    icon: "success" as SundaeIconName
                  }
                ]).map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 mt-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name={item.icon} size="md" className="text-[var(--text-primary)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                      <p className="text-[16px] text-[var(--text-supporting)] leading-[1.65]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl p-8 shadow-xl border-2 border-[var(--border-default)]">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center"><SundaeIcon name="success" size="xl" className="text-white" /></div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">Certifications</h3>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                      <span className="font-semibold text-[var(--text-primary)]">SOC 2 Type II</span>
                      <span className="text-green-600 text-sm font-medium">✓ Certified</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[rgba(28,71,255,0.1)] rounded-xl border border-blue-200">
                      <span className="font-semibold text-[var(--text-primary)]">GDPR</span>
                      <span className="text-[#60A5FA] text-sm font-medium">✓ Compliant</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
                      <span className="font-semibold text-[var(--text-primary)]">CCPA</span>
                      <span className="text-purple-600 text-sm font-medium">✓ Compliant</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <span className="font-semibold text-[var(--text-primary)]">ISO 27001</span>
                      <span className="text-amber-600 text-sm font-medium"><SundaeIcon name="sync" size="sm" className="inline" /> In Progress</span>
                    </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Premium Engineering */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
              Built with Premium Engineering
            </h2>
            <p className="text-[16px] text-[var(--text-secondary)] max-w-3xl mx-auto leading-[1.65]">
              Enterprise-grade technology crafted with the finest components and methodologies
            </p>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {([
              {
                title: "Multi-Agent AI",
                icon: "intelligence" as SundaeIconName,
                color: "from-purple-500 to-purple-600",
                features: [
                  "Multi-agent AI engine",
                  "Continuous learning models",
                  "Predictive analytics",
                  "Natural language processing"
                ]
              },
              {
                title: "Real-Time Processing",
                icon: "speed" as SundaeIconName,
                color: "from-blue-500 to-blue-600",
                features: [
                  "Real-time data processing",
                  "Sub-second response times",
                  "99.9% uptime SLA",
                  "Auto-scaling infrastructure"
                ]
              },
              {
                title: "Integration Engine",
                icon: "integration" as SundaeIconName,
                color: "from-green-500 to-green-600",
                features: [
                  "12-domain data connectors",
                  "RESTful API architecture",
                  "Webhook support",
                  "Custom integration tools"
                ]
              },
              {
                title: "Intelligence Core",
                icon: "insights" as SundaeIconName,
                color: "from-orange-500 to-orange-600",
                features: [
                  "Advanced algorithms",
                  "Machine learning models",
                  "Pattern recognition",
                  "Anomaly detection"
                ]
              },
              {
                title: "Delivery Layer",
                icon: "canvas" as SundaeIconName,
                color: "from-cyan-500 to-cyan-600",
                features: [
                  "Interactive dashboards",
                  "Natural language queries",
                  "Mobile-responsive design",
                  "Real-time alerts"
                ]
              },
              {
                title: "Security & Governance",
                icon: "quality" as SundaeIconName,
                color: "from-red-500 to-red-600",
                features: [
                  "SOC 2 Type II compliant",
                  "End-to-end encryption",
                  "Role-based access control",
                  "Regular security audits"
                ]
              }
            ]).map((item, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}>
                        <SundaeIcon name={item.icon} size="lg" className="text-[var(--text-primary)]" />
                      </div>
                      <CardTitle className="text-xl text-[var(--text-primary)]">{item.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-slate-900 rounded-full mt-2"></div>
                          <span className="text-[15px] text-[var(--text-supporting)] leading-[1.65]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <PageCTA
        title="See the Architecture in Action"
        description="Book a technical walkthrough with our team."
      >
        <Button variant="cta" size="lg" href="/demo">Book a Demo</Button>
        <Button variant="outline-light" size="lg" href="/product">Explore Products</Button>
      </PageCTA>
    </div>
  );
}
