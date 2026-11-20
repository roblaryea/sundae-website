import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
import ts from 'typescript';

const directory = 'src/content/buyer-clarity';
const english = JSON.parse(fs.readFileSync(`${directory}/en.json`, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(`${directory}/source-manifest.json`, 'utf8'));
const locales = ['en', 'ar', 'fr', 'es', 'de', 'nl', 'pt', 'hi', 'ur', 'it', 'pl', 'tr', 'zh-Hans', 'ja', 'ko', 'id', 'vi', 'ro', 'sv', 'bn', 'th', 'ms'];

test('every published locale belongs to the same reviewed English cut', () => {
  assert.equal(manifest.sourceHash, createHash('sha256').update(JSON.stringify(english)).digest('hex'));
  assert.deepEqual([...manifest.locales].sort(), [...locales].sort());
  for (const [group, source] of Object.entries(english)) {
    const copy = JSON.parse(fs.readFileSync(`${directory}/${group}.json`, 'utf8'));
    assert.deepEqual(Object.keys(copy).sort(), [...locales].sort(), group);
    assert.deepEqual(copy.en, source, group);
  }
});

function checkCopy(source, value, location) {
  if (typeof source === 'string') {
    assert.equal(typeof value, 'string', location);
    assert.ok(value.trim() && !value.includes('—'), location);
    if (source.length > 30) assert.notEqual(value, source, `${location}: untranslated prose`);
    const figures = text => [...text.matchAll(/\d+(?:[.,]\d+)*/g)].map(match => match[0]).sort();
    assert.deepEqual(figures(value), figures(source), `${location}: changed figures`);
  } else if (Array.isArray(source)) {
    assert.equal(value.length, source.length, location);
    source.forEach((item, index) => checkCopy(item, value[index], `${location}.${index}`));
  } else {
    assert.deepEqual(Object.keys(value).sort(), Object.keys(source).sort(), location);
    for (const key of Object.keys(source)) checkCopy(source[key], value[key], `${location}.${key}`);
  }
}
for (const locale of locales.filter(locale => locale !== 'en')) {
  test(`${locale} preserves the example figures and complete evidence/buyer copy`, () => {
    for (const [group, source] of Object.entries(english)) {
      const copy = JSON.parse(fs.readFileSync(`${directory}/${group}.json`, 'utf8'));
      checkCopy(source, copy[locale], `${locale}.${group}`);
    }
  });
}

const cache = new Map();
function load(filename) {
  if (cache.has(filename)) return cache.get(filename);
  const loadedModule = { exports: {} };
  cache.set(filename, loadedModule.exports);
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText, { module: loadedModule, exports: loadedModule.exports, require: specifier => {
    assert.ok(specifier.startsWith('@/'), specifier);
    const target = path.join('src', specifier.slice(2));
    if (target.endsWith('.json')) return { default: JSON.parse(fs.readFileSync(target, 'utf8')) };
    return load(target + '.ts');
  } });
  cache.set(filename, loadedModule.exports);
  return loadedModule.exports;
}
const { getCustomerStories, customerStoryIds } = load('src/content/customer-stories.ts');

test('customer-story extraction preserves all four existing English outcome sets', () => {
  const actual = JSON.parse(JSON.stringify(getCustomerStories('en').map(story => story.outcomes.map(outcome => outcome.value))));
  assert.deepEqual(actual, [
    ['5%', '+12%', '3x faster'],
    ['+3.2%', 'Early', 'Real-time'],
    ['8 platforms', '48hrs faster', '+6%'],
    ['+2.3%', 'Days → Hours', '+4%'],
  ]);
});

test('Resources and results reuse stable localized stories without English body fallbacks', () => {
  const original = getCustomerStories('en');
  for (const locale of locales) {
    const stories = getCustomerStories(locale);
    assert.deepEqual(JSON.parse(JSON.stringify(stories.map(story => story.id))), JSON.parse(JSON.stringify(customerStoryIds)));
    assert.equal(stories.length, 4, locale);
    if (locale !== 'en') stories.forEach((story, index) => assert.notEqual(story.description, original[index].description, `${locale}/${story.id}`));
  }
  const resources = fs.readFileSync('src/app/resources/page.tsx', 'utf8');
  assert.ok(resources.includes("local('/results')"));
  assert.ok(!resources.includes('type="email"'), 'no dead newsletter form');
  assert.ok(!resources.includes('study.outcomes'), 'complete stories have one destination');
});


test('each customer story keeps its product scope and has native capability labels', () => {
  const expectedProducts = [
    ['Sundae Core', 'Sundae Core', 'Benchmarks'],
    ['Sundae Core', 'Sundae Core', 'Benchmarks'],
    ['Sundae Core', 'Sundae Core', 'Sundae Core'],
    ['Watchtower', 'Benchmarks', 'Sundae Core'],
  ];
  const englishSolutions = JSON.parse(JSON.stringify(getCustomerStories('en').map(story => story.solution)));
  for (const locale of locales) {
    const stories = getCustomerStories(locale);
    assert.equal(stories.length, 4);
    stories.forEach((story, index) => {
      assert.equal(story.solution.length, 3);
      story.solution.forEach((line, column) => {
        assert.ok(line.startsWith(`${expectedProducts[index][column]} · `), `${locale}/${story.id}: capability scope`);
        if (locale !== 'en') assert.notEqual(line, englishSolutions[index][column], `${locale}/${story.id}: English capability fallback`);
      });
    });
  }
});
