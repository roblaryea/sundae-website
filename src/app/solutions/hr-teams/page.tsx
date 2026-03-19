import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function HRTeamsPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Workforce Blind Spots",
      description: "Labor data is trapped in payroll systems, making it impossible to connect staffing decisions to restaurant performance.",
      icon: "labor"
    },
    {
      title: "Turnover Crisis",
      description: "High turnover rates but no clear visibility into which locations or roles have the biggest retention issues.",
      icon: "decrease"
    },
    {
      title: "Scheduling Inefficiency",
      description: "Over-staffing hurts margins, under-staffing hurts service — but you lack real-time data to optimize the balance.",
      icon: "schedule"
    },
    {
      title: "Compliance & Risk",
      description: "Managing labor compliance across locations is manual and reactive rather than proactive.",
      icon: "balance"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Unified Workforce Dashboard",
      description: "Sundae Core connects labor, payroll, and performance data — see turnover, productivity, and labor costs by location in real time.",
      product: "Sundae Core",
      icon: "chart"
    },
    {
      title: "Proactive Turnover Alerts",
      description: "Sundae Core flags locations with rising turnover, overtime spikes, or compliance risks before they become crises.",
      product: "Sundae Core",
      icon: "alerts"
    },
    {
      title: "Ask HR Questions Instantly",
      description: "Ask Sundae \u2018Which locations have the highest turnover?\u2019 or \u2018What\u2019s the average tenure by role?\u2019 and get instant, numbers-backed answers.",
      product: "Sundae Intelligence",
      icon: "intelligence"
    },
    {
      title: "Labor Benchmarking",
      description: "Sundae Report shows how your labor metrics compare to industry standards — helping you set realistic goals and identify best practices.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Reduce turnover by 20%",
      description: "Identify retention issues early and implement targeted interventions.",
      icon: "decrease"
    },
    {
      title: "Optimize labor costs",
      description: "Balance staffing levels with demand to improve margins without sacrificing service.",
      icon: "finance"
    },
    {
      title: "Improve compliance",
      description: "Automated monitoring keeps you ahead of labor law changes and violations.",
      icon: "success"
    },
    {
      title: "Numbers-backed staffing",
      description: "Make hiring and scheduling decisions based on real performance data, not gut feel.",
      icon: "benchmarking"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="People & HR Teams"
        title={<>Know Your People.<br />Keep Your People.</>}
        description="Turnover alerts. Labor optimization. Workforce insights. See what's happening before it becomes a problem."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See Workforce Dashboard
            </Button>
          </Link>
          <a href={REPORT_APP_URL}>
            <Button variant="outline-light" size="lg">
              View Labor Benchmarks
            </Button>
          </a>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">The Problems You Know</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Turnover blind spots. Scheduling guesswork. Reactive management.
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
              Unified workforce data and proactive alerts.
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
              Lower turnover. Better staffing. Proactive retention.
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
        title="Ready to Reduce Turnover?"
        description="See how HR teams catch retention issues early."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book an HR Team Demo
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
