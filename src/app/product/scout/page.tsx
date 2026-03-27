import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from '@/components/ui/PageAnimations';

export default function ScoutPage() {
  const features: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "30+ Pre-Built Connectors",
      description: "POS, labor, inventory, reservations, delivery, marketing, accounting — Scout speaks to the systems you already use.",
      icon: "integration"
    },
    {
      title: "Continuous Sync",
      description: "Data flows automatically. No nightly dumps, no CSV uploads, no waiting until morning to see yesterday's numbers.",
      icon: "speed"
    },
    {
      title: "Cleaning Built In",
      description: "Scout normalizes naming, fills gaps, and flags quality issues before bad data reaches your dashboards.",
      icon: "success"
    },
    {
      title: "Enterprise Scale",
      description: "100+ locations, millions of transactions, sub-second queries. Scout is built for restaurant groups that outgrow spreadsheets.",
      icon: "growth"
    }
  ];

  const integrations = [
    { category: "Point of Sale", systems: ["Oracle MICROS", "Toast", "Square", "Clover"] },
    { category: "Labor & Scheduling", systems: ["7shifts", "HotSchedules", "Deputy"] },
    { category: "Inventory", systems: ["MarketMan", "Craftable", "BinWise"] },
    { category: "Reservations & CRM", systems: ["SevenRooms", "OpenTable", "Resy", "Tock"] }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge="Scout — Data Layer"
        title={<>Every System Connected.<br />Every Number Trusted.</>}
        description="Scout connects your POS, labor, inventory, reservations, and delivery platforms into one clean data layer — so every dashboard, alert, and recommendation starts with data you can trust."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See Scout in Action
            </Button>
          </Link>
          <Link href="/integrations">
            <Button variant="outline-light" size="lg">
              View All Integrations
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] border-b border-[var(--border-default)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              What Scout Does
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              One data layer that connects, cleans, and unifies everything your restaurant runs on
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <StaggerItem key={index}>
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--navy-deep)] p-6 hover:border-white/[0.1] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-[var(--surface-subtle)] flex items-center justify-center flex-shrink-0">
                      <SundaeIcon name={feature.icon} size="md" className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">{feature.title}</h3>
                      <p className="text-sm text-[var(--text-supporting)] leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Connected Platforms */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Connected Platforms
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              Most integrations take under 5 minutes. OAuth or API key — authenticate and go.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((category, index) => (
              <StaggerItem key={index}>
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--navy-deep)] p-6">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">{category.category}</h3>
                  <ul className="space-y-2.5">
                    {category.systems.map((system, systemIndex) => (
                      <li key={systemIndex} className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full"></span>
                        <span className="text-[var(--text-supporting)] text-sm">{system}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <p className="text-center text-sm text-[var(--text-muted)] mt-8">
            <Link href="/integrations" className="hover:text-[var(--text-secondary)] transition-colors underline underline-offset-2">
              See all 80+ integrations &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">
              Connect. Clean. Activate.
            </h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">
              Three steps from siloed systems to unified intelligence
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Authenticate",
                description: "Connect your platforms with OAuth or API key. Most integrations take under 5 minutes — no engineering required."
              },
              {
                step: "2",
                title: "Normalize",
                description: "Scout maps every data source to a consistent schema, cleans inconsistencies, and fills gaps automatically."
              },
              {
                step: "3",
                title: "Analyze",
                description: "Unified data flows into dashboards, alerts, and recommendations. No exports, no manual entry."
              }
            ].map((step, index) => (
              <StaggerItem key={index}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--surface-subtle)] rounded-full flex items-center justify-center text-[var(--text-supporting)] text-lg font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-supporting)]">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title="Stop Exporting. Start Connecting."
        description="See how Scout unifies your restaurant data in a single demo."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book a Demo
          </Button>
        </Link>
        <Link href="/product">
          <Button variant="outline-light" size="lg">
            View All Products
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
