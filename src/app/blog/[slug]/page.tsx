import { notFound } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/Button';
import {
  getLocalizedBlogPost,
  getSourceBlogPost,
  getSourceBlogPosts,
} from '@/lib/blogTranslations';
import {
  buildWebsiteAlternateUrls,
  getLocalizedPathname,
  resolveWebsiteLocale,
  type WebsiteLocale,
} from '@/lib/i18n';
import { BlogContent } from './BlogContent';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    lang?: string;
  }>;
}

type BlogPostPageCopy = {
  backToBlog: string;
  backToAllPosts: string;
  seeInAction: string;
  requestDemo: string;
  ctaTitle: string;
  ctaDescription: string;
  unavailableTitle: string;
  unavailableDescription: string;
  viewEnglish: string;
  categories: Record<string, string>;
};

const localizedBlogPostPageCopy: Record<WebsiteLocale, BlogPostPageCopy> = {
  en: {
    backToBlog: '← Back to Blog',
    backToAllPosts: '← Back to All Posts',
    seeInAction: 'See Sundae in Action',
    requestDemo: 'Request a Demo',
    ctaTitle: 'Ready to Transform Your Restaurant Operations?',
    ctaDescription: "See how Sundae's decision intelligence platform can help you make smarter, faster decisions.",
    unavailableTitle: 'This article is not translated yet',
    unavailableDescription: 'The blog shell supports multiple languages, but this article is currently available in English only.',
    viewEnglish: 'Read in English',
    categories: {
      Product: 'Product',
      'Industry Insights': 'Industry Insights',
      Playbooks: 'Playbooks',
      'Data & AI': 'Data & AI',
      Benchmarks: 'Benchmarks',
      Research: 'Research',
    },
  },
  ar: {
    backToBlog: '← العودة إلى المدونة',
    backToAllPosts: '← العودة إلى جميع المقالات',
    seeInAction: 'شاهد Sundae أثناء العمل',
    requestDemo: 'اطلب عرضًا',
    ctaTitle: 'هل أنت مستعد لتحويل عمليات مطعمك؟',
    ctaDescription: 'شاهد كيف يمكن لمنصة ذكاء القرار من Sundae أن تساعدك على اتخاذ قرارات أذكى وأسرع.',
    unavailableTitle: 'هذه المقالة غير مترجمة بعد',
    unavailableDescription: 'واجهة المدونة متعددة اللغات، لكن هذه المقالة متاحة حالياً باللغة الإنجليزية فقط.',
    viewEnglish: 'اقرأ بالإنجليزية',
    categories: {
      Product: 'المنتج',
      'Industry Insights': 'رؤى القطاع',
      Playbooks: 'أدلة التشغيل',
      'Data & AI': 'البيانات والذكاء الاصطناعي',
      Benchmarks: 'المعايير',
      Research: 'البحث',
    },
  },
  fr: {
    backToBlog: '← Retour au blog',
    backToAllPosts: '← Retour à tous les articles',
    seeInAction: 'Découvrir Sundae en action',
    requestDemo: 'Demander une démo',
    ctaTitle: 'Prêt à transformer les opérations de votre restaurant ?',
    ctaDescription: "Découvrez comment la plateforme d'intelligence décisionnelle de Sundae peut vous aider à prendre des décisions plus intelligentes et plus rapides.",
    unavailableTitle: "Cet article n'est pas encore traduit",
    unavailableDescription: 'La structure du blog est multilingue, mais cet article est actuellement disponible uniquement en anglais.',
    viewEnglish: 'Lire en anglais',
    categories: {
      Product: 'Produit',
      'Industry Insights': 'Analyses sectorielles',
      Playbooks: 'Playbooks',
      'Data & AI': 'Données et IA',
      Benchmarks: 'Benchmarks',
      Research: 'Recherche',
    },
  },
  es: {
    backToBlog: '← Volver al blog',
    backToAllPosts: '← Volver a todas las entradas',
    seeInAction: 'Ver Sundae en acción',
    requestDemo: 'Solicitar una demo',
    ctaTitle: '¿Listo para transformar las operaciones de tu restaurante?',
    ctaDescription: 'Descubre cómo la plataforma de inteligencia de decisión de Sundae puede ayudarte a tomar decisiones más inteligentes y rápidas.',
    unavailableTitle: 'Este artículo todavía no está traducido',
    unavailableDescription: 'La estructura del blog es multilingüe, pero este artículo actualmente solo está disponible en inglés.',
    viewEnglish: 'Leer en inglés',
    categories: {
      Product: 'Producto',
      'Industry Insights': 'Perspectivas del sector',
      Playbooks: 'Playbooks',
      'Data & AI': 'Datos e IA',
      Benchmarks: 'Benchmarks',
      Research: 'Investigación',
    },
  },
};

export default async function BlogPostPage({
  params,
  searchParams,
}: BlogPostPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const forcedEnglish = resolvedSearchParams?.lang === 'en';
  const locale = forcedEnglish ? 'en' : resolveWebsiteLocale(await cookies());
  const copy = localizedBlogPostPageCopy[locale];
  const post = getLocalizedBlogPost(slug, locale);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sundae.io';
  const localizedBlogPath = getLocalizedPathname('/blog', locale);
  const localizedPostPath = getLocalizedPathname(`/blog/${slug}`, locale);
  const localizedDemoPath = getLocalizedPathname('/demo', locale);
  const englishPostPath = getLocalizedPathname(`/blog/${slug}`, 'en');

  if (!post) {
    notFound();
  }

  // JSON-LD Structured Data for Article
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Sundae Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Sundae',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logos/sundae-wordmark.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': new URL(localizedPostPath, baseUrl).toString(),
    },
    keywords: (post.tags || []).join(', '),
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  return (
    <>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="min-h-screen bg-[var(--navy-deep)]">
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href={localizedBlogPath} className="inline-block mb-8">
            <Button variant="ghost" size="sm">
              {copy.backToBlog}
            </Button>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                {copy.categories[post.category] ?? post.category}
              </span>
              <time className="text-[var(--text-supporting)] text-sm">
                {formatDate(post.date)}
              </time>
            </div>
            <h1 className="hero-h1 text-[var(--text-primary)] mb-6">
              {post.title}
            </h1>
            <p className="body-xl text-[var(--text-supporting)] leading-relaxed">
              {post.summary}
            </p>
          </header>

          {/* Content */}
          {post.translationAvailable ? (
            <BlogContent content={post.content} />
          ) : (
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-faint)] p-8">
              <h2 className="text-2xl font-semibold text-[var(--text-primary)] mb-3">
                {copy.unavailableTitle}
              </h2>
              <p className="text-[var(--text-supporting)] leading-relaxed mb-6">
                {copy.unavailableDescription}
              </p>
              <Link href={englishPostPath}>
                <Button variant="cta" size="lg">
                  {copy.viewEnglish}
                </Button>
              </Link>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-[var(--border-default)]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link href={localizedBlogPath}>
                <Button variant="outline-light" size="lg">
                  {copy.backToAllPosts}
                </Button>
              </Link>
              <Link href={localizedDemoPath}>
                <Button variant="primary" size="lg">
                  {copy.seeInAction}
                </Button>
              </Link>
            </div>
          </footer>
        </div>
      </article>

      {/* Related CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)] text-[var(--text-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            {copy.ctaTitle}
          </h2>
          <p className="body-xl mb-8 opacity-90">
            {copy.ctaDescription}
          </p>
          <Link href={localizedDemoPath}>
            <Button variant="cta" size="lg">
              {copy.requestDemo}
            </Button>
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return getSourceBlogPosts().map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params, searchParams }: BlogPostPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const forcedEnglish = resolvedSearchParams?.lang === 'en';
  const locale = forcedEnglish ? 'en' : resolveWebsiteLocale(await cookies());
  const post = getLocalizedBlogPost(slug, locale) ?? getSourceBlogPost(slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sundae.io';
  const localizedPostPath = getLocalizedPathname(`/blog/${slug}`, locale);
  const alternates = buildWebsiteAlternateUrls(`/blog/${slug}`, baseUrl);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.summary,
    keywords: post.tags,
    authors: [{ name: 'Sundae Team' }],
    alternates: {
      canonical: localizedPostPath,
      languages: alternates.languages,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      authors: ['Sundae Team'],
      tags: post.tags,
      url: new URL(localizedPostPath, baseUrl).toString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
  };
}
