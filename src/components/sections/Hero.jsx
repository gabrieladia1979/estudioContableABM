import React from 'react';
import { ArrowRight, Building2, FileWarning, MessageCircle, ReceiptText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { whatsappLink } from '../../data/contact';

const quickPaths = [
  { to: '/monotributo', icon: ReceiptText, title: 'Monotributo', text: 'Alta, seguimiento o una duda sobre tu situación actual.' },
  { to: '/intimaciones-arca', icon: FileWarning, title: 'Recibí una intimación', text: 'Contanos qué organismo te escribió y si hay un plazo indicado.' },
  { to: '/servicios#pymes', icon: Building2, title: 'Mi empresa o pyme', text: 'Impuestos, contabilidad, balances y sueldos.' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-950 text-white">
      <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-36 left-[-8rem] h-96 w-96 rounded-full bg-accent-700/15 blur-3xl" aria-hidden="true" />
      <div className="container relative mx-auto grid gap-12 px-6 pb-16 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-24">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-accent-200">ABM · Estudio contable en CABA</p>
          <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">Contanos qué necesitás resolver. <span className="text-accent-200">Empecemos por ahí.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-primary-100">Acompañamos a personas, emprendedores y empresas en temas contables e impositivos. Dejá tu consulta inicial y el estudio te indicará cómo continuar.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contacto" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-700 px-6 py-4 font-bold text-white transition hover:bg-accent-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Dejar una consulta <ArrowRight size={19} /></Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/45 px-6 py-4 font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><MessageCircle size={19} /> Escribir por WhatsApp</a>
          </div>
          <p className="mt-6 text-sm text-primary-200">Podés dejarnos tu mensaje en cualquier momento. Respondemos durante el horario de atención.</p>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white/5 p-5 shadow-2xl backdrop-blur-sm sm:p-7">
          <h2 className="mb-5 text-xl font-bold">Elegí el motivo de tu consulta</h2>
          <div className="grid gap-3">
            {quickPaths.map(({ to, icon: Icon, title, text }) => (
              <Link key={to} to={to} className="group flex items-start gap-4 rounded-xl border border-white/15 bg-white/5 p-4 transition hover:border-accent-300/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-200">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-700/25 text-accent-200">{React.createElement(Icon, { size: 23 })}</span>
                <span className="flex-1"><strong className="block text-base">{title}</strong><span className="mt-1 block text-sm leading-relaxed text-primary-100">{text}</span></span>
                <ArrowRight className="mt-1 shrink-0 text-accent-200 transition group-hover:translate-x-1" size={18} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
