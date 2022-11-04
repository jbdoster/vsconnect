'use strict';
// eslint-disable-next-line no-undef
Object.defineProperty(exports, '__esModule', { value: true });
const jestConfig = {
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
        automock: true,
        collectCoverage: true,
        reporters: ['default', 'github-actions'],
        resetMocks: true,
        coverageReporters: [
          'clover',
          'json',
          'lcov',
          [
            'text',
            // { skipFull: true }
          ],
        ],
        coverageThreshold: {
          global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
          },
        },
      },
    ],
  },
};
// eslint-disable-next-line no-undef
exports.default = jestConfig;
//# sourceMappingURL=jest.config.js.map
