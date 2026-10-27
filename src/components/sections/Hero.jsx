import { useEffect, useState } from 'react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from '../WhatsAppIcon';
import { whatsappLink } from '../../data/contact';

const slides = [
  { label: 'Negocios y pymes', topic: 'Contabilidad para tu empresa', eyebrow: 'ABM · Estudio contable en CABA', title: 'Tu negocio merece cuentas claras.', description: 'Impuestos, contabilidad y sueldos para acompañar cada etapa de tu actividad. Contanos qué necesitás resolver.', image: '/hero-v2/pymes-hero.webp', thumb: '/hero-v2/pymes-thumb.webp', link: '/servicios#pymes', action: 'Ver servicios para pymes', message: 'Hola, quisiera consultar por los servicios contables para mi negocio.' },
  { label: 'Sociedades', topic: 'Crear una sociedad', eyebrow: 'Para proyectos que crecen', title: 'Dale una estructura clara a tu proyecto.', description: 'Te acompañamos en la constitución de tu sociedad y en sus primeros pasos contables e impositivos.', image: '/hero-v2/sociedades-hero.webp', thumb: '/hero-v2/sociedades-thumb.webp', link: '/servicios#crear-sociedad', action: 'Conocer el servicio', message: 'Hola, quisiera consultar sobre la creación de una sociedad.' },
  { label: 'Balances e impuestos', topic: 'Ordenar tus números', eyebrow: 'Información para decidir mejor', title: 'Números claros para seguir creciendo.', description: 'Organizamos la información contable, los balances y tus obligaciones fiscales para que puedas decidir con confianza.', image: '/hero-v2/balances-hero.webp', thumb: '/hero-v2/balances-thumb.webp', link: '/servicios#contabilidad-balances', action: 'Ver contabilidad y balances', message: 'Hola, quisiera consultar sobre contabilidad, balances e impuestos.' },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
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
    if (paused || focused || reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive(index => (index + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, focused, reducedMotion]);

  const slide = slides[active];

  return <section className="home-hero" aria-label="Servicios destacados de ABM" aria-roledescription="carrusel" onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
    <img key={slide.image} className="home-hero-photo hero-photo-motion" src={slide.image} width="1672" height="941" alt="" fetchPriority={active === 0 ? 'high' : 'auto'} decoding="async" />
    <div className="home-hero-shade" aria-hidden="true" />
    <div id="hero-slide" className="home-hero-content" role="group" aria-roledescription="diapositiva" aria-label={`${active + 1} de ${slides.length}: ${slide.label}`} aria-live={paused ? 'polite' : 'off'}>
      <div key={active} className="hero-reveal">
        <p className="home-hero-eyebrow">{slide.eyebrow}</p>
        <h1>{slide.title}</h1>
        <p className="home-hero-description">{slide.description}</p>
        <div className="home-hero-actions">
          <a href={whatsappLink(slide.message)} target="_blank" rel="noopener noreferrer" className="home-hero-primary"><WhatsAppIcon size={18} /> Escribir por WhatsApp</a>
          <Link to={slide.link} className="home-hero-secondary">{slide.action}<ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
      </div>
    </div>
    {!reducedMotion && <button type="button" className="home-hero-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Reanudar carrusel' : 'Pausar carrusel'}>{paused ? <Play size={18} /> : <Pause size={18} />}</button>}
  </section>;
}
