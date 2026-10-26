import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import WhatsAppIcon from '../WhatsAppIcon';
import { serviceDetails } from '../../data/serviceDetails';
import { whatsappLink } from '../../data/contact';
import { topicPages } from '../../data/topicPages';

const areas = [
  ['Impuestos', ['asesoramiento-tributario', 'monotributo', 'intimaciones-arca']],
  ['Contabilidad y gestión', ['contabilidad-balances', 'pymes']],
  ['Sueldos', ['sueldos']],
  ['Sociedades', ['empresas-sociedades', 'crear-sociedad']],
  ['Profesionales y personas', ['personas']],
];

export default function GroupedServiceExplorer() {
  const { hash } = useLocation();
  const [active, setActive] = useState('asesoramiento-tributario');
  useEffect(() => {
    const id = hash.slice(1);
    if (!serviceDetails.some(service => service.id === id)) return;
    setActive(id);
    requestAnimationFrame(() => document.getElementById('explorar-servicios')?.scrollIntoView({ block: 'start' }));
  }, [hash]);
  const service = serviceDetails.find(item => item.id === active);
  const topic = service.topic ? topicPages[service.topic] : null;

  return <section id="explorar-servicios" className="container mx-auto px-6 py-16 md:py-24">
    <div className="mb-10 max-w-3xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-700">Servicios por área</p><h2 className="text-3xl font-bold text-primary-950 md:text-4xl">Elegí el área de tu consulta.</h2><p className="mt-4 text-lg text-primary-700">Cada área reúne los servicios relacionados para que encuentres el acompañamiento que necesitás.</p></div>
    <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
      <nav aria-label="Áreas y servicios" className="rounded-2xl border border-primary-100 bg-white p-4 shadow-sm lg:sticky lg:top-36">
        {areas.map(([title, ids]) => <div key={title} className="border-b border-primary-100 pb-3 pt-2 last:border-0"><p className="mb-2 px-2 text-[11px] font-extrabold uppercase tracking-[0.1em] text-primary-600">{title}</p>{ids.map(id => <Link key={id} to={`#${id}`} aria-current={active === id ? 'true' : undefined} className={`my-0.5 block rounded-r-lg border-l-[3px] px-3 py-2.5 text-sm font-semibold leading-snug transition ${active === id ? 'border-accent-700 bg-[#f7ede8] text-accent-800' : 'border-transparent text-primary-900 hover:bg-primary-50'}`}>{serviceDetails.find(item => item.id === id).title}</Link>)}</div>)}
      </nav>
      <div id={service.id} className="min-w-0">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent-700">{service.category}</p><h3 className="text-3xl font-bold text-primary-950 md:text-4xl">{service.title}</h3><p className="mt-5 max-w-3xl text-lg leading-relaxed text-primary-700">{service.summary}</p><p className="mt-4 leading-relaxed text-primary-700">{service.fit}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">{service.items.map(item => <li key={item} className="flex items-start gap-3 rounded-xl border border-primary-100 bg-white p-6 leading-relaxed text-primary-900"><Check size={18} className="mt-1 shrink-0 text-accent-700" /><span>{item}</span></li>)}</ul>
        {topic && <div className="mt-10 space-y-9">
          <div><h4 className="text-2xl font-bold text-primary-950">¿Te encontrás en alguna de estas situaciones?</h4><div className="mt-5 grid gap-4 md:grid-cols-3">{topic.situations.map(([title, text]) => <article key={title} className="rounded-xl border border-primary-100 bg-white p-5"><h5 className="font-bold text-primary-900">{title}</h5><p className="mt-2 text-sm leading-relaxed text-primary-700">{text}</p></article>)}</div></div>
          <div><h4 className="text-2xl font-bold text-primary-950">Cómo empezar la consulta</h4><ol className="mt-5 grid gap-3">{topic.steps.map((step, index) => <li key={step} className="flex gap-4 rounded-xl border border-primary-100 bg-white p-4"><span className="font-bold text-accent-700">0{index + 1}</span><span className="text-primary-700">{step}</span></li>)}</ol></div>
          <div><h4 className="text-2xl font-bold text-primary-950">Preguntas frecuentes</h4><div className="mt-5 grid gap-3">{topic.faqs.map(([question, answer]) => <details key={question} className="rounded-xl border border-primary-100 bg-white p-5"><summary className="cursor-pointer font-semibold text-primary-900">{question}</summary><p className="mt-3 leading-relaxed text-primary-700">{answer}</p></details>)}</div></div>
        </div>}
        {service.stages && <div className="mt-10"><h4 className="text-2xl font-bold text-primary-950">Del proyecto a la operación</h4><div className="mt-5 grid gap-4 md:grid-cols-3">{service.stages.map(([title, text], index) => <article key={title} className="rounded-xl border border-primary-100 bg-white p-5"><span className="text-sm font-bold text-accent-700">PASO 0{index + 1}</span><h5 className="mt-3 font-bold text-primary-900">{title}</h5><p className="mt-2 text-sm leading-relaxed text-primary-700">{text}</p></article>)}</div></div>}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-primary-900 p-7 text-white"><p className="max-w-md text-lg font-semibold">Conversá con Alejandra sobre el alcance de tu consulta.</p><div className="flex flex-wrap gap-3">{(service.topic || service.contactTopic) && <Link to={`/contacto?tema=${service.topic || service.contactTopic}`} className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-6 py-4 font-bold hover:bg-white/10">Dejar consulta <ArrowRight size={18} /></Link>}<a href={whatsappLink(topic?.whatsappMessage || `Hola, quisiera consultar por ${service.title.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-4 font-bold hover:bg-accent-600"><WhatsAppIcon size={20} /> Consultar</a></div></div>
      </div>
    </div>
  </section>;
}
