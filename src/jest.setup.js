/* eslint-disable no-undef */
// export default async function (globalConfig, projectConfig) {
//   globalConfig.console = {
//     ...globalConfig.console,
//     log: (i) => undefined,
//     debug: (i) => undefined,
//     info: (i) => undefined,
//     warn: (i) => undefined,
//     error: (i) => undefined,
//   };
// }

global.console = {
  log: jest.fn(),
  error: jest.fn(),
  debug: console.debug,
  trace: console.trace,
  // map other methods that you want to use like console.table
};
