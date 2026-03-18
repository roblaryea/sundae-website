import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-500 mb-4">SCOUT — DATA LAYER</span>
          <h1 className="hero-h1 text-gray-900 mb-6">
            Every System Connected. Every Number Trusted.
          </h1>
          <p className="body-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Scout is the foundation. It connects your POS, labor, inventory, reservations, and delivery platforms into one clean data layer — so every dashboard, alert, and recommendation starts with data you can trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                See Scout in Action
              </Button>
            </Link>
            <Link href="/integrations">
              <Button variant="outline" size="lg">
                View All Integrations
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              What Scout Does
            </h2>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto">
              One data layer that connects, cleans, and unifies everything your restaurant runs on
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-xl bg-slate-900 flex items-center justify-center text-white flex-shrink-0">
                    <SundaeIcon name={feature.icon} size="md" className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Connected Platforms
            </h2>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto">
              Most integrations take under 5 minutes. OAuth or API key — authenticate and go.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrations.map((category, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">{category.category}</h3>
                <ul className="space-y-2.5">
                  {category.systems.map((system, systemIndex) => (
                    <li key={systemIndex} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                      <span className="text-gray-600 text-sm">{system}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            <Link href="/integrations" className="hover:text-gray-700 transition-colors underline underline-offset-2">
              See all 30+ integrations &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Connect. Clean. Activate.
            </h2>
            <p className="body-lg text-gray-600 max-w-3xl mx-auto">
              Three steps from siloed systems to unified intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                description: "Unified data flows into dashboards, alerts, and AI recommendations. No exports, no manual entry."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-lg font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-white mb-6">
            Stop Exporting. Start Connecting.
          </h2>
          <p className="body-xl text-slate-300 max-w-2xl mx-auto mb-8">
            See how Scout unifies your restaurant data in a single demo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Book a Demo
              </Button>
            </Link>
            <Link href="/product">
              <Button variant="outline-light" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
