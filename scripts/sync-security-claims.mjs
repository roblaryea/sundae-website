import fs from 'node:fs'
import ts from 'typescript'

// Reviewed localized claims are shared by security, architecture and home copy.
const claims = JSON.parse(fs.readFileSync('src/lib/security-claims.json', 'utf8'))
const checkOnly = process.argv.includes('--check')
function editLiteral(file, name, edit) {
  const source = fs.readFileSync(file, 'utf8')
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  let declaration
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === name) declaration = node
    ts.forEachChild(node, visit)
  }
  visit(ast)
  if (!declaration?.initializer) throw new Error(`Missing ${name} in ${file}`)
  const initializer = declaration.initializer
  const js = ts.transpileModule(`exports.value = ${initializer.getText(ast)}`, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText
  const result = {}
  new Function('exports', js)(result)
  edit(result.value)
  const replacements = []
  function reconcile(node, value) {
    if (ts.isAsExpression(node)) return reconcile(node.expression, value)
    if (ts.isObjectLiteralExpression(node)) {
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property)) reconcile(property.initializer, value[property.name.text])
      }
      return
    }
    if (ts.isArrayLiteralExpression(node) && Array.isArray(value) && node.elements.length === value.length) {
      node.elements.forEach((item, i) => reconcile(item, value[i]))
      return
    }
    if (ts.isStringLiteral(node) && node.text === value) return
    if (ts.isNumericLiteral(node) && Number(node.text) === value) return
    if (node.kind === ts.SyntaxKind.TrueKeyword && value === true) return
    if (node.kind === ts.SyntaxKind.FalseKeyword && value === false) return
    replacements.push({ start: node.getStart(ast), end: node.end, text: JSON.stringify(value) })
  }
  reconcile(initializer, result.value)
  let updated = source
  for (const r of replacements.sort((a, b) => b.start - a.start)) updated = updated.slice(0, r.start) + r.text + updated.slice(r.end)
  if (checkOnly) {
    if (updated !== source) throw new Error(`Security claim drift: ${file}; run npm run security:sync-claims`)
  } else fs.writeFileSync(file, updated)
}
function updateSecurity(locales) {
  for (const [locale, copy] of Object.entries(locales)) {
    const c = claims[locale]
    if (!c || c.length !== 13) throw new Error(`Incomplete security claims: ${locale}`)
    copy.title = c[0]; copy.description = c[1]; copy.complianceTitle = c[2]; copy.ctaDescription = c[1]
    copy.pillars.forEach((pillar, i) => { pillar.description = c[i + 3] })
    copy.compliance.forEach((item, i) => { item.description = c[i + 9] })
  }
}
function updateArchitecture(locales) {
  for (const [locale, copy] of Object.entries(locales)) {
    const c = claims[locale]
    copy.securityDescription = c[10]
    copy.securityBullets[0].title = c[0]
    copy.securityBullets[0].description = c[3]
    copy.securityBullets[1].description = c[5]
    copy.securityBullets[2].description = c[10]
    // Framework names are not compliance certificates; do not render compliant badges.
    copy.certs = copy.certs.slice(0, 1)
    const last = copy.engineeringCards.at(-1)
    last.features = [c[0], copy.securityBullets[1].title, copy.securityBullets[2].title]
  }
}
editLiteral('src/app/security/page.tsx', 'securityCopy', updateSecurity)
editLiteral('src/generated-locales/app_security_page.ts', 'generatedLocalCopy', (v) => updateSecurity(v.securityCopy))
editLiteral('src/app/architecture/page.tsx', 'localizedArchitectureCopy', updateArchitecture)
editLiteral('src/generated-locales/app_architecture_page.ts', 'generatedLocalCopy', (v) => updateArchitecture(v.localizedArchitectureCopy))
editLiteral('src/generated-locales/positioning_recovery.ts', 'positioningCopy', (locales) => {
  for (const [locale, copy] of Object.entries(locales)) {
    copy.critical.soc2Description = claims[locale][10]
    copy.critical.securityCardSoc2 = claims[locale][0]
  }
})
editLiteral('src/components/home/sections/SectionTrustStrip.tsx', 'localizedCopy', (locales) => {
  for (const [locale, copy] of Object.entries(locales)) copy.headline = claims[locale][0]
})
editLiteral('src/generated-locales/components_home_sections_SectionTrustStrip.ts', 'generatedLocalCopy', (v) => {
  for (const [locale, copy] of Object.entries(v.localizedCopy)) copy.headline = claims[locale][0]
})
