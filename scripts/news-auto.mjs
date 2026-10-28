import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createLocalNewsStore } from '../server/news-store.mjs';
import { autoProcessNews, publishedArticle } from '../server/news-service.mjs';

console.log('🤖 Iniciando automatización de noticias para ABM Estudio Contable...');
console.log('📡 Consultando fuentes prioritarias: Blog del Contador, ARCA, Consejo CABA...');

const store = createLocalNewsStore();
const result = await autoProcessNews(store, { limit: 6, autoPublish: true });

console.log(`\n✅ Proceso completado exitosamente a las ${result.checkedAt}`);
console.log(`📊 Candidatos analizados: ${result.totalCandidates}`);
console.log(`📝 Notas procesadas:`);

for (const item of result.processed) {
  console.log(`  - [${item.status.toUpperCase()}] ${item.title} (Fuente: ${item.source || 'Oficial'})`);
}

// Sincronizar artículos publicados en src/data/publishedNews.json
try {
  const rows = await store.articles();
  const published = rows
    .filter(row => row.status === 'published' && row.verifiedSource && row.article)
    .map(publishedArticle)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  if (published.length) {
    const jsonPath = resolve('src/data/publishedNews.json');
    await writeFile(jsonPath, JSON.stringify(published, null, 2), 'utf8');
    console.log(`💾 Sincronizadas ${published.length} notas en ${jsonPath}`);
  }
} catch (syncError) {
  console.error('Aviso al sincronizar publishedNews.json:', syncError.message);
}

console.log('\n🌐 Podés ver todas las publicaciones en http://localhost:5173/novedades');
console.log('🛠 O gestionar en el panel de control: http://localhost:5173/editor-noticias\n');
