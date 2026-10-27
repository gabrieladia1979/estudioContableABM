import { handleNewsRequest } from './news-service.mjs';

export function newsDevMiddleware() {
  return async (request, response, next) => {
    const path = request.url.split('?')[0];
    if (!['/api/news', '/api/news/admin'].includes(path)) return next();
    const localAddress = request.socket.remoteAddress;
    const host = request.headers.host || '';
    if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(localAddress) || !/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host)) {
      response.writeHead(403); response.end('Solo disponible en el servidor local'); return;
    }
    let body = '';
    for await (const chunk of request) {
      body += chunk;
      if (body.length > 30_000) { response.writeHead(413); response.end(); return; }
    }
    const input = new Request('http://' + host + request.url, { method: request.method, headers: request.headers, ...(body ? { body } : {}) });
    const result = await handleNewsRequest(input, { local: true, admin: path.endsWith('/admin') });
    response.writeHead(result.status, Object.fromEntries(result.headers.entries()));
    response.end(await result.text());
  };
}
