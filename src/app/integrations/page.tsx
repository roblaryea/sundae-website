import type { Metadata } from "next";
import Image from "next/image";
import { SundaeIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Sundae to your POS, payroll, inventory, delivery, and reservation systems. 11-domain integration engine with 30+ vendor connections.",
};

const integrationCategories = [
  {
    category: "Point of Sale (POS)",
    icon: "restaurant" as const,
    status: "Live" as const,
    systems: [
      "Oracle MICROS Simphony",
      "Square",
      "Toast",
      "Clover",
      "PostgreSQL (Direct DB)",
      "SQL Server / Azure SQL (Direct DB)",
    ],
  },
  {
    category: "Labor & Scheduling",
    icon: "labor" as const,
    status: "Upcoming" as const,
    systems: [
      "7shifts",
      "HotSchedules (Fourth)",
      "Deputy",
    ],
  },
  {
    category: "Inventory & Availability",
    icon: "inventory" as const,
    status: "Upcoming" as const,
    systems: [
      "MarketMan",
      "Craftable",
      "BinWise",
    ],
  },
  {
    category: "Purchasing & Procurement",
    icon: "purchasing" as const,
    status: "Upcoming" as const,
    systems: [
      "MarketMan",
    ],
  },
  {
    category: "Delivery & 3PD",
    icon: "speed" as const,
    status: "Upcoming" as const,
    systems: [
      "Deliverect",
      "Uber Eats",
      "DoorDash",
      "Talabat",
    ],
  },
  {
    category: "Reservations & Guest Flow",
    icon: "reservations" as const,
    status: "Upcoming" as const,
    systems: [
      "SevenRooms",
      "OpenTable",
      "Resy",
      "Tock",
    ],
  },
  {
    category: "Marketing & Campaigns",
    icon: "marketing" as const,
    status: "Upcoming" as const,
    systems: [
      "Meta (Facebook / Instagram)",
      "Google Ads",
      "Mailchimp",
    ],
  },
  {
    category: "Guest Experience & Feedback",
    icon: "conversation" as const,
    status: "Upcoming" as const,
    systems: [
      "Google Reviews",
      "Yelp",
      "Zendesk",
    ],
  },
  {
    category: "Guest CRM",
    icon: "operators" as const,
    status: "Upcoming" as const,
    systems: [
      "SevenRooms",
      "Toast",
      "Olo",
    ],
  },
  {
    category: "Accounting & Finance",
    icon: "finance" as const,
    status: "Upcoming" as const,
    systems: [
      "QuickBooks",
      "Xero",
      "Sage",
      "FreshBooks",
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <span className="badge--architecture inline-block mb-4">INTEGRATIONS</span>
          <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
            Connect Every System. Unify Every Metric.
          </h1>
          <p className="body-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Sundae&apos;s 11-domain integration engine connects 30+ restaurant platforms — from POS and payroll to delivery and reservations. Your data flows in automatically, so your team can focus on decisions, not data entry.
          </p>
          <a href="/demo" className="btn-primary">
            See Integrations in Action
          </a>

          <div className="mt-12 max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-700">
              <Image
                src="/images/product/core-integrations.png"
                alt="Sundae integrations — connected restaurant systems"
                width={1200}
                height={700}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950/90 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                step: "1",
                title: "Connect",
                description: "Authenticate your platforms with OAuth or API key — most integrations take under 5 minutes.",
              },
              {
                step: "2",
                title: "Normalize",
                description: "Scout, our data layer, cleans, maps, and unifies every data source into a consistent schema.",
              },
              {
                step: "3",
                title: "Analyze",
                description: "Unified data flows into dashboards, alerts, and AI recommendations — no manual exports needed.",
              },
            ].map((item) => (
              <div key={item.step} className="p-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              11 Data Domains. One Unified View.
            </h2>
            <p className="body-lg text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
              POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting, and daily sales summaries — all connected.
            </p>
          </div>

          <div className="space-y-12">
            {integrationCategories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow">
                    <SundaeIcon name={cat.icon} size="md" className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {cat.category}
                  </h3>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    cat.status === "Live"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  }`}>
                    {cat.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {cat.systems.map((system) => (
                    <div
                      key={system}
                      className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60 text-sm font-medium text-gray-700 dark:text-slate-300 text-center hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                    >
                      {system}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
            <div className="flex items-center justify-center gap-6 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Live — available now</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Upcoming — on our roadmap</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Upcoming integrations are actively in development. Timelines may vary. Contact us to request priority for a specific integration.
            </p>
          </div>
        </div>
      </section>

      {/* Webhooks & Public API */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Webhooks & Public API
            </h2>
            <p className="body-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Build custom integrations with Sundae&apos;s developer tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <SundaeIcon name="integration" size="lg" className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Custom Webhooks</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm mb-4">
                Configure webhooks for any non-POS data domain. Push data into Sundae from any system with HTTP support.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-400">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>HMAC-SHA256 signature verification</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>Test payloads and delivery tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>Available for all 11 data domains</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <SundaeIcon name="data" size="lg" className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Public API v1</h3>
              <p className="text-gray-600 dark:text-slate-400 text-sm mb-4">
                Read-only API endpoints authenticated with API keys. Access your Sundae data programmatically.
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-slate-400">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>Sales summary and exception endpoints</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>Pulse status and alert data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-0.5">&#10003;</span>
                  <span>Configurable rate limits and scoped API keys</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Missing Integration CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950/90">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
            Don&apos;t See Your System?
          </h2>
          <p className="body-lg text-gray-600 dark:text-slate-300 mb-8">
            We add new integrations regularly. Use our webhook system to connect any HTTP-capable system, or request a custom integration for Enterprise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Request an Integration
            </a>
            <a href="/product/scout" className="btn-tertiary">
              Learn About Scout (Data Layer)
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
