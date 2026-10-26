import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeading from '../components/layout/PageHeading';
import GroupedServiceExplorer from '../components/sections/GroupedServiceExplorer';

const ServiciosPage = () => {
  return (
    <div className="bg-[#f7f9fb]">
      <Navbar />
      <main>
        <PageHeading title="Servicios" description="Encontrá el asesoramiento contable e impositivo que necesita tu actividad." />

        <GroupedServiceExplorer />

        <section className="bg-primary-900 py-20 text-white"><div className="container mx-auto flex flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between"><div className="max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-200">Hablemos de tu caso</p><h2 className="text-3xl font-bold md:text-4xl">¿No sabés por dónde empezar?</h2><p className="mt-4 text-lg leading-relaxed text-primary-100">Contanos qué actividad realizás y qué necesitás resolver. Te ayudamos a identificar el servicio adecuado.</p></div><Link to="/contacto" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent-500 px-7 py-4 font-bold transition hover:bg-accent-600">Contactar al estudio <ArrowRight size={19} /></Link></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiciosPage;
