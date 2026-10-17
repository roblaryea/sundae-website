import assert from "node:assert/strict";
import test from "node:test";

import {
  CONSENT_TEXT_EN,
  CONSENT_VERSION,
  MAX_FORM_AGE_MS,
  MIN_FILL_MS,
  buildLeadPayload,
  parseConnectSubmission,
  splitTemplate,
} from "../src/lib/profileConnect.ts";
import { PROFILE_CARD_COPY_KEYS, profileCardCopy } from "../src/lib/profileCardCopy.ts";

const NOW = 1_800_000_000_000;
const opts = { now: NOW, knownHandles: ["robert"] };
const valid = () => ({
  handle: "robert",
  name: "Ada Lovelace",
  email: "Ada@Example.com",
  phone: "+44 20 7946 0958",
  company: "Analytical Engines Ltd",
  note: "Met at the summit.",
  consent: true,
  website: "",
  startedAt: NOW - 20_000,
});
const robert = { handle: "robert", givenName: "Robert", familyName: "Laryea", email: "robert@sundaetech.ai" };

test("accepts a valid submission and normalises it", () => {
  const result = parseConnectSubmission(valid(), opts);
  assert.equal(result.kind, "ok");
  assert.equal(result.data.email, "ada@example.com");
  assert.equal(result.data.name, "Ada Lovelace");
});

test("only name, email and consent are required", () => {
  const result = parseConnectSubmission({ ...valid(), phone: "", company: "", note: "" }, opts);
  assert.equal(result.kind, "ok");
  assert.equal(result.data.phone, "");
});

test("rejects missing consent, bad email, short name, unknown handle, bad phone", () => {
  const cases = [
    [{ consent: false }, "consent"],
    [{ consent: "yes" }, "consent"],
    [{ email: "not-an-email" }, "email"],
    [{ email: "a@b" }, "email"],
    [{ name: "A" }, "name"],
    [{ handle: "someone-else" }, "handle"],
    [{ phone: "abc" }, "phone"],
    [{ phone: "123" }, "phone"],
    [{ note: "x".repeat(1001) }, "note"],
    [{ company: "x".repeat(121) }, "company"],
  ];
  for (const [patch, field] of cases) {
    const result = parseConnectSubmission({ ...valid(), ...patch }, opts);
    assert.equal(result.kind, "invalid", JSON.stringify(patch));
    assert.ok(result.fields.includes(field), `${JSON.stringify(patch)} should flag ${field}, got ${result.fields}`);
  }
});

test("bots are ignored silently: honeypot filled, too fast, or stale form", () => {
  assert.equal(parseConnectSubmission({ ...valid(), website: "http://spam.example" }, opts).kind, "ignored");
  assert.equal(parseConnectSubmission({ ...valid(), startedAt: NOW - (MIN_FILL_MS - 1) }, opts).kind, "ignored");
  assert.equal(parseConnectSubmission({ ...valid(), startedAt: NOW - MAX_FORM_AGE_MS - 1 }, opts).kind, "ignored");
  assert.equal(parseConnectSubmission({ ...valid(), startedAt: "now" }, opts).kind, "ignored");
  assert.equal(parseConnectSubmission({ ...valid(), startedAt: undefined }, opts).kind, "ignored");
});

test("non-object bodies are invalid, never throw", () => {
  for (const body of [null, undefined, "x", 5, []]) {
    const result = parseConnectSubmission(body, opts);
    assert.ok(["invalid", "ignored"].includes(result.kind));
  }
});

test("control characters are stripped and non-strings are rejected", () => {
  const result = parseConnectSubmission({ ...valid(), name: "Ada\u0000 Love\u0007lace" }, opts);
  assert.equal(result.data.name, "Ada Lovelace");
  assert.equal(parseConnectSubmission({ ...valid(), name: { $ne: "" } }, opts).kind, "invalid");
});

test("lead payload carries source, owner and consent evidence for the CRM", () => {
  const data = parseConnectSubmission(valid(), opts).data;
  const payload = buildLeadPayload(robert, data, { locale: "ar", referrer: "https://www.sundae.io/robert", at: new Date("2026-10-17T10:00:00Z") });
  assert.equal(payload.fullName, "Ada Lovelace");
  assert.equal(payload.email, "ada@example.com");
  assert.equal(payload.sourcePage, "/robert");
  assert.equal(payload.ctaLabel, "Profile card: Robert Laryea");
  assert.equal(payload.locale, "ar");
  assert.equal(payload.company, "Analytical Engines Ltd");
  assert.equal(payload.message, "Met at the summit.");
  assert.deepEqual(payload.metadata.consent, { given: true, version: CONSENT_VERSION, text: CONSENT_TEXT_EN, at: "2026-10-17T10:00:00.000Z" });
  assert.equal(payload.metadata.channel, "qr_card");
  assert.equal(payload.metadata.profile_handle, "robert");
  assert.equal(payload.metadata.profile_owner_email, "robert@sundaetech.ai");
});

test("empty optional fields become null, not empty strings", () => {
  const data = parseConnectSubmission({ ...valid(), phone: "", company: "", note: "" }, opts).data;
  const payload = buildLeadPayload(robert, data, { locale: null, referrer: null, at: new Date() });
  assert.equal(payload.phone, null);
  assert.equal(payload.company, null);
  assert.equal(payload.message, null);
});

test("name placeholders split cleanly for bidi isolation", () => {
  assert.deepEqual(splitTemplate("{name} will be in touch soon.", "Robert"), [
    { text: "Robert", isName: true },
    { text: " will be in touch soon.", isName: false },
  ]);
  assert.deepEqual(splitTemplate("a {name} b", "R").map((p) => p.text), ["a ", "R", " b"]);
  assert.deepEqual(splitTemplate("no placeholder", "R"), [{ text: "no placeholder", isName: false }]);
});

test("every locale has the name placeholder in the three owner-addressed sentences", () => {
  for (const [locale, copy] of Object.entries(profileCardCopy)) {
    for (const key of ["shareDetailsHint", "thanksBody", "errorBody"]) {
      assert.equal(copy[key].split("{name}").length, 2, `${locale}.${key} needs exactly one {name}`);
    }
    for (const key of PROFILE_CARD_COPY_KEYS.filter((k) => !["shareDetailsHint", "thanksBody", "errorBody"].includes(k))) {
      assert.ok(!copy[key].includes("{name}"), `${locale}.${key} must not contain {name}`);
    }
    assert.doesNotMatch(copy.consent, /[—–]/);
  }
});

test("consent wording names Sundae in every locale", () => {
  for (const [locale, copy] of Object.entries(profileCardCopy)) {
    assert.ok(copy.consent.includes("Sundae"), `${locale}.consent should name Sundae`);
  }
});
