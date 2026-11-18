# Next lint directory-glob adapter

The Next ESLint plugin's `get-root-dirs` helper only needs
`globSync(pattern, { onlyDirectories: true })`. Its pinned `fast-glob` dependency
pulls in third-party pattern matchers that are unnecessary for this narrow call.
This private adapter uses Node 22's built-in `fs.globSync` instead; it does not
exempt an advisory or disable a lint rule.

The override is scoped to `@next/eslint-plugin-next`, not other dependencies.
Updated TypeScript ESLint versions already use `tinyglobby` themselves.
Unsupported calls fail explicitly. `npm run test:lint-glob` exercises literal,
wildcard, brace, ignore, hidden and absolute directory paths through both the
adapter and the actual installed Next helper, and verifies dependency resolution.

After any Next lint-plugin upgrade, search its distributed source for
`fast-glob` calls and rerun the compatibility tests and full lint. Remove this
adapter and override when upstream stops depending on the incompatible glob
API.
