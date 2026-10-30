import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const filePath = resolve('outreach/prospects.json');

async function loadProspects() {
  try {
    const text = await readFile(filePath, 'utf8');
    return JSON.parse(text);
  } catch {
    return [];
  }
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'list';
  const prospects = await loadProspects();

  if (command === 'list') {
    const barrioArg = args.find(a => a.startsWith('--barrio='))?.split('=')[1]?.toLowerCase();
    const statusArg = args.find(a => a.startsWith('--status='))?.split('=')[1]?.toLowerCase();

    let filtered = prospects;
    if (barrioArg) {
      filtered = filtered.filter(p => p.barrio.toLowerCase().includes(barrioArg));
    }
    if (statusArg) {
      filtered = filtered.filter(p => p.estado.toLowerCase() === statusArg);
    }

    console.log(`\n📋 Prospectos encontrados: ${filtered.length} (Total en base: ${prospects.length})`);
    if (barrioArg) console.log(`📍 Filtrado por barrio: "${barrioArg}"`);
    if (statusArg) console.log(`📌 Filtrado por estado: "${statusArg}"`);
    console.log('---------------------------------------------------------------------------------------------------------');
    console.log(`| ${'ID'.padEnd(7)} | ${'Empresa'.padEnd(26)} | ${'Barrio'.padEnd(17)} | ${'Rubro'.padEnd(25)} | ${'Estado'.padEnd(9)} |`);
    console.log('---------------------------------------------------------------------------------------------------------');

    for (const p of filtered.slice(0, 30)) {
      console.log(`| ${p.id.padEnd(7)} | ${p.empresa.slice(0, 26).padEnd(26)} | ${p.barrio.slice(0, 17).padEnd(17)} | ${p.rubro.slice(0, 25).padEnd(25)} | ${p.estado.padEnd(9)} |`);
    }

    if (filtered.length > 30) {
      console.log(`... y ${filtered.length - 30} prospectos más.`);
    }

    console.log('\n💡 Comandos disponibles:');
    console.log('  node scripts/outreach-search.mjs list --barrio=boedo');
    console.log('  node scripts/outreach-search.mjs list --barrio="parque patricios"');
    console.log('  node scripts/outreach-search.mjs stats');
    console.log('  node scripts/outreach-send.mjs --preview');
    console.log('  node scripts/outreach-send.mjs --send --limit=5\n');
  } else if (command === 'stats') {
    console.log('\n📊 Estadísticas de Prospección Local:');
    console.log(`Total de empresas cargadas: ${prospects.length}`);

    const barrios = prospects.reduce((acc, p) => { acc[p.barrio] = (acc[p.barrio] || 0) + 1; return acc; }, {});
    console.log('\nPor barrio:');
    for (const [b, count] of Object.entries(barrios)) {
      console.log(`  - ${b}: ${count} empresas`);
    }

    const estados = prospects.reduce((acc, p) => { acc[p.estado] = (acc[p.estado] || 0) + 1; return acc; }, {});
    console.log('\nPor estado de campaña:');
    for (const [e, count] of Object.entries(estados)) {
      console.log(`  - ${e}: ${count} empresas`);
    }
    console.log('');
  } else if (command === 'add') {
    // Ejemplo: node scripts/outreach-search.mjs add "Nombre Empresa" "Boedo" "imprenta" "info@empresa.com.ar" "https://web.com"
    const [, empresa, barrio, rubro, email, web] = args;
    if (!empresa || !barrio || !email) {
      console.error('Uso: node scripts/outreach-search.mjs add "<empresa>" "<barrio>" "<rubro>" "<email>" ["<web>"]');
      process.exit(1);
    }
    const exists = prospects.some(p => p.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      console.log(`⚠️ Ya existe un prospecto con el correo ${email}`);
      return;
    }
    const newId = `ABM-${prospects.length + 1}`.padStart(7, '0');
    prospects.push({
      id: newId,
      empresa,
      barrio,
      rubro: rubro || 'comercio local',
      email: email.toLowerCase().trim(),
      web: web || '',
      angulo: 'asesoramiento_general',
      estado: 'pendiente',
      fecha_agregado: new Date().toISOString().slice(0, 10),
      ultimo_envio: null
    });
    await writeFile(filePath, JSON.stringify(prospects, null, 2), 'utf8');
    console.log(`✅ Prospecto agregado: [${newId}] ${empresa} (${barrio}) - ${email}`);
  }
}

main().catch(console.error);
