import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { blogPosts } from '@/lib/blogData';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Split content by double newlines to create paragraphs
  const contentParagraphs = post.content.split('\n\n').filter(para => para.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-graphite-black dark:via-gray-900 dark:to-deep-blue/10">
      <article className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="inline-block mb-8">
            <Button variant="ghost" size="sm">
              ← Back to Blog
            </Button>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                {post.category}
              </span>
              <time className="text-gray-600 dark:text-gray-400 text-sm">
                {formatDate(post.date)}
              </time>
            </div>
            <h1 className="hero-h1 text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            <p className="body-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {post.summary}
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {contentParagraphs.map((paragraph, index) => {
              // Check if paragraph is a heading
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="section-h2 text-gray-900 dark:text-white mt-12 mb-6">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              
              // Check if paragraph is a subheading
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="section-h3 text-gray-900 dark:text-white mt-8 mb-4">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }

              // Check if paragraph contains bold markdown (**text**)
              const processedParagraph = paragraph
                .split(/(\*\*[^*]+\*\*)/)
                .map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                  }
                  return part;
                });

              // Regular paragraph
              return (
                <p key={index} className="body-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {processedParagraph}
                </p>
              );
            })}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  ← Back to All Posts
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="primary" size="lg">
                  See Sundae in Action
                </Button>
              </Link>
            </div>
          </footer>
        </div>
      </article>

      {/* Related CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-deep-blue to-electric-blue text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-h2 mb-6">
            Ready to Transform Your Restaurant Operations?
          </h2>
          <p className="body-xl mb-8 opacity-90">
            See how Sundae's decision intelligence platform can help you make smarter, faster decisions.
          </p>
          <Link href="/demo">
            <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Request a Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Sundae Blog`,
    description: post.summary,
  };
}
