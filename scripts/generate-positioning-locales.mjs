import fs from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const outputPath = path.join(root, 'src/generated-locales/positioning_recovery.ts')
const apiKey = process.env.OPENAI_API_KEY
const model = process.env.OPENAI_TRANSLATION_MODEL || 'gpt-5-mini'

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is required to refresh positioning locales')
}

const English = {
  critical: {
    productHeroTitle: 'One auditable recovery loop.',
    productCoreDescription:
      'One operating picture across revenue, labour, cost and guests. Choose the Core package that matches the decisions, speed and operating depth your team needs.',
    regionalVariationTitle: 'Performance changes by shift and location',
    architectureDescription:
      'See how Sundae turns connected food-service data into governed decisions, owned actions and measured profit recovery across five architectural layers.',
    architectureProcessTitle: 'Governed decisioning',
    architectureProcessDescription:
      'Rules, models and source-cited reasoning turn a signal into a decision an operator can inspect and act on.',
    architectureEngineTitle: 'Decision and measurement engine',
    architectureEngineDescription:
      'Specialised services detect, rank, route and measure each recovery decision while keeping the evidence attached.',
    soc2Description:
      'SOC 2 Type II certification is in progress. GDPR and CCPA controls remain part of Sundae\'s security programme.',
    soc2State: 'In progress',
    securityCardSoc2: 'SOC 2 Type II programme in progress',
    cSuiteMetaTitle: 'Sundae for CEOs and Owners - Measured Profit Recovery Across the Portfolio',
    cSuiteMetaDescription:
      'See where portfolio margin is leaking, give each fix to an accountable operator, and measure what came back against a baseline.',
    whyMetaDescription:
      'Detection is table stakes. Sundae connects the evidence, owner, action and measured outcome so multi-location food-service teams can prove what came back.',
    demoMetaTitle: 'Book a Sundae Profit-Recovery Working Session',
    demoMetaDescription:
      'Use your own food-service data to inspect a margin leak, the evidence behind it, the accountable action and how recovery will be measured.',
    demoTitle: '30 minutes. One real leak. A measurable next move.',
    demoDescription:
      'Bring your operation. We will inspect where margin may be leaking, open the evidence, route the next move and show how Sundae measures what comes back.',
    demoRequestDescription:
      'Tell us about your operation so we can prepare the right recovery working session for your priorities.',
    demoWhatTitle: 'Follow one recovery decision end to end',
    demoWhatDescription:
      'See the signal, the source evidence, the accountable action and the measurement contract in one governed loop.',
    crewExecutionEyebrow: 'THE EXECUTION LAYER',
    crewExecutionTitle: 'A recovery decision only matters when someone owns the work.',
    crewExecutionDescription:
      'Crew gives each accepted recovery decision one accountable owner, one tracked task and a completion signal that starts measurement.',
    integrationsProofEyebrow: 'WHY CONNECTION QUALITY MATTERS',
    integrationsProofTitle: 'A recovered-value claim is only as strong as the records behind it.',
    integrationsProofDescription:
      'Sundae monitors whether the evidence window arrived completely and, for supported sources, rechecks the frozen calculation against the current source records.',
  },
  recovery: {
    badge: 'Closed-loop profit recovery',
    title: 'Finding the money is the easy part.',
    titleAccent: 'Proving you got it back is the product.',
    description:
      'Most tools stop at the flag. Sundae opens the evidence, gives the work to one accountable owner, freezes the baseline and measures what came back.',
    ctaPrimary: 'Book a working session',
    ctaSecondary: 'See how Sundae Core fits',
    stagesEyebrow: 'THE LOOP',
    stagesTitle: 'Five steps. None of them end at a dashboard.',
    stages: [
      {
        step: '01',
        name: 'Detect',
        line: 'Fourteen detectors read real operating data. When the evidence is not there, Sundae abstains instead of inventing an opportunity.',
      },
      {
        step: '02',
        name: 'Decide',
        line: 'Every opportunity carries its value, source, scope and evidence so the operator can accept it, decline it or inspect it further.',
      },
      {
        step: '03',
        name: 'Execute',
        line: 'One accepted decision becomes exactly one task for one named owner, with no duplicate action chasing the same leak.',
      },
      {
        step: '04',
        name: 'Measure',
        line: 'Completion freezes the applicable baseline, starts the measurement window and shows when the result is due.',
      },
      {
        step: '05',
        name: 'Learn',
        line: 'Measured outcomes feed What Works, graded by evidence strength, so the next recommendation learns from your operation.',
      },
    ],
    proofEyebrow: 'PROOF HEALTH',
    proofTitle: 'Four questions every recovery claim should survive.',
    proofDescription:
      'Sundae does not hide the weak parts of the loop. It shows whether work closes, whether the evidence is complete and whether the amount still ties back.',
    proofItems: [
      {
        label: 'Loop Health',
        question: 'Did the process close?',
        answer: 'See detected-to-measured close-rate, source performance, abstain reasons and the weekly trend.',
      },
      {
        label: 'Evidence health',
        question: 'Did the full dataset arrive?',
        answer: 'Connector-backed evidence is certified only when the whole evidence window arrives without gaps.',
      },
      {
        label: 'Reconciliation',
        question: 'Does the amount still tie?',
        answer: 'Supported sources are rechecked against live records and show reconciled, records changed or unavailable.',
      },
      {
        label: 'Value',
        question: 'Did measured recovery cover the cost?',
        answer: 'Measured recovered value is compared with Sundae\'s list subscription cost without mixing in estimates.',
      },
    ],
    briefAlt:
      'Sundae profit-recovery brief showing estimated opportunity value, measured recovery, owners and evidence status',
    decisionsAlt:
      'Sundae recovery decisions ranked by value with outlet, owner, source, baseline and current status',
    proofAlt:
      'Sundae What Works view showing measured outcomes and evidence strength by intervention',
    honestyEyebrow: 'THE LIMITS',
    honestyTitle: 'What Sundae will not do.',
    honesty: [
      {
        title: 'It will not call an estimate recovered.',
        body: 'Identified value remains an estimate. Recovered value is counted only after the work is completed and the result is measured.',
      },
      {
        title: 'It will not give incomplete evidence a green badge.',
        body: 'Missing connector telemetry stays unverified or incomplete. A recent calculation is not treated as proof of a complete dataset.',
      },
      {
        title: 'It will not silently preserve a changed number.',
        body: 'Where source reconciliation is supported, changed records are surfaced without rewriting the historical calculation.',
      },
    ],
    ctaTitle: 'Bring one real operating question.',
    ctaDescription:
      'We will follow it from signal to evidence, owner, action and measurement - and tell you when the data cannot support a claim.',
  },
}

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

function assertShape(expected, actual, location = 'root') {
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || actual.length !== expected.length) {
      throw new Error(`${location}: expected an array of length ${expected.length}`)
    }
    expected.forEach((item, index) => assertShape(item, actual[index], `${location}[${index}]`))
    return
  }
  if (expected && typeof expected === 'object') {
    if (!actual || typeof actual !== 'object' || Array.isArray(actual)) {
      throw new Error(`${location}: expected an object`)
    }
    const expectedKeys = Object.keys(expected).sort()
    const actualKeys = Object.keys(actual).sort()
    if (JSON.stringify(expectedKeys) !== JSON.stringify(actualKeys)) {
      throw new Error(`${location}: keys do not match`)
    }
    for (const key of expectedKeys) assertShape(expected[key], actual[key], `${location}.${key}`)
    return
  }
  if (typeof actual !== 'string') throw new Error(`${location}: expected a string`)
}

async function transcreate(locale, language) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You transcreate premium B2B food-service software copy for operators. Return JSON only. Preserve the exact object structure, keys, arrays and array lengths. Do not add claims or numbers. Keep the product names Sundae, Sundae Core, Sundae Crew, Loop Health, Value, What Works, SOC 2 Type II, GDPR and CCPA unchanged. Keep copy concise, natural and operator-friendly. AI is infrastructure, never the headline. Translate UI actions naturally. Preserve the step strings 01-05.',
        },
        {
          role: 'user',
          content: `Transcreate this English JSON into ${language} (${locale}). Use the language's native punctuation and business tone.\n\n${JSON.stringify(English)}`,
        },
      ],
    }),
  })
  if (!response.ok) throw new Error(`${locale}: OpenAI returned ${response.status}`)
  const payload = await response.json()
  const content = payload.choices?.[0]?.message?.content
  if (!content) throw new Error(`${locale}: empty model response`)
  const translated = JSON.parse(content)
  assertShape(English, translated, locale)
  return translated
}

const entries = [['en', English]]
for (const [locale, language] of Object.entries(localeNames)) {
  process.stdout.write(`Transcreating ${locale} (${language})... `)
  const translated = await transcreate(locale, language)
  entries.push([locale, translated])
  console.log('done')
}

const output = Object.fromEntries(entries)
const source = `// AUTO-GENERATED by scripts/generate-positioning-locales.mjs.\n// Review English first, then regenerate all locales together.\n\nexport const positioningCopy = ${JSON.stringify(output, null, 2)} as const\n`

await fs.writeFile(outputPath, source, 'utf8')
console.log(`Wrote ${path.relative(root, outputPath)}`)
