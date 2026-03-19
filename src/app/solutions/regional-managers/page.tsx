import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function RegionalManagersPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Limited Visibility Across Locations",
      description: "You're responsible for multiple sites but lack real-time visibility into what's happening at each one.",
      icon: "watchtower"
    },
    {
      title: "Firefighting Mode",
      description: "Spending more time reacting to problems than preventing them or driving strategic improvements.",
      icon: "alerts"
    },
    {
      title: "Inconsistent Performance",
      description: "Some locations excel while others lag, but you don't have clear data on why or how to fix it.",
      icon: "benchmarking"
    },
    {
      title: "Time-Consuming Site Visits",
      description: "Physical visits are the only way to understand what's really happening, leaving little time for strategy.",
      icon: "time"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Real-Time Regional Dashboard",
      description: "Sundae Core gives you a single view of all your locations — sales, labor, margins, and operations — updated in real time.",
      product: "Sundae Core",
      icon: "chart"
    },
    {
      title: "Proactive Alerts",
      description: "Sundae Core flags issues before they become problems, letting you intervene early and coach more effectively.",
      product: "Sundae Core",
      icon: "insights"
    },
    {
      title: "Instant Answers",
      description: "Ask Sundae \u2018Which locations are trending up this week?\u2019 or \u2018Where is labor variance highest?\u2019 and get immediate, numbers-backed answers.",
      product: "Sundae Intelligence",
      icon: "intelligence"
    },
    {
      title: "Performance Benchmarking",
      description: "Sundae Report shows how each location compares to your regional average and top performers, making coaching conversations specific and actionable.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Spend less time firefighting",
      description: "Catch issues early with automated alerts and focus on strategic improvement.",
      icon: "speed"
    },
    {
      title: "More effective site visits",
      description: "Arrive with numbers-backed insights and have more productive conversations with GMs.",
      icon: "marketing"
    },
    {
      title: "Lift underperforming locations faster",
      description: "Identify gaps quickly and replicate best practices across your region.",
      icon: "growth"
    },
    {
      title: "Better work-life balance",
      description: "Manage your region from anywhere with mobile access to all key metrics.",
      icon: "balance"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="Regional Managers"
        title={<>Every Location.<br />One View.</>}
        description="Real-time visibility. Proactive alerts. Numbers-backed coaching. Manage your region without living on the road."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See How Sundae Works for RMs
            </Button>
          </Link>
          <a href={REPORT_APP_URL}>
            <Button variant="outline-light" size="lg">
              Get Regional Benchmark Report
            </Button>
          </a>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">The Problems You Know</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Firefighting. Limited visibility. Too much travel.
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
              Clarity across every location. Alerts before problems escalate.
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
              Less firefighting. More impact.
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
        title="Ready to Manage Smarter?"
        description="See how regional managers get visibility across every location."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book a Regional Manager Demo
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
