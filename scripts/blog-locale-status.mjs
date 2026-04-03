import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(process.cwd(), 'src')
const sourcePath = path.join(root, 'content/blog/en.ts')
const translationDir = path.join(root, 'content/blog/translations')
const locales = ['ar', 'fr', 'es']

const sourceText = fs.readFileSync(sourcePath, 'utf8')
const slugMatches = [...sourceText.matchAll(/slug:\s*"([^"]+)"/g)]
const slugs = slugMatches.map((match) => match[1])

function readTranslationStatuses(locale) {
  const statuses = new Map()
  const localeFiles = fs
    .readdirSync(translationDir)
    .filter(
      (fileName) =>
        fileName === `${locale}.ts` || fileName.startsWith(`${locale}-batch-`),
    )
    .sort()

  for (const fileName of localeFiles) {
    const fileText = fs.readFileSync(path.join(translationDir, fileName), 'utf8')
    for (const match of fileText.matchAll(/["']([^"']+)["']\s*:\s*\{[\s\S]*?status:\s*["'](draft|review|translated)["']/g)) {
      statuses.set(match[1], match[2])
    }
  }

  return statuses
}

const coverage = locales.map((locale) => ({
  locale,
  statuses: readTranslationStatuses(locale),
}))

console.log(`Blog source posts: ${slugs.length}`)

for (const { locale, statuses } of coverage) {
  const counts = {
    translated: 0,
    review: 0,
    draft: 0,
    missing: 0,
  }

  for (const slug of slugs) {
    const status = statuses.get(slug) ?? 'missing'
    counts[status] += 1
  }

  console.log(`\n${locale.toUpperCase()}`)
  console.log(
    `translated=${counts.translated} review=${counts.review} draft=${counts.draft} missing=${counts.missing}`,
  )
}
