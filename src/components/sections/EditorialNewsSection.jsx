import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import initialNews from '../../data/publishedNews.json';

const yearOf = date => date ? new Date(date).getFullYear().toString() : '';
const formatDate = date => date ? new Date(date).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' }) : '';

export default function EditorialNewsSection({ compact = false }) {
  const [articles, setArticles] = useState(initialNews || []);
  const [category, setCategory] = useState('Todas');
  const [year, setYear] = useState('Todos los años');
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    const controller = new AbortController();
    const refresh = () => {
      if (document.hidden) return;
      fetch('/api/news', { signal: controller.signal, cache: 'no-store' })
        .then(response => response.ok ? response.json() : null)
        .then(data => { if (Array.isArray(data?.articles)) setArticles(data.articles); })
        .catch(() => {});
    };
    refresh();
    const interval = window.setInterval(refresh, 5 * 60_000);
    document.addEventListener('visibilitychange', refresh);
    return () => { controller.abort(); window.clearInterval(interval); document.removeEventListener('visibilitychange', refresh); };
  }, []);

  const categories = useMemo(() => ['Todas', ...new Set(articles.map(article => article.category).filter(Boolean))], [articles]);
  const years = useMemo(() => ['Todos los años', ...new Set(articles.map(article => yearOf(article.publishedAt)).filter(Boolean).sort().reverse())], [articles]);
  const filtered = useMemo(() => articles.filter(article => {
    const term = query.trim().toLocaleLowerCase('es');
    return (category === 'Todas' || article.category === category)
      && (year === 'Todos los años' || yearOf(article.publishedAt) === year)
      && (!term || `${article.title} ${article.summary} ${article.category}`.toLocaleLowerCase('es').includes(term));
  }).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)), [articles, category, year, query]);

  return (
    <section className="news-list-section" aria-label="Noticias del estudio">
      <div className="container mx-auto px-6">
        {compact && <div className="news-list-heading"><div><p className="news-kicker">Novedades</p><h2>Información para tu actividad.</h2></div><Link to="/novedades" className="news-read-link">Ver todas las noticias <ArrowRight size={16} /></Link></div>}
        {!compact && <div className="news-tools">
          <label className="news-search"><Search size={16} /><span className="sr-only">Buscar noticias</span><input type="search" placeholder="Buscar noticias, temas…" value={query} onChange={event => { setQuery(event.target.value); setLimit(9); }} /></label>
          <div className="news-filter-row">
            <div className="news-filter-group" role="group" aria-label="Filtrar por categoría">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setLimit(9); }}>{item}</button>)}</div>
            <div className="news-filter-group" role="group" aria-label="Filtrar por año">{years.map(item => <button type="button" key={item} aria-pressed={year === item} onClick={() => { setYear(item); setLimit(9); }}>{item}</button>)}</div>
          </div>
        </div>}
        <div className="news-card-grid">{filtered.slice(0, compact ? 3 : limit).map(article => <article key={article.id} className="news-card">
          <div className="news-card-meta"><span className="news-category">{article.category || 'Actualidad'}</span><time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time></div>
          <h3><Link to={`/novedades/${article.slug || article.id}`}>{article.title}</Link></h3>
          <Link to={`/novedades/${article.slug || article.id}`} className="news-read-link" aria-label={`Leer: ${article.title}`}>Leer más <ArrowRight size={15} /></Link>
        </article>)}</div>
        {!filtered.length && <p className="news-empty" role="status">No hay noticias que coincidan. Probá con otra categoría, año o búsqueda.</p>}
        {!compact && filtered.length > limit && <div className="news-load-more"><button type="button" className="news-outline-button" onClick={() => setLimit(value => value + 9)}>Ver más noticias <ArrowRight size={16} /></button></div>}
      </div>
    </section>
  );
}
