export function buildEmail(prospect) {
  const { empresa, barrio, rubro, angulo } = prospect;

  let angleParagraph = '';
  switch (angulo) {
    case 'sueldos_laboral':
      angleParagraph = `Sabemos que para una empresa de <strong>${rubro}</strong> con personal en planta o taller, la correcta liquidación de sueldos (Libro de Sueldos Digital, F. 931 de ARCA, sindicatos y convenios) es fundamental para evitar multas y contingencias laborales costosas.`;
      break;
    case 'ingresos_brutos_iva':
      angleParagraph = `Para empresas y distribuidoras de <strong>${rubro}</strong>, el impacto de Ingresos Brutos (Convenio Multilateral, regímenes de retención y percepción de AGIP/ARBA) y el IVA mensual requieren un control estricto para no inmovilizar capital de trabajo.`;
      break;
    case 'distrito_tech':
      angleParagraph = `Estando en el polo tecnológico y zona sur, trabajamos con empresas de <strong>${rubro}</strong> acompañándolas en el encuadre fiscal ante ARCA, facturación de servicios, régimen de monotributo/sociedades y orden administrativo.`;
      break;
    default:
      angleParagraph = `Acompañamos a pymes y negocios locales de <strong>${rubro}</strong> en la gestión integral de sus obligaciones fiscales ante ARCA y AGIP, armado de balances y planificación impositiva para que puedan enfocarse 100% en su actividad.`;
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

    <p>Estimado equipo de <strong>${empresa}</strong>,</p>

    <p>Les escribimos desde <strong>ABM Estudio Contable</strong>. Nuestro estudio está ubicado físicamente en <strong>Parque Patricios</strong>, muy cerca de ustedes en ${barrio}.</p>

    <div class="highlight">
      ${angleParagraph}
    </div>

    <p>Brindamos atención personalizada directa con la titular del estudio (<strong>Cra. Alejandra Mayta</strong>), lo que permite tener respuestas ágiles y seguimiento continuo sin la burocracia de las grandes consultoras:</p>

    <p style="margin-left: 12px;">
      • <strong>Liquidación de Sueldos y Cargas Sociales:</strong> F. 931, Libro de Sueldos Digital, paritarias y altas/bajas de personal.<br>
      • <strong>Impuestos Nacionales y Provinciales:</strong> ARCA (Ganancias, IVA), AGIP y Convenio Multilateral.<br>
      • <strong>Estados Contables y Balances:</strong> Certificaciones ante el Consejo Profesional de Ciencias Económicas.<br>
      • <strong>Atención cercana y presencial:</strong> Reuniones en su empresa o en nuestras oficinas de Parque Patricios.
    </p>

    <div class="cta-box">
      <p style="margin-bottom: 12px;">Si les interesa tener una <strong>reunión breve de diagnóstico sin cargo</strong> para revisar cómo están trabajando hoy sus obligaciones contables o laborales, quedamos a disposición:</p>
      <a href="https://wa.me/5491138430796?text=Hola%20Alejandra,%20te%20contacto%20desde%20${encodeURIComponent(empresa)}%20para%20conversar%20sobre%20servicios%20contables" class="button">Escribirnos por WhatsApp</a>
    </div>

    <p style="margin-top: 24px; font-size: 14px; color: #48647d;">
      También pueden conocer más de nuestra trayectoria y portal de novedades en <a href="https://estudiocontableabm.com.ar" style="color: #8c2803; text-decoration: underline;">estudiocontableabm.com.ar</a>.
    </p>

    <div class="footer">
      <strong>ABM Estudio Contable</strong> · Parque Patricios, CABA<br>
      Teléfono / WhatsApp: <a href="tel:+5491138430796">+54 9 11 3843-0796</a> · Email: <a href="mailto:contacto@estudiocontableabm.com.ar">contacto@estudiocontableabm.com.ar</a><br>
      <em>Enviamos esta comunicación a ${prospect.email} por considerarla de interés profesional para empresas de la zona. Si no desean recibir más novedades, respondan a este correo con la palabra "Baja".</em>
    </div>
  </div>
</body>
</html>`;

  const text = `ABM Estudio Contable · Parque Patricios, CABA
Servicios contables, impositivos y laborales para empresas locales

Estimado equipo de ${empresa},

Les escribimos desde ABM Estudio Contable. Estamos ubicados físicamente en Parque Patricios, muy cerca de ustedes en ${barrio}.

${angleParagraph.replace(/<\/?strong>/g, '')}

Brindamos atención personalizada directa con la titular del estudio (Cra. Alejandra Mayta):
- Liquidación de Sueldos y Cargas Sociales (F. 931, Libro de Sueldos Digital, sindicatos).
- Impuestos Nacionales y Provinciales (ARCA, AGIP, Convenio Multilateral).
- Balances y Estados Contables (Consejo Profesional CABA).
- Atención presencial y cercana en la zona.

Si les interesa tener una breve reunión de diagnóstico sin cargo para revisar cómo están trabajando hoy, pueden contactarnos directamente:
- WhatsApp / Teléfono: +54 9 11 3843-0796
- Sitio Web: https://estudiocontableabm.com.ar
- Email: contacto@estudiocontableabm.com.ar

Saludos cordiales,
Cra. Alejandra Mayta
ABM Estudio Contable
Parque Patricios, CABA
(Para no recibir más comunicaciones profesionales, responder "Baja").
`;

  return { subject, html, text };
}
