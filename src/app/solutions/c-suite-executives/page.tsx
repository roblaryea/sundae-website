import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function CSuiteExecutivesPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Decisions Made on Yesterday's Numbers",
      description: "Critical calls rely on stale data, leading to missed opportunities and reactive management.",
      icon: "benchmarking"
    },
    {
      title: "Disconnected Data Sources",
      description: "Finance, operations, and marketing data live in silos, making it impossible to see the complete picture.",
      icon: "integration"
    },
    {
      title: "No Forward-Looking Intelligence",
      description: "You can see what happened, but not what's about to happen or why it's happening.",
      icon: "forecasting"
    },
    {
      title: "Strategic vs. Operational Trade-off",
      description: "You're forced to choose between strategic thinking and operational firefighting — there's no time for both.",
      icon: "balance"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Executive Command Center",
      description: "Sundae Core delivers a real-time executive dashboard with KPIs that matter — revenue, margins, labor productivity, and performance across your entire portfolio. Pulse monitors every shift with adaptive targets and server performance.",
      product: "Sundae Core + Pulse",
      icon: "chart"
    },
    {
      title: "Competitive & Market Intelligence",
      description: "Watchtower tracks named competitors, monitors local events, and surfaces market trends — synthesized with your internal data into daily briefings so you know what\u2019s happening inside and outside your business.",
      product: "Watchtower (Core tier)",
      icon: "watchtower"
    },
    {
      title: "Instant Strategic Answers",
      description: "Ask Sundae \u2018What\u2019s driving margin compression?\u2019 or \u2018Which locations are losing to competitor promotions?\u2019 and get numbers-backed answers combining internal performance with external market context.",
      product: "Sundae Intelligence",
      icon: "intelligence"
    },
    {
      title: "Historical Benchmarking",
      description: "Sundae Report shows how you compare to industry leaders and identifies gaps in performance, efficiency, and growth — with credits for deeper analysis.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Make faster, numbers-backed decisions",
      description: "Move from monthly reviews to real-time intelligence, enabling agile strategic adjustments.",
      icon: "speed"
    },
    {
      title: "15-20% improvement in key metrics",
      description: "Optimize margins, reduce costs, and improve operational efficiency across the portfolio.",
      icon: "performance"
    },
    {
      title: "Reduce strategic risk",
      description: "Identify threats and opportunities early with predictive intelligence and market signals.",
      icon: "owners"
    },
    {
      title: "Unite your leadership team",
      description: "Give everyone access to the same real-time data and insights, aligning strategy and execution.",
      icon: "support"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="C-Suite Executives"
        title={<>Lead with Clarity.<br />Not Guesswork.</>}
        description="Real-time visibility. Predictive intelligence. One platform that unifies everything you need to make confident decisions at scale."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See How Sundae Works for Executives
            </Button>
          </Link>
          <a href={REPORT_APP_URL}>
            <Button variant="outline-light" size="lg">
              Get Executive Benchmark Report
            </Button>
          </a>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">The Problems You Know</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Silos, stale data, and reactive decision-making.
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
              Intelligence built for executive decision-making.
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
              Measurable impact on speed, visibility, and growth.
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
        title="Ready to Lead Smarter?"
        description="See how Sundae gives executives the clarity to make confident decisions."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book an Executive Briefing
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
