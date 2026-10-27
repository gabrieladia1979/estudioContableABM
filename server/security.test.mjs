import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createLocalNewsStore } from './news-store.mjs';
import { editorSession, enforceLimit, handleEditorSession, SESSION_SECONDS } from './editor-security.mjs';
import { readJsonBody, securityHeaders } from './http-security.mjs';
import { handleNewsRequest } from './news-service.mjs';

const origin = 'https://abm.example';
const secret = 'test-only-randomized-editor-secret-32-characters';
const now = Date.parse('2026-10-27T12:00:00Z');
const request = (body, { path = '/api/news/session', method = 'POST', headers = {} } = {}) => new Request(origin + path, {
  method, headers: { Origin: origin, ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...headers }, ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
});
async function withStore(run) {
  const directory = await mkdtemp(join(tmpdir(), 'abm-security-'));
  const previous = process.env.NEWS_ADMIN_TOKEN;
  const expiry = process.env.NEWS_ADMIN_TOKEN_EXPIRES_AT;
  process.env.NEWS_ADMIN_TOKEN = secret;
  delete process.env.NEWS_ADMIN_TOKEN_EXPIRES_AT;
  try { await run(createLocalNewsStore(directory)); }
  finally {
    if (previous === undefined) delete process.env.NEWS_ADMIN_TOKEN; else process.env.NEWS_ADMIN_TOKEN = previous;
    if (expiry === undefined) delete process.env.NEWS_ADMIN_TOKEN_EXPIRES_AT; else process.env.NEWS_ADMIN_TOKEN_EXPIRES_AT = expiry;
    await rm(directory, { recursive: true, force: true });
  }
}
async function login(store, time = now) {
  const response = await handleEditorSession(request({ password: secret }), { store, now: time });
  assert.equal(response.status, 200);
  return response.headers.get('set-cookie');
}

test('el cuerpo JSON se limita en bytes durante la lectura, sin confiar en Content-Length', async () => {
  let cancelled = false;
  const stream = new ReadableStream({ pull(controller) { controller.enqueue(new TextEncoder().encode('á'.repeat(5000))); }, cancel() { cancelled = true; } });
  const input = new Request(origin, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: stream, duplex: 'half' });
  await assert.rejects(readJsonBody(input, 15000), error => error.status === 413);
  assert.equal(cancelled, true);
});

test('rechaza contenido no JSON, JSON inválido y valores que no sean objetos', async () => {
  await assert.rejects(readJsonBody(new Request(origin, { method: 'POST', body: 'x' })), error => error.status === 415);
  for (const body of [null, [], 'x']) await assert.rejects(readJsonBody(request(body)), error => error.status === 400);
  assert.deepEqual(await readJsonBody(request({ action: 'save' })), { action: 'save' });
  await assert.rejects(readJsonBody(request({}, { headers: { 'Content-Length': '999999' } })), error => error.status === 413);
});

test('el ingreso crea cookie HttpOnly Secure SameSite Strict y no entrega la clave', async () => withStore(async store => {
  const response = await handleEditorSession(request({ password: secret }), { store, now });
  const cookie = response.headers.get('set-cookie');
  assert.match(cookie, /^__Host-abm-editor=[\w-]{43};/);
  for (const flag of ['HttpOnly', 'Secure', 'SameSite=Strict', 'Path=/', 'Max-Age=1800']) assert.ok(cookie.includes(flag));
  assert.equal(cookie.includes(secret), false);
  assert.deepEqual(await response.json(), { ok: true, expiresAt: now + SESSION_SECONDS * 1000 });
  assert.equal(response.headers.get('cache-control'), 'no-store');
}));

test('la sesión vence, rechaza cookies alteradas y se invalida al rotar la clave', async () => withStore(async store => {
  const cookie = await login(store);
  const input = request(undefined, { path: '/api/news/admin', method: 'GET', headers: { Cookie: cookie } });
  assert.equal((await editorSession(input, store, { now })).actor, 'editor');
  assert.equal(await editorSession(input, store, { now: now + SESSION_SECONDS * 1000 }), null);
  const newCookie = await login(store);
  const newInput = request(undefined, { path: '/api/news/admin', method: 'GET', headers: { Cookie: newCookie } });
  process.env.NEWS_ADMIN_TOKEN = secret + '-rotated';
  assert.equal(await editorSession(newInput, store, { now }), null);
  const tampered = request(undefined, { method: 'GET', headers: { Cookie: '__Host-abm-editor=' + 'x'.repeat(43) } });
  assert.equal(await editorSession(tampered, store, { now }), null);
}));

test('el cierre revoca la sesión en el servidor y limpia la cookie', async () => withStore(async store => {
  const cookie = await login(store);
  const response = await handleEditorSession(request(undefined, { method: 'DELETE', headers: { Cookie: cookie } }), { store, now });
  assert.equal(response.status, 200);
  assert.match(response.headers.get('set-cookie'), /Max-Age=0/);
  assert.equal(await editorSession(request(undefined, { method: 'GET', headers: { Cookie: cookie } }), store, { now }), null);
}));

test('no acepta ingreso ni cambios administrativos desde otro origen o sin Origin', async () => withStore(async store => {
  for (const headers of [{ Origin: 'https://evil.example' }, { Origin: 'null' }, { 'Sec-Fetch-Site': 'cross-site' }]) {
    const result = await handleEditorSession(request({ password: secret }, { headers }), { store, now });
    assert.equal(result.status, 403);
  }
  const noOrigin = new Request(origin + '/api/news/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: secret }) });
  assert.equal((await handleEditorSession(noOrigin, { store, now })).status, 403);
  const cookie = await login(store);
  assert.equal(await editorSession(request({}, { headers: { Cookie: cookie, Origin: 'https://evil.example' } }), store, { now }), null);
}));

test('limita intentos de ingreso entre llamadas y ventanas', async () => withStore(async store => {
  for (let attempt = 0; attempt < 5; attempt++) assert.equal((await handleEditorSession(request({ password: 'incorrecta' }), { store, clientIp: 'test-client', now })).status, 401);
  const blocked = await handleEditorSession(request({ password: secret }), { store, clientIp: 'test-client', now });
  assert.equal(blocked.status, 429);
  assert.ok(Number(blocked.headers.get('retry-after')) > 0);
  assert.equal((await handleEditorSession(request({ password: secret }), { store, clientIp: 'test-client', now: now + 16 * 60_000 })).status, 200);
}));

test('el contador compartido resiste incrementos concurrentes y limita redacción global', async () => withStore(async store => {
  const results = await Promise.allSettled(Array.from({ length: 5 }, () => enforceLimit(store, 'ai-day', 2, 86400000, now)));
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 2);
  assert.equal(results.filter(result => result.status === 'rejected' && result.reason.status === 429).length, 3);
}));

test('la clave expirada no permite abrir sesiones', async () => withStore(async store => {
  process.env.NEWS_ADMIN_TOKEN_EXPIRES_AT = new Date(now - 1).toISOString();
  assert.equal((await handleEditorSession(request({ password: secret }), { store, now })).status, 503);
}));

test('el API requiere la cookie y ya no acepta Bearer; no publica registros de seguridad', async () => withStore(async store => {
  const current = Date.now();
  const cookie = await login(store, current);
  const input = request(undefined, { path: '/api/news/admin', method: 'GET', headers: { Cookie: cookie } });
  const result = await handleNewsRequest(input, { store, admin: true });
  assert.equal(result.status, 200);
  assert.ok(Number(result.headers.get('x-editor-session-expires')) > current);
  const bearer = request(undefined, { path: '/api/news/admin', method: 'GET', headers: { Authorization: 'Bearer ' + secret } });
  assert.equal((await handleNewsRequest(bearer, { store, admin: true })).status, 401);
  const publicResult = await handleNewsRequest(request(undefined, { path: '/api/news', method: 'GET' }), { store });
  assert.deepEqual((await publicResult.json()).articles, []);
}));

test('registra acción y resultado sin copiar contenidos, cookies o claves al registro', async () => withStore(async store => {
  const events = [];
  const wrapped = { ...store, write: (key, value, options) => { if (key.startsWith('security/audit/')) events.push(value); return store.write(key, value, options); } };
  const input = new Request('http://localhost/api/news/admin', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'save', id: 'missing', message: 'contenido privado' }) });
  const result = await handleNewsRequest(input, { local: true, admin: true, store: wrapped });
  assert.equal(result.status, 404);
  assert.deepEqual(events.map(event => event.event), ['operation-started', 'operation-finished']);
  assert.equal(events[1].status, 404);
  assert.equal(JSON.stringify(events).includes('contenido privado'), false);
}));

test('una sesión de producción puede guardar; el mismo intento desde otro origen no cambia la nota', async () => withStore(async store => {
  const cookie = await login(store, Date.now());
  const article = { title: 'Consulta contable de prueba', summary: 'Resumen de prueba para validar la edición autenticada de una nota.', sections: [{ heading: 'Primera sección', text: 'Contenido de prueba suficientemente largo para esta sección.' }, { heading: 'Segunda sección', text: 'Otro contenido de prueba suficientemente largo para esta sección.' }] };
  await store.write('articles/test', { id: 'test', title: article.title, status: 'draft' });
  const previous = await store.read('articles/test');
  const body = { action: 'save', id: 'test', version: previous.etag, article };
  const crossSite = request(body, { path: '/api/news/admin', headers: { Cookie: cookie, Origin: 'https://evil.example' } });
  assert.equal((await handleNewsRequest(crossSite, { store, admin: true })).status, 401);
  assert.equal((await store.read('articles/test')).etag, previous.etag);
  const sameSite = request(body, { path: '/api/news/admin', headers: { Cookie: cookie } });
  assert.equal((await handleNewsRequest(sameSite, { store, admin: true })).status, 200);
  assert.equal((await store.read('articles/test')).data.article.title, article.title);
}));

test('las cabeceras de APIs y la plantilla web impiden framing y limitan ejecución', async () => {
  assert.equal(securityHeaders['X-Frame-Options'], 'DENY');
  assert.equal(securityHeaders['X-Content-Type-Options'], 'nosniff');
  const headers = await readFile('public/_headers', 'utf8');
  assert.match(headers, /frame-ancestors 'none'/);
  assert.match(headers, /base-uri 'none'/);
  assert.match(headers, /object-src 'none'/);
  assert.match(headers, /Permissions-Policy:/);
  assert.equal(headers.includes("'unsafe-eval'"), false);
  assert.equal(/script-src[^;\n]*'unsafe-inline'/.test(headers), false);
});
