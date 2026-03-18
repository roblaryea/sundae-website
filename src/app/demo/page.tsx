import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { LeadCaptureForm } from '@/components/marketing/LeadCaptureForm';
import { SundaeIcon, type SundaeIconName } from '@/components/icons';
import { PRICING_URL } from '@/lib/links';

export default function DemoPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-500 mb-4">BOOK A DEMO</span>
          <h1 className="hero-h1 text-gray-900 mb-6">
            30 Minutes. Your Data. Real Answers.
          </h1>
          <p className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We&apos;ll connect to your POS, show you what your numbers actually mean, and let you decide if it&apos;s worth your time. No slides. No pitch deck. Just your restaurant, on screen.
          </p>
        </div>
      </section>

      {/* Demo Form */}
      <section id="demo-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 mb-4">
              Request Your Demo
            </h2>
            <p className="body-lg text-gray-600">
              Tell us about your operation and we&apos;ll tailor the session to your priorities
            </p>
          </div>

          <LeadCaptureForm
            ctaLabel="Book a Demo"
            defaultMessage="I'm interested in seeing how Sundae can help my restaurant operations."
          />
        </div>
      </section>

      {/* What You'll See */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              What You&apos;ll See
            </h2>
            <p className="body-lg text-gray-600">
              A focused walkthrough built around your operation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {([
              {
                title: "Your Data, Live",
                description: "We connect to your POS and show you what's actually happening across your locations — not a generic demo with sample data.",
                icon: "canvas" as SundaeIconName,
                details: ["Live POS integration", "Multi-location overview", "Real-time anomaly detection", "Historical trend analysis"]
              },
              {
                title: "Your Blind Spots",
                description: "We'll surface the gaps you didn't know existed — revenue leakage, labor inefficiencies, and missed opportunities hiding in your data.",
                icon: "insights" as SundaeIconName,
                details: ["Revenue leakage patterns", "Labor cost optimization", "Menu performance gaps", "Operational anomalies"]
              },
              {
                title: "Your Questions, Answered",
                description: "Bring your toughest operational questions. We'll show you exactly how Sundae answers them — or we'll tell you it can't.",
                icon: "support" as SundaeIconName,
                details: ["Integration with your stack", "Pricing for your scale", "Implementation timeline", "Data security and compliance"]
              }
            ]).map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="w-12 h-12 mb-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center">
                  <SundaeIcon name={benefit.icon} size="lg" className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600 mb-5">{benefit.description}</p>
                <ul className="space-y-2">
                  {benefit.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center space-x-2">
                      <span className="text-slate-400 text-xs">&#10003;</span>
                      <span className="text-gray-600 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Operators Take the Call */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-h2 text-gray-900 mb-4">
              Why Operators Take the Call
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { stat: "30 min", label: "Focused demo — no filler, no fluff" },
              { stat: "Your data", label: "We use your actual numbers, not a sandbox" },
              { stat: "Zero pressure", label: "If it's not a fit, we'll tell you" },
              { stat: "24 hr", label: "Most demos scheduled within one business day" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-lg font-bold text-gray-900 whitespace-nowrap">{item.stat}</span>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            See What You&apos;ve Been Missing
          </h2>
          <p className="body-xl mb-8 text-slate-300">
            30 minutes. Your data. Real insights. No pitch deck.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#demo-form" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 w-full sm:w-auto">
                Book Your Demo
              </Button>
            </Link>
            <a href={PRICING_URL}>
              <Button variant="outline-light" size="lg">
                View Pricing
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
