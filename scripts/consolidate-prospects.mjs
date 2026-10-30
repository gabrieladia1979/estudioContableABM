import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Prospectos base existentes
const csv1Path = resolve('outreach/prospectos_locales_2026-10-26.csv');
const csv2Path = resolve('outreach/prospectos_locales_ampliacion_2026-10-26.csv');

function parseCsv(text) {
  const lines = text.trim().split('\n').filter(Boolean);
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = values[i] || ''; });
    return obj;
  });
}

function assignAngle(rubro) {
  const r = (rubro || '').toLowerCase();
  if (r.includes('tecnolog') || r.includes('software') || r.includes('digital')) {
    return 'distrito_tech'; // Beneficios impositivos distrito tecnológico y facturación de servicios
  }
  if (r.includes('fabrica') || r.includes('industr') || r.includes('grafic') || r.includes('metal') || r.includes('uniform') || r.includes('taller')) {
    return 'sueldos_laboral'; // Liquidación de sueldos, cargas sociales F.931 y convenios
  }
  if (r.includes('mayorista') || r.includes('distribuid') || r.includes('logistica') || r.includes('flete') || r.includes('transporte') || r.includes('rodamient') || r.includes('maquinar')) {
    return 'ingresos_brutos_iva'; // Convenio Multilateral, percepciones/retenciones AGIP y balances
  }
  return 'asesoramiento_general'; // Planificación fiscal, monotributo/sociedades y cierres
}

async function main() {
  const t1 = await readFile(csv1Path, 'utf8');
  const t2 = await readFile(csv2Path, 'utf8');
  const allRows = [...parseCsv(t1), ...parseCsv(t2)];

  // Agregar nuevos prospectos encontrados en Boedo y Parque Patricios
  const additional = [
    { empresa: 'Extra Power S.A.', barrio: 'Parque Patricios', rubro: 'distribuidora e importacion de ferreteria', email_publico: 'ventas@extrapowersa.com.ar', fuente: 'https://extrapowersa.com.ar/', estado: 'pendiente de revision', fecha_verificacion: '2026-10-30' },
    { empresa: 'Antonio Baccarelli S.R.L.', barrio: 'Parque Patricios', rubro: 'servicios informaticos y software', email_publico: 'info@antoniobaccarelli.com.ar', fuente: 'https://antoniobaccarelli.com.ar/', estado: 'pendiente de revision', fecha_verificacion: '2026-10-30' },
    { empresa: 'Eventos Globales', barrio: 'Parque Patricios', rubro: 'materiales para la construccion e iluminacion', email_publico: 'ventas@eventosglobales.com.ar', fuente: 'https://eventosglobales.com.ar/', estado: 'pendiente de revision', fecha_verificacion: '2026-10-30' },
    { empresa: 'Neuhaus S.A.', barrio: 'Boedo', rubro: 'industria grafica y etiquetas', email_publico: 'info@neuhaus.com.ar', fuente: 'https://neuhaus.com.ar/', estado: 'pendiente de revision', fecha_verificacion: '2026-10-30' },
    { empresa: 'ES Servicios', barrio: 'Boedo', rubro: 'mantenimiento y maestranza para empresas', email_publico: 'info@es-servicios.com.ar', fuente: 'https://es-servicios.com.ar/', estado: 'pendiente de revision', fecha_verificacion: '2026-10-30' },
    { empresa: 'Boedo Estudio', barrio: 'Boedo', rubro: 'consultoria y servicios profesionales', email_publico: 'info@boedoestudio.com', fuente: 'https://boedoestudio.com/', estado: 'pendiente de revision', fecha_verificacion: '2026-10-30' }
  ];

  const seen = new Set();
  const prospects = [];

  for (const item of [...allRows, ...additional]) {
    const email = (item.email_publico || '').trim().toLowerCase();
    if (!email || seen.has(email)) continue;
    seen.add(email);

    prospects.push({
      id: `ABM-${prospects.length + 1}`.padStart(7, '0'),
      empresa: item.empresa,
      barrio: item.barrio,
      rubro: item.rubro,
      email,
      web: item.fuente,
      angulo: assignAngle(item.rubro),
      estado: 'pendiente',
      fecha_agregado: item.fecha_verificacion || '2026-10-30',
      ultimo_envio: null
    });
  }

  const outPath = resolve('outreach/prospects.json');
  await writeFile(outPath, JSON.stringify(prospects, null, 2), 'utf8');
  console.log(`✅ Base unificada con ${prospects.length} prospectos locales guardada en ${outPath}`);

  // Contadores por barrio
  const barrios = prospects.reduce((acc, p) => { acc[p.barrio] = (acc[p.barrio] || 0) + 1; return acc; }, {});
  console.log('Distribución por barrio:', barrios);
}

main().catch(console.error);
