'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function BenchmarkReadinessPage() {
  const [responses, setResponses] = useState({
    dataQuality: '',
    systemIntegration: '',
    reporting: '',
    kpiTracking: '',
    teamAlignment: ''
  });
  const [result, setResult] = useState<{ score: number; level: string; recommendations: string[] } | null>(null);

  const questions = [
    {
      id: 'dataQuality',
      question: 'How would you rate your current data quality and accuracy?',
      options: [
        { value: '1', label: 'Poor - Inconsistent or unreliable data' },
        { value: '2', label: 'Fair - Some data gaps or accuracy issues' },
        { value: '3', label: 'Good - Mostly accurate and reliable' },
        { value: '4', label: 'Excellent - Highly accurate and validated' }
      ]
    },
    {
      id: 'systemIntegration',
      question: 'How well integrated are your operational systems (POS, payroll, inventory)?',
      options: [
        { value: '1', label: 'Not integrated - Manual data transfer' },
        { value: '2', label: 'Partially integrated - Some automation' },
        { value: '3', label: 'Well integrated - Mostly automated' },
        { value: '4', label: 'Fully integrated - Real-time data sync' }
      ]
    },
    {
      id: 'reporting',
      question: 'How timely and comprehensive is your current reporting?',
      options: [
        { value: '1', label: 'Monthly reports only' },
        { value: '2', label: 'Weekly reports available' },
        { value: '3', label: 'Daily reports with key metrics' },
        { value: '4', label: 'Real-time dashboards and alerts' }
      ]
    },
    {
      id: 'kpiTracking',
      question: 'Do you actively track and compare KPIs across locations?',
      options: [
        { value: '1', label: 'No - Limited KPI tracking' },
        { value: '2', label: 'Basic - Some metrics tracked' },
        { value: '3', label: 'Advanced - Multiple KPIs compared' },
        { value: '4', label: 'Comprehensive - Full benchmarking suite' }
      ]
    },
    {
      id: 'teamAlignment',
      question: 'How aligned is your team on data-driven decision making?',
      options: [
        { value: '1', label: 'Limited - Decisions based on intuition' },
        { value: '2', label: 'Developing - Some data consideration' },
        { value: '3', label: 'Strong - Data informs most decisions' },
        { value: '4', label: 'Excellent - Data-driven culture' }
      ]
    }
  ];

  const calculate = () => {
    const values = Object.values(responses).map(v => parseInt(v));
    if (values.some(v => isNaN(v))) {
      alert('Please answer all questions');
      return;
    }

    const totalScore = values.reduce((sum, v) => sum + v, 0);
    const maxScore = questions.length * 4;
    const score = Math.round((totalScore / maxScore) * 100);

    let level = '';
    let recommendations: string[] = [];

    if (score >= 80) {
      level = 'Ready for Advanced Benchmarking';
      recommendations = [
        'Your organization is well-positioned for advanced benchmarking',
        'Consider implementing real-time competitive intelligence',
        'Explore predictive analytics and AI-driven insights',
        'Focus on benchmarking against industry leaders'
      ];
    } else if (score >= 60) {
      level = 'Ready for Standard Benchmarking';
      recommendations = [
        'You have a solid foundation for benchmarking',
        'Work on improving data integration across systems',
        'Implement more frequent reporting cycles',
        'Begin comparing KPIs across your locations'
      ];
    } else if (score >= 40) {
      level = 'Preparing for Benchmarking';
      recommendations = [
        'Focus on improving data quality and accuracy',
        'Work towards better system integration',
        'Establish consistent reporting processes',
        'Start tracking basic KPIs consistently'
      ];
    } else {
      level = 'Foundation Building Required';
      recommendations = [
        'Prioritize data quality and system reliability',
        'Begin integrating your operational systems',
        'Establish basic reporting cadence',
        'Create a data-driven culture within your team'
      ];
    }

    setResult({ score, level, recommendations });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-graphite-black dark:via-gray-900 dark:to-deep-blue/10 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          ← Back to Tools
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>📊</span>
            <span>Benchmark Readiness</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Benchmark Readiness Assessment
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Evaluate your organization's readiness for data-driven benchmarking
          </p>
        </div>

        <Card variant="elevated" className="mb-8">
          <CardHeader>
            <CardTitle>Assessment Questions</CardTitle>
            <CardDescription>Answer the following questions to evaluate your readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {questions.map((q, index) => (
                <div key={q.id}>
                  <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                    {index + 1}. {q.question}
                  </label>
                  <div className="space-y-2">
                    {q.options.map((option) => (
                      <label key={option.value} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                        <input
                          type="radio"
                          name={q.id}
                          value={option.value}
                          checked={responses[q.id as keyof typeof responses] === option.value}
                          onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <Button onClick={calculate} variant="primary" size="lg" className="w-full mt-6">
                Calculate Readiness Score
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card variant="elevated" className="border-l-4 border-blue-500">
            <CardHeader>
              <CardTitle>Your Readiness Score</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall Readiness</div>
                <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {result.score}%
                </div>
                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                  {result.level}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Recommendations</div>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-600 dark:text-gray-400">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Next Step:</strong> {result.score >= 60 ? 
                    'You\'re ready to start benchmarking! Consider scheduling a demo to see how Sundae can help.' :
                    'Focus on the recommendations above, then retake this assessment in 3-6 months.'}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Ready to start benchmarking with Sundae?
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg">
              Schedule a Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
