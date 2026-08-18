import { CONTACT } from '../data/partners';
import { ROUTES } from '../router';

export function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <div className="footer-col">
          <span className="logo-name">KAFFE·WERK</span>
          <p>專業咖啡機零組件供應商,服務維修廠、烘豆坊與咖啡職人。</p>
        </div>
        <div className="footer-col">
          <h4>商業合作</h4>
          <p>批發採購 / 原廠代訂 / 缺件尋源 / 保養合約</p>
          <p>
            <a className="footer-link" href={ROUTES.partners}>
              查看合作項目 →
            </a>
          </p>
        </div>
        <div className="footer-col">
          <h4>聯絡方式</h4>
          <p>{CONTACT.email}</p>
          <p>{CONTACT.phone}</p>
          <p>{CONTACT.hours}</p>
        </div>
      </div>
      <div className="footer-bar">
        <span>© 2026 KAFFE·WERK PARTS SUPPLY — DEMO — 商品資料與圖片來源:蝦皮「零件咖」</span>
      </div>
    </footer>
  );
}
