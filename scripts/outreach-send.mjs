import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import nodemailer from 'nodemailer';
import { buildEmail } from './outreach-generator.mjs';

const prospectsPath = resolve('outreach/prospects.json');
const logPath = resolve('outreach/campaign-log.json');
const previewsDir = resolve('outreach/previews');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function loadJson(path, fallback = []) {
  try {
    const text = await readFile(path, 'utf8');
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

async function saveJson(path, data) {
  await writeFile(path, JSON.stringify(data, null, 2), 'utf8');
}

async function main() {
  const args = process.argv.slice(2);
  const isSend = args.includes('--send');
  const isPreview = args.includes('--preview') || !isSend;
  
  const limitArg = args.find(a => a.startsWith('--limit='))?.split('=')[1];
  const limit = Math.max(1, Math.min(50, Number(limitArg) || 5));

  const delayArg = args.find(a => a.startsWith('--delay='))?.split('=')[1];
  const delaySec = Math.max(1, Number(delayArg) || 12);

  const barrioArg = args.find(a => a.startsWith('--barrio='))?.split('=')[1]?.toLowerCase();
  const idArg = args.find(a => a.startsWith('--id='))?.split('=')[1]?.toUpperCase();

  const prospects = await loadJson(prospectsPath, []);
  if (!prospects.length) {
    console.error('❌ No se encontraron prospectos en outreach/prospects.json');
    process.exit(1);
  }

  // Filtrar prospectos pendientes
  let queue = prospects.filter(p => p.estado === 'pendiente');
  if (barrioArg) queue = queue.filter(p => p.barrio.toLowerCase().includes(barrioArg));
  if (idArg) queue = queue.filter(p => p.id === idArg);

  const selected = queue.slice(0, limit);

  console.log('\n📬 Motor de Automatización de Correos · ABM Estudio Contable');
  console.log('===========================================================');
  console.log(`Modo: ${isSend ? '🚀 ENVÍO REAL' : '👁️ VISTA PREVIA (SIMULACIÓN)'}`);
  console.log(`Prospectos en cola pendientes: ${queue.length} (procesando ${selected.length})`);
  if (barrioArg) console.log(`Segmento por barrio: "${barrioArg}"`);
  console.log('-----------------------------------------------------------\n');

  if (!selected.length) {
    console.log('✅ No hay prospectos pendientes para los criterios seleccionados.');
    console.log('Podés ver estadísticas con: npm run outreach:search -- stats\n');
    return;
  }

  // MODO PREVIEW
  if (isPreview && !isSend) {
    await mkdir(previewsDir, { recursive: true });
    console.log(`Generando ${selected.length} borradores en ${previewsDir}...\n`);

    for (let i = 0; i < selected.length; i++) {
      const p = selected[i];
      const { subject, html, text } = buildEmail(p);
      const safeName = p.empresa.replace(/[^a-zA-Z0-9_-]/g, '_');
      const htmlFile = resolve(previewsDir, `${p.id}_${safeName}.html`);
      const txtFile = resolve(previewsDir, `${p.id}_${safeName}.txt`);

      await writeFile(htmlFile, html, 'utf8');
      await writeFile(txtFile, text, 'utf8');

      console.log(`[${i + 1}/${selected.length}] ${p.id} · ${p.empresa} (${p.barrio})`);
      console.log(`  📧 Para: ${p.email}`);
      console.log(`  📌 Asunto: ${subject}`);
      console.log(`  📁 HTML: ${htmlFile}`);
      console.log('-----------------------------------------------------------');
    }

    console.log('\n💡 Para enviar realmente estos correos:');
    console.log('  1. Configurá tu remitente SMTP en .env.local (o variables de entorno):');
    console.log('     SMTP_HOST=smtp.gmail.com');
    console.log('     SMTP_PORT=465');
    console.log('     SMTP_USER=tu_correo@gmail.com');
    console.log('     SMTP_PASS=tu_contraseña_de_aplicacion_gmail');
    console.log('     SMTP_FROM="Alejandra Mayta · ABM Estudio Contable <tu_correo@gmail.com>"');
    console.log('\n  2. Ejecutá el envío controlado (ejemplo 3 correos con 15s de espera):');
    console.log('     node scripts/outreach-send.mjs --send --limit=3 --delay=15');
    if (barrioArg) {
      console.log(`     node scripts/outreach-send.mjs --send --barrio="${barrioArg}" --limit=3`);
    }
    console.log('');
    return;
  }

  // MODO ENVÍO REAL
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number(process.env.SMTP_PORT) || 465;
  const smtpFrom = process.env.SMTP_FROM || `"Alejandra Mayta · ABM Estudio Contable" <${smtpUser}>`;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error('❌ Falta configurar las variables SMTP para enviar correos reales.');
    console.error('Configurá en .env.local o en la terminal:');
    console.error('  SMTP_HOST=smtp.gmail.com');
    console.error('  SMTP_PORT=465');
    console.error('  SMTP_USER=tu_correo@gmail.com');
    console.error('  SMTP_PASS=tu_contraseña_de_aplicacion');
    console.error('  SMTP_FROM="Alejandra Mayta · ABM Estudio Contable <tu_correo@gmail.com>"');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass }
  });

  console.log('🔌 Verificando conexión con el servidor SMTP...');
  await transporter.verify();
  console.log('✅ Conexión SMTP verificada exitosamente.\n');

  const logs = await loadJson(logPath, []);

  for (let i = 0; i < selected.length; i++) {
    const p = selected[i];
    const { subject, html, text } = buildEmail(p);
    console.log(`[${i + 1}/${selected.length}] Enviando a ${p.empresa} (${p.email})...`);

    try {
      const info = await transporter.sendMail({
        from: smtpFrom,
        to: p.email,
        replyTo: process.env.REPLY_TO || 'contacto@estudiocontableabm.com.ar',
        subject,
        text,
        html,
      });

      console.log(`  ✅ Enviado OK! ID: ${info.messageId}`);
      p.estado = 'enviado';
      p.ultimo_envio = new Date().toISOString();

      logs.push({
        id: p.id,
        empresa: p.empresa,
        email: p.email,
        barrio: p.barrio,
        subject,
        sentAt: p.ultimo_envio,
        status: 'ok',
        messageId: info.messageId
      });
    } catch (err) {
      console.error(`  ❌ Error al enviar a ${p.email}: ${err.message}`);
      p.estado = 'error';
      p.error_envio = err.message;

      logs.push({
        id: p.id,
        empresa: p.empresa,
        email: p.email,
        barrio: p.barrio,
        subject,
        sentAt: new Date().toISOString(),
        status: 'error',
        error: err.message
      });
    }

    // Guardar estado tras cada envío
    await saveJson(prospectsPath, prospects);
    await saveJson(logPath, logs);

    if (i < selected.length - 1) {
      console.log(`⏳ Esperando ${delaySec} segundos antes del próximo envío (control anti-spam)...`);
      await sleep(delaySec * 1000);
    }
  }

  console.log('\n🎉 Tanda de envío completada.');
  console.log(`Registro guardado en ${logPath}`);
}

main().catch(err => {
  console.error('\n❌ Error inesperado:', err.message);
  process.exit(1);
});
