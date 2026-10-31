import { baseConfig } from './wdio.base.conf';

const appUrl = process.env.BROWSERSTACK_APP_URL;
if (!appUrl) {
  throw new Error('Set BROWSERSTACK_APP_URL in .env.');
}

const iosDevices = [
  { name: 'iPhone 16', version: '18' },
  // { name: 'iPhone 16 Pro', version: '18' },
  // { name: 'iPhone 17', version: '26' },
];

const commonCapabilities = {
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:app': appUrl,
  'bstack:options': {
    projectName: 'Mobile Automation Exercise',
    buildName: 'iOS mobile tests',
  },
};

export const config: WebdriverIO.Config = {
  ...baseConfig,
  capabilities: iosDevices.map(({ name, version }) => ({
    ...commonCapabilities,
    'appium:deviceName': name,
    'appium:platformVersion': version,
  })),
};
