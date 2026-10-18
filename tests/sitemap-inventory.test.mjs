import assert from 'node:assert/strict'
import test from 'node:test'

import { sitemapRouteGroups, sitemapStaticRoutes } from '../src/lib/sitemapInventory.mjs'

const priorityRoutes = [
  '/product/recovery',
  '/diagnostic',
  '/faq',
  '/core',
  '/getting-started',
  '/solutions/multi-location-groups',
  '/solutions/cloud-kitchens',
  '/product/intelligence',
  '/product/benchmarking',
  '/tools/labor-cost',
  '/tools/menu-margin',
  '/tools/benchmark-readiness',
]

test('static sitemap inventory stays normalized and duplicate-free', () => {
  assert.equal(sitemapStaticRoutes.length, 54)
  assert.equal(new Set(sitemapStaticRoutes).size, sitemapStaticRoutes.length)

  for (const route of sitemapStaticRoutes) {
    assert.match(route, /^(?:|\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)$/)
    assert.equal(route.endsWith('/'), false, `route must not end with a slash: ${route}`)
  }
})

test('priority search and conversion routes remain submitted', () => {
  for (const route of priorityRoutes) {
    assert.ok(sitemapStaticRoutes.includes(route), `missing priority route: ${route}`)
  }
})

test('sitemap groups retain their expected boundaries', () => {
  assert.equal(sitemapRouteGroups.core.length, 21)
  assert.equal(sitemapRouteGroups.product.length, 9)
  assert.equal(sitemapRouteGroups.crew.length, 6)
  assert.equal(sitemapRouteGroups.solutions.length, 10)
  assert.equal(sitemapRouteGroups.tools.length, 8)
})
