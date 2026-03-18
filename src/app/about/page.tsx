"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

// Fade up animation component
function FadeUpSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

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
        "Founded Sundae to unify data, market context, and AI into one restaurant operating layer"
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
      title: "Data Intelligence First",
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
    <div className="min-h-screen bg-gradient-to-br from-soft-white via-pure-white to-blue-50 dark:from-graphite-black dark:via-gray-900 dark:to-deep-blue/10">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <FadeUpSection>
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-8">
              Built by Operators.{" "}
              <span className="text-gradient">Backed by Data.</span>
            </h1>
          </FadeUpSection>

          <FadeUpSection delay={0.1}>
            <p className="body-xl text-gray-700 dark:text-gray-300 mb-10 max-w-4xl mx-auto">
              We've managed restaurants. We've felt the pain of fragmented data. We built Sundae to fix it.
            </p>
          </FadeUpSection>

          <FadeUpSection delay={0.2}>
            <Link href="/demo">
              <Button variant="primary" size="lg" className="text-base px-8 py-4 shadow-lg hover:shadow-xl transition-all">
                See Sundae in Action
              </Button>
            </Link>
          </FadeUpSection>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUpSection>
              <div>
                <h2 className="section-h2 text-gray-900 dark:text-white mb-8">
                  Our Mission
                </h2>
                <p className="body-xl text-gray-700 dark:text-gray-300 mb-10">
                  We exist to give restaurant operators a single source of truth — turning scattered data into confident decisions.
                </p>

                <div className="space-y-6">
                  <motion.div
                    className="flex items-start space-x-4"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Unify Every Data Source</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-[1.65]">Break down silos between POS, labor, inventory, and financial systems into one intelligent layer.</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Benchmark Every Location</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-[1.65]">Compare performance against similar restaurants and industry standards in real-time.</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-start space-x-4"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">Act with Confidence</h4>
                      <p className="text-gray-600 dark:text-gray-400 leading-[1.65]">Get AI-powered insights and recommendations to improve revenue, reduce costs, and scale faster.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </FadeUpSection>

            <FadeUpSection delay={0.1}>
              <div className="bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded-3xl p-10 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-electric-blue to-deep-blue rounded-xl flex items-center justify-center">
                    <SundaeIcon name="marketing" size="xl" className="text-white" />
                  </div>
                  <h3 className="section-h3 text-gray-900 dark:text-white mb-4">Our Vision</h3>
                  <p className="body-lg text-gray-700 dark:text-gray-300">
                    Every restaurant group, anywhere in the world, operating with the clarity that only unified intelligence can provide.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-sm font-bold text-electric-blue mb-1 uppercase tracking-wide">Status</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Deployed with restaurant groups across 3 countries</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-sm font-bold text-lavender mb-1 uppercase tracking-wide">Offices</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Dubai + Toronto</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center">
                    <div className="text-sm font-bold text-positive mb-1 uppercase tracking-wide">Focus</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Multi-unit restaurant groups</div>
                  </div>
                </div>
              </div>
            </FadeUpSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-deep-blue/5">
        <div className="max-w-7xl mx-auto">
          <FadeUpSection>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
                Built by Operators. For Operators.
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
                60+ years of combined experience across restaurants, technology, and data.
              </p>
            </div>
          </FadeUpSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {leadership.map((member, index) => (
              <FadeUpSection key={member.name} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      loading="lazy"
                      className="w-full h-full rounded-full object-cover border-4 border-electric-blue/20"
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-xl mb-1">{member.name}</h3>
                  <p className="text-electric-blue dark:text-electric-blue font-semibold text-sm mb-1">{member.role}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">{member.location}</p>
                  <ul className="text-left space-y-3">
                    {member.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="text-electric-blue mt-1 flex-shrink-0">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </FadeUpSection>
            ))}
          </div>

          {/* Team Strengths */}
          <FadeUpSection delay={0.4}>
            <Card variant="elevated" className="bg-gradient-to-r from-electric-blue/10 to-deep-blue/10 dark:from-electric-blue/20 dark:to-deep-blue/20 border-2 border-electric-blue/20">
              <CardContent className="p-8">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-6">Team Strengths</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-electric-blue rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name="benchmarking" size="lg" className="text-white" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">60+ years combined experience across restaurants, tech & data</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-electric-blue rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name="multiLocation" size="lg" className="text-white" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Dubai + Toronto global presence</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-electric-blue rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <SundaeIcon name="growth" size="lg" className="text-white" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">Multiple successful exits and scale-ups</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeUpSection>
        </div>
      </section>

      {/* Company Story Section - Horizontal Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeUpSection>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                The Sundae Journey
              </h2>
              <p className="body-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
                From pain point to platform. From one market to global reach.
              </p>
            </div>
          </FadeUpSection>

          {/* Desktop: Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-electric-blue via-deep-blue to-electric-blue" style={{ top: '32px' }} />

            {milestones.slice(0, 4).map((milestone, index) => (
              <FadeUpSection key={`${milestone.year}-${index}`} delay={index * 0.1}>
                <div className="relative">
                  {/* Node */}
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-electric-blue to-deep-blue rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mx-auto mb-6 relative z-10 border-4 border-white dark:border-gray-900"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {milestone.year}
                  </motion.div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{milestone.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </FadeUpSection>
            ))}
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="lg:hidden">
            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {milestones.map((milestone, index) => (
                <motion.div
                  key={`${milestone.year}-${index}`}
                  className="flex-shrink-0 w-80 snap-center"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card variant="elevated" className="h-full p-6 dark:bg-gray-800">
                    <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-deep-blue rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg mb-4">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{milestone.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{milestone.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">&larr; Swipe to explore &rarr;</p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-deep-blue/5">
        <div className="max-w-7xl mx-auto">
          <FadeUpSection>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                What We Stand For
              </h2>
              <p className="body-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
                Principles that shape every product decision we make
              </p>
            </div>
          </FadeUpSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeUpSection key={value.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card variant="elevated" className="text-center h-full p-8">
                    <CardHeader>
                      <motion.div
                        className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-electric-blue to-deep-blue rounded-xl flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <SundaeIcon name={value.icon} size="xl" className="text-white" />
                      </motion.div>
                      <CardTitle className="text-gray-900 dark:text-white text-xl mb-4">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 dark:text-gray-400 leading-[1.65]">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeUpSection>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <FadeUpSection>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-gray-900 dark:text-white mb-6">
                Where We Operate
              </h2>
              <p className="body-xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto">
                Active in the Middle East and North America. Expanding into major global hospitality markets.
              </p>
            </div>
          </FadeUpSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { region: "Middle East", countries: "UAE, KSA, Qatar", icon: "network" as SundaeIconName, color: "bg-positive", label: "Active" },
              { region: "North America", countries: "USA, Canada", icon: "network" as SundaeIconName, color: "bg-electric-blue", label: "Active" },
              { region: "Europe", countries: "UK, Germany, France", icon: "network" as SundaeIconName, color: "bg-lavender", label: "Target" },
              { region: "Asia Pacific", countries: "Australia, Singapore", icon: "network" as SundaeIconName, color: "bg-coral", label: "Target" }
            ].map((region, index) => (
              <FadeUpSection key={region.region} delay={index * 0.1}>
                <motion.div
                  className="text-center"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`w-20 h-20 ${region.color} rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-lg`}
                  >
                    <SundaeIcon name={region.icon} size="lg" className="text-white" />
                  </div>
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded-full ${region.label === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`}>
                    {region.label}
                  </span>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{region.region}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{region.countries}</p>
                </motion.div>
              </FadeUpSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeUpSection>
            <h2 className="section-h2 text-white mb-8">
              Let's Build Together
            </h2>
            <p className="body-xl text-gray-300 mb-12 font-medium">
              Whether you're a restaurant group, technology partner, or operator who wants more from their data — we'd love to talk.
            </p>
          </FadeUpSection>

          <FadeUpSection delay={0.1}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/demo">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-slate-950 hover:bg-gray-100 font-semibold px-8 py-4 text-base shadow-xl hover:shadow-2xl transition-all"
                >
                  Partner with Sundae
                </Button>
              </Link>
              <Link href="/careers">
                <Button
                  variant="outline-light"
                  size="lg"
                >
                  Join Our Team
                </Button>
              </Link>
            </div>
          </FadeUpSection>
        </div>
      </section>
    </div>
  );
}
