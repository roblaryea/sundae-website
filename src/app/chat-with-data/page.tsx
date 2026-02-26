'use client';

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useCta } from "@/lib/cta";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { REPORT_APP_URL, SIGNUP_URL } from "@/lib/urls";

const capabilities: { title: string; description: string; icon: SundaeIconName }[] = [
  {
    title: "Chat Mode",
    description: "Ask questions in plain English — no SQL or technical knowledge required. Get answers backed by your real operational data.",
    icon: "conversation"
  },
  {
    title: "Monitor Mode",
    description: "Real-time alerts and anomaly detection. Get notified when metrics move outside expected ranges.",
    icon: "intelligence"
  },
  {
    title: "Briefing Mode",
    description: "AI-generated summaries delivered on schedule — daily, weekly, or triggered by events.",
    icon: "schedule"
  },
  {
    title: "Multi-Channel Access",
    description: "Web app, Telegram, Slack, and Microsoft Teams — wherever your team already works.",
    icon: "integration"
  },
  {
    title: "Multi-Outlet Scope",
    description: "Query across all your locations at once or drill into a single outlet.",
    icon: "multiLocation"
  },
  {
    title: "AI Credit System",
    description: "Transparent usage tracking. Credits included with every plan, top-ups available.",
    icon: "finance"
  }
];

export default function ChatWithDataPage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
                AI-POWERED ANALYTICS
              </p>
              <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
                Sundae Intelligence
              </h1>
              <p className="body-xl text-gray-600 dark:text-slate-300 mb-6 max-w-xl">
                Ask questions in natural language. Get answers backed by your real operational data — on web, Telegram, Slack, or Microsoft Teams.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  href={SIGNUP_URL}
                  onClick={() => cta(SIGNUP_URL, "try_chat_hero", { page: "/chat-with-data" })}
                >
                  Try It Free
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => cta("/demo", "book_demo_chat", { page: "/chat-with-data" })}
                >
                  Book a Demo
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                {["Web", "Telegram", "Slack", "Microsoft Teams"].map((platform) => (
                  <span key={platform} className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
                    {platform}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200/60 dark:border-slate-700">
                <Image
                  src="/images/product/chat-with-data.png"
                  alt="Sundae Intelligence — conversational analytics interface"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Example Queries */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
            Ask Anything About Your Business
          </h2>
          <p className="body-lg text-gray-600 dark:text-gray-300 mb-12">
            From quick checks to deep analysis — just type what you need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "What was my best-selling item last Thursday?",
              "Compare labor costs across my downtown locations",
              "Why did revenue drop at Location 5 this week?",
              "Show me locations where labor cost exceeded 32%",
              "What's my RevPASH trend over the last 3 months?",
              "Which servers had the highest average check today?"
            ].map((query, index) => (
              <motion.div
                key={query}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-left border border-slate-200/70 dark:border-slate-700"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">&ldquo;{query}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              Built for How Teams Actually Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-deep-blue rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={cap.icon} size="lg" className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{cap.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{cap.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Stop Digging Through Dashboards
          </h2>
          <p className="body-lg mb-8 opacity-90">
            Sundae Intelligence is available across all Sundae tiers — unlock the full suite with Intelligence Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => cta("/demo", "book_demo_chat_cta", { page: "/chat-with-data" })}
            >
              Book a Demo
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => cta(SIGNUP_URL, "start_free_chat_cta", { page: "/chat-with-data" })}
            >
              Start Free →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
