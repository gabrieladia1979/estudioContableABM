import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Newspaper, Sparkles, BookOpen } from 'lucide-react';

const categoryStyles = {
  Monotributo: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Impuestos: 'bg-blue-50 text-blue-900 border-blue-200',
  Sueldos: 'bg-purple-50 text-purple-900 border-purple-200',
  Sociedades: 'bg-amber-50 text-amber-900 border-amber-200',
  Pymes: 'bg-teal-50 text-teal-900 border-teal-200',
  Finanzas: 'bg-indigo-50 text-indigo-900 border-indigo-200',
  Actualidad: 'bg-sky-50 text-sky-900 border-sky-200',
};

const getCategoryBadge = (category) => categoryStyles[category] || 'bg-slate-50 text-slate-800 border-slate-200';

const formatDate = (isoString) => {
  if (!isoString) return '';
  return new Date(isoString).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires',
  });
};

const getReadingTime = (article) => {
  const totalLength = (article.summary || '').length +
    (article.sections || []).reduce((acc, s) => acc + (s.heading || '').length + (s.text || '').length, 0);
  const minutes = Math.max(1, Math.round(totalLength / 600));
  return `${minutes} min de lectura`;
};

const getSourceLabel = (article) => {
  const source = article.sources?.[0]?.title || '';
  if (/blog\s*del\s*contador/i.test(source)) return 'Blog del Contador';
  if (/arca|afip/i.test(source)) return 'ARCA Oficial';
  if (/consejo/i.test(source)) return 'Consejo CABA';
  return 'Fuente Verificada';
};

export default function EditorialNewsSection({ compact = false }) {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(compact ? 3 : 9);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchArticles = () => {
      if (document.hidden) return;
      fetch('/api/news', { signal: controller.signal, cache: 'no-store' })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.articles) setArticles(data.articles);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    };

    fetchArticles();
    const interval = window.setInterval(fetchArticles, 5 * 60_000);
    document.addEventListener('visibilitychange', fetchArticles);

    return () => {
      controller.abort();
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', fetchArticles);
    };
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(articles.map((a) => a.category).filter(Boolean))];
    return ['Todas', ...unique];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory = selectedCategory === 'Todas' || article.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title?.toLowerCase().includes(query) ||
        article.summary?.toLowerCase().includes(query) ||
        article.category?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const visibleArticles = filteredArticles.slice(0, compact ? 3 : limit);

  if (!loading && articles.length === 0 && compact) {
    return null;
  }

  return (
    <section className="bg-gradient-to-b from-white via-primary-50/20 to-white py-16 md:py-24" aria-labelledby="editorial-news-title">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent-700">
              <Sparkles size={14} className="text-accent-600" />
              <span>Análisis & Actualidad ABM</span>
            </div>
            <h2 id="editorial-news-title" className="text-3xl font-extrabold tracking-tight text-primary-950 md:text-4xl">
              Novedades que impactan en tu negocio.
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-primary-700">
              Explicaciones claras, fechas clave y recomendaciones prácticas elaboradas por nuestro equipo contable e impositivo.
            </p>
          </div>
          {compact && (
            <Link
              to="/novedades"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-primary-800"
            >
              <span>Ver todas las notas</span>
              <ArrowRight size={17} />
            </Link>
          )}
        </div>

        {/* Filter Bar (Only in full mode) */}
        {!compact && (
          <div className="mb-10 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
                {categories.map((cat) => {
                  const count = cat === 'Todas' ? articles.length : articles.filter((a) => a.category === cat).length;
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setLimit(9);
                      }}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                        isActive
                          ? 'border-primary-900 bg-primary-900 text-white shadow-sm'
                          : 'border-primary-200 bg-white text-primary-800 hover:border-primary-400 hover:bg-primary-50'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${isActive ? 'bg-primary-800 text-white' : 'bg-primary-100 text-primary-700'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px] max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-400" size={17} />
                <input
                  type="text"
                  placeholder="Buscar por tema..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setLimit(9);
                  }}
                  className="w-full rounded-xl border border-primary-200 bg-white py-2 pl-10 pr-4 text-sm text-primary-900 placeholder-primary-400 shadow-sm transition focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && articles.length === 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-primary-100 bg-white p-7 shadow-sm">
                <div className="h-4 w-24 rounded bg-primary-100 mb-4" />
                <div className="h-6 w-5/6 rounded bg-primary-100 mb-3" />
                <div className="h-16 w-full rounded bg-primary-50 mb-6" />
                <div className="h-4 w-32 rounded bg-primary-100" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && visibleArticles.length === 0 && (
          <div className="rounded-2xl border border-primary-200 bg-white p-12 text-center shadow-sm">
            <Newspaper size={44} className="mx-auto mb-4 text-primary-300" />
            <h3 className="text-xl font-bold text-primary-900">No encontramos notas que coincidan</h3>
            <p className="mt-2 text-primary-600">Probá buscando con otros términos o seleccionando otra categoría.</p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-800"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )}

        {/* News Cards Grid */}
        <div className={`grid gap-6 md:grid-cols-2 ${compact ? 'lg:grid-cols-3' : 'lg:grid-cols-3'}`}>
          {visibleArticles.map((article) => {
            const badgeClass = getCategoryBadge(article.category);
            const readTime = getReadingTime(article);
            const formattedDate = formatDate(article.publishedAt);
            const sourceLabel = getSourceLabel(article);

            return (
              <article
                key={article.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-primary-100/90 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl"
              >
                <div>
                  {/* Top Badges */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <span className={`inline-flex items-center rounded-full border px-3 py-0.5 text-xs font-bold ${badgeClass}`}>
                      {article.category || 'Actualidad'}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-2.5 py-0.5 text-[11px] font-semibold text-primary-700">
                      <BookOpen size={12} className="text-primary-500" />
                      {sourceLabel}
                    </span>
                  </div>

                  {/* Metadata Row */}
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-primary-500">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={13} className="text-primary-400" />
                      <time dateTime={article.publishedAt}>{formattedDate}</time>
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} className="text-primary-400" />
                      <span>{readTime}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold leading-snug tracking-tight text-primary-950 transition-colors group-hover:text-accent-700">
                    <Link to={`/novedades/${article.slug || article.id}`} className="focus:outline-none">
                      {article.title}
                    </Link>
                  </h3>

                  {/* Summary */}
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-primary-700">
                    {article.summary}
                  </p>
                </div>

                {/* Card Footer Link */}
                <div className="mt-6 border-t border-primary-50 pt-4">
                  <Link
                    to={`/novedades/${article.slug || article.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent-700 transition group-hover:text-accent-800"
                  >
                    <span>Leer análisis de ABM</span>
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Show More Button (Full mode) */}
        {!compact && filteredArticles.length > limit && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setLimit((prev) => prev + 6)}
              className="inline-flex items-center gap-2 rounded-xl border border-primary-300 bg-white px-7 py-3 text-sm font-bold text-primary-900 shadow-sm transition hover:border-primary-400 hover:bg-primary-50"
            >
              <span>Ver más notas ({filteredArticles.length - limit} restantes)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
