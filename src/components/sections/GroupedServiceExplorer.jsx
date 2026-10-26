import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import WhatsAppIcon from '../WhatsAppIcon';
import { serviceDetails } from '../../data/serviceDetails';
import { whatsappLink } from '../../data/contact';

const areas = [
  ['Impuestos', ['asesoramiento-tributario']],
  ['Contabilidad y gestión', ['contabilidad-balances', 'pymes']],
  ['Sueldos', ['sueldos']],
  ['Sociedades', ['empresas-sociedades']],
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

  return <section id="explorar-servicios" className="container mx-auto px-6 py-16 md:py-24">
    <div className="mb-10 max-w-3xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-700">Servicios por área</p><h2 className="text-3xl font-bold text-primary-950 md:text-4xl">Elegí el área de tu consulta.</h2><p className="mt-4 text-lg text-primary-700">Cada área reúne los servicios relacionados para que encuentres el acompañamiento que necesitás.</p></div>
    <div className="grid items-start gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
      <nav aria-label="Áreas y servicios" className="rounded-2xl border border-primary-100 bg-white p-5 lg:sticky lg:top-36">
        {areas.map(([title, ids]) => <div key={title} className="border-b border-primary-100 py-4 last:border-0"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-primary-500">{title}</p>{ids.map(id => <Link key={id} to={`#${id}`} aria-current={active === id ? 'true' : undefined} className={`block rounded-lg px-3 py-3 text-sm font-semibold ${active === id ? 'bg-primary-900 text-white' : 'text-primary-900 hover:bg-primary-50'}`}>{serviceDetails.find(item => item.id === id).title}</Link>)}{title === 'Sociedades' && <Link to="/crear-sociedad" className="block px-3 py-3 text-sm font-semibold text-accent-700">Constitución y cooperativas ↗</Link>}</div>)}
      </nav>
      <div id={service.id} className="min-w-0">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-accent-700">{service.category}</p><h3 className="text-3xl font-bold text-primary-950 md:text-4xl">{service.title}</h3><p className="mt-5 max-w-3xl text-lg leading-relaxed text-primary-700">{service.summary}</p><p className="mt-4 leading-relaxed text-primary-700">{service.fit}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">{service.items.map(item => <li key={item} className="flex items-start gap-3 rounded-xl border border-primary-100 bg-white p-6 leading-relaxed text-primary-900"><Check size={18} className="mt-1 shrink-0 text-accent-700" /><span>{item}</span></li>)}</ul>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-primary-900 p-7 text-white"><p className="max-w-md text-lg font-semibold">Conversá con Alejandra sobre el alcance de tu consulta.</p><a href={whatsappLink(`Hola, quisiera consultar por ${service.title.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent-500 px-6 py-4 font-bold hover:bg-accent-600"><WhatsAppIcon size={20} /> Consultar <ArrowRight size={18} /></a></div>
      </div>
    </div>
  </section>;
}
