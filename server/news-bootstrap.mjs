import bundledNews from '../src/data/publishedNews.json' with { type: 'json' };
import { validateArticle } from './news-ai.mjs';

const validId = id => typeof id === 'string' && /^[a-z0-9-]{1,80}$/.test(id);
const validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
const sourceKey = row => row?.verifiedSource?.sourceUrl || row?.sourceUrl || row?.sources?.[0]?.url;

function verifiedSource(row) {
  const source = row.verifiedSource || row.sources?.[0];
  if (!source) return null;
  const sourceUrl = source.sourceUrl || source.url;
  const sourceDate = source.sourceDate || source.date;
  try {
    const url = new URL(sourceUrl);
    if (url.protocol !== 'https:' || url.username || url.password || (url.port && url.port !== '443')) return null;
  } catch { return null; }
  if (typeof source.title !== 'string' || !source.title.trim() || !validDate(sourceDate)) return null;
  return { ...source, title: source.title.trim(), sourceUrl, sourceDate };
}

// Publicadas históricas usaban title/summary/sections en la raíz. No se modifica
// el estado de una nota ni se completa contenido editorial que no esté guardado.
export function normalizeNewsRecord(row) {
  if (!row || typeof row !== 'object' || !validId(row.id)) return null;
  if (row.status !== 'published') return row;
  const source = verifiedSource(row);
  if (!source || !validDate(row.publishedAt)) return null;
  try {
    return { ...row, article: validateArticle(row.article || row), verifiedSource: source };
  } catch { return null; }
}

// El snapshot versionado solo llena huecos: nunca reemplaza una nota editada,
// retirada o archivada en el almacenamiento persistente.
export async function seedPublishedNews(store, articles = bundledNews) {
  const stats = { seeded: 0, migrated: 0, skipped: 0 };
  const records = await store.articles();
  const representedIds = new Set(records.map(row => row.id));
  const representedSources = new Set(records.map(sourceKey).filter(Boolean));

  for (const row of records) {
    if (row.status !== 'published' || row.article || !validId(row.id)) continue;
    const key = 'articles/' + row.id;
    const current = await store.read(key);
    if (!current || current.data.status !== 'published' || current.data.article) continue;
    const normalized = normalizeNewsRecord(current.data);
    if (!normalized || !current.etag) { stats.skipped++; continue; }
    const result = await store.write(key, normalized, { onlyIfMatch: current.etag });
    if (result.modified) stats.migrated++;
    else stats.skipped++;
  }

  for (const article of Array.isArray(articles) ? articles : []) {
    const row = normalizeNewsRecord({ ...article, status: article?.status || 'published' });
    if (!row || row.status !== 'published' || representedIds.has(row.id) || representedSources.has(sourceKey(row))) { stats.skipped++; continue; }
    const result = await store.write('articles/' + row.id, row, { onlyIfNew: true });
    if (result.modified) {
      stats.seeded++;
      representedIds.add(row.id);
      representedSources.add(sourceKey(row));
    } else stats.skipped++;
  }
  return stats;
}
