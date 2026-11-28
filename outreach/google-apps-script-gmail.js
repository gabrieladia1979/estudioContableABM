/* exported onOpen, crearBorradoresDesdeSheet, enviarDirectoDesdeSheet, activarEnvioAutomaticoDiario, procesarCampanaABM, desactivarEnvioAutomatico, verEstadoCampana */
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
 * Al recargar la hoja aparecerá el menú "📮 ABM Marketing". Este archivo
 * prepara borradores; no habilita envíos automáticos.
 */

// =====================================================================
// MENÚ SUPERIOR PERSONALIZADO EN GOOGLE SHEETS
// =====================================================================
function onOpen() {
  try {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('📮 ABM Marketing')
      .addItem('👁️ Crear borradores en Gmail', 'crearBorradoresDesdeSheet')
      .addItem('⏹️ Desactivar activadores de envío', 'desactivarEnvioAutomatico')
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
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) throw new Error('Ya hay otra ejecución preparando borradores.');
  let creados = 0;
  let invalidos = 0;
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const expected = ['ID', 'Empresa', 'Barrio', 'Rubro', 'Email', 'Web', 'Asunto', 'Cuerpo_Texto_Plano', 'Cuerpo_HTML'];
    const headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 9)).getValues()[0];
    if (expected.some((name, i) => String(headers[i] || '').trim() !== name)) {
      throw new Error('La hoja no tiene las primeras nueve columnas del CSV de ABM en el orden esperado.');
    }
    const tracking = ['Estado', 'Fecha', 'Draft_ID'];
    if (tracking.some((name, i) => headers[i + 9] && headers[i + 9] !== name)) {
      throw new Error('Las columnas 10 a 12 deben llamarse Estado, Fecha y Draft_ID.');
    }
    sheet.getRange(1, 10, 1, 3).setValues([tracking]);
    const data = sheet.getDataRange().getValues();

    for (let i = 1; i < data.length && creados < 10; i++) {
      const row = data[i];
      if (String(row[9] || '').trim() !== 'APROBADO_BORRADOR') continue;
      const email = String(row[4] || '').trim();
      const asunto = String(row[6] || '').trim();
      const cuerpoTexto = String(row[7] || '').trim();
      const cuerpoHtml = String(row[8] || '').trim();
      const fila = i + 1;
      if (row[11]) {
        sheet.getRange(fila, 10).setValue('REVISAR_BORRADOR');
        continue;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !asunto || !cuerpoTexto || !cuerpoHtml) {
        sheet.getRange(fila, 10).setValue('ERROR_VALIDACION');
        invalidos++;
        continue;
      }
      // Se reserva la fila antes de llamar a Gmail: un error no vuelve a crearla solo.
      sheet.getRange(fila, 10).setValue('CREANDO_BORRADOR');
      SpreadsheetApp.flush();
      try {
        const draft = GmailApp.createDraft(email, asunto, cuerpoTexto, { htmlBody: cuerpoHtml });
        sheet.getRange(fila, 12).setValue(draft.getId());
        sheet.getRange(fila, 11).setValue(new Date().toISOString());
        sheet.getRange(fila, 10).setValue('BORRADOR_CREADO');
        creados++;
      } catch (err) {
        sheet.getRange(fila, 10).setValue('REVISAR_BORRADOR');
        Logger.log('Fila ' + fila + ': ' + err.message);
      }
    }
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
  Logger.log('Borradores creados: ' + creados + '. Filas inválidas: ' + invalidos + '.');
  try {
    SpreadsheetApp.getUi().alert('Borradores', 'Creados: ' + creados + '. Filas inválidas: ' + invalidos + '. Revisá las filas marcadas REVISAR_BORRADOR antes de reintentar.', SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (uiErr) {
    Logger.log('Aviso UI: ' + uiErr.message);
  }
}

// =====================================================================
// 2. ENVÍO DESHABILITADO
// =====================================================================
function enviarDirectoDesdeSheet() {
  throw new Error('Envío deshabilitado. Revisá cada borrador y destinatario antes de cualquier autorización de envío.');
}
// =====================================================================
// 3. ACTIVACIÓN AUTOMÁTICA DESHABILITADA
// =====================================================================
function activarEnvioAutomaticoDiario() {
  throw new Error('Activación automática deshabilitada para esta campaña.');
}

// Compatibilidad con el activador mencionado en los avisos de Google.
function procesarCampanaABM() {
  desactivarEnvioAutomatico();
  Logger.log('Campaña detenida: activadores de envío eliminados.');
}
// =====================================================================
// 4. DESACTIVAR ENVÍO AUTOMÁTICO
// =====================================================================
function desactivarEnvioAutomatico() {
  const triggers = ScriptApp.getProjectTriggers();
  let eliminados = 0;
  for (let i = 0; i < triggers.length; i++) {
    if (['enviarDirectoDesdeSheet', 'procesarCampanaABM'].includes(triggers[i].getHandlerFunction())) {
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
  let aprobados = 0;
  let revisar = 0;

  for (let i = 1; i < data.length; i++) {
    const estado = String(data[i][9] || '').trim();
    if (estado === 'ENVIADO') enviados++;
    else if (estado === 'BORRADOR_CREADO') borradores++;
    else if (estado === 'APROBADO_BORRADOR') aprobados++;
    else if (estado === 'REVISAR_BORRADOR' || estado === 'CREANDO_BORRADOR') revisar++;
    else if (estado.startsWith('ERROR')) errores++;
    else pendientes++;
  }

  const resumen = '📊 ESTADO DE LA CAMPAÑA · ABM ESTUDIO CONTABLE\n\n' +
    'Total contactos en planilla: ' + total + '\n' +
    '✅ Enviados: ' + enviados + '\n' +
    '👁️ Borradores en Gmail: ' + borradores + '\n' +
    'Aprobados para borrador: ' + aprobados + '\n' +
    'Requieren revisión: ' + revisar + '\n' +
    '⏳ Pendientes: ' + pendientes + '\n' +
    '⚠️ Errores registrados: ' + errores;

  Logger.log(resumen);
  try {
    SpreadsheetApp.getUi().alert('Estado de la Campaña', resumen, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (uiErr) {
    Logger.log('Aviso UI: ' + uiErr.message);
  }
}
