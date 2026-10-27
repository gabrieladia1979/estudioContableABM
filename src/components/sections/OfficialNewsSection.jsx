import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsReviewedAt, officialNews } from '../../data/officialNews';

const dateLabel = value => value.split('-').reverse().join('/');

export default function OfficialNewsSection({ compact = false }) {
  const [source, setSource] = useState('Todas');
  const sorted = [...officialNews].sort((a, b) => b.date.localeCompare(a.date));
  const articles = compact ? sorted.slice(0, 3) : sorted.filter(item => source === 'Todas' || item.source === source);
  return <section className="bg-[#f7f9fc] py-16 md:py-24" aria-labelledby="official-news-title">
    <div className="container mx-auto px-6">
      <div className="mb-9 flex flex-wrap items-end justify-between gap-6"><div className="max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-700">Noticias · Fuentes oficiales</p><h2 id="official-news-title" className="text-3xl font-bold tracking-tight text-primary-950 md:text-4xl">Actualidad para tu actividad.</h2><p className="mt-4 text-lg text-primary-700">Una selección de publicaciones de ARCA y del Consejo Profesional de Ciencias Económicas de CABA.</p></div>{compact && <Link to="/novedades" className="inline-flex items-center gap-2 font-bold text-accent-700">Ver todas las noticias <ArrowRight size={18} /></Link>}</div>
      {!compact && <div className="mb-7 flex flex-wrap gap-2" role="group" aria-label="Filtrar noticias por fuente">{['Todas', 'ARCA', 'Consejo Profesional CABA'].map(item => <button key={item} type="button" aria-pressed={source === item} onClick={() => setSource(item)} className={`rounded-full border px-5 py-2 text-sm font-semibold ${source === item ? 'border-primary-900 bg-primary-900 text-white' : 'border-primary-200 bg-white text-primary-900 hover:bg-primary-50'}`}>{item}</button>)}</div>}
      <div className={`grid gap-5 md:grid-cols-2 ${compact ? 'xl:grid-cols-3' : ''}`}>
        {articles.map(article => <article key={article.id} className="flex flex-col rounded-2xl border border-primary-100 bg-white p-7 transition hover:border-primary-300 md:p-8"><div className="mb-6 flex items-center justify-between gap-3"><span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-800">{article.source}</span><Newspaper size={21} className="shrink-0 text-primary-400" aria-hidden="true" /></div><div className="mb-3 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-primary-600"><time dateTime={article.date}>{dateLabel(article.date)}</time><span>{article.category}</span></div><h3 className="text-xl font-bold leading-snug text-primary-950"><a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent-700">{article.title}</a></h3><p className="mt-4 flex-1 leading-relaxed text-primary-700">{article.summary}</p><a href={article.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 font-bold text-accent-700">Leer en la fuente <ArrowUpRight size={18} /></a></article>)}
      </div>
      <p className="mt-6 text-xs text-primary-600">Selección revisada el <time dateTime={newsReviewedAt}>{dateLabel(newsReviewedAt)}</time>. Cada enlace abre la publicación del organismo correspondiente.</p>
    </div>
  </section>;
}
