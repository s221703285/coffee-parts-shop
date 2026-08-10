import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Vite 4 SPA fallback fails when project path contains non-ASCII characters
// (e.g. Chinese folder names), returning 404 for "/". Rewrite "/" to
// "/index.html" before the internal middlewares run.
function rootFallback(): Plugin {
  return {
    name: 'root-fallback',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/' || req.url === '') {
          req.url = '/index.html'
        }
        next()
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  // GitHub Pages serves under /coffee-parts-shop/ — relative base keeps assets resolvable
  base: './',
  plugins: [react(), rootFallback()],
})
