'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { SundaeIcon } from '@/components/icons';

export default function MenuMarginCalculator() {
  const [sellingPrice, setSellingPrice] = useState('');
  const [ingredientCost, setIngredientCost] = useState('');
  const [result, setResult] = useState<{ 
    grossProfit: number; 
    marginPercent: number; 
    interpretation: string; 
    color: string;
    bgColor: string;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculate = () => {
    setIsCalculating(true);
    const price = parseFloat(sellingPrice);
    const cost = parseFloat(ingredientCost);

    if (isNaN(price) || isNaN(cost) || price <= 0 || cost < 0 || cost > price) {
      alert('Please enter valid numbers (ingredient cost must be less than selling price)');
      setIsCalculating(false);
      return;
    }

    const grossProfit = price - cost;
    const marginPercent = (grossProfit / price) * 100;
    
    let interpretation = '';
    let color = '';
    let bgColor = '';
    
    if (marginPercent < 55) {
      interpretation = 'Low margin – consider re-pricing or re-engineering this item to improve profitability.';
      color = 'text-red-600';
      bgColor = 'bg-red-50';
    } else if (marginPercent <= 70) {
      interpretation = 'Healthy margin range – this item is profitable and competitively priced.';
      color = 'text-blue-600';
      bgColor = 'bg-blue-50';
    } else {
      interpretation = 'Strong margin – excellent profitability. Guard against competition and maintain quality.';
      color = 'text-green-600';
      bgColor = 'bg-green-50';
    }

    setTimeout(() => {
      setResult({ grossProfit, marginPercent, interpretation, color, bgColor });
      setIsCalculating(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
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
            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
              <SundaeIcon name="chart" size="xl" className="text-white" />
            </div>
            <h1 className="hero-h1 text-slate-900 mb-4">
              Menu Item Margin Calculator
            </h1>
            <p className="body-lg text-slate-600">
              Analyze menu item profitability with margin calculations and pricing recommendations
            </p>
          </div>

          {/* Calculator Card */}
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">
                Enter Item Details
              </CardTitle>
              <CardDescription className="text-slate-600">
                Input the selling price and ingredient cost for your menu item
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Selling Price
                </label>
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  placeholder="e.g., 18.50"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Menu price charged to customers
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ingredient Cost
                </label>
                <input
                  type="number"
                  value={ingredientCost}
                  onChange={(e) => setIngredientCost(e.target.value)}
                  placeholder="e.g., 6.20"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-slate-400 focus:border-transparent"
                  min="0"
                  step="0.01"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Total cost of ingredients per item
                </p>
              </div>

              <Button 
                onClick={calculate}
                variant="primary" 
                size="lg" 
                className="w-full"
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculating...' : 'Calculate Margin'}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <Card variant="elevated" className={result.bgColor}>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-6 bg-white rounded-xl shadow-md">
                    <h3 className="text-sm font-semibold text-slate-600 mb-2">
                      Gross Profit Per Item
                    </h3>
                    <div className="text-4xl font-bold text-slate-900">
                      ${result.grossProfit.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="text-center p-6 bg-white rounded-xl shadow-md">
                    <h3 className="text-sm font-semibold text-slate-600 mb-2">
                      Margin %
                    </h3>
                    <div className="text-4xl font-bold text-slate-900">
                      {result.marginPercent.toFixed(1)}%
                    </div>
                  </div>
                </div>
                
                <div className={`p-6 rounded-xl bg-white shadow-md ${result.color}`}>
                  <h4 className="font-bold text-lg mb-2">Analysis</h4>
                  <p className="leading-relaxed">{result.interpretation}</p>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg">
                  <h5 className="font-semibold text-slate-900 mb-2 text-sm">
                    Margin Benchmarks:
                  </h5>
                  <ul className="text-sm text-slate-700 space-y-1">
                    <li>• &lt; 55%: Below target (review pricing or reduce costs)</li>
                    <li>• 55-70%: Healthy range for most menu items</li>
                    <li>• &gt; 70%: Strong margin (premium positioning)</li>
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
