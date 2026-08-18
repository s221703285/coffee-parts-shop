import type { Product } from '../types';
import { CATEGORY_LABEL } from '../types';
import { PartIcon } from './PartIcon';
import { useState } from 'react';
import { assetUrl } from '../assetUrl';

export function ProductCard({ product }: { product: Product }) {
  const [imgFailed, setImgFailed] = useState(false);
  const soldOut = product.stock <= 0;
  const lowStock = !soldOut && product.stock <= 2;

  return (
    <article className="card">
      <div className="card-visual">
        <a
          className="card-visual-link"
          href={product.url}
          target="_blank"
          rel="noreferrer"
          title="前往蝦皮商品頁"
        >
          {imgFailed ? (
            <PartIcon category={product.category} />
          ) : (
            <img
              className="card-img"
              src={assetUrl(product.image)}
              alt={product.name}
              loading="lazy"
              onError={() => setImgFailed(true)}
            />
          )}
        </a>
        <span className="card-sku">{product.sku}</span>
        {soldOut && <span className="card-badge">售完</span>}
        {lowStock && <span className="card-badge">低庫存</span>}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="card-brand">{product.brand}</span>
          <span className="card-cat">{CATEGORY_LABEL[product.category]}</span>
        </div>
        <h3 className="card-name" title={product.name}>
          <a href={product.url} target="_blank" rel="noreferrer">
            {product.name}
          </a>
        </h3>
        <div className="card-social">
          <span className="card-rating">★ {product.rating.toFixed(1)}</span>
          <span className="card-sold">已售 {product.sold}</span>
          <a
            className="card-link"
            href={product.url}
            target="_blank"
            rel="noreferrer"
          >
            蝦皮商品頁 ↗
          </a>
        </div>
        <ul className="card-specs">
          <li>
            <span className="spec-key">規格</span>
            <span>{product.spec}</span>
          </li>
          <li>
            <span className="spec-key">材質</span>
            <span>{product.material}</span>
          </li>
          <li>
            <span className="spec-key">適用</span>
            <span>{product.compatible}</span>
          </li>
        </ul>
        <div className="card-footer">
          <div className="card-price-block">
            <span className="card-price">NT$ {product.price.toLocaleString()}</span>
            <span className="card-stock">庫存 {product.stock}</span>
          </div>
          <a
            className={`add-btn buy-link ${soldOut ? 'disabled' : ''}`}
            href={product.url}
            target="_blank"
            rel="noreferrer"
            aria-disabled={soldOut}
          >
            {soldOut ? '已售完' : '前往蝦皮購買 ↗'}
          </a>
        </div>
      </div>
    </article>
  );
}
