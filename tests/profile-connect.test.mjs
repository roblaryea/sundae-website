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

test("a honeypot or missing timestamp is ignored silently; odd timing asks for a retry", () => {
  assert.equal(parseConnectSubmission({ ...valid(), website: "http://spam.example" }, opts).kind, "ignored");
  assert.equal(parseConnectSubmission({ ...valid(), startedAt: "now" }, opts).kind, "ignored");
  assert.equal(parseConnectSubmission({ ...valid(), startedAt: undefined }, opts).kind, "ignored");
  // A fast AutoFill or a day-old tab is a risk signal, never a silent drop behind a success message.
  assert.equal(parseConnectSubmission({ ...valid(), startedAt: NOW - (MIN_FILL_MS - 1) }, opts).kind, "retry");
  assert.equal(parseConnectSubmission({ ...valid(), startedAt: NOW - MAX_FORM_AGE_MS - 1 }, opts).kind, "retry");
  assert.equal(parseConnectSubmission({ ...valid(), startedAt: NOW - MIN_FILL_MS }, opts).kind, "ok");
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
  const payload = buildLeadPayload(robert, data, { locale: "ar", consentText: profileCardCopy.ar.consent, referrer: "https://www.sundae.io/robert", at: new Date("2026-10-17T10:00:00Z") });
  assert.equal(payload.fullName, "Ada Lovelace");
  assert.equal(payload.email, "ada@example.com");
  assert.equal(payload.sourcePage, "/robert");
  assert.equal(payload.ctaLabel, "Profile card: Robert Laryea");
  assert.equal(payload.locale, "ar");
  assert.equal(payload.company, "Analytical Engines Ltd");
  assert.equal(payload.message, "Met at the summit.");
  assert.deepEqual(payload.metadata.consent, {
    given: true,
    version: CONSENT_VERSION,
    locale: "ar",
    text: profileCardCopy.ar.consent,
    text_en: CONSENT_TEXT_EN,
    privacy_url: "https://www.sundae.io/privacy",
    at: "2026-10-17T10:00:00.000Z",
  });
  assert.equal(payload.metadata.channel, "qr_card");
  assert.equal(payload.metadata.profile_handle, "robert");
  assert.equal(payload.metadata.profile_owner_email, "robert@sundaetech.ai");
});

test("empty optional fields become null, not empty strings", () => {
  const data = parseConnectSubmission({ ...valid(), phone: "", company: "", note: "" }, opts).data;
  const payload = buildLeadPayload(robert, data, { locale: null, consentText: CONSENT_TEXT_EN, referrer: null, at: new Date() });
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

test("every locale has the name placeholder in the four owner-addressed sentences", () => {
  const OWNER_ADDRESSED = ["shareDetailsHint", "thanksBody", "errorBody", "exchangeNudge"];
  for (const [locale, copy] of Object.entries(profileCardCopy)) {
    for (const key of OWNER_ADDRESSED) {
      assert.equal(copy[key].split("{name}").length, 2, `${locale}.${key} needs exactly one {name}`);
    }
    for (const key of PROFILE_CARD_COPY_KEYS.filter((k) => !OWNER_ADDRESSED.includes(k))) {
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

test("saved consent evidence is the wording shown in the visitor's language", () => {
  const data = parseConnectSubmission(valid(), opts).data;
  const at = new Date("2026-10-17T10:00:00Z");
  for (const locale of ["en", "ar", "fr", "ru", "az", "pap", "zh-Hans"]) {
    const payload = buildLeadPayload(robert, data, { locale, consentText: profileCardCopy[locale].consent, referrer: null, at });
    assert.equal(payload.metadata.consent.text, profileCardCopy[locale].consent, locale);
    assert.equal(payload.metadata.consent.locale, locale);
    assert.equal(payload.metadata.consent.text_en, CONSENT_TEXT_EN);
  }
  assert.equal(CONSENT_TEXT_EN, profileCardCopy.en.consent);
});

test("request bodies are limited by bytes actually read, with or without Content-Length", async () => {
  const { readTextLimited, BodyTooLargeError } = await import("../src/lib/readBodyLimited.ts");
  const make = (text, headers = {}) => new Request("http://localhost/x", { method: "POST", body: text, headers });
  assert.equal(await readTextLimited(make("hello"), 16), "hello");
  assert.equal(await readTextLimited(make("é".repeat(8)), 16), "é".repeat(8));
  await assert.rejects(readTextLimited(make("x".repeat(17)), 16), BodyTooLargeError);
  // A declared length over the limit is rejected before reading.
  await assert.rejects(readTextLimited(make("x", { "content-length": "99999" }), 16), BodyTooLargeError);
  // An understated Content-Length cannot smuggle a large body past the check.
  const stream = new ReadableStream({ start(c) { c.enqueue(new Uint8Array(10)); c.enqueue(new Uint8Array(10)); c.close(); } });
  const lying = new Request("http://localhost/x", { method: "POST", body: stream, duplex: "half", headers: { "content-length": "5" } });
  await assert.rejects(readTextLimited(lying, 16), BodyTooLargeError);
  assert.equal(await readTextLimited(new Request("http://localhost/x", { method: "POST" }), 16), "");
});

test("a submission id separates a retry from a second message", () => {
  const first = parseConnectSubmission({ ...valid(), submissionId: "3f1c9d2e-aaaa-4bbb-8ccc-000000000001" }, opts).data;
  assert.equal(first.submissionId, "3f1c9d2e-aaaa-4bbb-8ccc-000000000001");
  assert.equal(parseConnectSubmission(valid(), opts).data.submissionId, null);
  for (const bad of ["x", "has space and <tags>", "a".repeat(65), 7, {}]) {
    assert.equal(parseConnectSubmission({ ...valid(), submissionId: bad }, opts).data.submissionId, null, String(bad));
  }
});

test("only supported languages are treated as explicit", async () => {
  const { matchCardLocale } = await import("../src/lib/profileCardLocale.ts");
  assert.equal(matchCardLocale("fr"), "fr");
  assert.equal(matchCardLocale("pap"), "pap");
  assert.equal(matchCardLocale("xx"), null);
  assert.equal(matchCardLocale(""), null);
  assert.equal(matchCardLocale(null), null);
});
