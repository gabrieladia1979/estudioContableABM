import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StudioIntroSection() {
  return (
    <section className="border-b border-primary-100 bg-white py-16 md:py-20" aria-labelledby="studio-intro-title">
      <div className="container mx-auto grid items-center gap-8 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-accent-700">El estudio</p>
          <h2 id="studio-intro-title" className="max-w-2xl text-3xl font-bold leading-tight tracking-tight text-primary-950 md:text-4xl">Una conversación clara para empezar a resolver.</h2>
        </div>
        <div className="border-l-2 border-accent-500 pl-6 md:pl-8">
          <p className="text-lg leading-relaxed text-primary-800">Alejandra Mayta, contadora y administradora de empresas, recibe personalmente las consultas de ABM Estudio Contable en CABA.</p>
          <Link to="/estudio" className="mt-6 inline-flex items-center gap-2 font-bold text-accent-700 transition hover:text-accent-800">Conocé el estudio <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
