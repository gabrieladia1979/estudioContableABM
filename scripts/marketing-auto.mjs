import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { email, phoneDisplay } from '../src/data/contact.js';
import {
  ABM_INSTAGRAM_HANDLE,
  ABM_SITE_ORIGIN,
  formatDateAr,
} from '../src/utils/instagramKitFormatter.js';
import { selectWeeklyPillarKits, syncInstagramKits } from '../server/instagram-kits.mjs';

const campanasDir = resolve('marketing/campanas');

function getWeekMondayDate(now = new Date()) {
  const date = new Date(now);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return date.toISOString().split('T')[0];
}

function formatPillarSection(heading, kit) {
  const placasMd = (kit.placas || [])
    .map((placa, index) => [
      `#### Placa ${index + 1} · ${placa.label}`,
      '```text',
      [placa.title, placa.body, placa.footer].filter(Boolean).join('\n\n'),
      '```',
    ].join('\n'))
    .join('\n\n');

  return [
    `### ${heading}`,
    `- **Tema:** ${kit.title} (${kit.category})`,
    kit.articleUrl ? `- **Enlace de referencia:** ${kit.articleUrl}` : '',
    kit.sourceName ? `- **Fuente:** ${kit.sourceName} (${kit.sourceDateAr || formatDateAr(kit.publishedAt)})` : '',
    '',
    placasMd,
    '',
    '#### Epígrafe listo para copiar en Instagram',
    '```text',
    kit.epigrafe,
    '```',
    '',
    '#### Historia + Enlace UTM',
    '```text',
    `${kit.historia?.texto || ''}\n\nSticker ("${kit.historia?.stickerTexto || 'Leer más'}"):\n${kit.historia?.url || kit.articleUrl}`,
    '```',
    '',
    `**Texto alternativo:** ${kit.altText}`,
  ].filter(Boolean).join('\n');
}

async function main() {
  console.log('\n🚀 Agente Semanal de Marketing y Contenidos · ABM Estudio Contable');
  console.log('==================================================================');

  await mkdir(campanasDir, { recursive: true });
  const now = new Date();
  const weekDate = getWeekMondayDate(now);
  const campanaFile = resolve(campanasDir, `semana-${weekDate}.md`);

  const { count, kits } = await syncInstagramKits({ limit: 12, aiRefreshLimit: 3, now });
  const pillars = selectWeeklyPillarKits(kits);

  console.log(`📅 Campaña para la semana: ${weekDate}`);
  console.log(`📸 Kits de noticias procesados: ${count}`);

  const documentContent = [
    '# Campaña Semanal de Marketing y Contenidos · ABM Estudio Contable',
    `**Semana del:** ${weekDate}  `,
    `**Generado automáticamente en la nube:** ${now.toISOString()}  `,
    `**Canales de destino:** Instagram (${ABM_INSTAGRAM_HANDLE}) y Novedades de la Web  `,
    `**Contacto oficial:** WhatsApp: ${phoneDisplay} | Email: ${email} | Web: ${ABM_SITE_ORIGIN}`,
    '',
    '> **Archivo rápido diario:** También encontrás los últimos carruseles generados por cada noticia nueva en `marketing/instagram/PARA_COPIAR.md` y en el panel `/editor-noticias` (pestaña **Instagram · Para copiar**).',
    '',
    '---',
    '',
    '## 📢 Tres Publicaciones de la Semana (Basadas en Novedades Reales)',
    '',
    formatPillarSection('1. Monotributistas y Profesionales', pillars.monotributo),
    '',
    '---',
    '',
    formatPillarSection('2. PyMEs, Sueldos e Impuestos', pillars.pymes),
    '',
    '---',
    '',
    formatPillarSection('3. Sociedades y Actualidad Normativa', pillars.sociedades),
    '',
    '---',
    '',
    '## ✅ Checklist rápido antes de publicar en Instagram',
    '1. **Canva (1080 × 1350):** Duplicá el modelo oficial de ABM, pegá las 5 placas y verificá lectura en pantalla de celular (signos `¿` y `¡` visibles, sin texto cortado).',
    '2. **Epígrafe:** Copiá el bloque completo tal cual (no incluye enlaces rotos; usa el enlace de la biografía o DM/WhatsApp).',
    '3. **Historia de apoyo:** Publicá la Story el mismo día con el sticker de enlace UTM apuntando a la nota web.',
    '4. **Seguimiento comercial:** Registrá consultas entrantes en `marketing/seguimiento.csv`.',
    '',
  ].join('\n');

  await writeFile(campanaFile, documentContent, 'utf8');
  console.log(`\n✅ Campaña semanal actualizada en:\n📁 ${campanaFile}\n`);
}

main().catch(err => {
  console.error('\n❌ Error al generar la campaña:', err.message);
  process.exit(1);
});
