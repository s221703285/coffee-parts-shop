import { useEffect, useState } from 'react';

export type Route = 'home' | 'partners';

/** 極簡 hash 路由:`#/` 首頁、`#/partners` 商業合作項目 */
export function parseRoute(hash: string): Route {
  const path = hash.replace(/^#/, '');
  if (path.startsWith('/partners')) return 'partners';
  return 'home';
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export const ROUTES: Record<Route, string> = {
  home: '#/',
  partners: '#/partners',
};

/** 導向首頁並捲動到指定區塊(用於「產品目錄」) */
export function goHomeAnchor(id: string) {
  const scroll = () =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  if (parseRoute(window.location.hash) === 'home') {
    scroll();
  } else {
    window.location.hash = ROUTES.home;
    // 等首頁 render 完再捲
    setTimeout(scroll, 60);
  }
}
