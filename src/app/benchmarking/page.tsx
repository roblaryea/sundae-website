'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { useCta } from "@/lib/cta";
import { REPORT_APP_URL } from "@/lib/urls";

const benchmarkMetrics: { name: string; description: string; icon: SundaeIconName }[] = [
  {
    name: "RevPASH Index",
    description: "Revenue Per Available Seat Hour — the gold standard for restaurant space efficiency.",
    icon: "chart"
  },
  {
    name: "Seat Occupancy",
    description: "How effectively you fill your seats compared to similar restaurants in your market.",
    icon: "restaurant"
  },
  {
    name: "Average Check Size",
    description: "Per-guest spend compared to your competitive set, with trend analysis over time.",
    icon: "finance"
  },
  {
    name: "Revenue Indexes",
    description: "Multi-dimensional revenue comparison across locations, dayparts, and time periods.",
    icon: "growth"
  },
  {
    name: "Compset Comparisons",
    description: "Anonymized peer benchmarks from restaurants of similar size, cuisine, and market.",
    icon: "multiLocation"
  },
  {
    name: "AI Priority Insights",
    description: "AI-generated analysis highlighting where you outperform and where to improve.",
    icon: "intelligence"
  }
];

export default function BenchmarkingPage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <SundaeIcon name="benchmarking" size="md" />
                <span>Benchmarks</span>
              </div>
              <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
                Competitive Intelligence
              </h1>
              <p className="body-xl text-gray-600 dark:text-slate-300 mb-6 max-w-xl">
                Compare your performance against anonymized peer data. RevPASH, occupancy, check size, and revenue indexes — with trend analysis and AI-generated insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button
                  variant="primary"
                  size="lg"
                  href={REPORT_APP_URL}
                  onClick={() => cta(REPORT_APP_URL, "try_benchmarks_hero", { page: "/benchmarking" })}
                >
                  Start Free Benchmark
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => cta("/demo", "book_demo_benchmarks", { page: "/benchmarking" })}
                >
                  Book a Demo
                </Button>
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400">
                Available on Sundae Report (free tier) and Sundae Core. No credit card required to start.
              </p>
            </motion.div>

            <div>
              <BrowserFrame
                src="/images/product/benchmark-overview.png"
                alt="Benchmarks — competitive intelligence dashboard with RevPASH and peer comparisons"
                width={800}
                height={500}
                priority
                animate="slide-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How Benchmarking Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              How Sundae Benchmarks Work
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Upload your data, get instant comparisons against restaurants like yours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Upload Your Data", description: "CSV, PDF, Excel, or connect your POS directly. We normalize everything automatically." },
              { step: "2", title: "Match Your Compset", description: "We match you against anonymized peers by cuisine, size, market, and service model." },
              { step: "3", title: "Get Actionable Insights", description: "See where you outperform, where you lag, and what to do about it — with AI analysis." }
            ].map((item) => (
              <div key={item.step} className="text-center p-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benchmark Metrics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
              What You Can Benchmark
            </h2>
            <p className="body-lg text-gray-600 dark:text-gray-300">
              30+ metrics across performance, efficiency, and market position.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benchmarkMetrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                      <SundaeIcon name={metric.icon} size="lg" className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{metric.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{metric.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Forecast Screenshot */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
                Revenue Forecasting
              </h2>
              <p className="body-lg text-gray-600 dark:text-gray-300 mb-6">
                Go beyond historical comparisons. Sundae Benchmarks includes AI-powered revenue forecasting that uses your trends and market data to project future performance.
              </p>
              <ul className="space-y-3">
                {["14-30 day revenue projections", "Seasonal pattern recognition", "Market-adjusted forecasts", "Confidence intervals"].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-green-500">&#10003;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <BrowserFrame
              src="/images/product/benchmark-forecast.png"
              alt="Revenue forecasting with trend analysis and confidence intervals"
              width={700}
              height={420}
              animate="slide-right"
            />
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50/30 dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 dark:text-white mb-4">
            Available Across All Tiers
          </h2>
          <p className="body-lg text-gray-600 dark:text-gray-300 mb-12">
            Start benchmarking for free with Report Lite. Unlock deeper intelligence as you grow.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="text-sm font-semibold text-green-600 mb-2">FREE</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Report Lite</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">5 core metrics. CSV upload. 90-day retention.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-blue-500 shadow-md">
              <div className="text-sm font-semibold text-blue-600 mb-2">POPULAR</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Report Plus</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">15 metrics. AI-parsed uploads. 1-year retention.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="text-sm font-semibold text-purple-600 mb-2">FULL POWER</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Report Pro / Core</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400">30+ metrics. API integration. Multi-year retention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-standard px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            See Where You Stand
          </h2>
          <p className="body-lg mb-8 opacity-90">
            Upload your data and get your first benchmark in minutes. Free, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-deep-blue hover:bg-gray-100"
              onClick={() => cta(REPORT_APP_URL, "start_free_benchmarks_cta", { page: "/benchmarking" })}
            >
              Start Free Benchmark
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => cta("/demo", "book_demo_benchmarks_cta", { page: "/benchmarking" })}
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
