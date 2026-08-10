export type Category =
  | 'brew'
  | 'steam'
  | 'grinder'
  | 'electric'
  | 'pump';

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
};
