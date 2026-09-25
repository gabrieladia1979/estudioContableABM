import { useEffect } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { whatsappLink } from '../data/contact';
import { serviceDetails } from '../data/serviceDetails';

const ServiciosPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, [hash]);

  return (
    <div className="bg-[#f7f9fb]">
      <Navbar />
      <main>
        <section className="relative isolate overflow-hidden bg-primary-900 text-white">
          <img src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1800&q=85" alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-primary-950/75" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/80 to-transparent" aria-hidden="true" />
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

        <section id="explorar-servicios" className="container mx-auto px-6 pb-12 pt-20 md:pt-24">
          <div className="mb-10 max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-700">Encontrá tu punto de partida</p><h2 className="text-3xl font-bold text-primary-900 md:text-4xl">¿En qué podemos ayudarte?</h2><p className="mt-4 text-lg text-gray-600">Elegí un área para ver el alcance del servicio. Si tu consulta abarca varios temas, podemos orientarte desde el primer contacto.</p></div>
          <nav aria-label="Ir a un servicio" className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {serviceDetails.map(service => <a key={service.id} href={`#${service.id}`} className="group flex min-h-36 flex-col justify-between rounded-xl border border-primary-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-accent-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"><img src={service.icon} alt="" className="h-11 w-11 object-contain" /><span className="mt-5 flex items-end justify-between gap-2 text-sm font-bold leading-snug text-primary-900 group-hover:text-accent-700">{service.title}<ArrowUpRight size={16} className="shrink-0" /></span></a>)}
          </nav>
        </section>

        <div className="container mx-auto space-y-6 px-6 pb-20 md:pb-24">
          {serviceDetails.map((service, index) => (
            <section id={service.id} key={service.id} className="scroll-mt-28 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.39fr_0.61fr]">
                <div className={`relative p-7 md:p-10 ${index % 2 === 0 ? 'bg-primary-900 text-white' : 'bg-[#eaf0f5] text-primary-900'}`}>
                  <span className={`absolute right-7 top-6 text-5xl font-bold ${index % 2 === 0 ? 'text-white/10' : 'text-primary-200'}`} aria-hidden="true">0{index + 1}</span>
                  <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-xl bg-white p-3 shadow-sm"><img src={service.icon} alt="" className="h-full w-full object-contain" /></div>
                  <p className={`mb-3 text-xs font-bold uppercase tracking-[0.17em] ${index % 2 === 0 ? 'text-accent-200' : 'text-accent-700'}`}>{service.category}</p>
                  <h2 className="mb-5 max-w-sm text-3xl font-bold leading-tight">{service.title}</h2>
                  <p className={`max-w-md text-lg leading-relaxed ${index % 2 === 0 ? 'text-primary-100' : 'text-primary-800'}`}>{service.summary}</p>
                  <div className={`mt-8 border-t pt-6 ${index % 2 === 0 ? 'border-white/20' : 'border-primary-200'}`}><p className="mb-2 text-xs font-bold uppercase tracking-[0.15em]">¿Para quién?</p><p className={`leading-relaxed ${index % 2 === 0 ? 'text-primary-100' : 'text-primary-800'}`}>{service.fit}</p></div>
                </div>
                <div className="flex flex-col p-7 md:p-10">
                  <p className="mb-6 text-sm font-bold uppercase tracking-[0.15em] text-accent-700">Qué podemos hacer</p>
                  <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {service.items.map(item => <li key={item} className="flex items-start gap-3 leading-relaxed text-gray-700"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-50 text-accent-700"><Check size={13} strokeWidth={3} /></span><span>{item}</span></li>)}
                  </ul>
                  <a href={whatsappLink(`Hola, quisiera consultar por ${service.title.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex self-start items-center gap-2 rounded-lg bg-accent-500 px-6 py-3.5 font-bold text-white transition hover:bg-accent-600"><MessageCircle size={19} /> Consultar por este servicio <ArrowRight size={18} /></a>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="bg-primary-900 py-20 text-white"><div className="container mx-auto flex flex-col gap-8 px-6 md:flex-row md:items-center md:justify-between"><div className="max-w-2xl"><p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-200">Hablemos de tu caso</p><h2 className="text-3xl font-bold md:text-4xl">¿No sabés por dónde empezar?</h2><p className="mt-4 text-lg leading-relaxed text-primary-100">Contanos qué actividad realizás y qué necesitás resolver. Te ayudamos a identificar el servicio adecuado.</p></div><Link to="/contacto" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-accent-500 px-7 py-4 font-bold transition hover:bg-accent-600">Contactar al estudio <ArrowRight size={19} /></Link></div></section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiciosPage;
