'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function BlogContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="section-h2 text-[var(--text-primary)] mt-12 mb-6">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="section-h3 text-[var(--text-primary)] mt-8 mb-4">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mt-6 mb-3">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="body-base text-[var(--text-secondary)] mb-6 leading-relaxed">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="text-[var(--text-primary)] font-semibold">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-[var(--text-supporting)] italic">{children}</em>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-6 mb-6 space-y-2 text-[var(--text-secondary)]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-6 mb-6 space-y-2 text-[var(--text-secondary)]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="body-base leading-relaxed">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500/50 pl-6 my-6 italic text-[var(--text-supporting)]">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-10 border-[var(--border-default)]" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-8 rounded-lg border border-white/10">
              <table className="w-full text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-white/5 border-b border-white/10">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/5">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold text-[var(--text-primary)] whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-[var(--text-secondary)]">
              {children}
            </td>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-white/10 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className={`${className} block bg-white/5 rounded-lg p-4 overflow-x-auto text-sm font-mono text-[var(--text-secondary)]`}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-white/5 rounded-lg p-4 overflow-x-auto my-6 border border-white/10">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
