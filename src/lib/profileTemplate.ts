/**
 * Replaces a {token} in a localized template; returns text parts so the caller can isolate the
 * substituted value (a name, a country) for bidi. Dependency-free so client components can use it
 * without pulling in the server-side validation code.
 */
export function splitTemplate(template: string, value: string, token = 'name'): { text: string; isName: boolean }[] {
  return template
    .split(`{${token}}`)
    .flatMap((part, index, parts) =>
      index < parts.length - 1 ? [{ text: part, isName: false }, { text: value, isName: true }] : [{ text: part, isName: false }],
    )
    .filter((part) => part.text !== '')
}
