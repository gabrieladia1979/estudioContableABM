import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import {
  ABM_INSTAGRAM_HANDLE,
  ABM_SITE_ORIGIN,
  ABM_WHATSAPP_DISPLAY,
  buildDeterministicInstagramKit,
  formatInstagramCopyMarkdown,
  getCategoryPreset,
} from '../src/utils/instagramKitFormatter.js';

export const PUBLISHED_NEWS_PATH = resolve('src/data/publishedNews.json');
export const INSTAGRAM_KITS_JSON_PATH = resolve('src/data/instagramKits.json');
export const INSTAGRAM_COPY_MD_PATH = resolve('marketing/instagram/PARA_COPIAR.md');

const instagramKitSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    placas: {
      type: 'array',
      minItems: 5,
      maxItems: 5,
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          label: { type: 'string' },
          title: { type: 'string' },
          body: { type: 'string' },
          footer: { type: 'string' },
        },
        required: ['label', 'title', 'body', 'footer'],
      },
    },
    epigrafe: { type: 'string' },
    hashtags: { type: 'array', items: { type: 'string' }, minItems: 4, maxItems: 8 },
    historiaTexto: { type: 'string' },
    altText: { type: 'string' },
    dmReply: { type: 'string' },
  },
  required: ['placas', 'epigrafe', 'hashtags', 'historiaTexto', 'altText', 'dmReply'],
};

async function loadJsonSafe(path, fallback) {
  try {
    const raw = await readFile(path, 'utf8');
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function sanitizeCaptionForInstagram(text) {
  // Instagram captions do not support clickable Markdown links [label](url).
  return String(text || '')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '$1 ($2)')
    .trim();
}

function validateAiInstagramPayload(payload) {
  if (!payload || !Array.isArray(payload.placas) || payload.placas.length !== 5) return false;
  for (const placa of payload.placas) {
    if (!placa || typeof placa.title !== 'string' || !placa.title.trim()) return false;
    if (typeof placa.body !== 'string' || !placa.body.trim()) return false;
  }
  if (typeof payload.epigrafe !== 'string' || payload.epigrafe.trim().length < 80) return false;
  if (!Array.isArray(payload.hashtags) || payload.hashtags.length < 3) return false;
  if (typeof payload.historiaTexto !== 'string' || payload.historiaTexto.trim().length < 20) return false;
  if (typeof payload.altText !== 'string' || payload.altText.trim().length < 20) return false;
  return true;
}

export async function generateInstagramKitWithAI(article, { fetcher = fetch } = {}) {
  const baseKit = buildDeterministicInstagramKit(article);
  const openaiKey = process.env.OPENAI_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!openaiKey && !geminiKey) return baseKit;

  const instructions = [
    `Sos editor de redes para ${ABM_INSTAGRAM_HANDLE} (ABM Estudio Contable, Parque Patricios, CABA; titular Cra. Alejandra Mayta).`,
    'Convertí la noticia en un carrusel de Instagram de exactamente 5 placas (1: Portada gancho, 2: Alcance, 3: Qué cambió / datos verificados, 4: 3 pasos concretos para revisar, 5: Cierre con invitación a guardar y consultar).',
    'Reglas estrictas:',
    '- Español argentino cercano y profesional (voseo: contanos, revisá, escribinos).',
    '- Usá solo hechos presentes en la noticia de entrada. Nunca inventes importes, fechas, normas, clientes ni resultados garantizados.',
    '- En el epígrafe NO uses enlaces en formato Markdown [texto](url). Incluí WhatsApp ' + ABM_WHATSAPP_DISPLAY + ', invitación a escribir por DM o ir al link de la biografía, y citá la fuente y fecha.',
    '- No prometas gratuidad ni respuesta inmediata.',
    '- Cada placa debe tener textos cortos y legibles desde el celular.',
  ].join('\n');

  const inputPayload = JSON.stringify({
    title: article.title,
    category: article.category,
    publishedAt: article.publishedAt,
    summary: article.summary,
    sections: article.sections,
    source: article.sources?.[0] || null,
    articleUrl: baseKit.articleUrl,
  });

  let parsed = null;
  let modelUsed = null;

  if (openaiKey) {
    try {
      const model = process.env.NEWS_AI_MODEL || 'gpt-4o-mini';
      const response = await fetcher('https://api.openai.com/v1/responses', {
        method: 'POST',
        signal: AbortSignal.timeout(40000),
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          store: false,
          max_output_tokens: 1800,
          instructions,
          input: inputPayload,
          text: {
            format: {
              type: 'json_schema',
              name: 'abm_instagram_kit',
              strict: true,
              schema: instagramKitSchema,
            },
          },
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const text = data.output?.flatMap(item => item.content || []).filter(item => item.type === 'output_text').map(item => item.text).join('');
        parsed = JSON.parse(text);
        modelUsed = `IA · ${model}`;
      }
    } catch {
      parsed = null;
    }
  }

  if (!parsed && geminiKey) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
      const response = await fetcher(geminiUrl, {
        method: 'POST',
        signal: AbortSignal.timeout(40000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text: `${instructions}\n\nDevolvé únicamente JSON válido con esta estructura: {"placas":[{"label":"...","title":"...","body":"...","footer":"..."}],"epigrafe":"...","hashtags":["#..."],"historiaTexto":"...","altText":"...","dmReply":"..."}.\n\nNoticia:\n${inputPayload}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            maxOutputTokens: 1800,
          },
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        parsed = JSON.parse(text);
        modelUsed = 'IA · Gemini 2.0 Flash';
      }
    } catch {
      parsed = null;
    }
  }

  if (!validateAiInstagramPayload(parsed)) return baseKit;

  const hashtags = parsed.hashtags
    .map(tag => String(tag || '').trim())
    .filter(tag => tag.startsWith('#') && tag.length > 2)
    .slice(0, 8);
  const cleanCaption = sanitizeCaptionForInstagram(parsed.epigrafe);
  const captionWithTags = cleanCaption.includes('#')
    ? cleanCaption
    : `${cleanCaption}\n\n${(hashtags.length ? hashtags : baseKit.hashtags).join(' ')}`;

  return {
    ...baseKit,
    generatedBy: modelUsed || baseKit.generatedBy,
    placas: parsed.placas.map((placa, idx) => ({
      label: String(placa.label || baseKit.placas[idx]?.label || `Placa ${idx + 1}`).trim(),
      title: String(placa.title).trim(),
      body: String(placa.body).trim(),
      footer: String(placa.footer || baseKit.placas[idx]?.footer || '').trim(),
    })),
    epigrafe: captionWithTags,
    hashtags: hashtags.length ? hashtags : baseKit.hashtags,
    historia: {
      ...baseKit.historia,
      texto: String(parsed.historiaTexto).trim(),
    },
    altText: String(parsed.altText).trim(),
    dmReply: String(parsed.dmReply || baseKit.dmReply).trim(),
  };
}

export async function syncInstagramKits({
  newsPath = PUBLISHED_NEWS_PATH,
  kitsJsonPath = INSTAGRAM_KITS_JSON_PATH,
  copyMdPath = INSTAGRAM_COPY_MD_PATH,
  limit = 12,
  aiRefreshLimit = 3,
  fetcher = fetch,
  now = new Date(),
} = {}) {
  const articles = await loadJsonSafe(newsPath, []);
  const existingKits = await loadJsonSafe(kitsJsonPath, []);
  const existingById = new Map(
    (Array.isArray(existingKits) ? existingKits : [])
      .filter(item => item && item.id)
      .map(item => [item.id, item]),
  );

  const sortedArticles = [...(Array.isArray(articles) ? articles : [])]
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')))
    .slice(0, limit);

  let aiCalls = 0;
  const kits = [];
  for (const article of sortedArticles) {
    const existing = existingById.get(article.id);
    const hasAiKit = existing && String(existing.generatedBy || '').startsWith('IA ·');
    if (hasAiKit) {
      kits.push(existing);
      continue;
    }

    const canUseAi = Boolean(process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY) && aiCalls < aiRefreshLimit;
    if (canUseAi) {
      aiCalls += 1;
      kits.push(await generateInstagramKitWithAI(article, { fetcher }));
    } else {
      kits.push(buildDeterministicInstagramKit(article));
    }
  }

  await mkdir(dirname(kitsJsonPath), { recursive: true });
  await mkdir(dirname(copyMdPath), { recursive: true });

  await writeFile(kitsJsonPath, JSON.stringify(kits, null, 2) + '\n', 'utf8');
  await writeFile(copyMdPath, formatInstagramCopyMarkdown(kits.slice(0, 6), now.toISOString()), 'utf8');

  return { count: kits.length, aiCalls, kits };
}

export function selectWeeklyPillarKits(kits) {
  const list = Array.isArray(kits) ? kits : [];
  const monotributo = list.find(kit => getCategoryPreset(kit.category).segment === 'monotributo') || null;
  const pymes = list.find(kit => getCategoryPreset(kit.category).segment === 'pymes' && kit.id !== monotributo?.id) || null;
  const sociedades = list.find(kit => getCategoryPreset(kit.category).segment === 'sociedades' && kit.id !== monotributo?.id && kit.id !== pymes?.id) || null;

  const fallbackSociedades = {
    title: 'Antes de constituir una sociedad: qué definir primero',
    category: 'Sociedades',
    articleUrl: `${ABM_SITE_ORIGIN}/crear-sociedad?utm_source=instagram&utm_medium=organic_social&utm_campaign=campana_semanal`,
    placas: [
      { label: 'Guía Sociedades', title: '¿Van a constituir una sociedad?', body: 'Ordená estas 3 definiciones antes de iniciar trámites.', footer: 'Deslizá para verlas →' },
      { label: 'Paso 1', title: 'Actividad y jurisdicción', body: 'Definir qué van a vender o prestar y dónde van a operar (CABA u otra jurisdicción).', footer: 'Base del estatuto' },
      { label: 'Paso 2', title: 'Socios y participación', body: 'Acordar quiénes integran el proyecto, los aportes y quién administra.', footer: 'SRL · SAS · SA · Cooperativas' },
      { label: 'Paso 3', title: 'Encuadre contable inicial', body: 'Planificar altas impositivas, facturación y libros desde el primer mes.', footer: 'Sin improvisar vencimientos' },
      { label: 'ABM Estudio Contable', title: 'Conversemos sobre tu proyecto', body: `Atención directa de la Cra. Alejandra Mayta.\nEscribinos por DM o WhatsApp al ${ABM_WHATSAPP_DISPLAY}.`, footer: `Guardá esta guía · ${ABM_INSTAGRAM_HANDLE}` },
    ],
    epigrafe: [
      '¿Están por armar una sociedad y no saben qué revisar primero?',
      '',
      'Antes de elegir entre SRL, SAS, SA o cooperativa, conviene definir tres puntos clave: qué actividad van a desarrollar, quiénes participan y dónde van a operar.',
      '',
      'En ABM Estudio Contable acompañamos la constitución y la organización contable e impositiva inicial, con atención directa de la Cra. Alejandra Mayta.',
      '',
      `📲 Escribinos por DM o WhatsApp al ${ABM_WHATSAPP_DISPLAY} para conversar sobre tu proyecto.`,
      '🌐 Más detalles desde el enlace de la biografía.',
      '',
      '#CrearSociedad #SRL #SAS #EmprendedoresArgentina #ABMEstudioContable #ParquePatricios',
    ].join('\n'),
    historia: {
      texto: '📌 ¿Pensando en armar una sociedad?\nConocé cómo acompañamos SRL, SAS, SA y cooperativas 👇',
      stickerTexto: 'Ver Sociedades',
      url: `${ABM_SITE_ORIGIN}/crear-sociedad?utm_source=instagram&utm_medium=story&utm_campaign=campana_semanal`,
    },
    altText: 'Carrusel de ABM Estudio Contable con tres pasos previos para consultar sobre la constitución de una sociedad.',
  };

  const fallbackMonotributo = {
    title: 'Monotributo: qué revisar antes de emitir comprobantes o recategorizarte',
    category: 'Monotributo',
    articleUrl: `${ABM_SITE_ORIGIN}/monotributo?utm_source=instagram&utm_medium=organic_social&utm_campaign=campana_semanal`,
    placas: [
      { label: 'Guía Monotributo', title: '¿Tenés dudas con tu Monotributo?', body: 'Tres chequeos rápidos para mantener tu actividad ordenada.', footer: 'Deslizá →' },
      { label: 'Control 1', title: 'Facturación acumulada', body: 'Sumá los comprobantes emitidos de los últimos 12 meses y comparalos con el tope de tu categoría.', footer: 'No esperes al cierre' },
      { label: 'Control 2', title: 'Modalidad de emisión', body: 'Verificá tu punto de venta electrónico y que la actividad declarada coincida con lo que facturás.', footer: 'Orden en ARCA' },
      { label: 'Control 3', title: 'Comunicaciones y pagos', body: 'Revisá tu domicilio fiscal electrónico para evitar sorpresas o deuda acumulada.', footer: 'Sin compartir clave fiscal por DM' },
      { label: 'ABM Estudio Contable', title: '¿Revisamos tu situación?', body: `Atención directa de la Cra. Alejandra Mayta.\nEscribinos por DM o WhatsApp al ${ABM_WHATSAPP_DISPLAY}.`, footer: `Guardá este post · ${ABM_INSTAGRAM_HANDLE}` },
    ],
    epigrafe: [
      '¿Empezaste como monotributista o cambió tu volumen de facturación?',
      '',
      'Revisar a tiempo tu categoría, la facturación acumulada y las notificaciones de ARCA evita recategorizaciones de oficio o atrasos innecesarios.',
      '',
      `Si querés ordenar tu situación con acompañamiento profesional, escribinos por DM o por WhatsApp al ${ABM_WHATSAPP_DISPLAY}.`,
      '🌐 Más información en el enlace de nuestra biografía.',
      '',
      '#Monotributo #Monotributistas #ARCA #ABMEstudioContable #ParquePatricios',
    ].join('\n'),
    historia: {
      texto: '📌 ¿Dudas con tu Monotributo?\nMirá qué conviene revisar antes de consultar 👇',
      stickerTexto: 'Asesoramiento Monotributo',
      url: `${ABM_SITE_ORIGIN}/monotributo?utm_source=instagram&utm_medium=story&utm_campaign=campana_semanal`,
    },
    altText: 'Carrusel de ABM Estudio Contable con tres controles recomendados para monotributistas.',
  };

  return {
    monotributo: monotributo || fallbackMonotributo,
    pymes: pymes || list[0] || fallbackMonotributo,
    sociedades: sociedades || list.find(kit => kit.id !== monotributo?.id && kit.id !== pymes?.id) || fallbackSociedades,
  };
}
