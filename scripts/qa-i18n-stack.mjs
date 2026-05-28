import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const i18nPath = path.join(root, 'src/lib/i18n.ts')
const source = fs.readFileSync(i18nPath, 'utf8')

const requiredLocales = [
  'en',
  'ar',
  'fr',
  'es',
  'de',
  'nl',
  'pt',
  'hi',
  'ur',
  'it',
  'pl',
  'tr',
  'zh-Hans',
  'ja',
  'ko',
  'id',
  'vi',
  'ro',
  'sv',
  'bn',
  'th',
  'ms',
]
const profileMatch = source.match(/export const websiteLocaleProfiles = \{([\s\S]*?)\n\} as const/)
const profileBody = profileMatch?.[1] ?? ''
const profileLocales = [...profileBody.matchAll(/\n\s{2}(?:'([^']+)'|([A-Za-z-]+)):\s*\{/g)].map(
  (match) => match[1] ?? match[2],
)
const missingLocales = requiredLocales.filter((locale) => !profileLocales.includes(locale))

const failures = []
if (missingLocales.length) {
  failures.push(`Missing locale profiles: ${missingLocales.join(', ')}`)
}

for (const locale of ['ar', 'ur']) {
  const pattern = new RegExp(`${locale}: \\{[^\\n]+dir: 'rtl'`)
  if (!pattern.test(source)) {
    failures.push(`Locale ${locale} must be configured as rtl`)
  }
}

for (const locale of requiredLocales.filter((item) => !['en', 'ar', 'fr', 'es'].includes(item))) {
  const escapedLocale = locale.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const overridePattern = new RegExp(`\\n\\s{2}(?:${escapedLocale}|'${escapedLocale}'): \\{[\\s\\S]*?metadata:`)
  if (!overridePattern.test(source)) {
    failures.push(`Missing expanded message override for ${locale}`)
  }
}

const sourceRoots = ['src/app', 'src/components', 'src/content']
const unsafeLocaleIndexes = []

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(fullPath)
      continue
    }
    if (!/\.(ts|tsx)$/.test(entry.name)) continue
    const text = fs.readFileSync(fullPath, 'utf8')
    const lines = text.split('\n')
    lines.forEach((line, index) => {
      if (!/\w+\[locale\]/.test(line)) return
      if (line.includes('locale as keyof typeof')) return
      if (line.includes('websiteLocaleDirection[locale]')) return
      if (line.includes('localizedPrivacyCopy[locale]')) return
      if (line.includes('localizedTermsCopy[locale]')) return
      if (line.includes('LABEL_MAP[locale]')) return
      unsafeLocaleIndexes.push(`${path.relative(root, fullPath)}:${index + 1}`)
    })
  }
}

for (const sourceRoot of sourceRoots) {
  walk(path.join(root, sourceRoot))
}

if (unsafeLocaleIndexes.length) {
  failures.push(`Unsafe locale indexing:\n${unsafeLocaleIndexes.map((item) => `  - ${item}`).join('\n')}`)
}

if (failures.length) {
  console.error(`i18n stack QA failed:\n\n${failures.join('\n\n')}`)
  process.exit(1)
}

console.log(`i18n stack QA passed for locales: ${requiredLocales.join(', ')}`)
