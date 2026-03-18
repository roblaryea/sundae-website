'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";

export default function CareersPage() {
  const positions: { title: string; department: string; location: string; type: string; description: string; icon: SundaeIconName; color: string }[] = [
    {
      title: "Senior Software Engineer - AI/ML",
      department: "Engineering",
      location: "Dubai, UAE / Remote",
      type: "Full-time",
      description: "Build advanced AI models for restaurant decision intelligence. Work with large-scale data and machine learning algorithms.",
      icon: "intelligence",
      color: "bg-blue-600"
    },
    {
      title: "Product Manager - Restaurant Tech",
      department: "Product",
      location: "Toronto, Canada / Remote",
      type: "Full-time",
      description: "Define product strategy for our decision intelligence platform. Work closely with restaurant operators and engineering teams.",
      icon: "benchmarking",
      color: "bg-green-600"
    },
    {
      title: "Sales Executive - Enterprise",
      department: "Sales",
      location: "Multiple Locations",
      type: "Full-time",
      description: "Drive adoption of Sundae's decision intelligence platform among enterprise restaurant groups and hospitality companies.",
      icon: "owners",
      color: "bg-purple-600"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      description: "Help restaurant operators maximize value from Sundae's platform. Provide training, support, and strategic guidance.",
      icon: "success",
      color: "bg-orange-600"
    },
    {
      title: "Data Scientist - Restaurant Analytics",
      department: "Data Science",
      location: "Dubai, UAE / Remote",
      type: "Full-time",
      description: "Develop predictive models and anomaly detection systems for restaurant operations data.",
      icon: "growth",
      color: "bg-teal-600"
    },
    {
      title: "UX/UI Designer - SaaS Products",
      department: "Design",
      location: "Toronto, Canada / Remote",
      type: "Full-time",
      description: "Design intuitive interfaces for our decision intelligence platform. Create beautiful, user-friendly experiences for restaurant operators.",
      icon: "canvas",
      color: "bg-indigo-600"
    }
  ];

  const benefits: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Competitive Compensation",
      description: "Market-leading salaries plus equity in a fast-growing company.",
      icon: "finance"
    },
    {
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and locations.",
      icon: "multiLocation"
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health insurance and wellness stipends.",
      icon: "success"
    },
    {
      title: "Learning & Development",
      description: "Annual learning budget and access to the latest tools and technologies.",
      icon: "insights"
    },
    {
      title: "Global Team",
      description: "Work with talented people across Dubai, Toronto, and remote locations.",
      icon: "multiLocation"
    },
    {
      title: "Impact",
      description: "Help transform the restaurant industry with data-driven intelligence.",
      icon: "growth"
    }
  ];

  const values: { title: string; description: string; icon: SundaeIconName }[] = [
    {
      title: "Customer First",
      description: "We exist to help restaurant operators succeed with better decisions.",
      icon: "marketing"
    },
    {
      title: "Data-Driven",
      description: "We let data guide our decisions and help our customers do the same.",
      icon: "benchmarking"
    },
    {
      title: "Continuous Learning",
      description: "We constantly improve ourselves, our products, and our processes.",
      icon: "growth"
    },
    {
      title: "Global Perspective",
      description: "We think globally and build solutions that work across markets.",
      icon: "multiLocation"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        badge="Join Our Team"
        title="Build the Future of Decision Intelligence"
        description="We're a small, ambitious team solving one of the biggest problems in hospitality — fragmented data. Join us."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#open-positions">
            <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              View Open Positions
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline-light" size="lg">
              Learn About Our Product
            </Button>
          </Link>
        </div>
      </PageHero>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-slate-900 mb-4">
                Current Openings
              </h2>
              <p className="body-xl text-slate-600 max-w-3xl mx-auto">
                Help us transform the restaurant industry with data-driven intelligence
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {positions.map((position, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="hover:scale-105 transition-all duration-300 hover:shadow-lg group h-full">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${position.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        <SundaeIcon name={position.icon} size="lg" className="text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-600 font-medium uppercase tracking-wide">{position.department}</div>
                        <CardTitle className="text-slate-900 group-hover:text-blue-600 transition-colors duration-300">{position.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <span>{position.location}</span>
                      <span>•</span>
                      <span>{position.type}</span>
                    </div>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {position.description}
                    </CardDescription>
                    <Link href={`mailto:careers@sundae.io?subject=${encodeURIComponent(`Application for ${position.title}`)}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Apply Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-slate-900 mb-4">
                Why Join Sundae?
              </h2>
              <p className="body-xl text-slate-600 max-w-3xl mx-auto">
                We offer more than just a job — we offer a mission to transform an industry
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <Card variant="elevated" className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={benefit.icon} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-slate-900">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="section-h2 text-slate-900 mb-4">
                Our Values
              </h2>
              <p className="body-xl text-slate-600 max-w-3xl mx-auto">
                The principles that guide everything we do at Sundae
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card variant="elevated" className="text-center h-full">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <SundaeIcon name={value.icon} size="lg" className="text-white" />
                    </div>
                    <CardTitle className="text-slate-900">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <PageCTA
        title="Ready to Make an Impact?"
        description="Join us in building the future of restaurant decision intelligence. Help operators worldwide make smarter, more profitable decisions."
      >
        <Link href="mailto:careers@sundae.io">
          <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
            Send Your Resume
          </Button>
        </Link>
        <Link href="/demo">
          <Button variant="outline-light" size="lg">
            Learn About Our Product
          </Button>
        </Link>
      </PageCTA>
    </div>
  );
}
