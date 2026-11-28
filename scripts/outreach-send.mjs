import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { buildEmail } from './outreach-generator.mjs';

const prospectsPath = resolve('outreach/prospects.json');
const previewsDir = resolve('outreach/previews');

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--send') || process.env.OUTREACH_MODE === 'send') {
    throw new Error('Envío deshabilitado: esta campaña solo permite vista previa.');
  }
  if (process.env.OUTREACH_MODE && process.env.OUTREACH_MODE !== 'preview') {
    throw new Error('OUTREACH_MODE debe ser preview.');
  }

  const limitArg = args.find(a => a.startsWith('--limit='))?.slice(8) || process.env.OUTREACH_LIMIT;
  const limit = Math.max(1, Math.min(50, Number(limitArg) || 5));
  const barrioArg = (args.find(a => a.startsWith('--barrio='))?.slice(9) || process.env.OUTREACH_BARRIO || '').toLowerCase();
  const idArg = (args.find(a => a.startsWith('--id='))?.slice(5) || process.env.OUTREACH_ID || '').toUpperCase();

  const prospects = JSON.parse(await readFile(prospectsPath, 'utf8'));
  let queue = prospects.filter(p => p.estado === 'pendiente');
  if (barrioArg) queue = queue.filter(p => String(p.barrio || '').toLowerCase().includes(barrioArg));
  if (idArg) queue = queue.filter(p => p.id === idArg);
  const selected = queue.slice(0, limit);

  console.log(`Vista previa de outreach: ${selected.length} de ${queue.length} prospectos pendientes.`);
  if (!selected.length) return;

  await mkdir(previewsDir, { recursive: true });
  for (const p of selected) {
    const { subject, html, text } = buildEmail(p);
    const safeName = String(p.empresa || '').replace(/[^a-zA-Z0-9_-]/g, '_');
    const base = resolve(previewsDir, `${p.id}_${safeName}`);
    await writeFile(`${base}.html`, html, 'utf8');
    await writeFile(`${base}.txt`, text, 'utf8');
    console.log(`${p.id} · ${p.empresa} · ${subject} · ${base}.html`);
  }
  console.log('Vistas previas listas. No se enviaron correos ni se cambiaron estados.');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exitCode = 1;
});
