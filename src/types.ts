export type Category =
  | 'brew'
  | 'steam'
  | 'grinder'
  | 'electric'
  | 'pump'
  | 'machine';

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  stock: number;
  spec: string;
  material: string;
  compatible: string;
  /** 本地主圖 (public/img/products/{id}.webp) */
  image: string;
  /** 蝦皮原始圖片 URL 列表 */
  images: string[];
  sold: number;
  rating: number;
  ratingCount: number;
  description: string;
  /** 蝦皮商品頁 */
  url: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  brew: '沖煮系統',
  steam: '蒸氣系統',
  grinder: '研磨零件',
  electric: '電控零件',
  pump: '幫浦水路',
  machine: '整機 / 二手機',
};
