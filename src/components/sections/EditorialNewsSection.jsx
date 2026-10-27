import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function EditorialNewsSection({ compact = false }) {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('Todas');
  const [limit, setLimit] = useState(12);
  useEffect(() => {
    const controller = new AbortController();
    const update = () => {
      if (document.hidden) return;
      fetch('/api/news', { signal: controller.signal, cache: 'no-store' }).then(response => response.ok ? response.json() : null).then(data => { if (data?.articles) setArticles(data.articles); }).catch(() => {});
    };
    update();
    const timer = window.setInterval(update, 5 * 60_000);
    document.addEventListener('visibilitychange', update);
    return () => { controller.abort(); window.clearInterval(timer); document.removeEventListener('visibilitychange', update); };
  }, []);
  if (!articles.length) return null;
  const filtered = articles.filter(article => category === 'Todas' || article.category === category);
  const visible = filtered.slice(0, compact ? 3 : limit);
  return <section className="bg-white py-16 md:py-20"><div className="container mx-auto px-6">
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="mb-3 text-xs font-bold uppercase tracking-[.16em] text-accent-700">Notas de ABM</p><h2 className="text-3xl font-semibold tracking-tight text-primary-950 md:text-4xl">Las novedades, explicadas para tu actividad.</h2></div>{compact && <Link className="font-bold text-accent-700" to="/novedades">Ver todas las notas →</Link>}</div>
    {!compact && <div className="mb-7 flex flex-wrap gap-2">{['Todas', ...new Set(articles.map(article => article.category))].map(item => <button key={item} aria-pressed={item === category} onClick={() => { setCategory(item); setLimit(12); }} className={'rounded-full border px-4 py-2 text-sm ' + (item === category ? 'bg-primary-900 text-white' : 'border-primary-200 text-primary-900')}>{item}</button>)}</div>}
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map(article => <article key={article.id} className="flex flex-col rounded-2xl border border-primary-100 bg-[#f7f9fc] p-7"><p className="text-xs font-semibold text-primary-600">{article.category} · {new Date(article.publishedAt).toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p><h3 className="mt-4 text-xl font-semibold leading-snug text-primary-950"><Link to={'/novedades/' + article.slug}>{article.title}</Link></h3><p className="mt-4 flex-1 leading-relaxed text-primary-700">{article.summary}</p><Link className="mt-6 font-bold text-accent-700" to={'/novedades/' + article.slug}>Leer nota de ABM →</Link></article>)}</div>
    {!compact && filtered.length > limit && <button className="mt-8 rounded-lg border border-primary-300 px-6 py-3 font-semibold text-primary-900" onClick={() => setLimit(value => value + 12)}>Ver más notas</button>}
  </div></section>;
}
