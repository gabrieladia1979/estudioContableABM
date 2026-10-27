/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { getMarketSnapshot } from './server/market-data.mjs'
import { newsDevMiddleware } from './server/news-dev.mjs'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const serverEnv = loadEnv(mode, process.cwd(), '');
  for (const name of ['OPENAI_API_KEY', 'NEWS_AI_MODEL', 'NEWS_ADMIN_TOKEN', 'NEWS_ADMIN_TOKEN_EXPIRES_AT', 'NEWS_AI_DAILY_LIMIT']) {
    if (serverEnv[name] && !process.env[name]) process.env[name] = serverEnv[name];
  }
  return {
  server: { fs: { deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/.news-cache/**'] } },
  plugins: [react(), {
    name: 'abm-market-data',
    configureServer(server) {
      server.middlewares.use(newsDevMiddleware());
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
  }
})
