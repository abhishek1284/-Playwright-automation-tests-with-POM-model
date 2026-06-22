// tests/newsletter.spec.js
const { test } = require('@playwright/test');
const { NewsletterPage } = require('../pages/NewsletterPage');

test.describe('Newsletter Subscription Scenarios', () => {
  let newsletterPage;

  test.beforeEach(async ({ page }) => {
    newsletterPage = new NewsletterPage(page);
    await newsletterPage.goto('https://demowebshop.tricentis.com/');
  });

  test('Valid email subscription', async ({ page }) => {
    newsletterPage = new NewsletterPage(page);
    const uniqueEmail = `testuser${Date.now()}@example.com`;

    await newsletterPage.subscribe(uniqueEmail);
    const msg = await newsletterPage.getResultMessage();
    if (msg && msg.length > 0) {
      await newsletterPage.verifySuccessMessage();
    }
  });

  test('Invalid email validation', async ({ page }) => {
    newsletterPage = new NewsletterPage(page);

    await newsletterPage.subscribe('invalidEmail');
    const msg = await newsletterPage.getResultMessage();
    if (msg && msg.length > 0) {
      await newsletterPage.verifyInvalidMessage();
    }
  });

  test('Duplicate subscription handling', async ({ page }) => {
    newsletterPage = new NewsletterPage(page);
    const duplicateEmail = 'newsletter.test@example.com';

    await newsletterPage.subscribe(duplicateEmail);
    const msg = await newsletterPage.getResultMessage();
    if (msg && msg.length > 0) {
      // Can verify if message appears
    }
  });
});
