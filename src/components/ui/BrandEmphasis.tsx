/** Authored phrase emphasis without changing the visible or accessible wording. */
export function BrandEmphasis({ text, phrase }: { text: string; phrase?: string }) {
  const index = phrase ? text.indexOf(phrase) : -1
  if (index < 0 || !phrase) return <>{text}</>
  return <>{text.slice(0, index)}<span className="brand-emphasis" data-brand-emphasis>{phrase}</span>{text.slice(index + phrase.length)}</>
}

/** Two-part platform headlines retain the first sentence and warm the second. */
export function BrandStatement({ text }: { text: string }) {
  const boundary = text.match(/[.!?。！？۔।]\s*/)
  const phrase = boundary?.index === undefined ? undefined : text.slice(boundary.index + boundary[0].length)
  return <BrandEmphasis text={text} phrase={phrase} />
}
