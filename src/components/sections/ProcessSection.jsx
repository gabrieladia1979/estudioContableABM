import React from 'react';
import { ArrowRight, MessageSquareText, ListChecks, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { icon: MessageSquareText, title: 'Nos contás tu consulta', text: 'Explicás tu actividad, lo que necesitás resolver y si hay algún plazo próximo.' },
  { icon: ListChecks, title: 'Revisamos el alcance', text: 'Te indicamos qué información hace falta y qué servicios pueden servirte.' },
  { icon: Handshake, title: 'Empezamos a trabajar', text: 'Acordamos las tareas y mantenemos una comunicación clara durante el proceso.' },
];
const ProcessSection = () => <section className="bg-white py-20 md:py-24"><div className="container mx-auto px-6"><div className="mx-auto mb-12 max-w-2xl text-center"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-600">Trabajar con ABM</p><h2 className="text-3xl font-bold text-primary-900 md:text-4xl">Empezar es simple</h2><p className="mt-4 text-lg text-gray-600">Una primera conversación nos permite conocer tu situación y explicarte cómo podemos acompañarte.</p></div><div className="grid gap-6 md:grid-cols-3">{steps.map(({ icon: Icon, title, text }, index) => <div className="rounded-2xl border border-primary-100 p-7" key={title}><div className="mb-7 flex items-center justify-between">{React.createElement(Icon, { className: 'text-accent-600', size: 30 })}<span className="text-3xl font-bold text-primary-700">0{index + 1}</span></div><h3 className="mb-3 text-xl font-bold text-primary-900">{title}</h3><p className="leading-relaxed text-gray-600">{text}</p></div>)}</div><div className="mt-10 text-center"><Link className="inline-flex items-center gap-2 font-bold text-primary-800 hover:text-accent-700" to="/contacto">Ver las formas de contacto <ArrowRight size={18} /></Link></div></div></section>;
export default ProcessSection;
