import { useEffect, useState } from 'react';

const money = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 2 });
const marketTypes = [['usd-blue', 'Dólar blue'], ['usd-mep', 'Dólar MEP'], ['usd-ccl', 'Dólar CCL']];
function dateLabel(value) {
  const date = new Date(value.length === 10 ? `${value}T12:00:00Z` : value);
  return new Intl.DateTimeFormat('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', day: '2-digit', month: '2-digit', year: '2-digit', ...(value.length > 10 ? { hour: '2-digit', minute: '2-digit' } : {}) }).format(date);
}

export default function MarketTicker() {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let disposed = false;
    let controller;
    const refresh = async () => {
      if (document.hidden) return;
      controller?.abort();
      controller = new AbortController();
      try {
        const response = await fetch('/api/market', { signal: controller.signal });
        if (!response.ok) throw new Error('Cotizaciones no disponibles');
        const snapshot = await response.json();
        if (!Array.isArray(snapshot.quotes) || !snapshot.quotes.length) throw new Error('Sin cotizaciones');
        if (!disposed) { setData(snapshot); setFailed(false); }
      } catch (error) {
        if (!disposed && error.name !== 'AbortError') setFailed(true);
      }
    };
    refresh();
    const interval = window.setInterval(refresh, 60000);
    const onVisible = () => { if (!document.hidden) refresh(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => { disposed = true; controller?.abort(); window.clearInterval(interval); document.removeEventListener('visibilitychange', onVisible); };
  }, []);
  const quotes = data?.quotes || [];
  const missing = marketTypes.filter(([id]) => !quotes.some(quote => quote.id === id));

  const quoteContent = quote => <><strong>{quote.label}</strong><span>{quote.value ? `${quote.kind}: ${money.format(quote.value)}` : `${quote.buy ? `C ${money.format(quote.buy)} · ` : ''}V ${money.format(quote.sell)}`}</span><small>{quote.source !== 'DolarAPI' && `${quote.source} · `}<time dateTime={quote.date}>{dateLabel(quote.date)}</time>{quote.stale || failed ? ' · Último dato disponible' : ''}</small></>;
  const group = duplicate => <ul className="market-ticker-group" aria-hidden={duplicate || undefined}>
    {quotes.map(quote => <li key={quote.id}>{duplicate ? <span className="market-ticker-quote">{quoteContent(quote)}</span> : <a className="market-ticker-quote" href={quote.sourceUrl} target="_blank" rel="noopener noreferrer">{quoteContent(quote)}</a>}</li>)}
    {missing.map(([id, label]) => <li key={id}>{duplicate ? <span className="market-ticker-quote"><strong>{label}</strong><span>Consultar en DolarHoy ↗</span></span> : <a className="market-ticker-quote" href="https://dolarhoy.com/" target="_blank" rel="noopener noreferrer"><strong>{label}</strong><span>Consultar en DolarHoy ↗</span></a>}</li>)}
  </ul>;

  return <section className="market-ticker" aria-label="Cotizaciones del dólar y otras monedas">
    <div className="market-ticker-label"><span>Cotizaciones</span></div>
    {quotes.length ? <div className="market-ticker-window"><div className="market-ticker-track">{group(false)}{group(true)}</div></div> : <div className="market-ticker-status" role="status">{failed ? 'Cotizaciones temporalmente no disponibles.' : 'Consultando cotizaciones…'} <a href="https://dolarhoy.com/" target="_blank" rel="noopener noreferrer">Ver DolarHoy ↗</a></div>}
  </section>;
}
