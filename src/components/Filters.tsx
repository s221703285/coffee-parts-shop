import type { Category } from '../types';
import { CATEGORY_LABEL } from '../types';

export type SortKey = 'default' | 'price-asc' | 'price-desc' | 'stock' | 'sold';

interface FiltersProps {
  category: Category | 'all';
  onCategory: (c: Category | 'all') => void;
  keyword: string;
  onKeyword: (k: string) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
}

const CATEGORIES: (Category | 'all')[] = [
  'all',
  'brew',
  'steam',
  'grinder',
  'electric',
  'pump',
  'machine',
];

export function Filters({
  category,
  onCategory,
  keyword,
  onKeyword,
  sort,
  onSort,
}: FiltersProps) {
  return (
    <div className="filters">
      <div className="filter-tabs">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`filter-tab ${category === c ? 'active' : ''}`}
            onClick={() => onCategory(c)}
          >
            {c === 'all' ? '全部' : CATEGORY_LABEL[c]}
          </button>
        ))}
      </div>
      <div className="filter-tools">
        <input
          className="search-input"
          type="search"
          placeholder="搜尋品名 / 料號 / 品牌"
          value={keyword}
          onChange={(e) => onKeyword(e.target.value)}
        />
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
        >
          <option value="default">預設排序</option>
          <option value="price-asc">價格低到高</option>
          <option value="price-desc">價格高到低</option>
          <option value="sold">熱銷優先</option>
          <option value="stock">庫存多到少</option>
        </select>
      </div>
    </div>
  );
}
