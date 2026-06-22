const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://demowebshop.tricentis.com/books');
  await page.waitForLoadState('networkidle');
  console.log('url', page.url());
  const selects = await page.$$eval('select', els => els.map(el => el.outerHTML));
  console.log('selects count', selects.length);
  selects.forEach((s, i) => console.log('select', i, s));
  const filters = await page.$$eval('.filter, .filter-item, .product-filter, .product-filters, .filter-list, .facet', els => els.map(el => el.outerHTML.slice(0,500)));
  console.log('filter count', filters.length);
  filters.forEach((f, i) => console.log('filter', i, f));
  const items = await page.$$eval('.product-item, .item-box', els => els.map(el => el.outerHTML.slice(0,500)));
  console.log('item count', items.length);
  items.slice(0,10).forEach((html,i)=>console.log('item',i,html));
  await browser.close();
})();
