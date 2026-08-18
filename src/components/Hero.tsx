import { PRODUCTS } from '../data/products';

const BRAND_COUNT = new Set(PRODUCTS.map((p) => p.brand)).size;

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <p className="hero-tag">Professional Parts Store</p>
        <h1 className="hero-title">
          專業咖啡機零組件
          <br />
          <span className="hero-accent">一站式供應</span>
        </h1>
        <p className="hero-desc">
          沖煮頭、蒸氣閥、刀盤、泵浦、電控 —— 原廠與副廠零件庫存供應,
          支援商用與家用義式機維修保養。
        </p>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">{PRODUCTS.length}</span>
            <span className="stat-label">上架品項</span>
          </div>
          <div className="stat">
            <span className="stat-num">4.98</span>
            <span className="stat-label">賣場評價</span>
          </div>
          <div className="stat">
            <span className="stat-num">{BRAND_COUNT}</span>
            <span className="stat-label">涵蓋品牌</span>
          </div>
        </div>
      </div>
    </section>
  );
}
