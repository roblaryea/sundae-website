// Operations Diagnostic localisation gate.
//
// Every website locale must have a complete diagnostic pack
// (src/lib/diagnostic/copy/<locale>.ts) with exactly the English keys, the
// same array lengths, the same {placeholders}, the same numbers, the product
// names untranslated, and none of the retired claims. Every question and
// option in the question bank must have English copy.
//
//   node scripts/qa-diagnostic-i18n.mjs            # all locales
//   node scripts/qa-diagnostic-i18n.mjs --locale de

import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'

const root = process.cwd()
const copyDir = path.join(root, 'src/lib/diagnostic/copy')
const i18nSource = fs.readFileSync(path.join(root, 'src/lib/i18n.ts'), 'utf8')
const diagnosticI18n = fs.readFileSync(path.join(root, 'src/lib/diagnostic/i18n.ts'), 'utf8')
const indexSource = fs.readFileSync(path.join(copyDir, 'index.ts'), 'utf8')

const localeBlock = i18nSource.match(/export const websiteLocaleProfiles = \{([\s\S]*?)\n\} as const/)
if (!localeBlock) throw new Error('Could not locate websiteLocaleProfiles in src/lib/i18n.ts')
const allLocales = [...localeBlock[1].matchAll(/^\s*'?([a-z]{2}(?:-[A-Za-z]+)?)'?:\s*\{/gm)].map((match) => match[1])

const onlyIndex = process.argv.indexOf('--locale')
const locales = onlyIndex > -1 ? [process.argv[onlyIndex + 1]] : allLocales

function loadModule(file) {
  const source = fs.readFileSync(file, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText
  const sandboxModule = { exports: {} }
  vm.runInNewContext(compiled, {
    module: sandboxModule,
    exports: sandboxModule.exports,
    require: (name) => {
      throw new Error(`${path.relative(root, file)} must not import runtime modules (found ${name})`)
    },
  }, { filename: file })
  return sandboxModule.exports
}

function loadPack(locale) {
  const file = path.join(copyDir, `${locale}.ts`)
  if (!fs.existsSync(file)) return { error: `Missing pack file src/lib/diagnostic/copy/${locale}.ts` }
  try {
    const exported = loadModule(file)
    const values = Object.values(exported).filter((value) => value && typeof value === 'object')
    if (values.length !== 1) return { error: `${locale}.ts must export exactly one pack object` }
    return { pack: values[0] }
  } catch (error) {
    return { error: `${locale}.ts failed to load: ${error.message}` }
  }
}

const failures = []
const { pack: en, error: enError } = loadPack('en')
if (enError) throw new Error(enError)

const PRODUCT_NAMES = [
  'Core Foundation', 'Core Margin', 'Core Growth', 'Core Performance',
  'Crew Operating', 'Crew Complete', 'Crew Payroll', 'Crew Starter',
  'Foresight & Action', 'Profit Recovery', 'Ask Sundae', 'Benchmarks',
  'Watchtower', 'Pulse', 'Sundae', 'Crew', 'Core',
]
const BANNED = [
  { pattern: /[\u2014\u2013]/, reason: 'em or en dash (use a spaced hyphen " - ")' },
  { pattern: /[%\u066A\uFF05]/, reason: 'percent sign' },
  { pattern: /EBITDA|\bROI\b|uplift|payback/i, reason: 'financial-return claim' },
  { pattern: /\bmoat\b|NodeScope|substrate|network[ -]effect/i, reason: 'internal term' },
  { pattern: /14\s*-\s*90|14\s*-\s*365/, reason: 'unverified forecast horizon' },
  { pattern: /\bEgypt\b/i, reason: 'unverified payroll country claim' },
  { pattern: /\b7\s*(?:min|minutes)\b|about 7|14 (?:focused )?questions|20 strategic questions/i, reason: 'time or question-count promise' },
]

const placeholders = (text) => new Set([...text.matchAll(/\{(\w+)\}/g)].map((match) => match[1]))
const digitRuns = (text) => new Set(text.replace(/\{\w+\}/g, '').match(/\d+/g) ?? [])
const sameSet = (a, b) => a.size === b.size && [...a].every((item) => b.has(item))

function compare(reference, candidate, locale, trail) {
  const where = `${locale}:${trail.join('.') || '(root)'}`
  if (typeof reference === 'string') {
    if (typeof candidate !== 'string' || !candidate.trim()) {
      failures.push(`${where} must be a non-empty string`)
      return
    }
    if (!sameSet(placeholders(reference), placeholders(candidate))) {
      failures.push(`${where} placeholders differ from English (${[...placeholders(reference)].join(', ') || 'none'})`)
    }
    if (locale !== 'en' && !sameSet(digitRuns(reference), digitRuns(candidate))) {
      failures.push(`${where} numbers differ from English ("${candidate}")`)
    }
    for (const name of PRODUCT_NAMES) {
      if (reference.includes(name) && !candidate.includes(name)) {
        failures.push(`${where} must keep the product name "${name}" untranslated`)
        break
      }
    }
    for (const { pattern, reason } of BANNED) {
      if (pattern.test(candidate)) failures.push(`${where} contains a ${reason}: "${candidate}"`)
    }
    return
  }
  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate) || candidate.length !== reference.length) {
      failures.push(`${where} must be an array of ${reference.length} items`)
      return
    }
    reference.forEach((item, index) => compare(item, candidate[index], locale, [...trail, String(index)]))
    return
  }
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) {
    failures.push(`${where} must be an object`)
    return
  }
  for (const key of Object.keys(reference)) {
    if (!(key in candidate)) failures.push(`${where}.${key} is missing`)
    else compare(reference[key], candidate[key], locale, [...trail, key])
  }
  for (const key of Object.keys(candidate)) {
    if (!(key in reference)) failures.push(`${where}.${key} is not in the English pack`)
  }
}

for (const locale of locales) {
  if (!allLocales.includes(locale)) {
    failures.push(`Unknown website locale ${locale}`)
    continue
  }
  const { pack, error } = loadPack(locale)
  if (error) {
    failures.push(error)
    continue
  }
  compare(en, pack, locale, [])
  const identifier = locale === 'zh-Hans' ? 'zhHans' : locale
  if (!new RegExp(`import \\{ ${identifier} \\} from "\\./${locale}"`).test(indexSource)) {
    failures.push(`Locale ${locale} is not wired into src/lib/diagnostic/copy/index.ts`)
  }
  const quoted = locale.includes('-') ? `"${locale}"` : locale
  if (!new RegExp(`(?:${quoted}|'${locale}')\\s*:`).test(diagnosticI18n)) {
    failures.push(`Missing languageInstructions entry for ${locale} in src/lib/diagnostic/i18n.ts`)
  }
}

// Question bank coverage: every question and translated option has English copy.
const bank = loadModule(path.join(root, 'src/lib/diagnostic/questions.ts'))
for (const question of bank.QUESTIONS) {
  const copy = en.questions[question.id]
  if (!copy?.prompt) {
    failures.push(`Question ${question.id} has no English prompt in copy/en.ts`)
    continue
  }
  for (const value of bank.localizedOptionValues(question)) {
    if (!copy.options?.[value]) failures.push(`Option ${question.id}.${value} has no English label in copy/en.ts`)
  }
}

for (const required of ['Target language:', 'Write every user-visible value', 'Preserve these glossary/product names exactly']) {
  if (!diagnosticI18n.includes(required)) failures.push(`Missing diagnostic prompt guardrail: ${required}`)
}

if (failures.length > 0) {
  console.error(`Diagnostic i18n QA failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Diagnostic i18n QA passed for ${locales.length} locale${locales.length === 1 ? '' : 's'}`)
