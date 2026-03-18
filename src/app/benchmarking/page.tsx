'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
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
 <div className="min-h-screen bg-white">
 {/* Hero */}
 <PageHero
 badge="Competitive Intelligence"
 title="Stop Guessing. Start Knowing."
 description="Is your 31% food cost good or bad? Compare against anonymized peer data &mdash; RevPASH Index, seat occupancy, average check, and revenue indexes &mdash; with AI-generated insights that tell you exactly where you stand."
 >
 <div className="flex flex-col sm:flex-row gap-3 justify-center">
 <Button variant="cta" size="lg" href={REPORT_APP_URL} onClick={() => cta(REPORT_APP_URL, "try_benchmarks_hero", { page: "/benchmarking" })}>
 Try Free Benchmarks
 </Button>
 <Button variant="outline-light" size="lg" onClick={() => cta("/demo", "book_demo_benchmarks", { page: "/benchmarking" })}>
 Book a Demo
 </Button>
 </div>
 </PageHero>

 {/* How Benchmarking Works */}
 <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
 <div className="max-w-5xl mx-auto">
 <FadeUp className="text-center mb-12">
 <h2 className="section-h2 text-slate-900 mb-4">
 How Sundae Benchmarks Work
 </h2>
 <p className="body-lg text-slate-600 max-w-3xl mx-auto">
 Upload your data, get instant comparisons against restaurants like yours.
 </p>
 </FadeUp>

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
 <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
 <p className="text-sm text-slate-600">{item.description}</p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Benchmark Metrics */}
 <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
 <div className="max-w-7xl mx-auto">
 <FadeUp className="text-center mb-16">
 <h2 className="section-h2 text-slate-900 mb-4">
 What You Can Benchmark
 </h2>
 <p className="body-lg text-slate-600">
 30+ metrics across performance, efficiency, and market position.
 </p>
 </FadeUp>

 <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 {benchmarkMetrics.map((metric) => (
 <StaggerItem key={metric.name}>
 <Card variant="elevated" className="h-full hover:shadow-lg transition-all duration-300">
 <CardContent className="p-6">
 <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
 <SundaeIcon name={metric.icon} size="lg" className="text-white" />
 </div>
 <h3 className="font-bold text-slate-900 mb-2">{metric.name}</h3>
 <p className="text-sm text-slate-600 leading-relaxed">{metric.description}</p>
 </CardContent>
 </Card>
 </StaggerItem>
 ))}
 </StaggerContainer>
 </div>
 </section>

 {/* Forecast Screenshot */}
 <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
 <div className="max-w-5xl mx-auto">
 <div className="grid md:grid-cols-2 gap-12 items-center">
 <FadeUp>
 <h2 className="section-h2 text-slate-900 mb-4">
 Revenue Forecasting
 </h2>
 <p className="body-lg text-slate-600 mb-6">
 Go beyond historical comparisons. Sundae Benchmarks includes AI-powered revenue forecasting that uses your trends and market data to project future performance.
 </p>
 <ul className="space-y-3">
 {["14-30 day revenue projections", "Seasonal pattern recognition", "Market-adjusted forecasts", "Confidence intervals"].map((feature) => (
 <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
 <span className="text-green-500">&#10003;</span>
 {feature}
 </li>
 ))}
 </ul>
 </FadeUp>
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
 <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
 <div className="max-w-5xl mx-auto text-center">
 <FadeUp>
 <h2 className="section-h2 text-slate-900 mb-4">
 Available Across All Tiers
 </h2>
 <p className="body-lg text-slate-600 mb-12">
 Start benchmarking for free with Report Lite. Unlock deeper intelligence as you grow.
 </p>
 </FadeUp>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
 <div className="text-sm font-semibold text-green-600 mb-2">FREE</div>
 <h3 className="text-lg font-bold text-slate-900 mb-2">Report Lite</h3>
 <p className="text-sm text-slate-600">5 core metrics. CSV upload. 90-day retention.</p>
 </div>
 <div className="bg-white rounded-xl p-6 border-2 border-blue-500 shadow-md">
 <div className="text-sm font-semibold text-blue-600 mb-2">POPULAR</div>
 <h3 className="text-lg font-bold text-slate-900 mb-2">Report Plus</h3>
 <p className="text-sm text-slate-600">15 metrics. AI-parsed uploads. 1-year retention.</p>
 </div>
 <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
 <div className="text-sm font-semibold text-purple-600 mb-2">FULL POWER</div>
 <h3 className="text-lg font-bold text-slate-900 mb-2">Report Pro / Core</h3>
 <p className="text-sm text-slate-600">30+ metrics. API integration. Multi-year retention.</p>
 </div>
 </div>
 </div>
 </section>

 {/* CTA */}
 <PageCTA
 title="See Where You Stand"
 description="Upload your data and get your first benchmark in minutes. Free, no credit card required."
 >
 <Button
 variant="cta"
 size="lg"
 className="bg-white text-slate-900 hover:bg-slate-100"
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
 </PageCTA>
 </div>
 );
}
