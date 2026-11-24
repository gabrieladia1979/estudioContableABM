import { syncInstagramKits } from '../server/instagram-kits.mjs';

async function main() {
  console.log('\n📸 Generador de Kits de Instagram · ABM Estudio Contable');
  console.log('==========================================================');
  const result = await syncInstagramKits({ limit: 12, aiRefreshLimit: 3 });
  console.log(`✅ Se prepararon ${result.count} kits listos para copiar.`);
  console.log('📁 JSON para el editor web: src/data/instagramKits.json');
  console.log('📁 Guía rápida para copiar: marketing/instagram/PARA_COPIAR.md\n');
}

main().catch(error => {
  console.error('\n❌ Error al generar kits de Instagram:', error.message);
  process.exit(1);
});
