import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function MultiLocationGroupsPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Fragmented Data Across Locations",
      description: "Each location uses different systems, making it impossible to see a unified view of performance.",
      icon: "benchmarking"
    },
    {
      title: "Inconsistent Performance",
      description: "Some locations thrive while others underperform, but you don't know why or how to replicate success.",
      icon: "decrease"
    },
    {
      title: "Slow Decision-Making",
      description: "By the time you collect and analyze data from all locations, the opportunity to act has passed.",
      icon: "time"
    },
    {
      title: "Labor & Cost Control Issues",
      description: "Labor costs and food waste vary wildly across locations with no clear visibility into the root causes.",
      icon: "finance"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Unified Real-Time Dashboard",
      description: "Sundae Core brings all your locations into one view. Pulse monitors every shift with adaptive targets, labor productivity (SPLH, CPLH), server performance, and leakage detection across every site.",
      product: "Sundae Core + Pulse",
      icon: "chart"
    },
    {
      title: "Competitive & Market Intelligence",
      description: "Watchtower tracks named competitors at each location, monitors local events and market trends, and delivers synthesized daily briefings — so you know what\u2019s happening inside and outside every site.",
      product: "Watchtower (Core tier)",
      icon: "watchtower"
    },
    {
      title: "Conversational Intelligence",
      description: "Ask Sundae \u2018Which locations are underperforming on labor cost?\u2019 or \u2018Where are competitors gaining ground?\u2019 and get instant answers combining internal performance with external market context.",
      product: "Sundae Intelligence",
      icon: "intelligence"
    },
    {
      title: "Benchmark Performance",
      description: "Sundae Report compares each location against your top performers and industry benchmarks, showing you exactly where to improve — with auto-generated analysis and recommendations.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "10-15% improvement in underperforming locations",
      description: "Identify and replicate best practices from your top sites.",
      icon: "growth"
    },
    {
      title: "5-8% reduction in labor costs",
      description: "Optimize staffing across all locations based on real demand patterns.",
      icon: "speed"
    },
    {
      title: "Faster decision-making",
      description: "Act on opportunities and issues in hours, not days or weeks.",
      icon: "performance"
    },
    {
      title: "Consistent operational excellence",
      description: "Standardize processes while adapting to local market conditions.",
      icon: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="Multi-Location Groups"
        title={<>Unify. Optimize.<br />Scale.</>}
        description="Every location. One platform. Real-time visibility and intelligent insights to replicate success everywhere."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See How Sundae Helps Multi-Location Groups
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline-light" size="lg">
              Start Free
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">The Problems You Know</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Fragmented data. Inconsistent performance. Slow decisions.
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
              One dashboard. Real-time insights. Portfolio-wide benchmarking.
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
              Lift underperformers. Reduce costs. Scale faster.
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
        title="Ready to Unify Your Portfolio?"
        description="See how multi-location groups replicate success everywhere."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book a Strategy Session
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
