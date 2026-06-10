export class ProductPage {
  constructor(page) {
    this.page = page;
    this.addToCartButtons = page.locator("input[value='Add to cart']");
  }

  async navigateToHomePage() {
    await this.page.goto("https://demowebshop.tricentis.com/");
  }

  async openCategory(categoryName) {
    await this.page.click(`text=${categoryName}`);
  }

  async addProducts(limit = 2) {
    const count = await this.addToCartButtons.count();

    for (let i = 0; i < Math.min(count, limit); i++) {
      await this.addToCartButtons.nth(i).click();
      await this.page.waitForTimeout(1000);
    }
  }

  async addProductsFromCategories(categories) {
    for (const category of categories) {
      console.log(`Adding products from: ${category}`);

      await this.openCategory(category);
      await this.addProducts(2);

      await this.navigateToHomePage();
    }
  }
}