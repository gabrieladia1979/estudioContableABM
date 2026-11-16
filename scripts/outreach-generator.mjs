import { email, phoneDisplay, phoneHref, whatsappLink } from '../src/data/contact.js';

const escapeHtml = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

export function buildEmail(prospect) {
  const { empresa, barrio, rubro, angulo } = prospect;

  let angleParagraph = '';
  switch (angulo) {
    case 'sueldos_laboral':
      angleParagraph = `Si su actividad de ${rubro} requiere apoyo en sueldos y cargas sociales, podemos conversar sobre las tareas y el alcance del acompañamiento que necesitan.`;
      break;
    case 'ingresos_brutos_iva':
      angleParagraph = `Para una actividad de ${rubro}, podemos conversar sobre la organización de la información contable y las obligaciones impositivas que correspondan según su situación.`;
      break;
    case 'distrito_tech':
      angleParagraph = `Si su actividad de ${rubro} necesita orientación sobre facturación, organización contable o su estructura de funcionamiento, podemos revisar qué acompañamiento corresponde al proyecto.`;
      break;
    default:
      angleParagraph = `Ofrecemos asesoramiento contable e impositivo para negocios de ${rubro}. Podemos conversar sobre qué tareas necesitan ordenar o delegar y definir el alcance del servicio.`;
  }

  const subject = `Servicios contables e impositivos para ${empresa} · ABM Estudio Contable`;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #102a43; margin: 0; padding: 20px; background-color: #f7f9fc; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #d9e2ec; padding: 32px; box-shadow: 0 4px 6px rgba(0,0,0,0.04); }
    .header { border-bottom: 2px solid #8c2803; padding-bottom: 16px; margin-bottom: 24px; }
    .logo-text { font-size: 20px; font-weight: 700; color: #102a43; letter-spacing: -0.5px; }
    .logo-sub { font-size: 13px; color: #627d98; margin-top: 2px; }
    p { margin: 0 0 16px 0; font-size: 15px; color: #334e68; }
    .highlight { background-color: #f0f4f8; border-left: 4px solid #8c2803; padding: 12px 16px; margin: 18px 0; border-radius: 0 6px 6px 0; font-size: 14.5px; }
    .cta-box { margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    .button { display: inline-block; background-color: #8c2803; color: #ffffff !important; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 14px; margin-top: 8px; }
    .footer { margin-top: 32px; padding-top: 16px; font-size: 12px; color: #829ab1; border-top: 1px solid #f1f5f9; line-height: 1.5; }
    .footer a { color: #627d98; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo-text">ABM Estudio Contable</div>
      <div class="logo-sub">Asesoramiento Tributario · Sueldos · Balances · Parque Patricios, CABA</div>
    </div>

    <p>Estimado equipo de <strong>${escapeHtml(empresa)}</strong>,</p>

    <p>Les escribimos desde <strong>ABM Estudio Contable</strong>, en <strong>Parque Patricios, CABA</strong>. Conocimos su actividad en ${escapeHtml(barrio)} y queremos presentarles nuestros servicios.</p>

    <div class="highlight">
      ${escapeHtml(angleParagraph)}
    </div>

    <p>Las consultas iniciales las recibe <strong>Alejandra Mayta</strong>, contadora y administradora de empresas, titular del estudio. El alcance del trabajo se conversa según cada caso:</p>

    <p style="margin-left: 12px;">
      • <strong>Liquidación de Sueldos y Cargas Sociales:</strong> F. 931, Libro de Sueldos Digital, paritarias y altas/bajas de personal.<br>
      • <strong>Impuestos Nacionales y Provinciales:</strong> ARCA (Ganancias, IVA), AGIP y Convenio Multilateral.<br>
      • <strong>Estados Contables y Balances:</strong> Certificaciones ante el Consejo Profesional de Ciencias Económicas.<br>
      • <strong>Atención directa:</strong> Coordinamos una conversación para conocer su actividad y lo que necesitan resolver.
    </p>

    <div class="cta-box">
      <p style="margin-bottom: 12px;">Si necesitan apoyo contable o impositivo, pueden escribirnos para conversar sobre su situación y definir qué servicio corresponde:</p>
      <a href="${escapeHtml(whatsappLink('Hola, quisiera consultar por servicios contables para ' + empresa + '.'))}" class="button">Escribirnos por WhatsApp</a>
    </div>

    <p style="margin-top: 24px; font-size: 14px; color: #48647d;">
      También pueden conocer los servicios y la forma de trabajo del estudio en <a href="https://estudiocontableabm.com.ar" style="color: #8c2803; text-decoration: underline;">estudiocontableabm.com.ar</a>.
    </p>

    <div class="footer">
      <strong>ABM Estudio Contable</strong> · Parque Patricios, CABA<br>
      Teléfono / WhatsApp: <a href="${phoneHref}">${phoneDisplay}</a> · Email: <a href="mailto:${email}">${email}</a><br>
      <em>Si no desean recibir más comunicaciones, respondan a este correo con la palabra "Baja".</em>
    </div>
  </div>
</body>
</html>`;

  const text = `ABM Estudio Contable · Parque Patricios, CABA
Servicios contables, impositivos y laborales para empresas locales

Estimado equipo de ${empresa},

Les escribimos desde ABM Estudio Contable, en Parque Patricios, CABA. Conocimos su actividad en ${barrio} y queremos presentarles nuestros servicios.

${angleParagraph}

Brindamos atención personalizada directa con la titular del estudio (Cra. Alejandra Mayta):
- Liquidación de Sueldos y Cargas Sociales (F. 931, Libro de Sueldos Digital, sindicatos).
- Impuestos Nacionales y Provinciales (ARCA, AGIP, Convenio Multilateral).
- Balances y Estados Contables (Consejo Profesional CABA).
- Atención directa para conversar sobre su actividad y definir el alcance.

Si necesitan apoyo contable o impositivo, pueden escribirnos para conversar sobre su situación:
- WhatsApp / Teléfono: ${phoneDisplay}
- Sitio Web: https://estudiocontableabm.com.ar
- Email: ${email}

Saludos cordiales,
Cra. Alejandra Mayta
ABM Estudio Contable
Parque Patricios, CABA
(Para no recibir más comunicaciones profesionales, responder "Baja").
`;

  return { subject, html, text };
}
