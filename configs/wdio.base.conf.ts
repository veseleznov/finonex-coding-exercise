import 'dotenv/config';

export const baseConfig: Omit<WebdriverIO.Config, 'capabilities'> = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  specs: ['../src/specs/**/*.spec.ts'],
  maxInstances: 5,
  framework: 'mocha',
  services: ['browserstack'],
  reporters: ['spec'],
  logLevel: 'warn',
  waitforTimeout: 10_000,
  mochaOpts: {
    timeout: 180_000,
  },
  onPrepare() {
    if (!process.env.BROWSERSTACK_USERNAME || !process.env.BROWSERSTACK_ACCESS_KEY) {
      throw new Error('Set BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY in .env.');
    }
  },
};
