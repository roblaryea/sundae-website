import assert from "node:assert/strict";
import test from "node:test";

import {
  getSentryClientReplayPolicy,
  PRODUCTION_ERROR_REPLAY_SAMPLE_RATE,
  resolveSentryEnvironment,
} from "../src/lib/observability/sentry-runtime-policy.mjs";

test("samples only canonical production website error replays", () => {
  assert.deepEqual(
    getSentryClientReplayPolicy({
      hostname: "www.sundae.io",
      nodeEnvironment: "production",
    }),
    {
      environment: "production",
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: PRODUCTION_ERROR_REPLAY_SAMPLE_RATE,
    },
  );
});

test("does not spend replay quota on previews or localhost", () => {
  assert.equal(
    getSentryClientReplayPolicy({
      hostname: "sundae-website-git-example.vercel.app",
      nodeEnvironment: "production",
    }).replaysOnErrorSampleRate,
    0,
  );
  assert.equal(
    getSentryClientReplayPolicy({
      hostname: "localhost",
      nodeEnvironment: "development",
    }).replaysOnErrorSampleRate,
    0,
  );
});

test("labels server events from the configured canonical site URL", () => {
  assert.equal(
    resolveSentryEnvironment({
      publicSiteUrl: "https://www.sundae.io",
      vercelEnvironment: "preview",
    }),
    "production",
  );
  assert.equal(
    resolveSentryEnvironment({
      publicSiteUrl: "https://sundae-website-git-example.vercel.app",
      nodeEnvironment: "production",
    }),
    "preview",
  );
});
