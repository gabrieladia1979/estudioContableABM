import React from 'react';
import { ArrowUpRight, BriefcaseBusiness, Building2, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

const audiences = [
  { icon: Building2, title: 'Pymes y empresas', text: 'Organizá la gestión contable, impositiva y laboral de tu negocio con un equipo que conozca tu operación.', tags: ['Impuestos', 'Balances', 'Sueldos'], to: '/servicios#pymes' },
  { icon: BriefcaseBusiness, title: 'Emprendedores', text: 'Recibí orientación para formalizar tu proyecto, elegir cómo operar y dar los próximos pasos.', tags: ['Inicio de actividad', 'Sociedades'], to: '/crear-sociedad' },
  { icon: UserRound, title: 'Profesionales y personas', text: 'Resolvé tus obligaciones fiscales y consultas puntuales con información clara sobre lo que tenés que presentar.', tags: ['Monotributo', 'Autónomos', 'Ganancias'], to: '/servicios#personas' },
];

const AudienceSection = () => <section className="bg-[#f7f9fb] py-20 md:py-24"><div className="container mx-auto px-6">
  <div className="mb-11 max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-600">Cómo podemos ayudarte</p><h2 className="text-3xl font-bold tracking-tight text-primary-900 md:text-4xl">Un servicio para tu momento</h2><p className="mt-4 text-lg text-gray-600">Cada actividad tiene necesidades distintas. Encontrá el punto de partida que más se parece a tu situación.</p></div>
  <div className="grid gap-6 lg:grid-cols-3">{audiences.map(({ icon: Icon, title, text, tags, to }) => <article className="flex flex-col rounded-2xl border border-primary-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg" key={title}><span className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary-800">{React.createElement(Icon, { size: 28 })}</span><h3 className="mb-3 text-xl font-bold text-primary-900">{title}</h3><p className="mb-6 leading-relaxed text-gray-600">{text}</p><div className="mb-7 flex flex-wrap gap-2">{tags.map(tag => <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700" key={tag}>{tag}</span>)}</div><Link className="mt-auto inline-flex items-center gap-1 font-bold text-accent-700 hover:text-accent-800" to={to}>Explorar opciones <ArrowUpRight size={18} /></Link></article>)}</div>
</div></section>;
export default AudienceSection;
