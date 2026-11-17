import fs from 'node:fs/promises'
import path from 'node:path'

const directory = path.resolve('src/content/operator-workflows')
const source = JSON.parse(await fs.readFile(path.join(directory, 'en.json'), 'utf8'))
const languages = {
  ar: 'Arabic', fr: 'French', es: 'Spanish', de: 'German', nl: 'Dutch',
  pt: 'Brazilian Portuguese', hi: 'Hindi', ur: 'Urdu', it: 'Italian', pl: 'Polish',
  tr: 'Turkish', 'zh-Hans': 'Simplified Chinese', ja: 'Japanese', ko: 'Korean',
  id: 'Indonesian', vi: 'Vietnamese', ro: 'Romanian', sv: 'Swedish', bn: 'Bengali',
  th: 'Thai', ms: 'Malay',
}

function schema(value) {
  if (typeof value === 'string') return { type: 'string' }
  if (Array.isArray(value)) return { type: 'array', items: schema(value[0]), minItems: value.length, maxItems: value.length }
  return { type: 'object', properties: Object.fromEntries(Object.entries(value).map(([key, item]) => [key, schema(item)])), required: Object.keys(value), additionalProperties: false }
}

// Regeneration is explicit. Completed locale files are retained on an interrupted
// run; remove only the locale you intend to refresh after changing English.
function validate(expected, actual, location = 'root') {
  if (typeof expected === 'string') {
    if (typeof actual !== 'string' || !actual.trim()) throw new Error(`${location}: missing copy`)
    if (expected.startsWith('/') && expected !== actual) throw new Error(`${location}: changed route`)
    return
  }
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || expected.length !== actual.length) throw new Error(`${location}: array length`)
    expected.forEach((v, i) => validate(v, actual[i], `${location}.${i}`))
    return
  }
  if (!actual || JSON.stringify(Object.keys(expected).sort()) !== JSON.stringify(Object.keys(actual).sort())) {
    throw new Error(`${location}: changed keys`)
  }
  for (const key of Object.keys(expected)) validate(expected[key], actual[key], `${location}.${key}`)
}

if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is required')
const queue = Object.entries(languages)
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const [locale, language] = queue.shift()
    const destination = path.join(directory, `${locale}.json`)
    try {
      validate(source, JSON.parse(await fs.readFile(destination, 'utf8')))
      console.log(`${locale}: existing complete copy`)
      continue
    } catch { /* Missing or outdated shape: regenerate this locale. */ }
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_TRANSLATION_MODEL || 'gpt-5-mini',
        reasoning_effort: 'minimal',
        response_format: { type: 'json_schema', json_schema: { name: 'workflow_translation', strict: true, schema: schema(source) } },
        messages: [
          { role: 'system', content: 'Translate premium B2B software website copy for hospitality and food-service operators. Return JSON with EXACTLY the same keys, array lengths and structure. Translate every visible string including headings, buttons, related link labels, metadata, tables, questions and answers. Keep URL paths unchanged. Keep the brand names Sundae, Sundae Crew, Sundae Core, Core, Crew, Pulse, Insights, Foresight, Watchtower, Profit Recovery, Ask Sundae and Restaurant365 unchanged. Use concise native business language, no awkward English loanwords when native wording exists. The platform serves hospitality and food-service broadly; restaurant-specific pages are search entry points. AI is an embedded capability. Do not add or strengthen claims, statistics, savings, compliance guarantees, or claims about competitors. Preserve the pair of asterisks used for typographic emphasis. Never translate JSON keys.' },
          { role: 'user', content: `Translate into ${language} (${locale}):\n${JSON.stringify(source)}` },
        ],
      }),
    })
    if (!response.ok) throw new Error(`${locale}: translation API HTTP ${response.status}`)
    const result = await response.json()
    const copy = JSON.parse(result.choices?.[0]?.message?.content || '{}')
    validate(source, copy)
    await fs.writeFile(destination, `${JSON.stringify(copy, null, 2)}\n`)
    console.log(`${locale}: translated and shape-checked`)
  }
}))

// Keep the small, frequently used category/link copy out of the workflow-page
// client bundle. Full page dictionaries are only resolved by server pages.
const navigation = {}
for (const locale of ['en', ...Object.keys(languages)]) {
  const copy = JSON.parse(await fs.readFile(path.join(directory, `${locale}.json`), 'utf8'))
  const tasks = copy.pages['restaurant-task-management']
  navigation[locale] = {
    brand: copy.brand,
    links: copy.links,
    crewExample: { industry: tasks.challenges[0], sundae: tasks.description },
  }
}
await fs.writeFile(path.join(directory, 'navigation.ts'),
  `// Generated from the reviewed workflow locale files.\nexport const operatorNavigationCopy = ${JSON.stringify(navigation, null, 2)} as const\n`)
