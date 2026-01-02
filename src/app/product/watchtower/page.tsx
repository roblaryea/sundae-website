'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";

export default function WatchtowerPage() {
  const cta = useCta();

  const intelligenceTypes = [
    {
      type: "Competitive Intelligence",
      icon: "balance" as SundaeIconName,
      headline: "Track Competitors Before They Impact You",
      description: "Monitor competitor pricing, promotions, menu changes, and market positioning in real-time.",
      features: [
        "Pricing intelligence across competitors",
        "Menu changes and innovations",
        "Promotional campaigns tracking",
        "Hours and service model changes",
        "Review aggregation and trends"
      ],
      useCase: "Respond to competitor moves within hours, not days",
      color: "from-blue-500 to-blue-600"
    },
    {
      type: "Event Intelligence",
      icon: "growth" as SundaeIconName,
      headline: "Predict Demand from External Factors",
      description: "Anticipate demand shifts from weather, holidays, local events, and seasonal patterns.",
      features: [
        "Weather forecasts (7-14 days)",
        "Holiday and cultural events",
        "Local events (concerts, sports, conferences)",
        "Tourism intelligence",
        "Demand impact predictions"
      ],
      useCase: "Staff appropriately and order inventory based on predicted demand",
      color: "from-purple-500 to-purple-600"
    },
    {
      type: "Market Intelligence",
      icon: "multiLocation" as SundaeIconName,
      headline: "Strategic Insights for Long-Term Planning",
      description: "Understand macro trends, category shifts, economic indicators, and market dynamics.",
      features: [
        "Category trends and growth rates",
        "Economic indicators",
        "Market share analysis",
        "Expansion intelligence",
        "Consumer behavior trends"
      ],
      useCase: "Make strategic decisions about expansion and positioning",
      color: "from-orange-500 to-orange-600"
    }
  ];

  const faqs = [
    {
      q: "How many competitors can I track?",
      a: "Up to 10 competitors per location. Choose the competitors that matter most to your business. Each location can have its own competitor set."
    },
    {
      q: "Can I track different competitors at different locations?",
      a: "Yes! Each location has its own competitor set. Location A might track different restaurants than Location B based on local competition."
    },
    {
      q: "How often is competitor data updated?",
      a: "Daily automated monitoring with AI-powered change detection. Critical changes (like major pricing updates or new promotions) trigger immediate alerts."
    },
    {
      q: "Does Watchtower work with Report tier?",
      a: "Yes! Watchtower works with both Report and Core tiers. With Report, you get historical context. With Core, you get real-time competitive intelligence."
    },
    {
      q: "Can I use just one intelligence type?",
      a: "Yes! Choose Competitive, Event, or Market Intelligence — or combine all three for complete external intelligence."
    },
    {
      q: "How far in advance does Event Intelligence predict?",
      a: "7-30 days depending on event type. Weather: 7-14 days. Holidays/Events: 30+ days for planning."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50/80 via-purple-50/30 to-indigo-50/60">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-800 px-5 py-2.5 rounded-full text-base font-semibold mb-6">
              <SundaeIcon name="watchtower" size="md" />
              <span>Watchtower</span>
            </div>
            <h1 className="hero-h1 text-gray-900 mb-6">
              See Outside Your Four Walls.<br />Act Before the Market Moves.
            </h1>
            <p className="body-xl text-gray-600 mb-4 max-w-4xl mx-auto">
              Real-time visibility into competitor activity, local events, and market shifts. Stop operating in a vacuum. Know what's happening around you before it impacts your business.
            </p>
            <p className="body-lg text-gray-500 mb-8 max-w-3xl mx-auto">
              <strong>Works with both Report and Core tiers.</strong> Three intelligence types: Competitive, Event, and Market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Add Watchtower
                </Button>
              </a>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => cta("/demo", "see_watchtower_demo", { page: "/watchtower" })}
              >
                See Watchtower in Action
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Watchtower */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 mb-4">
              What is Watchtower?
            </h2>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto">
              Watchtower is your external intelligence layer — giving you visibility into everything that happens outside your four walls that could impact your business. While Report and Core tell you what's happening inside your operation, Watchtower tells you what's happening in your competitive landscape, local environment, and broader market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-indigo-50 rounded-xl">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="visibility" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">External Intelligence</h3>
              <p className="text-sm text-gray-600">Most platforms only show you YOUR data. Watchtower shows you THE MARKET.</p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="speed" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Proactive Not Reactive</h3>
              <p className="text-sm text-gray-600">Get alerts when competitors move. Predict demand shifts. See trends before they hit.</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="intelligence" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Automated Collection</h3>
              <p className="text-sm text-gray-600">Track up to 10 competitors per location. Monitor events automatically. No manual work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Intelligence Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
              THREE INTELLIGENCE TYPES
            </p>
            <h2 className="section-h2 text-gray-900 mb-4">
              External Intelligence, Automated
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Choose one, two, or all three intelligence types for complete external visibility
            </p>
          </div>

          <div className="space-y-8">
            {intelligenceTypes.map((intel, index) => (
              <motion.div
                key={intel.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated" className="hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${intel.color} rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={intel.icon} size="xl" className="text-white" />
                        </div>
                        <div>
                          <span className={`inline-block px-3 py-1 bg-gradient-to-r ${intel.color} text-white text-xs font-semibold rounded-full mb-2`}>
                            {intel.type}
                          </span>
                          <CardTitle className="text-2xl text-gray-900">{intel.headline}</CardTitle>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 text-lg mb-6">
                      {intel.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">What you track:</h4>
                        <ul className="space-y-2">
                          {intel.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="text-green-500 mt-1">✓</span>
                              <span className="text-sm text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Use case:</h4>
                        <p className="text-gray-700 mb-4">{intel.useCase}</p>
                        <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="md" className="w-full">
                            Add {intel.type} →
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

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              How Watchtower Works
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Automated monitoring that scales with your operation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Select Competitors</h3>
              <p className="text-gray-600">Choose up to 10 competitors per location that matter most to your business</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Automated Collection</h3>
              <p className="text-gray-600">Daily monitoring with AI-powered change detection across all competitors</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-3">Instant Alerts</h3>
              <p className="text-gray-600">Get notified when competitors move or events impact demand</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Scales Linearly with Your Operation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white rounded-lg p-6">
                <div className="text-4xl font-bold text-indigo-600 mb-2">5</div>
                <p className="text-gray-600 mb-1">Locations</p>
                <p className="text-2xl font-semibold text-gray-900">50</p>
                <p className="text-sm text-gray-500">Competitors Tracked</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">20</div>
                <p className="text-gray-600 mb-1">Locations</p>
                <p className="text-2xl font-semibold text-gray-900">200</p>
                <p className="text-sm text-gray-500">Competitors Tracked</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <div className="text-4xl font-bold text-indigo-600 mb-2">50</div>
                <p className="text-gray-600 mb-1">Locations</p>
                <p className="text-2xl font-semibold text-gray-900">500</p>
                <p className="text-sm text-gray-500">Competitors Tracked</p>
              </div>
            </div>
            <p className="text-gray-600 mt-6">
              <strong>Each location tracks 10 competitors.</strong> Data collection workload scales linearly.
            </p>
          </div>
        </div>
      </section>

      {/* Integration with Report & Core */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 mb-4">
              Works with Report and Core Tiers
            </h2>
            <p className="body-xl opacity-90 max-w-3xl mx-auto">
              Enhance your internal intelligence with external market context
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <SundaeIcon name="report" size="lg" className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Report + Watchtower</h3>
              </div>
              <p className="text-lg mb-4 opacity-90">
                Historical Internal + External Context
              </p>
              <ul className="space-y-2 opacity-80">
                <li>• Compare your historical performance to competitor movements</li>
                <li>• Understand past performance in market context</li>
                <li>• Build business case with competitive data</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <SundaeIcon name="speed" size="lg" className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">Core + Watchtower</h3>
              </div>
              <p className="text-lg mb-4 opacity-90">
                Real-Time Internal + External Intelligence
              </p>
              <ul className="space-y-2 opacity-80">
                <li>• Real-time competitive alerts feed into operational decisions</li>
                <li>• Event predictions integrate with demand forecasting</li>
                <li>• Proactive recommendations factor in market context</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-white/20 backdrop-blur-sm rounded-xl p-6">
            <h4 className="text-xl font-bold mb-3">Combined Intelligence Example:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm opacity-70 mb-1">YOUR DATA (Core):</p>
                <p className="font-semibold">Sales down 8% vs forecast today</p>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-1">MARKET CONTEXT (Watchtower):</p>
                <p className="font-semibold">Competitor launched 25% off promotion this morning</p>
              </div>
              <div>
                <p className="text-sm opacity-70 mb-1">RECOMMENDATION:</p>
                <p className="font-semibold">Launch targeted 15% counter-promotion for next 48 hours</p>
              </div>
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
              onClick={() => cta("/faq", "see_more_faqs", { page: "/watchtower" })}
            >
              See More FAQs →
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 mb-6">
            Add External Intelligence to Your Platform
          </h2>
          <p className="body-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            See your business in full market context. Never be caught off guard again.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="cost" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Add to Your Plan</h3>
              <p className="text-sm text-gray-600 mb-4">See Watchtower pricing for your operation</p>
              <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="primary" size="md" className="w-full">
                  Add Watchtower →
                </Button>
              </a>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="visibility" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">See It in Action</h3>
              <p className="text-sm text-gray-600 mb-4">Watch Watchtower demo video</p>
              <Button 
                variant="outline" 
                size="md"
                className="w-full"
                onClick={() => cta("/demo", "watch_watchtower_demo", { page: "/watchtower" })}
              >
                Watch Demo →
              </Button>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="conversation" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Talk to Sales</h3>
              <p className="text-sm text-gray-600 mb-4">Custom Watchtower configuration</p>
              <Button 
                variant="outline" 
                size="md"
                className="w-full"
                onClick={() => cta("/contact", "contact_watchtower_sales", { page: "/watchtower" })}
              >
                Contact Sales →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
