import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function AboutPage() {
  const leadership = [
    {
      name: "Robert Laryea",
      role: "Founder & CEO",
      location: "Dubai",
      image: "/team/robert-laryea.jpg",
      bullets: [
        "20+ years leading consulting and global transformation programs",
        "Deep F&B operator experience — saw fragmented restaurant data pain first-hand",
        "Scaled restaurant concepts from zero to $10M+ annual revenue",
        "Founded Sundae to unify data, market context, and intelligence into one restaurant operating layer"
      ]
    },
    {
      name: "Daanish Siddiqui",
      role: "Chief Growth Officer",
      location: "Dubai",
      image: "/team/daanish-siddiqui.jpg",
      bullets: [
        "18+ years turning ideas into $100M+ businesses",
        "Expert in product, marketing, and go-to-market execution",
        "5x founder with 2 successful exits",
        "Specialist in 0→1 category creation and PLG-driven growth"
      ]
    },
    {
      name: "Alissa Parabani",
      role: "Head of Product",
      location: "Toronto",
      image: "/team/alissa-parabani.jpg",
      bullets: [
        "Former Walmart Canada systems engineer",
        "Translates operator needs into measurable product ROI",
        "Takes concepts from idea to live product in record time",
        "Track record: 3 product lines launched, all profitable within 18 months"
      ]
    },
    {
      name: "Naveed Nadir",
      role: "Head of Technology",
      location: "Toronto",
      image: "/team/naveed-nadir.jpg",
      bullets: [
        "Built enterprise SaaS platforms handling 10M+ daily transactions",
        "Seasoned engineer across automotive and enterprise SaaS",
        "Expert in building secure, compliant systems at global scale",
        "World-class SaaS infrastructure and reliability leadership"
      ]
    }
  ];

  const milestones = [
    {
      year: "2025",
      title: "Sundae Founded",
      description: "Built to solve the fragmented data problem that every multi-location operator faces."
    },
    {
      year: "2025",
      title: "First Deployments",
      description: "Partnered with multi-brand restaurant groups across UAE and Canada to deploy unified intelligence."
    },
    {
      year: "2026",
      title: "GCC & North America Expansion",
      description: "Growing across UAE, KSA, Qatar, and North America with enterprise hospitality groups adopting Sundae platform-wide."
    },
    {
      year: "2026",
      title: "Category Definition",
      description: "Establishing Decision Intelligence as the standard for how restaurant groups analyze, benchmark, and act on operational data."
    },
    {
      year: "2027+",
      title: "Global Expansion (Target)",
      description: "Expanding into Europe and Asia Pacific. Enterprise Intelligence for multi-country restaurant brands."
    }
  ];

  const values: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Operators First",
      description: "Every feature exists because an operator needed it. We don't build for demos — we build for shifts.",
      icon: "owners"
    },
    {
      title: "Intelligence First",
      description: "Scattered data is expensive. We turn 12 systems into one intelligent layer that actually drives decisions.",
      icon: "insights"
    },
    {
      title: "Real-Time Decisions",
      description: "Weekly reports cost you money. The operators who win are the ones who see problems while they can still fix them.",
      icon: "speed"
    },
    {
      title: "Raise the Standard",
      description: "We're setting the benchmark for how restaurant groups worldwide make operational decisions.",
      icon: "growth"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="Our Story"
        title="Built by Operators, for Operators"
        description="Sundae was founded to solve the fragmented data problem that every multi-location restaurant operator faces. We're building the intelligence layer restaurants never had."
      />

      {/* Mission & Vision Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <h2 className="section-h2 text-[var(--text-primary)] mb-8">
                  Our Mission
                </h2>
                <p className="body-xl text-[var(--text-secondary)] mb-10">
                  We exist to give restaurant operators a single source of truth — turning scattered data into confident decisions.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-200">
                    <div className="w-8 h-8 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-primary)] text-sm font-bold mt-1 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)] text-lg mb-1">Unify Every Data Source</h4>
                      <p className="text-[var(--text-supporting)] leading-[1.65]">Break down silos between POS, labor, inventory, and financial systems into one intelligent layer.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-200">
                    <div className="w-8 h-8 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-primary)] text-sm font-bold mt-1 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)] text-lg mb-1">Benchmark Every Location</h4>
                      <p className="text-[var(--text-supporting)] leading-[1.65]">Compare performance against similar restaurants and industry standards in real-time.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 hover:translate-x-1 transition-transform duration-200">
                    <div className="w-8 h-8 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-primary)] text-sm font-bold mt-1 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--text-primary)] text-lg mb-1">Act with Confidence</h4>
                      <p className="text-[var(--text-supporting)] leading-[1.65]">Get intelligence-backed insights and recommendations to improve revenue, reduce costs, and scale faster.</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="bg-[var(--surface-faint)] border border-[var(--border-default)] rounded-3xl p-10 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <SundaeIcon name="marketing" size="xl" className="text-white" />
                  </div>
                  <h3 className="section-h3 text-[var(--text-primary)] mb-4">Our Vision</h3>
                  <p className="body-lg text-[var(--text-secondary)]">
                    Every restaurant group, anywhere in the world, operating with the clarity that only unified intelligence can provide.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="bg-[var(--navy-deep)] rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-sm font-bold text-[var(--text-primary)] mb-1 uppercase tracking-wide">Status</div>
                    <div className="text-sm text-[var(--text-supporting)] font-medium">Deployed with restaurant groups across 3 countries</div>
                  </div>
                  <div className="bg-[var(--navy-deep)] rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-sm font-bold text-lavender mb-1 uppercase tracking-wide">Offices</div>
                    <div className="text-sm text-[var(--text-supporting)] font-medium">Dubai + Toronto</div>
                  </div>
                  <div className="bg-[var(--navy-deep)] rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-sm font-bold text-positive mb-1 uppercase tracking-wide">Focus</div>
                    <div className="text-sm text-[var(--text-supporting)] font-medium">Multi-unit restaurant groups</div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-4">
                Built by Operators. For Operators.
              </h2>
              <p className="text-lg text-[var(--text-supporting)] max-w-4xl mx-auto">
                60+ years of combined experience across restaurants, technology, and data.
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
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name="benchmarking" size="lg" className="text-white" />
                    </div>
                    <p className="text-[var(--text-secondary)] font-medium">60+ years combined experience across restaurants, tech & data</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name="multiLocation" size="lg" className="text-white" />
                    </div>
                    <p className="text-[var(--text-secondary)] font-medium">Dubai + Toronto global presence</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name="growth" size="lg" className="text-white" />
                    </div>
                    <p className="text-[var(--text-secondary)] font-medium">Multiple successful exits and scale-ups</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeUp>
        </div>
      </section>

      {/* Company Story Section - Horizontal Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                The Sundae Journey
              </h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-4xl mx-auto">
                From pain point to platform. From one market to global reach.
              </p>
            </div>
          </FadeUp>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-6 relative">
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-[var(--surface-subtle)] via-[var(--border-default)] to-[var(--surface-subtle)]" />

            {milestones.map((milestone, index) => (
              <FadeUp key={`${milestone.year}-${index}`} delay={index * 0.1}>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mx-auto mb-6 relative z-10 border-4 border-[var(--navy-deep)] hover:scale-110 transition-transform duration-300">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mb-4">
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

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                What We Stand For
              </h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-4xl mx-auto">
                Principles that shape every product decision we make
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeUp key={value.title} delay={index * 0.1}>
                <div className="hover:-translate-y-1 transition-transform duration-300">
                  <Card variant="elevated" className="text-center h-full p-8">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                        <SundaeIcon name={value.icon} size="xl" className="text-white" />
                      </div>
                      <CardTitle className="text-[var(--text-primary)] text-xl mb-4">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-[var(--text-supporting)] leading-[1.65]">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-[var(--text-primary)] mb-6">
                Where We Operate
              </h2>
              <p className="body-xl text-[var(--text-secondary)] max-w-4xl mx-auto">
                Active in the Middle East and North America. Expanding into major global hospitality markets.
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { region: "Middle East", countries: "UAE, KSA, Qatar", icon: "network" as SundaeIconName, color: "bg-green-600", label: "Active" },
              { region: "North America", countries: "USA, Canada", icon: "network" as SundaeIconName, color: "bg-blue-600", label: "Active" },
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

      <PageCTA
        title="Join Us on the Journey"
        description="We're hiring across engineering, product, and go-to-market. Help us build the future of decision intelligence."
      >
        <Button variant="cta" size="lg" href="/careers">View Open Roles</Button>
        <Button variant="outline-light" size="lg" href="/demo">Book a Demo</Button>
      </PageCTA>
    </div>
  );
}
