// Las fuentes editoriales aportan temas y enlaces. Solo se extrae evidencia de organismos.
export const newsSources = [
  { id: 'arca', name: 'ARCA', kind: 'official', type: 'html', url: 'https://servicioscf.arca.gob.ar/publico/sitio/contenido/novedad/ver.aspx?id=5979', selector: 'a[href*="ver.aspx?id="]' },
  { id: 'consejo', name: 'Consejo Profesional CABA', kind: 'professional', type: 'html', url: 'https://www.consejo.org.ar/noticias', selector: 'a[href*="/noticias/20"]' },
  { id: 'bdc', name: 'Blog del Contador', kind: 'discovery', type: 'html', url: 'https://blogdelcontador.com.ar/', selector: 'a[href^="/news-"]' },
  ...[
    ['cronista', 'El Cronista', 'cronista.com'],
    ['iprofesional', 'iProfesional', 'iprofesional.com'],
    ['ambito', 'Ámbito', 'ambito.com'],
  ].map(([id, name, domain]) => ({
    id, name, kind: 'discovery', type: 'rss', domain,
    url: 'https://news.google.com/rss/search?' + new URLSearchParams({
      q: 'site:' + domain + ' (ARCA OR monotributo OR impositivo OR contable OR sueldos) when:14d',
      hl: 'es-419', gl: 'AR', ceid: 'AR:es-419',
    }),
  })),
];

export const officialHosts = new Set(['servicioscf.arca.gob.ar', 'www.arca.gob.ar', 'arca.gob.ar', 'www.afip.gob.ar', 'afip.gob.ar', 'biblioteca.arca.gob.ar', 'www.argentina.gob.ar', 'www.boletinoficial.gob.ar', 'www.agip.gob.ar', 'www.arba.gov.ar']);
export const allowedNewsHosts = new Set([...officialHosts, ...newsSources.map(source => new URL(source.url).hostname)]);
export const topicRules = [
  { category: 'Monotributo', service: 'monotributo', words: ['monotributo', 'monotributista', 'recategorizacion'], weight: 8 },
  { category: 'Impuestos', service: 'asesoramiento-tributario', words: ['arca', 'afip', 'impuesto', 'ganancias', 'iva', 'ingresos brutos', 'impositivo', 'fiscal', 'vencimiento'], weight: 5 },
  { category: 'Contabilidad', service: 'contabilidad-balances', words: ['contable', 'contabilidad', 'estados contables', 'balance', 'certificacion'], weight: 6 },
  { category: 'Sueldos', service: 'sueldos', words: ['sueldos', 'cargas sociales', 'recibo', 'casas particulares', 'empleador', 'laboral'], weight: 5 },
  { category: 'Sociedades', service: 'crear-sociedad', words: ['sociedad', 'sociedades', 'cooperativa', 'constitucion', 'igj'], weight: 5 },
  { category: 'Pymes', service: 'pymes', words: ['pyme', 'pymes', 'mipyme', 'financiamiento'], weight: 5 },
  { category: 'Finanzas', service: 'asesoramiento-tributario', words: ['dolar', 'divisas', 'exterior', 'billetera', 'inflacion', 'bcra', 'financiero', 'tasas', 'blanqueo'], weight: 5 },
  { category: 'Actualidad', service: 'asesoramiento-tributario', words: ['reforma', 'ley', 'decreto', 'reglamentacion', 'fal', 'rifl'], weight: 5 },
];
