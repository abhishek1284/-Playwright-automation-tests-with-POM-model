// pages/NewsletterPage.js
const { expect } = require('@playwright/test');

class NewsletterPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#newsletter-email');
    this.subscribeButton = page.locator('input[value="Subscribe"]').first();
    this.resultMessage = page.locator('.newsletter-result-block, .message-notification, .result, .error');
  }

  async goto(url = 'https://demowebshop.tricentis.com/') {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle');
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async subscribe(email) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(1500);
    await this.emailInput.fill(email);
    await this.page.waitForTimeout(1500);
    await this.subscribeButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.waitForTimeout(1500);
    await this.subscribeButton.click();
    await this.page.waitForTimeout(2000);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1500);
  }

  async getResultMessage() {
    try {
      await this.resultMessage.first().waitFor({ state: 'visible', timeout: 10000 });
      return await this.resultMessage.first().innerText();
    } catch (e) {
      return '';
    }
  }

  async verifySuccessMessage() {
    const msg = await this.getResultMessage();
    expect(msg.toLowerCase()).toContain('thank');
  }

  async verifyInvalidMessage() {
    const msg = await this.getResultMessage();
    expect(msg.toLowerCase()).toContain('valid');
  }

  async verifyDuplicateMessage() {
    const msg = await this.getResultMessage();
    expect(msg.toLowerCase()).toContain('already');
  }
}

module.exports = { NewsletterPage };
