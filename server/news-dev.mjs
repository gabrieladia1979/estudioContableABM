import { handleNewsRequest } from './news-service.mjs';
import { handleEditorSession } from './editor-security.mjs';

export function newsDevMiddleware() {
  return async (request, response, next) => {
    const path = request.url.split('?')[0];
    if (!['/api/news', '/api/news/admin', '/api/news/session'].includes(path)) return next();
    const localAddress = request.socket.remoteAddress;
    const host = request.headers.host || '';
    if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(localAddress) || !/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(host)) {
      response.writeHead(403); response.end('Solo disponible en el servidor local'); return;
    }
    const chunks = [];
    let bytes = 0;
    for await (const chunk of request) {
      bytes += chunk.length;
      if (bytes > 30_000) { response.writeHead(413); response.end(); return; }
      chunks.push(chunk);
    }
    const input = new Request('http://' + host + request.url, { method: request.method, headers: request.headers, ...(bytes ? { body: Buffer.concat(chunks) } : {}) });
    const result = path.endsWith('/session') ? await handleEditorSession(input, { local: true, clientIp: localAddress }) : await handleNewsRequest(input, { local: true, admin: path.endsWith('/admin') });
    response.writeHead(result.status, Object.fromEntries(result.headers.entries()));
    response.end(await result.text());
  };
}
