import { scanNews } from '../../server/news-service.mjs';
import { createNewsStore } from '../../server/news-store.mjs';
export default async function handler() {
  if (process.env.NEWS_SCAN_ENABLED !== 'true') return;
  const result = await scanNews(await createNewsStore());
  console.log('News scan:', JSON.stringify(result));
}
// 09:00 y 21:00 de Buenos Aires (UTC-3), independiente del tráfico del sitio.
export const config = { schedule: '0 0,12 * * *' };
