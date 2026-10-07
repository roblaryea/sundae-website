import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { globSync } = require('../tooling/next-lint-glob/index.cjs');
const { getRootDirs } = require('@next/eslint-plugin-next/dist/utils/get-root-dirs');

test('directory globbing preserves literal, wildcard, brace, ignore and absolute roots', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'sundae-lint-glob-'));
  try {
    mkdirSync(join(fixture, 'apps', 'alpha'), { recursive: true });
    mkdirSync(join(fixture, 'apps', 'beta'), { recursive: true });
    mkdirSync(join(fixture, 'apps', '.hidden'), { recursive: true });
    writeFileSync(join(fixture, 'apps', 'file.txt'), 'not a directory');
    const options = { cwd: fixture, onlyDirectories: true };
    assert.deepEqual(globSync('apps/alpha', options), ['apps/alpha']);
    assert.deepEqual(globSync('apps/*', options).sort(), ['apps/alpha', 'apps/beta']);
    assert.deepEqual(globSync('apps/{alpha,beta}', options).sort(), ['apps/alpha', 'apps/beta']);
    assert.deepEqual(globSync('apps/*', { ...options, ignore: ['**/beta'] }), ['apps/alpha']);
    assert.deepEqual(globSync('apps/.hidden', options), ['apps/.hidden']);
    assert.deepEqual(globSync(join(fixture, 'apps', 'alpha'), options), [join(fixture, 'apps', 'alpha')]);
    assert.deepEqual(getRootDirs({ cwd: fixture, settings: {} }), [fixture]);
    assert.deepEqual(getRootDirs({ cwd: fixture, settings: { next: { rootDir: join(fixture, 'apps', '{alpha,beta}') } } }).sort(),
      [join(fixture, 'apps', 'alpha'), join(fixture, 'apps', 'beta')]);
    assert.deepEqual(getRootDirs({ cwd: fixture, settings: { next: { rootDir: [join(fixture, 'apps', 'alpha'), join(fixture, 'apps', 'beta')] } } }).sort(),
      [join(fixture, 'apps', 'alpha'), join(fixture, 'apps', 'beta')]);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('the installed Next plugin resolves to the narrow adapter, not vulnerable fast-glob', () => {
  const pluginRequire = createRequire(require.resolve('@next/eslint-plugin-next'));
  const resolved = pluginRequire.resolve('fast-glob');
  const pkg = JSON.parse(readFileSync(join(dirname(resolved), 'package.json'), 'utf8'));
  assert.equal(pkg.name, '@sundae/next-lint-glob');
  assert.throws(() => globSync('*', {}), /only supports directory globbing/);
});
