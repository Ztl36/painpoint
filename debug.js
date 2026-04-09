const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:5174', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Get page content
  const content = await page.content();
  console.log('=== PAGE TITLE ===');
  console.log(await page.title());
  console.log('=== ERRORS ===');
  console.log(JSON.stringify(errors, null, 2));
  console.log('=== BODY TEXT (first 2000 chars) ===');
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log(bodyText.substring(0, 2000));

  await browser.close();
})();
