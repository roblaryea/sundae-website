import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function MarketingTeamsPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Attribution Blind Spots",
      description: "Struggling to connect marketing spend to actual restaurant performance and revenue impact.",
      icon: "marketing"
    },
    {
      title: "Fragmented Campaign Data",
      description: "Marketing data lives in one system, sales data in another — making it impossible to see the full picture.",
      icon: "benchmarking"
    },
    {
      title: "Generic Insights",
      description: "National-level metrics don't reveal which locations are responding best to campaigns or why.",
      icon: "multiLocation"
    },
    {
      title: "Slow Response Times",
      description: "By the time you get performance data, the campaign window has already closed.",
      icon: "time"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Real-Time Campaign Attribution",
      description: "Sundae Core connects marketing spend to sales lift at every location — see which campaigns are driving revenue in real time.",
      product: "Sundae Core",
      icon: "performance"
    },
    {
      title: "Location-Level Insights",
      description: "Sundae Core shows which locations are responding to campaigns and which need different messaging or channels.",
      product: "Sundae Core",
      icon: "insights"
    },
    {
      title: "Ask Marketing Questions",
      description: "Ask Sundae 'Which locations had the best ROI from our last promo?' or 'What's the average check lift from loyalty members?' and get instant answers.",
      product: "Sundae Core",
      icon: "intelligence"
    },
    {
      title: "Benchmark Performance",
      description: "Sundae Report shows how your marketing-driven metrics compare to industry standards and top performers.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Optimize campaign spend",
      description: "Identify high-performing locations and channels to allocate budget more effectively.",
      icon: "finance"
    },
    {
      title: "Prove marketing ROI",
      description: "Connect campaigns directly to revenue impact with location-level attribution.",
      icon: "performance"
    },
    {
      title: "React faster to campaigns",
      description: "Real-time data lets you adjust campaigns mid-flight based on performance.",
      icon: "speed"
    },
    {
      title: "Personalize by location",
      description: "Understand which locations respond to different messages and offers.",
      icon: "chart"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="Marketing Teams"
        title={<>See What&apos;s Working.<br />Cut What&apos;s Not.</>}
        description="Connect campaigns to revenue. Get location-level attribution. Prove ROI with real data."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See Marketing Dashboard
            </Button>
          </Link>
          <a href={REPORT_APP_URL}>
            <Button variant="outline-light" size="lg">
              View Campaign Intelligence
            </Button>
          </a>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">The Problems You Know</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Attribution blind spots. Siloed data. Slow feedback loops.
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
              Real-time attribution and location-level performance.
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
              Smarter spend. Faster optimization. Provable ROI.
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
        title="Ready to Prove ROI?"
        description="See how marketing teams connect campaigns to revenue."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book a Marketing Team Demo
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
