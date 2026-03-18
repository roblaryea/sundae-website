'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { blogPosts, BlogCategory } from "@/lib/blogData";
import { PageHero, PageCTA, FadeUp } from "@/components/ui/PageAnimations";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');

  const categories: Array<BlogCategory | 'All'> = [
    'All',
    'Product',
    'Industry Insights',
    'Playbooks',
    'Data & AI',
    'Benchmarks'
  ];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        badge="Blog"
        title="Decision Intelligence Insights"
        description="Expert perspectives on restaurant analytics, AI-powered operations, and the future of hospitality technology."
      />

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-center mt-6 text-gray-600">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card variant="elevated" className="h-full hover:shadow-xl transition-all duration-300 group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-slate-900 uppercase tracking-wide">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <CardTitle className="text-xl text-gray-900 group-hover:text-slate-700 transition-colors duration-300 mb-3">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-gray-600 leading-relaxed line-clamp-3">
                        {post.summary}
                      </CardDescription>
                      <div className="pt-4 border-t border-gray-200">
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" size="sm" className="group-hover:text-slate-900 w-full">
                            Read More →
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Newsletter CTA */}
      <PageCTA
        title="Stay in the Loop"
        description="Get the latest insights on restaurant analytics and decision intelligence."
      >
        <Button variant="cta" size="lg" href="/demo">Book a Demo</Button>
        <Button variant="outline-light" size="lg" href="/contact">Contact Us</Button>
      </PageCTA>
    </div>
  );
}
