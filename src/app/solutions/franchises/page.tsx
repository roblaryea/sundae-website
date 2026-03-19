import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function FranchisesPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Franchisee Performance Variability",
      description: "Wide performance gaps between franchisees with no clear way to identify and address underperformance early.",
      icon: "benchmarking"
    },
    {
      title: "Brand Consistency Challenges",
      description: "Ensuring quality, service standards, and operational compliance across independently owned locations.",
      icon: "owners"
    },
    {
      title: "Data Fragmentation",
      description: "Each franchisee may use different systems, making network-wide insights nearly impossible.",
      icon: "integration"
    },
    {
      title: "Support & Training Gaps",
      description: "Identifying which franchisees need help and what kind of support will actually move the needle.",
      icon: "marketing"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Network-Wide Visibility",
      description: "Sundae Core unifies data from all franchisees into one dashboard, giving you real-time visibility into every location's performance.",
      product: "Sundae Core",
      icon: "chart"
    },
    {
      title: "Automated Performance Alerts",
      description: "Sundae Core flags underperforming franchisees and identifies the specific areas needing attention before issues escalate.",
      product: "Sundae Core",
      icon: "alerts"
    },
    {
      title: "Benchmarking & Best Practices",
      description: "Sundae Report shows each franchisee how they compare to network leaders, creating healthy competition and clear improvement targets.",
      product: "Sundae Report",
      icon: "report"
    },
    {
      title: "Conversational Support",
      description: "Ask Sundae 'Which franchisees have the highest labor variance?' and get instant answers to guide your support efforts.",
      product: "Sundae Core",
      icon: "intelligence"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "15-20% improvement in underperforming franchisees",
      description: "Identify issues early and provide targeted support to lift lagging locations.",
      icon: "growth"
    },
    {
      title: "Better franchisee relationships",
      description: "Use data to have constructive conversations and provide value-added support.",
      icon: "support"
    },
    {
      title: "Faster network growth",
      description: "Attract new franchisees by demonstrating your intelligence-backed support system.",
      icon: "speed"
    },
    {
      title: "Reduced brand risk",
      description: "Catch compliance and quality issues before they impact your reputation.",
      icon: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="Franchises"
        title={<>Your Network.<br />One Dashboard.</>}
        description="Visibility into every franchisee. Alerts before issues escalate. Intelligence-backed support that actually works."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See How Sundae Helps Franchises
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
              Performance gaps. Fragmented data. Support blind spots.
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
              Support, not micromanage. Data, not assumptions.
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
              Better franchisee relationships. Faster network growth.
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
        title="Ready to Support Your Network?"
        description="See how franchise brands drive consistency with data."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book a Franchise Demo
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
