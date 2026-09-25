import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, MessageCircle, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { whatsappLink } from '../../data/contact';

const slides = [
  {
    label: 'Tu empresa, acompañada',
    eyebrow: 'ABM · Estudio contable e impositivo',
    title: 'Tu negocio crece.',
    emphasis: 'Estamos con vos.',
    description: 'Contabilidad, impuestos y sueldos para empresas y pymes. Un acompañamiento cercano para ordenar tu actividad y avanzar con claridad.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
    position: 'center 55%',
    link: '/servicios#pymes',
    action: 'Soluciones para empresas',
    message: 'Hola, quisiera consultar por el asesoramiento para mi empresa.',
  },
  {
    label: 'Tus números, en orden',
    eyebrow: 'Impuestos · Contabilidad · Sueldos',
    title: 'Menos pendientes.',
    emphasis: 'Más tranquilidad.',
    description: 'Te ayudamos a entender tus obligaciones y organizar la información de tu actividad. Asesoramiento para profesionales, autónomos y personas.',
    image: '/icons/image2.png',
    position: 'center',
    link: '/servicios#personas',
    action: 'Conocer los servicios',
    message: 'Hola, quisiera consultar por mis obligaciones contables e impositivas.',
  },
  {
    label: 'Tu próximo proyecto',
    eyebrow: 'Emprendedores · Constitución de sociedades',
    title: 'Una idea con futuro.',
    emphasis: 'Una base sólida.',
    description: 'Dale forma a tu proyecto con orientación para constituir tu sociedad y organizar su gestión contable e impositiva desde el comienzo.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=2000&q=85',
    position: 'center 45%',
    link: '/crear-sociedad',
    action: 'Crear mi sociedad',
    message: 'Hola, quisiera recibir asesoramiento para crear una sociedad.',
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const slide = slides[active];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(index => (index + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, reducedMotion, active]);

  const select = index => {
    setActive((index + slides.length) % slides.length);
    setPaused(true);
  };

  return (
    <section
      className="hero-showcase relative isolate overflow-hidden bg-primary-950 text-white"
      aria-label="Servicios destacados de ABM"
      aria-roledescription="carrusel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        {slides.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt=""
            fetchPriority={index === 0 ? 'high' : 'low'}
            className={`hero-photo absolute h-full w-full object-cover ${active === index ? 'hero-photo-active' : ''}`}
            style={{ objectPosition: item.position }}
          />
        ))}
      </div>
      <div className="hero-photo-shade absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container mx-auto flex min-h-[660px] flex-col justify-center px-6 pb-12 pt-16 text-center md:min-h-[650px] md:pb-16 md:pt-20">
        <div key={active} className="hero-copy mx-auto max-w-4xl">
          <p className="mb-7 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 md:text-sm">
            <span className="hidden h-px w-9 bg-accent-400 sm:block" aria-hidden="true" />
            {slide.eyebrow}
            <span className="hidden h-px w-9 bg-accent-400 sm:block" aria-hidden="true" />
          </p>
          <h1 className="text-[2.6rem] font-semibold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
            {slide.title}<span className="mt-2 block text-accent-200">{slide.emphasis}</span>
          </h1>
          <p className="mx-auto mb-9 mt-7 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">{slide.description}</p>
        </div>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <a href={whatsappLink(slide.message)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-7 py-4 font-bold text-white shadow-lg transition hover:bg-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><MessageCircle size={20} /> Hacer una consulta</a>
          <Link to={slide.link} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/50 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{slide.action}<ArrowRight size={18} /></Link>
        </div>
        <p className="mt-7 text-xs font-medium tracking-wide text-white/70">Parque Patricios, CABA · Atención personalizada</p>
      </div>

      <div className="border-t border-white/20 bg-primary-950/35 backdrop-blur-sm">
        <div className="container mx-auto flex items-center gap-4 py-5 pl-6 pr-24 md:gap-8 md:pr-6">
          <div className="flex flex-1 gap-3 md:gap-7" role="group" aria-label="Elegir diapositiva">
            {slides.map((item, index) => (
              <button type="button" key={item.label} onClick={() => select(index)} aria-label={`Diapositiva ${index + 1}: ${item.label}`} aria-pressed={active === index} className={`group flex min-w-0 flex-1 items-center gap-3 border-t-2 pt-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${active === index ? 'border-accent-400 text-white' : 'border-white/20 text-white/60 hover:border-white/60 hover:text-white'}`}>
                <span className="text-xs font-semibold tabular-nums">0{index + 1}</span>
                <span className="hidden text-xs font-semibold md:block lg:text-sm">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button type="button" onClick={() => select(active - 1)} className="hero-control" aria-label="Diapositiva anterior"><ArrowLeft size={18} /></button>
            {!reducedMotion && <button type="button" onClick={() => setPaused(!paused)} className="hero-control" aria-label={paused ? 'Reanudar carrusel' : 'Pausar carrusel'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}
            <button type="button" onClick={() => select(active + 1)} className="hero-control" aria-label="Diapositiva siguiente"><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
