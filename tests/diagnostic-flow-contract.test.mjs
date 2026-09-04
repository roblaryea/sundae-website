import assert from "node:assert/strict";
import { test } from "node:test";

import {
  canAdvanceDiagnosticQuestion,
  diagnosticOtherDetails,
  diagnosticOtherKey,
  filterDiagnosticOptions,
  toggleDiagnosticMultiValue,
} from "../src/lib/diagnostic/flowLogic.ts";
import {
  PUBLIC_DIAGNOSTIC_QUESTIONS,
  PUBLIC_DIAGNOSTIC_QUESTION_IDS,
} from "../src/lib/diagnostic/questions.ts";
import { isPhoneRequiredForLead, isValidOptionalPhone } from "../src/lib/leadValidation.ts";

const byId = Object.fromEntries(PUBLIC_DIAGNOSTIC_QUESTIONS.map((question) => [question.id, question]));

test("public diagnostic is a focused 14-question flow with all five dimensions", () => {
  assert.equal(PUBLIC_DIAGNOSTIC_QUESTIONS.length, 14);
  assert.deepEqual(
    PUBLIC_DIAGNOSTIC_QUESTIONS.map((question) => question.id),
    [...PUBLIC_DIAGNOSTIC_QUESTION_IDS],
  );
  assert.deepEqual(
    new Set(PUBLIC_DIAGNOSTIC_QUESTIONS.map((question) => question.dimension)),
    new Set(["profile", "crew", "core", "foresight", "tech"]),
  );
  for (const removedQualificationField of [
    "decision_data",
    "blind_spot",
    "timeline",
    "decision_lag",
    "budget_band",
    "tech_headcount",
  ]) {
    assert.equal(byId[removedQualificationField], undefined);
  }
});

test("public prompts and helpers avoid unexplained internal language", () => {
  const publicCopy = PUBLIC_DIAGNOSTIC_QUESTIONS
    .flatMap((question) => [question.prompt, question.helper ?? ""])
    .join(" ");
  for (const jargon of ["AUV", "RevPASH", "country-pack", "operations stack", "Sundae motion", "signal to action"]) {
    assert.equal(publicCopy.includes(jargon), false, `unexpected jargon: ${jargon}`);
  }
});

test("none and unsure are exclusive in multi-select answers", () => {
  assert.deepEqual(toggleDiagnosticMultiValue(["manual", "7shifts"], "none"), ["none"]);
  assert.deepEqual(toggleDiagnosticMultiValue(["none"], "manual"), ["manual"]);
  assert.deepEqual(toggleDiagnosticMultiValue(["manual"], "unsure"), ["unsure"]);
});

test("Other selections require meaningful detail and preserve it for the report", () => {
  const question = byId.payroll_regions;
  const otherKey = diagnosticOtherKey(question.id);
  assert.equal(canAdvanceDiagnosticQuestion(question, { payroll_regions: ["other"] }), false);
  assert.equal(
    canAdvanceDiagnosticQuestion(question, { payroll_regions: ["other"], [otherKey]: "Kenya" }),
    true,
  );

  assert.deepEqual(
    diagnosticOtherDetails(
      { payroll_regions: ["other"], [otherKey]: "  Kenya  " },
      ["scheduling_tool", "payroll_regions", "pos"],
    ),
    [{ questionId: "payroll_regions", detail: "Kenya" }],
  );
});

test("large option sets can be searched using their localized labels", () => {
  const options = byId.region.options;
  const matches = filterDiagnosticOptions(options, { uae: "Émirats arabes unis" }, "émirats");
  assert.deepEqual(matches.map((option) => option.value), ["uae"]);
  assert.deepEqual(
    filterDiagnosticOptions(options, { uae: "UAE" }, "United Arab").map((option) => option.value),
    ["uae"],
  );
  assert.deepEqual(
    filterDiagnosticOptions(options, { uae: "Émirats arabes unis" }, "emirats").map((option) => option.value),
    ["uae"],
  );
});

test("phone stays required on contact forms but is optional for the promised diagnostic result", () => {
  assert.equal(isPhoneRequiredForLead("/contact", undefined), true);
  assert.equal(isPhoneRequiredForLead("/diagnostic", undefined), false);
  assert.equal(isPhoneRequiredForLead(undefined, "diagnostic-call-request"), false);
  assert.equal(isValidOptionalPhone(""), true);
  assert.equal(isValidOptionalPhone("+971 50 123 4567"), true);
  assert.equal(isValidOptionalPhone("123"), false);
});
