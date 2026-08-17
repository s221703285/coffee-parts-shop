const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
  const ctx = browser.contexts()[0];
  const page = await ctx.newPage();
  const items = new Map();
  let lastApi = Date.now();
  page.on('response', async (res) => {
    const u = res.url();
    if (!u.includes('/api/v4/')) return;
    let j; try { j = await res.json(); } catch { return; }
    const s = JSON.stringify(j);
    if (!s.includes('"itemid"') && !s.includes('"item_id"')) return;
    if (j.error === 90309999) { console.log('BLOCKED', u.slice(0,100)); return; }
    let arr = [];
    if (j?.data?.sections) for (const sec of j.data.sections) arr.push(...(sec?.data?.item || []));
    if (j?.data?.centralize_item_card?.item_cards) arr.push(...j.data.centralize_item_card.item_cards);
    if (j?.items) arr.push(...j.items);
    if (j?.data?.items) arr.push(...j.data.items);
    let n = 0;
    for (const it of arr) { const c = it.item_basic || it.item_data?.item_card_displayed_asset ? it : (it.item_basic || it); const id = c.itemid || c.item_id || c.item_data?.item_id; if (id) { items.set(id, c); n++; } }
    if (n) { lastApi = Date.now(); console.log('API', u.slice(0, 110), '+', n, 'total', items.size); }
  });
  const total = 300;
  for (let p = 0; p < 12; p++) {
    await page.goto(`https://shopee.tw/akey9673?page=${p}&sortBy=pop`, { waitUntil: 'load', timeout: 60000 }).catch(e=>console.log('goto', e.message.slice(0,80)));
    await page.waitForTimeout(6000);
    for (let k = 0; k < 6; k++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(700); }
    await page.waitForTimeout(3000);
    console.log('page', p, page.url().slice(0,80), 'items', items.size);
    if (page.url().includes('login') || page.url().includes('verify')) { console.log('NEED LOGIN/VERIFY'); await page.screenshot({path:'blocked.png'}); break; }
    fs.writeFileSync(require('path').join(__dirname, 'data/items.json'), JSON.stringify([...items.values()], null, 1));
    if (items.size >= total) break;
  }
  await page.screenshot({ path: 'last.png' });
  fs.writeFileSync(require('path').join(__dirname, 'data/items.json'), JSON.stringify([...items.values()], null, 1));
  console.log('DONE total items', items.size);
  await page.close();
  process.exit(0);
})();
