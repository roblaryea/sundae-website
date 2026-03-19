import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { PRICING_URL } from "@/lib/links";

export default function CloudKitchensPage() {
  const challenges: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Multi-Brand Data Complexity",
      description: "Managing data across multiple virtual brands from a single kitchen location.",
      icon: "benchmarking"
    },
    {
      title: "Delivery Performance Optimization",
      description: "Understanding delivery metrics and optimizing for multiple delivery platforms.",
      icon: "speed"
    },
    {
      title: "Cost Allocation Across Brands",
      description: "Accurately tracking costs and profitability for each virtual brand.",
      icon: "finance"
    }
  ];

  const solutions: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Multi-Brand Intelligence",
      description: "Separate intelligence and insights for each virtual brand operating from your kitchen.",
      icon: "search"
    },
    {
      title: "Delivery Platform Integration",
      description: "Unified view of performance across Uber Eats, DoorDash, Grubhub, and other platforms.",
      icon: "integration"
    },
    {
      title: "Brand-Specific Benchmarking",
      description: "Compare each virtual brand's performance against similar concepts in your market.",
      icon: "report"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <PageHero
        badge="Cloud Kitchen Intelligence"
        title={<>Multi-Brand.<br />One Kitchen.</>}
        description="All your virtual brands. Every delivery platform. One intelligence layer."
      >
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See Cloud Kitchen Demo
            </Button>
          </Link>
          <Link href="/benchmarking">
            <Button variant="outline-light" size="lg">
              View Benchmarking
            </Button>
          </Link>
        </div>
      </PageHero>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">The Problems You Know</h2>
            <p className="body-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
              Multi-brand complexity. Platform fragmentation. Cost allocation chaos.
            </p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={challenge.icon} size="xl" className="text-white" />
                    </div>
                    <CardTitle className="text-[var(--text-primary)]">{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[var(--text-supporting)]">{challenge.description}</CardDescription>
                  </CardContent>
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
              Brand-level intelligence. Platform-wide visibility. Clear P&L per concept.
            </p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={solution.icon} size="xl" className="text-white" />
                    </div>
                    <CardTitle className="text-[var(--text-primary)]">{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[var(--text-supporting)]">{solution.description}</CardDescription>
                  </CardContent>
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
              Faster decisions. Better delivery times. Higher margins per brand.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div className="space-y-8">
                {[
                  {
                    title: "Delivery Platform Intelligence",
                    description: "Track performance across Uber Eats, DoorDash, Grubhub, and other platforms in one dashboard.",
                    icon: "chart" as SundaeIconName
                  },
                  {
                    title: "Virtual Brand Performance",
                    description: "Monitor KPIs for each brand concept operating from your kitchen with separate intelligence.",
                    icon: "owners" as SundaeIconName
                  },
                  {
                    title: "Delivery Time Optimization",
                    description: "Analyze prep times, delivery times, and customer satisfaction to optimize operations.",
                    icon: "time" as SundaeIconName
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <SundaeIcon name={feature.icon} size="md" className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                      <p className="text-[var(--text-supporting)]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-[var(--surface-faint)] rounded-2xl p-8 border border-[var(--border-default)]">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <SundaeIcon name="growth" size="xl" className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-primary)]">Multi-Brand Performance</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">Average Delivery Time</span>
                      <span className="text-lg font-bold text-green-500">↓ 15%</span>
                    </div>
                  </div>
                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">Platform Rating</span>
                      <span className="text-lg font-bold text-[#60A5FA]">4.7★</span>
                    </div>
                  </div>
                  <div className="bg-[var(--navy-deep)] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">Cost per Delivery</span>
                      <span className="text-lg font-bold text-purple-400">↓ 12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      <PageCTA
        title="Ready to Scale Your Brands?"
        description="See how cloud kitchens optimize every brand from one dashboard."
      >
        <Link href="/demo">
          <Button variant="primary" size="lg">
            Schedule Cloud Kitchen Demo
          </Button>
        </Link>
        <a href={PRICING_URL}>
          <Button variant="outline-light" size="lg">
            View Pricing
          </Button>
        </a>
      </PageCTA>
    </div>
  );
}
