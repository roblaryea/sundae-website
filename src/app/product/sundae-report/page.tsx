import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

export default function SundaeReportPage() {
  const benchmarkCategories: { name: string; metrics: string[]; icon: SundaeIconName; color: string }[] = [
    {
      name: "Sales Performance",
      metrics: ["Revenue per Square Foot", "Average Check Size", "Daily Transaction Count", "Peak Hour Analysis"],
      icon: "finance",
      color: "bg-green-500"
    },
    {
      name: "Labor Efficiency",
      metrics: ["Labor Cost %", "Sales per Labor Hour", "Staff Productivity", "Overtime Trends"],
      icon: "labor",
      color: "bg-blue-500"
    },
    {
      name: "Food Cost Management",
      metrics: ["Food Cost %", "Waste Percentage", "Inventory Turnover", "COGS Analysis"],
      icon: "decrease",
      color: "bg-orange-500"
    },
    {
      name: "Operational Metrics",
      metrics: ["Table Turn Time", "Order Accuracy", "Customer Satisfaction", "Speed of Service"],
      icon: "speed",
      color: "bg-purple-500"
    }
  ];

  const howItWorks: { step: number; title: string; description: string; icon: SundaeIconName }[] = [
    {
      step: 1,
      title: "Upload Your Data",
      description: "Securely connect your POS system or upload sales, labor, and cost data",
      icon: "benchmarking"
    },
    {
      step: 2,
      title: "AI Analysis",
      description: "Our algorithms compare your performance against similar restaurants",
      icon: "intelligence"
    },
    {
      step: 3,
      title: "Get Insights",
      description: "Receive actionable recommendations to improve your key metrics",
      icon: "insights"
    }
  ];

  const sampleInsights = [
    {
      category: "Labor Cost Alert",
      insight: "Your labor cost is 8% above similar restaurants",
      recommendation: "Consider optimizing staff scheduling during 2-4 PM",
      impact: "Potential savings: $2,400/month"
    },
    {
      category: "Sales Opportunity",
      insight: "Weekday lunch revenue 15% below market average",
      recommendation: "Target lunch promotions for office workers nearby",
      impact: "Potential increase: $1,800/month"
    },
    {
      category: "Food Cost Variance",
      insight: "Food waste 3.2% higher than benchmark",
      recommendation: "Implement portion control training",
      impact: "Potential savings: $950/month"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>📈</span>
            <span>Free Restaurant Benchmarking</span>
          </div>
          <h1 className="hero-h1 text-gray-900 mb-6">
            Sundae Report
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Get a free benchmarking report comparing your restaurant's performance against industry standards. 
            See exactly where you stand and what to improve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                Generate Free Report
              </Button>
            </Link>
            <Link href="/product">
              <Button variant="outline" size="lg">
                Learn About Sundae Core
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benchmark Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              See How You Compare
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Benchmark your restaurant across key performance categories against similar businesses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benchmarkCategories.map((category, index) => (
              <Card key={category.name} variant="elevated" className="hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-white`}>
                      <SundaeIcon name={category.icon} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white">{category.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.metrics.map((metric, metricIndex) => (
                      <li key={metricIndex} className="text-sm text-gray-600 flex items-center">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2"></div>
                        {metric}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Get your free benchmarking report in minutes, not days
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <Card key={step.step} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-deep-blue rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <SundaeIcon name={step.icon} size="xl" className="text-white" />
                  </div>
                  <div className="text-sm text-blue-600 font-medium mb-2">Step {step.step}</div>
                  <CardTitle className="text-gray-900 dark:text-white">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-slate-300">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Insights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Sample Insights You'll Get
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Real examples of actionable insights from our benchmarking reports
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {sampleInsights.map((insight, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-warning rounded-full"></div>
                    <CardTitle className="text-gray-900 text-lg">{insight.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">What we found:</div>
                      <p className="text-gray-600 dark:text-slate-300">{insight.insight}</p>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-1">Recommendation:</div>
                      <p className="text-gray-600 dark:text-slate-300">{insight.recommendation}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-sm font-medium text-green-700 mb-1">Potential Impact:</div>
                      <p className="text-green-600 font-medium">{insight.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Free? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Why Free?
          </h2>
          <p className="body-xl mb-8 opacity-90">
            We believe every restaurant should understand how they're performing. Our free report gives you 
            a taste of the decision intelligence that powers Sundae Core.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                <SundaeIcon name="marketing" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold mb-2">Identify Opportunities</h3>
              <p className="text-sm opacity-90">Spot areas where you can improve immediately</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                <SundaeIcon name="benchmarking" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold mb-2">Benchmark Performance</h3>
              <p className="text-sm opacity-90">See how you stack up against similar restaurants</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-lg flex items-center justify-center">
                <SundaeIcon name="insights" size="lg" className="text-white" />
              </div>
              <h3 className="font-semibold mb-2">Get Actionable Insights</h3>
              <p className="text-sm opacity-90">Receive specific recommendations to improve</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-gray-900 mb-6">
            Ready to See Your Benchmarks?
          </h2>
          <p className="body-xl text-gray-600 mb-8">
            Join thousands of restaurant operators who use Sundae Report to understand their performance. 
            No credit card required, no obligations — just insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                Generate Free Report
              </Button>
            </Link>
            <a href="https://pricing.sundae.io">
              <Button variant="outline" size="lg">
                View Full Pricing
              </Button>
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Takes less than 5 minutes • Secure data handling • Results in your inbox
          </p>
        </div>
      </section>
    </div>
  );
}
