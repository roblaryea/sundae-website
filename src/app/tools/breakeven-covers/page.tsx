'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState('');
  const [variableCost, setVariableCost] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [result, setResult] = useState<{ 
    breakEvenCovers: number; 
    contributionMargin: number;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = () => {
    setIsCalculating(true);
    const fixed = parseFloat(fixedCosts);
    const variable = parseFloat(variableCost);
    const price = parseFloat(avgPrice);

    if (isNaN(fixed) || isNaN(variable) || isNaN(price) || 
        fixed < 0 || variable < 0 || price <= 0 || variable >= price) {
      alert('Please enter valid numbers (average price must be greater than variable cost)');
      return;
    }

    const contributionMargin = price - variable;
    
    if (contributionMargin <= 0) {
      alert('Contribution margin must be positive. Increase your average price or reduce variable costs.');
      return;
    }

    const breakEvenCovers = Math.ceil(fixed / contributionMargin);

    setTimeout(() => {
      setResult({ breakEvenCovers, contributionMargin });
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
              ⚖️
            </div>
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-4">
              Break-Even Covers Calculator
            </h1>
            <p className="body-lg text-gray-600 dark:text-gray-400">
              Calculate how many covers you need to break even based on fixed and variable costs
            </p>
          </div>

          {/* Calculator Card */}
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                Enter Your Costs
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Input your fixed costs, variable cost per cover, and average selling price
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fixed Costs Per Period
                </label>
                <input
                  type="number"
                  value={fixedCosts}
                  onChange={(e) => setFixedCosts(e.target.value)}
                  placeholder="e.g., 50000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Rent, salaries, insurance, etc. (monthly or period total)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Variable Cost Per Cover
                </label>
                <input
                  type="number"
                  value={variableCost}
                  onChange={(e) => setVariableCost(e.target.value)}
                  placeholder="e.g., 12.50"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Food cost, packaging, credit card fees per customer
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Average Selling Price Per Cover
                </label>
                <input
                  type="number"
                  value={avgPrice}
                  onChange={(e) => setAvgPrice(e.target.value)}
                  placeholder="e.g., 32.00"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Average check size per customer
                </p>
              </div>

              <Button 
                onClick={calculate}
                variant="primary" 
                size="lg" 
                className="w-full"
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculating...' : 'Calculate Break-Even Point'}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card variant="elevated" className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Break-Even Covers Required
                  </h3>
                  <div className="text-6xl font-bold text-electric-blue mb-4">
                    {result.breakEvenCovers.toLocaleString()}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    covers per period
                  </p>
                </div>
                
                <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md mb-6">
                  <h4 className="font-bold text-lg mb-3 text-gray-900 dark:text-white">Analysis</h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    You need at least <strong>{result.breakEvenCovers.toLocaleString()} covers</strong> in this period to cover all costs before profit.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Your contribution margin per cover is <strong>${result.contributionMargin.toFixed(2)}</strong>. 
                    This is the amount each customer contributes toward covering fixed costs and profit.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                      Contribution Margin
                    </h5>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ${result.contributionMargin.toFixed(2)}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">per cover</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                      To Profit
                    </h5>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Every cover beyond {result.breakEvenCovers.toLocaleString()} contributes ${result.contributionMargin.toFixed(2)} to profit
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                    💡 Tips to Improve Break-Even:
                  </h5>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>• Reduce fixed costs (negotiate rent, optimize labor)</li>
                    <li>• Lower variable costs (better supplier terms, reduce waste)</li>
                    <li>• Increase average check (upselling, menu engineering)</li>
                    <li>• Improve contribution margin = faster path to profitability</li>
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
