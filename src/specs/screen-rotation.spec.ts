import { standardUser } from '../data/users';
import AboutScreen from '../screens/AboutScreen';
import LoginScreen from '../screens/LoginScreen';
import NavigationMenu from '../screens/NavigationMenu';
import { device } from '../utils/device';

describe('Screen rotation', () => {
  it('keeps the About page usable after rotation', async () => {
    await LoginScreen.waitForDisplayed();
    await LoginScreen.signIn(standardUser.username, standardUser.password);
    await NavigationMenu.openAbout();
    await expect(AboutScreen.consentBanner).toBeDisplayed();

    expect((await driver.getOrientation()).toUpperCase()).toBe('PORTRAIT');
    await device.setOrientation('LANDSCAPE');
    expect((await driver.getOrientation()).toUpperCase()).toBe('LANDSCAPE');

    const rotatedWindow = await driver.getWindowSize();
    expect(rotatedWindow.width).toBeGreaterThan(rotatedWindow.height);

    await AboutScreen.closeConsentBanner();
    await expect(AboutScreen.consentBanner).not.toBeDisplayed();

    await AboutScreen.toggleMenu();
    await expect(AboutScreen.whySauceLabsMenuItem).toBeDisplayed();
  });
});
