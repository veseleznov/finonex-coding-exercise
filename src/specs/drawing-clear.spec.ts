import { standardUser } from '../data/users';
import DrawingScreen from '../screens/DrawingScreen';
import LoginScreen from '../screens/LoginScreen';
import NavigationMenu from '../screens/NavigationMenu';

describe('Drawing', () => {
  it('clears the canvas after drawing', async () => {
    await LoginScreen.waitForDisplayed();
    await LoginScreen.signIn(standardUser.username, standardUser.password);
    await NavigationMenu.openDrawing();

    const cleanCanvas = await DrawingScreen.getCanvasImage();
    await DrawingScreen.drawStroke();
    const drawnCanvas = await DrawingScreen.getCanvasImage();
    expect(drawnCanvas).not.toBe(cleanCanvas);

    await DrawingScreen.clear();
    expect(await DrawingScreen.getCanvasImage()).toBe(cleanCanvas);
  });
});
