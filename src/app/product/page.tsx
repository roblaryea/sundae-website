import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function ProductPage() {
  const productModules = [
    {
      name: "Scout",
      description: "Integration specialist that connects all your systems",
      longDescription: "Scout seamlessly integrates with 10-25 disconnected restaurant systems including POS, HRIS, CRM, payroll, inventory, and market data sources. It creates a unified data layer that serves as the foundation for intelligent insights.",
      icon: "🔍",
      color: "bg-blue-500",
      features: [
        "POS System Integration",
        "HRIS & Payroll Connection", 
        "Inventory Management Sync",
        "CRM Data Unification",
        "Market Data Ingestion",
        "Real-time Data Pipeline"
      ]
    },
    {
      name: "Canvas", 
      description: "Visualization intelligence for data storytelling",
      longDescription: "Canvas transforms complex restaurant data into compelling visual stories. Create interactive dashboards, custom reports, and data visualizations that make insights accessible to every stakeholder.",
      icon: "🎨",
      color: "bg-purple-500",
      features: [
        "Interactive Dashboards",
        "Custom Report Builder",
        "Data Visualization Tools",
        "Real-time Analytics",
        "Mobile-responsive Design",
        "Export & Sharing Capabilities"
      ]
    },
    {
      name: "Pulse",
      description: "Anomaly detection for proactive insights",
      longDescription: "Pulse continuously monitors your restaurant operations and alerts you to anomalies before they become problems. From unusual sales patterns to staffing irregularities, Pulse keeps you ahead of issues.",
      icon: "📊",
      color: "bg-red-500",
      features: [
        "Automated Anomaly Detection",
        "Predictive Alerting System",
        "Performance Monitoring",
        "Cost Variance Analysis",
        "Staffing Optimization Alerts",
        "Sales Trend Analysis"
      ]
    },
    {
      name: "Forge",
      description: "Conversational insights through natural language",
      longDescription: "Forge brings the power of conversational AI to restaurant analytics. Ask questions in natural language and get instant insights, recommendations, and explanations about your business performance.",
      icon: "💬",
      color: "bg-green-500",
      features: [
        "Natural Language Queries",
        "AI-powered Recommendations",
        "Conversational Interface",
        "Contextual Insights",
        "Multi-language Support",
        "Voice-activated Analytics"
      ]
    },
    {
      name: "Watchtower",
      description: "External market intelligence monitoring",
      longDescription: "Watchtower monitors external market conditions, competitor activity, and industry trends that impact your restaurant. Stay informed about market shifts and opportunities before they affect your business.",
      icon: "🏰",
      color: "bg-yellow-500",
      features: [
        "Competitor Analysis",
        "Market Trend Monitoring",
        "Economic Impact Assessment",
        "Industry Benchmarking",
        "Consumer Behavior Insights",
        "Location Intelligence"
      ]
    },
    {
      name: "Sundae Report",
      description: "Real-time market benchmarking engine",
      longDescription: "Sundae Report provides anonymous, real-time benchmarking against similar restaurants in your market. Compare performance metrics, identify opportunities, and validate strategies with industry data.",
      icon: "📈",
      color: "bg-orange-500",
      features: [
        "Real-time Benchmarking",
        "Anonymous Peer Comparison",
        "Market Performance Metrics",
        "Category-specific Analysis",
        "Geographic Comparisons",
        "Trend Identification"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-cream via-white to-warm-sand">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="hero-h1 text-deep-slate mb-6">
            AI-Powered Restaurant Intelligence
          </h1>
          <p className="body-xl text-graphite mb-8 max-w-3xl mx-auto">
            Six specialized AI agents working together to deliver unprecedented 
            clarity and insights for your restaurant operations.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See Sundae in Action
            </Button>
          </Link>
        </div>
      </section>

      {/* Product Modules Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {productModules.map((module, index) => (
              <Card key={module.name} variant="elevated" className="overflow-hidden">
                <div className={`${module.color} p-6 text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{module.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold">{module.name}</h3>
                      <p className="opacity-90">{module.description}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-graphite mb-6">{module.longDescription}</p>
                  
                  <h4 className="font-semibold text-deep-slate mb-3">Key Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {module.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="text-accent-orange">✓</span>
                        <span className="text-graphite">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={`/product/${module.name.toLowerCase().replace(' ', '-')}`}>
                    <Button variant="outline" className="w-full">
                      Learn More About {module.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-slate to-graphite text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="section-h2 mb-8">
            Connect Everything. Understand Everything.
          </h2>
          <p className="body-xl mb-12 max-w-3xl mx-auto">
            Sundae integrates with your existing restaurant technology stack, 
            creating a unified intelligence layer above your current systems.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { name: "POS Systems", icon: "💳" },
              { name: "HRIS & Payroll", icon: "👥" },
              { name: "Inventory Mgmt", icon: "📦" },
              { name: "CRM Platforms", icon: "🎯" },
              { name: "Market Data", icon: "📊" },
              { name: "Scheduling", icon: "📅" },
              { name: "Accounting", icon: "💰" },
              { name: "Analytics", icon: "📈" }
            ].map((system) => (
              <div key={system.name} className="bg-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{system.icon}</div>
                <p className="font-medium">{system.name}</p>
              </div>
            ))}
          </div>
          
          <Link href="/architecture">
            <Button variant="secondary" size="lg">
              View Architecture
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 text-deep-slate mb-6">
            Experience the Full Sundae Platform
          </h2>
          <p className="body-xl text-graphite mb-8">
            See how all six AI agents work together to transform your restaurant operations. 
            Book a personalized demo with our team.
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg">
              Schedule Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
