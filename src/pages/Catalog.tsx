import { useEffect, useMemo, useState } from 'react';
import type { Category } from '../types';
import { PRODUCTS } from '../data/products';
import { Hero } from '../components/Hero';
import { Filters } from '../components/Filters';
import type { SortKey } from '../components/Filters';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import type { PageSize } from '../components/Pagination';

export function Catalog() {
  const [category, setCategory] = useState<Category | 'all'>('all');
  const [keyword, setKeyword] = useState('');
  const [sort, setSort] = useState<SortKey>('default');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<PageSize>(24);

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
      case 'sold':
        list = [...list].sort((a, b) => b.sold - a.sold);
        break;
    }
    return list;
  }, [category, keyword, sort]);

  // 篩選 / 排序 / 每頁數量變更時回到第一頁
  useEffect(() => {
    setPage(1);
  }, [category, keyword, sort, pageSize]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paged = useMemo(
    () => filtered.slice((safePage - 1) * pageSize, safePage * pageSize),
    [filtered, safePage, pageSize],
  );

  const goPage = (p: number) => {
    setPage(p);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
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
          <>
            <div className="grid">
              {paged.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <Pagination
              page={safePage}
              totalPages={totalPages}
              total={filtered.length}
              pageSize={pageSize}
              onPage={goPage}
              onPageSize={setPageSize}
            />
          </>
        )}
      </main>
    </>
  );
}
