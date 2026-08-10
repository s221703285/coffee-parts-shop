import { useCart } from '../context/CartContext';

export function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { totalQty } = useCart();

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-mark">▚</span>
          <div className="logo-text">
            <span className="logo-name">KAFFE·WERK</span>
            <span className="logo-sub">咖啡機零組件供應</span>
          </div>
        </div>
        <nav className="nav">
          <a href="#products">產品目錄</a>
          <a href="#about">關於供應</a>
          <a href="#contact">聯絡採購</a>
        </nav>
        <button className="cart-btn" onClick={onOpenCart}>
          <span className="cart-label">購物車</span>
          <span className="cart-count">{totalQty}</span>
        </button>
      </div>
    </header>
  );
}
