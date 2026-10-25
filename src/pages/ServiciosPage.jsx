import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import GroupedServiceExplorer from '../components/sections/GroupedServiceExplorer';

const ServiciosPage = () => {
  return (
    <div className="bg-[#f7f9fb]">
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden bg-primary-950 text-white">
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" aria-hidden="true" />
          <div className="container relative z-10 mx-auto grid min-h-[460px] items-center gap-10 px-6 py-20 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.18em] text-accent-200">Servicios profesionales · ABM</p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">Soluciones para cada etapa de tu actividad.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">Impuestos, contabilidad, sueldos y asesoramiento para empresas, pymes y personas. Encontrá el servicio que necesitás y contanos tu situación.</p>
              <a href="#explorar-servicios" className="mt-9 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-7 py-4 font-bold text-white transition hover:bg-accent-600">Explorar servicios <ArrowDown size={18} /></a>
            </div>
            <div className="hidden justify-self-end rounded-2xl border border-white/20 bg-primary-950/35 p-7 backdrop-blur-sm lg:block">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-accent-200">Trabajamos con</p>
              <div className="space-y-4 text-xl font-semibold"><p>Empresas y pymes</p><div className="h-px bg-white/20" /><p>Emprendedores</p><div className="h-px bg-white/20" /><p>Profesionales y personas</p></div>
            </div>
          </div>
        </section>

        <GroupedServiceExplorer />

        <section className="bg-primary-900 py-20 text-white"><div className="container mx-auto flex flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between"><div className="max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-200">Hablemos de tu caso</p><h2 className="text-3xl font-bold md:text-4xl">¿No sabés por dónde empezar?</h2><p className="mt-4 text-lg leading-relaxed text-primary-100">Contanos qué actividad realizás y qué necesitás resolver. Te ayudamos a identificar el servicio adecuado.</p></div><Link to="/contacto" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent-500 px-7 py-4 font-bold transition hover:bg-accent-600">Contactar al estudio <ArrowRight size={19} /></Link></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiciosPage;
