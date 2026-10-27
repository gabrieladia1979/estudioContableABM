import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const points = [
  ['Atención directa', 'La consulta inicial llega a Alejandra para conversar sobre tu actividad y lo que necesitás resolver.'],
  ['Información ordenada', 'Identificamos el tema, los plazos y la documentación necesaria para definir cómo avanzar.'],
  ['Desde CABA', 'El estudio está en Parque Patricios, Ciudad de Buenos Aires. Coordinamos la atención de cada consulta.'],
];

export default function AboutSection({ compact = false }) {
  const Heading = compact ? 'h2' : 'h1';
  const titleId = compact ? 'studio-intro-title' : 'studio-page-title';
  return <section
    id={compact ? 'el-estudio' : 'estudio'}
    className={'studio-presentation ' + (compact ? 'studio-presentation--compact' : 'studio-presentation--full')}
    aria-labelledby={titleId}
    onPointerMove={event => {
      if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--studio-pointer-x', (event.clientX - bounds.left) + 'px');
      event.currentTarget.style.setProperty('--studio-pointer-y', (event.clientY - bounds.top) + 'px');
      event.currentTarget.style.setProperty('--studio-pointer-opacity', '1');
    }}
    onPointerLeave={event => event.currentTarget.style.setProperty('--studio-pointer-opacity', '0')}
  >
    <div className="container mx-auto px-6">
      {compact ? <p className="studio-eyebrow">Conocé ABM</p> : <nav className="studio-breadcrumb" aria-label="Ruta de navegación"><Link to="/">Inicio</Link><span aria-hidden="true">/</span><span aria-current="page">El estudio</span></nav>}
      <div className="studio-brand-row">
        <div className="studio-brand-block">
          <img src="/branding/abm-firma.svg" alt="ABM" width="236" height="100" />
          <p>Estudio Contable<span>Contable e impositivo</span></p>
        </div>
        <Heading id={titleId} className="studio-lead-title">Una mirada profesional.<br /><span>Una atención personal.</span></Heading>
      </div>
      <div className="studio-divider" aria-hidden="true" />
      <p className="studio-opening">Asesoramiento contable e impositivo para personas, emprendedores y empresas. Desde Parque Patricios, CABA, con atención directa de su titular.</p>

      <div className="studio-story-grid">
        <div className="studio-story-heading">
          <p className="studio-eyebrow">El estudio</p>
          <h2>Tu actividad.<br /><span>Un trato cercano.</span></h2>
          <div className="studio-person">
            <h3>Alejandra Mayta</h3>
            <p>Contadora y administradora de empresas</p>
            <span>Titular de ABM Estudio Contable</span>
          </div>
        </div>
        <div className="studio-story-copy">
          <p>Alejandra recibe personalmente las consultas del estudio. La primera conversación permite conocer tu actividad, entender qué necesitás resolver y conversar sobre el alcance del trabajo antes de comenzar.</p>
          {!compact && <p>Cada situación tiene sus tiempos y su contexto. Por eso, empezamos por identificar el tema, los antecedentes y cualquier vencimiento cercano, para pedirte la información adecuada y explicarte los próximos pasos.</p>}
          <div className="studio-story-actions">
            <Link to={compact ? '/estudio' : '/contacto'} className="studio-text-link">{compact ? 'Conocé cómo trabajamos' : 'Conversemos sobre tu consulta'}<ArrowUpRight size={19} aria-hidden="true" /></Link>
            {!compact && <Link to="/servicios" className="studio-text-link studio-text-link--secondary">Explorá los servicios<ArrowUpRight size={19} aria-hidden="true" /></Link>}
          </div>
        </div>
      </div>

      {!compact && <>
        <div className="studio-principles" aria-label="Nuestra forma de acompañarte">
          {points.map(([title, text], index) => <article key={title}><span className="studio-principle-number">0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
        <div className="studio-contact-line"><div><p className="studio-eyebrow">El primer paso</p><h2>Contanos qué necesitás resolver.</h2></div><Link to="/contacto" className="studio-contact-button">Contactar al estudio<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
      </>}
    </div>
  </section>;
}
