'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";

const featureBlocks: { title: string; headline: string; description: string; capabilities: string[]; icon: SundaeIconName; color: string }[] = [
  {
    title: "Command Center & Daily Briefing",
    headline: "Your Morning Intelligence Briefing",
    description: "Every morning, Watchtower synthesizes everything \u2014 yesterday\u2019s revenue and pace from Pulse, today\u2019s weather forecast, upcoming events near your restaurant, recent competitor activity, and market signals \u2014 into a single, prioritized briefing. Not a dashboard you have to check. Intelligence that comes to you.",
    capabilities: [
      "AI-synthesized daily briefing combining internal + external data",
      "Prioritized recommendations ranked by revenue impact",
      "Delivered via email, Telegram, Slack, or in-app",
      "Signal feed with dismiss and acknowledge actions",
      "Weekly competitive intelligence digest"
    ],
    icon: "intelligence",
    color: "from-red-500 to-red-600"
  },
  {
    title: "Competitive Intelligence",
    headline: "Know What Your Competitors Are Doing",
    description: "Track named competitors by name \u2014 not anonymous averages. Watchtower monitors their Google ratings, reviews, opening hours, and public presence daily. AI sentiment analysis extracts what customers love and hate about each competitor. Get alerted when a competitor\u2019s rating drops or when a new restaurant opens nearby.",
    capabilities: [
      "Track up to 10+ named competitors per outlet",
      "Auto-discover competitors by location, cuisine, and price range",
      "Daily rating and review monitoring",
      "AI-powered review sentiment analysis",
      "Competitor activity alerts (rating changes, closures, review spikes)",
      "12-week competitive trend tracking"
    ],
    icon: "balance",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Events & Calendar Intelligence",
    headline: "Local Events That Impact Your Business",
    description: "A concert this weekend means 40% more foot traffic during dinner. Ramadan means a fundamental shift in your daypart mix for 30 days. Watchtower discovers events near your restaurant and provides AI-generated impact assessments: expected demand shift, staffing recommendations, and prep guidance tailored to your specific outlet.",
    capabilities: [
      "Local event discovery within configurable radius",
      "Public holidays and religious observance calendar",
      "Ramadan-specific intelligence (Iftar rush, Suhoor service, daytime adjustment)",
      "AI impact assessments with staffing and prep recommendations",
      "Integration with Pulse targets for event-aware pacing"
    ],
    icon: "growth",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Market & Trends",
    headline: "Your Market at a Glance",
    description: "How many restaurants are operating within 5km of you? What\u2019s the average rating? Who opened last month, who closed? Watchtower builds a living picture of your local restaurant landscape and surfaces signals when something significant changes.",
    capabilities: [
      "District-level restaurant landscape mapping",
      "New opening and closure detection",
      "Average rating and pricing trends by cuisine segment",
      "Macro economic signals (inflation, consumer confidence)",
      "AI-powered market intelligence signals"
    ],
    icon: "multiLocation",
    color: "from-orange-500 to-orange-600"
  }
];

const faqs = [
  {
    q: "How many competitors can I track?",
    a: "Up to 10+ competitors per location. Choose the competitors that matter most to your business. Each location can have its own competitor set."
  },
  {
    q: "Can I track different competitors at different locations?",
    a: "Yes! Each location has its own competitor set. Location A might track different restaurants than Location B based on local competition."
  },
  {
    q: "How often is competitor data updated?",
    a: "Daily automated monitoring with AI-powered change detection. Critical changes (like major rating shifts or new competitors) trigger immediate alerts."
  },
  {
    q: "Does Watchtower require Core tier?",
    a: "Yes. Watchtower is available on Core Lite, Core Pro, and Enterprise tiers. It requires the real-time data infrastructure that Core provides to synthesize internal performance with external signals."
  },
  {
    q: "Can I use just one intelligence type?",
    a: "Yes! Choose Competitive Intelligence, Events & Calendar Signals, or Market Trends individually \u2014 or get the full Watchtower bundle for ~18% savings."
  },
  {
    q: "How does the daily briefing work?",
    a: "Every morning, Watchtower\u2019s AI synthesizes your previous day\u2019s Pulse data with today\u2019s external signals into a prioritized briefing delivered to email, Slack, or Telegram."
  }
];

export default function WatchtowerPage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50/80 via-orange-50/30 to-red-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-5 py-2.5 rounded-full text-base font-semibold mb-6">
              <SundaeIcon name="watchtower" size="md" />
              <span>Watchtower — External Intelligence Engine</span>
            </div>
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
              The Outside World, Contextualized<br />for Your Restaurant
            </h1>
            <p className="body-xl text-gray-600 dark:text-slate-300 mb-4 max-w-4xl mx-auto">
              Watchtower brings competitor activity, local events, weather impact, and market trends into one intelligence feed — synthesized with your internal performance data into a daily briefing that tells you what&apos;s happening, why it matters, and what to do about it.
            </p>
            <p className="body-lg text-gray-500 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
              <strong>Available on Core tiers.</strong> Choose individual intelligence types or the full Watchtower bundle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  Add Watchtower
                </Button>
              </a>
              <Button
                variant="outline"
                size="lg"
                onClick={() => cta("/demo", "book_demo_watchtower", { page: "/product/watchtower" })}
              >
                Book a Demo
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => cta("/product/watchtower#features", "explore_watchtower", { page: "/product/watchtower" })}
              >
                Explore Watchtower
              </Button>
            </div>
          </motion.div>

          <div className="mt-12 max-w-4xl mx-auto">
            <BrowserFrame
              src="/images/product/watchtower.png"
              alt="Watchtower — AI-powered external intelligence command center"
              priority
              animate="scale"
            />
          </div>
        </div>
      </section>

      {/* What is Watchtower */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              What is Watchtower?
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Watchtower is your external intelligence layer — giving you visibility into everything that happens outside your four walls that could impact your business. While Pulse tells you what&apos;s happening inside your operation, Watchtower tells you what&apos;s happening in your competitive landscape, local environment, and broader market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-red-50 dark:bg-slate-800 rounded-xl">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="visibility" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">External Intelligence</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Most platforms only show you YOUR data. Watchtower shows you THE MARKET.</p>
            </div>
            <div className="text-center p-6 bg-red-50/70 dark:bg-slate-800 rounded-xl">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="speed" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Proactive Not Reactive</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get alerts when competitors move. Predict demand shifts. See trends before they hit.</p>
            </div>
            <div className="text-center p-6 bg-red-50/50 dark:bg-slate-800 rounded-xl">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="intelligence" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI-Synthesized Briefings</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Daily intelligence briefings that combine internal performance with external signals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Only Platform That Sees Both Sides — New Content Block */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-red-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow text-red-600 dark:text-red-400 mb-4">INTERNAL + EXTERNAL</p>
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                The Only Platform That Sees Both Sides
              </h2>
              <p className="body-lg text-gray-600 dark:text-gray-300">
                Internal platforms show you what happened. Market tools show you what&apos;s out there. Sundae is the only restaurant intelligence platform that synthesizes both — combining your POS, labor, and ops data with live competitor tracking, local event intelligence, weather forecasts, and market trend data — into a single briefing that tells you what it all means for today&apos;s shift.
              </p>
            </div>
            <div>
              <BrowserFrame
                src="/images/product/watchtower.png"
                alt="Watchtower — synthesizing internal and external intelligence"
                width={700}
                height={420}
                animate="slide-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Blocks — Detailed */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 dark:text-slate-400 mb-4">
              FOUR INTELLIGENCE TYPES
            </p>
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              External Intelligence, Automated
            </h2>
            <p className="body-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose one, two, or all four intelligence types for complete external visibility
            </p>
          </div>

          <div className="space-y-8">
            {featureBlocks.map((block, index) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card variant="elevated" className="hover:shadow-2xl transition-all duration-300 dark:bg-slate-800">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${block.color} rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={block.icon} size="xl" className="text-white" />
                        </div>
                        <div>
                          <span className={`inline-block px-3 py-1 bg-gradient-to-r ${block.color} text-white text-xs font-semibold rounded-full mb-2`}>
                            {block.title}
                          </span>
                          <CardTitle className="text-2xl text-gray-900 dark:text-white">{block.headline}</CardTitle>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                      {block.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key capabilities:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {block.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">&#10003;</span>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{cap}</span>
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

      {/* Pricing Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-red-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Watchtower Pricing
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Available on Core tiers. Choose individual components or save ~18% with the full bundle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Competitive Intelligence", price: "$399", perLoc: "+$49/loc" },
              { name: "Events & Calendar", price: "$199", perLoc: "+$29/loc" },
              { name: "Market Trends", price: "$249", perLoc: "+$19/loc" },
              { name: "Full Bundle", price: "$699", perLoc: "+$79/loc", highlight: true }
            ].map((item) => (
              <div key={item.name} className={`p-6 rounded-xl text-center ${item.highlight ? 'bg-red-600 text-white' : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700'}`}>
                <h3 className={`font-semibold mb-2 ${item.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{item.name}</h3>
                <p className={`text-3xl font-bold mb-1 ${item.highlight ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{item.price}</p>
                <p className={`text-sm ${item.highlight ? 'text-red-100' : 'text-gray-500 dark:text-gray-400'}`}>/month {item.perLoc}</p>
                {item.highlight && <p className="text-xs text-red-200 mt-2">Save ~18% vs. individual</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-gray-50 dark:bg-slate-800 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Add External Intelligence to Your Platform
          </h2>
          <p className="body-lg mb-8 opacity-90 max-w-3xl mx-auto">
            See your business in full market context. Never be caught off guard again.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="cost" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Add to Your Plan</h3>
              <p className="text-sm text-gray-600 mb-4">See Watchtower pricing for your operation</p>
              <a href={PRICING_URL} target="_blank" rel="noopener noreferrer" className="block">
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
                onClick={() => cta("/demo", "watch_watchtower_demo", { page: "/product/watchtower" })}
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
                onClick={() => cta("/contact", "contact_watchtower_sales", { page: "/product/watchtower" })}
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
