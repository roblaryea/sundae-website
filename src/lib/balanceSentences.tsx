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

type EmphasisRun = {
  text: string;
  emphasized: boolean;
};

const EMPHASIS_MARKER = /\*([^*]+)\*/g;
const SENTENCE_BOUNDARY = /([.!?\u3002\uFF01\uFF1F]+)(\s+)/g;

function emphasisRuns(statement: string): EmphasisRun[] {
  const runs: EmphasisRun[] = [];
  let cursor = 0;

  for (const match of statement.matchAll(EMPHASIS_MARKER)) {
    const start = match.index ?? 0;
    if (start > cursor) {
      runs.push({ text: statement.slice(cursor, start), emphasized: false });
    }
    runs.push({ text: match[1], emphasized: true });
    cursor = start + match[0].length;
  }

  if (cursor < statement.length) {
    runs.push({ text: statement.slice(cursor), emphasized: false });
  }

  return runs.length > 0 ? runs : [{ text: statement, emphasized: false }];
}

function sentenceRuns(runs: EmphasisRun[]): EmphasisRun[][] {
  const sentences: EmphasisRun[][] = [[]];

  for (const run of runs) {
    let cursor = 0;

    for (const match of run.text.matchAll(SENTENCE_BOUNDARY)) {
      const start = match.index ?? 0;
      const punctuationEnd = start + match[1].length;
      const text = run.text.slice(cursor, punctuationEnd);

      if (text) {
        sentences[sentences.length - 1].push({ ...run, text });
      }

      sentences.push([]);
      cursor = start + match[0].length;
    }

    const tail = run.text.slice(cursor);
    if (tail) {
      sentences[sentences.length - 1].push({ ...run, text: tail });
    }
  }

  return sentences.filter((sentence) => sentence.some((run) => run.text.length > 0));
}

/**
 * The cream/conviction statements carry an authored `*emphasis*` marker. Parse
 * those markers before finding sentence boundaries so an emphasized passage
 * can safely contain multiple sentences. This also avoids placeholder glyphs
 * ever entering the rendered output.
 */
export function balanceEmphasisSentences(
  statement: string,
  renderEmphasis: (part: string, key: string) => React.ReactNode,
): React.ReactNode {
  const runs = emphasisRuns(statement);
  const sentences = sentenceRuns(runs);

  const renderRuns = (parts: EmphasisRun[], prefix: string) =>
    parts.map((part, i) =>
      part.emphasized ? (
        renderEmphasis(part.text, `${prefix}-${i}`)
      ) : (
        <React.Fragment key={`${prefix}-${i}`}>{part.text}</React.Fragment>
      ),
    );

  if (sentences.length < 2) {
    return renderRuns(runs, "s");
  }

  return sentences.map((sentence, s) => (
    <React.Fragment key={s}>
      <span className="inline-block">{renderRuns(sentence, String(s))}</span>
      {s < sentences.length - 1 ? " " : null}
    </React.Fragment>
  ));
}
