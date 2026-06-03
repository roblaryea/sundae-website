import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const i18nPath = path.join(root, 'src/lib/i18n.ts')
const diagnosticPath = path.join(root, 'src/lib/diagnostic/i18n.ts')
const questionPath = path.join(root, 'src/lib/diagnostic/questionTranslations.ts')
const questionFrameworkPath = path.join(root, 'src/lib/diagnostic/questions.ts')
const optionPackPaths = [
  path.join(root, 'src/lib/diagnostic/optionPacksAsia.ts'),
  path.join(root, 'src/lib/diagnostic/optionPacksEurope.ts'),
  path.join(root, 'src/lib/diagnostic/optionPacksIndic.ts'),
]

const i18n = fs.readFileSync(i18nPath, 'utf8')
const diagnostic = fs.readFileSync(diagnosticPath, 'utf8')
const questions = fs.readFileSync(questionPath, 'utf8')
const questionFramework = fs.readFileSync(questionFrameworkPath, 'utf8')
const optionPackSource = optionPackPaths
  .filter((filePath) => fs.existsSync(filePath))
  .map((filePath) => fs.readFileSync(filePath, 'utf8'))
  .join('\n')

const localeBlock = i18n.match(/export const websiteLocaleProfiles = \{([\s\S]*?)\n\} as const/)
if (!localeBlock) {
  throw new Error('Could not locate websiteLocaleProfiles in src/lib/i18n.ts')
}

const locales = [...localeBlock[1].matchAll(/^\s*'?([a-z]{2}(?:-[A-Za-z]+)?)'?:\s*\{/gm)].map(
  (match) => match[1],
)

const failures = []

for (const locale of locales) {
  const escaped = locale.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const quoted = locale.includes('-') ? `"${locale}"` : locale
  const singleQuoted = `'${locale}'`

  if (!new RegExp(`(?:${quoted}|${singleQuoted})\\s*:`).test(diagnostic)) {
    failures.push(`Missing languageInstructions entry for ${locale}`)
  }

  const hasQuestionLocale =
    locale === 'en'
      ? /\n\s*en,/.test(questions) || /\ben\s*:\s*en\b/.test(questions)
      : new RegExp(`(?:${quoted}|${singleQuoted})\\s*:\\s*defineLocale`).test(questions)
  if (!hasQuestionLocale) {
    failures.push(`Missing diagnosticQuestionTranslations entry for ${locale}`)
  }

  if (locale !== 'en' && !new RegExp(`(?:${quoted}|${singleQuoted}|${escaped})`).test(questions)) {
    failures.push(`Locale ${locale} is not represented in questionTranslations.ts`)
  }

  if (locale !== 'en' && !new RegExp(`^\\s{2}${quoted}:\\s*\\{`, 'm').test(diagnostic)) {
    failures.push(`Locale ${locale} is missing a full diagnostic chrome override in diagnostic/i18n.ts`)
  }
}

for (const required of [
  'getDiagnosticPromptInstruction',
  'getDiagnosticCopy',
  'getDiagnosticCatalogCopy',
  'getDiagnosticQuestionCopy',
]) {
  if (!diagnostic.includes(required) && !questions.includes(required)) {
    failures.push(`Missing diagnostic i18n export: ${required}`)
  }
}

for (const required of [
  'Target language:',
  'Write every user-visible value',
  'Preserve these glossary/product names exactly',
]) {
  if (!diagnostic.includes(required)) {
    failures.push(`Missing diagnostic prompt guardrail: ${required}`)
  }
}

const questionIds = [...questions.matchAll(/^\s*([a-z0-9_]+):\s*\{/gm)]
  .map((match) => match[1])
  .filter((id) => !['dimensions', 'navigation', 'capture', 'fields', 'placeholders', 'roles', 'countries', 'questionText', 'optionLabels'].includes(id))

if (!questions.includes('QUESTIONS.map((question)')) {
  failures.push('Question catalog must be derived from QUESTIONS so new question IDs cannot be missed silently')
}

if (questionIds.length < 20) {
  failures.push(`Expected at least 20 localized diagnostic question entries; found ${questionIds.length}`)
}

function extractQuestionBlocks(source) {
  const arrayStart = source.indexOf('export const QUESTIONS')
  const assignment = source.indexOf('=', arrayStart)
  const firstBracket = source.indexOf('[', assignment)
  const blocks = []
  let depth = 0
  let blockStart = -1
  let inString = false
  let quote = ''
  let escaped = false

  for (let index = firstBracket + 1; index < source.length; index += 1) {
    const char = source[index]

    if (inString) {
      if (escaped) {
        escaped = false
      } else if (char === '\\') {
        escaped = true
      } else if (char === quote) {
        inString = false
      }
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      inString = true
      quote = char
      continue
    }

    if (char === '{') {
      if (depth === 0) blockStart = index
      depth += 1
    } else if (char === '}') {
      depth -= 1
      if (depth === 0 && blockStart !== -1) {
        blocks.push(source.slice(blockStart, index + 1))
        blockStart = -1
      }
    } else if (char === ']' && depth === 0) {
      break
    }
  }

  return blocks
}

const optionQuestionMatches = extractQuestionBlocks(questionFramework)
  .map((block) => {
    const id = block.match(/id:\s+"([^"]+)"/)?.[1]
    const options = block.match(/options:\s*\[([\s\S]*?)\n\s*\]/)?.[1]
    return id && options ? [block, id, options] : null
  })
  .filter(Boolean)

const optionQuestionIds = optionQuestionMatches.map((match) => match[1])
const expectedOptionQuestionIds = [
  'segment',
  'outlets',
  'avg_unit_volume',
  'region',
  'scheduling_tool',
  'labor_pain',
  'payroll_regions',
  'kpis_measured',
  'kpis_wished',
  'decision_data',
  'forecasting',
  'scenario_wish',
  'pos',
  'ops_tools',
  'timeline',
  'decision_lag',
  'budget_band',
  'tech_headcount',
]

for (const id of expectedOptionQuestionIds) {
  if (!optionQuestionIds.includes(id)) {
    failures.push(`Expected option-bearing diagnostic question ${id} was not found`)
  }
}

const effectiveOptionSource = `${questions}\n${optionPackSource}`
const keyPattern = (key) => {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`(?:\\b${escaped}|["']${escaped}["'])\\s*:`)
}

for (const locale of locales.filter((locale) => locale !== 'en')) {
  const quoted = locale.includes('-') ? `"${locale}"` : locale
  const hasSharedOverride = new RegExp(`^\\s{2}${quoted}:\\s*\\{`, 'm').test(questions)
  const hasPackOverride = new RegExp(`^\\s{2}${quoted}:\\s*\\{`, 'm').test(optionPackSource)

  if (!hasSharedOverride && !hasPackOverride) {
    failures.push(`Locale ${locale} has no native option-label pack`)
  }

  if (
    hasPackOverride &&
    !new RegExp(`locale === "${locale.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(questions)
  ) {
    failures.push(`Locale ${locale} has an option pack file but is not wired in mapOptionPack`)
  }
}

for (const id of expectedOptionQuestionIds) {
  if (!keyPattern(id).test(effectiveOptionSource)) {
    failures.push(`Missing localized option group ${id}`)
  }
}

for (const [, questionId, block] of optionQuestionMatches) {
  const values = [...block.matchAll(/value:\s+"([^"]+)"/g)].map((match) => match[1])
  for (const value of values) {
    if (questionId === 'pos' && value !== 'other') continue
    if (!keyPattern(value).test(effectiveOptionSource)) {
      failures.push(`Missing localized option value ${questionId}.${value}`)
    }
  }
}

if (failures.length > 0) {
  console.error(`Diagnostic i18n QA failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Diagnostic i18n QA passed for ${locales.length} locales`)
