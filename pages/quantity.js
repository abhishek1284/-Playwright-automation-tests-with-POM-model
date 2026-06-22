import { expect } from "@playwright/test";

export class quantity{
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator("//input[@value='Add to cart']");
    this.barNotification = page.locator('#bar-notification');
    this.cartQuantity = page.locator('.cart-qty');
    this.quantityInput = page.locator('input[id*="EnteredQuantity"]'); 
    this.errorMessage = page.locator('.message-error.validation-summary-errors');
  }

  async addToCartFromSearchOrProduct() {
    await this.addToCartButton.first().click();
    await this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {});
    await this.page.waitForTimeout(1000);
  }

  async clickAddToCartOnProductPage() {
    await this.addToCartButton.first().click();
  }

  async setQuantity(value) {
    await this.quantityInput.fill(value);
  }

  async verifyAddToCartSuccess(expectedCount = "(1)") {
    await expect(this.cartQuantity).toContainText(expectedCount, { timeout: 5000 });
  }

  async verifyQuantityError() {
    await expect(this.errorMessage).toContainText("Quantity should be positive", { timeout: 5000 });
  }
}
