import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const root = process.cwd()
const generatedDir = path.join(root, 'src/generated-locales')

const structuralKeys = new Set([
  'id',
  'key',
  'slug',
  'href',
  'url',
  'src',
  'path',
  'ctaLink',
  'link',
  'icon',
  'iconName',
  'color',
  'gradient',
  'className',
  'variant',
  'type',
  'trendUp',
])

const protectedTerms = [
  'Sundae',
  'Sundae Report',
  'Sundae Core',
  'Sundae Crew',
  'Pulse',
  'Watchtower',
  'Foresight',
  'Scout',
  'Canvas',
  'Cross-Intelligence',
  'Report Lite',
  'Report Plus',
  'Report Pro',
  'Core Lite',
  'Core Pro',
  'Toast',
  'Square',
  'Lightspeed',
  'RevPASH',
  'EBITDA',
  'CapEx',
  'POS',
  'P&L',
]

const exactProtectedTerms = new Set(['Enterprise'])

const literalPhraseRules = {
  nl: [
    'Portfolio-combinatie',
    'groepswandeling',
    'Groepsdemo',
    'HEFBOOM',
    'schaalvoordek',
    'vanuit één enkel POS',
    'Sundae Kern',
    'Puls',
    'Vooruitziende blik',
    'collega',
    'merkrecensies',
    'arbeid voor elk merk',
  ],
  es: [
    'Núcleo de helado',
    'puntos de referencia',
    'previsión',
    'Reserve un recorrido',
    'ver demostración grupal',
  ],
  ar: [
    'مثلجات',
    'الخبز المحمص',
    'المربع',
    'البصيرة',
  ],
  fr: [
    'rollup',
    'marque-vs-marque',
    'check de readiness',
    'proof packs',
  ],
}

function unwrap(node) {
  while (
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression?.(node) ||
    ts.isParenthesizedExpression(node) ||
    ts.isTypeAssertionExpression(node)
  ) {
    node = node.expression
  }
  return node
}

function propertyNameText(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text
  return undefined
}

function valueFromNode(node) {
  node = unwrap(node)
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((item) => valueFromNode(item)).filter((item) => item !== undefined)
  }
  if (ts.isObjectLiteralExpression(node)) {
    const result = {}
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue
      const key = propertyNameText(property.name)
      if (!key) continue
      const value = valueFromNode(property.initializer)
      if (value !== undefined) result[key] = value
    }
    return result
  }
  return undefined
}

function parseExport(filePath, exportName) {
  const source = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  )
  let found
  function visit(node) {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === exportName) {
      found = valueFromNode(node.initializer)
    }
    ts.forEachChild(node, visit)
  }
  visit(source)
  return found
}

function sourcePathFromGenerated(filePath, text) {
  const match = text.match(/overrides for (src\/[^.]+?\.(?:tsx|ts))/)
  return match ? path.join(root, match[1]) : undefined
}

function getAtPath(value, parts) {
  let cursor = value
  for (const part of parts) {
    if (cursor == null) return undefined
    cursor = cursor[part]
  }
  return cursor
}

function walk(value, visitor, parts = []) {
  visitor(value, parts)
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, visitor, [...parts, index]))
  } else if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, child]) => walk(child, visitor, [...parts, key]))
  }
}

function stringContainsTerm(value, term) {
  return typeof value === 'string' && new RegExp(`(^|[^A-Za-z])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`).test(value)
}

function stringContainsLiteralPhrase(value, phrase) {
  if (typeof value !== 'string') return false
  if (/^[A-Za-z]+$/.test(phrase)) {
    return new RegExp(`(^|[^A-Za-z])${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`).test(value)
  }
  return value.includes(phrase)
}

function auditGeneratedFile(filePath, failures) {
  const text = fs.readFileSync(filePath, 'utf8')
  const rel = path.relative(root, filePath)
  if (text.includes('Google Translate fallback')) {
    failures.push(`${rel}: generated pack is still marked as Google Translate fallback`)
  }

  const generated = parseExport(filePath, 'generatedLocalCopy')
  const sourcePath = sourcePathFromGenerated(filePath, text)
  if (!generated || !sourcePath || !fs.existsSync(sourcePath)) return

  for (const [copyKey, byLocale] of Object.entries(generated)) {
    const sourceCopy = parseExport(sourcePath, copyKey)
    const english = sourceCopy?.en
    if (!english) continue

    for (const [locale, localized] of Object.entries(byLocale)) {
      walk(localized, (value, parts) => {
        if (typeof value !== 'string') return
        const key = parts.at(-1)
        const englishValue = getAtPath(english, parts)
        const pathLabel = `${rel}.${copyKey}.${locale}.${parts.join('.')}`

        if (structuralKeys.has(String(key)) && englishValue !== undefined && value !== englishValue) {
          failures.push(`${pathLabel}: structural value changed from "${englishValue}" to "${value}"`)
        }

        for (const term of protectedTerms) {
          if (stringContainsTerm(englishValue, term) && !stringContainsTerm(value, term)) {
            failures.push(`${pathLabel}: protected term "${term}" was not preserved`)
          }
        }

        for (const term of exactProtectedTerms) {
          if (englishValue === term && value !== term) {
            failures.push(`${pathLabel}: exact protected term "${term}" was not preserved`)
          }
        }

        for (const phrase of literalPhraseRules[locale] ?? []) {
          if (stringContainsLiteralPhrase(value, phrase)) {
            failures.push(`${pathLabel}: literal/awkward phrase "${phrase}"`)
          }
        }
      })
    }
  }
}

const failures = []
for (const file of fs.readdirSync(generatedDir).filter((item) => item.endsWith('.ts'))) {
  auditGeneratedFile(path.join(generatedDir, file), failures)
}

if (failures.length) {
  console.error(`Translation quality QA failed with ${failures.length} issue(s):`)
  const maxFailures = process.env.TRANSLATION_QA_MAX === 'all'
    ? failures.length
    : Number(process.env.TRANSLATION_QA_MAX ?? 250)
  for (const failure of failures.slice(0, maxFailures)) console.error(`- ${failure}`)
  if (failures.length > maxFailures) console.error(`...and ${failures.length - maxFailures} more`)
  process.exit(1)
}

console.log('Translation quality QA passed')
