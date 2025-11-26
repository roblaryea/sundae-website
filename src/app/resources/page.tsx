'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function ResourcesPage() {
  const resources = [
    {
      category: "Decision Intelligence",
      title: "The Complete Guide to Restaurant Decision Intelligence",
      description: "Learn how AI-powered insights can transform your restaurant operations and drive profitability.",
      icon: "📊",
      color: "bg-blue-600"
    },
    {
      category: "Benchmarking",
      title: "2024 Restaurant Industry Benchmarks Report",
      description: "Access the latest performance metrics and benchmarks across different restaurant segments.",
      icon: "📈",
      color: "bg-green-600"
    },
    {
      category: "Best Practices",
      title: "5 Ways to Reduce Labor Costs Without Sacrificing Service",
      description: "Practical strategies for optimizing your labor efficiency while maintaining quality.",
      icon: "⚡",
      color: "bg-orange-600"
    },
    {
      category: "Technology",
      title: "Choosing the Right Restaurant Tech Stack",
      description: "A comprehensive guide to selecting and integrating restaurant technology solutions.",
      icon: "🔧",
      color: "bg-purple-600"
    },
    {
      category: "Operations",
      title: "The Ultimate Restaurant Operations Checklist",
      description: "Essential daily, weekly, and monthly tasks to keep your restaurant running smoothly.",
      icon: "✅",
      color: "bg-teal-600"
    },
    {
      category: "Industry Trends",
      title: "2025 Restaurant Industry Predictions",
      description: "Key trends and innovations that will shape the restaurant industry in the coming year.",
      icon: "🔮",
      color: "bg-indigo-600"
    }
  ];

  const tools = [
    {
      name: "Restaurant ROI Calculator",
      description: "Calculate the potential return on investment from implementing decision intelligence.",
      icon: "🧮",
      link: "/tools/roi-calculator"
    },
    {
      name: "Labor Cost Analyzer",
      description: "Analyze your labor costs and identify optimization opportunities.",
      icon: "👥",
      link: "/tools/labor-analyzer"
    },
    {
      name: "Menu Engineering Tool",
      description: "Optimize your menu for maximum profitability and customer satisfaction.",
      icon: "🍽️",
      link: "/tools/menu-engineering"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>📚</span>
            <span>Resources & Tools</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Restaurant Intelligence Resources
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Access guides, reports, and tools to help you make smarter decisions for your restaurant business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                Get Started with Sundae
              </Button>
            </Link>
            <Link href="/benchmarking">
              <Button variant="outline" size="lg">
                Free Benchmark Report
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Guides & Reports Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Guides & Reports
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights and industry research to help you stay ahead
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card key={index} variant="elevated" className="hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${resource.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                      {resource.icon}
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">{resource.category}</div>
                      <CardTitle className="text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{resource.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {resource.description}
                  </CardDescription>
                  <Link href={`/resources/${resource.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button variant="ghost" size="sm" className="group-hover:text-blue-600 transition-colors duration-300">
                      Read More →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Free Tools & Calculators
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interactive tools to help you analyze and optimize your restaurant operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card key={index} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <CardTitle className="text-gray-900">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600">
                    {tool.description}
                  </CardDescription>
                  <Link href={tool.link}>
                    <Button variant="outline" size="sm" className="w-full">
                      Use Tool
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stay Updated
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest restaurant industry insights, benchmarks, and decision intelligence trends delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
            <p className="text-xs opacity-75 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of restaurant operators who use Sundae to make smarter, data-driven decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg">
                Book a Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
