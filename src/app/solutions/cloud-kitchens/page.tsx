import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function CloudKitchensPage() {
  const challenges = [
    {
      title: "Multi-Brand Data Complexity",
      description: "Managing data across multiple virtual brands from a single kitchen location.",
      icon: "📊"
    },
    {
      title: "Delivery Performance Optimization",
      description: "Understanding delivery metrics and optimizing for multiple delivery platforms.",
      icon: "🚚"
    },
    {
      title: "Cost Allocation Across Brands",
      description: "Accurately tracking costs and profitability for each virtual brand.",
      icon: "💰"
    }
  ];

  const solutions = [
    {
      title: "Multi-Brand Intelligence",
      description: "Separate analytics and insights for each virtual brand operating from your kitchen.",
      icon: "🔍"
    },
    {
      title: "Delivery Platform Integration",
      description: "Unified view of performance across Uber Eats, DoorDash, Grubhub, and other platforms.",
      icon: "🔗"
    },
    {
      title: "Brand-Specific Benchmarking",
      description: "Compare each virtual brand's performance against similar concepts in your market.",
      icon: "📈"
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
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Decision Intelligence for Cloud Kitchens
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Optimize your virtual restaurant operations with AI-powered insights across all your brands and delivery platforms.
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cloud Kitchen-Specific Challenges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unique operational challenges that cloud kitchen operators face
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <Card key={index} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{challenge.icon}</div>
                  <CardTitle className="text-gray-900">{challenge.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {challenge.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How Sundae Supports Cloud Kitchens
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI-powered solutions designed specifically for virtual restaurant operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{solution.icon}</div>
                  <CardTitle className="text-gray-900">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {solution.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cloud Kitchen Intelligence Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to optimize your virtual restaurant operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  title: "Delivery Platform Analytics",
                  description: "Track performance across Uber Eats, DoorDash, Grubhub, and other platforms in one dashboard.",
                  icon: "📊"
                },
                {
                  title: "Virtual Brand Performance",
                  description: "Monitor KPIs for each brand concept operating from your kitchen with separate analytics.",
                  icon: "🏷️"
                },
                {
                  title: "Delivery Time Optimization",
                  description: "Analyze prep times, delivery times, and customer satisfaction to optimize operations.",
                  icon: "⏱️"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="text-2xl mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-2xl font-bold text-gray-900">Multi-Brand Performance</h3>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Scale Your Virtual Brands?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            See how Sundae can help you optimize your cloud kitchen operations 
            with data-driven insights across all your virtual brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="secondary" size="lg">
                Schedule Cloud Kitchen Demo
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
