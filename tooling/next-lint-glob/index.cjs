// This is deliberately only the directory-glob API used by Next's get-root-dirs.
// It removes fast-glob → micromatch → braces, not an audit advisory exemption.
// eslint-disable-next-line @typescript-eslint/no-require-imports -- CommonJS caller in the Next ESLint plugin
const { globSync: tinyGlobSync } = require('tinyglobby');
// eslint-disable-next-line @typescript-eslint/no-require-imports -- This adapter exports the CommonJS API required by Next
const { isAbsolute } = require('node:path');

exports.globSync = function globSync(pattern, options) {
  if (typeof pattern !== 'string' || options?.onlyDirectories !== true) {
    throw new TypeError('Next lint glob adapter only supports directory globbing');
  }
  // tinyglobby marks matching directories with a slash; fast-glob does not.
  return tinyGlobSync(pattern, {
    ...options,
    absolute: options.absolute ?? isAbsolute(pattern),
  }).map((entry) =>
    entry.endsWith('/') && entry !== '/' && !/^[a-z]:\/$/i.test(entry)
      ? entry.slice(0, -1)
      : entry
  );
};
