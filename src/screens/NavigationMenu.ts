import { tapElementWithRelativeOffset } from '../utils/actions';

class NavigationMenu {
  private get menuButton() {
    return $('~test-Menu');
  }

  private get drawingOption() {
    return $('~test-DRAWING');
  }

  private get aboutOption() {
    return $('~test-ABOUT');
  }

  async openDrawing() {
    await this.clickMenuButton();
    await this.drawingOption.click();
  }

  async openAbout() {
    await this.clickMenuButton();
    await this.aboutOption.click();
  }

  private async clickMenuButton() {
    await tapElementWithRelativeOffset(this.menuButton, { y: 0.25 });
  }
}

export default new NavigationMenu();
