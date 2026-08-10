import type { Product } from '../types';
import { CATEGORY_LABEL } from '../types';
import { useCart } from '../context/CartContext';
import { PartIcon } from './PartIcon';

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const lowStock = product.stock <= 15;

  return (
    <article className="card">
      <div className="card-visual">
        <PartIcon category={product.category} />
        <span className="card-sku">{product.sku}</span>
        {lowStock && <span className="card-badge">低庫存</span>}
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="card-brand">{product.brand}</span>
          <span className="card-cat">{CATEGORY_LABEL[product.category]}</span>
        </div>
        <h3 className="card-name">{product.name}</h3>
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
          <button className="add-btn" onClick={() => addItem(product)}>
            加入購物車
          </button>
        </div>
      </div>
    </article>
  );
}
