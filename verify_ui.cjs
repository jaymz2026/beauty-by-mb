const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Capturing Homepage...');
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verify_home.png', fullPage: true });

  console.log('Capturing Shop...');
  await page.goto('http://localhost:5173/shop');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verify_shop.png', fullPage: true });

  console.log('Capturing Login...');
  await page.goto('http://localhost:5173/login');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'verify_login.png', fullPage: true });

  await browser.close();
})();
