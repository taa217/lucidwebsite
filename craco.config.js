/**
 * CRACO configuration.
 *
 * The only customization here is to silence noisy `source-map-loader`
 * warnings emitted by third-party packages that ship broken/missing
 * `.map` references (notably `@mediapipe/tasks-vision`, pulled in via
 * `@react-three/drei`). We keep source maps fully functional for our
 * own application code.
 *
 * Strategy: locate the `source-map-loader` rule in the CRA webpack
 * config and append the offending packages to its `exclude` list.
 * This works for both the top-level (CRA v5) and nested `oneOf`
 * variants so it's resilient to upstream config changes.
 */

const path = require('path');

const IGNORED_SOURCE_MAP_MODULES = ['@mediapipe'];

const buildIgnoredPaths = () =>
  IGNORED_SOURCE_MAP_MODULES.map((pkg) =>
    path.resolve(__dirname, 'node_modules', pkg)
  );

const ruleUsesSourceMapLoader = (rule) => {
  if (!rule) return false;

  if (typeof rule.loader === 'string' && rule.loader.includes('source-map-loader')) {
    return true;
  }

  if (rule.use) {
    const uses = Array.isArray(rule.use) ? rule.use : [rule.use];
    return uses.some((entry) => {
      const loader = typeof entry === 'string' ? entry : entry && entry.loader;
      return typeof loader === 'string' && loader.includes('source-map-loader');
    });
  }

  return false;
};

const appendExcludes = (rule, extraExcludes) => {
  const existing = rule.exclude;
  const excludes = Array.isArray(existing)
    ? existing
    : existing
      ? [existing]
      : [];

  rule.exclude = [...excludes, ...extraExcludes];
};

const patchSourceMapLoader = (rules, extraExcludes) => {
  if (!Array.isArray(rules)) return;

  rules.forEach((rule) => {
    if (!rule) return;

    if (ruleUsesSourceMapLoader(rule)) {
      appendExcludes(rule, extraExcludes);
    }

    if (Array.isArray(rule.oneOf)) {
      patchSourceMapLoader(rule.oneOf, extraExcludes);
    }
  });
};

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const ignored = buildIgnoredPaths();
      patchSourceMapLoader(webpackConfig.module && webpackConfig.module.rules, ignored);
      return webpackConfig;
    },
  },
};
