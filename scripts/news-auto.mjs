import { createLocalNewsStore } from '../server/news-store.mjs';
import { autoProcessNews } from '../server/news-service.mjs';

console.log('🤖 Iniciando automatización de noticias para ABM Estudio Contable...');
console.log('📡 Consultando fuentes: Blog del Contador, ARCA, Consejo CABA, medios económicos...');

const store = createLocalNewsStore();
const result = await autoProcessNews(store, { limit: 5, autoPublish: true });

console.log(`\n✅ Proceso completado exitosamente a las ${result.checkedAt}`);
console.log(`📊 Candidatos totales analizados: ${result.totalCandidates}`);
console.log(`📝 Notas redactadas y publicadas automáticamente:`);

for (const item of result.processed) {
  console.log(`  - [${item.status.toUpperCase()}] ${item.title} (Fuente: ${item.source || 'Oficial'})`);
  console.log(`    Ver en: http://localhost:5173/novedades/${item.id}`);
}

console.log('\n🌐 Podés ver todas las publicaciones en http://localhost:5173/novedades');
console.log('🛠 O gestionar en el panel de control: http://localhost:5173/editor-noticias\n');
