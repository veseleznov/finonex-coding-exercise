class LoginScreen {
  get screen() {
    return $('~test-Login');
  }

  get loginButton() {
    return $('~test-LOGIN');
  }

  private get username() {
    return $('~test-Username');
  }

  private get password() {
    return $('~test-Password');
  }

  async waitForDisplayed() {
    await this.screen.waitForDisplayed({ timeout: 30_000 });
  }

  async signIn(username: string, password: string) {
    await this.username.setValue(username);
    await this.password.setValue(password);
    await this.loginButton.click();
  }
}

export default new LoginScreen();
