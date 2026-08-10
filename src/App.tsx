import { useMemo, useState } from 'react';
import type { Category } from './types';
import { PRODUCTS } from './data/products';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Filters } from './components/Filters';
import type { SortKey } from './components/Filters';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState<SortKey>('default');
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      const matchCat = category === 'all' || p.category === category;
      const kw = keyword.trim().toLowerCase();
      const matchKw =
        !kw ||
        p.name.toLowerCase().includes(kw) ||
        p.sku.toLowerCase().includes(kw) ||
        p.brand.toLowerCase().includes(kw);
      return matchCat && matchKw;
    });
    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'stock':
        list = [...list].sort((a, b) => b.stock - a.stock);
        break;
    }
    return list;
  }, [category, keyword, sort]);

  return (
    <CartProvider>
      <Header onOpenCart={() => setCartOpen(true)} />
      <Hero />
      <main className="main" id="products">
        <div className="section-head">
          <h2 className="section-title">產品目錄</h2>
          <span className="section-count">{filtered.length} 項零件</span>
        </div>
        <Filters
          category={category}
          onCategory={setCategory}
          keyword={keyword}
          onKeyword={setKeyword}
          sort={sort}
          onSort={setSort}
        />
        {filtered.length === 0 ? (
          <p className="no-result">查無符合零件,請調整搜尋條件。</p>
        ) : (
          <div className="grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  );
}
