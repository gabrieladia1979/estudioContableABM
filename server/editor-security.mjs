import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { createNewsStore } from './news-store.mjs';
import { json, readJsonBody, RequestError, sameOrigin } from './http-security.mjs';

const COOKIE = '__Host-abm-editor';
export const SESSION_SECONDS = 30 * 60;
const hash = value => createHash('sha256').update(value).digest('hex');
const privateHeaders = { 'X-Robots-Tag': 'noindex, nofollow' };
const cookie = (value, seconds) => `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${seconds}`;

function credential(now) {
  const secret = process.env.NEWS_ADMIN_TOKEN;
  const expires = process.env.NEWS_ADMIN_TOKEN_EXPIRES_AT;
  if (!secret || secret.length < 32 || secret.length > 512) return null;
  if (expires && (!Number.isFinite(Date.parse(expires)) || Date.parse(expires) <= now)) return null;
  return { secret, version: hash(secret + ':' + (expires || '')) };
}

function sessionToken(request) {
  const value = (request.headers.get('cookie') || '').split(';').map(part => part.trim()).find(part => part.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  return value && /^[A-Za-z0-9_-]{43}$/.test(value) ? value : null;
}

export async function editorSession(request, store, { local = false, now = Date.now() } = {}) {
  if (!sameOrigin(request, !local && request.method !== 'GET')) return null;
  if (local) return ['localhost', '127.0.0.1', '[::1]'].includes(new URL(request.url).hostname) ? { actor: 'editor-local', id: 'local' } : null;
  const token = sessionToken(request);
  const configured = credential(now);
  if (!token || !configured) return null;
  const id = hash(token);
  const session = (await store.read('security/sessions/' + id))?.data;
  if (!session || session.expiresAt <= now || session.credentialVersion !== configured.version) {
    if (session) await store.remove('security/sessions/' + id);
    return null;
  }
  return { actor: 'editor', id: id.slice(0, 16), expiresAt: session.expiresAt };
}

// CAS en el almacenamiento compartido: no depende de una instancia de la función.
export async function enforceLimit(store, name, limit, windowMs, now = Date.now()) {
  const key = 'security/limits/' + hash(name);
  const windowStart = Math.floor(now / windowMs) * windowMs;
  for (let attempt = 0; attempt < 10; attempt++) {
    const previous = await store.read(key);
    const count = previous?.data.windowStart === windowStart ? previous.data.count : 0;
    if (count >= limit) throw new RequestError(429, 'Demasiadas solicitudes. Esperá antes de volver a intentar.', { 'Retry-After': String(Math.max(1, Math.ceil((windowStart + windowMs - now) / 1000))) });
    const result = await store.write(key, { windowStart, count: count + 1 }, previous ? { onlyIfMatch: previous.etag } : { onlyIfNew: true });
    if (result.modified) return;
  }
  throw new RequestError(503, 'No se pudo validar el límite. Volvé a intentar en un momento.');
}

export async function recordEditorEvent(store, event) {
  const timestamp = new Date().toISOString();
  const entry = { timestamp, ...event };
  await store.write('security/audit/' + Date.now() + '-' + randomUUID(), entry, { onlyIfNew: true });
  console.info('Editor security:', JSON.stringify(entry));
}

export async function handleEditorSession(request, { store: suppliedStore, clientIp = 'unknown', local = false, now = Date.now() } = {}) {
  if (!['POST', 'DELETE'].includes(request.method)) return json({ error: 'Método no permitido' }, 405, { ...privateHeaders, Allow: 'POST, DELETE' });
  if (!sameOrigin(request, true)) return json({ error: 'Origen no permitido' }, 403, privateHeaders);
  try {
    const store = suppliedStore || await createNewsStore({ local });
    if (request.method === 'DELETE') {
      const token = sessionToken(request);
      if (token) await store.remove('security/sessions/' + hash(token));
      return json({ ok: true }, 200, { ...privateHeaders, 'Set-Cookie': cookie('', 0) });
    }
    await enforceLimit(store, 'login:' + clientIp, 5, 15 * 60_000, now);
    const body = await readJsonBody(request, 2048);
    const configured = credential(now);
    if (!configured) return json({ error: 'El acceso al editor no está configurado o la clave venció.' }, 503, privateHeaders);
    const password = typeof body.password === 'string' && body.password.length <= 512 ? body.password : '';
    const matches = timingSafeEqual(Buffer.from(hash(password), 'hex'), Buffer.from(hash(configured.secret), 'hex'));
    if (!matches) {
      await recordEditorEvent(store, { event: 'login-failed', client: hash(clientIp).slice(0, 16) });
      return json({ error: 'Clave incorrecta' }, 401, privateHeaders);
    }
    const token = randomBytes(32).toString('base64url');
    const previous = sessionToken(request);
    if (previous) await store.remove('security/sessions/' + hash(previous));
    await store.write('security/sessions/' + hash(token), { expiresAt: now + SESSION_SECONDS * 1000, credentialVersion: configured.version }, { onlyIfNew: true });
    await recordEditorEvent(store, { event: 'login', actor: 'editor', session: hash(token).slice(0, 16) });
    return json({ ok: true, expiresAt: now + SESSION_SECONDS * 1000 }, 200, { ...privateHeaders, 'Set-Cookie': cookie(token, SESSION_SECONDS) });
  } catch (error) {
    if (error instanceof RequestError) return json({ error: error.message }, error.status, { ...privateHeaders, ...error.headers });
    console.error('Editor session:', error.name);
    return json({ error: 'No se pudo iniciar o cerrar la sesión.' }, 503, privateHeaders);
  }
}
