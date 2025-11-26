'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function CareersPage() {
  const positions = [
    {
      title: "Senior Software Engineer - AI/ML",
      department: "Engineering",
      location: "Dubai, UAE / Remote",
      type: "Full-time",
      description: "Build cutting-edge AI models for restaurant decision intelligence. Work with large-scale data and machine learning algorithms.",
      icon: "🤖",
      color: "bg-blue-600"
    },
    {
      title: "Product Manager - Restaurant Tech",
      department: "Product",
      location: "Toronto, Canada / Remote",
      type: "Full-time",
      description: "Define product strategy for our decision intelligence platform. Work closely with restaurant operators and engineering teams.",
      icon: "📊",
      color: "bg-green-600"
    },
    {
      title: "Sales Executive - Enterprise",
      department: "Sales",
      location: "Multiple Locations",
      type: "Full-time",
      description: "Drive adoption of Sundae's decision intelligence platform among enterprise restaurant groups and hospitality companies.",
      icon: "💼",
      color: "bg-purple-600"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description: "Help restaurant operators maximize value from Sundae's platform. Provide training, support, and strategic guidance.",
      icon: "🤝",
      color: "bg-orange-600"
    },
    {
      title: "Data Scientist - Restaurant Analytics",
      department: "Data Science",
      location: "Dubai, UAE / Remote",
      type: "Full-time",
      description: "Develop predictive models and anomaly detection systems for restaurant operations data.",
      icon: "📈",
      color: "bg-teal-600"
    },
    {
      title: "UX/UI Designer - SaaS Products",
      department: "Design",
      location: "Toronto, Canada / Remote",
      type: "Full-time",
      description: "Design intuitive interfaces for our decision intelligence platform. Create beautiful, user-friendly experiences for restaurant operators.",
      icon: "🎨",
      color: "bg-indigo-600"
    }
  ];

  const benefits = [
    {
      title: "Competitive Compensation",
      description: "Market-leading salaries plus equity in a fast-growing company.",
      icon: "💰"
    },
    {
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and locations.",
      icon: "🏠"
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness stipends.",
      icon: "❤️"
    },
    {
      title: "Learning & Development",
      description: "Annual learning budget and access to cutting-edge tools.",
      icon: "📚"
    },
    {
      title: "Global Team",
      description: "Work with talented people across Dubai, Toronto, and remote locations.",
      icon: "🌍"
    },
    {
      title: "Impact",
      description: "Help transform the restaurant industry with data-driven intelligence.",
      icon: "🚀"
    }
  ];

  const values = [
    {
      title: "Customer First",
      description: "We exist to help restaurant operators succeed with better decisions.",
      icon: "🎯"
    },
    {
      title: "Data-Driven",
      description: "We let data guide our decisions and help our customers do the same.",
      icon: "📊"
    },
    {
      title: "Continuous Learning",
      description: "We constantly improve ourselves, our products, and our processes.",
      icon: "📈"
    },
    {
      title: "Global Perspective",
      description: "We think globally and build solutions that work across markets.",
      icon: "🌐"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>🚀</span>
            <span>Join Our Team</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build the Future of Restaurant Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Join Sundae in creating the global decision intelligence platform for restaurants. 
            Help operators make smarter, more profitable decisions with AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#open-positions">
              <Button variant="primary" size="lg">
                View Open Positions
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg">
                Learn About Our Product
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Help us transform the restaurant industry with data-driven intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positions.map((position, index) => (
              <Card key={index} variant="elevated" className="hover:scale-105 transition-all duration-300 hover:shadow-lg group">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 ${position.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                      {position.icon}
                    </div>
                    <div>
                      <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">{position.department}</div>
                      <CardTitle className="text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{position.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{position.location}</span>
                    <span>•</span>
                    <span>{position.type}</span>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {position.description}
                  </CardDescription>
                  <Link href="mailto:careers@sundae.io?subject=Application for {position.title}">
                    <Button variant="outline" size="sm" className="w-full">
                      Apply Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Join Sundae?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer more than just a job — we offer a mission to transform an industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <CardTitle className="text-gray-900">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do at Sundae
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={value.title} variant="elevated" className="text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <CardTitle className="text-gray-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join us in building the future of restaurant decision intelligence. 
            Help operators worldwide make smarter, more profitable decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:careers@sundae.io">
              <Button variant="secondary" size="lg">
                Send Your Resume
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Learn About Our Product
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
