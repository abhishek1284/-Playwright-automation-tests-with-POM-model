import { expect } from "@playwright/test";

export class AddToCartPage {
  constructor(page) {
    this.page = page;
  }

  async setQuantity(productId, quantity) {
    const quantityInput = this.page.locator(`//*[@id="addtocart_${productId}_EnteredQuantity"]`);
    await quantityInput.fill(""); // clear existing value
    await quantityInput.fill(quantity.toString()); // set new value
  }

  async clickAddToCart(productId) {
    const addToCartBtn = this.page.locator(`//*[@id="add-to-cart-button-${productId}"]`);
    await addToCartBtn.click();
  }

  async verifyAddToCartSuccess() {
    await expect(this.page.locator("#bar-notification"))
      .toContainText("The product has been added to your shopping cart");
  }

  async verifyQuantityError(expectedMessage) {
    await expect(this.page.locator(".message-error"))
      .toContainText(expectedMessage);
  }
}