import { getMarketSnapshot } from '../../server/market-data.mjs';
import { json, securityHeaders } from '../../server/http-security.mjs';

export default async function handler(request) {
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: { ...securityHeaders, Allow: 'GET' } });
  const snapshot = await getMarketSnapshot();
  return json(snapshot, snapshot.quotes.length ? 200 : 503, { 'Cache-Control': snapshot.quotes.length ? 'public, max-age=0, s-maxage=60' : 'no-store' });
}
