import { expect } from "@playwright/test";

export class QuantityPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.locator("//input[@value='Add to cart']");
    this.quantityInput = page.locator('//*[@id="addtocart_2_EnteredQuantity"]');
    this.errorMessage = page.locator('#bar-notification .content, .message-error.validation-summary-errors, .field-validation-error');
  }

  async setQuantity(value) {
    await this.quantityInput.scrollIntoViewIfNeeded();
    await this.quantityInput.fill(value.toString());
  }

  async clickAddToCart() {
    await this.addToCartButton.first().scrollIntoViewIfNeeded();
    await this.addToCartButton.first().click();
  }

  async verifyQuantityError(expectedText = 'Quantity should be positive') {
    await expect(this.errorMessage.first()).toContainText(expectedText, { timeout: 5000 });
  }
}
