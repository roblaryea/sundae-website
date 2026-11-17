import { BrandEmphasis } from './BrandEmphasis'

/** Keep an authored thought on each line without forcing words to overflow. */
export function OperatorOpeningTitle({ text, accent }: { text: string; accent: string }) {
  const boundary = text.indexOf(accent)
  if (boundary <= 0 || !text.endsWith(accent)) return <BrandEmphasis text={text} phrase={accent} />
  return <><span className="block">{text.slice(0, boundary).trimEnd()}</span><span className="brand-emphasis block" data-brand-emphasis>{accent}</span></>
}
