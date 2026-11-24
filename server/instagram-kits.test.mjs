import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  buildDeterministicInstagramKit,
  extractCompleteFact,
  formatInstagramCopyMarkdown,
} from '../src/utils/instagramKitFormatter.js';
import { generateInstagramKitWithAI, syncInstagramKits } from './instagram-kits.mjs';

const sampleArticle = {
  id: 'b92f22f393fee0b11048a1c4',
  slug: 'b92f22f393fee0b11048a1c4',
  title: 'ARCA habilitó la Declaración Jurada Simplificada: paso a paso para el nuevo Formulario 2711',
  summary: 'Análisis de las novedades recientes en materia de impuestos.',
  sections: [
    {
      heading: 'Qué se informó oficialmente',
      text: 'De acuerdo a lo informado en la publicación de referencia (ARCA habilitó la Declaración Jurada Simplificada: paso a paso para el nuevo Formulario 2711), se dieron a conocer modificaciones y pautas operativas vinculadas con impuestos. El reporte destaca: La Agencia de Recaudación y Control Aduanero (ARCA) dio un paso clave en la simplificación tributaria al habilitar formalmente la Declaración Jurada Simplificada dentro del portal integrado de Ganancias. Esta modalidad busca reducir la carga administrativa. A través de la Resolución General 5863/2026, se establece el uso del nuevo For.',
    },
    {
      heading: 'A quiénes alcanza esta novedad',
      text: 'Esta novedad resulta de particular interés para monotributistas, personas humanas con actividad económica y pymes que deban evaluar su encuadre y vigencia de las nuevas disposiciones normativas.',
    },
  ],
  category: 'Impuestos',
  service: 'asesoramiento-tributario',
  publishedAt: '2026-11-21T02:39:01.254Z',
  sources: [
    {
      title: 'ARCA habilitó la Declaración Jurada Simplificada: paso a paso para el nuevo Formulario 2711',
      url: 'https://blogdelcontador.com.ar/news-46477-arca-habilito-la-declaracion-jurada-simplificada',
      date: '2026-11-20',
    },
  ],
};

test('extractCompleteFact limpia el prefijo editorial y descarta palabras cortadas al final', () => {
  const fact = extractCompleteFact(sampleArticle.sections[0].text, 240);
  assert.equal(fact.includes('De acuerdo a lo informado'), false);
  assert.equal(fact.includes('nuevo For.'), false);
  assert.ok(fact.includes('Declaración Jurada Simplificada'));
});

test('buildDeterministicInstagramKit genera 5 placas, epígrafe sin Markdown roto y enlace UTM', () => {
  const kit = buildDeterministicInstagramKit(sampleArticle);
  assert.equal(kit.placas.length, 5);
  assert.equal(/\[[^\]]+\]\(https?:\/\//.test(kit.epigrafe), false);
  assert.ok(kit.epigrafe.includes('+54 11 6817 2147'));
  assert.ok(kit.historia.url.includes('utm_source=instagram'));
  assert.ok(kit.historia.url.includes('/novedades/b92f22f393fee0b11048a1c4'));
  assert.ok(kit.altText.length > 20);
  const md = formatInstagramCopyMarkdown([kit]);
  assert.ok(md.includes('```text'));
  assert.ok(md.includes('ARCA habilitó la Declaración Jurada Simplificada'));
});

test('syncInstagramKits genera archivos JSON y Markdown usando noticias reales sin requerir API key', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'abm-ig-kits-'));
  const previousOpenAi = process.env.OPENAI_API_KEY;
  const previousGemini = process.env.GEMINI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  delete process.env.GEMINI_API_KEY;
  try {
    const newsPath = join(dir, 'publishedNews.json');
    const kitsJsonPath = join(dir, 'instagramKits.json');
    const copyMdPath = join(dir, 'PARA_COPIAR.md');
    await writeFile(newsPath, JSON.stringify([sampleArticle]), 'utf8');

    const result = await syncInstagramKits({ newsPath, kitsJsonPath, copyMdPath });
    assert.equal(result.count, 1);
    const savedKits = JSON.parse(await readFile(kitsJsonPath, 'utf8'));
    assert.equal(savedKits[0].id, sampleArticle.id);
    assert.equal(savedKits[0].placas.length, 5);
    const md = await readFile(copyMdPath, 'utf8');
    assert.ok(md.includes('Epígrafe completo'));
  } finally {
    if (previousOpenAi !== undefined) process.env.OPENAI_API_KEY = previousOpenAi;
    if (previousGemini !== undefined) process.env.GEMINI_API_KEY = previousGemini;
    await rm(dir, { recursive: true, force: true });
  }
});

test('generateInstagramKitWithAI sanitiza enlaces Markdown y hace fallback si falla la respuesta', async () => {
  const previousGemini = process.env.GEMINI_API_KEY;
  const previousOpenAi = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;
  process.env.GEMINI_API_KEY = 'test-only';
  try {
    const aiKit = await generateInstagramKitWithAI(sampleArticle, {
      fetcher: async () => Response.json({
        candidates: [{
          content: {
            parts: [{
              text: JSON.stringify({
                placas: [
                  { label: 'Guía ARCA', title: 'Formulario 2711', body: 'Nueva DDJJ Simplificada', footer: 'Deslizá' },
                  { label: 'Alcance', title: 'Quiénes pueden usarla', body: 'Personas humanas y sucesiones', footer: 'Impuestos' },
                  { label: 'Qué cambió', title: 'Portal de Ganancias', body: 'Habilitación formal de ARCA', footer: 'RG 5863/2026' },
                  { label: 'Qué revisar', title: 'Documentación', body: 'Comprobantes del período', footer: 'Sin claves por DM' },
                  { label: 'ABM', title: 'Consultanos', body: 'Atención de Alejandra Mayta', footer: '@abm.estudiocontable' },
                ],
                epigrafe: 'Revisá el nuevo Formulario 2711. Escribinos a [WhatsApp](https://wa.me/541168172147) o por DM para consultar sobre tu caso. Fuente: ARCA (20/11/2026).',
                hashtags: ['#ARCA', '#Ganancias', '#ABMEstudioContable'],
                historiaTexto: 'Nueva nota sobre F.2711 en nuestra web',
                altText: 'Carrusel informativo sobre el Formulario 2711 de ARCA.',
                dmReply: 'Hola, contanos tu condición frente a ARCA.',
              }),
            }],
          },
        }],
      }),
    });
    assert.equal(aiKit.generatedBy, 'IA · Gemini 2.0 Flash');
    assert.equal(aiKit.epigrafe.includes('[WhatsApp]('), false);
    assert.ok(aiKit.epigrafe.includes('WhatsApp (https://wa.me/541168172147)'));

    const fallbackKit = await generateInstagramKitWithAI(sampleArticle, {
      fetcher: async () => new Response('Error', { status: 500 }),
    });
    assert.equal(fallbackKit.generatedBy, 'ABM Instagram Kit');
    assert.equal(fallbackKit.placas.length, 5);
  } finally {
    if (previousGemini === undefined) delete process.env.GEMINI_API_KEY; else process.env.GEMINI_API_KEY = previousGemini;
    if (previousOpenAi !== undefined) process.env.OPENAI_API_KEY = previousOpenAi;
  }
});
