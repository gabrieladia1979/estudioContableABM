import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Link as LinkIcon } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import initialNews from '../data/publishedNews.json';

export default function NewsArticlePage() {
  const { slug } = useParams();
  const initialFound = initialNews.find(item => item.slug === slug || item.id === slug) || null;
  const [result, setResult] = useState({ slug, article: initialFound, loaded: Boolean(initialFound) });
  const [copiedUrl, setCopiedUrl] = useState('');
  const article = result.slug === slug ? result.article : initialFound;
  const loaded = (result.slug === slug && result.loaded) || Boolean(initialFound);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/news', { signal: controller.signal, cache: 'no-store' })
      .then(response => { if (!response.ok) throw new Error('No disponible'); return response.json(); })
      .then(data => setResult({ slug, article: data.articles?.find(item => item.slug === slug || item.id === slug) || initialFound, loaded: true }))
      .catch(error => { if (error.name !== 'AbortError') setResult({ slug, article: initialFound, loaded: true }); });
    return () => controller.abort();
  }, [slug, initialFound]);

  useEffect(() => {
    if (!article) return;
    document.title = `${article.title} | ABM Estudio Contable`;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute('content', article.summary);
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content', article.title);
  }, [article]);

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(window.location.href); setCopiedUrl(window.location.pathname); } catch { setCopiedUrl(''); }
  };
  const copied = typeof window !== 'undefined' && copiedUrl === window.location.pathname;
  const formattedDate = article?.publishedAt ? new Date(article.publishedAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Argentina/Buenos_Aires' }) : '';

  return <div className="news-page min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">
      {!loaded && <p className="container mx-auto px-6 py-24" role="status">Cargando noticia…</p>}
      {loaded && !article && <div className="container mx-auto px-6 py-24"><h1 className="text-3xl font-bold">Noticia no disponible</h1><Link to="/novedades" className="news-outline-button mt-8"><ArrowLeft size={16} /> Volver a Noticias</Link></div>}
      {article && <article>
        <header className="news-article-header">
          <div className="container mx-auto px-6">
            <div className="news-article-top"><nav aria-label="Ubicación" className="news-kicker"><Link to="/novedades">Noticias</Link><span aria-hidden="true"> · </span>{article.category}</nav><Link to="/novedades" className="news-outline-button"><ArrowLeft size={15} /> Volver</Link></div>
            <div className="news-card-meta"><span className="news-category">{article.category || 'Actualidad'}</span><time dateTime={article.publishedAt}>{formattedDate}</time></div>
            <h1>{article.title}</h1>
          </div>
        </header>
        <div className="container mx-auto px-6">
          <div className="news-article-body">
            <p className="news-article-summary">{article.summary}</p>
            {article.sections?.map((section, index) => <section key={index}><h2>{section.heading}</h2>{section.text.split(/\n\s*\n/).filter(Boolean).map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}</section>)}
          </div>
          <div className="news-article-bottom"><Link to="/novedades" className="news-outline-button"><ArrowLeft size={16} /> Noticias</Link><button type="button" onClick={copyLink} className="news-outline-button">{copied ? <Check size={16} /> : <LinkIcon size={16} />}<span role="status">{copied ? 'Enlace copiado' : 'Copiar enlace'}</span></button></div>
        </div>
      </article>}
    </main>
    <Footer />
  </div>;
}
