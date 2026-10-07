import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { whatsappLink } from '../data/contact';
import { topicPages } from '../data/topicPages';

export default function TopicPage({ topic }) {
  const content = topicPages[topic];
  if (!content) return null;

  return (
    <div>
      <Navbar />
      <main>
        <section className="bg-primary-950 px-6 py-16 text-white md:py-24">
          <div className="container mx-auto max-w-5xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-accent-200">{content.eyebrow}</p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{content.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-primary-100">{content.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/contacto?tema=${topic}`} className="inline-flex items-center gap-2 rounded-lg bg-accent-700 px-6 py-4 font-bold text-white hover:bg-accent-800">Contar mi situación <ArrowRight size={18} /></Link>
              <a href={whatsappLink(content.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-4 font-semibold text-white hover:bg-white/10"><MessageCircle size={18} /> Escribir por WhatsApp</a>
            </div>
          </div>
        </section>

        <section className="bg-primary-50 px-6 py-16 md:py-20">
          <div className="container mx-auto max-w-6xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-accent-700">Punto de partida</p>
            <h2 className="text-3xl font-bold text-primary-900">¿Te encontrás en alguna de estas situaciones?</h2>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {content.situations.map(([title, text]) => <article key={title} className="rounded-2xl border border-primary-100 bg-white p-7"><h3 className="text-xl font-bold text-primary-900">{title}</h3><p className="mt-3 leading-relaxed text-gray-700">{text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 md:py-20">
          <div className="container mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div><p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-accent-700">Cómo seguimos</p><h2 className="text-3xl font-bold text-primary-900">Una primera consulta, con la información importante</h2><p className="mt-5 leading-relaxed text-gray-700">No hace falta resolver todo en el primer mensaje. Con algunos datos básicos, el estudio puede entender qué atención necesitás.</p></div>
            <ol className="grid gap-5">{content.steps.map((step, index) => <li key={step} className="flex gap-5 rounded-xl border border-primary-100 p-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-900 font-bold text-white">{index + 1}</span><span className="self-center leading-relaxed text-gray-700">{step}</span></li>)}</ol>
          </div>
        </section>

        <section className="bg-primary-50 px-6 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-accent-700">Preguntas frecuentes</p><h2 className="mb-8 text-3xl font-bold text-primary-900">Antes de escribirnos</h2><div className="grid gap-4">{content.faqs.map(([question, answer]) => <details key={question} className="group rounded-xl border border-primary-100 bg-white p-5"><summary className="cursor-pointer font-bold text-primary-900 marker:text-accent-700">{question}</summary><p className="mt-4 leading-relaxed text-gray-700">{answer}</p></details>)}</div></div>
        </section>

        <section className="bg-primary-900 px-6 py-14 text-white"><div className="container mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><p className="mb-2 flex items-center gap-2 text-accent-200"><CheckCircle2 size={20} /> Atención directa con ABM</p><h2 className="text-3xl font-bold">Empecemos por tu consulta</h2><p className="mt-3 max-w-2xl text-primary-100">Dejanos tus datos y el motivo. Alejandra Myta revisará tu mensaje durante el horario de atención.</p></div><Link to={`/contacto?tema=${topic}`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent-700 px-6 py-4 font-bold text-white hover:bg-accent-800">Dejar mi consulta <ArrowRight size={18} /></Link></div></section>
      </main>
      <Footer />
    </div>
  );
}
