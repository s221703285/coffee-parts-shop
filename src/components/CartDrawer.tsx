import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, totalPrice, setQty, removeItem, clear } = useCart();

  return (
    <>
      <div
        className={`drawer-backdrop ${open ? 'show' : ''}`}
        onClick={onClose}
      />
      <aside className={`drawer ${open ? 'open' : ''}`}>
        <div className="drawer-head">
          <h2>採購清單</h2>
          <button className="drawer-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <p className="drawer-empty">尚未加入任何零件</p>
        ) : (
          <>
            <ul className="drawer-list">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="drawer-item">
                  <div className="drawer-item-info">
                    <span className="drawer-item-sku">{product.sku}</span>
                    <span className="drawer-item-name">{product.name}</span>
                    <span className="drawer-item-price">
                      NT$ {product.price.toLocaleString()} × {qty}
                    </span>
                  </div>
                  <div className="drawer-item-ctrl">
                    <button onClick={() => setQty(product.id, qty - 1)}>−</button>
                    <span className="qty">{qty}</span>
                    <button
                      onClick={() => setQty(product.id, qty + 1)}
                      disabled={qty >= product.stock}
                    >
                      +
                    </button>
                    <button
                      className="remove"
                      onClick={() => removeItem(product.id)}
                    >
                      移除
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <div className="drawer-total">
                <span>合計</span>
                <span className="drawer-total-num">
                  NT$ {totalPrice.toLocaleString()}
                </span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => {
                  alert('測試模式:結帳功能待串接後端');
                }}
              >
                前往結帳
              </button>
              <button className="clear-btn" onClick={clear}>
                清空清單
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
