import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { getMarketSnapshot } from './server/market-data.mjs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'abm-market-data',
    configureServer(server) {
      server.middlewares.use('/api/market', async (request, response) => {
        if (request.method !== 'GET') { response.writeHead(405, { Allow: 'GET' }); response.end(); return; }
        try {
          const snapshot = await getMarketSnapshot();
          response.writeHead(snapshot.quotes.length ? 200 : 503, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
          response.end(JSON.stringify(snapshot));
        } catch {
          response.writeHead(503, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ quotes: [], unavailableSources: ['currencies', 'monetary', 'market'] }));
        }
      });
    },
  }],
})
