'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function LaborAnalyzerPage() {
  const [actualLabor, setActualLabor] = useState('');
  const [revenue, setRevenue] = useState('');
  const [targetLabor, setTargetLabor] = useState('');
  const [result, setResult] = useState<{ laborPercent: number; variance: number; status: string; recommendation: string } | null>(null);

  const calculate = () => {
    const laborCost = parseFloat(actualLabor);
    const totalRevenue = parseFloat(revenue);
    const target = parseFloat(targetLabor);

    if (isNaN(laborCost) || isNaN(totalRevenue) || totalRevenue === 0) {
      alert('Please enter valid numbers');
      return;
    }

    const laborPercent = (laborCost / totalRevenue) * 100;
    const variance = target > 0 ? laborPercent - target : 0;
    
    let status = 'on-target';
    let recommendation = 'Your labor cost is within acceptable range.';
    
    if (variance > 3) {
      status = 'high';
      recommendation = 'Labor costs are significantly above target. Consider reviewing scheduling efficiency, overtime usage, and staffing levels.';
    } else if (variance > 0) {
      status = 'slightly-high';
      recommendation = 'Labor costs are slightly above target. Monitor trends and look for optimization opportunities.';
    } else if (variance < -3) {
      status = 'low';
      recommendation = 'Labor costs are significantly below target. Ensure adequate staffing levels to maintain service quality.';
    }

    setResult({ laborPercent, variance, status, recommendation });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-graphite-black dark:via-gray-900 dark:to-deep-blue/10 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          ← Back to Tools
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span>👥</span>
            <span>Labor Analyzer</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Labor Cost Variance Analyzer
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Compare your actual labor costs against targets and get actionable insights
          </p>
        </div>

        <Card variant="elevated" className="mb-8">
          <CardHeader>
            <CardTitle>Enter Your Labor Data</CardTitle>
            <CardDescription>Input your actual labor costs and revenue to analyze variance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Actual Labor Cost ($)
                </label>
                <input
                  type="number"
                  value={actualLabor}
                  onChange={(e) => setActualLabor(e.target.value)}
                  placeholder="e.g., 25000"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Revenue ($)
                </label>
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="e.g., 100000"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Labor % (optional)
                </label>
                <input
                  type="number"
                  value={targetLabor}
                  onChange={(e) => setTargetLabor(e.target.value)}
                  placeholder="e.g., 30"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Industry standard is typically 25-35% for full-service restaurants
                </p>
              </div>

              <Button onClick={calculate} variant="primary" size="lg" className="w-full">
                Analyze Labor Variance
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card variant="elevated" className={`border-l-4 ${
            result.status === 'high' ? 'border-red-500' :
            result.status === 'slightly-high' ? 'border-yellow-500' :
            result.status === 'low' ? 'border-blue-500' :
            'border-green-500'
          }`}>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Actual Labor Cost %</div>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {result.laborPercent.toFixed(1)}%
                  </div>
                </div>

                {parseFloat(targetLabor) > 0 && (
                  <div className={`rounded-lg p-6 ${
                    result.status === 'high' ? 'bg-red-50 dark:bg-red-900/20' :
                    result.status === 'slightly-high' ? 'bg-yellow-50 dark:bg-yellow-900/20' :
                    result.status === 'low' ? 'bg-blue-50 dark:bg-blue-900/20' :
                    'bg-green-50 dark:bg-green-900/20'
                  }`}>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Variance vs Target</div>
                    <div className={`text-4xl font-bold ${
                      result.status === 'high' ? 'text-red-600 dark:text-red-400' :
                      result.status === 'slightly-high' ? 'text-yellow-600 dark:text-yellow-400' :
                      result.status === 'low' ? 'text-blue-600 dark:text-blue-400' :
                      'text-green-600 dark:text-green-400'
                    }`}>
                      {result.variance > 0 ? '+' : ''}{result.variance.toFixed(1)}%
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Recommendation</div>
                <p className="text-gray-600 dark:text-gray-400">{result.recommendation}</p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Tip:</strong> Track labor costs weekly to identify trends early. Consider using scheduling software to optimize labor allocation.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want more advanced labor analytics across all locations?
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See Sundae Platform
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
