import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { serviceGroups } from '../../data/serviceGroups';

export default function ServicesSection() {
  const [active, setActive] = useState(null);

  return <section id="servicios" className="home-services" aria-labelledby="home-services-title">
    <div className="container mx-auto px-6">
      <p className="home-services-eyebrow">Servicios · 5 áreas</p>
      <h2 id="home-services-title">Un servicio para cada etapa de tu actividad.</h2>
      <p className="home-services-intro">Asesoramiento contable e impositivo para personas, profesionales, emprendedores y empresas. Elegí un área para conocer los servicios disponibles.</p>
      <div className="home-services-cards" aria-label="Áreas de servicios">
        {serviceGroups.map((group, index) => <article key={group.id} className={`home-service-card ${active === index ? 'is-active' : ''}`}>
          <button type="button" onClick={() => setActive(index)} aria-label={`Ver servicios de ${group.title}`} aria-expanded={active === index} aria-controls={`home-service-detail-${group.id}`}>
            <img src={group.image} alt="" loading="lazy" style={{ objectPosition: group.position }} />
            <span className="home-service-shade" aria-hidden="true" />
            <span className="home-service-card-title">{group.title}</span>
          </button>
          <div id={`home-service-detail-${group.id}`} className="home-service-detail" aria-hidden={active !== index} inert={active !== index}>
            <div className="home-service-detail-top"><span className="home-service-number">0{index + 1} / 0{serviceGroups.length}</span><button type="button" onClick={() => setActive(null)} aria-label={`Cerrar ${group.title}`}><X size={17} /></button></div>
            <div><h3>{group.title}</h3><p>{group.description}</p><ul>{group.links.map(([label, to]) => <li key={label}><Link to={to}>{label}<ArrowRight size={15} aria-hidden="true" /></Link></li>)}</ul></div>
            <Link to="/servicios" className="home-service-all" aria-label="Ver todos los servicios"><ArrowRight size={19} aria-hidden="true" /></Link>
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
