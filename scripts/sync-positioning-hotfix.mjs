import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

function readModule(relativePath) {
  const filePath = path.join(root, relativePath)
  const source = fs.readFileSync(filePath, 'utf8')
  const start = source.indexOf('{')
  const end = source.lastIndexOf('}')
  return {
    filePath,
    header: source.slice(0, start),
    footer: source.slice(end + 1),
    data: JSON.parse(source.slice(start, end + 1)),
  }
}

function writeModule(module) {
  fs.writeFileSync(
    module.filePath,
    `${module.header}${JSON.stringify(module.data, null, 2)}${module.footer}`,
  )
}

const positioning = readModule('src/generated-locales/positioning_recovery.ts').data

const product = readModule('src/generated-locales/app_product_page.ts')
for (const pillars of Object.values(product.data.localizedPillars)) {
  for (const index of [0, 3]) {
    if (!pillars[index]) continue
    pillars[index].stat = ''
    pillars[index].statLabel = ''
  }
}
writeModule(product)

const regional = readModule('src/generated-locales/app_solutions_regional_managers_page.ts')
for (const [locale, copy] of Object.entries(regional.data.localizedCopy)) {
  if (copy.challenges?.[1]) {
    copy.challenges[1].title = positioning[locale].critical.regionalVariationTitle
  }
}
writeModule(regional)

const architecture = readModule('src/generated-locales/app_architecture_page.ts')
for (const [locale, copy] of Object.entries(architecture.data.localizedArchitectureCopy)) {
  const safe = positioning[locale].critical
  copy.title = safe.productHeroTitle
  copy.description = safe.architectureDescription
  copy.securityDescription = `Sundae: ${safe.soc2Description}`
  if (copy.layers?.[1]) {
    copy.layers[1].title = safe.architectureProcessTitle
    copy.layers[1].description = safe.architectureProcessDescription
  }
  if (copy.steps?.[1]) {
    copy.steps[1].title = safe.architectureProcessTitle
    copy.steps[1].description = safe.architectureProcessDescription
  }
  copy.agentsTitle = safe.architectureEngineTitle
  copy.agentsDescription = safe.architectureEngineDescription
  if (copy.securityBullets?.[2]) copy.securityBullets[2].description = safe.soc2Description
  if (copy.certs?.[0]) {
    copy.certs[0].state = safe.soc2State
    copy.certs[0].stateClass = 'text-amber-600'
  }
  if (copy.engineeringCards?.[5]?.features?.[0]) {
    copy.engineeringCards[5].features[0] = safe.securityCardSoc2
  }
}
writeModule(architecture)

const speedQualityCost = readModule('src/generated-locales/components_home_sections_SectionSpeedQualityCost.ts')
for (const [locale, copy] of Object.entries(speedQualityCost.data.localizedCopy)) {
  const safe = positioning[locale].critical
  if (copy.vertices?.[1]) {
    copy.vertices[1].headline = safe.productHeroTitle
    copy.vertices[1].body = `Sundae: ${safe.productCoreDescription}`
    copy.vertices[1].chips[0] = copy.qualityMetric
  }
  if (copy.vertices?.[2]) {
    copy.vertices[2].body = `Sundae: ${safe.productCoreDescription}`
    copy.vertices[2].chips[0] = copy.costMetric
  }
}
writeModule(speedQualityCost)

const retire = readModule('src/generated-locales/components_home_sections_SectionWhatYouRetire.ts')
for (const [locale, copy] of Object.entries(retire.data.localizedCopy)) {
  if (copy.withSundae?.[2]) {
    copy.withSundae[2] = positioning[locale].critical.productCoreDescription
  }
}
writeModule(retire)

console.log('Legacy translated claims synchronized with the current positioning source.')
