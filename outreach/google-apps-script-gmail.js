/* exported onOpen, crearBorradoresDesdeSheet, enviarDirectoDesdeSheet, activarEnvioAutomaticoDiario, desactivarEnvioAutomatico, verEstadoCampana */
/**
 * =====================================================================
 * ABM ESTUDIO CONTABLE · SCRIPT PARA GMAIL (GOOGLE APPS SCRIPT)
 * =====================================================================
 * Este script se ejecuta 100% en la nube de Google, SIN necesidad
 * de tener la computadora encendida.
 * 
 * CÓMO USAR EN 3 PASOS:
 * 1. Abrí Google Drive (drive.google.com) y creá una Hoja de Cálculo (Google Sheets).
 * 2. Menú Archivo > Importar > Subir > seleccioná 'outreach/contactos_para_gmail_sheets.csv'.
 * 3. En el menú superior: Extensiones > Apps Script. Borrá lo que haya, pegá este código completo y guardá (Ctrl + S).
 * 
 * ¡Listo! Al recargar la hoja aparecerá el menú "📮 ABM Marketing" arriba.
 * Desde allí podés activar el envío automático diario en la nube con un clic.
 */

// =====================================================================
// MENÚ SUPERIOR PERSONALIZADO EN GOOGLE SHEETS
// =====================================================================
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('📮 ABM Marketing')
      .addItem('👁️ Crear borradores en Gmail', 'crearBorradoresDesdeSheet')
      .addItem('🚀 Enviar tanda manual (10 correos)', 'enviarDirectoDesdeSheet')
      .addSeparator()
      .addItem('⏰ Activar envío automático diario (Sin PC prendida)', 'activarEnvioAutomaticoDiario')
      .addItem('⏹️ Pausar / Desactivar envío automático', 'desactivarEnvioAutomatico')
      .addSeparator()
      .addItem('📊 Ver estado de la campaña', 'verEstadoCampana')
      .addToUi();
  } catch (uiErr) {
    Logger.log('Nota: ejecutado sin interfaz de usuario (' + uiErr.message + ')');
  }
}

// =====================================================================
// 1. CREAR BORRADORES EN GMAIL (Recomendado para revisar antes de enviar)
// =====================================================================
function crearBorradoresDesdeSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Headers esperados: [0:ID, 1:Empresa, 2:Barrio, 3:Rubro, 4:Email, 5:Web, 6:Asunto, 7:Texto, 8:HTML, 9:Estado]
  let creados = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const email = row[4];
    const asunto = row[6];
    const cuerpoHtml = row[8];
    const cuerpoTexto = row[7];
    const estado = row[9];

    // Solo procesar los que no fueron creados o enviados
    if (email && estado !== 'BORRADOR_CREADO' && estado !== 'ENVIADO') {
      GmailApp.createDraft(email, asunto, cuerpoTexto, {
        htmlBody: cuerpoHtml
      });
      
      sheet.getRange(i + 1, 10).setValue('BORRADOR_CREADO');
      sheet.getRange(i + 1, 11).setValue(new Date().toISOString());
      creados++;
    }
  }

  Logger.log('✅ Se crearon ' + creados + ' borradores en tu Gmail.');
  try {
    SpreadsheetApp.getUi().alert('Borradores creados', 'Se crearon ' + creados + ' borradores en tu bandeja de Gmail para revisar.', SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (uiErr) {
    Logger.log('Aviso UI: ' + uiErr.message);
  }
}

// =====================================================================
// 2. ENVIAR CORREOS REALES DIRECTO DESDE GMAIL (Con control de cadencia)
// =====================================================================
function enviarDirectoDesdeSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Límite diario para proteger la cuenta de Gmail (máximo 10 o 15 por tanda)
  const LIMITE_POR_TANDA = 10;
  const SEGUNDOS_ENTRE_MAILS = 12;

  let enviados = 0;

  for (let i = 1; i < data.length; i++) {
    if (enviados >= LIMITE_POR_TANDA) {
      Logger.log('⏹️ Se alcanzó el límite de ' + LIMITE_POR_TANDA + ' correos por tanda. Continúa en la próxima ejecución.');
      break;
    }

    const row = data[i];
    const empresa = row[1];
    const email = row[4];
    const asunto = row[6];
    const cuerpoHtml = row[8];
    const cuerpoTexto = row[7];
    const estado = row[9];

    if (email && estado !== 'ENVIADO') {
      Logger.log('Enviando correo [' + (enviados + 1) + '] a ' + empresa + ' (' + email + ')...');
      
      try {
        GmailApp.sendEmail(email, asunto, cuerpoTexto, {
          htmlBody: cuerpoHtml,
          name: 'Alejandra Mayta · ABM Estudio Contable'
        });

        sheet.getRange(i + 1, 10).setValue('ENVIADO');
        sheet.getRange(i + 1, 11).setValue(new Date().toISOString());
        enviados++;

        // Pausa anti-spam
        Utilities.sleep(SEGUNDOS_ENTRE_MAILS * 1000);
      } catch (err) {
        Logger.log('❌ Error enviando a ' + email + ': ' + err.message);
        sheet.getRange(i + 1, 10).setValue('ERROR: ' + err.message);
      }
    }
  }

  Logger.log('🎉 Tanda finalizada. Correos enviados: ' + enviados);
  try {
    SpreadsheetApp.getUi().alert('Tanda de envíos completada', 'Se enviaron ' + enviados + ' correos con éxito.', SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (uiErr) {
    Logger.log('Aviso UI: ' + uiErr.message);
  }
}

// =====================================================================
// 3. ACTIVAR ENVÍO AUTOMÁTICO DIARIO (EN LA NUBE DE GOOGLE)
// =====================================================================
function activarEnvioAutomaticoDiario() {
  desactivarEnvioAutomatico(); // Limpia activadores previos de esta función

  ScriptApp.newTrigger('enviarDirectoDesdeSheet')
    .timeBased()
    .everyDays(1)
    .atHour(10) // Entre 10:00 y 11:00 AM hora de Argentina
    .create();

  const msg = '✅ Envío automático diario activado con éxito en la nube de Google.\n\nTodos los días hábiles a las 10:00 AM se enviará una tanda segura de 10 correos.\n\nLa PC puede estar completamente APAGADA, ya que el proceso corre en los servidores de Google.';
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert('Automatización Activada', msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (uiErr) {
    Logger.log('Aviso UI: ' + uiErr.message);
  }
}

// =====================================================================
// 4. DESACTIVAR ENVÍO AUTOMÁTICO
// =====================================================================
function desactivarEnvioAutomatico() {
  const triggers = ScriptApp.getProjectTriggers();
  let eliminados = 0;
  for (let i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'enviarDirectoDesdeSheet') {
      ScriptApp.deleteTrigger(triggers[i]);
      eliminados++;
    }
  }
  const msg = '⏹️ Se desactivaron ' + eliminados + ' activadores automáticos.';
  Logger.log(msg);
  try {
    SpreadsheetApp.getUi().alert('Automatización Desactivada', msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (uiErr) {
    Logger.log('Aviso UI: ' + uiErr.message);
  }
}

// =====================================================================
// 5. VER ESTADO DE LA CAMPAÑA
// =====================================================================
function verEstadoCampana() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const total = data.length - 1;
  let enviados = 0;
  let borradores = 0;
  let pendientes = 0;
  let errores = 0;

  for (let i = 1; i < data.length; i++) {
    const estado = String(data[i][9] || '').trim();
    if (estado === 'ENVIADO') enviados++;
    else if (estado === 'BORRADOR_CREADO') borradores++;
    else if (estado.startsWith('ERROR')) errores++;
    else pendientes++;
  }

  const resumen = '📊 ESTADO DE LA CAMPAÑA · ABM ESTUDIO CONTABLE\n\n' +
    'Total contactos en planilla: ' + total + '\n' +
    '✅ Enviados: ' + enviados + '\n' +
    '👁️ Borradores en Gmail: ' + borradores + '\n' +
    '⏳ Pendientes: ' + pendientes + '\n' +
    '⚠️ Errores registrados: ' + errores;

  Logger.log(resumen);
  try {
    SpreadsheetApp.getUi().alert('Estado de la Campaña', resumen, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (uiErr) {
    Logger.log('Aviso UI: ' + uiErr.message);
  }
}
