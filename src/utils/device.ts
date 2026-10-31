type DeviceOrientation = 'LANDSCAPE' | 'PORTRAIT';

export const device = {
  /** Rotates the device and waits until the requested orientation is reported. */
  async setOrientation(orientation: DeviceOrientation): Promise<void> {
    await driver.setOrientation(orientation);
    await driver.waitUntil(
      async () => (await driver.getOrientation()).toUpperCase() === orientation,
      {
        timeoutMsg: `Device did not rotate to ${orientation}`,
      },
    );
  },
};
