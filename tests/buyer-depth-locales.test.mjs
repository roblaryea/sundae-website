import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { createHash } from 'node:crypto';

const locales = ['en','ar','fr','es','de','nl','pt','hi','ur','it','pl','tr','zh-Hans','ja','ko','id','vi','ro','sv','bn','th','ms'];
function validate(source, value, location) {
  if (typeof source === 'string') {
    assert.equal(typeof value, 'string', location);
    assert.ok(value.trim() && !value.includes('—'), location);
    assert.equal((value.match(/\*/g)||[]).length, (source.match(/\*/g)||[]).length, location + ': markup');
    if (source.length > 30) assert.notEqual(value, source, location + ': untranslated sentence');
    const figures = text => [...text.matchAll(/\d+(?:[.,]\d+)*/g)].map(m=>m[0]).sort();
    assert.deepEqual(figures(value), figures(source), location + ': figures');
  } else if (Array.isArray(source)) {
    assert.ok(Array.isArray(value), location); assert.equal(value.length, source.length, location);
    source.forEach((v,i)=>validate(v,value[i],`${location}.${i}`));
  } else {
    assert.deepEqual(Object.keys(value).sort(),Object.keys(source).sort(),location);
    Object.entries(source).forEach(([k,v])=>validate(v,value[k],`${location}.${k}`));
  }
}
for (const contentGroup of ['buyer-depth','buyer-feature-details','buyer-proof-labels']) {
  const directory = `src/content/${contentGroup}`;
  const source = JSON.parse(fs.readFileSync(`${directory}/en.json`,'utf8'));
  test(`${contentGroup} binds every locale to its reviewed English source`,()=>{
    const manifest=JSON.parse(fs.readFileSync(`${directory}/source-manifest.json`,'utf8'));
    assert.equal(manifest.sourceHash,createHash('sha256').update(JSON.stringify(source)).digest('hex'));
    assert.deepEqual([...manifest.locales].sort(),[...locales].sort());
    Object.entries(source).forEach(([group,english])=>{
      const copy=JSON.parse(fs.readFileSync(`${directory}/${group}.json`,'utf8'));
      assert.deepEqual(copy.en,english,group); assert.deepEqual(Object.keys(copy).sort(),[...locales].sort(),group);
    });
  });
  for(const locale of locales.filter(l=>l!=='en')) test(`${contentGroup}/${locale} preserves complete copy, markup and figures`,()=>{
    Object.entries(source).forEach(([group,english])=>{
      const copy=JSON.parse(fs.readFileSync(`${directory}/${group}.json`,'utf8'));
      validate(english,copy[locale],`${locale}.${group}`);
    });
  });
}
