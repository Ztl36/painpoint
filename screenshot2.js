const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push('[console.error] ' + msg.text());
  });
  page.on('pageerror', err => errors.push('[pageerror] ' + err.message));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'D:/ztt/DemandMiner/painpoint-lighthouse/screenshot2.png', fullPage: false });

  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('=== BODY TEXT ===');
  console.log(bodyText.substring(0, 1000));
  console.log('=== ERRORS ===');
  console.log(JSON.stringify(errors, null, 2));

  await browser.close();
  console.log('Done!');
})();
