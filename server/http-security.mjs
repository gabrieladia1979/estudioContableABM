export const securityHeaders = {
  'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Strict-Transport-Security': 'max-age=31536000',
};

export const json = (data, status = 200, headers = {}) => Response.json(data, {
  status, headers: { ...securityHeaders, 'Cache-Control': 'no-store', ...headers },
});

export class RequestError extends Error {
  constructor(status, message, headers = {}) { super(message); this.status = status; this.headers = headers; }
}

export function sameOrigin(request, requireOrigin = false) {
  const origin = request.headers.get('origin');
  return (!requireOrigin || Boolean(origin)) && (!origin || origin === new URL(request.url).origin) && request.headers.get('sec-fetch-site') !== 'cross-site';
}

export async function readJsonBody(request, maximumBytes = 30_000) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) throw new RequestError(415, 'Usá una solicitud JSON');
  const size = request.headers.get('content-length');
  if (size && (!/^\d+$/.test(size) || Number(size) > maximumBytes)) throw new RequestError(413, 'La solicitud es demasiado grande');
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError(400, 'Solicitud inválida');
  const chunks = [];
  let bytes = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maximumBytes) { await reader.cancel(); throw new RequestError(413, 'La solicitud es demasiado grande'); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try {
    const body = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks)));
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error();
    return body;
  } catch { throw new RequestError(400, 'Solicitud inválida'); }
}
