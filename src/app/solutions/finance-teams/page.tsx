import Link from "next/link";
import { REPORT_APP_URL } from "@/lib/urls";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function FinanceTeamsPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Fragmented Data Sources",
      description: "Financial data scattered across multiple systems — POS, payroll, inventory — making it difficult to get a complete picture.",
      icon: "benchmarking"
    },
    {
      title: "Manual Data Compilation",
      description: "Hours spent pulling reports from different platforms and reconciling numbers in spreadsheets.",
      icon: "time"
    },
    {
      title: "Delayed Insights",
      description: "By the time you compile the data, it's already outdated — limiting your ability to make proactive decisions.",
      icon: "decrease"
    },
    {
      title: "Limited Forecasting Accuracy",
      description: "Without real-time data and predictive intelligence, forecasting remains guesswork rather than science.",
      icon: "forecasting"
    }
  ];

  const howSundaeHelps: { title: string; description: string; product: string; icon: SundaeIconName }[] = [
    {
      title: "Unified Financial Dashboard",
      description: "Sundae Core consolidates P&L, labor costs, COGS, and key financial metrics into one real-time view — no more spreadsheet juggling.",
      product: "Sundae Core",
      icon: "finance"
    },
    {
      title: "Automated Variance Analysis",
      description: "Sundae Core automatically flags budget variances, margin compression, and cost anomalies before they impact the bottom line.",
      product: "Sundae Core",
      icon: "search"
    },
    {
      title: "Instant Financial Queries",
      description: "Ask Sundae \u2018What\u2019s driving labor variance this month?\u2019 or \u2018Show me locations with declining margins\u2019 and get immediate answers.",
      product: "Sundae Intelligence",
      icon: "intelligence"
    },
    {
      title: "Benchmark-Driven Forecasting",
      description: "Sundae Report provides industry benchmarks and historical trends to build more accurate forecasts and budgets.",
      product: "Sundae Report",
      icon: "report"
    }
  ];

  const outcomes: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Automate report compilation",
      description: "Integrated data from 12 operational domains eliminates manual spreadsheet assembly and reconciliation.",
      icon: "speed"
    },
    {
      title: "Catch cost issues early",
      description: "Real-time alerts surface margin compression before it compounds.",
      icon: "marketing"
    },
    {
      title: "More accurate forecasts",
      description: "Predictive intelligence and benchmarks improve budget accuracy and planning.",
      icon: "benchmarking"
    },
    {
      title: "Better strategic focus",
      description: "Spend less time on data and more time on analysis and strategic planning.",
      icon: "growth"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="Finance & FP&A Teams"
        title={<>One Dashboard.<br />All Your Numbers.</>}
        description="P&L, labor, COGS — unified in real-time. Stop chasing spreadsheets. Start driving profitability."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See Financial Dashboard
            </Button>
          </Link>
          <a href={REPORT_APP_URL}>
            <Button variant="outline-light" size="lg">
              View Sample Financial Report
            </Button>
          </a>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">The Problems You Know</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Fragmented data. Manual reports. Delayed insights.
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
              Accuracy, speed, and one source of truth.
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
              Less time on data. More time on strategy.
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
        title="Ready to Unify Your Numbers?"
        description="See how finance teams eliminate manual reporting and drive profitability."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Book a Finance Team Demo
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
