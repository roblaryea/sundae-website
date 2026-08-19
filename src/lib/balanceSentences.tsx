import React from "react";

/**
 * Multi-sentence headlines break mid-phrase, because line balancing optimises
 * for even line lengths and knows nothing about sentence boundaries. Wrapping
 * each sentence in an inline-block makes it an atomic unit for line breaking:
 * the browser moves a whole sentence to the next line rather than splitting
 * it, and still wraps inside a sentence if one is wider than the container,
 * so narrow viewports degrade rather than overflow.
 *
 * Non-string children pass through untouched, so callers can hand it copy
 * that is already JSX without a guard.
 */
export function balanceSentences(text: React.ReactNode): React.ReactNode {
  if (typeof text !== "string") return text;
  const parts = text.match(/[^.!?]+[.!?]*\s*/g);
  if (!parts || parts.length < 2) return text;
  return parts.map((part, i) => (
    <span key={i} className="inline-block">
      {part.trimEnd()}
      {i < parts.length - 1 ? " " : ""}
    </span>
  ));
}

// Private-use sentinels: stand in for the authored asterisk markers so that a
// marker containing the sentence-ending period cannot be torn in half by the
// sentence split below. They never occur in copy.
const OPEN = "";
const CLOSE = "";
const MARKER = new RegExp(`${OPEN}([^${CLOSE}]+)${CLOSE}`, "g");

/**
 * The cream/conviction statements carry an authored `*emphasis*` marker. Making
 * those marker parts atomic is wrong when the emphasis sits mid-sentence: a
 * marker like `*decision.*` gets pushed onto a line of its own. Sentences are
 * the right atomic unit, so split there instead, treating the marker as
 * transparent when locating sentence boundaries.
 *
 * Falls back to atomic emphasis for a single-sentence statement, where the
 * marker is the only break point the author gave us.
 */
export function balanceEmphasisSentences(
  statement: string,
  renderEmphasis: (part: string, key: string) => React.ReactNode,
): React.ReactNode {
  const marked = statement.replace(/\*([^*]+)\*/g, (_m, part) => OPEN + part + CLOSE);

  const renderRuns = (chunk: string, prefix: string) =>
    chunk
      .split(MARKER)
      .map((part, i) =>
        i % 2 === 1 ? (
          renderEmphasis(part, `${prefix}-${i}`)
        ) : (
          <React.Fragment key={`${prefix}-${i}`}>{part}</React.Fragment>
        ),
      );

  const sentences = marked.split(new RegExp(`(?<=[.!?\\u3002\\uFF01\\uFF1F]${CLOSE}?)\\s+`));

  if (sentences.length < 2) {
    return marked
      .split(MARKER)
      .map((part, i) =>
        i % 2 === 1 ? (
          renderEmphasis(part, `s-${i}`)
        ) : (
          <span key={`s-${i}`} className="inline-block">
            {part}
          </span>
        ),
      );
  }

  return sentences.map((sentence, s) => (
    <span key={s} className="inline-block">
      {renderRuns(sentence, String(s))}
      {s < sentences.length - 1 ? " " : ""}
    </span>
  ));
}
