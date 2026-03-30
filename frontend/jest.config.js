const { createCjsPreset } = require('jest-preset-angular/presets');

const presetConfig = createCjsPreset({
  setupFilesAfterFramework: ['<rootDir>/src/setup-jest.ts'],
});

/** @type {import('jest').Config} */
module.exports = {
  ...presetConfig,
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
};
