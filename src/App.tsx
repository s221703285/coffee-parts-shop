import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Catalog } from './pages/Catalog';
import { Partners } from './pages/Partners';
import { useHashRoute } from './router';
import { useEffect } from 'react';

export default function App() {
  const route = useHashRoute();

  // 切換頁面時回到頂端
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [route]);

  return (
    <>
      <Header route={route} />
      {route === 'partners' ? <Partners /> : <Catalog />}
      <Footer />
    </>
  );
}
