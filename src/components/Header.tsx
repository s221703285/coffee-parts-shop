import type { Route } from '../router';
import { ROUTES, goHomeAnchor } from '../router';

export const SHOP_URL = 'https://shopee.tw/akey9673';

export function Header({ route }: { route: Route }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a className="logo" href={ROUTES.home}>
          <span className="logo-mark">▚</span>
          <div className="logo-text">
            <span className="logo-name">KAFFE·WERK</span>
            <span className="logo-sub">咖啡機零組件供應</span>
          </div>
        </a>
        <nav className="nav">
          <a
            href={ROUTES.home}
            className={route === 'home' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              goHomeAnchor('products');
            }}
          >
            產品目錄
          </a>
          <a
            href={ROUTES.partners}
            className={route === 'partners' ? 'active' : ''}
          >
            商業合作項目
          </a>
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
