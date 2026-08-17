const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const items = require('./data/items.json');
  const PDP = require('path').join(__dirname, 'data/pdp.json');
  const out = fs.existsSync(PDP) ? JSON.parse(fs.readFileSync(PDP)) : {};
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
  const ctx = browser.contexts()[0];
  const page = await ctx.newPage();
  await page.goto('https://shopee.tw/akey9673', { waitUntil: 'load', timeout: 60000 }).catch(()=>{});
  await page.waitForTimeout(4000);
  const limit = parseInt(process.argv[2] || '5');
  let done = 0, fail = 0;
  for (const it of items) {
    if (out[it.itemid]) continue;
    if (done >= limit) break;
    const r = await page.evaluate(async ({ shopid, itemid }) => {
      const res = await fetch(`https://shopee.tw/api/v4/pdp/get_pc?shop_id=${shopid}&item_id=${itemid}&tz_offset_minutes=480&detail_level=0`, { headers: { 'x-api-source': 'pc', 'accept': 'application/json' } });
      return await res.json();
    }, { shopid: it.shopid, itemid: it.itemid });
    if (r && r.data && r.data.item) {
      const d = r.data.item;
      out[it.itemid] = { name: d.title, description: d.description, stock: d.stock_display, is_unavailable: d.is_unavailable, item_status: d.item_status, price: d.price, price_min: d.price_min, price_max: d.price_max, images: d.images, image: d.image, models: (d.models||[]).map(m=>({name:m.name,has_stock:m.has_stock,price:m.price})), tier_variations: (d.tier_variations||[]).map(t=>({name:t.name,options:t.options})), brand: d.brand, attributes: d.attributes, sold: d.historical_sold, rating: d.item_rating?.rating_star, cat: (d.categories||[]).map(c=>c.display_name) };
      done++;
    } else { fail++; console.log('FAIL', it.itemid, JSON.stringify(r).slice(0, 80)); if (fail >= 8) break; await page.waitForTimeout(240000); }
    if ((done + fail) % 10 === 0) { fs.writeFileSync(PDP, JSON.stringify(out)); console.log('progress', Object.keys(out).length); }
    await page.waitForTimeout(5000 + Math.random() * 4000);
  }
  fs.writeFileSync(PDP, JSON.stringify(out));
  console.log('DONE ok', done, 'fail', fail, 'total', Object.keys(out).length);
  await page.close(); process.exit(0);
})();
