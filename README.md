# 零件咖 — 咖啡機零組件購物網站

乾淨電商風的咖啡機零組件供應商購物網站前端 Demo。商品資料與圖片來自蝦皮賣場「零件咖」(https://shopee.tw/akey9673),尚未串接後端。

## 技術架構

- **React 18** + **TypeScript**
- **Vite 4**(因開發機 Node 為 v16;升級 Node 20+ 後可換 Vite 最新版)
- 純 CSS 自訂主題,無 UI 框架:Professional Parts Store —— 60% 電商 / 25% 咖啡 / 15% 工業;米白背景、深咖啡文字、黑色產品名與價格、少量金屬灰、咖啡色 CTA,乾淨的 Apple / Muji 式產品展示
- 購物車狀態以 React Context 管理

## 開發

```bash
npm install
npm run dev      # 開發伺服器 http://127.0.0.1:5173/
npm run build    # 型別檢查 + 產出 dist/
npm run preview  # 預覽 production build
```

> 注意:專案路徑含中文時,Vite 4 的 SPA fallback 會失效(`/` 回 404)。
> `vite.config.ts` 內建 `rootFallback` middleware 已修正此問題。

## 功能

- 211 項真實商品(蝦皮「零件咖」全部上架品項):品名 / 價格 / 庫存 / 已售 / 評價 / 主圖 / 蝦皮連結
- 規格 / 材質 / 適用機種由品名與商品描述以規則推導(見 `scripts/shopee/gen-products.cjs`)
- 分類篩選:沖煮系統、蒸氣系統、研磨零件、電控零件、幫浦水路、整機 / 二手機(以品名關鍵字分類)
- 關鍵字搜尋(品名 / 料號 / 品牌)與排序(價格 / 熱銷 / 庫存)
- 分頁瀏覽:預設每頁 24 筆(可切 12 / 24 / 48),切換篩選自動回第 1 頁
- 每張卡片的圖片 / 品名 / 「蝦皮商品頁」皆連結至對應蝦皮商品
- 「商業合作項目」獨立頁(`#/partners`,極簡 hash 路由,無額外套件):6 種合作方案、流程、條件、FAQ、需求表單(Demo 不送出);內容為假資料,見 `src/data/partners.ts`
- 卡片「前往蝦皮購買」與頁首「蝦皮賣場」連結導向蝦皮下單(不做站內購物車;`context/CartContext.tsx`、`CartDrawer.tsx` 保留未接線)
- 售完 / 低庫存標示、RWD 響應式版面
- 商品圖 400px WebP 存於 `public/img/products/{itemid}.webp`,載入失敗時退回線稿 SVG 圖示

## 專案結構

```
src/
├── types.ts              # Product / CartItem 型別與分類定義
├── data/products.ts      # 由 scripts/shopee/gen-products.cjs 產生,勿手動編輯
├── context/CartContext.tsx  # 購物車狀態管理
├── components/
│   ├── Header.tsx        # 頁首導覽(產品目錄 / 商業合作項目)+ 蝦皮賣場連結
│   ├── Hero.tsx          # 首屏形象區
│   ├── Filters.tsx       # 分類 / 搜尋 / 排序
│   ├── ProductCard.tsx   # 產品卡片(圖片 / 品名連結至蝦皮)
│   ├── Pagination.tsx    # 分頁列 + 每頁筆數
│   ├── PartIcon.tsx      # 各分類線稿 SVG 圖示
│   ├── CartDrawer.tsx    # 購物車抽屜(目前未使用)
│   └── Footer.tsx        # 頁尾
├── router.ts             # hash 路由:#/ 產品目錄、#/partners 商業合作項目
├── pages/
│   ├── Catalog.tsx       # 首頁:Hero + 產品目錄(篩選 / 分頁)
│   └── Partners.tsx      # 商業合作項目頁
├── data/partners.ts      # 商業合作頁假資料
└── App.tsx               # Header + 路由切換 + Footer
```

## 重新抓取蝦皮資料

蝦皮商品列表 / 詳情 API 需登入且有反爬,流程為「真實 Chrome + 手動登入 + Playwright CDP 驅動」:

```bash
# 1. 啟動 Chrome(獨立 profile)開啟遠端偵錯埠
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9333 --user-data-dir=%TEMP%\shopee-prof
# 2. 安裝 playwright(Node 16 用 1.44)並開啟登入頁,手動登入 + 過驗證
cd scripts/shopee && npm i playwright@1.44.0 && node open-login.cjs
# 3. 抓列表(sortBy=pop 翻頁,寫入 data/items.json)
node scrape-list.cjs
# 4. 抓詳情(描述 / 庫存,寫入 data/pdp.json;有節流,被擋會自動等 4 分鐘重試,可中斷續跑)
node scrape-detail.cjs 300
# 5. 下載主圖(400px webp)並產生 src/data/products.ts
node gen-products.cjs
```

圖片下載:`https://down-tw.img.susercontent.com/file/{hash}@resize_w400_nl.webp` → `public/img/products/{itemid}.webp`。

## 後續串接後端

1. `data/products.ts` 改為呼叫商品 API
2. 若要站內下單:在 `App.tsx` 接回 `CartProvider` / `CartDrawer`,卡片按鈕改回 `addItem`
3. 需要 SSR / SEO 時可評估遷移 Next.js

## 免責

商品名稱、價格、圖片版權屬蝦皮賣場「零件咖」所有,本專案僅作前端 Demo 使用;「規格 / 材質 / 適用」欄位為程式推導,非賣家原始資訊。
