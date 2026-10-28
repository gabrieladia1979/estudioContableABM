import { collectNews, extractNewsEvidence } from './news-discovery.mjs';
import { generateNewsDraft } from './news-ai.mjs';
import { enforceLimit } from './editor-security.mjs';

export async function processNewsAutomatically(store, { limit = 4, autoPublish = false, sources, fetcher, now = new Date(), draftGenerator = generateNewsDraft } = {}) {
  const snapshot = await collectNews({ sources, fetcher, now });
  for (const candidate of snapshot.candidates) await store.write('articles/' + candidate.id, { ...candidate, status: 'candidate', createdAt: snapshot.checkedAt }, { onlyIfNew: true });
  await store.write('last-scan', { checkedAt: snapshot.checkedAt, sources: snapshot.sources, found: snapshot.candidates.length });

  const records = await store.articles();
  const protectedUrls = new Set(records.filter(row => row.status !== 'candidate').map(row => row.sourceUrl || row.verifiedSource?.sourceUrl).filter(Boolean));
  const eligible = snapshot.candidates.filter(candidate => !protectedUrls.has(candidate.sourceUrl)).sort((a, b) => {
    const priority = row => row.sourceKind === 'official' || row.sourceName === 'Blog del Contador' ? 1 : 0;
    return priority(b) - priority(a) || (b.score || 0) - (a.score || 0);
  });
  const selected = eligible.slice(0, Math.min(6, Math.max(1, Number(limit) || 4)));
  const processed = [];
  for (const candidate of selected) {
    const key = 'articles/' + candidate.id;
    const previous = await store.read(key);
    if (!previous || previous.data.status !== 'candidate') continue;
    const locked = await store.write(key, { ...previous.data, status: 'generating', generationStartedAt: now.toISOString() }, { onlyIfMatch: previous.etag });
    if (!locked.modified) continue;
    const lockVersion = (await store.read(key)).etag;
    try {
      const evidence = await extractNewsEvidence(candidate.sourceUrl, { fetcher, now });
      if (!evidence.sourceDate) throw new Error('No se pudo confirmar la fecha de la noticia');
      const configured = Number(process.env.NEWS_AI_DAILY_LIMIT || 20);
      await enforceLimit(store, 'ai-day', Number.isInteger(configured) && configured >= 1 && configured <= 1000 ? configured : 20, 24 * 60 * 60_000);
      const generated = await draftGenerator(candidate, evidence, { allowFallback: true });
      // Una síntesis de emergencia requiere edición; no se presenta como revisión humana.
      const publish = autoPublish && generated.model !== 'ABM Editorial Engine' && generated.relevance >= 75;
      const row = {
        ...previous.data, ...generated, verifiedSource: evidence,
        status: publish ? 'published' : 'draft', publishedAt: publish ? now.toISOString() : null,
        reviewedAt: null, updatedAt: now.toISOString(), generatedAt: now.toISOString(),
        generatedBy: generated.model, publicationMode: publish ? 'automatic' : null,
      };
      const written = await store.write(key, row, { onlyIfMatch: lockVersion });
      if (written.modified) processed.push({ id: candidate.id, title: generated.article.title, status: row.status, source: candidate.sourceName });
    } catch (error) {
      await store.write(key, { ...previous.data, automationError: error.message }, { onlyIfMatch: lockVersion });
      processed.push({ id: candidate.id, title: candidate.title, status: 'error', error: error.message });
    }
  }
  const result = { checkedAt: snapshot.checkedAt, processed, totalCandidates: snapshot.candidates.length };
  await store.write('last-auto', result);
  return result;
}
