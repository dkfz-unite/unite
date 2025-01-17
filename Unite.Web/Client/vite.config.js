import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/ 
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/styles/quasar.variables.scss'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080,
    proxy: {
      "/api/identity": { target: "http://127.0.0.1:5000", changeOrigin: true, rewrite: (path) => path.replace(/^\/api\/identity/, '/api') },
      "/api/composer": { target: "http://127.0.0.1:5002", rewrite: (path) => path.replace(/^\/api\/composer/, '/api') },
      "/api/analysis": { target: "http://127.0.0.1:5004", rewrite: (path) => path.replace(/^\/api\/analysis/, '/api') },
      "/api/donors-feed": {target: "http://127.0.0.1:5100", rewrite: (path) => path.replace(/^\/api\/donors-feed/, '/api') },
      "/api/images-feed": { target: "http://127.0.0.1:5102", rewrite: (path) => path.replace(/^\/api\/images-feed/, '/api') },
      "/api/specimens-feed": { target: "http://127.0.0.1:5104", rewrite: (path) => path.replace(/^\/api\/specimens-feed/, '/api') },
      "/api/genome-feed": { target: "http://127.0.0.1:5106", rewrite: (path) => path.replace(/^\/api\/genome-feed/, '/api') },
      "/viewer": {
        target: "http://127.0.0.1",
        configure: (proxy, options) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            const cxg = req.url.match(/^\/viewer\/cxg(\d+)/);
            if (cxg) {
              const port = 5000 + parseInt(cxg[1], 10);
              proxy.options.target = `http://127.0.0.1:${port}`;
            }
          });
        }
      }
    }
  }
})
