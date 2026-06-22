import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Shipping method radio buttons
    this.groundShipping = page.locator("input[value='Ground___Shipping.FixedRate']");
    this.nextDayAir = page.locator("input[value='Next Day Air___Shipping.FixedRate']");
    this.secondDayAir = page.locator("input[value='2nd Day Air___Shipping.FixedRate']");

    // Scoped locators for each step
    this.shippingContinue = page.locator(
      "#shipping-buttons-container input.button-1.shipping-method-next-step-button"
    );
    this.paymentContinue = page.locator(
      "#payment-method-buttons-container input.button-1.payment-method-next-step-button"
    );
    this.confirmContinue = page.locator(
      "#payment-info-buttons-container input.button-1.payment-info-next-step-button"
    );
    this.confirmOrderButton = page.locator(
      "#confirm-order-buttons-container input.button-1.confirm-order-next-step-button"
    );
    this.orderSuccessMessage = page.locator(".section.order-completed .title");
  }

  async selectShippingMethod(method = "Ground") {
    // ✅ Select shipping option
    if (method === "Ground") {
      await this.groundShipping.check();
    } else if (method === "Next Day Air") {
      await this.nextDayAir.check();
    } else if (method === "2nd Day Air") {
      await this.secondDayAir.check();
    }

    // ✅ Ensure Continue is visible and enabled
    await this.shippingContinue.scrollIntoViewIfNeeded();
    await expect(this.shippingContinue).toBeVisible({ timeout: 5000 });
    await this.shippingContinue.click();
  }

  async completePayment() {
    await this.paymentContinue.click();
  }

  async confirmPaymentInfo() {
    await this.confirmContinue.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.scrollIntoViewIfNeeded();
    await expect(this.confirmOrderButton).toBeVisible();
    await this.confirmOrderButton.click();
  }

  async verifyOrderSuccess() {
    await expect(this.orderSuccessMessage).toHaveText(
      "Your order has been successfully processed!"
    );
  }
}
