import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const outputPath = path.join(root, 'src/lib/legal/generated-policy-locales.ts')
const apiKey = process.env.OPENAI_API_KEY
const model = process.env.OPENAI_TRANSLATION_MODEL || 'gpt-5-mini'

if (!apiKey) throw new Error('OPENAI_API_KEY is required to generate legal policy locales')

const { APPROVED_TERMS_SECTIONS, APPROVED_PRIVACY_SECTIONS } = await import(
  '../src/lib/legal/approved-policies.ts'
)

const localeNames = {
  ar: 'Arabic',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
  nl: 'Dutch',
  pt: 'Portuguese',
  hi: 'Hindi',
  ur: 'Urdu',
  it: 'Italian',
  pl: 'Polish',
  tr: 'Turkish',
  'zh-Hans': 'Simplified Chinese',
  ja: 'Japanese',
  ko: 'Korean',
  id: 'Indonesian',
  vi: 'Vietnamese',
  ro: 'Romanian',
  sv: 'Swedish',
  bn: 'Bengali',
  th: 'Thai',
  ms: 'Malay',
}

const source = {
  terms: { badge: 'Legal', title: 'Terms of Service', description: 'These Terms govern access to Sundae’s websites, applications, APIs, integrations, mobile/PWA experiences and related services. They are written for a global B2B service and must be paired with the applicable order form and, where Customer Data is processed for the Customer, a Data Processing Addendum (“DPA”).', alternateLabel: 'Read the Privacy Policy', questionsLabel: 'Questions? Email', sections: APPROVED_TERMS_SECTIONS },
  privacy: { badge: 'Privacy', title: 'Privacy Policy', description: 'Sundae Technologies Inc. (“Sundae”, “we”, “us”) provides a global business platform for food-service and other shift-based operators. This Policy explains how we process personal information through Sundae websites, apps, Core, Crew, APIs, integrations, support and related services.', alternateLabel: 'Read the Terms of Service', questionsLabel: 'Questions? Email', sections: APPROVED_PRIVACY_SECTIONS },
}

const sourceParagraphs = [...source.terms.sections, ...source.privacy.sections].flatMap((section) => section.paragraphs)
const sourceTitles = [...source.terms.sections, ...source.privacy.sections].map((section) => section.title)

function assertShape(expected, actual, location = 'root') {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || actual.length !== expected.length) throw new Error(`${location}: array length mismatch`)
    expected.forEach((item, index) => assertShape(item, actual[index], `${location}[${index}]`))
    return
  }
  if (expected && typeof expected === 'object') {
    if (!actual || typeof actual !== 'object' || Array.isArray(actual)) throw new Error(`${location}: object expected`)
    const expectedKeys = Object.keys(expected).sort()
    const actualKeys = Object.keys(actual).sort()
    if (JSON.stringify(expectedKeys) !== JSON.stringify(actualKeys)) throw new Error(`${location}: keys mismatch`)
    for (const key of expectedKeys) assertShape(expected[key], actual[key], `${location}.${key}`)
    return
  }
  if (typeof actual !== 'string') throw new Error(`${location}: string expected`)
}

async function translate(locale, language) {
  let lastError
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are a senior legal translator and transcreator. Translate every human-language field in the supplied Sundae Terms of Service and Privacy Policy into the requested native language, including every section title and paragraph. Preserve every section, sentence, number, threshold, email, address, defined term, legal qualification and array length. Do not summarize, omit, soften, expand, or add obligations. Keep product and organization names (Sundae, Sundae Core, Sundae Crew, Ask Sundae, DPA, GDPR, CCPA, SCC, UK IDTA, DIFC, ADGM, SOC 2 Type II, Stripe) unchanged. Keep legal meaning precise and natural for a business customer. Return JSON only with exactly the same keys and structure.',
        },
        {
          role: 'user',
          content: `Transcreate this policy JSON into ${language} (${locale}). Use native legal punctuation and terminology while retaining the exact structure.\n\n${JSON.stringify(source)}`,
        },
      ],
    }),
  })
  if (!response.ok) throw new Error(`${locale}: OpenAI returned ${response.status}`)
  const payload = await response.json()
  const content = payload.choices?.[0]?.message?.content
  if (!content) throw new Error(`${locale}: empty model response`)
  const translated = JSON.parse(content)
  assertShape(source, translated, locale)
  const translatedParagraphs = [...translated.terms.sections, ...translated.privacy.sections].flatMap((section) => section.paragraphs)
  const translatedTitles = [...translated.terms.sections, ...translated.privacy.sections].map((section) => section.title)
  const unchanged = translatedParagraphs.filter((paragraph) => sourceParagraphs.includes(paragraph)).length
  // Addresses, product names and standard legal identifiers may remain unchanged, but a full
  // policy must be translated. Reject responses that retain most English paragraphs.
  if (unchanged > 8) throw new Error(`${locale}: ${unchanged} paragraphs unchanged; translation appears incomplete`)
  const unchangedTitles = translatedTitles.filter((title) => sourceTitles.includes(title)).length
  if (unchangedTitles > 2) throw new Error(`${locale}: ${unchangedTitles} section titles unchanged; translate headings too`)
  return translated
    } catch (error) {
      lastError = error
      if (attempt < 3) {
        console.warn(`\nRetrying ${locale} (attempt ${attempt + 1}/3): ${error.message}`)
      }
    }
  }
  throw lastError
}

let entries = [['en', source]]
const onlyLocales = process.env.ONLY_LOCALES?.split(',').map((value) => value.trim()).filter(Boolean)
const queue = Object.entries(localeNames).filter(([locale]) => !onlyLocales || onlyLocales.includes(locale))
if (onlyLocales) {
  try {
    const existing = await import(`../src/lib/legal/generated-policy-locales.ts?cache=${Date.now()}`)
    entries = Object.entries(existing.APPROVED_POLICY_LOCALES).filter(([locale]) => !onlyLocales.includes(locale))
  } catch {
    // No existing output; generate the requested locales alongside English.
  }
}
const concurrency = 3
for (let index = 0; index < queue.length; index += concurrency) {
  const batch = queue.slice(index, index + concurrency)
  const translated = await Promise.all(batch.map(async ([locale, language]) => {
    process.stdout.write(`Transcreating ${locale} (${language})... `)
    const result = await translate(locale, language)
    console.log('done')
    return [locale, result]
  }))
  entries.push(...translated)
}

const output = `// AUTO-GENERATED by scripts/generate-legal-policy-locales.mjs.\n// Source of truth: src/lib/legal/approved-policies.ts\n\nexport const APPROVED_POLICY_LOCALES = ${JSON.stringify(Object.fromEntries(entries), null, 2)} as const\n`
await fs.writeFile(outputPath, output, 'utf8')
console.log(`Wrote ${path.relative(root, outputPath)}`)
