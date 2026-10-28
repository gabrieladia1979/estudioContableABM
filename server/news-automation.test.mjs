import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createLocalNewsStore } from './news-store.mjs';
import { processNewsAutomatically } from './news-automation.mjs';
import { collectNews } from './news-discovery.mjs';

const now = new Date('2026-10-28T15:00:00Z');
const source = { name: 'Blog del Contador', type: 'rss', kind: 'discovery', url: 'https://blogdelcontador.com.ar/' };
const feed = '<rss><channel>' + ['uno','dos','tres'].map((id,index) => `<item><title>ARCA y ganancias: novedad ${id}</title><link>https://blogdelcontador.com.ar/news-${id}</link><pubDate>Wed, 28 Oct 2026 ${10+index}:00:00 GMT</pubDate></item>`).join('') + '</channel></rss>';
const html = '<html><head><meta property="article:published_time" content="2026-10-28T10:00:00Z"></head><body><article><h1>ARCA aclara las novedades de ganancias</h1><p>La información permite revisar las obligaciones correspondientes al impuesto a las ganancias y organizar los próximos pasos del contribuyente.</p></article></body></html>';
const fetcher = async url => url === source.url ? feed : html;
const article = { title:'Ganancias: novedades para revisar',summary:'La información publicada permite revisar las obligaciones del contribuyente.',sections:[{heading:'Qué cambia',text:'Los contribuyentes pueden consultar las novedades en el servicio oficial.'},{heading:'Próximos pasos',text:'Revisá la documentación del período antes de realizar la consulta.'}] };
const generate = async () => ({article, relevance:90, model:'test-ai',reviewNotes:[]});
async function withStore(run) { const dir = await mkdtemp(join(tmpdir(),'abm-auto-test-')); try { await run(createLocalNewsStore(dir)); } finally { await rm(dir,{recursive:true,force:true}); } }

test('la automatización salta publicadas antes del cupo y conserva borradores y archivadas', async () => withStore(async store => {
 const snapshot = await collectNews({sources:[source],fetcher,now});
 const [published,draft,fresh] = snapshot.candidates;
 await store.write('articles/'+published.id,{...published,status:'published',article});
 await store.write('articles/'+draft.id,{...draft,status:'draft',article});
 const result = await processNewsAutomatically(store,{sources:[source],fetcher,now,limit:1,autoPublish:true,draftGenerator:generate});
 assert.equal(result.processed.length,1);
 assert.equal(result.processed[0].id,fresh.id);
 assert.equal((await store.read('articles/'+draft.id)).data.status,'draft');
 await store.write('articles/'+fresh.id,{...fresh,status:'archived'});
 assert.equal((await processNewsAutomatically(store,{sources:[source],fetcher,now,autoPublish:true,draftGenerator:generate})).processed.length,0);
}));

test('una edición concurrente se conserva aunque termine la generación automática', async () => withStore(async store => {
 const result = await processNewsAutomatically(store,{sources:[source],fetcher,now,limit:1,autoPublish:true,draftGenerator:async candidate => {
   await store.write('articles/'+candidate.id,{...candidate,article:{...article,title:'Edición humana que debe conservarse'},status:'draft'});
   return generate();
 }});
 assert.equal(result.processed.length,0);
 const rows = await store.articles();
 assert.equal(rows.find(row=>row.status==='draft').article.title,'Edición humana que debe conservarse');
}));

test('la síntesis de emergencia queda como borrador y no inventa revisión humana', async () => withStore(async store => {
 const result = await processNewsAutomatically(store,{sources:[source],fetcher,now,limit:1,autoPublish:true,draftGenerator:async()=>({...await generate(),model:'ABM Editorial Engine'})});
 assert.equal(result.processed[0].status,'draft');
 const row = (await store.read('articles/'+result.processed[0].id)).data;
 assert.equal(row.reviewedAt,null);
 assert.equal(row.publishedAt,null);
}));

test('una noticia sin fecha no se publica como si fuera nueva', async () => withStore(async store => {
 const result = await processNewsAutomatically(store,{sources:[source],now,limit:1,autoPublish:true,draftGenerator:generate,fetcher:async url=>url===source.url?feed:html.replace('<meta property="article:published_time" content="2026-10-28T10:00:00Z">','')});
 assert.equal(result.processed[0].status,'error');
 assert.equal((await store.read('articles/'+result.processed[0].id)).data.status,'candidate');
}));
