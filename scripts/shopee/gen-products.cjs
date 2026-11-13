const fs = require('fs');
const items = require('./data/items.json');
const PDP_PATH = require('path').join(__dirname, 'data/pdp.json');
const pdp = fs.existsSync(PDP_PATH) ? require(PDP_PATH) : {};
const OUT = require('path').join(__dirname, '../../src/data/products.ts');

const RULES = [
  ['electric', /電容器|觸控面板組/],
  ['machine', /二手機|做完大保養|半自動咖啡機 (Vibiemme|Expobar|Laspaziale)|雙孔半自動咖啡機 Wega|全新單孔咖啡機|定量磨豆機 \(二手/],
  ['grinder', /磨豆機|刀盤|豆桶/],
  ['steam', /蒸氣|蒸器|噴嘴|噴頭|熱水|旋紐|4孔/],
  ['electric', /電容器|電磁閥|觸控|按鍵|面板|開關|壓力控制器|壓力開關|感應器|馬達|流量計|加熱器|鍵板/],
  ['pump', /幫浦|均壓閥|洩壓閥|安全閥|膨漲閥|排水|絲管|接頭|壓力錶|壓錶|止水|球閥|進水|盛水|水閥|逆止|減壓|水壓錶|調整腳|底座/],
  ['brew', /沖泡|分水|濾杯|濾網|把手|清洗|墊圈|茶把手|茶包|散茶|IMS|ims/],
];
const PREFIX = { brew: 'BRW', steam: 'STM', grinder: 'GRD', electric: 'ELE', pump: 'PMP', machine: 'MCH' };
const BRANDS = ['Faema','KLUB','Klub','klub','Gino','GINO','Rancilio','Epoca','Promac','Cimbali','Casadio','Simonelli','Appia','APPIA','Aurelia','Musica','Lamarzocco','Lamszocco','La Marzocco','Gaggia','Saeco','Bezzera','BEZZERA','Laspaziale','Marcfi','CMA','Astoria','Lelit','Expobar','Rocket','Sanremo','Parker','ODE','ULKA','Mazzer','Quamar','Ducati','Compak','Wega','Fiorenzato','Vibiemme','Anfim','Pavoni','Reneka','Fiamma','BFC','Sirai','Asco','Gicar','gicar','IMS','ims','Victoria Arduino','元揚','飛馬','MCE','Casadio','Lanna','E61','E98','E98RE','M27','F64E','F83E','M80','T80','900N','Major','Silvia','Bianca','My way','Lido','Carat','S2','Lollo','Caimano','Sanremo'];
const MATERIALS = [['矽膠',/矽膠/],['橡膠 (耐熱)',/墊圈|止水墊|清洗軟墊/],['不銹鋼',/不銹鋼|不鏽鋼|鋼絲/],['鐵氟龍',/鐵氟龍|鐵夫隆/],['銅',/銅/],['核桃木 + 不銹鋼',/核桃木|胡桃木/],['塑膠 / 電子件',/電容器|開關|觸控|按鍵|面板|感應器|鍵板/],['金屬',/幫浦|馬達|刀盤|閥|錶|接頭|把手|流量計|排水盒|盛水盤|螺絲|彈簧|旋紐|噴嘴|噴頭|插銷|轉盤|托架|豆桶|濾網|濾杯|加熱器/]];

function cat(name) { for (const [c, re] of RULES) if (re.test(name)) return c; return 'brew'; }
function brand(name) {
  const hits = BRANDS.filter(b => name.includes(b));
  const clean = hits.map(b => ({ Klub:'KLUB', klub:'KLUB', GINO:'Gino', APPIA:'Appia', Lamszocco:'La Marzocco', Lamarzocco:'La Marzocco', BEZZERA:'Bezzera', ims:'IMS', gicar:'Gicar' }[b] || b));
  const primary = clean.find(b => !/^(E61|E98|E98RE|M27|F64E|F83E|M80|T80|900N|Major|Silvia|Bianca|My way|Lido|Carat|S2|Lollo|Caimano|Epoca|Appia|Aurelia|Musica)$/.test(b));
  return primary || '副廠 / 通用';
}
function compat(name) {
  const hits = [...new Set(BRANDS.filter(b => name.includes(b)).map(b => ({ Klub:'KLUB', klub:'KLUB', GINO:'Gino', APPIA:'Appia', Lamszocco:'La Marzocco', Lamarzocco:'La Marzocco', BEZZERA:'Bezzera', ims:'IMS', gicar:'Gicar' }[b] || b)))];
  return hits.length ? hits.join(' / ') : '通用 / 依規格確認';
}
function material(name, desc) {
  const s = name + ' ' + (desc || '');
  for (const [m, re] of MATERIALS) if (re.test(s)) return m;
  return '依實品';
}
function specFrom(name, d) {
  const desc = (d?.description || '').replace(/\r/g, '');
  const dims = name.match(/\d+(\.\d+)?\s*[\*×xX]\s*\d+(\.\d+)?(\s*[\*×xX]\s*\d+(\.\d+)?)?/);
  const uf = name.match(/\d+(\.\d+)?\s*[uU][fF]/);
  const volt = name.match(/\d{2,3}\s*V/);
  const thick = name.match(/厚度\s*\d+(\.\d+)?(mm|公分)?/);
  const thread = name.match(/[一二三四]分[內外]?牙|1\/4[”"]?/);
  const w = name.match(/\d+\s*W\b/);
  const parts = [dims && dims[0].replace(/\s/g,'') + 'mm', uf && uf[0], volt && volt[0], w && w[0], thick && thick[0], thread && thread[0]].filter(Boolean);
  if (parts.length) return parts.join(' / ');
  const line = desc.split('\n').map(s => s.trim()).filter(s => s.length >= 4 && s.length <= 40 && !/聊聊|運費|請|謝謝|注意|本價格|價格|元$/.test(s) && !/[於:：,，]$/.test(s))[0];
  if (line) return line.replace(/^[,，。、;；:：\s]+|[,，。、;；:：]+$/g, '');
  return d?.cat?.slice(-1)[0] || '依商品頁';
}
function cleanName(n) { return n.replace(/\[零件咖\]\s*/g, '').replace(/宜蘭(半自動)?(修|維修|咖啡機)?(咖啡機|專修班|專門店|維修專門店|修理|零件)?[^\s]*/g, '').replace(/\s{2,}/g, ' ').trim(); }

const seen = {};
const rows = items.map((it, i) => {
  const c = it.item_card_displayed_asset || it;
  const d = pdp[it.itemid];
  const name = cleanName(c.name || d?.name || '');
  const category = cat(c.name || '');
  const price = Math.round(((it.item_card_display_price?.price ?? it.price ?? d?.price ?? 0)) / 100000);
  const soldTxt = it.item_card_display_sold_count?.historical_sold_count_text || '';
  const sold = it.historical_sold ?? (parseInt((soldTxt.match(/\d+/) || ['0'])[0]) || 0);
  let stock = d?.stock != null ? parseInt(String(d.stock).replace(/\D/g, '')) : NaN;
  if (Number.isNaN(stock)) stock = it.is_sold_out ? 0 : (d?.models?.some(m => m.has_stock) === false ? 0 : 5);
  const rating = it.item_rating?.rating_star ?? d?.rating ?? 0;
  seen[category] = (seen[category] || 0) + 1;
  return {
    id: String(it.itemid),
    sku: `${PREFIX[category]}-${String(it.itemid).slice(-6)}`,
    name, brand: brand(c.name || ''), category, price, stock,
    spec: specFrom(c.name || '', d), material: material(c.name || '', d?.description), compatible: compat(c.name || ''),
    // 只輸出頁面實際使用的欄位(蝦皮圖片列表、商品描述、評價數不輸出,以減少打包體積)
    image: `/img/products/${it.itemid}.webp`,
    sold, rating: Math.round(rating * 10) / 10,
    url: `https://shopee.tw/product/${it.shopid}/${it.itemid}`,
  };
});
const ts = `import type { Product } from '../types';

// 資料來源:蝦皮賣場「零件咖」https://shopee.tw/akey9673 (${new Date().toISOString().slice(0,10)} 抓取,共 ${rows.length} 件)
// 由 scripts/gen-products.js 產生,請勿手動編輯
export const PRODUCTS: Product[] = ${JSON.stringify(rows, null, 2)};
`;
fs.writeFileSync(OUT, ts);
console.log('wrote', rows.length, 'products; with detail:', rows.filter(r => pdp[r.id]).length, 'cats', seen);

// ---- 下載缺少的主圖 (400px webp) ----
const https = require('https');
const path = require('path');
const IMG_DIR = path.join(__dirname, '../../public/img/products');
fs.mkdirSync(IMG_DIR, { recursive: true });
const missing = items.map(it => ({ id: it.itemid, hash: (it.item_card_displayed_asset || it).image }))
  .filter(x => x.hash && !fs.existsSync(path.join(IMG_DIR, `${x.id}.webp`)));
console.log('images to download:', missing.length);
function dl(x) {
  return new Promise((resolve) => {
    const url = `https://down-tw.img.susercontent.com/file/${x.hash}@resize_w400_nl.webp`;
    https.get(url, (res) => {
      if (res.statusCode !== 200) { console.log('img fail', x.id, res.statusCode); res.resume(); return resolve(); }
      const ws = fs.createWriteStream(path.join(IMG_DIR, `${x.id}.webp`));
      res.pipe(ws); ws.on('finish', resolve);
    }).on('error', (e) => { console.log('img err', x.id, e.message); resolve(); });
  });
}
(async () => {
  for (let i = 0; i < missing.length; i += 6) await Promise.all(missing.slice(i, i + 6).map(dl));
  if (missing.length) console.log('images done');
})();
