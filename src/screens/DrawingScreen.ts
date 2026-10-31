import { swipeOnElement } from '../utils/actions';
import { runInWebview } from '../utils/contexts';

class DrawingScreen {
  private get canvas() {
    return $('#signature-pad canvas');
  }

  private get clearButton() {
    return $('~test-CLEAR');
  }

  private get nativeWebview() {
    return $('XCUIElementTypeWebView');
  }

  async getCanvasImage(): Promise<string> {
    return runInWebview(async () => {
      await this.canvas.waitForExist();
      return driver.execute(
        (canvas: HTMLElement) => (canvas as HTMLCanvasElement).toDataURL('image/png'),
        await this.canvas,
      );
    });
  }

  async drawStroke() {
    await swipeOnElement(this.nativeWebview, {
      start: { x: 0.3, y: 0.3 },
      end: { x: 0.7, y: 0.6 },
    });
  }

  async clear() {
    await this.clearButton.click();
  }
}

export default new DrawingScreen();
