/* eslint-disable @typescript-eslint/no-require-imports */
// This is deliberately only the directory-glob API used by Next's get-root-dirs.
// Node 22+ provides the required globbing primitives without pulling a matcher
// into the production dependency tree.
const { globSync: nodeGlobSync, statSync } = require('node:fs');
const { isAbsolute, resolve } = require('node:path');

exports.globSync = function globSync(pattern, options) {
  if (typeof pattern !== 'string' || options?.onlyDirectories !== true) {
    throw new TypeError('Next lint glob adapter only supports directory globbing');
  }
  const cwd = options.cwd;
  const entries = nodeGlobSync(pattern, {
    cwd,
    exclude: options.ignore,
    withFileTypes: false,
  });
  const absoluteOutput = options.absolute === true || isAbsolute(pattern);
  const base = cwd ? resolve(cwd) : process.cwd();

  return entries
    .filter((entry) => {
      const fullPath = isAbsolute(entry) ? entry : resolve(base, entry);
      try {
        return statSync(fullPath).isDirectory();
      } catch {
        return false;
      }
    })
    .map((entry) => (absoluteOutput && !isAbsolute(entry) ? resolve(base, entry) : entry));
};
