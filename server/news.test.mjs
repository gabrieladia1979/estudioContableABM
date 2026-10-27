import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { collectNews, dateOnly, extractOfficial, fetchNewsText, parseFeed, safeNewsUrl, scoreNews } from './news-discovery.mjs';
import { createLocalNewsStore } from './news-store.mjs';
import { addNewsExamples, authorizedNewsRequest, handleNewsRequest, scanNews } from './news-service.mjs';
import { generateNewsDraft, validateArticle } from './news-ai.mjs';

const now = new Date('2026-10-26T18:00:00Z');
const source = { id: 'test', name: 'Medio', type: 'rss', kind: 'discovery' };
const officialUrl = 'https://servicioscf.arca.gob.ar/publico/sitio/contenido/novedad/ver.aspx?id=5980';
const officialHtml = '<html><head><title>Deuda de monotributo</title></head><body><form><main><section><div><h3 id="h3Titulo">Deuda de monotributo</h3><span>Publicado: 19/10/2026</span><p>' + 'Información sobre monotributo para revisar los saldos y los pagos registrados. '.repeat(35) + '</p></div></section><footer>Texto ajeno</footer></main></form></body></html>';
const article = { title: 'Monotributo: cómo organizar una consulta', summary: 'Qué información conviene revisar antes de iniciar una consulta sobre los saldos de tu actividad.', sections: [{ heading: 'Revisar los períodos', text: 'Reuní los comprobantes y el detalle de los períodos que querés consultar.' }, { heading: 'Organizar los próximos pasos', text: 'Conversá con el estudio para definir la documentación que hace falta.' }] };
const feed = '<rss><channel><item><title>ARCA: novedades del monotributo</title><link>https://news.google.com/rss/articles/test</link><pubDate>Mon, 26 Oct 2026 10:00:00 GMT</pubDate></item></channel></rss>';

async function withStore(run) {
  const directory = await mkdtemp(join(tmpdir(), 'abm-news-test-'));
  try { await run(createLocalNewsStore(directory)); }
  finally { await rm(directory, { recursive: true, force: true }); }
}
const request = (body, path = '/api/news/admin') => new Request('http://localhost:5173' + path, body ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) } : {});

test('keywords no confunden IVA con palabras como privada; excluyen temas fiscales de otros países y notas viejas', () => {
  assert.equal(scoreNews({ title: 'La iniciativa privada gana terreno' }, now), null);
  assert.equal(scoreNews({ title: 'IRPF: Hacienda anuncia cambios en España' }, now), null);
  assert.equal(scoreNews({ title: 'ARCA y monotributo', sourceDate: '2025-01-01' }, now), null);
  const scored = scoreNews({ title: 'Monotributo: ARCA actualiza categorías', sourceKind: 'official', sourceDate: '2026-10-25' }, now);
  assert.equal(scored.category, 'Monotributo');
  assert.ok(scored.score > 20);
});
test('fechas desconocidas o futuras no se reemplazan con la fecha de búsqueda', () => {
  assert.equal(dateOnly('2027-01-01', now), null);
  const candidate = scoreNews({ title: 'Consulta de monotributo' }, now);
  assert.equal(candidate.sourceDate, null);
  assert.equal(candidate.dateNeedsReview, true);
});
test('RSS se valida; ARCA conserva la noticia dentro de un formulario ASP.NET y limita el extracto', () => {
  assert.throws(() => parseFeed('<html>Login</html>', source), /RSS/);
  assert.equal(parseFeed(feed, source, now)[0].sourceDate, '2026-10-26');
  const evidence = extractOfficial(officialHtml, officialUrl, now);
  assert.equal(evidence.sourceDate, '2026-10-19');
  assert.equal(evidence.title, 'Deuda de monotributo');
  assert.ok(evidence.evidence.split(/\s+/).length <= 180);
  assert.ok(!evidence.evidence.includes('Texto ajeno'));
});
test('solo se consultan hosts habilitados; no se siguen redirecciones a localhost', async () => {
  for (const url of ['http://www.arca.gob.ar/', 'https://localhost/', 'https://www.arca.gob.ar.evil.test/', 'https://user:pass@www.arca.gob.ar/', 'https://www.arca.gob.ar:8443/']) assert.equal(safeNewsUrl(url), null);
  await assert.rejects(fetchNewsText(officialUrl, { fetcher: async () => new Response(null, { status: 302, headers: { location: 'http://127.0.0.1/' } }) }), /Redirección/);
});
test('una fuente caída no borra resultados; se informa el fallo y se deduplican titulares', async () => {
  const sources = [source, { ...source, name: 'Otro medio' }, { ...source, name: 'Fuente caída', url: 'fallo' }];
  const result = await collectNews({ sources, now, fetcher: async url => { if (url === 'fallo') throw new Error('No disponible'); return feed; } });
  assert.equal(result.candidates.length, 1);
  assert.equal(result.sources[2].ok, false);
});
test('el editor exige clave larga en producción y rechaza solicitudes de otro origen', () => {
  assert.equal(authorizedNewsRequest(request(), { local: false }), false);
  assert.equal(authorizedNewsRequest(new Request('http://localhost:5173/api/news/admin', { headers: { Origin: 'https://otro-sitio.test' } }), { local: true }), false);
  assert.equal(authorizedNewsRequest(request(), { local: true }), true);
});
test('las versiones previenen sobreescrituras concurrentes', async () => withStore(async store => {
  await store.write('articles/test', { title: 'A' });
  const previous = await store.read('articles/test');
  const changes = await Promise.all([store.write('articles/test', { title: 'B' }, { onlyIfMatch: previous.etag }), store.write('articles/test', { title: 'C' }, { onlyIfMatch: previous.etag })]);
  assert.equal(changes.filter(result => result.modified).length, 1);
}));
test('los ejemplos y candidatos no aparecen en la API pública y el editor sin autorización no los expone', async () => withStore(async store => {
  await addNewsExamples(store);
  const publicResponse = await handleNewsRequest(request(null, '/api/news'), { local: true, store });
  assert.deepEqual((await publicResponse.json()).articles, []);
  assert.equal((await handleNewsRequest(request(), { store, admin: true })).status, 401);
  assert.equal((await handleNewsRequest(request({ action: 'scan' }, '/api/news'), { store, local: true })).status, 405);
}));
test('la publicación exige revisión y fuente oficial; el DTO público no filtra borradores ni evidencia interna', async () => withStore(async store => {
  const id = 'prueba';
  await store.write('articles/' + id, { id, title: article.title, article, status: 'draft', category: 'Monotributo', service: 'monotributo', reviewNotes: ['Solo editor'] });
  let previous = await store.read('articles/' + id);
  let result = await handleNewsRequest(request({ action: 'publish', id, version: previous.etag, reviewed: true }), { local: true, admin: true, store });
  assert.equal(result.status, 400);
  await store.write('articles/' + id, { ...previous.data, verifiedSource: { title: 'ARCA', sourceUrl: officialUrl, sourceDate: '2026-10-19', evidence: 'Evidencia interna' } });
  previous = await store.read('articles/' + id);
  result = await handleNewsRequest(request({ action: 'publish', id, version: previous.etag, reviewed: false }), { local: true, admin: true, store });
  assert.equal(result.status, 400);
  result = await handleNewsRequest(request({ action: 'publish', id, version: previous.etag, reviewed: true }), { local: true, admin: true, store });
  assert.equal(result.status, 200);
  const published = await (await handleNewsRequest(request(null, '/api/news'), { local: true, store })).json();
  assert.equal(published.articles.length, 1);
  assert.equal(published.articles[0].reviewNotes, undefined);
  assert.equal(published.articles[0].sources[0].evidence, undefined);
  result = await handleNewsRequest(request({ action: 'save', id, version: previous.etag, article }), { local: true, admin: true, store });
  assert.equal(result.status, 409);
}));
test('la búsqueda no sobreescribe una nota ya publicada', async () => withStore(async store => {
  const initial = await collectNews({ sources: [source], now, fetcher: async () => feed });
  const candidate = initial.candidates[0];
  await store.write('articles/' + candidate.id, { ...candidate, status: 'published', article });
  await scanNews(store, { sources: [source], now, fetcher: async () => feed });
  assert.equal((await store.read('articles/' + candidate.id)).data.status, 'published');
}));
test('los borradores se validan y la IA no tiene herramientas ni devuelve enlaces elegidos por el modelo', async () => {
  assert.throws(() => validateArticle({ title: 'Corto' }));
  const previousKey = process.env.OPENAI_API_KEY;
  const previousModel = process.env.NEWS_AI_MODEL;
  process.env.OPENAI_API_KEY = 'test-only';
  process.env.NEWS_AI_MODEL = 'test-model';
  try {
    const generated = await generateNewsDraft({ title: 'Tema externo no confiable' }, { title: 'Fuente oficial', evidence: 'Hechos de respaldo' }, { fetcher: async (url, options) => {
      assert.equal(url, 'https://api.openai.com/v1/responses');
      const body = JSON.parse(options.body);
      assert.equal(body.store, false);
      assert.equal(body.tools, undefined);
      assert.equal(body.text.format.type, 'json_schema');
      return Response.json({ status: 'completed', output: [{ content: [{ type: 'output_text', text: JSON.stringify({ ...article, relevance: 75, reviewNotes: ['Confirmar alcance'] }) }] }] });
    } });
    assert.equal(generated.article.title, article.title);
    assert.equal(generated.relevance, 75);
  } finally {
    if (previousKey === undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY = previousKey;
    if (previousModel === undefined) delete process.env.NEWS_AI_MODEL; else process.env.NEWS_AI_MODEL = previousModel;
  }
});
