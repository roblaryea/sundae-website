'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { motion } from "framer-motion";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { useCta } from "@/lib/cta";

export default function FAQPage() {
  const cta = useCta();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const faqCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: "growth" as SundaeIconName,
      faqs: [
        {
          title: "What is Sundae?",
          content: "Sundae is a Decision Intelligence platform for restaurants and hospitality operations. We turn scattered operational data into clear, actionable recommendations — telling you not just what happened, but what to do next."
        },
        {
          title: "How do I get started?",
          content: "You have three options:\n\n1. **Start Free** - Sign up for Report Lite (free forever) and upload your operational data to see instant benchmarking. No credit card required.\n\n2. **See Your Pricing** - Use our interactive pricing calculator at pricing.sundae.io to see exact pricing for your operation.\n\n3. **Book a Demo** - Schedule a 15-minute walkthrough with our team to see Sundae in action with your data."
        },
        {
          title: "Is there really a free tier?",
          content: "Yes! Report Lite is free forever. Upload your POS data and get instant benchmarking against 5 core metrics. Fair-use policy applies for reasonable operational usage."
        },
        {
          title: "What's the difference between Report and Core?",
          content: "**Report Tier** = Historical analysis (POS data)\n• Upload POS data daily, weekly, or monthly\n• Analyze what happened\n• Benchmark against peers\n• Perfect for single-location or proof of concept\n\n**Core Tier** = Real-time operations (POS + all systems)\n• 2-4 hour data refresh cycles\n• Integrates POS + Labor + Inventory + Marketing + Reservations\n• See what's happening now\n• Get predictive alerts\n• Perfect for multi-location operators\n\nKey difference: Report = POS only, Core = POS + other systems"
        },
        {
          title: "Do I need a long-term contract?",
          content: "No! Report and Core tiers are month-to-month. Cancel anytime without penalty. Enterprise tier typically involves annual agreements with custom terms."
        }
      ]
    },
    {
      id: "products-tiers",
      title: "Products & Tiers",
      icon: "data" as SundaeIconName,
      faqs: [
        {
          title: "What products does Sundae offer?",
          content: "**Three main products:**\n\n1. **Sundae Report** (Lite/Plus/Pro) - Historical analysis & benchmarking\n\n2. **Sundae Core** (Lite/Pro/Enterprise) - Real-time operations & predictive intelligence\n\n3. **Watchtower** (Competitive/Event/Market) - External market intelligence\n\n**Plus:**\n\n4. **Modules** (5 specialized options) - Labor, Inventory, Purchasing, Marketing, Reservations"
        },
        {
          title: "Which tier should I choose?",
          content: "**Start with Report Lite (Free) if:**\n• You're testing Sundae\n• You run 1-2 locations\n• Daily/weekly reports are sufficient\n\n**Upgrade to Report Plus/Pro if:**\n• You need AI-powered insights\n• Daily reports are sufficient (not real-time)\n\n**Choose Core Lite/Pro if:**\n• You have 10+ locations\n• You need operational speed (2-4 hour refresh)\n• Real-time budget tracking matters\n\n**Choose Enterprise if:**\n• You have 100+ locations\n• You need white-label or SSO\n• You require dedicated support"
        },
        {
          title: "Can I upgrade or downgrade tiers later?",
          content: "Yes! Move between tiers anytime. All historical data is preserved. No penalties for changing tiers."
        },
        {
          title: "What's the 4D Intelligence Model?",
          content: "Sundae's framework for decision intelligence:\n\n**1D: What Happened** - Your operational truth (sales, labor, costs)\n\n**2D: Plan vs Actual** - Budget vs actual, forecast vs actual\n\n**3D: Market Context** - Benchmarks, peers, competitors\n\n**4D: What's Next** - AI-powered predictions and recommendations\n\n**Report Tier:** Full (1D + 2D) + Limited (3D + 4D)\n**Core Tier:** All 4D Expanded"
        }
      ]
    },
    {
      id: "data-integration",
      title: "Data & Integration",
      icon: "integration" as SundaeIconName,
      faqs: [
        {
          title: "What data does Sundae need?",
          content: "**Minimum (Report Lite):**\n• POS sales data (CSV export)\n\n**For Core tier:**\n• POS system (API integration)\n• Labor/Workforce management system (optional)\n• Inventory system (optional)\n• Marketing platforms (optional)\n• Reservations system (optional)\n\nNote: Report tier analyzes POS data only. To integrate labor, inventory, marketing, or other systems, you need Core tier."
        },
        {
          title: "How do I get my data into Sundae?",
          content: "**Report Lite:** Upload CSV files manually\n\n**Report Plus:** Upload PDFs, Excel, screenshots — AI extracts data automatically. You review, fill missing values, and confirm before processing.\n\n**Report Pro & Core:** Full API integration — automated, zero manual work"
        },
        {
          title: "What POS systems do you integrate with?",
          content: "50+ integrations including Square, Toast, Lightspeed, Revel, NCR Aloha, Oracle Micros, Clover, TouchBistro, and many more. Don't see yours? Custom integrations available for Enterprise tier."
        },
        {
          title: "Can I use Sundae with multiple POS systems?",
          content: "**Core Lite:** Single POS system across all locations\n\n**Core Pro and Enterprise:** Yes! Different POS systems at different locations supported. We normalize the data for apples-to-apples comparison.\n\n**Report tier:** Manual CSV upload, so any POS system works"
        },
        {
          title: "How long does implementation take?",
          content: "**Report Lite:** Instant (upload CSV)\n**Report Plus/Pro:** 1-2 days (AI parsing setup)\n**Core Lite/Pro:** 1-2 weeks (API integration)\n**Enterprise:** 2-4 weeks (custom configuration)"
        },
        {
          title: "What happens to my data if I cancel?",
          content: "All historical data is preserved. You can export your data anytime. If you cancel and return later, your data is still there."
        }
      ]
    },
    {
      id: "modules",
      title: "Modules",
      icon: "network" as SundaeIconName,
      faqs: [
        {
          title: "What are modules?",
          content: "Specialized intelligence add-ons that work with any Report or Core tier:\n\n1. **Labor Intelligence** - Schedule optimization, overtime reduction\n2. **Inventory Intelligence** - Waste tracking, par levels\n3. **Purchasing Intelligence** - Vendor comparison, contract management\n4. **Marketing Intelligence** - Campaign ROI, CAC tracking\n5. **Reservations Intelligence** - Table optimization, no-show prediction"
        },
        {
          title: "Do I need modules?",
          content: "Modules are optional. Add them only if you want deep focus in specific operational areas. Many operators start with just their tier (Report or Core) and add modules later."
        },
        {
          title: "Can I use modules without Core?",
          content: "Yes! Modules work with both Report and Core tiers.\n\n• Report + Modules = Historical specialized intelligence\n• Core + Modules = Real-time specialized intelligence"
        },
        {
          title: "Can I add multiple modules?",
          content: "Yes! Mix and match all 5 modules based on your needs. No requirement to use them all."
        },
        {
          title: "Which modules should I choose?",
          content: "Start with your biggest pain point:\n\n• **High labor costs?** → Labor Intelligence\n• **Excessive waste?** → Inventory Intelligence\n• **No vendor leverage?** → Purchasing Intelligence\n• **Can't prove marketing ROI?** → Marketing Intelligence\n• **Reservation no-shows?** → Reservations Intelligence"
        },
        {
          title: "How does module pricing work?",
          content: "Each module has:\n• Organization license (covers first 5 locations)\n• Additional location pricing (beyond 5 locations)\n\nExample: 8 locations with Labor Intelligence = Org license + 3 additional locations\n\nVisit pricing.sundae.io for exact pricing."
        }
      ]
    },
    {
      id: "watchtower",
      title: "Watchtower",
      icon: "watchtower" as SundaeIconName,
      faqs: [
        {
          title: "What is Watchtower?",
          content: "External intelligence — visibility into what happens outside your four walls:\n\n1. **Competitive Intelligence** - Track up to 10 competitors per location\n2. **Event Intelligence** - Weather, holidays, local events\n3. **Market Intelligence** - Category trends, economic indicators"
        },
        {
          title: "Do I need Watchtower?",
          content: "Not required, but highly valuable if:\n• You operate in competitive markets\n• Competitor pricing impacts your business\n• Your demand is event/weather-driven\n• You're planning expansion or strategic moves"
        },
        {
          title: "How many competitors can I track?",
          content: "Up to 10 competitors per location. Each location can track different competitors.\n\nExample: 5 locations = 50 competitors tracked (10 per location)"
        },
        {
          title: "Can I use just one type of Watchtower?",
          content: "Yes! Choose:\n• Competitive Intelligence only\n• Event Intelligence only\n• Market Intelligence only\n• Or combine all three"
        },
        {
          title: "Does Watchtower work with Report tier?",
          content: "Yes! Watchtower works with both Report and Core tiers. Adds external context to your internal intelligence."
        }
      ]
    },
    {
      id: "pricing-billing",
      title: "Pricing & Billing",
      icon: "cost" as SundaeIconName,
      faqs: [
        {
          title: "How much does Sundae cost?",
          content: "Pricing depends on:\n• Which tier (Report or Core)\n• How many locations\n• Which modules (if any)\n• Watchtower (if added)\n\n**Report Lite:** FREE forever\n\nUse our interactive pricing calculator at pricing.sundae.io to see exact pricing for your specific setup."
        },
        {
          title: "Are there setup fees?",
          content: "No! Unlike many analytics platforms (which charge $350+ per location per module), Sundae includes all onboarding and integration in your subscription."
        },
        {
          title: "What currencies do you accept?",
          content: "All major currencies supported. Billing automatically converts to your preferred currency."
        },
        {
          title: "Can I get a discount for annual commitment?",
          content: "Yes! Annual prepayment typically offers 12-15% savings vs month-to-month. See pricing.sundae.io for details."
        },
        {
          title: "What payment methods do you accept?",
          content: "• Credit card (Visa, Mastercard, Amex)\n• ACH/Bank transfer\n• Wire transfer (Enterprise)\n• Purchase orders (Enterprise with approved credit)"
        }
      ]
    },
    {
      id: "features",
      title: "Features & Capabilities",
      icon: "speed" as SundaeIconName,
      faqs: [
        {
          title: "What's AI credit allocation?",
          content: "AI credits power intelligent queries and recommendations:\n\n**Report Lite:** 40 base + 8 per location\n**Report Plus:** 150 base + 30 per location (25% rollover)\n**Report Pro:** 400 base + 80 per location (25% rollover)\n**Core Lite:** 600 base + 120 per location (50% rollover)\n**Core Pro:** 1,200 base + 240 per location (50% rollover)\n**Enterprise:** Unlimited"
        },
        {
          title: "What's data retention?",
          content: "How far back you can analyze:\n\n**Report Lite:** 90 days\n**Report Plus:** 1 year (upgrade available)\n**Report Pro:** 2 years (upgrade available)\n**Core Lite:** 2 years (upgrade available)\n**Core Pro:** 3 years (upgrade available)\n**Enterprise:** Custom (typically 5+ years)"
        },
        {
          title: "What's data refresh frequency?",
          content: "**Report Lite:** Manual upload only\n**Report Plus:** Manual or AI-parsed (on-demand)\n**Report Pro:** Daily automated\n**Core Lite:** 4-hour cycles (6x daily)\n**Core Pro:** 2-hour cycles (12x daily)\n**Enterprise:** Custom (real-time available)"
        },
        {
          title: "Do I get custom dashboards?",
          content: "**Report Tiers:** Pre-built dashboards only\n**Core Lite:** 30 custom dashboards\n**Core Pro:** 75 custom dashboards\n**Enterprise:** Unlimited custom dashboards"
        }
      ]
    },
    {
      id: "support",
      title: "Support & Training",
      icon: "conversation" as SundaeIconName,
      faqs: [
        {
          title: "What support do I get?",
          content: "**Report Lite:** Email support (72-hour response)\n**Report Plus:** Email + Chat (24-hour response)\n**Report Pro:** Email + Chat + Priority (12-hour response)\n**Core Lite:** Email + Chat + Phone (4-hour response)\n**Core Pro:** Priority phone (2-hour response)\n**Enterprise:** 24/7 support + Dedicated CSM (15-min critical response)"
        },
        {
          title: "Do you provide training?",
          content: "Yes! Training included with all tiers:\n\n**Report:** Self-service onboarding + documentation\n**Core Lite:** 3 × 1-hour training sessions\n**Core Pro:** Custom training program\n**Enterprise:** Comprehensive onboarding (2-4 weeks)"
        },
        {
          title: "What timezones do you support?",
          content: "Global support across all major timezones. Support hours adjust to your location."
        }
      ]
    },
    {
      id: "security",
      title: "Security & Compliance",
      icon: "quality" as SundaeIconName,
      faqs: [
        {
          title: "Is my data secure?",
          content: "Yes. Enterprise-grade security:\n• AES-256 encryption (data at rest)\n• TLS 1.3 encryption (data in transit)\n• SOC 2 Type II compliant (Enterprise)\n• GDPR compliant\n• Regular security audits\n• Role-based access controls"
        },
        {
          title: "Can I control who sees what data?",
          content: "Yes! User role management:\n• Admin (full access)\n• Manager (location-level access)\n• Viewer (read-only access)\n• Custom roles (Enterprise)"
        },
        {
          title: "Do you offer SSO?",
          content: "Yes! SSO/SAML integration available for Enterprise tier."
        }
      ]
    },
    {
      id: "enterprise",
      title: "Enterprise",
      icon: "franchise" as SundaeIconName,
      faqs: [
        {
          title: "What makes Enterprise different?",
          content: "Enterprise adds:\n• 100+ locations OR enterprise features regardless of scale\n• White-label capabilities\n• Dedicated Customer Success Manager\n• 24/7 support with contractual SLAs\n• SSO/SAML integration\n• Security & compliance pack\n• Custom ML models\n• Unlimited AI credits\n• Custom retention (5+ years)"
        },
        {
          title: "Do I need 100+ locations for Enterprise?",
          content: "No! Enterprise is also for organizations requiring SSO, white-label, contractual SLAs, or security/compliance needs. Size doesn't matter if enterprise features are required."
        },
        {
          title: "How do I get Enterprise pricing?",
          content: "Enterprise pricing is scope-based (features, scale, security, support). Contact our sales team for a custom quote."
        }
      ]
    },
    {
      id: "comparisons",
      title: "Comparison Questions",
      icon: "balance" as SundaeIconName,
      faqs: [
        {
          title: "How is Sundae different from my POS reports?",
          content: "**POS reports:** Show only POS data, no benchmarking, no AI, manual analysis\n\n**Sundae Report:** POS data with AI insights, peer benchmarks, recommendations, predictive patterns\n\n**Sundae Core:** Everything in Report PLUS unifies all systems (POS + labor + inventory + marketing), real-time refresh, advanced integrations"
        },
        {
          title: "How is Sundae different from Excel?",
          content: "**Excel:** Manual data entry, static analysis, no benchmarking, no AI, time-intensive\n\n**Sundae:** Automated data collection, dynamic intelligence, peer benchmarking, AI recommendations, saves 10-15 hours/week"
        },
        {
          title: "How much can I save vs other platforms?",
          content: "Operators typically report 40-70% cost savings compared to legacy analytics platforms, while gaining superior AI capabilities.\n\nWhy Sundae costs less: Tier-based pricing (not per-module per-location), no setup fees, transparent pricing, efficient architecture."
        }
      ]
    },
    {
      id: "use-cases",
      title: "Specific Use Cases",
      icon: "target" as SundaeIconName,
      faqs: [
        {
          title: "I only have one location. Is Sundae for me?",
          content: "Yes! Start with Report Lite (free). If you want AI insights, upgrade to Report Plus/Pro. Core tier works great for sophisticated single-location operators too."
        },
        {
          title: "I'm a franchise platform. Can Sundae help?",
          content: "Yes! Enterprise tier supports:\n• Franchisor visibility across all franchisees\n• Individual franchisee access to their data\n• White-label reporting for franchisees\n• Benchmarking across franchise system\n• Territory analysis for expansion"
        },
        {
          title: "I run cloud kitchens. Does Sundae work for delivery-first?",
          content: "Absolutely! Sundae integrates with delivery platforms and provides specialized intelligence for delivery platform performance, virtual brand analytics, marketing attribution, and labor optimization."
        },
        {
          title: "We're planning to expand. Can Sundae help?",
          content: "Yes! Market Intelligence (Watchtower) provides market saturation analysis, underserved territory identification, competitor expansion patterns, trade area analysis, and strategic expansion recommendations."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50/80 via-purple-50/30 to-blue-50/60">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <SundaeIcon name="conversation" size="sm" />
              <span>Frequently Asked Questions</span>
            </div>
            <h1 className="hero-h1 text-gray-900 mb-6">
              Everything You Need to Know
            </h1>
            <p className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Find answers to common questions about Sundae, our products, pricing, and how we help restaurants make better decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-sm text-gray-600 mb-4">Jump to category:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  const element = document.getElementById(category.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <SundaeIcon name={category.icon} size="sm" />
                <span>{category.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {faqCategories.map((category, index) => (
            <motion.div
              key={category.id}
              id={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-100px" }}
              className="scroll-mt-24"
            >
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={category.icon} size="lg" className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </div>
              <Accordion items={category.faqs} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Still Have Questions?
          </h2>
          <p className="body-xl mb-8 opacity-90">
            Our team is here to help. Book a demo, contact sales, or start free.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => cta("/report", "start_free_from_faq", { page: "/faq" })}
            >
              Start Free →
            </Button>
            <a href="https://pricing.sundae.io" target="_blank" rel="noopener noreferrer" className="block">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full border-white text-white hover:bg-white/10"
              >
                See Pricing →
              </Button>
            </a>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => cta("/demo", "book_demo_from_faq", { page: "/faq" })}
            >
              Book Demo →
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => cta("/contact", "contact_from_faq", { page: "/faq" })}
            >
              Contact Us →
            </Button>
          </div>
          <p className="text-sm opacity-80 mt-6">
            Or email us at: <a href="mailto:support@sundae.io" className="underline">support@sundae.io</a>
          </p>
        </div>
      </section>
    </div>
  );
}
