import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function DocumentationPage() {
  const sections: { title: string; description: string; icon: SundaeIconName; color: string; topics: string[] }[] = [
    {
      title: "Getting Started",
      description: "Learn how to onboard to Sundae and connect your data sources",
      icon: "growth",
      color: "bg-[#1C47FF]",
      topics: [
        "Creating your Sundae account",
        "Connecting your POS system",
        "Integrating payroll and HR data",
        "Linking budgets and forecasts",
        "Initial setup checklist"
      ]
    },
    {
      title: "Using Sundae Report",
      description: "Get the most out of free benchmarking and performance reports",
      icon: "benchmarking",
      color: "bg-green-600",
      topics: [
        "Uploading your data for benchmarking",
        "Understanding your benchmark report",
        "Comparing performance across locations",
        "Industry standards and peer groups",
        "Using insights to drive decisions"
      ]
    },
    {
      title: "Sundae Core Guide",
      description: "Master conversational business intelligence with natural language queries",
      icon: "intelligence",
      color: "bg-purple-600",
      topics: [
        "Asking questions in plain English",
        "Exploring dashboards and charts",
        "Creating custom views",
        "Saving and sharing insights",
        "Advanced query techniques"
      ]
    },
    {
      title: "Pulse & Watchtower",
      description: "Set up real-time alerts and external market intelligence",
      icon: "insights",
      color: "bg-orange-600",
      topics: [
        "Setting up proactive alerts",
        "Understanding anomaly detection",
        "Connecting external data (weather, events)",
        "Configuring notification preferences",
        "Acting on intelligent recommendations"
      ]
    },
    {
      title: "Insights & Dashboards",
      description: "Build and customize dashboards for every team",
      icon: "chart",
      color: "bg-indigo-600",
      topics: [
        "Creating custom dashboards",
        "Configuring widgets and KPIs",
        "Setting up role-based views",
        "Scheduling automated reports",
        "Sharing dashboards with teams"
      ]
    },
    {
      title: "Security & Data Privacy",
      description: "Understand how Sundae protects your data",
      icon: "owners",
      color: "bg-teal-600",
      topics: [
        "Data encryption and security standards",
        "User access controls and permissions",
        "GDPR and compliance",
        "Data retention policies",
        "Privacy best practices"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <PageHero
        badge="Documentation"
        title="Everything You Need to Know"
        description="Guides, API references, and best practices to help you get the most from Sundae."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/demo">
            <Button variant="cta" size="lg">
              Book a Demo
            </Button>
          </Link>
          <Link href="/report">
            <Button variant="outline-light" size="lg">
              Try Sundae Report (Free)
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Documentation Sections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center text-[var(--text-primary)] group-hover:scale-110 transition-transform duration-300`}>
                        <SundaeIcon name={section.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-[var(--text-primary)] group-hover:text-[#60A5FA] transition-colors duration-300">
                          {section.title}
                        </CardTitle>
                      </div>
                    </div>
                    <CardDescription className="text-[var(--text-supporting)] leading-relaxed mb-4">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Topics:</p>
                      <ul className="space-y-2">
                        {section.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-[var(--text-supporting)]">
                            <span className="text-[#60A5FA] mt-0.5">&rarr;</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
                Quick Start Guide
              </h2>
              <p className="text-xl text-[var(--text-supporting)] max-w-3xl mx-auto">
                Get up and running with Sundae in four simple steps
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {([
              {
                step: "1",
                title: "Connect Data Sources",
                description: "Link your POS, payroll, inventory, and budget systems to Sundae Scout",
                icon: "integration" as SundaeIconName
              },
              {
                step: "2",
                title: "Run Your First Benchmark",
                description: "Upload data to Sundae Report and see how you compare to similar restaurants",
                icon: "benchmarking" as SundaeIconName
              },
              {
                step: "3",
                title: "Ask Questions",
                description: "Use Sundae Core to query your data in plain English and get instant answers",
                icon: "intelligence" as SundaeIconName
              },
              {
                step: "4",
                title: "Set Up Alerts",
                description: "Configure Sundae Core to monitor key metrics and notify you of anomalies",
                icon: "warning" as SundaeIconName
              }
            ]).map((item, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="text-center h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <SundaeIcon name={item.icon} size="xl" className="text-white" />
                    </div>
                    <div className="text-3xl font-bold text-[#60A5FA] mb-4">Step {item.step}</div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{item.title}</h3>
                    <p className="text-[var(--text-supporting)] leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <div className="bg-[var(--surface-faint)] rounded-2xl p-12 border border-[var(--border-default)]">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center"><SundaeIcon name="warning" size="xl" className="text-white" /></div>
              <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
                More Documentation Coming Soon
              </h3>
              <p className="text-lg text-[var(--text-supporting)] mb-8">
                We&apos;re continuously expanding our documentation. Check back soon for API references, video tutorials, and advanced guides.
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                Questions in the meantime?{" "}
                <Link href="/contact" className="text-[#60A5FA] font-medium hover:underline">
                  Get in touch with our team &rarr;
                </Link>
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Support CTA Section */}
      <PageCTA
        title="Need Help?"
        description="Our team is here to help you get the most out of Sundae."
      >
        <Link href="/contact">
          <Button variant="cta" size="lg">
            Contact Support
          </Button>
        </Link>
        <Link href="/demo">
          <Button variant="outline-light" size="lg">
            Schedule Training
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
