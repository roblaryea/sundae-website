'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { motion } from 'framer-motion';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';

export default function PricingPage() {
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
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
              Choose Your
              <br />
              <span className="text-gradient">Intelligence Level</span>
            </h1>
            <p className="body-lg text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Start with live dashboards and benchmarking. Upgrade to real-time, AI-driven operational intelligence when you're ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sundae Report Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-electric-blue/10 text-electric-blue px-6 py-2.5 rounded-full text-base font-semibold">
              <span>📊</span>
              <span>Sundae Report</span>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-2 border-electric-blue shadow-2xl bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10">
              <CardHeader className="pb-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-flex items-center space-x-2 bg-green-500/10 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      <span>🎉</span>
                      <span>Free Early Access</span>
                    </div>
                    <CardTitle className="section-h2 text-gray-900 dark:text-white mb-3">Sundae Report</CardTitle>
                    <CardDescription className="body-lg text-gray-700 dark:text-gray-300">
                      Live dashboards, AI insights, and peer benchmarking—all in one place.
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-6xl font-bold text-electric-blue mb-1">FREE</div>
                    <div className="text-base font-semibold text-gray-600 dark:text-gray-400">Limited Time</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-xl mb-4">🎁 Early Access Offer</h4>
                      <ul className="space-y-3 body-base text-gray-700 dark:text-gray-300">
                        <li className="flex items-start space-x-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                          <span><strong>Free for first 100 restaurant groups</strong></span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                          <span><strong>Free for first 3 months</strong> for all new sign-ups</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-600 dark:text-green-400 font-bold">✓</span>
                          <span>No credit card required</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">What You Get:</h4>
                    <ul className="space-y-3">
                      {[
                        "Live performance dashboards built from your daily data",
                        "Comparable period views + target tracking (WoW/MoM/YoY)",
                        "AI executive summary: what changed, why, and next actions",
                        "Opportunity & risk flags vs targets + peers",
                        "Anonymous peer benchmarking (like-for-like)",
                        "Shareable charts + team collaboration",
                        "Weekly AI brief + PDF export",
                        "Email support"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="body-base text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/demo" className="block mt-8">
                      <Button variant="primary" size="lg" className="w-full py-4 text-[16px] font-semibold shadow-xl hover:shadow-2xl">
                        Get Started
                      </Button>
                    </Link>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                      Custom onboarding based on your data source
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Sundae Core Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">Sundae Core</h2>
            <p className="body-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              The complete decision intelligence platform. Everything you need to run smarter.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Core Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full border-2 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all">
                <CardHeader className="pb-6">
                  <CardTitle className="section-h3 text-gray-900 dark:text-white mb-3">Core</CardTitle>
                  <CardDescription className="body-base text-gray-600 dark:text-gray-400 mb-6">
                    Real-time operational intelligence for single operators and growing groups
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">Everything in Report, plus:</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Real-time dashboards with drill-down analysis",
                      "Smart targets, alerts, and anomaly detection",
                      "AI recommendations and action playbooks",
                      "Team collaboration with task ownership on insights",
                      "POS and data connector integrations (where available)",
                      "Scheduled insights and custom exports",
                      "Conversational AI for data queries",
                      "Market intelligence and competitor context",
                      "Unlimited users + priority support"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="body-base text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/demo">
                    <Button variant="primary" size="lg" className="w-full py-4 text-[16px] font-semibold shadow-lg hover:shadow-xl">
                      Get Started
                    </Button>
                  </Link>
                  
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Custom pricing based on your needs
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="h-full border-2 border-electric-blue dark:border-electric-blue shadow-xl hover:shadow-2xl transition-all bg-gradient-to-br from-white to-blue-50/20 dark:from-gray-800 dark:to-blue-900/10">
                <CardHeader className="pb-6">
                  <div className="inline-flex items-center space-x-2 bg-electric-blue/10 text-electric-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <span>⭐</span>
                    <span>Popular</span>
                  </div>
                  <CardTitle className="section-h3 text-gray-900 dark:text-white mb-3">Enterprise</CardTitle>
                  <CardDescription className="body-base text-gray-600 dark:text-gray-400 mb-6">
                    Enterprise-grade intelligence for multi-location operators—governance, integrations, and control
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">Everything in Core, plus:</h4>
                    <ul className="space-y-3">
                      {[
                        "Multi-location rollups + cross-region/brand benchmarking",
                        "Role-based access controls and audit trails",
                        "Advanced data pipelines and custom integrations",
                        "Custom KPI frameworks and advanced segmentation",
                        "Enterprise security and compliance features",
                        "Dedicated success manager and onboarding",
                        "24/7 priority support with SLA options",
                        "White-label and partner solutions",
                        "Flexible contract terms and volume pricing"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-electric-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="body-base text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href="/demo">
                    <Button variant="primary" size="lg" className="w-full py-4 text-[16px] font-semibold shadow-lg hover:shadow-xl">
                      Contact Sales
                    </Button>
                  </Link>
                  
                  <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Custom pricing based on your needs
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-deep-blue/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">Power-Ups</h2>
            <p className="body-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Add capabilities when you need them
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {([
              {
                name: "Advanced Market Intelligence",
                availability: "Available as an add-on",
                features: [
                  "Competitor benchmarks",
                  "Event + weather + macro insights",
                  "Multi-region comparison"
                ],
                icon: "restaurant" as SundaeIconName
              },
              {
                name: "Custom AI Development",
                availability: "Included in custom plans",
                features: [
                  "Bespoke AI models",
                  "Proprietary algorithms",
                  "Dedicated ML engineers"
                ],
                icon: "intelligence" as SundaeIconName
              },
              {
                name: "Premium Support",
                availability: "Available as an add-on",
                features: [
                  "24/7 dedicated support",
                  "Faster response times",
                  "Direct Slack channel"
                ],
                icon: "marketing" as SundaeIconName
              },
              {
                name: "External Data Licensing",
                availability: "Available as an add-on",
                features: [
                  "For non-restaurant use cases",
                  "Early adopter pricing",
                  "Custom data delivery"
                ],
                icon: "benchmarking" as SundaeIconName
              }
            ]).map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                        <SundaeIcon name={addon.icon} size="lg" className="text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-electric-blue">{addon.availability}</div>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">{addon.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 body-base text-gray-600 dark:text-gray-400">
                      {addon.features.map((feature, fIndex) => (
                        <li key={fIndex}>• {feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
            Need Something Custom?
          </h2>
          <p className="body-lg text-gray-700 dark:text-gray-300 mb-12">
            We build solutions for unique requirements
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {([
              { title: "Custom Integrations", desc: "Connect proprietary systems and data sources", icon: "integration" as SundaeIconName },
              { title: "White-Label Data Solutions", desc: "Branded intelligence for your partners", icon: "document" as SundaeIconName },
              { title: "Dedicated Support Teams", desc: "On-call engineers and analysts", icon: "support" as SundaeIconName }
            ]).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <SundaeIcon name={feature.icon} size="xl" className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="body-base text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-deep-blue/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
                Common Questions
              </h2>
              <p className="body-lg text-gray-700 dark:text-gray-300">
                Clear answers. No fine print.
              </p>
            </div>

            <Accordion
              items={[
                {
                  title: "What happens after the free period?",
                  content: "When early access ends, we'll recommend the right fit based on your footprint and data depth. Upgrade to Core, move to Enterprise, or pause—no lock-in."
                },
                {
                  title: "How do you count a location?",
                  content: "A location is one physical restaurant address. Multiple brands under the same roof still count as one location."
                },
                {
                  title: "What's included in Sundae Report vs Core?",
                  content: "Sundae Report gives you live dashboards and peer benchmarks, plus an AI brief that explains what changed and what to do next (based on the data you share). Core unlocks the full intelligence stack: deeper drilldowns, automated insights, alerts, workflows, and integrations."
                },
                {
                  title: "Do you support multi-brand and multi-location groups?",
                  content: "Yes. Enterprise is built for groups—rollups across brands and regions, governance, permissions, and tailored reporting structures."
                },
                {
                  title: "Do you offer group packages?",
                  content: "Yes. We tailor packages around your footprint, brands, data sources, and support needs. Tell us what you're running and we'll recommend the cleanest setup."
                },
                {
                  title: "Is my data private and secure?",
                  content: "Your data stays yours. We secure data in transit and at rest using industry-standard protections, enforce strict access controls, and use anonymized, aggregated benchmarking where applicable. We can share our security overview and data-processing terms on request."
                },
                {
                  title: "Can I change plans later?",
                  content: "Absolutely. Many teams start with Report and upgrade as they scale. Switching plans is straightforward—we'll guide you."
                }
              ]}
              defaultOpenIndex={0}
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue via-electric-blue to-deep-blue dark:from-deep-blue dark:via-electric-blue dark:to-deep-blue relative overflow-hidden">
        {/* Animated background effect */}
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
            <h2 className="section-h2 text-white mb-8">
              Ready to See the Difference?
            </h2>
            <p className="body-lg text-white mb-12 font-medium">
              Join operators who've moved from guessing to knowing
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/demo">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-electric-blue hover:bg-gray-100 font-semibold px-10 py-4 text-[16px] shadow-xl hover:shadow-2xl transition-all"
                >
                  Generate My Free Report
                </Button>
              </Link>
              <Link href="/demo">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-electric-blue font-semibold px-10 py-4 text-[16px] shadow-xl hover:shadow-2xl transition-all"
                >
                  Book a Demo
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-white/80 mt-8 leading-[1.65]">
              Free for first 100 groups • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
