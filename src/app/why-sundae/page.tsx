import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function WhySundaePage() {
  const differentiators = [
    {
      title: "Horizontal Workforce Intelligence + Vertical Hospitality Expertise",
      description: "Built by operators, for operators. Not generic HR software — industry-specific workforce intelligence.",
      icon: "🏨",
      color: "bg-blue-600"
    },
    {
      title: "Deep Learning & Certification Engine",
      description: "AI-driven SOP ingestion, auto-generated training programs, dynamic testing, and tiered certifications.",
      icon: "🎓",
      color: "bg-green-600"
    },
    {
      title: "Enterprise-ready MCP Connectors",
      description: "Unified data fabric with real-time dashboards. POS, HRIS, ERP, payroll, loyalty, procurement integrations.",
      icon: "🔌",
      color: "bg-purple-600"
    },
    {
      title: "Three-sided Ecosystem",
      description: "Restaurants run operations, crew builds verified career profiles, service providers access marketplace.",
      icon: "🌐",
      color: "bg-orange-600"
    },
    {
      title: "Proven with Global Brands",
      description: "35-brand groups, 500+ hotel restaurants, 125-location franchises, enterprise clients 25-150 units.",
      icon: "🌍",
      color: "bg-teal-600"
    }
  ];

  const problems = [
    {
      problem: "Fragmented Workforce Data",
      current: "Scheduling, payroll, hiring, training scattered across 5-10 different tools",
      solution: "Sundae unifies everything into one intelligent operating system",
      impact: "Single source of truth, 3x faster decision-making"
    },
    {
      problem: "High Turnover + Inconsistent Training",
      current: "Manual onboarding, paper-based training, no standardized skill progression",
      solution: "AI converts SOPs into interactive training with tiered certifications",
      impact: "35% reduction in turnover, 98% training compliance"
    },
    {
      problem: "Lack of Real-Time Insights",
      current: "Weekly reports, reactive management, no predictive workforce intelligence",
      solution: "Instant AI-driven insights guide daily operational decisions",
      impact: "Proactive workforce management, optimized labor costs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="hero-h1 text-gray-900 mb-6">
            Why Leading Restaurant Groups
            <br />
            <span className="text-blue-600">Choose Sundae</span>
          </h1>
          <p className="body-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            We're creating a new category: Workforce Intelligence & Decision OS for Hospitality. 
            Built by operators, for operators, with proven results across global brands.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See Why Sundae Works
            </Button>
          </Link>
        </div>
      </section>

      {/* Three Biggest Problems Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Hospitality's Three Biggest Workforce Problems
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              And how Sundae solves them with workforce intelligence
            </p>
          </div>

          <div className="space-y-12">
            {problems.map((item, index) => (
              <div key={item.problem} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className={`lg:col-span-1 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-3'}`}>
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-900 mb-3">{item.problem}</h3>
                    <p className="text-red-700 text-sm mb-4">{item.current}</p>
                    <div className="text-xs text-red-600 font-medium">CURRENT STATE</div>
                  </div>
                </div>
                
                <div className={`lg:col-span-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-2'}`}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                      →
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sundae Solution</h4>
                    <p className="text-gray-600 text-sm">{item.solution}</p>
                  </div>
                </div>
                
                <div className={`lg:col-span-1 ${index % 2 === 0 ? 'lg:order-3' : 'lg:order-1'}`}>
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Result</h3>
                    <p className="text-green-700 text-sm mb-4">{item.impact}</p>
                    <div className="text-xs text-green-600 font-medium">MEASURABLE IMPACT</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              What Makes Sundae Different
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Our unique competitive moat in workforce intelligence and hospitality technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => (
              <Card key={item.title} variant="elevated">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {item.icon}
                    </div>
                    <CardTitle className="text-gray-900 text-lg">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Category Creation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-h2 mb-8">
            Creating the Category: Workforce Intelligence & Decision OS
          </h2>
          <p className="body-xl mb-12 max-w-3xl mx-auto opacity-90">
            Just as Salesforce created CRM and ServiceNow created ITSM, Sundae is creating 
            Workforce Intelligence for hospitality and retail.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Old Way",
                items: ["Generic HR tools", "Scattered data", "Reactive management", "Manual processes"],
                icon: "⚠️"
              },
              {
                title: "The Shift",
                items: ["Industry-specific needs", "Unified intelligence", "Predictive insights", "Automated workflows"],
                icon: "🔄"
              },
              {
                title: "New Way (Sundae)",
                items: ["Workforce intelligence", "Real-time decisions", "Proactive management", "AI-powered operations"],
                icon: "🚀"
              }
            ].map((section, index) => (
              <div key={section.title} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  {section.icon}
                </div>
                <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="text-sm opacity-90">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Proven with Global Brands
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              Already in POC with leading restaurant groups and hospitality brands
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { metric: "35+", label: "Brand Groups", icon: "🏢" },
              { metric: "500+", label: "Hotel Restaurants", icon: "🏨" },
              { metric: "125+", label: "Location Franchises", icon: "🍽️" },
              { metric: "25-150", label: "Unit Range", icon: "📊" }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.metric}</div>
                <div className="text-2xl mb-2">{stat.icon}</div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Early Adopter Results</h3>
              <p className="text-gray-600">Average improvements across our POC clients</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { metric: "35%", label: "Turnover Reduction", trend: "↓" },
                { metric: "50%", label: "Faster Onboarding", trend: "↓" },
                { metric: "98%", label: "Training Compliance", trend: "↑" },
                { metric: "18%", label: "Labor Cost Savings", trend: "↓" }
              ].map((result, index) => (
                <div key={result.label} className="text-center bg-white rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600 mb-1">{result.metric}</div>
                  <div className="text-xs text-gray-600">{result.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Three-sided Ecosystem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Three-Sided Ecosystem
            </h2>
            <p className="body-xl text-gray-600 max-w-3xl mx-auto">
              How restaurants, crew, and service providers interact to create value for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Restaurants",
                description: "Run operations with unified workforce intelligence",
                benefits: ["Multi-location management", "Real-time insights", "Standardized training", "Reduced turnover"],
                icon: "🏢",
                color: "bg-blue-600"
              },
              {
                title: "Crew Members",
                description: "Build verified career profiles with skills and achievements",
                benefits: ["Career mobility", "Verified skills", "Professional development", "Industry recognition"],
                icon: "👥",
                color: "bg-green-600"
              },
              {
                title: "Service Providers",
                description: "Access marketplace and revenue share opportunities",
                benefits: ["Marketplace access", "Revenue sharing", "Verified partnerships", "Scale opportunities"],
                icon: "🤝",
                color: "bg-purple-600"
              }
            ].map((stakeholder, index) => (
              <Card key={stakeholder.title} variant="elevated">
                <CardHeader>
                  <div className="text-center">
                    <div className={`w-16 h-16 ${stakeholder.color} rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4`}>
                      {stakeholder.icon}
                    </div>
                    <CardTitle className="text-gray-900">{stakeholder.title}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {stakeholder.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stakeholder.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Join the Workforce Intelligence Revolution
          </h2>
          <p className="body-xl mb-8">
            Be part of the restaurants and hospitality brands already transforming 
            their workforce operations with Sundae.
          </p>
          <Link href="/demo">
            <Button variant="secondary" size="lg">
              See Why Sundae Works
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
