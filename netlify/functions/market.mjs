import { getMarketSnapshot } from '../../server/market-data.mjs';

export default async function handler(request) {
  if (request.method !== 'GET') return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET' } });
  const snapshot = await getMarketSnapshot();
  return Response.json(snapshot, { status: snapshot.quotes.length ? 200 : 503, headers: { 'Cache-Control': snapshot.quotes.length ? 'public, max-age=0, s-maxage=60' : 'no-store' } });
}
