import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export const metadata: Metadata = {
  title: "Why Sundae",
  description:
    "See why leading restaurant groups choose Sundae for Decision Intelligence — unified data, 4D insights, and real-time operational visibility.",
};

const differentiators: { title: string; description: string; icon: SundaeIconName; color: string }[] = [
  {
    title: "11-Domain Data Ingestion",
    description: "POS, labor, inventory, purchasing, reservations, delivery, marketing, guest experience, CRM, accounting — all unified automatically.",
    icon: "integration",
    color: "bg-blue-600"
  },
  {
    title: "4D Intelligence Model",
    description: "Go beyond reporting. See what happened, how it compares to plan, where you stand in the market, and what to do next.",
    icon: "intelligence",
    color: "bg-purple-600"
  },
  {
    title: "Real-Time Operations via Pulse",
    description: "Intraday monitoring of sales pace, labor, leakage, service speed, stockouts, and menu intelligence — with AI coaching.",
    icon: "speed",
    color: "bg-green-600"
  },
  {
    title: "External Intelligence via Watchtower",
    description: "Track competitor pricing, weather impact on revenue, local events, and receive AI-generated daily and weekly briefings.",
    icon: "watchtower",
    color: "bg-red-600"
  },
  {
    title: "Conversational Access",
    description: "Ask questions in natural language via Sundae Intelligence — on web, Telegram, Slack, or Microsoft Teams.",
    icon: "forge",
    color: "bg-orange-600"
  },
  {
    title: "Built for Multi-Location Operators",
    description: "Multi-tenant architecture with RBAC, portfolio leaderboards, cross-location benchmarking, and multi-currency support.",
    icon: "multiLocation",
    color: "bg-teal-600"
  }
];

const problems = [
  {
    problem: "Fragmented Operational Data",
    current: "POS, labor, inventory, reservations, and finance scattered across 5-10 different systems with no unified view",
    solution: "Sundae's Integrations Hub connects 11 data domains into a single intelligence layer",
    impact: "One source of truth across every location"
  },
  {
    problem: "Reactive Decision-Making",
    current: "Weekly reports that show what happened — too late to act on lost revenue, labor overruns, or margin erosion",
    solution: "Pulse monitors operations intraday with real-time alerts, AI coaching, and automated playbooks",
    impact: "Shift from reactive to proactive management"
  },
  {
    problem: "No Market Context",
    current: "Internal metrics in isolation — no visibility into competitor activity, weather impact, or local event demand",
    solution: "Watchtower and Benchmarks add market context to every operational decision",
    impact: "Decisions informed by internal and external signals"
  }
];

export default function WhySundaePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
            Why Leading Restaurant Groups
            <br />
            <span className="text-gradient">Choose Sundae</span>
          </h1>
          <p className="body-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Decision Intelligence that unifies your data, monitors your operations in real time,
            and tells your team exactly what to do next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                Book a Demo
              </Button>
            </Link>
            <Link href="/report">
              <Button variant="outline" size="lg">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Three Biggest Problems Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Three Problems Every Operator Faces
            </h2>
            <p className="body-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              And how Sundae solves each one
            </p>
          </div>

          <div className="space-y-12">
            {problems.map((item, index) => (
              <div key={item.problem} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className={`lg:col-span-1 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-3'}`}>
                  <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-300 mb-3">{item.problem}</h3>
                    <p className="text-red-700 dark:text-red-400 text-sm mb-4">{item.current}</p>
                    <div className="text-xs text-red-600 dark:text-red-500 font-medium">THE PROBLEM</div>
                  </div>
                </div>

                <div className="lg:col-span-1 lg:order-2">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                      &rarr;
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sundae Solution</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{item.solution}</p>
                  </div>
                </div>

                <div className={`lg:col-span-1 ${index % 2 === 0 ? 'lg:order-3' : 'lg:order-1'}`}>
                  <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">Result</h3>
                    <p className="text-green-700 dark:text-green-400 text-sm mb-4">{item.impact}</p>
                    <div className="text-xs text-green-600 dark:text-green-500 font-medium">THE OUTCOME</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              What Makes Sundae Different
            </h2>
            <p className="body-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Purpose-built for restaurant and hospitality operators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item) => (
              <Card key={item.title} variant="elevated">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white`}>
                      <SundaeIcon name={item.icon} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Compares */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-h2 mb-8">
            Beyond Traditional Dashboards
          </h2>
          <p className="body-xl mb-12 max-w-3xl mx-auto opacity-90">
            Traditional BI shows you what happened. Sundae shows you what to do next.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {([
              {
                title: "Traditional BI",
                items: ["Historical reporting", "Manual data pulls", "Siloed metrics", "Reactive management"],
                icon: "warning" as SundaeIconName
              },
              {
                title: "Generic Analytics",
                items: ["Multi-source dashboards", "Scheduled reports", "Basic alerting", "No industry context"],
                icon: "sync" as SundaeIconName
              },
              {
                title: "Sundae",
                items: ["4D Intelligence Model", "Real-time Pulse monitoring", "Market context via Watchtower", "AI-powered recommendations"],
                icon: "speed" as SundaeIconName
              }
            ]).map((section) => (
              <div key={section.title} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SundaeIcon name={section.icon} size="xl" className="text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="text-sm opacity-90">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Built for Every Role in the Organization
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {([
              {
                title: "Operations Leaders",
                description: "Real-time visibility into every location via Pulse and Portfolio",
                icon: "multiLocation" as SundaeIconName,
                color: "bg-blue-600"
              },
              {
                title: "Finance & FP&A",
                description: "Benchmarking, forecasting, and margin intelligence across the group",
                icon: "benchmarking" as SundaeIconName,
                color: "bg-green-600"
              },
              {
                title: "C-Suite & Owners",
                description: "Portfolio-level dashboards, AI briefs, and strategic decision views",
                icon: "intelligence" as SundaeIconName,
                color: "bg-purple-600"
              },
              {
                title: "Technology Teams",
                description: "Public API, webhooks, 11-domain integrations, and RBAC controls",
                icon: "integration" as SundaeIconName,
                color: "bg-orange-600"
              }
            ]).map((role) => (
              <Card key={role.title} variant="elevated">
                <CardHeader>
                  <div className="text-center">
                    <div className={`w-14 h-14 ${role.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                      <SundaeIcon name={role.icon} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white text-lg">{role.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">{role.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            See Sundae in Action
          </h2>
          <p className="body-xl mb-8 opacity-90">
            Book a demo to see how Decision Intelligence can transform your restaurant operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Book a Demo
              </Button>
            </Link>
            <Link href="/report">
              <Button variant="outline-light" size="lg">
                Start Free with Report
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
