/**
 * 將以 "/" 開頭的靜態資源路徑接上 Vite base(例如 GitHub Pages 的 /coffee-parts-shop/),
 * 讓網站部署在子目錄時圖片仍可正確載入。
 */
export function assetUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
