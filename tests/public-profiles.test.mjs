import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadPublicProfile } from '../src/lib/publicProfileClient.ts'
const person = { handle:'mark',active:true,givenName:'Mark',familyName:'Curfs',title:'Strategic Operating Partner',company:'Sundae Technologies Inc.',phone:'+31641509255',phoneDisplay:'+31 6 41 50 92 55',email:'mark@sundaetech.ai',website:'https://www.sundae.io',city:'Amsterdam',countryCode:'NL',linkedin:'https://www.linkedin.com/in/markcurfs/' }
test('runtime directory: whitelisted profile, tombstone, missing handle and unavailable service', async t => {
  const original=globalThis.fetch
  t.after(()=>{globalThis.fetch=original})
  let options
  globalThis.fetch=async (url,init)=>{options=init;assert.ok(url.endsWith('/team-profiles/mark'));return Response.json({profile:{...person,ownerAdminId:99,internalToken:'never-public'}})}
  const profile=await loadPublicProfile('mark')
  assert.equal(profile.email,person.email)
  assert.equal(profile.ownerAdminId,undefined)
  assert.equal(profile.internalToken,undefined)
  assert.equal(options.cache,'no-store')
  globalThis.fetch=async()=>Response.json({profile:{handle:'mark',active:false}})
  assert.equal((await loadPublicProfile('mark')).active,false)
  globalThis.fetch=async()=>new Response('',{status:404})
  assert.equal(await loadPublicProfile('mark'),undefined)
  globalThis.fetch=async()=>new Response('',{status:503})
  await assert.rejects(()=>loadPublicProfile('mark'),/unavailable/)
})
test('runtime directory rejects mismatched identity and unsafe public links',async t=>{
  const original=globalThis.fetch;t.after(()=>{globalThis.fetch=original})
  for(const override of [{handle:'other'},{website:'javascript:alert(1)'},{linkedin:'https://evil.example/in/mark'},{givenName:'Mark\r\nEMAIL:evil@example.com'}]){
    globalThis.fetch=async()=>Response.json({profile:{...person,...override}})
    await assert.rejects(()=>loadPublicProfile('mark'))
  }
})
