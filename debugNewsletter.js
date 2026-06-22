const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  await page.goto('https://demowebshop.tricentis.com/', { waitUntil: 'networkidle' });
  
  console.log('\n=== Newsletter Email Input Selectors ===');
  
  // Try various newsletter email input selectors
  const selectors = [
    'input[id*="newsletter"]',
    'input[name*="newsletter"]',
    'input[placeholder*="email"]',
    'input[placeholder*="Email"]',
    'input[type="email"]',
    '#newsletter-email',
    'input#newsletter-email',
    'input[name="newsletter-email"]',
    'form input',
    '.newsletter-block input',
    'input.newsletter-email',
  ];
  
  for (const selector of selectors) {
    try {
      const locator = page.locator(selector);
      const count = await locator.count();
      if (count > 0) {
        console.log(`✓ Found: "${selector}" - ${count} element(s)`);
        const element = await locator.first().getAttribute('id');
        const name = await locator.first().getAttribute('name');
        const type = await locator.first().getAttribute('type');
        console.log(`  ID: ${element}, Name: ${name}, Type: ${type}`);
      }
    } catch (e) {
      // Ignore
    }
  }
  
  console.log('\n=== Newsletter Subscribe Button Selectors ===');
  
  const buttonSelectors = [
    'button:has-text("Subscribe")',
    'input[type="button"][value*="Subscribe"]',
    'input[value*="Subscribe"]',
    '.newsletter-subscribe-button',
    'button.newsletter-subscribe-button',
    'form button',
    '.block-newsletter button',
  ];
  
  for (const selector of buttonSelectors) {
    try {
      const locator = page.locator(selector);
      const count = await locator.count();
      if (count > 0) {
        console.log(`✓ Found: "${selector}" - ${count} element(s)`);
      }
    } catch (e) {
      // Ignore
    }
  }
  
  console.log('\n=== All inputs in newsletter area ===');
  const inputs = await page.locator('.block-newsletter input').count();
  console.log(`Total inputs in .block-newsletter: ${inputs}`);
  
  // Get HTML of newsletter block
  const html = await page.locator('.block-newsletter').innerHTML();
  console.log('\n=== Newsletter HTML ===');
  console.log(html.substring(0, 500));
  
  await browser.close();
})();
