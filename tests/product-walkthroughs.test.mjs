import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import test from 'node:test'

const films = JSON.parse(fs.readFileSync('src/content/product-walkthrough-media.json', 'utf8'))
const words = JSON.parse(fs.readFileSync('src/content/product-walkthroughs.json', 'utf8'))

test('the public release contains only the selected Core and Crew demonstrations', () => {
  assert.deepEqual(films.map(film => film.id), ['sales', 'action', 'attendance'])
  assert.deepEqual(films.map(film => film.family), ['Core', 'Core', 'Crew'])
  for (const film of films) {
    assert.ok(film.durationSeconds > 15 && film.durationSeconds <= 90, film.id)
    assert.ok(film.transcript.length > 0, film.id)
    for (const path of [film.source, film.poster, film.captions]) {
      assert.match(path, /^\/media\/product-walkthroughs\/[a-z0-9-]+\.(?:mp4|jpg|vtt)$/)
      assert.ok(fs.existsSync(`public${path}`), path)
    }
    assert.equal(createHash('sha256').update(fs.readFileSync(`public${film.source}`)).digest('hex'), film.sha256, film.id)
    assert.ok(fs.statSync(`public${film.source}`).size < 20 * 1024 * 1024, film.id)
    assert.ok(!film.transcript.join(' ').includes('@'), `${film.id}: contact details in transcript`)
  }
})

function seconds(stamp) {
  const [h, m, s] = stamp.split(':').map(Number)
  return h * 3600 + m * 60 + s
}

test('every public film has caption cues inside its actual running time', () => {
  for (const film of films) {
    const vtt = fs.readFileSync(`public${film.captions}`, 'utf8')
    assert.ok(vtt.startsWith('WEBVTT'), film.id)
    const timings = [...vtt.matchAll(/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/g)]
    assert.ok(timings.length >= 3, film.id)
    let previousStart = 0
    for (const [, a, b] of timings) {
      const start = seconds(a), end = seconds(b)
      assert.ok(start >= previousStart && end > start && end <= film.durationSeconds + 0.25, `${film.id}: ${a} -> ${b}`)
      previousStart = start
    }
  }
})

test('the walkthrough labels are complete and disclose English media in every site locale', () => {
  const requiredLocales = Object.keys(JSON.parse(fs.readFileSync('src/content/positioning-closer.json', 'utf8')))
  assert.deepEqual(Object.keys(words).sort(), requiredLocales.sort())
  for (const [locale, labels] of Object.entries(words)) {
    assert.deepEqual(Object.keys(labels), Object.keys(words.en), locale)
    for (const [key, text] of Object.entries(labels)) {
      assert.ok(text.trim() && !text.includes('—'), `${locale}.${key}`)
      if (locale !== 'en') assert.notEqual(text, words.en[key], `${locale}.${key}`)
    }
  }
})
