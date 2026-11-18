import type { CSSProperties } from 'react';
import { ApprovedWordmark } from './ApprovedWordmark';

/** Compatibility sizing for existing chrome; artwork comes from the approved PNG. */
export function SundaeLogotype({ className = '', style, tone = 'adaptive' }: {
  className?: string;
  style?: CSSProperties;
  tone?: 'adaptive' | 'ink' | 'cream';
}) {
  return <ApprovedWordmark tone={tone} className={`h-[1.6em] w-[6.4em] ${className}`} style={style} />;
}
