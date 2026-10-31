export interface Product {
  name: string;
  priceText: string;
}

class ProductsScreen {
  get screen() {
    return $('~test-PRODUCTS');
  }

  get firstPrice() {
    return $('~test-Price');
  }

  private get sortButton() {
    return $('~test-Modal Selector Button');
  }

  private get lowToHighOption() {
    return $('~Price (low to high)');
  }

  async sortByPriceLowToHigh() {
    await this.sortButton.click();
    await this.lowToHighOption.click();
  }

  async getProductsInDisplayOrder(): Promise<Product[]> {
    return this.readExposedProducts();
  }

  private async readExposedProducts(): Promise<Product[]> {
    const products: Product[] = [];

    for (const card of await $$('~test-Item')) {
      const title = card.$('~test-Item title');
      const price = card.$('~test-Price');
      if (!(await title.isExisting()) || !(await price.isExisting())) continue;

      const name = await title.getText();
      products.push({ name, priceText: (await price.getText()).trim() });
    }

    return products;
  }
}

export default new ProductsScreen();
