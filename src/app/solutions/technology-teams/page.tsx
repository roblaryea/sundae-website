import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function TechnologyTeamsPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Integration Complexity",
      description: "Managing data pipelines from dozens of restaurant systems with different APIs and data formats.",
      icon: "integration"
    },
    {
      title: "Data Quality Issues",
      description: "Inconsistent data, missing fields, and reconciliation nightmares across POS, payroll, and inventory systems.",
      icon: "alerts"
    },
    {
      title: "Scalability Demands",
      description: "As the restaurant group grows, data infrastructure struggles to keep pace with increasing complexity.",
      icon: "performance"
    },
    {
      title: "Reporting Bottlenecks",
      description: "Every new report request means custom ETL work, taking time away from strategic initiatives.",
      icon: "time"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Pre-Built Integrations",
      description: "Sundae Scout connects to 25+ restaurant systems out of the box — POS, labor, inventory, CRM — with automatic data normalization.",
      product: "Sundae Scout",
      icon: "scout"
    },
    {
      title: "Automated Data Quality",
      description: "Sundae Pulse monitors data pipelines, flags anomalies, and alerts you to integration issues before they impact reporting.",
      product: "Sundae Pulse",
      icon: "pulse"
    },
    {
      title: "Operator-Facing Intelligence",
      description: "Sundae Core lets business operators query data directly with natural language — reducing IT reporting backlog by 75%.",
      product: "Sundae Core",
      icon: "intelligence"
    },
    {
      title: "API-First Architecture",
      description: "Sundae\u2019s RESTful API lets you build custom integrations, push data to your warehouse, or embed intelligence into existing tools.",
      product: "Sundae API",
      icon: "technology"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "80% less integration time",
      description: "Pre-built connectors eliminate months of custom integration work.",
      icon: "speed"
    },
    {
      title: "Eliminate reporting bottlenecks",
      description: "Operator-facing intelligence frees your team to focus on strategic projects.",
      icon: "growth"
    },
    {
      title: "Scale data infrastructure",
      description: "Auto-scaling architecture grows with your restaurant portfolio.",
      icon: "benchmarking"
    },
    {
      title: "Improve data quality",
      description: "Automated monitoring and validation ensure clean, reliable data.",
      icon: "success"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="Data & Technology Teams"
        title={<>Connect Once.<br />Access Everything.</>}
        description="Pre-built connectors. Automated data quality. Operator-facing intelligence. Stop plumbing data and start building value."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See Technical Architecture
            </Button>
          </Link>
          <Link href="/integrations">
            <Button variant="outline-light" size="lg">
              View Integrations
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">The Problems You Know</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Custom ETL. Data quality issues. Endless report requests.
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
              Scalable infrastructure that works out of the box.
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
              Less plumbing. More innovation.
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
        title="Ready to Simplify Your Stack?"
        description="See how technology teams eliminate integration complexity."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book a Technical Deep Dive
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
