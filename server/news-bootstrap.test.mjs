import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createLocalNewsStore } from './news-store.mjs';
import { normalizeNewsRecord, seedPublishedNews } from './news-bootstrap.mjs';

const content = {
  title: 'Ganancias: información para organizar una consulta',
  summary: 'Información sobre los períodos y comprobantes necesarios antes de una consulta contable.',
  sections: [
    { heading: 'Revisar los períodos', text: 'Reuní los comprobantes de los períodos sobre los que necesitás consultar.' },
    { heading: 'Preparar la consulta', text: 'Identificá el motivo de la consulta y cualquier vencimiento próximo.' },
  ],
};
const flat = (id = 'noticia') => ({
  id, slug: id, ...content, category: 'Impuestos', status: 'published',
  publishedAt: '2026-10-28T11:00:00Z', reviewedAt: '2026-10-28T10:00:00Z',
  sources: [{ title: 'ARCA', url: `https://www.arca.gob.ar/noticias/${id}`, date: '2026-10-28' }],
});

async function withStore(run) {
  const directory = await mkdtemp(join(tmpdir(), 'abm-bootstrap-test-'));
  try { await run(createLocalNewsStore(directory)); }
  finally { await rm(directory, { recursive: true, force: true }); }
}

test('normaliza una publicación plana sin perder contenido, fechas ni evidencia existente', () => {
  const old = { ...flat(), verifiedSource: { title: 'ARCA', sourceUrl: 'https://www.arca.gob.ar/nota', sourceDate: '2026-10-28', evidence: 'Respaldo guardado' }, reviewNotes: ['Revisión humana'] };
  const normalized = normalizeNewsRecord(old);
  assert.deepEqual(normalized.article, content);
  assert.deepEqual(normalized.verifiedSource, old.verifiedSource);
  assert.equal(normalized.publishedAt, old.publishedAt);
  assert.deepEqual(normalized.reviewNotes, old.reviewNotes);
  assert.equal(old.article, undefined);
});

test('un almacén vacío importa el snapshot una sola vez y construye el formato del editor', async () => withStore(async store => {
  assert.deepEqual(await seedPublishedNews(store, [flat()]), { seeded: 1, migrated: 0, skipped: 0 });
  const saved = (await store.read('articles/noticia')).data;
  assert.deepEqual(saved.article, content);
  assert.equal(saved.verifiedSource.sourceUrl, flat().sources[0].url);
  assert.equal(saved.verifiedSource.sourceDate, '2026-10-28');
  assert.deepEqual(await seedPublishedNews(store, [flat()]), { seeded: 0, migrated: 0, skipped: 1 });
  assert.equal((await store.articles()).length, 1);
}));

test('migra las filas planas existentes mediante CAS y conserva sus metadatos', async () => withStore(async store => {
  const old = { ...flat(), updatedAt: '2026-10-28T12:00:00Z', editorNote: 'Texto local' };
  await store.write('articles/noticia', old);
  assert.deepEqual(await seedPublishedNews(store, []), { seeded: 0, migrated: 1, skipped: 0 });
  const saved = (await store.read('articles/noticia')).data;
  assert.deepEqual(saved.article, content);
  assert.equal(saved.editorNote, old.editorNote);
  assert.equal(saved.updatedAt, old.updatedAt);
}));

test('la importación conserva ediciones y no resucita archivadas o borradores, aun con otro id para la misma fuente', async () => withStore(async store => {
  const edited = { ...normalizeNewsRecord(flat('editada')), article: { ...content, title: 'Título modificado por la persona editora' } };
  const archived = { ...flat('archivada'), status: 'archived' };
  const draft = { ...flat('borrador'), status: 'draft' };
  for (const row of [edited, archived, draft]) await store.write('articles/' + row.id, row);
  const duplicate = { ...flat('otro-id'), sources: archived.sources };
  const result = await seedPublishedNews(store, [flat('editada'), flat('archivada'), flat('borrador'), duplicate]);
  assert.equal(result.seeded, 0);
  assert.equal((await store.read('articles/editada')).data.article.title, edited.article.title);
  assert.equal((await store.read('articles/archivada')).data.status, 'archived');
  assert.equal((await store.read('articles/borrador')).data.status, 'draft');
  assert.equal(await store.read('articles/otro-id'), null);
}));

test('una edición concurrente impide que la migración la reemplace', async () => withStore(async store => {
  await store.write('articles/noticia', flat());
  const originalWrite = store.write.bind(store);
  let intercepted = false;
  store.write = async (key, value, conditions) => {
    if (!intercepted && conditions?.onlyIfMatch) {
      intercepted = true;
      await originalWrite(key, { ...flat(), status: 'archived' });
    }
    return originalWrite(key, value, conditions);
  };
  assert.equal((await seedPublishedNews(store, [])).migrated, 0);
  assert.equal((await store.read('articles/noticia')).data.status, 'archived');
}));

test('omite publicaciones inválidas sin interrumpir la importación de las válidas', async () => withStore(async store => {
  const invalid = [
    { ...flat('sin-texto'), sections: [] },
    { ...flat('sin-fecha'), publishedAt: null },
    { ...flat('sin-fuente'), sources: [] },
    { ...flat('url-invalida'), sources: [{ title: 'Fuente', url: 'javascript:alert(1)', date: '2026-10-28' }] },
  ];
  for (const row of invalid) assert.equal(normalizeNewsRecord(row), null);
  const result = await seedPublishedNews(store, [...invalid, flat('valida')]);
  assert.equal(result.skipped, invalid.length);
  assert.equal(result.seeded, 1);
  assert.equal((await store.articles()).length, 1);
}));
