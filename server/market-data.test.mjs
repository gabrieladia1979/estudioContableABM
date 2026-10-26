import test from 'node:test';
import assert from 'node:assert/strict';
import { createMarketService, normalizeCurrencies, normalizeMonetary, normalizeMarket } from './market-data.mjs';

const currencies = { status: 200, results: { fecha: '2026-10-23', detalle: [{ codigoMoneda: 'REF', tipoCotizacion: 1528.263 }, { codigoMoneda: 'EUR', tipoCotizacion: 1711.96935 }, { codigoMoneda: 'BRL', tipoCotizacion: 305.429638 }] } };
const monetary = { status: 200, results: [{ idVariable: 4, ultValorInformado: 1549.77, ultFechaInformada: '2026-10-23' }] };
const market = [{ moneda: 'USD', casa: 'blue', compra: 1545, venta: 1565, fechaActualizacion: '2026-10-25T20:58:00.000Z' }];
const response = payload => ({ ok: true, json: async () => structuredClone(payload) });
const payloadFor = url => url.includes('Cotizaciones') ? currencies : url.includes('Monetarias') ? monetary : market;

test('rechaza precios inválidos y conserva la unidad y fecha oficial', () => {
  const quotes = normalizeCurrencies(currencies);
  assert.equal(quotes.find(quote => quote.id === 'usd-mayorista').value, 1528.263);
  assert.equal(quotes[0].date, '2026-10-23');
  assert.equal(normalizeMonetary(monetary)[0].kind, 'Vendedor promedio');
  assert.deepEqual(normalizeCurrencies({ ...currencies, results: { ...currencies.results, fecha: '2026-02-30' } }), []);
  assert.deepEqual(normalizeMonetary({ status: 200, results: [{ idVariable: 4, ultValorInformado: 0, ultFechaInformada: '2026-10-23' }] }), []);
});

test('distingue compra y venta y no inventa compra para dólar tarjeta', () => {
  const quotes = normalizeMarket([...market, { ...market[0], casa: 'tarjeta', compra: 1900, venta: 2015 }, { ...market[0], casa: 'bolsa', venta: null }, { ...market[0], casa: 'desconocida' }]);
  assert.equal(quotes.length, 2);
  assert.equal(quotes[0].buy, 1545);
  assert.equal(quotes[0].sell, 1565);
  assert.equal(quotes[1].buy, undefined);
  assert.equal(quotes[1].sell, 2015);
  assert.deepEqual(normalizeMarket([{ ...market[0], fechaActualizacion: 'fecha inválida' }]), []);
});

test('comparte consultas simultáneas y renueva la caché al vencer', async () => {
  let clock = Date.parse('2026-10-25T21:00:00Z');
  let requests = 0;
  const get = createMarketService({ now: () => clock, cacheMs: 1000, fetchImpl: async url => { requests++; return response(payloadFor(url)); } });
  const [first, second] = await Promise.all([get(), get()]);
  assert.deepEqual(first, second);
  assert.equal(requests, 3);
  assert.equal(first.quotes.length, 5);
  await get(); assert.equal(requests, 3);
  clock += 1001;
  await get(); assert.equal(requests, 6);
});

test('una caída parcial conserva la fecha del último valor y lo marca como anterior', async () => {
  let clock = Date.parse('2026-10-25T21:00:00Z');
  let marketDown = false;
  const get = createMarketService({ now: () => clock, cacheMs: 1000, fetchImpl: async url => {
    if (marketDown && url.includes('dolarapi')) return { ok: false, status: 503 };
    return response(payloadFor(url));
  } });
  await get(); marketDown = true; clock += 1001;
  const partial = await get();
  assert.deepEqual(partial.unavailableSources, ['market']);
  assert.equal(partial.quotes.find(quote => quote.id === 'usd-blue').stale, true);
  assert.equal(partial.quotes.find(quote => quote.id === 'usd-blue').date, market[0].fechaActualizacion);
  assert.equal(partial.quotes.find(quote => quote.id === 'eur').stale, undefined);
  clock += 4 * 24 * 60 * 60 * 1000;
  assert.equal((await get()).quotes.some(quote => quote.id === 'usd-blue'), false);
});

test('una caída total sin caché devuelve ausencia de datos y nunca ceros de relleno', async () => {
  const get = createMarketService({ fetchImpl: async () => { throw new Error('fuente caída'); } });
  const result = await get();
  assert.deepEqual(result.quotes, []);
  assert.equal(result.unavailableSources.length, 3);
});
