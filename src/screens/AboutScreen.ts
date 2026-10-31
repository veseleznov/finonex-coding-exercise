class AboutScreen {
  private get closeConsentBannerButton() {
    return $('~Close this consent banner');
  }

  get consentBanner() {
    return $('~Cookie Consent Banner, web dialog');
  }

  private get toggleMenuButton() {
    return $('~Toggle menu');
  }

  get whySauceLabsMenuItem() {
    return $('~WHY SAUCELABS');
  }

  async closeConsentBanner() {
    await this.closeConsentBannerButton.waitForDisplayed();
    await this.closeConsentBannerButton.click();
  }

  async toggleMenu() {
    await this.toggleMenuButton.click();
  }
}

export default new AboutScreen();
