import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Check,
  Building2,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const categoryBadges = {
  Monotributo: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Impuestos: 'bg-blue-50 text-blue-900 border-blue-200',
  Sueldos: 'bg-purple-50 text-purple-900 border-purple-200',
  Sociedades: 'bg-amber-50 text-amber-900 border-amber-200',
  Pymes: 'bg-teal-50 text-teal-900 border-teal-200',
  Finanzas: 'bg-indigo-50 text-indigo-900 border-indigo-200',
  Actualidad: 'bg-sky-50 text-sky-900 border-sky-200',
};

export default function NewsArticlePage() {
  const { slug } = useParams();
  const [result, setResult] = useState({ slug: null, article: null, loaded: false });
  const [copied, setCopied] = useState(false);

  const article = result.slug === slug ? result.article : null;
  const loaded = result.slug === slug && result.loaded;

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/news', { signal: controller.signal, cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('No disponible');
        return response.json();
      })
      .then((data) => {
        const found = data.articles?.find((item) => item.slug === slug || item.id === slug);
        setResult({ slug, article: found || null, loaded: true });
        if (found) {
          document.title = `${found.title} | ABM Estudio Contable`;
          for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) {
            document.querySelector(selector)?.setAttribute('content', found.summary);
          }
          for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
            document.querySelector(selector)?.setAttribute('content', found.title);
          }
        }
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setResult({ slug, article: null, loaded: true });
      });
    return () => controller.abort();
  }, [slug]);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const formattedDate = article?.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'America/Argentina/Buenos_Aires',
      })
    : '';

  const readingTime = article
    ? `${Math.max(1, Math.round(((article.summary || '').length + (article.sections || []).reduce((acc, s) => acc + s.heading.length + s.text.length, 0)) / 600))} min de lectura`
    : '2 min de lectura';

  const whatsappMessage = encodeURIComponent(
    `Hola ABM Estudio Contable, estuve leyendo su publicación "${article?.title || 'Noticias'}" y quería consultar sobre cómo impacta en mi situación.`
  );
  const whatsappUrl = `https://wa.me/5491136894086?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-primary-950 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1">
        {/* Top Breadcrumb Header */}
        <div className="border-b border-primary-100/80 bg-white py-4 shadow-sm">
          <div className="container mx-auto px-6">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary-500">
              <Link to="/" className="hover:text-primary-900 transition">Inicio</Link>
              <ChevronRight size={13} className="text-primary-300" />
              <Link to="/novedades" className="hover:text-primary-900 transition">Noticias</Link>
              {article && (
                <>
                  <ChevronRight size={13} className="text-primary-300" />
                  <span className="text-primary-700">{article.category}</span>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Loading Spinner */}
        {!loaded && (
          <div className="container mx-auto max-w-4xl px-6 py-24 text-center">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-900 mb-4" />
            <p className="text-primary-600 font-medium">Cargando análisis contable...</p>
          </div>
        )}

        {/* Not Found State */}
        {loaded && !article && (
          <div className="container mx-auto max-w-3xl px-6 py-24 text-center">
            <h1 className="text-3xl font-bold text-primary-950">Nota no disponible</h1>
            <p className="mt-3 text-lg text-primary-600">
              Esta publicación no se encuentra activa o el enlace ingresado es incorrecto.
            </p>
            <Link
              to="/novedades"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-900 px-6 py-3 font-semibold text-white shadow transition hover:bg-primary-800"
            >
              <ArrowLeft size={18} />
              <span>Volver al portal de noticias</span>
            </Link>
          </div>
        )}

        {/* Article Content */}
        {article && (
          <article className="container mx-auto max-w-4xl px-6 py-10 md:py-16">
            {/* Back link */}
            <div className="mb-8 flex items-center justify-between">
              <Link
                to="/novedades"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-accent-700 transition"
              >
                <ArrowLeft size={16} />
                <span>Todas las noticias</span>
              </Link>

              {/* Share button */}
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-lg border border-primary-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-primary-700 shadow-sm transition hover:border-primary-400 hover:bg-primary-50"
                title="Copiar enlace"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                <span>{copied ? '¡Enlace copiado!' : 'Compartir'}</span>
              </button>
            </div>

            {/* Category badge & Meta */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-bold uppercase tracking-wide ${
                  categoryBadges[article.category] || 'bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                {article.category}
              </span>
              <span className="text-xs text-primary-400">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600">
                <Calendar size={13} className="text-primary-400" />
                <time dateTime={article.publishedAt}>{formattedDate}</time>
              </span>
              <span className="text-xs text-primary-400">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600">
                <Clock size={13} className="text-primary-400" />
                <span>{readingTime}</span>
              </span>
            </div>

            {/* Main Title (H1) */}
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-primary-950 sm:text-4xl md:text-5xl">
              {article.title}
            </h1>

            {/* Author Byline */}
            <div className="mt-6 flex items-center gap-3 border-y border-primary-100 py-3.5 text-xs text-primary-600">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-900 font-bold text-white text-[11px]">
                ABM
              </div>
              <div>
                <p className="font-bold text-primary-900">Equipo Tributario & Contable ABM</p>
                <p className="text-primary-500">Asesoramiento profesional para pymes y contribuyentes</p>
              </div>
            </div>

            {/* Executive Lead Summary */}
            <div className="my-8 rounded-2xl border-l-4 border-accent-600 bg-accent-50/50 p-6 shadow-sm md:p-8">
              <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-700">
                <Sparkles size={14} className="text-accent-600" />
                <span>Síntesis ejecutiva</span>
              </div>
              <p className="text-lg md:text-xl font-medium leading-relaxed text-primary-900">
                {article.summary}
              </p>
            </div>

            {/* Structured Article Sections */}
            <div className="space-y-8 my-10">
              {article.sections?.map((section, index) => (
                <section
                  key={section.heading || index}
                  className="rounded-2xl border border-primary-100 bg-white p-7 md:p-9 shadow-sm transition hover:border-primary-200"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-900">
                      0{index + 1}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-primary-950">
                      {section.heading}
                    </h2>
                  </div>
                  <p className="whitespace-pre-line text-base md:text-lg leading-relaxed text-primary-700">
                    {section.text}
                  </p>
                </section>
              ))}
            </div>

            {/* Professional Advisory CTA Card */}
            <div className="my-12 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 p-8 text-white shadow-xl md:p-10">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent-300">
                  <ShieldCheck size={14} /> Asesoramiento Personalizado
                </span>
                <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                  ¿Cómo impacta esta novedad en tu situación?
                </h3>
                <p className="mt-3 text-base leading-relaxed text-primary-100">
                  Cada actividad tiene particularidades frente a ARCA y la normativa fiscal. En ABM te ayudamos a cumplir con tranquilidad y a prevenir contingencias.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow transition hover:bg-emerald-700 hover:shadow-lg"
                  >
                    <MessageCircle size={18} />
                    <span>Consultar por WhatsApp</span>
                  </a>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    <span>Formulario de contacto</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Official Sources & Disclaimers */}
            <div className="rounded-2xl border border-primary-100 bg-[#f8fafc] p-6 text-sm text-primary-700">
              <h4 className="font-bold text-primary-900">Fuentes y respaldo normativo</h4>
              {article.sources?.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 text-accent-700 hover:text-accent-800 hover:underline font-semibold"
                >
                  <Building2 size={15} />
                  <span>{source.title}</span>
                  {source.date && <span>({source.date.split('-').reverse().join('/')})</span>}
                  <ExternalLink size={14} />
                </a>
              ))}
              <p className="mt-4 text-xs leading-relaxed text-primary-500">
                Aviso profesional: Esta publicación contiene información general con fines orientativos y fue verificada al momento de su difusión. La interpretación tributaria y legal depende de la reglamentación aplicable a cada caso individual.
              </p>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-10 border-t border-primary-100 pt-6">
              <Link
                to="/novedades"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary-800 hover:text-accent-700 transition"
              >
                <ArrowLeft size={16} />
                <span>Volver a todas las novedades</span>
              </Link>
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}
