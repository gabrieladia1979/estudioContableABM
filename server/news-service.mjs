import { collectNews, extractNewsEvidence } from './news-discovery.mjs';
import { processNewsAutomatically } from './news-automation.mjs';
import { generateNewsDraft, validateArticle } from './news-ai.mjs';
import { seedDrafts } from './news-seeds.mjs';
import { createNewsStore } from './news-store.mjs';
import { editorSession, enforceLimit, recordEditorEvent } from './editor-security.mjs';
import { json, readJsonBody, RequestError } from './http-security.mjs';

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

export const autoProcessNews = processNewsAutomatically;

export const publishedArticle = row => ({
  id: row.id, slug: row.id, ...validateArticle(row.article), category: row.category, service: row.service,
  publishedAt: row.publishedAt, reviewedAt: row.reviewedAt, author: 'ABM Estudio Contable',
  sources: [{ title: row.verifiedSource.title, url: row.verifiedSource.sourceUrl, date: row.verifiedSource.sourceDate }],
});

export async function handleNewsRequest(request, { local = false, admin = false, store: suppliedStore } = {}) {
  if (!['GET', ...(admin ? ['POST'] : [])].includes(request.method)) return json({ error: 'Método no permitido' }, 405, { Allow: admin ? 'GET, POST' : 'GET' });
  try {
    const store = suppliedStore || await createNewsStore({ local });
    const actor = admin ? await editorSession(request, store, { local }) : null;
    if (admin && !actor) return json({ error: 'Ingresá al editor. La sesión no está activa o venció.' }, 401, { 'X-Robots-Tag': 'noindex, nofollow' });
    let body;
    if (admin && request.method === 'POST') {
      await enforceLimit(store, 'admin-writes', 30, 60_000);
      body = await readJsonBody(request);
      if (body.action === 'generate') {
        const configured = Number(process.env.NEWS_AI_DAILY_LIMIT || 20);
        const dailyLimit = Number.isInteger(configured) && configured >= 1 && configured <= 1000 ? configured : 20;
        await enforceLimit(store, 'ai-minute', 2, 60_000);
        await enforceLimit(store, 'ai-day', dailyLimit, 24 * 60 * 60_000);
      }
      const action = ['scan', 'examples', 'verify', 'generate', 'save', 'publish', 'archive', 'unpublish', 'auto'].includes(body.action) ? body.action : 'invalid';
      const event = { actor: actor.actor, session: actor.id, action, articleId: typeof body.id === 'string' && /^[a-z0-9-]{1,80}$/.test(body.id) ? body.id : null };
      await recordEditorEvent(store, { ...event, event: 'operation-started' });
      const result = await handleAuthorizedNewsRequest(request, { local, admin, store, body });
      await recordEditorEvent(store, { ...event, event: 'operation-finished', status: result.status });
      result.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return result;
    }
    const result = await handleAuthorizedNewsRequest(request, { local, admin, store });
    if (admin) {
      result.headers.set('X-Robots-Tag', 'noindex, nofollow');
      if (actor.expiresAt) result.headers.set('X-Editor-Session-Expires', String(actor.expiresAt));
    }
    return result;
  } catch (error) {
    if (error instanceof RequestError) return json({ error: error.message }, error.status, error.headers);
    console.error('Newsroom security:', error.name);
    return json({ error: 'No se pudo validar la solicitud. Volvé a intentar.' }, 503);
  }
}

async function handleAuthorizedNewsRequest(request, { local, admin, store, body }) {
  try {
    if (request.method === 'GET') {
      if (admin && local) await addNewsExamples(store);
      const rows = await store.articles();
      const scan = (await store.read('last-scan'))?.data || null;
      if (!admin) return json({ articles: rows.filter(row => row.status === 'published' && row.verifiedSource && row.article).map(publishedArticle).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)), checkedAt: scan?.checkedAt || null });
      const articles = await Promise.all(rows.sort((a, b) => (b.score || 0) - (a.score || 0)).map(async row => ({ ...row, version: (await store.read('articles/' + row.id)).etag })));
      return json({ articles, scan, local, aiReady: Boolean((process.env.OPENAI_API_KEY && process.env.NEWS_AI_MODEL) || process.env.GEMINI_API_KEY) });
    }
    if (body.action === 'scan') {
      const last = (await store.read('last-scan'))?.data;
      if (last && Date.now() - Date.parse(last.checkedAt) < 15 * 60_000) return json({ error: 'La última búsqueda fue hace menos de 15 minutos. Ya podés revisar sus resultados.' }, 429);
      return json(await scanNews(store));
    }
    if (body.action === 'auto') {
      const autoPublish = body.publish === true || process.env.NEWS_AUTO_PUBLISH === 'true';
      const result = await autoProcessNews(store, { limit: body.limit || 4, autoPublish });
      return json({ ok: true, ...result });
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
      const evidence = await extractNewsEvidence(body.officialUrl || row.sourceUrl);
      row.verifiedSource = evidence;
      row.reviewNotes = [...(row.reviewNotes || []), 'Confirmar que esta fuente oficial corresponde al tema detectado.'];
    } else if (body.action === 'generate') {
      if (row.status === 'published') return json({ error: 'Retirá la publicación antes de generar otro borrador' }, 409);
      if (!row.verifiedSource) return json({ error: 'Primero vinculá y verificá una publicación oficial' }, 400);
      const hasAi = Boolean((process.env.OPENAI_API_KEY && process.env.NEWS_AI_MODEL) || process.env.GEMINI_API_KEY);
      if (!hasAi) return json({ error: 'La redacción con IA requiere OPENAI_API_KEY y NEWS_AI_MODEL en el servidor. Podés editar los ejemplos manualmente.' }, 503);
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
