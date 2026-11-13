import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Catalog } from './pages/Catalog';
import { Partners } from './pages/Partners';
import { useHashRoute } from './router';
import { useEffect } from 'react';
import type { Route } from './router';

const PAGE_META: Record<Route, { title: string; description: string }> = {
  home: {
    title: 'KAFFE·WERK 咖啡機零組件供應|義式咖啡機零件、沖煮頭墊圈、維修耗材',
    description:
      'KAFFE·WERK 專業咖啡機零組件一站式供應:沖煮頭墊圈、蒸氣閥、磨豆機刀盤、泵浦、電控零件,涵蓋 Faema、La Marzocco、Rancilio、E61 等機型,原廠與副廠零件現貨,並提供維修廠批發、原廠代訂與缺件尋源。',
  },
  partners: {
    title: '商業合作項目|零件批發、原廠代訂、保養合約 — KAFFE·WERK',
    description:
      'KAFFE·WERK 商業合作:維修廠與設備商批發採購、義大利原廠零件代訂、停產件尋源、門市保養合約、二手咖啡機收購整新與維修專修班,兩個工作天內回覆方案。',
  },
};

export default function App() {
  const route = useHashRoute();

  // 切換頁面時回到頂端
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  // 依頁面更新分頁標題與描述
  useEffect(() => {
    const meta = PAGE_META[route];
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.description);
  }, [route]);

  return (
    <>
      <Header route={route} />
      {route === 'partners' ? <Partners /> : <Catalog />}
      <Footer />
    </>
  );
}
