const jestConfig = require('./jest.config.base');

// in case of jest running all tests instead of only those related to changed files, try using `watchman watch-del-all` command;
// which resets watches and associated triggers and then run the `test:unit:watch` script again
module.exports = {
  ...jestConfig,
  collectCoverage: false,
  // See https://github.com/jest-community/vscode-jest/issues/382#issuecomment-424083512
  // Needed for --findRelatedTests
  modulePaths: ['<rootDir>'],
};
