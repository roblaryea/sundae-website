'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";

export default function ModulesPage() {
  const cta = useCta();

  const modules = [
    {
      name: "Labor Intelligence",
      icon: "benchmarking" as SundaeIconName,
      headline: "Optimize Scheduling. Reduce Overtime. Forecast Demand.",
      description: "Transform labor from your biggest expense into your most optimized asset with AI-powered scheduling and demand forecasting.",
      capabilities: [
        "AI-recommended schedules",
        "Real-time labor cost tracking",
        "14-30 day demand forecasting",
        "Shift performance analysis",
        "Overtime early warnings"
      ],
      roi: "Typical ROI: 8-12% labor cost reduction",
      bestFor: "High-volume operations with complex scheduling",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Inventory Intelligence",
      icon: "insights" as SundaeIconName,
      headline: "Track Waste. Automate Par Levels. Optimize Costs.",
      description: "Turn inventory management from a daily headache into an optimized system with real-time tracking and automated recommendations.",
      capabilities: [
        "Real-time waste tracking",
        "Automated par level adjustments",
        "Recipe-level costing",
        "Vendor performance monitoring",
        "Inventory turn optimization"
      ],
      roi: "Typical ROI: 5-7% food cost reduction",
      bestFor: "High COGS operations with complex menus",
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Purchasing Intelligence",
      icon: "marketing" as SundaeIconName,
      headline: "Compare Vendors. Optimize Prices. Manage Contracts.",
      description: "Transform purchasing from reactive ordering into strategic sourcing with vendor comparison and price optimization.",
      capabilities: [
        "Multi-vendor price comparison",
        "Historical price tracking",
        "Contract term management",
        "Automated PO generation",
        "Supply chain visibility"
      ],
      roi: "Typical ROI: 3-5% procurement cost reduction",
      bestFor: "Multi-location groups with purchasing power",
      color: "from-green-500 to-green-600"
    },
    {
      name: "Marketing Intelligence",
      icon: "growth" as SundaeIconName,
      headline: "Track Campaign ROI. Optimize Spend. Understand Attribution.",
      description: "Turn marketing from a cost center into a measurable growth driver with campaign tracking and multi-channel attribution.",
      capabilities: [
        "Campaign ROI tracking",
        "Multi-touch attribution",
        "Customer acquisition cost analysis",
        "Promotion effectiveness",
        "Guest segmentation"
      ],
      roi: "Typical ROI: 15-25% marketing efficiency gain",
      bestFor: "Marketing-driven concepts with multi-channel presence",
      color: "from-orange-500 to-orange-600"
    },
    {
      name: "Reservations Intelligence",
      icon: "operators" as SundaeIconName,
      headline: "Optimize Tables. Predict No-Shows. Forecast Demand.",
      description: "Transform reservations from a booking system into a revenue optimization tool with predictive analytics.",
      capabilities: [
        "Table optimization recommendations",
        "AI-powered no-show prediction",
        "Demand forecasting (7-30 days)",
        "Waitlist management optimization",
        "Dynamic pricing suggestions"
      ],
      roi: "Typical ROI: 10-15% covers increase",
      bestFor: "Reservation-driven restaurants and fine dining",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  const faqs = [
    {
      q: "Do I need Core tier to use Modules?",
      a: "Yes. Modules are exclusive to Core tier (Lite, Pro, or Enterprise). Modules require real-time data refresh to provide their specialized intelligence. If you're on Report tier and want modules, you'll need to upgrade to Core."
    },
    {
      q: "Can I add modules later?",
      a: "Yes! Start with Core tier, then add modules as needed. No forced bundles."
    },
    {
      q: "What if I only need a module at some locations?",
      a: "Organization license covers your first 5 locations. For custom configurations (like modules at only certain locations), contact us for custom pricing."
    },
    {
      q: "How long does module implementation take?",
      a: "Most modules: 1-2 weeks. Complex multi-location implementations: 2-4 weeks with full training and support."
    },
    {
      q: "Can modules work together?",
      a: "Absolutely! Modules share data and provide cross-module insights. For example, Labor + Inventory helps correlate prep labor with waste patterns."
    },
    {
      q: "Can I try a module before committing?",
      a: "Yes! Contact us for module trial programs to test with your operation before full implementation."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/80 via-purple-50/30 to-blue-50/60">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-5 py-2.5 rounded-full text-base font-semibold mb-6">
              <SundaeIcon name="network" size="md" />
              <span>Specialized Modules</span>
            </div>
            <h1 className="hero-h1 text-gray-900 mb-6">
              Go Deeper Where It Matters Most
            </h1>
            <p className="body-xl text-gray-600 mb-4 max-w-4xl mx-auto">
              Add specialized modules to Sundae Core. Get deep operational intelligence in labor, inventory, purchasing, marketing, and reservations.
            </p>
            <p className="body-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              <strong>Mix and match based on your priorities.</strong> Organization license covers your first 5 locations, then scales per location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Explore All Modules
                </Button>
              </a>
              <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg">
                  Calculate Module ROI
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What are Modules */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 mb-4">
              What Are Sundae Modules?
            </h2>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto">
              Modules are specialized intelligence add-ons that deepen your insights in specific operational areas. While Core gives you comprehensive real-time visibility across your entire operation, Modules provide focused expertise in key domains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="intelligence" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Specialized, Not Scattered</h3>
              <p className="text-sm text-gray-600">Deep features you won't find in generic analytics. Purpose-built for each operational area.</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="network" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Add What You Need</h3>
              <p className="text-sm text-gray-600">Start with your biggest pain point. Add modules as priorities shift. No forced bundles.</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="integration" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Integrated, Not Siloed</h3>
              <p className="text-sm text-gray-600">Modules share data with Core tier. Cross-module insights. One unified platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Modules */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              FIVE SPECIALIZED MODULES
            </p>
            <h2 className="section-h2 text-gray-900 mb-4">
              Choose Your Intelligence Stack
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Add one module or all five. Build the intelligence your operation needs.
            </p>
          </div>

          <div className="space-y-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated" className="hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${module.color} rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={module.icon} size="xl" className="text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl text-gray-900 mb-1">{module.name}</CardTitle>
                          <p className="text-sm font-semibold text-gray-500">{module.headline}</p>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 text-lg mb-6">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h4 className="font-semibold text-gray-900 mb-3">Core Capabilities:</h4>
                        <ul className="space-y-2">
                          {module.capabilities.map((capability, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-green-500 mt-1">✓</span>
                              <span className="text-sm text-gray-600">{capability}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">ROI</h4>
                          <p className="text-sm text-gray-700">{module.roi}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Best for:</h4>
                          <p className="text-sm text-gray-700">{module.bestFor}</p>
                        </div>
                        <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="md" className="w-full">
                            Add {module.name} →
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Modules Work */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              How Modules Work
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Simple pricing. Seamless integration. Scale with your operation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Organization License Model</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Each module has an organization license that covers your first 5 locations. Additional locations scale per location.
              </p>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2"><strong>Examples:</strong></p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 3 locations: Organization license covers all</li>
                  <li>• 12 locations: Org license + 7 add-on locations</li>
                  <li>• Mix & match at different locations</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Requires Core Tier</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Modules are exclusive to Core tier for real-time specialized intelligence:
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Core Lite + Modules</p>
                  <p className="text-xs text-gray-600">4-hour refresh with specialized operational intelligence</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Core Pro + Modules</p>
                  <p className="text-xs text-gray-600">2-hour refresh with deep specialized intelligence</p>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="text-sm font-semibold text-gray-900 mb-1">Enterprise + Modules</p>
                  <p className="text-xs text-gray-600">Custom refresh with unlimited specialized intelligence</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Cross-Module Intelligence</h3>
            <p className="text-gray-700 text-center mb-6">Modules share data and provide integrated insights</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2 text-sm">Labor + Inventory</p>
                <p className="text-xs text-gray-600">Correlate prep labor with waste patterns</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2 text-sm">Labor + Marketing</p>
                <p className="text-xs text-gray-600">Forecast staffing needs for campaigns</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2 text-sm">Inventory + Purchasing</p>
                <p className="text-xs text-gray-600">Seamless PO generation from inventory</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module Selection Guide */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Which Modules Do You Need?
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Start with your biggest pain point
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { pain: "High Labor Cost?", solution: "Labor Intelligence", benefit: "Reduce overtime, optimize scheduling" },
              { pain: "High Food Cost or Waste?", solution: "Inventory Intelligence", benefit: "Track waste, optimize par levels" },
              { pain: "Complex Vendor Relationships?", solution: "Purchasing Intelligence", benefit: "Compare pricing, manage contracts" },
              { pain: "Heavy Marketing Spend?", solution: "Marketing Intelligence", benefit: "Track ROI, reduce CAC" },
              { pain: "Reservation-Driven Business?", solution: "Reservations Intelligence", benefit: "Reduce no-shows, optimize tables" }
            ].map((item, index) => (
              <motion.div
                key={item.solution}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                  <p className="text-lg font-bold text-gray-900 mb-2">{item.pain}</p>
                  <p className="text-blue-600 font-semibold mb-2">→ {item.solution}</p>
                  <p className="text-sm text-gray-600">{item.benefit}</p>
                </div>
              </motion.div>
            ))}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 shadow-lg text-white">
              <p className="text-lg font-bold mb-2">Want It All?</p>
              <p className="font-semibold mb-2">→ Full Module Suite</p>
              <p className="text-sm opacity-90">Complete operational intelligence across all areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => cta("/faq", "see_more_faqs", { page: "/modules" })}
            >
              See More FAQs →
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 mb-6">
            Add Specialized Intelligence to Your Platform
          </h2>
          <p className="body-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Start with one module or add the full suite. Build the intelligence stack your operation needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="calculator" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Calculate Module ROI</h3>
              <p className="text-sm text-gray-600 mb-4">Interactive calculator for your operation</p>
              <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="primary" size="md" className="w-full">
                  Calculate ROI →
                </Button>
              </a>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="document" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Module Assessment</h3>
              <p className="text-sm text-gray-600 mb-4">Find which modules solve your challenges</p>
              <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" size="md" className="w-full">
                  Start Assessment →
                </Button>
              </a>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="conversation" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Talk to an Expert</h3>
              <p className="text-sm text-gray-600 mb-4">Custom module recommendations</p>
              <Button 
                variant="outline" 
                size="md"
                className="w-full"
                onClick={() => cta("/contact", "contact_modules_expert", { page: "/modules" })}
              >
                Book Consultation →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
