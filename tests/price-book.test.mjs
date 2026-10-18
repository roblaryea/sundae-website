import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import {
  ANNUAL_QUARTERLY_DISCOUNT,
  BANDED_UNIT_CEILING,
  BILLING_CYCLE_DISCOUNTS,
  COMBINED_DISCOUNT_CAP,
  CORE_PACKAGES_BY_ID,
  FORESIGHT_AND_ACTION,
  bandCeilingFor,
  bandedMonthlyTotal,
  combinedDiscountRate,
  describeBands,
  priceBookForPrompt,
} from "../src/lib/pricing/priceBook.ts";

const foundation = CORE_PACKAGES_BY_ID.core_foundation;

test("marginal bands: first unit anchor, nothing at or under 50 locations changed", () => {
  assert.equal(bandedMonthlyTotal(foundation, 1).monthlyTotal, 1195);
  assert.equal(bandedMonthlyTotal(foundation, 5).monthlyTotal, 1895);
  assert.equal(bandedMonthlyTotal(foundation, 50).monthlyTotal, 1195 + 9 * 175 + 15 * 150 + 25 * 125);
});

test("marginal bands reach 250 for Core packages and match the live catalogue", () => {
  // 60 locations: 1195 + 9*175 + 15*150 + 25*125 + 10*115 = 9,295 (confirmed against the live quote engine).
  assert.equal(bandedMonthlyTotal(foundation, 60).monthlyTotal, 9295);
  assert.equal(BANDED_UNIT_CEILING, 250);
  const at250 = bandedMonthlyTotal(foundation, 250);
  assert.equal(at250.beyondBandedRange, false);
  assert.equal(at250.pricedUnits, 250);
  assert.equal(at250.monthlyTotal, 1195 + 9 * 175 + 15 * 150 + 25 * 125 + 50 * 115 + 50 * 110 + 100 * 105);
  assert.equal(bandedMonthlyTotal(foundation, 251).beyondBandedRange, true);
});

test("Foresight & Action keeps its own, shorter ceiling", () => {
  assert.equal(bandCeilingFor(FORESIGHT_AND_ACTION), 100);
  assert.equal(bandedMonthlyTotal(FORESIGHT_AND_ACTION, 101).beyondBandedRange, true);
  assert.equal(bandedMonthlyTotal(FORESIGHT_AND_ACTION, 100).beyondBandedRange, false);
});

test("billing-cycle discounts and the volume-or-cycle rule", () => {
  assert.equal(BILLING_CYCLE_DISCOUNTS.annual, 0.12);
  assert.equal(BILLING_CYCLE_DISCOUNTS.two_year, 0.2);
  assert.equal(ANNUAL_QUARTERLY_DISCOUNT, 0.05);
  assert.equal(COMBINED_DISCOUNT_CAP, 0.2);
  // Larger of the two, never summed.
  assert.equal(combinedDiscountRate(120, "annual"), 0.12);
  assert.equal(combinedDiscountRate(120, "monthly"), 0.05);
  assert.equal(combinedDiscountRate(10, "two_year"), 0.2);
  assert.equal(combinedDiscountRate(250, "annual"), null);
});

test("no internal version label reaches the model prompt", () => {
  const prompt = priceBookForPrompt();
  assert.doesNotMatch(prompt, /\bv\d+(\.\d+)+\b/i, "prompt must not contain a version label");
  assert.match(prompt, /12%/);
  assert.match(prompt, /never both/);
  assert.match(describeBands(foundation), /\$115 \(51-100\)/);
});

test("no internal version label in customer-facing string literals", () => {
  for (const file of ["src/app/pricing/page.tsx", "src/content/faqContent.ts"]) {
    const lines = fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8").split("\n");
    const offenders = lines.filter((line) => {
      const t = line.trim();
      if (t.startsWith("*") || t.startsWith("//") || t.startsWith("/*") || t.startsWith("{/*")) return false;
      return /['"`][^'"`]*\bv1\.\d+(\.\d+)?\b[^'"`]*['"`]/.test(line);
    });
    assert.deepEqual(offenders, [], `${file} prints an internal version label`);
  }
});
