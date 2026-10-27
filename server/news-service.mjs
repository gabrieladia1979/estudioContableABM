import { timingSafeEqual } from 'node:crypto';
import { collectNews, officialEvidence } from './news-discovery.mjs';
import { generateNewsDraft, validateArticle } from './news-ai.mjs';
import { seedDrafts } from './news-seeds.mjs';
import { createNewsStore } from './news-store.mjs';

export async function addNewsExamples(store) {
  for (const draft of seedDrafts) await store.write('articles/' + draft.id, { ...draft, status: 'draft', score: 70, keywords: [], createdAt: new Date().toISOString(), generatedBy: 'Ejemplo editorial', reviewNotes: ['Revisar alcance, contenido y vigencia en la fuente antes de publicar.'] }, { onlyIfNew: true });
}

export async function scanNews(store, options = {}) {
  const snapshot = await collectNews(options);
  for (const candidate of snapshot.candidates) {
    // No sobreescribir borradores, descartados o notas ya publicadas.
    await store.write('articles/' + candidate.id, { ...candidate, status: 'candidate', createdAt: snapshot.checkedAt }, { onlyIfNew: true });
  }
  await store.write('last-scan', { checkedAt: snapshot.checkedAt, sources: snapshot.sources, found: snapshot.candidates.length });
  return { checkedAt: snapshot.checkedAt, sources: snapshot.sources, found: snapshot.candidates.length };
}

export const publishedArticle = row => ({
  id: row.id, slug: row.id, ...validateArticle(row.article), category: row.category, service: row.service,
  publishedAt: row.publishedAt, reviewedAt: row.reviewedAt, author: 'ABM Estudio Contable',
  sources: [{ title: row.verifiedSource.title, url: row.verifiedSource.sourceUrl, date: row.verifiedSource.sourceDate }],
});

export function authorizedNewsRequest(request, { local = false } = {}) {
  const url = new URL(request.url);
  if (request.headers.get('origin') && request.headers.get('origin') !== url.origin) return false;
  if (request.headers.get('sec-fetch-site') === 'cross-site') return false;
  if (local) return ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
  const secret = process.env.NEWS_ADMIN_TOKEN;
  if (!secret || secret.length < 32) return false;
  const token = request.headers.get('authorization')?.replace(/^Bearer /, '') || '';
  const left = Buffer.from(token);
  const right = Buffer.from(secret);
  return left.length === right.length && timingSafeEqual(left, right);
}

const json = (data, status = 200) => Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });

export async function handleNewsRequest(request, { local = false, admin = false, store: suppliedStore } = {}) {
  if (admin && !authorizedNewsRequest(request, { local })) return json({ error: 'Ingresá la clave del editor. En producción debe configurarse NEWS_ADMIN_TOKEN.' }, 401);
  if (!['GET', ...(admin ? ['POST'] : [])].includes(request.method)) return json({ error: 'Método no permitido' }, 405);
  try {
    const store = suppliedStore || await createNewsStore({ local });
    if (request.method === 'GET') {
      if (admin && local) await addNewsExamples(store);
      const rows = await store.articles();
      const scan = (await store.read('last-scan'))?.data || null;
      if (!admin) return json({ articles: rows.filter(row => row.status === 'published' && row.verifiedSource && row.article).map(publishedArticle).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)), checkedAt: scan?.checkedAt || null });
      const articles = await Promise.all(rows.sort((a, b) => (b.score || 0) - (a.score || 0)).map(async row => ({ ...row, version: (await store.read('articles/' + row.id)).etag })));
      return json({ articles, scan, local, aiReady: Boolean(process.env.OPENAI_API_KEY && process.env.NEWS_AI_MODEL) });
    }
    const raw = await request.text();
    if (raw.length > 30_000) return json({ error: 'La solicitud es demasiado grande' }, 413);
    let body;
    try { body = JSON.parse(raw); } catch { return json({ error: 'Solicitud inválida' }, 400); }
    if (body.action === 'scan') {
      const last = (await store.read('last-scan'))?.data;
      if (last && Date.now() - Date.parse(last.checkedAt) < 15 * 60_000) return json({ error: 'La última búsqueda fue hace menos de 15 minutos. Ya podés revisar sus resultados.' }, 429);
      return json(await scanNews(store));
    }
    if (body.action === 'examples') { await addNewsExamples(store); return json({ ok: true }); }
    if (typeof body.id !== 'string' || !/^[a-z0-9-]{1,80}$/.test(body.id)) return json({ error: 'Nota inválida' }, 400);
    const key = 'articles/' + body.id;
    const previous = await store.read(key);
    if (!previous) return json({ error: 'No se encontró la nota' }, 404);
    if (!body.version || previous.etag !== body.version) return json({ error: 'La nota cambió. Recargá la bandeja antes de continuar.' }, 409);
    const row = { ...previous.data };
    if (row.status === 'generating' && Date.now() - Date.parse(row.generationStartedAt) < 90_000) return json({ error: 'La nota está generándose. Volvé a consultar en un momento.' }, 409);
    if (body.action === 'verify') {
      if (row.status === 'published') return json({ error: 'Retirá la publicación antes de modificarla' }, 409);
      const evidence = await officialEvidence(body.officialUrl || row.sourceUrl);
      row.verifiedSource = evidence;
      row.reviewNotes = [...(row.reviewNotes || []), 'Confirmar que esta fuente oficial corresponde al tema detectado.'];
    } else if (body.action === 'generate') {
      if (row.status === 'published') return json({ error: 'Retirá la publicación antes de generar otro borrador' }, 409);
      if (!row.verifiedSource) return json({ error: 'Primero vinculá y verificá una publicación oficial' }, 400);
      if (!process.env.OPENAI_API_KEY || !process.env.NEWS_AI_MODEL) return json({ error: 'La redacción con IA requiere OPENAI_API_KEY y NEWS_AI_MODEL en el servidor. Podés editar los ejemplos manualmente.' }, 503);
      const locked = await store.write(key, { ...row, status: 'generating', generationStartedAt: new Date().toISOString() }, { onlyIfMatch: previous.etag });
      if (!locked.modified) return json({ error: 'Otra operación está modificando esta nota' }, 409);
      const lockVersion = (await store.read(key)).etag;
      try {
        const generated = await generateNewsDraft(row, row.verifiedSource);
        const written = await store.write(key, { ...row, ...generated, status: 'draft', generatedBy: 'IA · ' + generated.model, generatedAt: new Date().toISOString() }, { onlyIfMatch: lockVersion });
        if (!written.modified) return json({ error: 'El borrador cambió durante la generación. Recargá la bandeja.' }, 409);
        return json({ ok: true });
      } catch (error) {
        await store.write(key, { ...row, generationError: error.message }, { onlyIfMatch: lockVersion });
        return json({ error: error.message }, 502);
      }
    } else if (body.action === 'save') {
      if (row.status === 'published') return json({ error: 'Retirá la publicación antes de editarla' }, 409);
      row.article = validateArticle(body.article);
      row.status = 'draft';
    } else if (body.action === 'publish') {
      if (body.reviewed !== true || !row.verifiedSource?.sourceDate) return json({ error: 'Verificá la fuente oficial y confirmá la revisión del contenido' }, 400);
      row.article = validateArticle(row.article);
      row.status = 'published';
      row.reviewedAt = new Date().toISOString();
      row.publishedAt ||= row.reviewedAt;
    } else if (body.action === 'archive') row.status = 'archived';
    else if (body.action === 'unpublish') { row.status = 'draft'; row.publishedAt = null; row.reviewedAt = null; }
    else return json({ error: 'Acción desconocida' }, 400);
    row.updatedAt = new Date().toISOString();
    const written = await store.write(key, row, { onlyIfMatch: previous.etag });
    return written.modified ? json({ ok: true }) : json({ error: 'La nota cambió. Recargá la bandeja.' }, 409);
  } catch (error) {
    if (/título|resumen|secciones|Revisá|fuente|publicación|evidencia|Fecha|Usá|confirmar/.test(error.message)) return json({ error: error.message }, 400);
    console.error('Newsroom:', error.message);
    return json({ error: 'No se pudo completar la operación. Las notas guardadas se conservan.' }, 503);
  }
}
