export const ABM_SITE_ORIGIN = 'https://estudiocontableabm.com.ar';
export const ABM_INSTAGRAM_HANDLE = '@abm.estudiocontable';
export const ABM_WHATSAPP_DISPLAY = '+54 11 6817 2147';
export const ABM_EMAIL = 'abm.estudio.contable.00@gmail.com';

const CATEGORY_PRESETS = {
  Monotributo: {
    badge: 'Guía Monotributo',
    segment: 'monotributo',
    servicePath: '/servicios#monotributo',
    audience: 'Monotributistas, profesionales independientes y prestadores de servicios.',
    checklist: [
      'Revisá tu categoría vigente y los ingresos acumulados de los últimos 12 meses.',
      'Comprobá que tu modalidad de facturación y punto de venta estén actualizados.',
      'Anotá tu actividad y consultas antes de escribir, sin compartir clave fiscal.',
    ],
    hashtags: [
      '#Monotributo',
      '#Monotributistas',
      '#ARCA',
      '#Facturacion',
      '#ABMEstudioContable',
      '#ParquePatricios',
    ],
    dmReply:
      'Hola, gracias por escribir a ABM. Contanos qué actividad realizás, si ya estás inscripto en monotributo y qué duda puntual querés revisar para definir los próximos pasos.',
  },
  Impuestos: {
    badge: 'Guía ARCA',
    segment: 'pymes',
    servicePath: '/servicios#asesoramiento-tributario',
    audience: 'Contribuyentes, responsables inscriptos, personas humanas y pymes.',
    checklist: [
      'Confirmá si el régimen o formulario alcanza a tu inscripción actual en ARCA.',
      'Reuní tus comprobantes, presentaciones anteriores y notificaciones recibidas.',
      'Chequeá las fechas de vigencia o adhesión antes del próximo vencimiento.',
    ],
    hashtags: [
      '#ImpuestosArgentina',
      '#ARCA',
      '#AsesoramientoFiscal',
      '#EstudioContable',
      '#ABMEstudioContable',
      '#ParquePatricios',
    ],
    dmReply:
      'Hola, gracias por tu mensaje. Contanos cuál es tu condición frente a ARCA y qué presentación o comunicación necesitás revisar para evaluar tu caso.',
  },
  Sueldos: {
    badge: 'Novedad Sueldos',
    segment: 'pymes',
    servicePath: '/servicios#sueldos',
    audience: 'Empleadores, pymes, comercios y responsables de liquidación de haberes.',
    checklist: [
      'Verificá cómo impacta el cambio en los próximos recibos y liquidaciones de F.931.',
      'Confirmá las fechas de entrada en vigencia y la reglamentación aplicable.',
      'Revisá la nómina y la documentación laboral respaldatoria del período.',
    ],
    hashtags: [
      '#LiquidacionDeSueldos',
      '#Empleadores',
      '#PymesArgentina',
      '#ARCA',
      '#ABMEstudioContable',
      '#ParquePatricios',
    ],
    dmReply:
      'Hola, gracias por escribir a ABM. Contanos cuántas personas tenés registradas o qué duda tenés sobre recibos y liquidaciones para orientarte.',
  },
  Pymes: {
    badge: 'Alerta PyMEs',
    segment: 'pymes',
    servicePath: '/servicios#pymes',
    audience: 'Micro, pequeñas y medianas empresas, comercios y pequeños contribuyentes.',
    checklist: [
      'Verificá que el Certificado MiPyME o tu caracterización registral esté vigente.',
      'Identificá qué períodos u obligaciones quedan comprendidos dentro de la medida.',
      'Ordená el detalle de vencimientos antes de evaluar una adhesión o trámite.',
    ],
    hashtags: [
      '#PymesArgentina',
      '#MiPyME',
      '#ComerciosCABA',
      '#ARCA',
      '#ABMEstudioContable',
      '#ParquePatricios',
    ],
    dmReply:
      'Hola, gracias por escribirnos. Contanos a qué se dedica la empresa, si tienen Certificado MiPyME vigente y qué obligación o gestión necesitan revisar.',
  },
  Sociedades: {
    badge: 'Guía Sociedades',
    segment: 'sociedades',
    servicePath: '/servicios#crear-sociedad',
    audience: 'Sociedades constituidas (SRL, SAS, SA), cooperativas y nuevos proyectos.',
    checklist: [
      'Revisá el estatuto, la jurisdicción y las presentaciones pendientes del ejercicio.',
      'Confirmá qué socios, administradores o apoderados participan de la gestión.',
      'Definí las preguntas del proyecto antes de iniciar un trámite societario.',
    ],
    hashtags: [
      '#Sociedades',
      '#SRL',
      '#SAS',
      '#EmprendedoresArgentina',
      '#ABMEstudioContable',
      '#ParquePatricios',
    ],
    dmReply:
      'Hola, gracias por escribir a ABM. Contanos qué actividad desarrollan o quieren iniciar, cuántas personas participan y en qué jurisdicción operan.',
  },
  Contabilidad: {
    badge: 'Guía Contable',
    segment: 'pymes',
    servicePath: '/servicios#contabilidad-balances',
    audience: 'Empresas, sociedades y organizaciones que preparan balances o certificaciones.',
    checklist: [
      'Mantené conciliados extractos bancarios, facturas emitidas y comprobantes de gastos.',
      'Confirmá los plazos de cierre de ejercicio o presentación ante organismos.',
      'Detallá qué información o certificación necesitás preparar.',
    ],
    hashtags: [
      '#Contabilidad',
      '#Balances',
      '#PymesArgentina',
      '#GestionContable',
      '#ABMEstudioContable',
      '#ParquePatricios',
    ],
    dmReply:
      'Hola, gracias por consultar a ABM. Contanos qué tipo de entidad es y qué balance, registro o certificación necesitás organizar.',
  },
  Finanzas: {
    badge: 'Panorama Fiscal',
    segment: 'monotributo',
    servicePath: '/servicios#asesoramiento-tributario',
    audience: 'Profesionales, monotributistas y pymes que operan con cuentas o billeteras digitales.',
    checklist: [
      'Contrastá los movimientos acreditados en cuentas y billeteras con tu facturación.',
      'Revisá el encuadre fiscal si cobrás servicios del exterior o por medios electrónicos.',
      'Consultá ante dudas antes de que cierre el período de control o recategorización.',
    ],
    hashtags: [
      '#BilleterasVirtuales',
      '#Monotributo',
      '#ImpuestosArgentina',
      '#FreelancersArgentina',
      '#ABMEstudioContable',
      '#ParquePatricios',
    ],
    dmReply:
      'Hola, gracias por escribir a ABM. Contanos cómo cobrás habitualmente y en qué régimen estás inscripto para revisar qué información conviene ordenar.',
  },
  Actualidad: {
    badge: 'Actualidad Legal',
    segment: 'pymes',
    servicePath: '/servicios#asesoramiento-tributario',
    audience: 'Empleadores, pymes y contribuyentes alcanzados por reformas y reglamentaciones.',
    checklist: [
      'Confirmá la fecha de entrada en vigencia y la reglamentación aplicable a tu rubro.',
      'Diferenciá qué normas ya rigen hoy y cuáles requieren instrumentación posterior.',
      'Revisá contratos, nómina o presentaciones vigentes antes de tomar decisiones.',
    ],
    hashtags: [
      '#ActualidadFiscal',
      '#ReformaLaboral',
      '#PymesArgentina',
      '#EstudioContable',
      '#ABMEstudioContable',
      '#ParquePatricios',
    ],
    dmReply:
      'Hola, gracias por tu consulta. Contanos el rubro de tu actividad o empresa y qué punto de la reglamentación necesitás revisar.',
  },
};

const DEFAULT_PRESET = CATEGORY_PRESETS.Impuestos;

export function getCategoryPreset(category) {
  return CATEGORY_PRESETS[category] || DEFAULT_PRESET;
}

export function cleanSpace(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

export function formatDateAr(value) {
  if (!value) return 'Fecha por confirmar';
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  }
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return 'Fecha por confirmar';
  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires',
  }).format(new Date(timestamp));
}

export function stripBoilerplatePrefix(text) {
  let clean = cleanSpace(text);
  clean = clean.replace(
    /^De acuerdo (?:a|con) lo informado en la publicación de referencia\s*\([^)]*\)\s*,?\s*(?:se dieron a conocer[^:]*:\s*|se informaron novedades[^:]*:\s*)?(?:El reporte destaca:\s*)?/i,
    '',
  );
  return clean.trim();
}

export function extractCompleteFact(text, maxChars = 240) {
  const clean = stripBoilerplatePrefix(text);
  if (!clean) return '';

  // Split into sentences while preserving decimals/law numbers like Ley 27.802 or F. 931.
  const sentences = clean
    .split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÑ¿¡0-9])/)
    .map(s => s.trim())
    .filter(Boolean);

  if (sentences.length > 1) {
    const last = sentences[sentences.length - 1];
    // Detect synthetic 450-char cut-offs (e.g. "nuevo For.", "los ha.", "Boletín Of.", "el perí.", "trabajo .")
    const looksTruncated = (
      (/\b(?:For|Of)\.$|\b[a-záéíóúñ]{1,8}\.$|\s+\.$/.test(last))
      && !/\b(?:ARCA|AFIP|IGJ|BCRA|CABA|UIA|RG|SRL|SAS|SA|PyME|PyMEs|MiPyME|F\.\s*\d+|N°\s*\d+|\d{4})\.$/.test(last)
      && !/fue dictado\.$/.test(last)
      && last.length < 130
    );
    const usable = looksTruncated ? sentences.slice(0, -1) : sentences;
    if (usable.length) {
      let combined = '';
      for (const sentence of usable) {
        const next = combined ? `${combined} ${sentence}` : sentence;
        if (next.length > maxChars && combined) break;
        combined = next;
      }
      if (combined.length <= maxChars) return combined;
    }
  }

  if (clean.length <= maxChars) return clean;
  const slice = clean.slice(0, maxChars);
  const sentenceBreak = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('! '), slice.lastIndexOf('? '));
  if (sentenceBreak >= 90) return slice.slice(0, sentenceBreak + 1).trim();
  const wordBreak = slice.lastIndexOf(' ');
  const cut = (wordBreak > 60 ? slice.slice(0, wordBreak) : slice).replace(/[,;:\s.]+$/, '');
  return `${cut}…`;
}

export function extractReferenceMentions(text) {
  const matches = new Set();
  const patterns = [
    /\bRG\s*\d+(?:\/\d{4})?/gi,
    /\bResolución General\s*\d+(?:\/\d{4})?/gi,
    /\bDecreto\s*\d+(?:\/\d{4})?/gi,
    /\bLey\s*(?:N°\s*)?\d+(?:\.\d+)?/gi,
    /\bFormulario\s*\d+\b/gi,
    /\bF\.\s*\d+\b/gi,
  ];
  for (const pattern of patterns) {
    for (const match of String(text || '').matchAll(pattern)) {
      matches.add(cleanSpace(match[0]));
    }
  }
  return [...matches].slice(0, 3);
}

export function buildArticleShortTitle(title) {
  const clean = cleanSpace(title);
  if (clean.length <= 68) return clean;
  const colonIdx = clean.indexOf(':');
  if (colonIdx >= 14 && colonIdx <= 66) return clean.slice(0, colonIdx).trim();
  const wordBreak = clean.slice(0, 66).lastIndexOf(' ');
  return `${clean.slice(0, wordBreak > 30 ? wordBreak : 65).trim()}…`;
}

export function capitalizeFirst(value) {
  const clean = cleanSpace(value);
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : '';
}

export function buildArticleCoverHook(title, category) {
  const clean = cleanSpace(title);
  const colonIdx = clean.indexOf(':');
  if (colonIdx >= 3 && colonIdx <= 60) {
    const lead = clean.slice(0, colonIdx).trim();
    const tail = capitalizeFirst(clean.slice(colonIdx + 1));
    return {
      headline: lead,
      subline: tail.length > 105 ? extractCompleteFact(tail, 105) : tail,
    };
  }
  return {
    headline: buildArticleShortTitle(clean),
    subline: `Novedad en ${String(category || 'impuestos').toLowerCase()}: qué tenés que saber y qué revisar.`,
  };
}

export function detectSourceLabel(article) {
  const source = article?.sources?.[0] || article?.verifiedSource;
  if (!source) return { name: 'Fuente oficial', date: formatDateAr(article?.publishedAt), url: '' };
  const url = source.url || source.sourceUrl || '';
  let name = 'Fuente de respaldo';
  if (url.includes('arca.gob.ar')) name = 'ARCA';
  else if (url.includes('consejo.org.ar')) name = 'Consejo Profesional CABA';
  else if (url.includes('boletinoficial.gob.ar')) name = 'Boletín Oficial';
  else if (url.includes('argentina.gob.ar')) name = 'Argentina.gob.ar';
  else if (url.includes('blogdelcontador.com.ar')) name = 'Blog del Contador';
  else if (source.title) name = cleanSpace(source.title).slice(0, 40);
  return {
    name,
    date: formatDateAr(source.date || source.sourceDate || article?.publishedAt),
    url,
  };
}

export function buildUtmUrl(slug, medium = 'story', content = 'novedad_web', servicePath = null) {
  const basePath = slug ? `/novedades/${slug}` : (servicePath || '/novedades');
  const [pathOnly, hashPart] = basePath.split('#');
  const params = new URLSearchParams({
    utm_source: 'instagram',
    utm_medium: medium,
    utm_campaign: 'novedades_abm',
    utm_content: content,
  });
  return `${ABM_SITE_ORIGIN}${pathOnly}?${params.toString()}${hashPart ? `#${hashPart}` : ''}`;
}

export function buildDeterministicInstagramKit(article) {
  const category = article?.category || 'Impuestos';
  const preset = getCategoryPreset(category);
  const slug = article?.slug || article?.id || '';
  const rawSections = Array.isArray(article?.sections) ? article.sections : [];
  const primarySection = rawSections[0]?.text || article?.summary || article?.title || '';
  const secondarySection = rawSections[1]?.text || '';
  const sourceInfo = detectSourceLabel(article);
  const { headline, subline } = buildArticleCoverHook(article?.title || 'Novedad contable', category);

  const mainFact = extractCompleteFact(primarySection, 300) || cleanSpace(article?.summary || article?.title);
  const refs = extractReferenceMentions(`${article?.title || ''} ${primarySection}`);
  const normLine = refs.length ? `Referencia: ${refs.join(' · ')}.` : `Fuente: ${sourceInfo.name} (${sourceInfo.date}).`;

  const isGenericSection2 = /^Esta novedad resulta de particular inter[eé]s/i.test(cleanSpace(secondarySection));
  const audienceText = !isGenericSection2 && cleanSpace(secondarySection).length > 30
    ? extractCompleteFact(secondarySection, 190)
    : preset.audience;
  const fullTitle = cleanSpace(article?.title || `${headline}: ${subline}`);

  const placa1 = {
    label: preset.badge,
    title: headline,
    body: subline,
    footer: 'Deslizá para ver qué revisar →',
  };

  const placa2 = {
    label: 'Alcance',
    title: '¿A quiénes alcanza?',
    body: audienceText,
    footer: `Área: ${category}`,
  };

  const placa3 = {
    label: 'Qué cambió',
    title: 'Puntos clave de la novedad',
    body: mainFact,
    footer: normLine,
  };

  const placa4 = {
    label: 'Qué revisar',
    title: '3 pasos antes de consultar',
    body: preset.checklist.map((item, idx) => `${idx + 1}. ${item}`).join('\n'),
    footer: 'No compartas clave fiscal por DM.',
  };

  const placa5 = {
    label: 'ABM Estudio Contable',
    title: '¿Querés revisar tu caso?',
    body: `Atención directa con la Cra. Alejandra Mayta.\nEscribinos por DM o por WhatsApp al ${ABM_WHATSAPP_DISPLAY}.`,
    footer: 'Guardá este post · @abm.estudiocontable',
  };

  const storyUrl = buildUtmUrl(slug, 'story', `noticia_${slug.slice(0, 10) || 'abm'}`, preset.servicePath);
  const bioUrl = buildUtmUrl('', 'bio', `noticia_${slug.slice(0, 10) || 'abm'}`, preset.servicePath);

  const epigrafe = [
    fullTitle,
    '',
    mainFact,
    '',
    `¿A quién le sirve? ${audienceText}`,
    '',
    'Si querés revisar cómo se aplica a tu actividad, escribinos por DM o por WhatsApp al +54 11 6817 2147. Atención directa de la Cra. Alejandra Mayta en CABA.',
    'Podés leer la nota completa desde el enlace de nuestra biografía o pedirnos el link por mensaje.',
    '',
    `Fuente consultada: ${sourceInfo.name} (${sourceInfo.date}). Nota informativa general; cada situación se evalúa en consulta.`,
    '',
    preset.hashtags.join(' '),
  ].join('\n');

  const historia = {
    texto: `📌 ${headline}\n${subline}\n\nLeé la nota completa en nuestra web 👇`,
    stickerTexto: 'Leer nota en ABM',
    url: storyUrl,
  };

  const altText = `Carrusel de 5 placas de ABM Estudio Contable sobre "${fullTitle}": alcance para ${audienceText.replace(/\.+$/, '').toLowerCase()}, resumen de la novedad, checklist de revisión y contacto directo.`;

  return {
    id: article?.id || slug,
    slug,
    title: cleanSpace(article?.title),
    category,
    segment: preset.segment,
    publishedAt: article?.publishedAt || new Date().toISOString(),
    publishedDateAr: formatDateAr(article?.publishedAt),
    sourceName: sourceInfo.name,
    sourceDateAr: sourceInfo.date,
    sourceUrl: sourceInfo.url,
    articleUrl: slug ? `${ABM_SITE_ORIGIN}/novedades/${slug}` : `${ABM_SITE_ORIGIN}/novedades`,
    bioUrl,
    generatedBy: 'ABM Instagram Kit',
    placas: [placa1, placa2, placa3, placa4, placa5],
    epigrafe,
    hashtags: preset.hashtags,
    historia,
    altText,
    dmReply: preset.dmReply,
  };
}

export function formatKitCarouselBlock(kit) {
  return (kit.placas || [])
    .map((placa, idx) => [
      `[Placa ${idx + 1} · ${placa.label}]`,
      placa.title,
      placa.body,
      placa.footer,
    ].filter(Boolean).join('\n'))
    .join('\n\n---\n\n');
}

export const PINNED_POST_KITS = [
  {
    id: 'fijado-presentacion-abm',
    slug: '',
    title: 'Post Fijado 1 · Conocé ABM Estudio Contable y cómo trabajamos',
    category: 'El Estudio',
    segment: 'pymes',
    publishedAt: '2026-11-24T12:00:00.000Z',
    publishedDateAr: 'Fijado',
    sourceName: 'ABM Estudio Contable',
    sourceDateAr: 'Institucional',
    sourceUrl: `${ABM_SITE_ORIGIN}/estudio`,
    articleUrl: `${ABM_SITE_ORIGIN}/estudio`,
    bioUrl: `${ABM_SITE_ORIGIN}/estudio?utm_source=instagram&utm_medium=bio&utm_campaign=fijados_abm`,
    generatedBy: 'ABM Post Fijado',
    placas: [
      {
        label: 'Bienvenida ABM',
        title: 'Asesoramiento contable e impositivo',
        body: 'Una mirada profesional con atención directa y cercana.',
        footer: 'Deslizá para conocernos →',
      },
      {
        label: 'Titular del estudio',
        title: 'Cra. Alejandra Mayta',
        body: 'Contadora Pública y Administradora de Empresas.\nDesde Parque Patricios, CABA, recibe personalmente cada consulta.',
        footer: 'Sin intermediarios desde el primer mensaje',
      },
      {
        label: 'A quiénes acompañamos',
        title: 'Tres áreas de trabajo',
        body: '1. Monotributistas y profesionales.\n2. PyMEs, comercios y liquidación de sueldos.\n3. Sociedades y nuevos proyectos.',
        footer: 'Impuestos · Contabilidad · Sueldos',
      },
      {
        label: 'Primera consulta',
        title: 'Cómo empezar en 3 datos',
        body: '1. Contanos tu actividad o rubro.\n2. Indicá qué necesitás ordenar o resolver.\n3. Mencioná si tenés un plazo cercano.',
        footer: 'No hace falta enviar clave fiscal por mensaje.',
      },
      {
        label: 'ABM Estudio Contable',
        title: '¿Conversamos sobre tu consulta?',
        body: `Escribinos por DM o por WhatsApp al ${ABM_WHATSAPP_DISPLAY}.\nLunes a viernes · 9:30 a 18:00 hs.`,
        footer: `Guardá este post · ${ABM_INSTAGRAM_HANDLE}`,
      },
    ],
    epigrafe: [
      '¿Buscás acompañamiento contable e impositivo con trato directo?',
      '',
      'En ABM Estudio Contable cada consulta llega directamente a Alejandra Mayta, contadora y administradora de empresas en Parque Patricios, CABA.',
      '',
      'Trabajamos con monotributistas, profesionales, pymes, comercios y proyectos societarios. En la primera conversación ordenamos tu actividad, los antecedentes y cualquier vencimiento próximo para definir el alcance del trabajo.',
      '',
      '📲 Escribinos por DM o por WhatsApp al +54 11 6817 2147 (lunes a viernes de 9:30 a 18:00 hs).',
      '🌐 Conocé más en el enlace de la biografía.',
      '',
      '#ABMEstudioContable #EstudioContableCABA #ParquePatricios #Impuestos #Contabilidad #Sueldos',
    ].join('\n'),
    hashtags: ['#ABMEstudioContable', '#EstudioContableCABA', '#ParquePatricios', '#Impuestos', '#Contabilidad', '#Sueldos'],
    historia: {
      texto: '📌 ¿Primera vez en @abm.estudiocontable?\nConocé cómo trabajamos y cómo preparar tu consulta 👇',
      stickerTexto: 'Conocer el estudio',
      url: `${ABM_SITE_ORIGIN}/estudio?utm_source=instagram&utm_medium=story&utm_campaign=fijados_abm`,
    },
    altText: 'Carrusel de presentación de ABM Estudio Contable con información sobre la titular Alejandra Mayta, los tres públicos que atiende en Parque Patricios y cómo iniciar una consulta.',
    dmReply: 'Hola, gracias por escribir a ABM. Contanos brevemente qué actividad realizás y qué necesitás revisar para orientarte sobre los próximos pasos.',
  },
  {
    id: 'fijado-monotributo-personas',
    slug: '',
    title: 'Post Fijado 2 · Monotributo, facturación y consultas de ARCA',
    category: 'Monotributo',
    segment: 'monotributo',
    publishedAt: '2026-11-24T11:59:00.000Z',
    publishedDateAr: 'Fijado',
    sourceName: 'ABM Servicios',
    sourceDateAr: 'Institucional',
    sourceUrl: `${ABM_SITE_ORIGIN}/monotributo`,
    articleUrl: `${ABM_SITE_ORIGIN}/monotributo`,
    bioUrl: `${ABM_SITE_ORIGIN}/monotributo?utm_source=instagram&utm_medium=bio&utm_campaign=fijados_abm`,
    generatedBy: 'ABM Post Fijado',
    placas: [
      {
        label: 'Guía Monotributo',
        title: '¿Trabajás por cuenta propia?',
        body: 'Ordená tu inscripción, facturación y seguimiento ante ARCA.',
        footer: 'Deslizá para ver en qué te acompañamos →',
      },
      {
        label: 'Etapa inicial',
        title: 'Antes de empezar',
        body: 'Definí actividad, encuadre inicial y modalidad de emisión de comprobantes antes de facturar.',
        footer: 'Alta e inicio de actividad',
      },
      {
        label: 'Seguimiento',
        title: 'Si ya estás inscripto',
        body: 'Revisamos cambios de facturación, categoría vigente, ingresos brutos y comunicaciones recibidas.',
        footer: 'Control periódico de situación',
      },
      {
        label: 'Comunicaciones',
        title: '¿Llegó un aviso de ARCA?',
        body: 'Guardá el aviso completo, verificá si indica un plazo y consultanos sin compartir tu clave fiscal en mensajes.',
        footer: 'Revisión de intimaciones y plazos',
      },
      {
        label: 'ABM Estudio Contable',
        title: 'Revisemos tu situación',
        body: `Contanos qué actividad realizás por DM o WhatsApp al ${ABM_WHATSAPP_DISPLAY}.`,
        footer: `Guardá esta guía · ${ABM_INSTAGRAM_HANDLE}`,
      },
    ],
    epigrafe: [
      '¿Estás por empezar como monotributista o necesitás revisar tu situación actual?',
      '',
      'En ABM acompañamos a profesionales y trabajadores independientes en el alta, el control de facturación, la revisión de categorías y las consultas por comunicaciones de ARCA.',
      '',
      'Para orientarte mejor en el primer mensaje, contanos qué actividad realizás, si ya facturás y si tenés alguna fecha próxima.',
      '',
      '📲 Escribinos por DM o por WhatsApp al +54 11 6817 2147 (sin enviar claves fiscales por chat).',
      '🌐 Más información en el enlace de la biografía.',
      '',
      '#Monotributo #Monotributistas #FacturacionElectronica #ARCA #ABMEstudioContable #ParquePatricios',
    ].join('\n'),
    hashtags: ['#Monotributo', '#Monotributistas', '#FacturacionElectronica', '#ARCA', '#ABMEstudioContable', '#ParquePatricios'],
    historia: {
      texto: '📌 ¿Consultas sobre Monotributo o avisos de ARCA?\nRevisá cómo podemos orientarte 👇',
      stickerTexto: 'Ver Monotributo',
      url: `${ABM_SITE_ORIGIN}/monotributo?utm_source=instagram&utm_medium=story&utm_campaign=fijados_abm`,
    },
    altText: 'Carrusel de ABM Estudio Contable sobre asesoramiento para monotributistas y personas independientes: inicio de actividad, seguimiento y revisión de avisos de ARCA.',
    dmReply: 'Hola, gracias por escribir a ABM. ¿Qué actividad realizás y estás por empezar o ya estás inscripto en monotributo? Contanos qué necesitás revisar.',
  },
  {
    id: 'fijado-pymes-sociedades',
    slug: '',
    title: 'Post Fijado 3 · PyMEs, Sueldos y Constitución de Sociedades',
    category: 'Pymes',
    segment: 'pymes',
    publishedAt: '2026-11-24T11:58:00.000Z',
    publishedDateAr: 'Fijado',
    sourceName: 'ABM Servicios',
    sourceDateAr: 'Institucional',
    sourceUrl: `${ABM_SITE_ORIGIN}/servicios`,
    articleUrl: `${ABM_SITE_ORIGIN}/servicios`,
    bioUrl: `${ABM_SITE_ORIGIN}/servicios?utm_source=instagram&utm_medium=bio&utm_campaign=fijados_abm`,
    generatedBy: 'ABM Post Fijado',
    placas: [
      {
        label: 'Empresas y PyMEs',
        title: '¿Tu negocio necesita orden contable?',
        body: 'Impuestos, sueldos, balances y puesta en marcha societaria.',
        footer: 'Deslizá para ver las áreas →',
      },
      {
        label: 'Impuestos y Balances',
        title: 'Gestión periódica para PyMEs',
        body: 'Liquidación impositiva, estados contables, auditoría, reportes de gestión y flujo de fondos.',
        footer: 'Información clara para decidir',
      },
      {
        label: 'Equipo de trabajo',
        title: 'Sueldos y cargas sociales',
        body: 'Liquidación de haberes, cargas sindicales, libros de sueldos y certificaciones de servicios.',
        footer: 'Procesos de personal al día',
      },
      {
        label: 'Nuevos proyectos',
        title: 'Sociedades y cooperativas',
        body: 'Acompañamos la evaluación de estructura (SRL, SA, SAS o cooperativa), constitución y gestión posterior.',
        footer: 'Desde la idea hasta la operación',
      },
      {
        label: 'ABM Estudio Contable',
        title: 'Conversemos sobre tu empresa',
        body: `Escribinos por DM o por WhatsApp al ${ABM_WHATSAPP_DISPLAY} para definir el alcance.`,
        footer: `Guardá este post · ${ABM_INSTAGRAM_HANDLE}`,
      },
    ],
    epigrafe: [
      '¿Llevás una pyme, un comercio o están proyectando constituir una sociedad?',
      '',
      'En ABM Estudio Contable organizamos la gestión impositiva, contable y laboral de empresas, además de acompañar la constitución y puesta en marcha de SRL, SAS, SA y cooperativas.',
      '',
      'Contanos a qué se dedica tu negocio, cómo organizan la información hoy y qué tarea necesitan delegar o revisar.',
      '',
      '📲 Escribinos por DM o por WhatsApp al +54 11 6817 2147. Atención directa de Alejandra Mayta.',
      '🌐 Conocé todas las áreas desde el enlace de la biografía.',
      '',
      '#PymesArgentina #LiquidacionDeSueldos #Balances #CrearSociedad #ABMEstudioContable #ParquePatricios',
    ].join('\n'),
    hashtags: ['#PymesArgentina', '#LiquidacionDeSueldos', '#Balances', '#CrearSociedad', '#ABMEstudioContable', '#ParquePatricios'],
    historia: {
      texto: '📌 Servicios contables, impositivos y de sueldos para PyMEs y Sociedades 👇',
      stickerTexto: 'Ver Servicios ABM',
      url: `${ABM_SITE_ORIGIN}/servicios?utm_source=instagram&utm_medium=story&utm_campaign=fijados_abm`,
    },
    altText: 'Carrusel de ABM Estudio Contable con servicios para pymes y comercios, liquidación de sueldos y constitución de sociedades y cooperativas.',
    dmReply: 'Hola, gracias por tu consulta. Contanos a qué se dedica la empresa o proyecto y en qué área necesitan apoyo: impuestos, contabilidad, sueldos o constitución societaria.',
  },
];

export function formatInstagramCopyMarkdown(kits, generatedAt = new Date().toISOString()) {
  const safeKits = Array.isArray(kits) ? kits : [];
  const header = [
    '# 📸 Kits de Instagram listos para copiar · ABM Estudio Contable',
    '',
    `> **Última actualización automática:** ${formatDateAr(generatedAt)} (${generatedAt.slice(11, 16)} UTC)  `,
    `> **Cuenta:** ${ABM_INSTAGRAM_HANDLE} · **WhatsApp:** ${ABM_WHATSAPP_DISPLAY} · **Web:** ${ABM_SITE_ORIGIN}  `,
    '> **Cómo usar este archivo:** Abrilo desde GitHub (en PC o celular) y tocá el ícono **Copiar** arriba a la derecha de cada bloque para pasarlo directo a Canva o Instagram.',
    '',
    '---',
    '',
  ].join('\n');

  if (!safeKits.length) {
    return `${header}Todavía no hay noticias publicadas para generar kits.\n`;
  }

  const blocks = safeKits.map((kit, index) => {
    const lines = [
      `## ${index + 1}. ${kit.title}`,
      `- **Categoría:** ${kit.category} · **Publicada en la web:** ${kit.publishedDateAr} · **Fuente:** ${kit.sourceName} (${kit.sourceDateAr})`,
      `- **Nota web:** ${kit.articleUrl}`,
      `- **Generado por:** ${kit.generatedBy}`,
      '',
      '### Carrusel de 5 placas (para Canva · 1080 × 1350)',
      '',
    ];

    (kit.placas || []).forEach((placa, idx) => {
      lines.push(`**Placa ${idx + 1} — ${placa.label}**`);
      lines.push('```text');
      lines.push([placa.title, placa.body, placa.footer].filter(Boolean).join('\n\n'));
      lines.push('```');
      lines.push('');
    });

    lines.push('### Epígrafe completo (listo para pegar en Instagram)');
    lines.push('```text');
    lines.push(kit.epigrafe);
    lines.push('```');
    lines.push('');

    lines.push('### Historia (Story) + Enlace con UTM');
    lines.push('```text');
    lines.push(`${kit.historia?.texto || ''}\n\nSticker de enlace ("${kit.historia?.stickerTexto || 'Leer más'}"):\n${kit.historia?.url || kit.articleUrl}`);
    lines.push('```');
    lines.push('');

    lines.push('### Texto alternativo (Accesibilidad) y Respuesta rápida DM');
    lines.push('```text');
    lines.push(`ALT: ${kit.altText}\n\nRespuesta rápida DM/WhatsApp:\n${kit.dmReply}`);
    lines.push('```');
    lines.push('');
    lines.push('---');
    lines.push('');

    return lines.join('\n');
  });

  return header + blocks.join('\n') + formatPinnedSection();
}

function formatPinnedSection() {
  const intro = [
    '## 📌 Bonus · 3 Posts Fijados recomendados para el inicio de tu perfil',
    '',
    '> Publicá estos tres carruseles y fijálos arriba de la grilla (`... > Fijar en tu perfil`) para que todo visitante nuevo entienda qué hace ABM y cómo consultar.',
    '',
  ].join('\n');

  const items = PINNED_POST_KITS.map((kit, index) => {
    const lines = [
      `### ${index + 1}. ${kit.title}`,
      `- **Enlace de apoyo:** ${kit.articleUrl}`,
      '',
    ];
    kit.placas.forEach((placa, idx) => {
      lines.push(`**Placa ${idx + 1} — ${placa.label}**`);
      lines.push('```text');
      lines.push([placa.title, placa.body, placa.footer].filter(Boolean).join('\n\n'));
      lines.push('```');
      lines.push('');
    });
    lines.push('**Epígrafe completo**');
    lines.push('```text');
    lines.push(kit.epigrafe);
    lines.push('```');
    lines.push('');
    lines.push('---');
    lines.push('');
    return lines.join('\n');
  }).join('\n');

  return intro + items;
}
