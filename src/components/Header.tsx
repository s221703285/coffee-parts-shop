export const SHOP_URL = 'https://shopee.tw/akey9673';

export function Header() {
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
        <a
          className="cart-btn shop-link"
          href={SHOP_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span className="cart-label">蝦皮賣場</span>
          <span className="cart-count">↗</span>
        </a>
      </div>
    </header>
  );
}
