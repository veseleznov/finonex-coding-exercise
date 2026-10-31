import { standardUser } from '../data/users';
import LoginScreen from '../screens/LoginScreen';
import ProductsScreen from '../screens/ProductsScreen';

describe('Product sorting', () => {
  it('displays products in ascending price order', async () => {
    await LoginScreen.waitForDisplayed();
    await LoginScreen.signIn(standardUser.username, standardUser.password);

    await ProductsScreen.sortByPriceLowToHigh();
    await expect(ProductsScreen.firstPrice).toHaveText('$7.99');

    const products = await ProductsScreen.getProductsInDisplayOrder();
    expect(products).toHaveLength(6);

    const prices: number[] = [];
    for (const { name, priceText } of products) {
      expect(name).not.toBe('');
      expect(priceText).toMatch(/^\$\d+\.\d{2}$/);
      prices.push(Number(priceText.slice(1)));
    }
    expect(prices).toEqual([...prices].sort((left, right) => left - right));
  });
});
