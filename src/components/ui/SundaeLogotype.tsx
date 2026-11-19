import type { CSSProperties } from 'react';
import { ApprovedWordmark } from './ApprovedWordmark';
import { ApprovedMark } from './ApprovedMark';

/** Legacy component name for the shared symbol-and-wordmark signature. */
export function SundaeLogotype({ className = '', style, tone = 'adaptive' }: {
  className?: string;
  style?: CSSProperties;
  tone?: 'adaptive' | 'ink' | 'cream';
}) {
  return (
    <span role="img" aria-label="Sundae" dir="ltr" data-approved-identity="lockup" className={`inline-flex shrink-0 items-center align-middle ${className}`} style={style}>
      {/* Align the colored artwork, excluding the symbol tile and PNG margins. */}
      <ApprovedMark className="h-[1.5em] w-[1.5em] translate-y-[0.0285em]" />
      <ApprovedWordmark tone={tone} className="-ms-[0.6em] h-[1.6em] w-[6.4em]" decorative />
    </span>
  );
}
