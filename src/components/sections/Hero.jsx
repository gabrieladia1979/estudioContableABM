import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, FileWarning, MessageCircle, Pause, Play, ReceiptText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { whatsappLink } from '../../data/contact';

const slides = [
  {
    label: 'Negocios y pymes',
    eyebrow: 'ABM · Estudio contable en CABA',
    title: 'Tu negocio merece cuentas claras.',
    description: 'Impuestos, contabilidad y sueldos para acompañar cada etapa de tu actividad. Contanos qué necesitás resolver.',
    image: '/hero/hero-negocios.webp',
    link: '/servicios#pymes',
    action: 'Ver servicios para pymes',
    message: 'Hola, quisiera consultar por los servicios contables para mi negocio.',
  },
  {
    label: 'Monotributo',
    eyebrow: 'Para quienes trabajan por cuenta propia',
    title: '¿Empezás con monotributo?',
    description: 'Si tenés dudas sobre el alta, tu actividad o un cambio en tu situación, explicanos brevemente el caso para orientarte sobre los próximos pasos.',
    image: '/hero/hero-monotributo.webp',
    link: '/monotributo',
    action: 'Consultar sobre monotributo',
    message: 'Hola, quisiera consultar por monotributo. Mi situación es: ',
  },
  {
    label: 'Comunicaciones de ARCA',
    eyebrow: 'Consultas con un plazo o requerimiento',
    title: '¿Recibiste una comunicación de ARCA?',
    description: 'Contanos qué aviso recibiste y si indica un vencimiento. Alejandra revisará tu consulta durante el horario de atención.',
    image: '/hero/hero-arca.webp',
    link: '/intimaciones-arca',
    action: 'Ver cómo consultar',
    message: 'Hola, recibí una comunicación de ARCA y quisiera hacer una consulta. El plazo indicado es: ',
  },
];

const quickPaths = [
  { to: '/monotributo', icon: ReceiptText, title: 'Monotributo', text: 'Alta, seguimiento o una duda sobre tu situación.' },
  { to: '/intimaciones-arca', icon: FileWarning, title: 'Intimaciones de ARCA', text: 'Qué información reunir para iniciar la consulta.' },
  { to: '/servicios#pymes', icon: Building2, title: 'Empresa o pyme', text: 'Impuestos, balances, contabilidad y sueldos.' },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (paused || hovered || focused || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(index => (index + 1) % slides.length);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, focused, reducedMotion]);

  const select = index => {
    setActive((index + slides.length) % slides.length);
    setPaused(true);
  };
  const slide = slides[active];

  return <>
    <section
      className="relative isolate overflow-hidden bg-primary-950 text-white"
      aria-label="Servicios destacados de ABM"
      aria-roledescription="carrusel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <div className="relative h-56 overflow-hidden sm:h-72 md:absolute md:inset-0 md:h-auto" aria-hidden="true">
        <img key={slide.image} src={slide.image} alt="" width="1599" height="900" fetchPriority={active === 0 ? 'high' : 'auto'} className="h-full w-full object-cover object-[65%_center] md:object-center" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-primary-950 via-primary-950/95 to-primary-950/30 md:block" />
      </div>
      <div className="absolute right-4 top-56 z-10 flex -translate-y-full items-center gap-1 rounded-lg bg-primary-950/85 p-1 text-white sm:top-72 md:hidden">
        <button type="button" onClick={() => select(active - 1)} className="rounded p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label="Diapositiva anterior" aria-controls="hero-slide"><ArrowLeft size={19} /></button>
        <span className="px-1 text-xs font-bold tabular-nums" aria-hidden="true">{active + 1}/{slides.length}</span>
        <button type="button" onClick={() => select(active + 1)} className="rounded p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label="Diapositiva siguiente" aria-controls="hero-slide"><ArrowRight size={19} /></button>
      </div>
      <div id="hero-slide" className="container relative mx-auto flex min-h-[440px] items-center px-6 pb-12 pt-12 md:min-h-[560px] md:py-20" role="group" aria-roledescription="diapositiva" aria-label={`${active + 1} de ${slides.length}: ${slide.label}`} aria-live={paused ? 'polite' : 'off'}>
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-accent-200 sm:text-sm">{slide.eyebrow}</p>
          <h1 className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">{slide.title}</h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-100 sm:text-lg">{slide.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsappLink(slide.message)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-700 px-6 py-4 font-bold text-white transition hover:bg-accent-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><MessageCircle size={19} /> Escribir por WhatsApp</a>
            <Link to={slide.link} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/50 px-6 py-4 font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{slide.action} <ArrowRight size={18} /></Link>
          </div>
          <p className="mt-6 text-sm text-primary-200">Podés dejar tu mensaje en cualquier momento. Respondemos durante el horario de atención.</p>
          <p className="mt-2 text-xs text-primary-300">Imágenes ilustrativas.</p>
        </div>
      </div>
      <div className="relative border-t border-white/15 bg-primary-950/80">
        <div className="container mx-auto flex items-center gap-4 px-6 py-4">
          <div className="flex flex-1 gap-2" role="group" aria-label="Elegir diapositiva">
            {slides.map((item, index) => <button key={item.label} type="button" onClick={() => select(index)} aria-label={`Diapositiva ${index + 1}: ${item.label}`} aria-pressed={active === index} aria-controls="hero-slide" className={`min-w-0 flex-1 border-t-2 pt-2 text-left text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${active === index ? 'border-accent-300 text-white' : 'border-white/30 text-primary-200 hover:border-white hover:text-white'}`}><span>0{index + 1}</span><span className="ml-2 hidden sm:inline">{item.label}</span></button>)}
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <button type="button" onClick={() => select(active - 1)} className="rounded-lg p-2 text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label="Diapositiva anterior"><ArrowLeft size={20} /></button>
            {!reducedMotion && <button type="button" onClick={() => setPaused(value => !value)} className="rounded-lg p-2 text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label={paused ? 'Reanudar carrusel' : 'Pausar carrusel'}>{paused ? <Play size={18} /> : <Pause size={18} />}</button>}
            <button type="button" onClick={() => select(active + 1)} className="rounded-lg p-2 text-white transition hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label="Diapositiva siguiente"><ArrowRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#f4f7fa] py-10" aria-label="Consultas frecuentes">
      <div className="container mx-auto grid gap-4 px-6 md:grid-cols-3">
        {quickPaths.map(({ to, icon: Icon, title, text }) => <Link key={to} to={to} className="group flex items-start gap-4 rounded-2xl border border-primary-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-700"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-accent-700">{React.createElement(Icon, { size: 22 })}</span><span className="flex-1"><strong className="block text-primary-900">{title}</strong><span className="mt-1 block text-sm leading-relaxed text-gray-600">{text}</span></span><ArrowRight size={18} className="mt-1 shrink-0 text-accent-700 transition group-hover:translate-x-1" aria-hidden="true" /></Link>)}
      </div>
    </section>
  </>;
}
