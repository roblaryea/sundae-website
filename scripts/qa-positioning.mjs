import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const copyPath = path.join(root, 'src/generated-locales/positioning_recovery.ts')

function readExportedJson(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  const start = source.indexOf('{')
  const end = source.lastIndexOf('}')
  if (start < 0 || end <= start) throw new Error(`Cannot parse ${filePath}`)
  return JSON.parse(source.slice(start, end + 1))
}

function shape(value) {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, shape(value[key])]))
  }
  return typeof value
}

const failures = []

if (!fs.existsSync(copyPath)) {
  failures.push('missing generated positioning and recovery locale module')
} else {
  const copy = readExportedJson(copyPath)
  const locales = Object.keys(copy)
  if (locales.length !== 22) failures.push(`expected 22 positioning locales, found ${locales.length}`)

  const englishShape = JSON.stringify(shape(copy.en))
  for (const locale of locales) {
    if (JSON.stringify(shape(copy[locale])) !== englishShape) {
      failures.push(`${locale}: positioning copy shape differs from English`)
    }
  }

  for (const locale of locales.filter((item) => item !== 'en')) {
    for (const key of ['title', 'description', 'proofTitle', 'ctaTitle']) {
      if (copy[locale]?.recovery?.[key] === copy.en.recovery[key]) {
        failures.push(`${locale}: recovery.${key} silently falls back to English`)
      }
    }
  }
}

const bannedChecks = [
  {
    files: [
      'src/app/product/page.tsx',
      'src/generated-locales/app_product_page.ts',
      'src/components/home/sections/SectionSpeedQualityCost.tsx',
      'src/generated-locales/components_home_sections_SectionSpeedQualityCost.ts',
      'src/components/home/sections/SectionWhatYouRetire.tsx',
      'src/generated-locales/components_home_sections_SectionWhatYouRetire.ts',
      'src/app/solutions/technology-teams/page.tsx',
      'src/app/solutions/technology-teams/layout.tsx',
      'src/generated-locales/app_solutions_technology_teams_page.ts',
      'src/components/redesign/v2/SectionSpeedQualityCost.tsx',
      'src/components/redesign/solutions/content.ts',
    ],
    pattern: /500 Data Models|500\+|500 نموذج|500 مخطط|500 modèle|500 modelo/i,
    label: 'withdrawn 500-data-model claim',
  },
  {
    files: [
      'src/app/product/page.tsx',
      'src/app/product/pulse/page.tsx',
      'src/generated-locales/app_product_page.ts',
    ],
    pattern: /\$2K|2\.000 \$|2 ألف دولار/,
    label: 'withdrawn per-shift recovery figure',
  },
  {
    files: [
      'src/app/solutions/regional-managers/page.tsx',
      'src/generated-locales/app_solutions_regional_managers_page.ts',
    ],
    pattern: /30%\+/,
    label: 'unsupported server-performance figure',
  },
  {
    files: ['src/app/architecture/page.tsx'],
    pattern: /SOC 2 Type II compliant|SOC 2 Type II, GDPR, and CCPA compliant|✓ Certified/,
    label: 'premature SOC 2 certification claim',
  },
]

for (const check of bannedChecks) {
  for (const relativePath of check.files) {
    const source = fs.readFileSync(path.join(root, relativePath), 'utf8')
    if (check.pattern.test(source)) failures.push(`${relativePath}: ${check.label}`)
  }
}

if (failures.length) {
  console.error('Positioning QA failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Positioning QA passed: claims are safe and all 22 flagship locales are complete.')
