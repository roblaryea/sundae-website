import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import test from 'node:test'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const events = []
const sandbox = {
  exports: {},
  require: (name) => name === '@/lib/cta' ? { trackCta: (label, metadata) => events.push({ label, metadata }) } : require(name),
}
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/components/ui/Button.tsx', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText, sandbox)
const { Button } = sandbox.exports

for (const mode of ['button', 'link']) {
  test(`${mode}: labeled action records one CTA and preserves its click handler`, () => {
    events.length = 0
    let clicks = 0
    const metadata = { destination: '/fr/demo', source_page: '/fr/crew' }
    const element = Button({ children: 'Voir la démo', trackingLabel: 'crew_demo', trackingMetadata: metadata, onClick: () => clicks++, ...(mode === 'link' ? { href: '/fr/demo' } : {}) })
    assert.equal(element.type, mode === 'link' ? 'a' : 'button')
    element.props.onClick({})
    assert.equal(clicks, 1)
    assert.equal(events.length, 1)
    assert.equal(events[0].label, 'crew_demo')
    assert.equal(events[0].metadata, metadata)
  })
}
test('unlabeled action does not create a synthetic conversion event', () => {
  events.length = 0
  Button({ children: 'Action' }).props.onClick()
  assert.equal(events.length, 0)
})
