import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { buildVCard, escapeVCardText, foldLine, vCardFilename } from "../src/lib/vcard.ts";
import { PROFILE_CARD_COPY_KEYS, profileCardCopy } from "../src/lib/profileCardCopy.ts";
import { PROFILE_HANDLES, isProfileCardPath, isProfileHandle } from "../src/lib/profileHandles.ts";
import { isLeadFormEnabled } from "../src/lib/profileFeatures.ts";
import { PROFILE_PHOTOS, profilePhoto } from "../src/lib/profilePhotos.ts";
import { CITIES, COUNTRY_NAME_OVERRIDES, ROLE_TITLES, cityName, countryName, locationText, profileCountryCode, regionName, roleTitle } from "../src/lib/profileCatalogue.ts";
import { LOCALE_PHONE_COUNTRY, cleanPhoneInput, filterPhoneCountries, flagEmoji, foldForSearch, phoneCountries, resolveDefaultPhoneCountry, splitInternationalNumber } from "../src/lib/profilePhoneInput.ts";
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

test("a person's portrait is embedded as a JPEG and replaces the brand mark", () => {
  const card = buildVCard(robert, { ...vcardOptions, photoPngBase64: "iVBORw0KGgo=", photoJpegBase64: "/9j/4AAQ" });
  const flat = card.replace(/\r\n /g, "");
  assert.match(flat, /PHOTO;ENCODING=b;TYPE=JPEG:\/9j\/4AAQ/);
  assert.doesNotMatch(flat, /TYPE=PNG/);
});

test("every portrait has a public image and a valid 192 px JPEG for the contact file", () => {
  for (const [handle, photo] of Object.entries(PROFILE_PHOTOS)) {
    assert.ok(existsSync(new URL(`../public${photo.src}`, import.meta.url)), `${handle}: public${photo.src} is missing`);
    const jpeg = Buffer.from(photo.vcardJpegBase64, "base64");
    assert.equal(jpeg[0], 0xff, `${handle}: not a JPEG`);
    assert.equal(jpeg[1], 0xd8, `${handle}: not a JPEG`);
    assert.ok(jpeg.length > 1000 && jpeg.length < 40_000, `${handle}: contact photo should be small (${jpeg.length} bytes)`);
    assert.equal(profilePhoto(handle), photo);
  }
  assert.equal(profilePhoto("nobody"), undefined);
  assert.equal(profilePhoto("constructor"), undefined, "prototype keys must not resolve to a photo");
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
    for (const key of ["fillFromContacts", "fillHint", "useMyPhoneDetails", "useMyPhoneHint", "themeToggle", "qrTitle", "close", "connectTitle", "addMoreInfo", "exchangeNudge", "copyLink", "shareBySms", "shareByEmail", "shareByWhatsApp", "shareMore"]) {
      assert.notEqual(profileCardCopy[locale][key], profileCardCopy.en[key], `${locale}.${key} equals English`);
    }
  }
});

test("the phone field is no longer labelled optional in any language", () => {
  for (const locale of WEBSITE_LOCALES) {
    assert.doesNotMatch(profileCardCopy[locale].fieldPhone, /[（(]/, `${locale}.fieldPhone still carries an optional marker`);
    assert.ok(profileCardCopy[locale].fieldPhone.trim().length >= 2, `${locale}.fieldPhone is empty`);
  }
  const field = readFileSync(new URL("../src/app/p/[handle]/PhoneField.tsx", import.meta.url), "utf8");
  assert.match(field, /name="phone"\s+type="tel"\s+required/);
});

// ------------------------------------------------ phone country selector

const NEW_PHONE_KEYS = ["fieldErrorPhone", "fieldErrorPhoneCountry", "phoneCountry", "phoneCountrySearch", "phoneCountryNoMatch"];

test("the phone country strings are translated in every locale", () => {
  for (const locale of WEBSITE_LOCALES.filter((l) => l !== "en")) {
    for (const key of NEW_PHONE_KEYS) {
      assert.notEqual(profileCardCopy[locale][key], profileCardCopy.en[key], `${locale}.${key} equals English`);
    }
  }
});

test("the invalid-for-country message names the country exactly once, in every locale", () => {
  for (const locale of WEBSITE_LOCALES) {
    const copy = profileCardCopy[locale];
    assert.equal(copy.fieldErrorPhoneCountry.split("{country}").length, 2, `${locale}.fieldErrorPhoneCountry needs exactly one {country}`);
    for (const key of PROFILE_CARD_COPY_KEYS.filter((k) => k !== "fieldErrorPhoneCountry")) {
      assert.ok(!copy[key].includes("{country}"), `${locale}.${key} must not contain {country}`);
    }
  }
});

test("Papiamento phone strings use the Aruban spelling without accents", () => {
  for (const key of NEW_PHONE_KEYS) {
    assert.doesNotMatch(profileCardCopy.pap[key], /[\u00C0-\u017F]/, `pap.${key} has an accented letter`);
  }
});

test("country names come from the card language, with Papiamento overrides and an English fallback", () => {
  assert.equal(regionName("NL", "en"), "Netherlands");
  assert.equal(regionName("NL", "ar"), "هولندا");
  assert.equal(regionName("DE", "ja"), "ドイツ");
  assert.equal(regionName("NL", "pap"), "Hulanda");
  assert.equal(regionName("AE", "pap"), "Emiratonan Arabe Uni");
  // Papiamento has no platform locale data: a country without an override is the English name, never another language.
  assert.equal(regionName("TV", "pap"), "Tuvalu");
  // Every country in the selector has a real name in every language (never the bare code), and the
  // Papiamento overrides do not name a country the selector lacks.
  for (const locale of WEBSITE_LOCALES) {
    for (const { code } of phoneCountries()) {
      const name = regionName(code, locale);
      assert.ok(name && name.length > 0, `${locale}/${code}`);
      assert.notEqual(name, code, `${locale}/${code} fell back to the bare code`);
    }
  }
  const selectable = new Set(phoneCountries().map((c) => c.code));
  for (const code of Object.keys(COUNTRY_NAME_OVERRIDES.pap)) assert.ok(selectable.has(code), `pap override for unknown country ${code}`);
  assert.doesNotMatch(Object.values(COUNTRY_NAME_OVERRIDES.pap).join(" "), /[áéíóúàèìòùâêîôû]/, "pap names use no accented vowels");
});

test("the selector starts on the visitor's country, then the card language's, then the owner's", () => {
  const resolve = (input) => resolveDefaultPhoneCountry({ locale: "en", ownerCountry: "AE", ...input });
  // 1. The hosting platform's country header wins, in any case.
  assert.equal(resolve({ ipCountry: "NL" }), "NL");
  assert.equal(resolve({ ipCountry: "nl", locale: "ja" }), "NL");
  assert.equal(resolve({ ipCountry: " gb " }), "GB");
  // Junk and unknown values fall through (Vercel uses XX for unknown and T1 for Tor).
  for (const ipCountry of ["XX", "T1", "", "  ", null, undefined, "USA", "1", "ZZ"]) {
    assert.equal(resolve({ ipCountry }), "AE", `header ${JSON.stringify(ipCountry)} should be ignored`);
  }
  // 2. Then the country a single-country language implies.
  assert.equal(resolve({ locale: "ja" }), "JP");
  assert.equal(resolve({ locale: "de", ipCountry: "XX" }), "DE");
  assert.equal(resolve({ locale: "pap" }), "AW");
  assert.equal(resolve({ locale: "zh-Hans" }), "CN");
  // Languages spoken in many countries do not guess: the owner's country is used instead.
  for (const locale of ["en", "ar", "fr", "es", "pt"]) assert.equal(resolve({ locale }), "AE", locale);
  // 3. Then the owner's country, then a last-resort default.
  assert.equal(resolve({ ownerCountry: "NL" }), "NL");
  assert.equal(resolve({ ownerCountry: null }), "US");
  assert.equal(resolve({ ownerCountry: "ZZ" }), "US");
  for (const [locale, country] of Object.entries(LOCALE_PHONE_COUNTRY)) {
    assert.ok(WEBSITE_LOCALES.includes(locale), locale);
    assert.ok(phoneCountries().some((c) => c.code === country), `${locale} -> ${country} is not a selectable country`);
  }
});

test("a card owner's country comes from the catalogue city, else the directory country code", () => {
  assert.equal(profileCountryCode(PROFILES.robert), "AE");
  assert.equal(profileCountryCode({ ...PROFILES.robert, cityKey: undefined, countryCode: "nl" }), "NL");
  assert.equal(profileCountryCode({ ...PROFILES.robert, cityKey: undefined, countryCode: undefined }), null);
  assert.equal(profileCountryCode({ ...PROFILES.robert, cityKey: undefined, countryCode: "Netherlands" }), null);
});

test("the country list has flags, calling codes and accent-folded search text", () => {
  const countries = phoneCountries();
  assert.ok(countries.length > 200);
  assert.deepEqual(countries.find((c) => c.code === "AE"), { code: "AE", dial: "971" });
  assert.deepEqual(countries.find((c) => c.code === "US"), { code: "US", dial: "1" });
  assert.equal(flagEmoji("AE"), "\u{1F1E6}\u{1F1EA}");
  assert.equal(flagEmoji("x"), "");
  assert.equal(foldForSearch("  Côte d’Ivoire "), "cote d’ivoire");
  assert.equal(foldForSearch("Türkiye"), "turkiye");
});

test("the country search matches names in the card language and English, ISO codes and calling codes", () => {
  const options = (locale) =>
    phoneCountries().map(({ code, dial }) => {
      const name = regionName(code, locale);
      const english = regionName(code, "en");
      return { code, dial, name, english, folded: foldForSearch(name), foldedEnglish: foldForSearch(english) };
    });
  const en = options("en");
  const find = (list, query) => filterPhoneCountries(list, query).map((o) => o.code);
  assert.equal(find(en, "").length, en.length, "an empty query lists everything");
  assert.deepEqual(find(en, "neth").slice(0, 2).sort(), ["BQ", "NL"]);
  assert.equal(find(en, "United Arab")[0], "AE");
  assert.deepEqual(find(en, "zzzz"), []);
  // Calling codes, with or without the plus; the country most people mean comes first.
  assert.equal(find(en, "+44")[0], "GB");
  assert.deepEqual(new Set(find(en, "44")), new Set(["GB", "GG", "IM", "JE"]));
  assert.equal(find(en, "+1")[0], "US");
  assert.equal(find(en, "971")[0], "AE");
  // ISO codes, case and accents ignored.
  assert.equal(find(en, "nl")[0], "NL");
  assert.equal(find(en, "TURKIYE")[0], "TR");
  // A visitor on a non-English card can search in their own language or in English.
  const ja = options("ja");
  assert.equal(find(ja, "オランダ")[0], "NL");
  assert.equal(find(ja, "netherlands")[0], "NL");
  const ar = options("ar");
  assert.equal(find(ar, "الإمارات")[0], "AE");
  const pap = options("pap");
  assert.equal(find(pap, "hulanda")[0], "NL");
  assert.equal(find(pap, "tuvalu")[0], "TV");
});

test("browser code never imports the full phone metadata", () => {
  // profilePhone.ts and profileConnect.ts carry libphonenumber's full metadata (about 39 KB gzipped
  // more than the browser needs). A client component importing either would ship it to every visitor.
  const dir = new URL("../src/app/p/[handle]/", import.meta.url);
  for (const file of ["ExchangeSheet.tsx", "PhoneField.tsx", "ProfileActions.tsx", "ShareSheet.tsx", "LanguageSwitcher.tsx", "ThemeToggle.tsx"]) {
    const source = readFileSync(new URL(file, dir), "utf8");
    assert.doesNotMatch(source, /lib\/profileConnect'|lib\/profilePhone'|libphonenumber-js\/max/, `${file} must not import the server-side phone code`);
  }
  const input = readFileSync(new URL("../src/lib/profilePhoneInput.ts", import.meta.url), "utf8");
  assert.match(input, /from 'libphonenumber-js\/min'/);
  assert.doesNotMatch(input, /libphonenumber-js\/max/);
  const server = readFileSync(new URL("../src/lib/profilePhone.ts", import.meta.url), "utf8");
  assert.match(server, /from 'libphonenumber-js\/max'/);
});

test("an international number typed, pasted or AutoFilled into the national box moves the selector", () => {
  const split = (raw, selected) => splitInternationalNumber(raw, selected);
  // iOS and desktop AutoFill hand over the whole number.
  assert.deepEqual(split("+971501234567", "US"), { country: "AE", text: "050 123 4567", switched: true });
  assert.deepEqual(split("+971 50 123 4567", "AE"), { country: "AE", text: "050 123 4567", switched: false });
  assert.deepEqual(split("00971 50 123 4567", "GB"), { country: "AE", text: "050 123 4567", switched: true });
  assert.equal(split("+44 20 7946 0958", "AE").country, "GB");
  assert.equal(split("+31 6 41 50 92 55", "AE").country, "NL");
  assert.equal(split("+81 90 1234 5678", "US").country, "JP");
  // Numbers sharing a calling code follow the number when it says which country, and the visitor otherwise.
  assert.equal(split("+1 416 555 0123", "US").country, "CA");
  assert.equal(split("+1 650 253 0000", "CA").country, "US");
  // National numbers, partial input and junk are left alone.
  for (const raw of ["050 123 4567", "0501234567", "", "+", "+9", "abc", "+999 123"]) {
    const result = split(raw, "AE");
    assert.equal(result.switched, false, raw);
    assert.equal(result.country, "AE", raw);
    assert.equal(result.text, raw, raw);
  }
});

test("the exchange prompt names the card owner in every locale and never hard-codes a gender", () => {
  for (const locale of WEBSITE_LOCALES) {
    assert.match(profileCardCopy[locale].exchangeNudge, /\{name\}/, `${locale}.exchangeNudge needs the {name} placeholder`);
    assert.match(profileCardCopy[locale].shareDetailsHint, /\{name\}/, `${locale}.shareDetailsHint needs the {name} placeholder`);
  }
});

test("the share sheet, exchange sheet and card page are wired together", () => {
  const dir = new URL("../src/app/p/[handle]/", import.meta.url);
  const page = readFileSync(new URL("page.tsx", dir), "utf8");
  const actions = readFileSync(new URL("ProfileActions.tsx", dir), "utf8");
  const sheet = readFileSync(new URL("ExchangeSheet.tsx", dir), "utf8");
  const share = readFileSync(new URL("ShareSheet.tsx", dir), "utf8");
  // The exchange only exists when the feature flag is on, and is passed as data rather than children.
  assert.match(page, /const exchange = isLeadFormEnabled\(\)/);
  assert.match(page, /exchange=\{exchange\}/);
  assert.match(page, /getVisitorCountryHeader\(\)/);
  assert.match(page, /<ShareSheet /);
  assert.match(actions, /<ExchangeSheet/);
  assert.match(actions, /defaultPhoneCountry=\{exchange\.phoneCountry\}/);
  // Consent stays an explicit, required checkbox inside the sheet.
  assert.match(sheet, /name="consent" type="checkbox" required/);
  // Name and email are still required; company and message sit behind the disclosure.
  assert.match(sheet, /name="name" type="text" required/);
  assert.match(sheet, /name="email" type="email" required/);
  assert.match(sheet, /id=\{`\$\{panelId\}-more`\} hidden=\{!more\}/);
  // Sharing offers the channels people use, from the clean (language-free) card address.
  for (const needle of ["sms:", "mailto:", "https://wa.me/", "navigator.clipboard.writeText", "navigator.share"]) {
    assert.ok(share.includes(needle), `ShareSheet should offer ${needle}`);
  }
  assert.ok(!share.includes("?lang="), "the shared link must not pin the sender's language");
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

// ------------------------------------------------ prefill from the phone's own contact card

test("numbers handed over by a phone's contact card split correctly whatever their formatting", () => {
  const nl = { country: "NL", text: "06 41509255", switched: true };
  for (const raw of [
    "+31 6 41 50 92 55",
    "+31 (0)6 41 50 92 55",
    "+31-6-41509255",
    "00 31 6 41 50 92 55",
    "\u202D+31 6 41 50 92 55\u202C", // direction marks around the number
    "\u200E+31\u00A06\u00A041\u00A050\u00A092\u00A055", // left-to-right mark and non-breaking spaces
    "\uFF0B31 6 41 50 92 55", // full-width plus
  ]) {
    assert.deepEqual(splitInternationalNumber(raw, "AE"), nl, JSON.stringify(raw));
  }
  assert.deepEqual(splitInternationalNumber("+1 (650) 253-0000", "AE"), { country: "US", text: "(650) 253-0000", switched: true });
  assert.deepEqual(splitInternationalNumber("+44 (0) 20 7946 0958", "AE"), { country: "GB", text: "020 7946 0958", switched: true });
  // Arabic-Indic digits, as stored on many Arabic and Urdu phones.
  assert.equal(splitInternationalNumber("+\u0669\u0667\u0661 \u0665\u0660 \u0661\u0662\u0663 \u0664\u0665\u0666\u0667", "US").country, "AE");
});

test("the selected country's calling code is never repeated in the number box", () => {
  const nationalAE = { country: "AE", text: "050 123 4567", switched: false };
  // Every common way of writing the selected code in front of the number is removed.
  for (const raw of [
    "+971 50 123 4567", "+971501234567", "00971 50 123 4567", "(+971) 50 123 4567",
    "+971 (0) 50 123 4567", "971501234567", "971 50 123 4567", "971-50-123-4567", "\u200E+971 50 123 4567",
  ]) {
    assert.deepEqual(splitInternationalNumber(raw, "AE"), nationalAE, JSON.stringify(raw));
  }
  // An incomplete or invalid number must not keep the code either; the server decides validity.
  for (const raw of ["+971 55", "00971 55", "+971 (0) 55"]) {
    const result = splitInternationalNumber(raw, "AE");
    assert.doesNotMatch(result.text, /971/, raw);
    assert.equal(result.country, "AE", raw);
  }
  // Real national numbers that happen to start with the same digits are left alone (Dutch 0318 numbers, +31).
  assert.equal(splitInternationalNumber("318 123 456", "NL").text, "318 123 456");
  assert.equal(splitInternationalNumber("0641509255", "NL").text, "0641509255");
  // A bare code of another country is not touched.
  assert.deepEqual(splitInternationalNumber("971501234567", "NL").country, "NL");
  // Only the code alone, partial prefixes and a different code are left as typed or follow the number.
  assert.equal(splitInternationalNumber("+971", "AE").text, "+971");
  assert.equal(splitInternationalNumber("+9", "AE").text, "+9");
});

test("cleaned phone text only ever contains characters the server accepts", () => {
  const serverChars = /^[0-9+()\-.\s]+$/;
  for (const raw of ["\u202D+971 50 123 4567\u202C", "\u200F\u0660\u0665\u0660 \u0661\u0662\u0663 \u0664\u0665\u0666\u0667", "\uFF0B31\u00A06\u00A041509255"]) {
    assert.match(cleanPhoneInput(raw), serverChars, JSON.stringify(raw));
  }
  assert.equal(cleanPhoneInput("050 123 4567"), "050 123 4567");
});

test("the exchange sheet leads with one prefill action and hands the visitor on to consent and Send", () => {
  const sheet = readFileSync(new URL("../src/app/p/[handle]/ExchangeSheet.tsx", import.meta.url), "utf8");
  const phone = readFileSync(new URL("../src/app/p/[handle]/PhoneField.tsx", import.meta.url), "utf8");
  // Picker only asks for what the form uses; the iPhone path is gated on touch and a missing picker.
  assert.match(sheet, /\['name', 'email', 'tel'\]/);
  assert.match(sheet, /\(canPick \|\| isTouch\)/);
  assert.match(sheet, /\(pointer: coarse\)/);
  assert.ok(!/userAgent/i.test(sheet), "no user-agent sniffing");
  assert.match(sheet, /canPick \? fillFromContacts : focusForAutofill/);
  // Standard tokens for one-tap AutoFill; the phone box keeps `tel`, never `tel-national`.
  assert.match(sheet, /autoComplete="name"/);
  assert.match(sheet, /autoComplete="email"/);
  assert.match(phone, /autoComplete="tel"/);
  assert.ok(!/tel-national/.test(phone + sheet));
  // Focus moves to consent after a prefill, but consent is never ticked on the visitor's behalf and stays required.
  assert.match(sheet, /consent\.focus\(/);
  assert.ok(!/consent\.checked\s*=\s*true/.test(sheet));
  assert.match(sheet, /name="consent" type="checkbox" required/);
  // The phone is cleaned before it is read for submission, and the 409 retry is still there.
  assert.match(sheet, /cleanPhoneInput\(value\('phone'\)\)/);
  assert.match(sheet, /response\.status === 409/);
});

test("the prefill strings are translated and the iPhone hint stays a single sentence", () => {
  for (const locale of WEBSITE_LOCALES.filter((l) => l !== "en")) {
    for (const key of ["useMyPhoneDetails", "useMyPhoneHint", "fillHint"]) {
      assert.notEqual(profileCardCopy[locale][key], profileCardCopy.en[key], `${locale}.${key} equals English`);
    }
  }
  assert.match(profileCardCopy.en.useMyPhoneHint, /AutoFill Contact/);
  assert.doesNotMatch(profileCardCopy.pap.useMyPhoneHint + profileCardCopy.pap.useMyPhoneDetails + profileCardCopy.pap.fillHint, /[\u00C0-\u017F]/, "pap uses the Aruban spelling without accents");
});
