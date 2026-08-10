# KAFFE·WERK — 咖啡機零組件購物網站

專業工業風的咖啡機零組件供應商購物網站前端 Demo。目前使用測試資料,尚未串接後端。

## 技術架構

- **React 18** + **TypeScript**
- **Vite 4**(因開發機 Node 為 v16;升級 Node 20+ 後可換 Vite 最新版)
- 純 CSS 自訂工業風主題,無 UI 框架
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

- 16 項零件測試資料:料號 / 品牌 / 規格 / 材質 / 適用機種 / 庫存
- 分類篩選:沖煮系統、蒸氣系統、研磨零件、電控零件、幫浦水路
- 關鍵字搜尋(品名 / 料號 / 品牌)與排序(價格 / 庫存)
- 購物車側邊抽屜:數量增減(受庫存上限)、移除、合計
- 低庫存標示、RWD 響應式版面
- 每類零件配線稿風格 SVG 示意圖

## 專案結構

```
src/
├── types.ts              # Product / CartItem 型別與分類定義
├── data/products.ts      # 測試資料(之後改為 API 取得)
├── context/CartContext.tsx  # 購物車狀態管理
├── components/
│   ├── Header.tsx        # 頁首導覽 + 購物車按鈕
│   ├── Hero.tsx          # 首屏形象區
│   ├── Filters.tsx       # 分類 / 搜尋 / 排序
│   ├── ProductCard.tsx   # 產品卡片
│   ├── PartIcon.tsx      # 各分類線稿 SVG 圖示
│   ├── CartDrawer.tsx    # 購物車抽屜
│   └── Footer.tsx        # 頁尾
└── App.tsx               # 主頁組合與篩選邏輯
```

## 後續串接後端

1. `data/products.ts` 改為呼叫商品 API
2. `CartDrawer.tsx` 的結帳按鈕接下單 API
3. 需要 SSR / SEO 時可評估遷移 Next.js

## 免責

所有商品、品牌、價格皆為 Demo 測試資料,非真實販售資訊。
