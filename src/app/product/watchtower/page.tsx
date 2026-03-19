'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { WatchtowerMockup } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";

const featureBlocks: { title: string; headline: string; description: string; capabilities: string[]; icon: SundaeIconName; color: string }[] = [
  {
    title: "Command Center & Daily Briefing",
    headline: "Your Morning Intelligence Briefing",
    description: "Every morning, Watchtower synthesizes everything — yesterday's revenue and pace from Pulse, today's weather forecast, upcoming events near your restaurant, recent competitor activity, and market signals — into a single, prioritized briefing. Not a dashboard you have to check. Intelligence that comes to you.",
    capabilities: [
      "Daily briefing combining internal + external data",
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
    description: "Track named competitors — not anonymous averages. Watchtower monitors their Google ratings, reviews, opening hours, and public presence daily. Sentiment analysis extracts what customers love and hate about each competitor. Get alerted when a competitor's rating drops or a new restaurant opens nearby.",
    capabilities: [
      "Track up to 10+ named competitors per outlet",
      "Auto-discover competitors by location, cuisine, and price range",
      "Daily rating and review monitoring",
      "Review sentiment analysis by theme",
      "Competitor activity alerts (rating changes, closures, review spikes)",
      "12-week competitive trend tracking"
    ],
    icon: "balance",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Events & Calendar Intelligence",
    headline: "Local Events That Move Your Numbers",
    description: "A concert this weekend means 40% more foot traffic during dinner. Ramadan means a fundamental shift in your daypart mix for 30 days. Watchtower discovers events near your restaurant and generates impact assessments: expected demand shift, staffing recommendations, and prep guidance tailored to your outlet.",
    capabilities: [
      "Local event discovery within configurable radius",
      "Public holidays and religious observance calendar",
      "Ramadan-specific intelligence (Iftar rush, Suhoor service, daytime adjustment)",
      "Impact assessments with staffing and prep recommendations",
      "Integration with Pulse targets for event-aware pacing"
    ],
    icon: "growth",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Market & Trends",
    headline: "Your Market at a Glance",
    description: "How many restaurants operate within 5km of you? What's the average rating? Who opened last month, who closed? Watchtower builds a living picture of your local restaurant landscape and surfaces signals when something significant changes.",
    capabilities: [
      "District-level restaurant landscape mapping",
      "New opening and closure detection",
      "Average rating and pricing trends by cuisine segment",
      "Macro economic signals (inflation, consumer confidence)",
      "Market intelligence signals surfaced proactively"
    ],
    icon: "multiLocation",
    color: "from-orange-500 to-orange-600"
  }
];

const faqs = [
  {
    q: "How many competitors can I track?",
    a: "Up to 10+ competitors per location. Choose the competitors that matter most. Each location can have its own competitor set."
  },
  {
    q: "Can I track different competitors at different locations?",
    a: "Yes. Each location has its own competitor set. Location A might track different restaurants than Location B based on local competition."
  },
  {
    q: "How often is competitor data updated?",
    a: "Daily automated monitoring with change detection. Critical changes (like major rating shifts or new competitors) trigger immediate alerts."
  },
  {
    q: "Does Watchtower require Core tier?",
    a: "Yes. Watchtower is available on Core Lite, Core Pro, and Enterprise tiers. It requires the real-time data infrastructure that Core provides to synthesize internal performance with external signals."
  },
  {
    q: "Can I use just one intelligence type?",
    a: "Yes. Choose Competitive Intelligence, Events & Calendar Signals, or Market Trends individually — or get the full Watchtower bundle for ~18% savings."
  },
  {
    q: "How does the daily briefing work?",
    a: "Every morning, Watchtower synthesizes your previous day's Pulse data with today's external signals into a prioritized briefing delivered to email, Slack, or Telegram."
  }
];

export default function WatchtowerPage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Watchtower — External Intelligence Engine"
        title={<>10+ Competitors Tracked Daily.<br />Zero Manual Research.</>}
        description="Competitor pricing changes. A concert this weekend. Ramadan starts next week. Watchtower synthesizes external signals with your internal data into a daily intelligence briefing — what's happening, why it matters, and what to do about it."
      >
        <p className="text-[var(--text-muted)] mb-8 max-w-3xl mx-auto body-lg">
          <strong>Available on Core tiers.</strong> Choose individual intelligence types or the full Watchtower bundle.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="cta" size="lg" href={PRICING_URL}>
            Add Watchtower
          </Button>
          <Button
            variant="outline-light"
            size="lg"
            onClick={() => cta("/demo", "book_demo_watchtower", { page: "/product/watchtower" })}
          >
            Book a Demo
          </Button>
        </div>
        <div className="max-w-4xl mx-auto">
          <WatchtowerMockup />
        </div>
      </PageHero>

      {/* What is Watchtower */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              What is Watchtower?
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              Your external intelligence layer — visibility into everything outside your four walls that impacts your business. While Pulse tells you what&apos;s happening inside your operation, Watchtower covers the competitive landscape, local environment, and broader market.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: "visibility" as SundaeIconName, title: "External Intelligence", text: "Most platforms only show you YOUR data. Watchtower shows you THE MARKET." },
              { icon: "speed" as SundaeIconName, title: "Proactive, Not Reactive", text: "Get alerts when competitors move. Predict demand shifts. See trends before they hit." },
              { icon: "intelligence" as SundaeIconName, title: "Synthesized Briefings", text: "Daily intelligence briefings that combine internal performance with external signals." },
            ].map((item) => (
              <StaggerItem key={item.title} className="text-center p-6 bg-[var(--surface-subtle)] rounded-xl">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <SundaeIcon name={item.icon} size="lg" className="text-white" />
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-supporting)]">{item.text}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Internal + External */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <p className="eyebrow text-red-500 mb-4">INTERNAL + EXTERNAL</p>
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                The Only Platform That Sees Both Sides
              </h2>
              <p className="body-lg text-[var(--text-supporting)]">
                Internal platforms show you what happened. Market tools show you what&apos;s out there. Sundae is the only decision intelligence platform that synthesizes both — combining your POS, labor, and ops data with live competitor tracking, local event intelligence, weather forecasts, and market trend data — into a single briefing that tells you what it all means for today&apos;s shift.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <WatchtowerMockup />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Feature Blocks */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">
              FOUR INTELLIGENCE TYPES
            </p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              External Intelligence, Automated
            </h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Choose one, two, or all four intelligence types for complete external visibility
            </p>
          </FadeUp>

          <div className="space-y-8">
            {featureBlocks.map((block, index) => (
              <FadeUp key={block.title} delay={index * 0.1}>
                <Card variant="elevated" className="hover:shadow-2xl transition-all duration-300">
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
                          <CardTitle className="text-2xl text-[var(--text-primary)]">{block.headline}</CardTitle>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-[var(--text-supporting)] text-lg mb-6">
                      {block.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-3">Key capabilities:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {block.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span className="text-sm text-[var(--text-supporting)]">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Watchtower Pricing
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              Available on Core tiers. Choose individual components or save ~18% with the full bundle.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Competitive Intelligence", price: "$549", perLoc: "+$69/loc" },
              { name: "Events & Calendar", price: "$249", perLoc: "+$39/loc" },
              { name: "Market Trends", price: "$299", perLoc: "+$29/loc" },
              { name: "Full Bundle", price: "$899", perLoc: "+$109/loc", highlight: true }
            ].map((item) => (
              <StaggerItem key={item.name} className={`p-6 rounded-xl text-center ${item.highlight ? 'bg-red-600' : 'bg-[var(--navy-deep)] border border-[var(--border-default)]'}`}>
                <h3 className={`font-semibold mb-2 ${item.highlight ? 'text-white' : 'text-[var(--text-primary)]'}`}>{item.name}</h3>
                <p className={`text-3xl font-bold mb-1 ${item.highlight ? 'text-white' : 'text-[var(--text-primary)]'}`}>{item.price}</p>
                <p className={`text-sm ${item.highlight ? 'text-red-100' : 'text-[var(--text-muted)]'}`}>/month {item.perLoc}</p>
                {item.highlight && <p className="text-xs text-red-200 mt-2">Save ~18% vs. individual</p>}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Frequently Asked Questions
            </h2>
          </FadeUp>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FadeUp key={index} delay={index * 0.05}>
                <div className="p-6 bg-[var(--surface-faint)] rounded-xl">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">{faq.q}</h3>
                  <p className="text-[var(--text-supporting)] leading-relaxed">{faq.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <PageCTA
        title="Add External Intelligence to Your Platform"
        description="See your business in full market context. Never be caught off guard again."
      >
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem className="p-6 border border-[var(--border-default)] rounded-xl">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="cost" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">Add to Your Plan</h3>
              <p className="text-sm text-[var(--text-supporting)] mb-4 text-center">See Watchtower pricing for your operation</p>
              <Button variant="primary" size="md" className="w-full" href={PRICING_URL}>
                Add Watchtower →
              </Button>
            </StaggerItem>
            <StaggerItem className="p-6 border border-[var(--border-default)] rounded-xl">
              <div className="w-12 h-12 bg-[#1C47FF] rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="visibility" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">See It in Action</h3>
              <p className="text-sm text-[var(--text-supporting)] mb-4 text-center">Watch Watchtower demo</p>
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => cta("/demo", "watch_watchtower_demo", { page: "/product/watchtower" })}
              >
                Watch Demo →
              </Button>
            </StaggerItem>
            <StaggerItem className="p-6 border border-[var(--border-default)] rounded-xl">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <SundaeIcon name="conversation" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-center">Talk to Sales</h3>
              <p className="text-sm text-[var(--text-supporting)] mb-4 text-center">Custom Watchtower configuration</p>
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={() => cta("/contact", "contact_watchtower_sales", { page: "/product/watchtower" })}
              >
                Contact Sales →
              </Button>
            </StaggerItem>
          </StaggerContainer>
      </PageCTA>
    </div>
  );
}
