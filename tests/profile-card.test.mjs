import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { buildVCard, escapeVCardText, foldLine, vCardFilename } from "../src/lib/vcard.ts";
import { PROFILE_CARD_COPY_KEYS, profileCardCopy } from "../src/lib/profileCardCopy.ts";
import { PROFILE_HANDLES, isProfileCardPath, isProfileHandle } from "../src/lib/profileHandles.ts";
import { isLeadFormEnabled } from "../src/lib/profileFeatures.ts";
import { CITIES, ROLE_TITLES, cityName, countryName, locationText, roleTitle } from "../src/lib/profileCatalogue.ts";
import { CARD_LOCALES, cardLocaleDirection, resolveCardLocale } from "../src/lib/profileCardLocale.ts";
import { PROFILES, COMPANY_LEGAL_NAME, displayHost, isProfileActive, linkedinHandle } from "../src/lib/profileData.ts";

// 25 languages: the website's 22 plus Papiamento, Russian and Azerbaijani (the booking set).
const WEBSITE_LOCALES = [
  "en", "ar", "fr", "es", "de", "nl", "pt", "hi", "ur", "it", "pl", "tr",
  "zh-Hans", "ja", "ko", "id", "vi", "ro", "sv", "bn", "th", "ms", "ru", "az", "pap",
];
// Languages whose job titles carry grammatical gender and therefore need both forms.
const GENDERED = ["ar", "fr", "es", "de", "pt", "it", "pl", "ro", "ru"];

const robert = PROFILES.robert;
const vcardOptions = { title: "Founder & CEO", city: "Dubai", country: "United Arab Emirates" };

// ---------------------------------------------------------------- vCard

test("vCard carries a structured name, not an empty N field", () => {
  const card = buildVCard(robert, vcardOptions);
  assert.match(card, /\r\nN:Laryea;Robert;;;\r\n/);
  assert.match(card, /\r\nFN:Robert Laryea\r\n/);
  assert.doesNotMatch(card, /N:;;;;/);
});

test("vCard has the required properties and CRLF framing", () => {
  const card = buildVCard(robert, vcardOptions);
  assert.ok(card.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n"));
  assert.ok(card.endsWith("END:VCARD\r\n"));
  assert.doesNotMatch(card.replace(/\r\n/g, ""), /[\r\n]/);
  for (const line of [
    "ORG:Sundae Technologies Inc.",
    "TITLE:Founder & CEO",
    "TEL;TYPE=CELL:+971555459842",
    "EMAIL;TYPE=INTERNET,WORK:robert@sundaetech.ai",
    "URL:https://www.sundae.io",
    "item1.URL:https://www.linkedin.com/in/robertalaryea",
    "item1.X-ABLabel:LinkedIn",
    "ADR;TYPE=WORK:;;;Dubai;;;United Arab Emirates",
  ]) {
    assert.ok(card.includes(`\r\n${line}\r\n`), `missing: ${line}`);
  }
});

test("vCard title and address follow the requested language, name stays as written", () => {
  const card = buildVCard(robert, {
    title: roleTitle("founder-ceo", "masculine", "ar"),
    city: cityName("dubai", "ar"),
    country: countryName("dubai", "ar"),
  });
  const unfolded = card.replace(/\r\n /g, "");
  assert.match(unfolded, /\r\nTITLE:المؤسس والرئيس التنفيذي\r\n/);
  assert.match(unfolded, /ADR;TYPE=WORK:;;;دبي;;;الإمارات العربية المتحدة/);
  assert.match(unfolded, /\r\nFN:Robert Laryea\r\n/);
});

test("escapes vCard text so a value cannot inject properties", () => {
  assert.equal(escapeVCardText("A, B; C\\D\nE"), String.raw`A\, B\; C\\D\nE`);
  const card = buildVCard(robert, { ...vcardOptions, title: "CEO\r\nEND:VCARD\r\nBEGIN:VCARD" });
  const lines = card.split("\r\n");
  assert.equal(lines.filter((l) => l === "BEGIN:VCARD").length, 1);
  assert.equal(lines.filter((l) => l === "END:VCARD").length, 1);
  assert.ok(lines.some((l) => l.startsWith("TITLE:CEO\\nEND:VCARD")), "payload stays inside the escaped TITLE value");
});

test("folds lines at 75 octets without splitting multibyte characters", () => {
  const long = "NOTE:" + "é".repeat(80);
  const physical = foldLine(long).split("\r\n");
  assert.ok(physical.length > 1);
  for (const line of physical) assert.ok(new TextEncoder().encode(line).length <= 75);
  assert.equal(physical.map((l, i) => (i === 0 ? l : l.slice(1))).join(""), long);
});

test("embeds the contact photo when provided and omits it otherwise", () => {
  assert.doesNotMatch(buildVCard(robert, vcardOptions), /PHOTO/);
  const card = buildVCard(robert, { ...vcardOptions, photoPngBase64: "iVBORw0KGgo=" });
  assert.match(card.replace(/\r\n /g, ""), /PHOTO;ENCODING=b;TYPE=PNG:iVBORw0KGgo=/);
});

test("download filename is safe", () => {
  assert.equal(vCardFilename(robert), "Robert-Laryea.vcf");
  assert.equal(vCardFilename({ ...robert, givenName: "Zoë", familyName: "O'Neil/../x" }), "Zoe-O-Neil-x.vcf");
});

// ------------------------------------------------------- handles and registry

test("profile handles are lowercase url-safe and resolve to chrome-free paths", () => {
  assert.ok(PROFILE_HANDLES.length > 0);
  for (const handle of PROFILE_HANDLES) {
    assert.match(handle, /^[a-z][a-z0-9-]{1,30}$/);
    assert.ok(isProfileHandle(handle));
    assert.ok(isProfileCardPath(`/${handle}`));
    assert.ok(isProfileCardPath(`/${handle}/contact.vcf`));
  }
  assert.equal(new Set(PROFILE_HANDLES).size, PROFILE_HANDLES.length, "duplicate handle");
  assert.equal(isProfileCardPath("/"), false);
  assert.equal(isProfileCardPath("/pricing"), false);
  assert.equal(isProfileCardPath("/robertson"), true, "new root handles use the card layout; the directory decides whether they exist");
  assert.equal(isProfileHandle("robertson"), false, "an unregistered handle is not in the legacy registry");
});

test("every handle has exactly one well-formed profile", () => {
  assert.deepEqual(Object.keys(PROFILES).sort(), [...PROFILE_HANDLES].sort());
  for (const [handle, profile] of Object.entries(PROFILES)) {
    assert.equal(profile.handle, handle);
    assert.ok(profile.givenName.trim() && profile.familyName.trim(), `${handle}: name`);
    assert.match(profile.phone, /^\+[1-9]\d{7,14}$/, `${handle}: phone must be E.164`);
    assert.ok(profile.phoneDisplay.replace(/\D/g, "").endsWith(profile.phone.replace(/\D/g, "").slice(-8)), `${handle}: display phone matches`);
    assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, `${handle}: email`);
    assert.match(profile.website, /^https:\/\//, `${handle}: website must be https`);
    if (profile.linkedin) assert.match(profile.linkedin, /^https:\/\/(www\.)?linkedin\.com\/in\/[^/]+\/?$/, `${handle}: linkedin`);
    assert.ok(profile.roleKey in ROLE_TITLES, `${handle}: unknown roleKey ${profile.roleKey}`);
    assert.ok(profile.cityKey in CITIES, `${handle}: unknown cityKey ${profile.cityKey}`);
    assert.ok(["masculine", "feminine"].includes(profile.titleForm), `${handle}: titleForm must be chosen`);
    assert.equal(profile.company, COMPANY_LEGAL_NAME);
  }
  assert.equal(displayHost("https://www.sundae.io"), "sundae.io");
  assert.equal(linkedinHandle("https://www.linkedin.com/in/robertalaryea/"), "robertalaryea");
});

// ------------------------------------------------------------ localization

test("every job title and city is localized into every website locale", () => {
  for (const [key, entry] of Object.entries(ROLE_TITLES)) {
    assert.deepEqual(Object.keys(entry).sort(), [...WEBSITE_LOCALES].sort(), `role ${key}`);
    for (const locale of WEBSITE_LOCALES) {
      const value = entry[locale];
      if (GENDERED.includes(locale)) {
        assert.equal(typeof value, "object", `role ${key}.${locale} needs masculine and feminine forms`);
        assert.ok(value.masculine.trim() && value.feminine.trim() && value.masculine !== value.feminine, `role ${key}.${locale}`);
      } else {
        assert.equal(typeof value, "string", `role ${key}.${locale}`);
        assert.ok(value.trim(), `role ${key}.${locale} is empty`);
      }
    }
  }
  for (const [key, city] of Object.entries(CITIES)) {
    assert.match(city.country, /^[A-Z]{2}$/);
    assert.deepEqual(Object.keys(city.names).sort(), [...WEBSITE_LOCALES].sort(), `city ${key}`);
    for (const locale of WEBSITE_LOCALES) assert.ok(city.names[locale].trim(), `city ${key}.${locale}`);
  }
});

test("role and location render in the visitor's language and script", () => {
  const nonEnglish = WEBSITE_LOCALES.filter((l) => l !== "en");
  for (const locale of nonEnglish) {
    const role = roleTitle("founder-ceo", "masculine", locale);
    assert.notEqual(role, "Founder & CEO", `${locale}: role still English`);
    assert.ok(locationText("dubai", locale).length > 3);
  }
  // Arabic and Urdu: Arabic script and the Arabic comma, with a localized country name.
  assert.equal(roleTitle("founder-ceo", "masculine", "ar"), "المؤسس والرئيس التنفيذي");
  assert.equal(roleTitle("founder-ceo", "feminine", "ar"), "المؤسِّسة والرئيسة التنفيذية");
  assert.match(locationText("dubai", "ar"), /^دبي، /);
  assert.doesNotMatch(locationText("dubai", "ar"), /[A-Za-z]/);
  assert.doesNotMatch(locationText("dubai", "ur"), /[A-Za-z]/);
  assert.doesNotMatch(locationText("dubai", "ja"), /[A-Za-z]/);
  assert.match(locationText("dubai", "ja"), /^ドバイ、/);
  assert.match(locationText("dubai", "zh-Hans"), /^迪拜，/);
  assert.equal(locationText("dubai", "en"), "Dubai, United Arab Emirates");
});

test("a card owner's grammatical form is respected and never defaulted from a name", () => {
  assert.equal(roleTitle("founder-ceo", "masculine", "fr"), "Fondateur et PDG");
  assert.equal(roleTitle("founder-ceo", "feminine", "fr"), "Fondatrice et PDG");
  assert.equal(roleTitle("founder-ceo", "feminine", "tr"), roleTitle("founder-ceo", "masculine", "tr"));
});

test("profile card copy exists for every website locale and every key", () => {
  for (const locale of WEBSITE_LOCALES) {
    const copy = profileCardCopy[locale];
    assert.ok(copy, `missing locale ${locale}`);
    for (const key of PROFILE_CARD_COPY_KEYS) {
      assert.equal(typeof copy[key], "string", `${locale}.${key}`);
      assert.ok(copy[key].trim().length > 0, `${locale}.${key} is empty`);
    }
    assert.deepEqual(Object.keys(copy).sort(), [...PROFILE_CARD_COPY_KEYS].sort(), `${locale} has unexpected keys`);
  }
  assert.deepEqual(Object.keys(profileCardCopy).sort(), [...WEBSITE_LOCALES].sort());
});

test("non-English copy is actually translated, not copied from English", () => {
  for (const locale of WEBSITE_LOCALES.filter((l) => l !== "en")) {
    for (const key of ["saveContact", "saveHint", "bookSession", "tagline", "linkCopied"]) {
      assert.notEqual(profileCardCopy[locale][key], profileCardCopy.en[key], `${locale}.${key} equals English`);
    }
    assert.equal(profileCardCopy[locale].linkedin, "LinkedIn");
  }
});

test("localized strings avoid em dashes", () => {
  for (const locale of WEBSITE_LOCALES) {
    for (const key of PROFILE_CARD_COPY_KEYS) assert.doesNotMatch(profileCardCopy[locale][key], /[—–]/);
    const role = roleTitle("founder-ceo", "masculine", locale);
    assert.doesNotMatch(role, /[—–]/);
  }
});

test("every profile has a 1200x630 link-preview image", () => {
  for (const handle of PROFILE_HANDLES) {
    const file = new URL(`../public/profile/${handle}-og.png`, import.meta.url);
    assert.ok(existsSync(file), `public/profile/${handle}-og.png is missing (run scripts/profile-og/generate.mjs)`);
    const png = readFileSync(file);
    assert.equal(png.subarray(1, 4).toString(), "PNG");
    assert.equal(png.readUInt32BE(16), 1200, `${handle}: preview width`);
    assert.equal(png.readUInt32BE(20), 630, `${handle}: preview height`);
  }
});

test("the new convenience strings are translated in every locale", () => {
  for (const locale of WEBSITE_LOCALES.filter((l) => l !== "en")) {
    for (const key of ["fillFromContacts", "fillHint", "themeToggle", "showQr", "qrTitle", "close"]) {
      assert.notEqual(profileCardCopy[locale][key], profileCardCopy.en[key], `${locale}.${key} equals English`);
    }
  }
});

test("the lead form is off unless explicitly switched on", () => {
  assert.equal(isLeadFormEnabled({}), false);
  for (const value of ["", "off", "true", "1", "ON", "yes", " on"]) {
    assert.equal(isLeadFormEnabled({ PROFILE_CARD_LEAD_FORM: value }), false, JSON.stringify(value));
  }
  assert.equal(isLeadFormEnabled({ PROFILE_CARD_LEAD_FORM: "on" }), true);
});

// ----------------------------------------------------- 25-language resolution

test("the card supports exactly the 25 booking languages", () => {
  assert.deepEqual([...CARD_LOCALES].sort(), [...WEBSITE_LOCALES].sort());
  assert.equal(CARD_LOCALES.length, 25);
});

test("Russian, Azerbaijani and Papiamento render natively", () => {
  assert.equal(profileCardCopy.ru.saveContact, "Сохранить контакт");
  assert.equal(profileCardCopy.az.saveContact, "Kontaktı yadda saxla");
  assert.equal(profileCardCopy.pap.saveContact, "Guarda contacto");
  assert.match(roleTitle("founder-ceo", "masculine", "ru"), /[А-Яа-я]/);
  assert.notEqual(roleTitle("founder-ceo", "masculine", "ru"), roleTitle("founder-ceo", "feminine", "ru"));
  assert.match(locationText("dubai", "ru"), /[А-Яа-я]/);
  assert.doesNotMatch(locationText("dubai", "ru"), /[A-Za-z]/);
  assert.match(locationText("dubai", "az"), /Dubay/);
  assert.match(locationText("dubai", "pap"), /Emiratonan Arabe Uni/);
});

test("the visitor's language is chosen explicit first, then the browser", () => {
  assert.equal(resolveCardLocale(["ru"], null), "ru");
  assert.equal(resolveCardLocale(["pap", "fr"], "de"), "pap");
  assert.equal(resolveCardLocale([null, undefined], "ru-RU,ru;q=0.9,en;q=0.5"), "ru");
  assert.equal(resolveCardLocale([null], "az-AZ,az;q=0.9"), "az");
  assert.equal(resolveCardLocale([null], null), "en");
  assert.equal(resolveCardLocale(["xx"], null), "en");
  // An explicit English choice is respected even when the browser prefers another language.
  assert.equal(resolveCardLocale(["en"], "ru-RU,ru;q=0.9"), "en");
  assert.equal(cardLocaleDirection("ar"), "rtl");
  assert.equal(cardLocaleDirection("ur"), "rtl");
  assert.equal(cardLocaleDirection("ru"), "ltr");
});

test("a booking slug, when set, is a valid personal booking page slug", () => {
  for (const [handle, profile] of Object.entries(PROFILES)) {
    if (profile.bookingSlug === undefined) continue;
    assert.match(profile.bookingSlug, /^[a-z0-9][a-z0-9-]{1,62}$/, handle);
  }
  assert.equal(PROFILES.robert.bookingSlug, "robert");
});

test("a retired profile is inactive only when explicitly marked, and every language explains it", () => {
  assert.equal(isProfileActive(PROFILES.robert), true);
  assert.equal(isProfileActive({ ...PROFILES.robert, active: true }), true);
  assert.equal(isProfileActive({ ...PROFILES.robert, active: false }), false);
  for (const locale of WEBSITE_LOCALES) {
    for (const key of ["cardInactiveTitle", "cardInactiveBody", "cardInactiveAction", "rateLimited", "tryAgain", "fieldErrorName", "fieldErrorEmail", "fieldErrorPhone", "fieldErrorConsent"]) {
      assert.ok(profileCardCopy[locale][key].trim(), `${locale}.${key}`);
      if (locale !== "en") assert.notEqual(profileCardCopy[locale][key], profileCardCopy.en[key], `${locale}.${key} equals English`);
    }
    assert.ok(profileCardCopy[locale].cardInactiveBody.includes("Sundae"), `${locale} names Sundae`);
  }
});
