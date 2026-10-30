/**
 * =====================================================================
 * ABM ESTUDIO CONTABLE · SCRIPT PARA GMAIL (GOOGLE APPS SCRIPT)
 * =====================================================================
 * Este script se puede usar de dos formas:
 * 
 * OPCIÓN 1: Vincular con un Google Sheet
 *   1. Creá un Google Sheet e importá 'outreach/contactos_para_gmail_sheets.csv'.
 *   2. En el menú superior: Extensiones > Apps Script.
 *   3. Pegá este código y guardá.
 *   4. Ejecutá la función 'crearBorradoresDesdeSheet' o 'enviarDirectoDesdeSheet'.
 * 
 * OPCIÓN 2: Usar directo desde script.google.com (con ChatGPT)
 *   Si ya tienen un Apps Script con ChatGPT / Gmail, pueden usar las funciones
 *   de abajo para crear borradores o enviar correos con pausas anti-spam.
 */

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
}

// =====================================================================
// 2. ENVIAR CORREOS REALES DIRECTO DESDE GMAIL (Con control de cadencia)
// =====================================================================
function enviarDirectoDesdeSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Límite diario para proteger la cuenta de Gmail (máximo 15 o 20 por tanda)
  const LIMITE_POR_TANDA = 10;
  const SEGUNDOS_ENTRE_MAILS = 12;

  let enviados = 0;

  for (let i = 1; i < data.length; i++) {
    if (enviados >= LIMITE_POR_TANDA) {
      Logger.log('⏹️ Se alcanzó el límite de ' + LIMITE_POR_TANDA + ' correos por tanda. Ejecutá de nuevo mañana.');
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
}
