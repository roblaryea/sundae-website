import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import test from 'node:test'
import ts from 'typescript'

// Exercise the actual message merge: generated locale arrays previously restored retired products.
const loaded = new Map()
function load(file) {
  file = path.resolve(file)
  if (loaded.has(file)) return loaded.get(file)
  if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'))
  const compiledModule = { exports: {} }
  loaded.set(file, compiledModule.exports)
  const requireLocal = specifier => {
    let target = specifier.startsWith('@/') ? path.resolve('src', specifier.slice(2)) : path.resolve(path.dirname(file), specifier)
    if (!path.extname(target)) target += '.ts'
    return load(target)
  }
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
  }).outputText, { module: compiledModule, exports: compiledModule.exports, require: requireLocal, Intl, URL }, { filename: file })
  return compiledModule.exports
}
const { getWebsiteMessages, websiteLocales } = load('src/lib/i18n.ts')
for (const locale of websiteLocales) test(`${locale}: pricing entries retain current product identities after translation overrides`, () => {
  const plans = getWebsiteMessages(locale).navbar.plansList
  assert.deepEqual(Array.from(plans, entry => entry.href), ['/core', '/crew', '/product/foresight'])
  assert.deepEqual(Array.from(plans, entry => entry.name), ['Sundae Core', 'Sundae Crew', 'Foresight & Action'])
  assert.ok(plans.every(entry => typeof entry.description === 'string' && entry.description.trim()))
  assert.ok(plans.every(entry => !/Sundae Report/i.test(entry.name)))
})
