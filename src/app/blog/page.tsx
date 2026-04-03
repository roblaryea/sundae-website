'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";
import type { BlogCategory } from "@/content/blog/types";
import { getLocalizedBlogPosts } from "@/lib/blogTranslations";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { getLocalizedPathname, type WebsiteLocale } from "@/lib/i18n";
import { PageHero, PageCTA, FadeUp } from "@/components/ui/PageAnimations";

type BlogPageCopy = {
  badge: string;
  title: string;
  description: string;
  all: string;
  categories: Record<BlogCategory, string>;
  readMore: string;
  articleCount: (count: number) => string;
  noArticlesTitle: string;
  noArticlesDescription: string;
  browseEnglish: string;
  stayInTheLoop: string;
  ctaDescription: string;
  bookDemo: string;
  contactUs: string;
};

const localizedBlogPageCopy: Record<WebsiteLocale, BlogPageCopy> = {
  en: {
    badge: 'Blog',
    title: 'Decision Intelligence Insights',
    description: 'Expert perspectives on restaurant analytics, AI-powered operations, and the future of hospitality technology.',
    all: 'All',
    categories: {
      Product: 'Product',
      'Industry Insights': 'Industry Insights',
      Playbooks: 'Playbooks',
      'Data & AI': 'Data & AI',
      Benchmarks: 'Benchmarks',
      Research: 'Research',
    },
    readMore: 'Read More →',
    articleCount: (count) => `${new Intl.NumberFormat('en-US').format(count)} ${count === 1 ? 'article' : 'articles'}`,
    noArticlesTitle: 'No translated articles yet',
    noArticlesDescription: 'We are still localizing the blog library for this language. You can browse the English blog in the meantime.',
    browseEnglish: 'Browse English Articles',
    stayInTheLoop: 'Stay in the Loop',
    ctaDescription: 'Get the latest insights on restaurant analytics and decision intelligence.',
    bookDemo: 'Book a Demo',
    contactUs: 'Contact Us',
  },
  ar: {
    badge: 'المدونة',
    title: 'رؤى ذكاء القرار',
    description: 'وجهات نظر متخصصة حول تحليلات المطاعم والعمليات المدعومة بالذكاء الاصطناعي ومستقبل تكنولوجيا الضيافة.',
    all: 'الكل',
    categories: {
      Product: 'المنتج',
      'Industry Insights': 'رؤى القطاع',
      Playbooks: 'أدلة التشغيل',
      'Data & AI': 'البيانات والذكاء الاصطناعي',
      Benchmarks: 'المعايير',
      Research: 'البحث',
    },
    readMore: 'اقرأ المزيد ←',
    articleCount: (count) => `${new Intl.NumberFormat('ar').format(count)} ${count === 1 ? 'مقال' : 'مقالات'}`,
    noArticlesTitle: 'لا توجد مقالات مترجمة بعد',
    noArticlesDescription: 'ما زلنا نترجم مكتبة المدونة لهذه اللغة. يمكنك تصفح المدونة الإنجليزية في الوقت الحالي.',
    browseEnglish: 'تصفح المقالات الإنجليزية',
    stayInTheLoop: 'ابق على اطلاع',
    ctaDescription: 'احصل على أحدث الرؤى حول تحليلات المطاعم وذكاء القرار.',
    bookDemo: 'احجز عرضًا',
    contactUs: 'تواصل معنا',
  },
  fr: {
    badge: 'Blog',
    title: 'Analyses en intelligence décisionnelle',
    description: 'Points de vue d’experts sur l’analyse des restaurants, les opérations pilotées par l’IA et l’avenir de la technologie hôtelière.',
    all: 'Tous',
    categories: {
      Product: 'Produit',
      'Industry Insights': 'Analyses sectorielles',
      Playbooks: 'Playbooks',
      'Data & AI': 'Données et IA',
      Benchmarks: 'Benchmarks',
      Research: 'Recherche',
    },
    readMore: 'Lire la suite →',
    articleCount: (count) => `${new Intl.NumberFormat('fr-FR').format(count)} article${count === 1 ? '' : 's'}`,
    noArticlesTitle: 'Aucun article traduit pour le moment',
    noArticlesDescription: "Nous continuons de localiser la bibliothèque du blog pour cette langue. Vous pouvez consulter le blog anglais en attendant.",
    browseEnglish: 'Voir les articles en anglais',
    stayInTheLoop: 'Restez informé',
    ctaDescription: 'Recevez les dernières analyses sur l’analytics des restaurants et l’intelligence décisionnelle.',
    bookDemo: 'Réserver une démo',
    contactUs: 'Nous contacter',
  },
  es: {
    badge: 'Blog',
    title: 'Perspectivas de inteligencia de decisión',
    description: 'Perspectivas expertas sobre analítica de restaurantes, operaciones impulsadas por IA y el futuro de la tecnología para hostelería.',
    all: 'Todos',
    categories: {
      Product: 'Producto',
      'Industry Insights': 'Perspectivas del sector',
      Playbooks: 'Playbooks',
      'Data & AI': 'Datos e IA',
      Benchmarks: 'Benchmarks',
      Research: 'Investigación',
    },
    readMore: 'Leer más →',
    articleCount: (count) => `${new Intl.NumberFormat('es-ES').format(count)} artículo${count === 1 ? '' : 's'}`,
    noArticlesTitle: 'Todavía no hay artículos traducidos',
    noArticlesDescription: 'Seguimos localizando la biblioteca del blog para este idioma. Mientras tanto, puedes consultar el blog en inglés.',
    browseEnglish: 'Ver artículos en inglés',
    stayInTheLoop: 'Mantente al tanto',
    ctaDescription: 'Recibe las últimas ideas sobre analítica de restaurantes e inteligencia de decisión.',
    bookDemo: 'Reservar una demo',
    contactUs: 'Contáctanos',
  },
};

export default function BlogPage() {
  const { locale } = useWebsiteI18n();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All');
  const copy = localizedBlogPageCopy[locale];
  const localizedPosts = getLocalizedBlogPosts(locale);
  const blogHref = (slug: string) => getLocalizedPathname(`/blog/${slug}`, locale);
  const englishBlogHref = getLocalizedPathname('/blog', 'en');
  const demoHref = getLocalizedPathname('/demo', locale);
  const contactHref = getLocalizedPathname('/contact', locale);

  const categories: Array<BlogCategory | 'All'> = [
    'All',
    'Product',
    'Industry Insights',
    'Playbooks',
    'Data & AI',
    'Benchmarks',
    'Research'
  ];

  const filteredPosts = selectedCategory === 'All'
    ? localizedPosts
    : localizedPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero Section */}
      <PageHero
        badge={copy.badge}
        title={copy.title}
        description={copy.description}
      />

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-[var(--text-primary)] shadow-lg'
                    : 'bg-[var(--surface-subtle)] text-[var(--text-secondary)] hover:bg-slate-200'
                }`}
              >
                {category === 'All' ? copy.all : copy.categories[category]}
              </button>
            ))}
          </div>
          <div className="text-center mt-6 text-[var(--text-supporting)]">
            {copy.articleCount(filteredPosts.length)}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeUp>
            {filteredPosts.length > 0 ? (
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
                          <span className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wide">
                            {copy.categories[post.category]}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        <CardTitle className="text-xl text-[var(--text-primary)] group-hover:text-[var(--text-secondary)] transition-colors duration-300 mb-3">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-[var(--text-supporting)] leading-relaxed line-clamp-3">
                          {post.summary}
                        </CardDescription>
                        <div className="pt-4 border-t border-[var(--border-default)]">
                          <Link href={blogHref(post.slug)}>
                            <Button variant="ghost" size="sm" className="group-hover:text-[var(--text-primary)] w-full">
                              {copy.readMore}
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card variant="elevated" className="max-w-3xl mx-auto text-center">
                <CardContent className="py-14 px-8">
                  <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
                    {copy.noArticlesTitle}
                  </h2>
                  <p className="text-[var(--text-supporting)] mb-6">
                    {copy.noArticlesDescription}
                  </p>
                  <Link href={englishBlogHref}>
                    <Button variant="cta" size="lg" onClick={() => window.document.cookie = 'sundae_locale=en; path=/; max-age=31536000; samesite=lax'}>
                      {copy.browseEnglish}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </FadeUp>
        </div>
      </section>

      {/* Newsletter CTA */}
      <PageCTA
        title={copy.stayInTheLoop}
        description={copy.ctaDescription}
      >
        <Button variant="cta" size="lg" href={demoHref}>{copy.bookDemo}</Button>
        <Button variant="outline-light" size="lg" href={contactHref}>{copy.contactUs}</Button>
      </PageCTA>
    </div>
  );
}
