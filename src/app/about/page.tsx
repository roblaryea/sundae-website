import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export const metadata: Metadata = {
  title: "About Sundae — The Decision Intelligence Platform for Restaurants",
  description: "Sundae unifies 12+ data sources into a single intelligence layer for multi-unit restaurant groups. Built by operators who lived the problem. Active across 3 countries.",
};

export default function AboutPage() {
  const leadership = [
    {
      name: "Robert Laryea",
      role: "Founder & CEO",
      location: "Dubai",
      image: "/team/robert-laryea.jpg",
      bullets: [
        "Scaled multi-unit restaurant concepts from zero to $10M+ annual revenue",
        "Saw first-hand how fragmented data costs operators millions in invisible margin loss",
        "20+ years leading global transformation programs across consulting and F&B",
        "Built Sundae to give every restaurant group the intelligence layer that didn't exist"
      ]
    },
    {
      name: "Daanish Siddiqui",
      role: "Chief Growth Officer",
      location: "Dubai",
      image: "/team/daanish-siddiqui.jpg",
      bullets: [
        "5x founder with 2 successful exits — turned ideas into $100M+ businesses",
        "Specialist in 0→1 category creation and product-led growth",
        "18+ years in product, marketing, and go-to-market execution",
        "Driving Sundae's positioning as the category-defining platform for restaurant intelligence"
      ]
    },
    {
      name: "Alissa Parabani",
      role: "Head of Product",
      location: "Toronto",
      image: "/team/alissa-parabani.jpg",
      bullets: [
        "Former Walmart Canada systems engineer — built at enterprise scale",
        "3 product lines launched, all profitable within 18 months",
        "Translates operator needs into measurable product ROI",
        "Ensures every module solves a real problem operators face on shift"
      ]
    },
    {
      name: "Naveed Nadir",
      role: "Head of Technology",
      location: "Toronto",
      image: "/team/naveed-nadir.jpg",
      bullets: [
        "Built enterprise SaaS platforms handling 10M+ daily transactions",
        "Seasoned engineer across automotive and enterprise SaaS at global scale",
        "Expert in secure, compliant systems architecture",
        "Owns Sundae's infrastructure reliability and real-time data pipeline"
      ]
    }
  ];

  const milestones = [
    {
      year: "2025",
      title: "Sundae Founded",
      description: "Built from direct operator pain — fragmented data costing multi-unit groups millions in invisible margin loss."
    },
    {
      year: "2025",
      title: "First Deployments",
      description: "Partnered with multi-brand restaurant groups across UAE and Canada. Real data, real operators, real decisions from day one."
    },
    {
      year: "2026",
      title: "30+ Modules Live",
      description: "Revenue, labor, inventory, delivery, reservations, purchasing, marketing, and profit intelligence — all unified across 12 operational domains."
    },
    {
      year: "2026",
      title: "GCC & North America",
      description: "Enterprise hospitality groups adopting Sundae platform-wide across UAE, KSA, Qatar, and North America."
    },
    {
      year: "2027+",
      title: "Global Expansion",
      description: "Scaling into Europe and Asia Pacific. Enterprise intelligence for multi-country restaurant brands."
    }
  ];

  const values: { title: string; description: string; proof: string; icon: SundaeIconName }[] = [
    {
      title: "Operators First",
      description: "Every feature exists because an operator needed it. We don't build for demos — we build for shifts.",
      proof: "Built by a team that scaled restaurants to $10M+ before writing a line of code.",
      icon: "owners"
    },
    {
      title: "Intelligence First",
      description: "Scattered data is expensive. We turn 12 systems into one intelligent layer that actually drives decisions.",
      proof: "30+ modules across 12 operational domains — from revenue to reservations.",
      icon: "insights"
    },
    {
      title: "Real-Time Decisions",
      description: "Weekly reports cost you money. The operators who win are the ones who see problems while they can still fix them.",
      proof: "Pulse refreshes every 5 minutes across every location.",
      icon: "speed"
    },
    {
      title: "Raise the Standard",
      description: "We're setting the benchmark for how restaurant groups worldwide make operational decisions.",
      proof: "Active across 3 countries with enterprise groups adopting platform-wide.",
      icon: "growth"
    }
  ];

  const platformPillars: { name: string; subtitle: string; icon: SundaeIconName }[] = [
    { name: "Pulse", subtitle: "Real-Time Operations", icon: "pulse" },
    { name: "Benchmarks", subtitle: "Competitive Intelligence", icon: "benchmarking" },
    { name: "Watchtower", subtitle: "Market Intelligence", icon: "watchtower" },
    { name: "Insights", subtitle: "30+ Analytics Modules", icon: "insights" },
    { name: "Intelligence", subtitle: "Conversational AI", icon: "intelligence" },
    { name: "Foresight", subtitle: "Predictive Intelligence", icon: "forecasting" },
  ];

  const stats = [
    { value: "6", label: "Platform Pillars" },
    { value: "30+", label: "Intelligence Modules" },
    { value: "12", label: "Data Domains" },
    { value: "3", label: "Countries Active" },
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero — Lead with what Sundae IS, not what it was "founded to" do */}
      <PageHero
        badge="About Sundae"
        title={<>The Intelligence Layer<br />Restaurants Never Had</>}
        description="Your data lives in 12+ disconnected systems. Your team makes million-dollar decisions by gut feel. Sundae unifies everything into a single operating intelligence — so every decision is backed by real-time data, market context, and predictive insight."
      />

      {/* Stats Strip — Immediate proof of platform maturity */}
      <section className="relative bg-[var(--navy-deep)] border-y border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <FadeUp>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-1">{stat.value}</div>
                  <div className="text-sm text-[var(--text-supporting)] font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* What We've Built — Platform substance for investors/press/recruits */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                What We&apos;ve Built
              </h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
                Six integrated layers that replace gut feel with intelligence — from real-time pacing to 90-day forecasts.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platformPillars.map((pillar) => (
              <StaggerItem key={pillar.name}>
                <Card variant="feature" className="text-center h-full p-6 hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center">
                    <SundaeIcon name={pillar.icon} size="lg" className="text-white" />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-base mb-1">{pillar.name}</h3>
                  <p className="text-xs text-[var(--text-supporting)]">{pillar.subtitle}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Mission — Grounded in operator pain, not generic SaaS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <h2 className="section-h2 text-[var(--text-primary)] mb-8">
                  Why Sundae Exists
                </h2>
                <p className="body-xl text-[var(--text-secondary)] mb-4">
                  Multi-unit restaurant operators run complex, high-volume businesses across dozens of disconnected systems. The result: million-dollar decisions made on gut feel, margin leakage invisible until it&apos;s too late, and zero market context for benchmarking performance.
                </p>
                <p className="body-lg text-[var(--text-supporting)] mb-10">
                  We built Sundae because we lived it. Our founder scaled restaurant concepts to $10M+ and saw the same problem everywhere — operators drowning in data silos with no unified way to make confident decisions.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-200">
                    <div className="w-8 h-8 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-primary)] text-sm font-bold mt-1 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)] text-lg mb-1">Unify 12+ Data Sources</h4>
                      <p className="text-[var(--text-supporting)] leading-[1.65]">POS, labor, inventory, delivery, reservations, purchasing, marketing — one intelligent layer instead of twelve tabs.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-200">
                    <div className="w-8 h-8 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-primary)] text-sm font-bold mt-1 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)] text-lg mb-1">Benchmark Against the Market</h4>
                      <p className="text-[var(--text-supporting)] leading-[1.65]">Is your 31% food cost good or bad? Without peer context, you have no idea. Sundae adds competitive and market intelligence to every metric.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-200">
                    <div className="w-8 h-8 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-primary)] text-sm font-bold mt-1 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)] text-lg mb-1">Decide with Confidence</h4>
                      <p className="text-[var(--text-supporting)] leading-[1.65]">Real-time intelligence, AI-powered recommendations, and predictive forecasts — so every decision is informed, not guessed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="bg-[var(--surface-faint)] border border-[var(--border-default)] rounded-3xl p-10 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center">
                    <SundaeIcon name="visibility" size="xl" className="text-white" />
                  </div>
                  <h3 className="section-h3 text-[var(--text-primary)] mb-4">Our Vision</h3>
                  <p className="body-lg text-[var(--text-secondary)]">
                    Every restaurant group, anywhere in the world, operating with the clarity that only unified intelligence can provide.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-[var(--navy-deep)] rounded-2xl p-5 shadow-lg text-center">
                    <div className="text-sm font-bold text-positive mb-1 uppercase tracking-wide">Active</div>
                    <div className="text-sm text-[var(--text-supporting)] font-medium">Deployed across 3 countries</div>
                  </div>
                  <div className="bg-[var(--navy-deep)] rounded-2xl p-5 shadow-lg text-center">
                    <div className="text-sm font-bold text-lavender mb-1 uppercase tracking-wide">Global</div>
                    <div className="text-sm text-[var(--text-supporting)] font-medium">Dubai + Toronto offices</div>
                  </div>
                  <div className="bg-[var(--navy-deep)] rounded-2xl p-5 shadow-lg text-center">
                    <div className="text-sm font-bold text-[#60A5FA] mb-1 uppercase tracking-wide">Scope</div>
                    <div className="text-sm text-[var(--text-supporting)] font-medium">12 operational domains</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Team Section — Lead with operator credibility */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
                Built by Operators Who Lived the Problem
              </h2>
              <p className="text-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
                60+ years of combined experience across restaurants, technology, and data. We didn&apos;t study the problem from the outside — we ran the restaurants, scaled the concepts, and hit the same walls every operator hits.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {leadership.map((member) => (
              <StaggerItem key={member.name}>
                <div className="text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      loading="lazy"
                      className="w-full h-full rounded-full object-cover border-4 border-white/[0.1]"
                    />
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-xl mb-1">{member.name}</h3>
                  <p className="text-[var(--text-primary)] font-semibold text-sm mb-1">{member.role}</p>
                  <p className="text-[var(--text-muted)] text-sm mb-6">{member.location}</p>
                  <ul className="text-left space-y-3">
                    {member.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-[var(--text-supporting)]">
                        <span className="text-[var(--text-primary)] mt-1 flex-shrink-0">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.4}>
            <Card variant="elevated">
              <CardContent className="p-8">
                <h3 className="font-bold text-[var(--text-primary)] text-lg mb-6">Team Strengths</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name="restaurant" size="lg" className="text-white" />
                    </div>
                    <p className="text-[var(--text-secondary)] font-medium">Scaled restaurant concepts to $10M+ before writing a line of code</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name="growth" size="lg" className="text-white" />
                    </div>
                    <p className="text-[var(--text-secondary)] font-medium">Multiple successful exits and $100M+ businesses built from scratch</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name="multiLocation" size="lg" className="text-white" />
                    </div>
                    <p className="text-[var(--text-secondary)] font-medium">Dubai + Toronto presence serving enterprise groups across 3 countries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>

      {/* Journey Timeline — Concrete milestones, not aspirations */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                The Sundae Journey
              </h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
                From operator pain to platform. From one market to three countries. From zero modules to thirty.
              </p>
            </div>
          </FadeUp>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-6 relative">
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-[var(--surface-subtle)] via-[var(--border-default)] to-[var(--surface-subtle)]" />

            {milestones.map((milestone, index) => (
              <FadeUp key={`${milestone.year}-${index}`} delay={index * 0.1}>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mx-auto mb-6 relative z-10 border-4 border-[var(--surface-faint)] hover:scale-110 transition-transform duration-300">
                    {milestone.year}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">{milestone.title}</h3>
                    <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {milestones.map((milestone, index) => (
                <FadeUp key={`mobile-${milestone.year}-${index}`} delay={index * 0.1}>
                  <div className="flex-shrink-0 w-80 snap-center">
                    <Card variant="elevated" className="h-full p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mb-4">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{milestone.title}</h3>
                      <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{milestone.description}</p>
                    </Card>
                  </div>
                </FadeUp>
              ))}
            </div>
            <p className="text-center text-sm text-[var(--text-muted)] mt-4">&larr; Swipe to explore &rarr;</p>
          </div>
        </div>
      </section>

      {/* Values — Grounded with proof points */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                What We Stand For
              </h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
                Principles that shape every product decision — backed by how we actually build.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeUp key={value.title} delay={index * 0.1}>
                <div className="hover:-translate-y-1 transition-transform duration-300">
                  <Card variant="feature" className="text-center h-full p-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#0A1E8C] to-[#1C47FF] rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <SundaeIcon name={value.icon} size="xl" className="text-white" />
                    </div>
                    <h3 className="text-[var(--text-primary)] text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-[var(--text-supporting)] leading-[1.65] mb-4">
                      {value.description}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] italic border-t border-[var(--border-default)] pt-3 mt-auto">
                      {value.proof}
                    </p>
                  </Card>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                Where We Operate
              </h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
                Active in the Middle East and North America. Expanding into major global hospitality markets.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { region: "Middle East", countries: "UAE, KSA, Qatar", icon: "network" as SundaeIconName, color: "bg-green-600", label: "Active" },
              { region: "North America", countries: "USA, Canada", icon: "network" as SundaeIconName, color: "bg-[#1C47FF]", label: "Active" },
              { region: "Europe", countries: "UK, Germany, France", icon: "network" as SundaeIconName, color: "bg-violet-600", label: "Target" },
              { region: "Asia Pacific", countries: "Australia, Singapore", icon: "network" as SundaeIconName, color: "bg-orange-600", label: "Target" }
            ].map((region, index) => (
              <FadeUp key={region.region} delay={index * 0.1}>
                <div className="text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className={`w-20 h-20 ${region.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <SundaeIcon name={region.icon} size="lg" className="text-white" />
                  </div>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded-full ${region.label === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-[var(--surface-subtle)] text-[var(--text-muted)]'}`}>
                    {region.label}
                  </span>
                  <h3 className="font-bold text-[var(--text-primary)] text-lg mb-2">{region.region}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{region.countries}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Demo-first, careers secondary */}
      <PageCTA
        title="See What Unified Intelligence Looks Like"
        description="30 minutes with your data. Real insights. No pitch deck."
      >
        <Button variant="cta" size="lg" href="/demo">Book a Demo</Button>
        <Button variant="outline-light" size="lg" href="/careers">We&apos;re Hiring</Button>
      </PageCTA>
    </div>
  );
}
