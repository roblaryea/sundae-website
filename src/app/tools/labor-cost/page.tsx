'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function LaborCostCalculator() {
  const [laborCost, setLaborCost] = useState('');
  const [totalSales, setTotalSales] = useState('');
  const [result, setResult] = useState<{ percentage: number; interpretation: string; color: string } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = () => {
    setIsCalculating(true);
    const labor = parseFloat(laborCost);
    const sales = parseFloat(totalSales);

    if (isNaN(labor) || isNaN(sales) || labor < 0 || sales <= 0) {
      alert('Please enter valid positive numbers');
      return;
    }

    const percentage = (labor / sales) * 100;
    
    let interpretation = '';
    let color = '';
    
    if (percentage < 25) {
      interpretation = 'Lean - Your labor cost is below industry average. Ensure you\'re not understaffed.';
      color = 'text-green-600 dark:text-green-400';
    } else if (percentage <= 32) {
      interpretation = 'Healthy - Your labor cost is within the industry standard range of 25-32%.';
      color = 'text-blue-600 dark:text-blue-400';
    } else {
      interpretation = 'High - Your labor cost exceeds 32%. Review staffing levels and scheduling efficiency.';
      color = 'text-red-600 dark:text-red-400';
    }

    // Small delay to show loading state
    setTimeout(() => {
      setResult({ percentage, interpretation, color });
      setIsCalculating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-graphite-black dark:via-gray-900 dark:to-deep-blue/10">
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/tools" className="inline-block mb-8">
            <Button variant="ghost" size="sm">
              ← Back to Tools
            </Button>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-electric-blue to-deep-blue rounded-2xl flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-lg">
              👥
            </div>
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-4">
              Labor Cost % Calculator
            </h1>
            <p className="body-lg text-gray-600 dark:text-gray-400">
              Calculate your labor cost percentage and see if you're on target compared to industry standards
            </p>
          </div>

          {/* Calculator Card */}
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                Enter Your Numbers
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Input your total labor cost and sales for the period
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label htmlFor="laborCost" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Labor Cost
                </label>
                <input
                  type="number"
                  id="laborCost"
                  value={laborCost}
                  onChange={(e) => setLaborCost(e.target.value)}
                  placeholder="e.g., 25000"
                  aria-describedby="laborCost-hint"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  min="0"
                  step="0.01"
                />
                <p id="laborCost-hint" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Total wages, benefits, and payroll taxes
                </p>
              </div>

              <div>
                <label htmlFor="totalSales" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Sales
                </label>
                <input
                  type="number"
                  id="totalSales"
                  value={totalSales}
                  onChange={(e) => setTotalSales(e.target.value)}
                  placeholder="e.g., 100000"
                  aria-describedby="totalSales-hint"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  min="0"
                  step="0.01"
                />
                <p id="totalSales-hint" className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Total revenue for the same period
                </p>
              </div>

              <Button 
                onClick={calculate}
                variant="primary" 
                size="lg" 
                className="w-full"
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculating...' : 'Calculate Labor Cost %'}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card variant="elevated" className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Your Labor Cost %
                  </h3>
                  <div className="text-6xl font-bold text-electric-blue mb-4">
                    {result.percentage.toFixed(1)}%
                  </div>
                </div>
                
                <div className={`p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md ${result.color}`}>
                  <h4 className="font-bold text-lg mb-2">Analysis</h4>
                  <p className="leading-relaxed">{result.interpretation}</p>
                </div>

                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    Industry Benchmarks:
                  </h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• &lt; 25%: Below average (may indicate understaffing)</li>
                    <li>• 25-32%: Healthy range for most concepts</li>
                    <li>• &gt; 32%: Above average (review efficiency)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
