import React from 'react';
import { ArrowRight, ClipboardList, FileWarning, Instagram, ReceiptText } from 'lucide-react';
import { Link } from 'react-router-dom';

const guides = [
  {
    icon: ReceiptText,
    title: 'Consulta por monotributo',
    text: 'Qué datos conviene contar en el primer mensaje si vas a empezar, ya estás inscripto o algo cambió en tu actividad.',
    to: '/monotributo',
  },
  {
    icon: FileWarning,
    title: 'Recibí una intimación de ARCA',
    text: 'Cómo iniciar la consulta sin compartir claves ni documentación sensible en el formulario público.',
    to: '/intimaciones-arca',
  },
  {
    icon: ClipboardList,
    title: 'Prepará tu primera consulta',
    text: 'Tené a mano tu actividad, el motivo de la consulta, comunicaciones recibidas y cualquier fecha próxima que figure en ellas.',
    to: '/contacto',
  },
];

export default function NewsSection() {
  return (
    <section className="bg-primary-50 px-6 py-16 md:py-20">
      <div className="container mx-auto">
        <div className="max-w-3xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-accent-700">Recursos para empezar</p><h2 className="text-3xl font-bold text-primary-900 md:text-4xl">Encontrá el siguiente paso para tu consulta</h2><p className="mt-4 text-lg leading-relaxed text-gray-700">Estas guías te ayudan a contarnos tu situación inicial. La evaluación de cada caso se hace en conversación con el estudio.</p></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">{guides.map(({ icon: Icon, title, text, to }) => <article key={to} className="flex flex-col rounded-2xl border border-primary-100 bg-white p-7">{React.createElement(Icon, { className: 'mb-6 text-accent-700', size: 30 })}<h3 className="text-xl font-bold text-primary-900">{title}</h3><p className="mt-3 flex-1 leading-relaxed text-gray-700">{text}</p><Link to={to} className="mt-6 inline-flex items-center gap-2 font-bold text-accent-700 hover:text-accent-800">Ver orientación <ArrowRight size={17} /></Link></article>)}</div>
        <div className="mt-10 flex flex-wrap items-center gap-4"><p className="text-gray-700">También compartimos novedades del estudio en Instagram.</p><a href="https://www.instagram.com/abm.estudiocontable/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-primary-900 px-5 py-3 font-bold text-primary-900 hover:bg-white"><Instagram size={19} /> Ver Instagram</a></div>
      </div>
    </section>
  );
}
