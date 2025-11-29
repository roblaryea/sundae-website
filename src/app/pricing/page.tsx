'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Accordion';
import { motion } from 'framer-motion';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showEnterprisePricing, setShowEnterprisePricing] = useState(false);

  const enterpriseTiers = [
    { range: "31–100 locations", basePrice: "$75,000/year", perLocation: "$100/location/month" },
    { range: "101–250 locations", basePrice: "$90,000/year", perLocation: "$80/location/month" },
    { range: "251–500 locations", basePrice: "$105,000/year", perLocation: "$70/location/month" },
    { range: "501–1,000 locations", basePrice: "$125,000/year", perLocation: "$60/location/month" },
    { range: "1,000–2,000 locations", basePrice: "$150,000/year", perLocation: "$50/location/month" },
    { range: "2,000+ locations", basePrice: "$175,000/year", perLocation: "$35/location/month" }
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
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
              Simple, Scalable
              <br />
              <span className="text-gradient">Restaurant Intelligence</span>
            </h1>
            <p className="body-lg text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Choose the plan that fits your restaurant group's needs. Transparent, scalable, no hidden fees.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex justify-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-lg border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all text-[15px] ${
                    billingCycle === 'monthly' 
                      ? 'bg-electric-blue text-white shadow-md' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all text-[15px] ${
                    billingCycle === 'annual' 
                      ? 'bg-electric-blue text-white shadow-md' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Annual
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sundae Report Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
                    <div className="inline-flex items-center space-x-2 bg-electric-blue/10 text-electric-blue px-4 py-2 rounded-full text-sm font-semibold mb-4">
                      <span>🎉</span>
                      <span>Free for Early Access</span>
                    </div>
                    <CardTitle className="section-h2 text-gray-900 dark:text-white mb-3">Sundae Report</CardTitle>
                    <CardDescription className="body-lg text-gray-700 dark:text-gray-300">
                      Benchmarking-only intelligence to understand your restaurant's performance
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold text-electric-blue mb-2">FREE</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Limited time</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 mb-6 border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-3">🎁 Early Access Offer</h4>
                      <ul className="space-y-2 body-base text-gray-700 dark:text-gray-300">
                        <li>✓ Free for first 100 restaurant groups</li>
                        <li>✓ Free for first 3 months for all new sign-ups</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-3">After free period:</h4>
                      <ul className="space-y-2 body-base text-gray-700 dark:text-gray-300">
                        <li>• <span className="font-semibold">$25/location/month</span> – Standard data</li>
                        <li>• <span className="font-semibold">$50/location/month</span> – Premium geographic/macro data</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {[
                        "Sales, labor, COGS benchmarks",
                        "100+ KPIs tracked and compared",
                        "Region + segment comparisons",
                        "PDF summary report",
                        "Weekly benchmark refreshes",
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
                        Generate My Free Report
                      </Button>
                    </Link>
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
              Full decision intelligence platform for growing restaurant groups
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
                    For groups with up to 30 locations
                  </CardDescription>
                  
                  <div className="mb-6">
                    <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                      $200
                    </div>
                    <div className="body-base text-gray-600 dark:text-gray-400">per location/month</div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">Everything in Report, plus:</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Nexus conversational AI",
                      "Canvas real-time dashboards",
                      "Insights correlation engine",
                      "Pulse anomaly detection",
                      "Scout data integrations",
                      "Watchtower market intelligence",
                      "Unlimited users",
                      "Support & onboarding"
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
                    Flexible pricing for groups with 30+ locations
                  </CardDescription>
                  
                  <div className="mb-6">
                    <div className="section-h4 text-gray-900 dark:text-white mb-2">
                      Volume-based pricing
                    </div>
                    <div className="body-base text-gray-600 dark:text-gray-400">Lower per-location costs at scale</div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Enterprise Pricing Table */}
                  <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="grid grid-cols-3 gap-4 font-semibold text-sm text-gray-900 dark:text-white">
                        <div>Locations</div>
                        <div>Base Price</div>
                        <div>Per Location</div>
                      </div>
                    </div>
                    
                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                      {enterpriseTiers.slice(0, showEnterprisePricing ? enterpriseTiers.length : 1).map((tier, index) => (
                        <div key={index} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="text-gray-900 dark:text-white font-medium">{tier.range}</div>
                            <div className="text-gray-700 dark:text-gray-300">{tier.basePrice}</div>
                            <div className="text-electric-blue font-semibold">{tier.perLocation}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {!showEnterprisePricing && (
                      <button
                        onClick={() => setShowEnterprisePricing(true)}
                        className="w-full px-4 py-3 text-center text-electric-blue hover:bg-gray-50 dark:hover:bg-gray-800 font-medium text-sm transition-colors border-t border-gray-200 dark:border-gray-700"
                      >
                        See full enterprise pricing →
                      </button>
                    )}
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-4">Everything in Core, plus:</h4>
                    <ul className="space-y-2 body-base text-gray-700 dark:text-gray-300">
                      <li>• Dedicated success manager</li>
                      <li>• Custom integrations</li>
                      <li>• Advanced security & compliance</li>
                      <li>• White-label options</li>
                      <li>• 24/7 priority support</li>
                    </ul>
                  </div>
                  
                  <Link href="/demo">
                    <Button variant="primary" size="lg" className="w-full py-4 text-[16px] font-semibold shadow-lg hover:shadow-xl">
                      Contact Sales
                    </Button>
                  </Link>
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
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">Add-Ons</h2>
            <p className="body-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Enhance your intelligence with premium features
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Advanced Market Intelligence",
                price: "$50/location/month",
                features: [
                  "Competitor benchmarks",
                  "Event + weather + macro insights",
                  "Multi-region comparison"
                ],
                icon: "🏪"
              },
              {
                name: "Custom AI Development",
                price: "Custom pricing",
                features: [
                  "Bespoke AI models",
                  "Proprietary algorithms",
                  "Dedicated ML engineers"
                ],
                icon: "🤖"
              },
              {
                name: "Premium Support",
                price: "$250/month",
                features: [
                  "24/7 dedicated support",
                  "Faster response times",
                  "Direct Slack channel"
                ],
                icon: "🎯"
              },
              {
                name: "External Data Licensing",
                price: "$500/location (50% off)",
                features: [
                  "For non-restaurant use cases",
                  "Early adopter discount",
                  "Custom data delivery"
                ],
                icon: "📊"
              }
            ].map((addon, index) => (
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
                      <div className="text-4xl">{addon.icon}</div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-electric-blue">{addon.price}</div>
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
            Custom Solutions
          </h2>
          <p className="body-lg text-gray-700 dark:text-gray-300 mb-12">
            For unique requirements, we offer tailored solutions
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Custom Integrations", desc: "Connect proprietary systems and data sources", icon: "🔧" },
              { title: "White-Label Data Solutions", desc: "Branded intelligence for your partners", icon: "🏷️" },
              { title: "Dedicated Support Teams", desc: "On-call engineers and analysts", icon: "👥" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
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
                Frequently Asked Questions
              </h2>
              <p className="body-lg text-gray-700 dark:text-gray-300">
                Everything you need to know about Sundae pricing
              </p>
            </div>

            <Accordion
              items={[
                {
                  title: "What happens after the free period?",
                  content: "After your free period ends, you can choose to continue with Report at $25-50/location/month, upgrade to Core, or discontinue service. No credit card required to start."
                },
                {
                  title: "How do you count a location?",
                  content: "A location is any physical restaurant address where you operate. Multiple brands at the same address count as one location."
                },
                {
                  title: "What is included in Core vs Report?",
                  content: "Report provides benchmarking only. Core includes the full Sundae Intelligence Stack: Nexus AI, Canvas dashboards, Insights engine, Pulse alerts, Scout integrations, and Watchtower market intel."
                },
                {
                  title: "Do you offer multi-brand discounts?",
                  content: "Yes, Enterprise pricing includes volume-based discounts. The more locations, the lower the per-location cost."
                },
                {
                  title: "Is my data secure?",
                  content: "Absolutely. We use bank-level encryption, are SOC 2 Type II compliant, and never share your data with third parties. Your data is always yours."
                },
                {
                  title: "Can I switch between plans?",
                  content: "Yes, you can upgrade or downgrade at any time. Changes take effect immediately and billing is prorated."
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
              Ready to Get Started?
            </h2>
            <p className="body-lg text-white mb-12 font-medium">
              Join hundreds of restaurants already using Sundae to make smarter decisions
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
