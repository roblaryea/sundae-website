/**
 * Drop stale generated-locale overrides for copy blocks whose English source
 * has been rewritten.
 *
 * `mergeGeneratedCopy` merges arrays POSITIONALLY, so when an English array
 * changes length or order, a surviving translation is silently applied to the
 * wrong item (see the desktop-hub index-drift class of bug). Deleting the key
 * makes the locale fall back to English, which is honest, instead of rendering
 * a translated version of a withdrawn price.
 *
 * Usage:
 *   node scripts/scrub-generated-locale-keys.mjs <file> <copyVar> <key> [key...]
 */
import fs from 'node:fs'

const [file, copyVar, ...keys] = process.argv.slice(2)
if (!file || !copyVar || keys.length === 0) {
  console.error('usage: scrub-generated-locale-keys.mjs <file> <copyVar> <key> [key...]')
  process.exit(1)
}

const source = fs.readFileSync(file, 'utf8')
const start = source.indexOf('{')
const end = source.lastIndexOf('}')
const header = source.slice(0, start)
const footer = source.slice(end + 1)
const data = JSON.parse(source.slice(start, end + 1))

const target = data[copyVar]
if (!target) {
  console.error(`No copy variable "${copyVar}" in ${file}`)
  process.exit(1)
}

let removed = 0
for (const locale of Object.keys(target)) {
  for (const key of keys) {
    if (key in target[locale]) {
      delete target[locale][key]
      removed += 1
    }
  }
  if (Object.keys(target[locale]).length === 0) delete target[locale]
}

fs.writeFileSync(file, `${header}${JSON.stringify(data, null, 2)}${footer}`)
console.log(`${file}: removed ${removed} stale override(s) for ${keys.join(', ')}`)
