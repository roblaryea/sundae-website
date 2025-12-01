import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function ForgePage() {
  const features = [
    {
      title: "Natural Language Queries",
      description: "Ask questions in plain English and get instant insights from your restaurant data",
      icon: "💬"
    },
    {
      title: "Contextual Understanding",
      description: "AI understands restaurant terminology and business context for accurate responses",
      icon: "🧠"
    },
    {
      title: "Multi-source Integration",
      description: "Pulls insights from all connected systems to provide comprehensive answers",
      icon: "🔗"
    },
    {
      title: "Actionable Recommendations",
      description: "Get specific, data-driven recommendations to improve performance",
      icon: "🎯"
    }
  ];

  const conversationExamples = [
    {
      question: "Why did sales drop at Location #5 last Tuesday?",
      response: "Sales dropped 18% due to: 1) 23% decrease in lunch traffic, 2) Kitchen equipment issue causing 15min delays, 3) Missing popular menu item. Recommend: review staffing, fix equipment, restock item.",
      context: "Historical data + real-time metrics"
    },
    {
      question: "How can I reduce labor costs without affecting service?",
      response: "Based on your patterns: 1) Reduce 2 servers during 2-4pm weekdays (saves $340/week), 2) Cross-train 3 staff for multiple roles, 3) Optimize break schedules. Projected savings: $1,200/month.",
      context: "Labor analytics + performance data"
    },
    {
      question: "Which menu items should I promote this weekend?",
      response: "Promote: 1) Margherita Pizza (73% profit margin, trending +32%), 2) Seasonal Salad (low waste, high satisfaction), 3) Craft Cocktails (45% margin, weather-dependent). Expected revenue boost: $2,100.",
      context: "Sales trends + inventory + weather"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>⚒️</span>
              <span>Conversational Insights</span>
            </div>
            <h1 className="hero-h1 text-gray-900 mb-6">
              Your AI.
              <br />
              <span className="text-green-600">Your Way.</span>
            </h1>
            <p className="body-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Forge builds custom AI models trained on your data. Forecasts, recommendations, and automations built specifically for how your business operates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/demo">
                <Button variant="primary" size="lg">
                  Try Forge Chat
                </Button>
              </Link>
              <Link href="/architecture">
                <Button variant="outline" size="lg">
                  View Architecture
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              AI That Knows Your Business
            </h2>
            <p className="body-xl text-gray-600 dark:text-slate-300">
              Custom models trained on your patterns, your locations, your operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-xl">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white">{feature.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conversation Examples Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              What Forge Can Build
            </h2>
            <p className="body-xl text-gray-600 dark:text-slate-300">
              Custom AI solutions for your specific challenges
            </p>
          </div>

          <div className="space-y-8">
            {conversationExamples.map((example, index) => (
              <Card key={index} variant="elevated">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        ?
                      </div>
                      <div className="flex-1 bg-blue-50 rounded-lg p-4">
                        <p className="text-gray-900 font-medium">{example.question}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        AI
                      </div>
                      <div className="flex-1 bg-green-50 rounded-lg p-4">
                        <p className="text-gray-900 dark:text-white">{example.response}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-600 dark:text-slate-300">
                      <span className="font-medium">Data sources:</span> {example.context}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-h2 text-gray-900 mb-4">
              Custom AI Use Cases
            </h2>
            <p className="body-xl text-gray-600 dark:text-slate-300">
              From demand forecasting to automated recommendations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                category: "Operations",
                questions: [
                  "Why is my labor cost higher this week?",
                  "Which shifts are most profitable?",
                  "What's causing service delays?",
                  "How can I reduce waste?"
                ]
              },
              {
                category: "Financial",
                questions: [
                  "What's my most profitable menu item?",
                  "Where am I losing money?",
                  "How can I increase average check?",
                  "What's my break-even point?"
                ]
              },
              {
                category: "Strategic",
                questions: [
                  "Should I open another location?",
                  "Which markets should I target?",
                  "What's my competition doing?",
                  "When should I expand hours?"
                ]
              }
            ].map((category, index) => (
              <Card key={index} variant="default">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.questions.map((question, questionIndex) => (
                      <li key={questionIndex} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                        <span className="text-gray-600 text-sm">{question}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-h2 text-gray-900 mb-6">
                Built for Your Needs
              </h2>
              <p className="body-xl text-gray-600 mb-8">
                Tell us the problem. We build the AI solution. Custom models that fit how your business actually works.
              </p>
              
              <div className="space-y-4">
                {[
                  { benefit: "No technical skills required", icon: "👍" },
                  { benefit: "Instant answers from all your data", icon: "⚡" },
                  { benefit: "Natural conversation interface", icon: "💬" },
                  { benefit: "Actionable recommendations", icon: "🎯" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      {item.icon}
                    </div>
                    <span className="text-gray-900 font-medium">{item.benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Forge Chat Interface</h3>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Try asking:</p>
                  <div className="space-y-2">
                    <div className="bg-blue-100 rounded p-2 text-sm">"Why did sales drop yesterday?"</div>
                    <div className="bg-blue-100 rounded p-2 text-sm">"How can I reduce labor costs?"</div>
                    <div className="bg-blue-100 rounded p-2 text-sm">"Which menu items are most profitable?"</div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Forge responds with:</p>
                  <div className="space-y-1 text-sm">
                    <div>• Data-driven insights</div>
                    <div>• Specific recommendations</div>
                    <div>• Actionable next steps</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Ready for Custom AI?
          </h2>
          <p className="body-xl mb-8 opacity-90">
            Tell us what you need. We'll build the AI to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button variant="primary" size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                Book Forge Demo
              </Button>
            </Link>
            <Link href="/product">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                View All Modules
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
