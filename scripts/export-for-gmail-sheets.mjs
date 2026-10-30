import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildEmail } from './outreach-generator.mjs';

async function main() {
  const prospects = JSON.parse(await readFile(resolve('outreach/prospects.json'), 'utf8'));

  // CSV con comillas escapadas para importar directo a Google Sheets
  const rows = [
    ['ID', 'Empresa', 'Barrio', 'Rubro', 'Email', 'Web', 'Asunto', 'Cuerpo_Texto_Plano', 'Cuerpo_HTML']
  ];

  for (const p of prospects) {
    const { subject, html, text } = buildEmail(p);
    rows.push([
      p.id,
      p.empresa,
      p.barrio,
      p.rubro,
      p.email,
      p.web,
      subject,
      text.replace(/"/g, '""'),
      html.replace(/"/g, '""')
    ]);
  }

  const csvContent = rows.map(r => r.map(col => `"${col}"`).join(',')).join('\n');
  const outPath = resolve('outreach/contactos_para_gmail_sheets.csv');
  await writeFile(outPath, csvContent, 'utf8');

  console.log(`✅ Archivo exportado para Google Sheets / Gmail: ${outPath}`);
  console.log(`Total de filas: ${rows.length - 1}`);
}

main().catch(console.error);
