import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const require = createRequire(import.meta.url);
function load(file, globals = {}, imports = {}) {
  const loadedModule = { exports: {} };
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  vm.runInNewContext(code, { ...globals, module: loadedModule, exports: loadedModule.exports, require: name => imports[name] || require(name) });
  return loadedModule.exports;
}

function environment({ cookie = '', local = null, hostname = 'www.sundae.io', blockedLocal = false, blockedCookie = false } = {}) {
  let savedCookie = cookie, savedLocal = local;
  const document = {};
  Object.defineProperty(document, 'cookie', {
    get() { if (blockedCookie) throw new Error('restricted'); return savedCookie; },
    set(value) { if (blockedCookie) throw new Error('restricted'); savedCookie = value; },
  });
  return { document, location: { hostname, protocol: 'https:' }, localStorage: {
    getItem() { if (blockedLocal) throw new Error('restricted'); return savedLocal; },
    setItem(key, value) { if (blockedLocal) throw new Error('restricted'); savedLocal = value; },
  }, read: () => ({ cookie: savedCookie, local: savedLocal }) };
}

test('the newer shared theme wins over an older origin-local choice', () => {
  const env = environment({ cookie: 'sundae_cookie_consent=declined; sundae_theme=light', local: 'dark' });
  assert.equal(load('src/lib/themePreference.ts', env).readThemePreference(), 'light');
});

test('invalid shared values preserve a valid local choice and first visits stay dark', () => {
  assert.equal(load('src/lib/themePreference.ts', environment({ cookie: 'sundae_theme=lightish', local: 'light' })).readThemePreference(), 'light');
  assert.equal(load('src/lib/themePreference.ts', environment()).readThemePreference(), 'dark');
});

test('restricted storage does not stop preference selection or persistence', () => {
  assert.equal(load('src/lib/themePreference.ts', environment({ cookie: 'sundae_theme=light', blockedLocal: true })).readThemePreference(), 'light');
  assert.equal(load('src/lib/themePreference.ts', environment({ local: 'light', blockedCookie: true })).readThemePreference(), 'light');
  const env = environment({ blockedLocal: true });
  load('src/lib/themePreference.ts', env).writeThemePreference('light');
  assert.match(env.read().cookie, /^sundae_theme=light;.*Domain=\.sundae\.io.*Secure$/);
});

test('the public preference is shared only within the real Sundae domain', () => {
  for (const hostname of ['sundae.io', 'www.sundae.io', 'pricing.sundae.io']) {
    const env = environment({ hostname });
    load('src/lib/themePreference.ts', env).writeThemePreference('dark');
    assert.match(env.read().cookie, /Domain=\.sundae\.io/);
  }
  for (const hostname of ['localhost', '127.0.0.1', 'sundae.io.example.test']) {
    const env = environment({ hostname });
    load('src/lib/themePreference.ts', env).writeThemePreference('light');
    assert.doesNotMatch(env.read().cookie, /Domain=/);
  }
});

test('the actual pre-hydration script matches the provider preference after other cookies', () => {
  for (const settings of [
    { cookie: 'other=x; sundae_theme=light', local: 'dark' },
    { cookie: 'other=x; sundae_theme=dark', local: 'light' },
    { local: 'light', blockedCookie: true },
    { cookie: 'sundae_theme=light', blockedLocal: true },
  ]) {
    const env = environment(settings), theme = load('src/lib/themePreference.ts', env);
    let isLight = false;
    env.document.documentElement = { classList: { toggle(name, enabled) { assert.equal(name, 'light'); isLight = enabled; } } };
    const provider = load('src/components/ui/ThemeProvider.tsx', env, { '@/lib/themePreference': theme });
    vm.runInNewContext(provider.ThemeScript().props.dangerouslySetInnerHTML.__html, env);
    assert.equal(isLight, theme.readThemePreference() === 'light');
  }
});
