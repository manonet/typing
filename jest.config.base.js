const path = require('path');

module.exports = {
  reporters: ['default', 'jest-junit'],

  collectCoverage: true,
  coverageDirectory: './coverage',
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/index.*',
    '!**/index.{d.ts,ts,tsx,js,jsx}',
    '!**/global.d.ts',
    '!**/coverage/**',
    '!**/public/**',
    '!**/report/**',
    '!**/styles/**',
    '!**/target/**',
    '!**/theme/**',
    '!**/types/**',
    '!**/types.ts',
    // Exclude enzyme's react-intl test helper
    '!**/intlEnzymeTestHelper.ts',
    // Exclude redux test helper
    '!**/createStoreTestHelper.ts',
  ],

  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': `<rootDir>/jest/jest-preprocess.js`,
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$',
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/jest/file.mock.js`,
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  transformIgnorePatterns: ['node_modules', `node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [
    `<rootDir>/jest/loadershim.js`,
    `<rootDir>/jest/enzyme.setup.js`,
    // `<rootDir>/jest/shim.setup.js`,
    // `<rootDir>/jest/style.mock.js`,
  ],

  // Required for TS support, since the default only looks for .js/.jsx
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  // Jest's browser environment is based on JSDOM. JSDOM used to allow you to use Object.defineProperty to update certain properties on window;
  // in particular, you could change parts of window.location, or window.top, as you need to.
  //
  // However, in recent versions, JSDOM's API has changed; the preferred way to mock window.location and its child properties is to use reconfigure.
  // Jest is using version 11 of JSDOM as of Jest 22; as a result, tests that used Object.defineProperty may no longer work on certain properties of window.
  //
  // @link https://github.com/facebook/jest/issues/5124
  // @link https://github.com/simon360/jest-environment-jsdom-global
  //
  testEnvironment: 'jest-environment-jsdom-global',
  moduleNameMapper: {
    // CUSTOM PACKAGES:
    '^@actions(.*)$': '<rootDir>/src/actions$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@images(.*)$': '<rootDir>/src/images$1',
    '^@intl(.*)$': '<rootDir>/src/intl$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@reducers(.*)$': '<rootDir>/src/reducers$1',
    '^@routes$': '<rootDir>/src/routes.tsx',
    '^@state(.*)$': '<rootDir>/src/state$1',
    '^@styles(.*)$': '<rootDir>/src/styles$1',
    '^@theme(.*)$': '<rootDir>/src/theme$1',
    '^@types(.*)$': '<rootDir>/src/types$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@$': '<rootDir>/src/',
  },
};
