import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import { XMLParser } from 'fast-xml-parser';
import { allowedNewsHosts, newsSources, officialHosts, topicRules } from './news-sources.mjs';

const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
export const plainText = value => load(String(value || '')).text().replace(/\s+/g, ' ').trim();
export const newsId = value => createHash('sha256').update(value).digest('hex').slice(0, 24);

export function safeNewsUrl(value, base, hosts = allowedNewsHosts) {
  try {
    const url = new URL(value, base);
    if (url.protocol !== 'https:' || !hosts.has(url.hostname) || url.username || url.password || url.port) return null;
    for (const key of [...url.searchParams.keys()]) if (/^utm_|^(fbclid|gclid)$/i.test(key)) url.searchParams.delete(key);
    url.hash = '';
    return url.href;
  } catch { return null; }
}

export async function fetchNewsText(url, { fetcher = fetch, hosts = allowedNewsHosts } = {}) {
  const safe = safeNewsUrl(url, undefined, hosts);
  if (!safe) throw new Error('Fuente no habilitada');
  const signal = AbortSignal.timeout(8000);
  let current = safe;
  for (let redirect = 0; redirect < 4; redirect++) {
    const response = await fetcher(current, { redirect: 'manual', signal, headers: { 'User-Agent': 'ABM-Newsroom/1.0 (+https://estudiocontableabm.com.ar)', Accept: 'text/html, application/rss+xml, application/xml' } });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      current = safeNewsUrl(response.headers.get('location'), current, hosts);
      if (!current) throw new Error('Redirección fuera de las fuentes habilitadas');
      continue;
    }
    if (!response.ok) throw new Error('La fuente respondió ' + response.status);
    if (!/html|xml|text/i.test(response.headers.get('content-type') || '')) throw new Error('Formato de fuente no compatible');
    const chunks = [];
    let bytes = 0;
    for await (const chunk of response.body) {
      bytes += chunk.length;
      if (bytes > 1_500_000) throw new Error('La fuente excede el tamaño permitido');
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString('utf8');
  }
  throw new Error('Demasiadas redirecciones');
}

export function dateOnly(value, now = new Date()) {
  if (!value) return null;
  const match = String(value).match(/(\d{2})\/(\d{2})\/(\d{4})/);
  const date = new Date(match ? match[3] + '-' + match[2] + '-' + match[1] : value);
  return Number.isNaN(+date) || date > now ? null : date.toISOString().slice(0, 10);
}

export function scoreNews(article, now = new Date()) {
  const text = normalize(article.title);
  const matched = topicRules.map(rule => ({
    ...rule,
    hits: rule.words.filter(word => new RegExp('(?:^|[^a-z])' + word + '(?:s|es)?(?=[^a-z]|$)').test(text)),
  })).filter(rule => rule.hits.length).sort((a, b) => b.hits.length * b.weight - a.hits.length * a.weight);
  if (!matched.length || /\b(irpf|imss|sat|hacienda espanola|mexico|espana)\b/.test(text)) return null;
  const age = article.sourceDate ? Math.max(0, (+now - Date.parse(article.sourceDate)) / 86400000) : null;
  if (age !== null && age > 45) return null;
  const keywordScore = matched.reduce((sum, rule) => sum + Math.min(rule.hits.length, 3) * rule.weight, 0);
  const score = Math.min(100, keywordScore + (article.sourceKind === 'official' ? 20 : 5) + (age === null ? 0 : Math.max(0, 15 - Math.floor(age))));
  return { ...article, score, category: matched[0].category, service: matched[0].service, keywords: [...new Set(matched.flatMap(rule => rule.hits))], sourceDate: article.sourceDate || null, dateNeedsReview: age === null };
}

export function parseFeed(xml, source, now = new Date()) {
  if (!/<rss\b|<feed\b/i.test(xml)) throw new Error('La fuente no devolvió un RSS o Atom válido');
  const parsed = new XMLParser({ ignoreAttributes: false, processEntities: false }).parse(xml);
  const rows = parsed.rss?.channel?.item || parsed.feed?.entry || [];
  return (Array.isArray(rows) ? rows : [rows]).slice(0, 20).flatMap(item => {
    const link = typeof item.link === 'string' ? item.link : item.link?.['@_href'];
    const url = safeNewsUrl(plainText(link));
    const title = plainText(item.title?.['#text'] || item.title || '').slice(0, 240);
    if (!url || !title) return [];
    const sourceDate = dateOnly(item.pubDate || item.published || item.updated, now);
    return [{ id: newsId(url), title, sourceUrl: url, sourceName: source.name, sourceKind: source.kind, sourceDate, via: 'Google News · ' + source.name }];
  });
}

export function parseListing(html, source) {
  const $ = load(html);
  const found = new Map();
  $(source.selector).each((_, element) => {
    const url = safeNewsUrl($(element).attr('href'), source.url);
    const title = $(element).text().replace(/\s+/g, ' ').trim();
    if (!url || title.length < 15 || found.has(url)) return;
    found.set(url, { id: newsId(url), title: title.slice(0, 240), sourceUrl: url, sourceName: source.name, sourceKind: source.kind, sourceDate: null });
  });
  return [...found.values()].slice(0, 16);
}

export function extractOfficial(html, url, now = new Date()) {
  const $ = load(html);
  // ASP.NET envuelve toda la noticia en un <form>; quitarlo borraría también el contenido.
  $('script,style,nav,footer,aside,input,button').remove();
  const articleHeading = $('#h3Titulo').first().length ? $('#h3Titulo').first() : $('article h1, main h1').first();
  const heading = articleHeading.text().trim() || $('meta[property="og:title"]').attr('content') || $('title').text().trim();
  // ARCA no usa <article>: tomar solo la columna que contiene la publicación.
  const root = $('article').first().length ? $('article').first() : articleHeading.parent();
  const body = root.length ? root.text() : $('main').text();
  const sourceDate = dateOnly(body.match(/Publicado:\s*(\d{2}\/\d{2}\/\d{4})/)?.[1] || $('meta[property="article:published_time"]').attr('content') || $('time[datetime]').first().attr('datetime'), now);
  const paragraphs = (root.length ? root : $('main')).find('p').map((_, node) => $(node).text().trim()).get().filter(text => text.length > 60);
  const evidence = paragraphs.join(' ').replace(/\s+/g, ' ').split(/\s+/).slice(0, 180).join(' ');
  if (!heading || evidence.length < 120) throw new Error('No se pudo extraer evidencia suficiente de la publicación oficial');
  return { title: heading.slice(0, 240), sourceUrl: url, sourceDate, evidence };
}

export function extractArticleEvidence(html, url, now = new Date()) {
  const $ = load(html);
  $('script,style,nav,footer,aside,input,button,noscript').remove();
  const rawHeading = $('meta[property="og:title"]').attr('content')
    || $('#h3Titulo').first().text().trim()
    || $('article h1, main h1, h1').first().text().trim()
    || $('title').text().trim();
  const heading = rawHeading ? rawHeading.replace(/\s*\/\s*Blog del Contador.*$/i, '').trim() : '';

  const bodyText = $('body').text();
  const dateMatch = bodyText.match(/(\d{1,2}\s+(?:de\s+)?(?:enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)\s+(?:de\s+)?\d{4}|\d{2}\/\d{2}\/\d{4})/i);
  let parsedDate = null;
  if (dateMatch) parsedDate = dateOnly(dateMatch[0], now);
  const sourceDate = parsedDate
    || dateOnly($('meta[property="article:published_time"]').attr('content') || $('time[datetime]').first().attr('datetime'), now)
    || now.toISOString().slice(0, 10);

  const paragraphs = $('article p, .entry-content p, .nota-cuerpo p, main p, p')
    .map((_, node) => $(node).text().trim())
    .get()
    .filter(text => text.length > 50 && !/derechos reservados|iniciar sesi[oó]n|suscr[ií]bete|comentarios/i.test(text));

  const evidence = paragraphs.join(' ').replace(/\s+/g, ' ').split(/\s+/).slice(0, 220).join(' ');
  if (!heading || evidence.length < 60) throw new Error('No se pudo extraer evidencia suficiente del artículo');
  return { title: heading.slice(0, 240), sourceUrl: url, sourceDate, evidence, paragraphs: paragraphs.slice(0, 6) };
}

export async function extractNewsEvidence(url, { hosts = allowedNewsHosts, fetcher = fetchNewsText, now = new Date() } = {}) {
  const safe = safeNewsUrl(url, undefined, hosts);
  if (!safe) throw new Error('Fuente no habilitada');
  const hostname = new URL(safe).hostname;
  const html = await fetcher(safe, { hosts });
  if (officialHosts.has(hostname)) {
    try { return extractOfficial(html, safe, now); }
    catch { return extractArticleEvidence(html, safe, now); }
  }
  return extractArticleEvidence(html, safe, now);
}

export async function collectNews({ sources = newsSources, fetcher = fetchNewsText, now = new Date() } = {}) {
  const results = await Promise.allSettled(sources.map(async source => {
    const text = await fetcher(source.url);
    if (source.type === 'rss') return parseFeed(text, source, now);
    if (source.id !== 'arca') return parseListing(text, source);
    const $ = load(text);
    const urls = [...new Set([source.url, ...$(source.selector).map((_, element) => safeNewsUrl($(element).attr('href'), source.url)).get().filter(Boolean)])].slice(0, 6);
    const pages = await Promise.allSettled(urls.map(async url => {
      const item = extractOfficial(url === source.url ? text : await fetcher(url), url, now);
      return { ...item, id: newsId(url), sourceName: source.name, sourceKind: 'official' };
    }));
    const articles = pages.filter(row => row.status === 'fulfilled').map(row => row.value);
    if (!articles.length) throw new Error('ARCA no devolvió publicaciones utilizables');
    return articles;
  }));
  const unique = new Map();
  for (const row of results) {
    if (row.status !== 'fulfilled') continue;
    for (const item of row.value) {
      const ranked = scoreNews(item, now);
      if (ranked && !unique.has(normalize(item.title))) unique.set(normalize(item.title), ranked);
    }
  }
  return {
    checkedAt: now.toISOString(),
    candidates: [...unique.values()].sort((a, b) => b.score - a.score).slice(0, 60),
    sources: results.map((row, index) => ({ name: sources[index].name, ok: row.status === 'fulfilled', count: row.status === 'fulfilled' ? row.value.length : 0, error: row.status === 'rejected' ? row.reason.message : null })),
  };
}

export async function officialEvidence(url) {
  const safe = safeNewsUrl(url, undefined, officialHosts);
  if (!safe) throw new Error('Usá un enlace de ARCA, AFIP u otro organismo habilitado');
  const evidence = extractOfficial(await fetchNewsText(safe, { hosts: officialHosts }), safe);
  if (!evidence.sourceDate) throw new Error('No se pudo confirmar la fecha de la publicación oficial');
  return evidence;
}
