import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function HospitalityOperatorsPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Complex Multi-Concept Operations",
      description: "Managing restaurants, bars, hotels, and catering under one roof with different metrics and KPIs for each.",
      icon: "multiLocation"
    },
    {
      title: "Seasonality & Demand Fluctuations",
      description: "Revenue swings based on tourism, events, and seasons make forecasting and staffing difficult.",
      icon: "benchmarking"
    },
    {
      title: "Guest Experience Consistency",
      description: "Maintaining service quality across multiple touchpoints — dining, room service, events, and more.",
      icon: "success"
    },
    {
      title: "Integrated F&B and Rooms Operations",
      description: "Coordinating between restaurant operations, banquets, and hotel services without unified visibility.",
      icon: "integration"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Unified Hospitality Dashboard",
      description: "Sundae Core consolidates F&B, rooms, events, and catering into one real-time view. Pulse monitors every shift with adaptive targets, labor productivity tracking, and server performance.",
      product: "Sundae Core + Pulse",
      icon: "chart"
    },
    {
      title: "Event & Calendar Intelligence",
      description: "Watchtower discovers local events, public holidays, and religious observances (Ramadan-aware for MENA operations) — with impact assessments including staffing and prep recommendations tailored to each property.",
      product: "Watchtower (Core tier)",
      icon: "watchtower"
    },
    {
      title: "Competitive & Market Context",
      description: "Track named competitors via Google Places, monitor rating trends, and get daily briefings that combine your internal performance with weather forecasts, competitor activity, and market signals.",
      product: "Watchtower (Core tier)",
      icon: "balance"
    },
    {
      title: "Hospitality Benchmarking",
      description: "Sundae Report compares your F&B and hospitality metrics against similar properties and market leaders — with auto-generated analysis and recommendations.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Better demand forecasting",
      description: "Predict high-demand periods and optimize staffing and inventory accordingly.",
      icon: "forecasting"
    },
    {
      title: "10-15% improvement in F&B margins",
      description: "Reduce waste and optimize pricing across restaurant, banquet, and room service.",
      icon: "finance"
    },
    {
      title: "Enhanced guest experience",
      description: "Ensure consistent service quality across all touchpoints with real-time visibility.",
      icon: "performance"
    },
    {
      title: "Unified multi-property view",
      description: "Manage multiple hotels or resorts from one intelligence platform.",
      icon: "multiLocation"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="Hospitality Operators"
        title={<>Every Touchpoint.<br />One Platform.</>}
        description="Restaurants, banquets, room service, catering — unified. Optimize every guest experience with one intelligence platform."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See How Sundae Helps Hospitality
            </Button>
          </Link>
          <a href={REPORT_APP_URL}>
            <Button variant="outline-light" size="lg">
              Get F&B Benchmark Report
            </Button>
          </a>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">The Problems You Know</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Multi-concept complexity. Seasonal swings. Disconnected systems.
            </p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={challenge.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-[var(--text-primary)] mb-2">{challenge.title}</CardTitle>
                        <CardDescription className="text-[var(--text-supporting)]">{challenge.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">How Sundae Changes That</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Unified F&B and rooms visibility. Demand-intelligent staffing.
            </p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {howSundaeHelps.map((item, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={item.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-[#60A5FA] font-semibold mb-1">{item.product}</div>
                        <CardTitle className="text-[var(--text-primary)] mb-2">{item.title}</CardTitle>
                        <CardDescription className="text-[var(--text-supporting)]">{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">What Changes</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Better forecasting. Higher margins. Consistent guest experience.
            </p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {outcomes.map((outcome, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <SundaeIcon name={outcome.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-[var(--text-primary)] mb-2">{outcome.title}</CardTitle>
                        <CardDescription className="text-[var(--text-supporting)]">{outcome.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <PageCTA
        title="Ready to Unify Your Operations?"
        description="See how hospitality groups optimize every guest touchpoint."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book a Hospitality Demo
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
