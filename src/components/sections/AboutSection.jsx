import React from 'react';
import { ArrowRight, ClipboardList, MapPin, MessagesSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const points = [
  { icon: MessagesSquare, title: 'Atención directa', text: 'Tu consulta inicial llega al estudio y Alejandra te responde para conversar sobre el caso.' },
  { icon: ClipboardList, title: 'Información ordenada', text: 'Primero identificamos el tema, los plazos y los datos necesarios para definir el alcance del trabajo.' },
  { icon: MapPin, title: 'Base en CABA', text: 'ABM Estudio Contable está en Parque Patricios, Ciudad de Buenos Aires.' },
];

export default function AboutSection() {
  return (
    <section id="estudio" className="bg-white px-6 py-16 md:py-24">
      <div className="container mx-auto grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div className="rounded-3xl bg-primary-950 p-8 text-white md:p-12">
          <span className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl font-black tracking-tight text-primary-950">ABM</span>
          <p className="text-sm font-bold uppercase tracking-[0.17em] text-accent-200">Quién está detrás del estudio</p>
          <h2 className="mt-4 text-3xl font-bold">Alejandra Myta</h2>
          <p className="mt-2 text-lg text-primary-100">Titular de ABM Estudio Contable</p>
          <div className="mt-8 border-t border-white/20 pt-6 text-sm leading-relaxed text-primary-100">Un estudio independiente con atención personalizada. La primera conversación permite entender tu necesidad y definir cómo seguir.</div>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-accent-700">Sobre ABM</p>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-primary-900 md:text-4xl">Un contacto claro desde la primera consulta</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">ABM brinda atención inicial a personas, emprendedores y empresas que necesitan ordenar una situación contable o impositiva. Alejandra Myta recibe las consultas del estudio y conversa sobre el alcance antes de comenzar un trabajo.</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-gray-700">Contanos cuál es el problema, tu actividad y si hay un vencimiento cercano. Así podemos pedirte la información adecuada y explicarte los próximos pasos.</p>
          <Link to="/contacto" className="mt-8 inline-flex items-center gap-2 font-bold text-accent-700 hover:text-accent-800">Escribir al estudio <ArrowRight size={19} /></Link>
        </div>
      </div>
      <div className="container mx-auto mt-12 grid gap-5 md:grid-cols-3">{points.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-primary-100 p-7">{React.createElement(Icon, { className: 'mb-5 text-accent-700', size: 28 })}<h3 className="text-xl font-bold text-primary-900">{title}</h3><p className="mt-3 leading-relaxed text-gray-700">{text}</p></article>)}</div>
    </section>
  );
}
