import Image from 'next/image';
import type { CSSProperties } from 'react';
import { SUNDAE_WORDMARK, SUNDAE_WORDMARK_SIZE } from '@/lib/brandAssets';

type Props = {
  className?: string;
  style?: CSSProperties;
  tone?: 'adaptive' | 'ink' | 'cream';
  decorative?: boolean;
};

/** Reuse the artwork intact. Theme changes select a file, never recolour it. */
export function ApprovedWordmark({ className = '', style, tone = 'adaptive', decorative = false }: Props) {
  const tones = tone === 'adaptive' ? ['cream', 'ink'] as const : [tone];
  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : 'Sundae'}
      aria-hidden={decorative || undefined}
      data-approved-wordmark={tone}
      className={`relative inline-block aspect-[4/1] shrink-0 select-none align-middle ${className}`}
      style={style}
    >
      {tones.map(variant => (
        <Image
          key={variant}
          src={SUNDAE_WORDMARK[variant]}
          alt=""
          aria-hidden="true"
          width={SUNDAE_WORDMARK_SIZE.width}
          height={SUNDAE_WORDMARK_SIZE.height}
          unoptimized
          className={`approved-wordmark-${variant} absolute inset-0 h-full! w-full! object-contain`}
        />
      ))}
    </span>
  );
}
