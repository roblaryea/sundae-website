import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";

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
      description: "Separate analytics and insights for each virtual brand operating from your kitchen.",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🏢</span>
            <span>Cloud Kitchen Solutions</span>
          </div>
          <h1 className="hero-h1 text-gray-900 mb-6">
            Multi-Brand.
            <br />
            <span className="text-gradient">One Kitchen.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            All your virtual brands. Every delivery platform. One intelligence layer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                See Cloud Kitchen Demo
              </Button>
            </Link>
            <Link href="/benchmarking">
              <Button variant="outline" size="lg">
                View Benchmarking
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              The Problems You Know
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Multi-brand complexity. Platform fragmentation. Cost allocation chaos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <Card key={index} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={challenge.icon} size="xl" className="text-white" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-slate-300">
                    {challenge.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              How Sundae Changes That
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Brand-level analytics. Platform-wide visibility. Clear P&L per concept.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <SundaeIcon name={solution.icon} size="xl" className="text-white" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-white">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-slate-300">
                    {solution.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              What Changes
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Faster decisions. Better delivery times. Higher margins per brand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  title: "Delivery Platform Analytics",
                  description: "Track performance across Uber Eats, DoorDash, Grubhub, and other platforms in one dashboard.",
                  icon: "canvas" as SundaeIconName
                },
                {
                  title: "Virtual Brand Performance",
                  description: "Monitor KPIs for each brand concept operating from your kitchen with separate analytics.",
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-slate-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <SundaeIcon name="growth" size="xl" className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Multi-Brand Performance</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Average Delivery Time</span>
                    <span className="text-lg font-bold text-green-600">↓ 15%</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Platform Rating</span>
                    <span className="text-lg font-bold text-blue-600">4.7★</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Cost per Delivery</span>
                    <span className="text-lg font-bold text-purple-600">↓ 12%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Ready to Scale Your Brands?
          </h2>
          <p className="body-xl mb-8 opacity-90">
            See how cloud kitchens optimize every brand from one dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="secondary" size="lg">
                Schedule Cloud Kitchen Demo
              </Button>
            </Link>
            <a href="https://pricing.sundae.io">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
