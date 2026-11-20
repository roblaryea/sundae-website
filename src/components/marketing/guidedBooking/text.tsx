import { Fragment, type ReactNode } from 'react';

/**
 * Fill `{placeholders}` in a translated line. Values are isolated in <bdi> so
 * names, emails and Latin product names keep their direction inside Arabic
 * and Urdu sentences; "Sundae" itself is always isolated too.
 */
export function fill(template: string, values: Record<string, ReactNode> = {}, strong: readonly string[] = []): ReactNode {
  const parts = template.split(/(\{[a-zA-Z]+\})/g);
  return parts.map((part, index) => {
    const match = /^\{([a-zA-Z]+)\}$/.exec(part);
    if (match && match[1] in values) {
      const value = <bdi>{values[match[1]]}</bdi>;
      return <Fragment key={index}>{strong.includes(match[1]) ? <b>{value}</b> : value}</Fragment>;
    }
    return <Fragment key={index}>{isolateBrand(part)}</Fragment>;
  });
}

function isolateBrand(text: string): ReactNode {
  if (!text.includes('Sundae')) return text;
  const pieces = text.split('Sundae');
  return pieces.map((piece, index) => (
    <Fragment key={index}>
      {piece}
      {index < pieces.length - 1 && <bdi>Sundae</bdi>}
    </Fragment>
  ));
}

/** Plain-text fill for attributes (aria-label) and analytics-free strings. */
export function fillText(template: string, values: Record<string, string | number> = {}): string {
  return template.replace(/\{([a-zA-Z]+)\}/g, (whole, key: string) => (key in values ? String(values[key]) : whole));
}
