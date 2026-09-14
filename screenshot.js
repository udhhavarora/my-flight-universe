const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///Users/udhhav/.gemini/antigravity/playground/play/index.html');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'dashboard.png', fullPage: true });
  await browser.close();
  console.log('Screenshot saved to dashboard.png');
})();
