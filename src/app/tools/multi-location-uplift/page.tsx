'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { SundaeIcon } from '@/components/icons';

export default function MultiLocationUpliftPage() {
  const [locations, setLocations] = useState('');
  const [avgRevenue, setAvgRevenue] = useState('');
  const [targetImprovement, setTargetImprovement] = useState('');
  const [result, setResult] = useState<{
    totalRevenue: number;
    upliftRevenue: number;
    annualImpact: number;
    perLocation: number;
    timeframe: string;
  } | null>(null);

  const calculate = () => {
    const numLocations = parseFloat(locations);
    const revenue = parseFloat(avgRevenue);
    const improvement = parseFloat(targetImprovement);

    if (isNaN(numLocations) || isNaN(revenue) || isNaN(improvement) || numLocations === 0) {
      alert('Please enter valid numbers');
      return;
    }

    const totalRevenue = numLocations * revenue * 12; // Annual
    const upliftPercent = improvement / 100;
    const upliftRevenue = totalRevenue * upliftPercent;
    const perLocation = upliftRevenue / numLocations;

    let timeframe = '';
    if (improvement <= 3) {
      timeframe = '3-6 months with focused operational improvements';
    } else if (improvement <= 5) {
      timeframe = '6-12 months with consistent optimization';
    } else if (improvement <= 10) {
      timeframe = '12-18 months with strategic initiatives';
    } else {
      timeframe = '18-24 months with major transformation';
    }

    setResult({
      totalRevenue,
      upliftRevenue,
      annualImpact: upliftRevenue,
      perLocation,
      timeframe
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-graphite-black dark:via-gray-900 dark:to-deep-blue/10 py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/tools" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          ← Back to Tools
        </Link>

        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <SundaeIcon name="trending" size="md" />
            <span>Multi-Location Uplift</span>
          </div>
          <h1 className="hero-h1 text-gray-900 dark:text-white mb-4">
            Multi-Location Revenue Uplift Estimator
          </h1>
          <p className="body-xl text-gray-600 dark:text-gray-300">
            Calculate the potential revenue impact of operational improvements across multiple locations
          </p>
        </div>

        <Card variant="elevated" className="mb-8">
          <CardHeader>
            <CardTitle>Enter Your Multi-Location Data</CardTitle>
            <CardDescription>Estimate the revenue impact of performance improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Locations
                </label>
                <input
                  type="number"
                  value={locations}
                  onChange={(e) => setLocations(e.target.value)}
                  placeholder="e.g., 10"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Average Monthly Revenue per Location ($)
                </label>
                <input
                  type="number"
                  value={avgRevenue}
                  onChange={(e) => setAvgRevenue(e.target.value)}
                  placeholder="e.g., 50000"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Improvement (%)
                </label>
                <input
                  type="number"
                  value={targetImprovement}
                  onChange={(e) => setTargetImprovement(e.target.value)}
                  placeholder="e.g., 5"
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Typical improvements range from 2-10% with systematic optimization
                </p>
              </div>

              <Button onClick={calculate} variant="primary" size="lg" className="w-full">
                Calculate Revenue Uplift
              </Button>
            </div>
          </CardContent>
        </Card>

        {result && (
          <Card variant="elevated" className="border-l-4 border-purple-500">
            <CardHeader>
              <CardTitle>Estimated Revenue Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Annual Revenue</div>
                  <div className="section-h3 text-gray-900 dark:text-white">
                    ${(result.totalRevenue / 1000000).toFixed(2)}M
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Potential Annual Uplift</div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    ${(result.upliftRevenue / 1000000).toFixed(2)}M
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Uplift Per Location</div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    ${(result.perLocation / 1000).toFixed(1)}K
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">per year</div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Expected Timeframe</div>
                  <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                    {result.timeframe}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Improvement Areas</div>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Labor Optimization:</strong> Improve scheduling efficiency and reduce overtime (2-4% impact)
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Menu Engineering:</strong> Optimize pricing and promote high-margin items (1-3% impact)
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Operational Excellence:</strong> Reduce waste, improve inventory management (1-2% impact)
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      <strong>Location Benchmarking:</strong> Replicate best practices from top performers (2-5% impact)
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Note:</strong> These estimates are based on industry benchmarks. Actual results depend on current performance levels, 
                  market conditions, and execution quality. Sundae helps identify and track opportunities across all locations.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want to identify specific improvement opportunities across your locations?
          </p>
          <Link href="/demo">
            <Button variant="primary" size="lg">
              See How Sundae Can Help
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
