import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'
import assert from 'node:assert/strict'
const root=process.cwd()
const base=process.env.SMOKE_BASE_URL||'http://localhost:3104'
const stories=JSON.parse(await fs.readFile(`${root}/src/content/platform-story.json`,'utf8'))
const corePaths=['/product/pulse','/product/benchmarking','/product/watchtower','/product/insights','/product/intelligence','/product/foresight','/product/recovery']
const browser=await chromium.launch();const results=[]
try {
 for(const locale of Object.keys(stories)) {
  const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'})
  await context.addCookies([{name:'sundae_cookie_consent',value:'declined',url:base}])
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));const prefix=locale==='en'?'':`/${locale}`
  for(const path of ['/','/product','/why-sundae','/core','/crew','/product/watchtower']) {
   const route=`${prefix}${path==='/'?'':path}`||'/';const response=await page.goto(`${base}${route}`,{waitUntil:'domcontentloaded'})
   await page.locator('h1').waitFor();assert.equal(response.status(),200,route)
   if(['/', '/product','/why-sundae'].includes(path)) {
    const products=page.locator('main [data-platform-offerings]');assert.equal(await products.count(),1,route)
    assert.deepEqual(await products.locator('[data-offering]').evaluateAll(nodes=>nodes.map(n=>n.dataset.offering)),['core','crew'],route)
    assert.equal(await products.locator('[data-offering="core"] h3').innerText(),stories[locale].coreRole)
    assert.equal(await products.locator('[data-offering="crew"] h3').innerText(),stories[locale].crewRole)
    assert.equal(await products.locator('[data-offering="crew"] a[href$="/crew/payroll"]').count(),1)
    assert.equal(await products.locator('[data-offering="core"] a[href$="/crew/payroll"]').count(),0)
    for(const capability of corePaths)assert.equal(await products.locator(`[data-offering="core"] a[href="${prefix}${capability}"]`).count(),1,`${route} ${capability}`)
   }
   if(path==='/'){const graph=JSON.parse(await page.locator('#sundae-global-structured-data').textContent())['@graph'];const platform=graph.find(item=>item.name==='Sundae'&&item['@type']==='SoftwareApplication');assert.equal(platform.hasPart.length,2);assert.ok(platform.hasPart.some(item=>item['@id'].endsWith('/core#software')));assert.ok(platform.hasPart.some(item=>item['@id'].endsWith('/crew#software')))}
   if(path==='/why-sundae') {assert.equal(await page.locator('[data-choice-reason]').count(),3);assert.ok((await page.locator('[data-choice-reasons]').innerText()).includes(stories[locale].measureReason));assert.notEqual(await page.locator('[data-choice-reasons] a[href$="/product/recovery"]').innerText(),'Sundae Crew')}
   if(path==='/product/watchtower') assert.equal(await page.getByRole('heading',{name:stories[locale].watchtowerTitle,exact:true}).count(),1)
   const body=await page.locator('main').innerText();assert.ok(!/Two substrates|DECISION SUBSTRATE|WORKFORCE SUBSTRATE|Only Platform That Sees Both Sides|Every rival|Only Sundae measures|Crew Pay · 36\+ ISO/.test(body),route)
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),route)
   assert.equal(new URL(await page.locator('link[rel="canonical"]').getAttribute('href')).pathname,route)
   results.push({route,status:response.status()})
  }
  await page.locator('button[aria-haspopup="true"]').first().click()
  const groups=page.locator('[data-desktop-product-groups]');await groups.waitFor({state:'visible'})
  assert.equal(await groups.locator('[data-nav-offering]').count(),2)
  for(const capability of corePaths){assert.equal(await groups.locator(`[data-nav-offering="core"] a[href="${prefix}${capability}"]`).count(),1,`${locale} menu ${capability}`);assert.ok(await page.locator(`footer a[href="${prefix}${capability}"]`).count(),`${locale} footer ${capability}`)}
  assert.deepEqual(await groups.locator('a div').evaluateAll(nodes=>nodes.filter(n=>n.scrollWidth>n.clientWidth+1).map(n=>n.textContent)),[],`${locale}: menu labels overflow`)
  for(const name of ['core','crew']){const link=groups.locator(`[data-nav-offering="${name}"] > a`);const r=await link.boundingBox();assert.ok(r&&r.x>=0&&r.x+r.width<=1441&&r.y+r.height<=900);assert.equal(await link.getAttribute('href'),`${prefix}/${name}`)}
  await page.keyboard.press('Escape');await page.setViewportSize({width:390,height:844})
  await page.locator('button[aria-controls="mobile-menu"]').click()
  for(const name of ['core','crew']) {
   const group=page.locator(`[data-mobile-nav-offering="${name}"]`);await group.waitFor({state:'visible'})
   assert.equal(await group.locator(`a[href="${prefix}/${name}"]`).count(),1)
   const toggle=page.locator(`#accordion-header-${name}`);assert.equal(await toggle.getAttribute('aria-expanded'),'false');await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true');assert.equal(await page.locator(`#accordion-content-${name}`).getAttribute('inert'),null)
   if(name==='crew')assert.equal(await group.locator(`a[href="${prefix}/crew/payroll"]`).count(),1)
   await toggle.click();assert.notEqual(await page.locator(`#accordion-content-${name}`).getAttribute('inert'),null)
  }
  assert.deepEqual(errors,[],locale);await context.close()
 }
 await fs.mkdir(`${root}/output/seo`,{recursive:true});await fs.writeFile(`${root}/output/seo/platform-hierarchy-${base.includes('localhost')?'local':'production'}.json`,JSON.stringify({base,checkedAt:new Date().toISOString(),routes:results.length,locales:Object.keys(stories).length,results},null,2))
 console.log(`${results.length} portfolio routes and 22 desktop/mobile navigation journeys passed.`)
} finally {await browser.close()}
