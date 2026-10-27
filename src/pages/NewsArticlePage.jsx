import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeading from '../components/layout/PageHeading';

export default function NewsArticlePage() {
  const { slug } = useParams();
  const [result, setResult] = useState({ slug: null, article: null, loaded: false });
  const article = result.slug === slug ? result.article : null;
  const loaded = result.slug === slug && result.loaded;
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/news', { signal: controller.signal, cache: 'no-store' }).then(response => {
      if (!response.ok) throw new Error('No disponible');
      return response.json();
    }).then(data => {
      const found = data.articles.find(item => item.slug === slug);
      setResult({ slug, article: found || null, loaded: true });
      if (found) {
        document.title = found.title + ' | ABM Estudio Contable';
        for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute('content', found.summary);
        for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content', found.title);
      }
    }).catch(error => { if (error.name !== 'AbortError') setResult({ slug, article: null, loaded: true }); });
    return () => controller.abort();
  }, [slug]);
  return <><Navbar /><main><PageHeading title={article?.title || (loaded ? 'Nota no disponible' : 'Cargando nota…')} description={article?.summary} /><div className="container mx-auto max-w-4xl px-6 py-14"><Link className="font-semibold text-accent-700" to="/novedades">← Todas las noticias</Link>{article && <article className="mt-8"><p className="mb-8 text-sm text-primary-600">{article.author} · Publicado el {new Date(article.publishedAt).toLocaleDateString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</p>{article.sections.map(section => <section key={section.heading} className="mb-8"><h2 className="mb-3 text-2xl font-semibold tracking-tight text-primary-950">{section.heading}</h2><p className="whitespace-pre-line text-lg leading-relaxed text-primary-700">{section.text}</p></section>)}<div className="mt-10 border-t border-primary-100 pt-6"><h2 className="font-semibold text-primary-950">Fuentes consultadas</h2>{article.sources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="mt-3 block text-sm text-accent-700 underline">{source.title} · {source.date.split('-').reverse().join('/')} ↗</a>)}</div><p className="mt-6 text-sm text-primary-600">Información general revisada al publicar. El tratamiento de cada caso depende de sus circunstancias y de la normativa vigente.</p><Link to={'/servicios#' + article.service} className="mt-8 inline-block rounded-lg bg-primary-900 px-6 py-3 font-semibold text-white">Consultar por este servicio</Link></article>}{loaded && !article && <p className="mt-8 text-primary-700">Esta nota no está publicada o no pudo cargarse. Podés volver al listado e intentar nuevamente.</p>}</div></main><Footer /></>;
}
