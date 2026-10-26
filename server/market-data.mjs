const FIVE_MINUTES = 5 * 60 * 1000;
const MAX_STALE = 3 * 24 * 60 * 60 * 1000;
export const MARKET_SOURCES = {
  currencies: 'https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones',
  monetary: 'https://api.bcra.gob.ar/estadisticas/v4.0/Monetarias?limit=10',
  market: 'https://dolarapi.com/v1/dolares',
};
const BCRA_URL = 'https://www.bcra.gob.ar/apis-banco-central/';
const positive = value => typeof value === 'number' && Number.isFinite(value) && value > 0;
const validDate = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value) || !Number.isFinite(Date.parse(value))) return false;
  const day = value.slice(0, 10);
  return new Date(`${day}T00:00:00Z`).toISOString().slice(0, 10) === day;
};

export function normalizeCurrencies(payload) {
  const result = payload?.results;
  if (payload?.status !== 200 || !validDate(result?.fecha) || !Array.isArray(result.detalle)) return [];
  const currencies = new Map(result.detalle.map(item => [item.codigoMoneda, item.tipoCotizacion]));
  return [
    ['usd-mayorista', 'Dólar mayorista', 'REF'],
    ['eur', 'Euro', 'EUR'],
    ['brl', 'Real', 'BRL'],
  ].filter(([, , code]) => positive(currencies.get(code))).map(([id, label, code]) => ({ id, label, value: currencies.get(code), kind: 'Referencia', date: result.fecha, source: 'BCRA', sourceUrl: BCRA_URL }));
}

export function normalizeMonetary(payload) {
  if (payload?.status !== 200 || !Array.isArray(payload.results)) return [];
  const item = payload.results.find(value => value.idVariable === 4);
  if (!positive(item?.ultValorInformado) || !validDate(item?.ultFechaInformada)) return [];
  return [{ id: 'usd-minorista', label: 'Dólar minorista', value: item.ultValorInformado, kind: 'Vendedor promedio', date: item.ultFechaInformada, source: 'BCRA', sourceUrl: BCRA_URL }];
}

export function normalizeMarket(payload) {
  if (!Array.isArray(payload)) return [];
  const labels = { blue: ['usd-blue', 'Dólar blue'], bolsa: ['usd-mep', 'Dólar MEP'], contadoconliqui: ['usd-ccl', 'Dólar CCL'], tarjeta: ['usd-tarjeta', 'Dólar tarjeta'] };
  return payload.filter(item => labels[item?.casa] && item.moneda === 'USD' && positive(item.venta) && validDate(item.fechaActualizacion)).map(item => {
    const [id, label] = labels[item.casa];
    return { id, label, sell: item.venta, ...(item.casa !== 'tarjeta' && positive(item.compra) ? { buy: item.compra } : {}), date: item.fechaActualizacion, source: 'DolarAPI', sourceUrl: 'https://dolarapi.com/docs/argentina/operations/get-dolares' };
  });
}

export function createMarketService({ fetchImpl = fetch, now = Date.now, cacheMs = FIVE_MINUTES } = {}) {
  let cached = null;
  let expires = 0;
  let pending = null;
  const lastGood = new Map();
  return async function getSnapshot() {
    if (cached && now() < expires) return cached;
    if (pending) return pending;
    pending = (async () => {
      const parsers = { currencies: normalizeCurrencies, monetary: normalizeMonetary, market: normalizeMarket };
      const results = await Promise.allSettled(Object.entries(MARKET_SOURCES).map(async ([key, url]) => {
        const response = await fetchImpl(url, { signal: AbortSignal.timeout(8000), headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`${key}: HTTP ${response.status}`);
        const quotes = parsers[key](await response.json());
        if (!quotes.length) throw new Error(`${key}: respuesta sin cotizaciones válidas`);
        return quotes;
      }));
      const quotes = new Map();
      const unavailableSources = [];
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') result.value.forEach(quote => { quotes.set(quote.id, quote); lastGood.set(quote.id, { quote, savedAt: now() }); });
        else unavailableSources.push(Object.keys(MARKET_SOURCES)[index]);
      });
      lastGood.forEach(({ quote, savedAt }, id) => {
        if (!quotes.has(id) && now() - savedAt <= MAX_STALE) quotes.set(id, { ...quote, stale: true });
      });
      const order = ['usd-minorista', 'usd-mayorista', 'usd-blue', 'usd-mep', 'usd-ccl', 'usd-tarjeta', 'eur', 'brl'];
      cached = { checkedAt: new Date(now()).toISOString(), refreshAfterSeconds: cacheMs / 1000, unavailableSources, quotes: order.filter(id => quotes.has(id)).map(id => quotes.get(id)) };
      expires = now() + (quotes.size ? cacheMs : 30000);
      return cached;
    })();
    try { return await pending; } finally { pending = null; }
  };
}

export const getMarketSnapshot = createMarketService();
