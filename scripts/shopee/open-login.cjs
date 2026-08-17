const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
  const ctx = browser.contexts()[0];
  const page = await ctx.newPage();
  await page.goto('https://shopee.tw/buyer/login?next=https%3A%2F%2Fshopee.tw%2Fakey9673', { waitUntil: 'load', timeout: 60000 }).catch(()=>{});
  await page.waitForTimeout(3000);
  try { await page.getByText('繁體中文', { exact: true }).first().click({ timeout: 3000 }); } catch {}
  await page.bringToFront();
  console.log('login page opened:', page.url());
  process.exit(0);
})();
