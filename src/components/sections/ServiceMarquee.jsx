import { Link } from 'react-router-dom';

const services = [
  ['Asesoramiento impositivo', 'asesoramiento-tributario'],
  ['Contabilidad y balances', 'contabilidad-balances'],
  ['Consultoría financiera', 'consultoria-financiera'],
  ['Constitución de sociedades', 'crear-sociedad'],
  ['Monotributo', 'monotributo'],
  ['Sueldos y cargas sociales', 'sueldos'],
  ['Gestión para pymes', 'pymes'],
  ['Intimaciones de ARCA', 'intimaciones-arca'],
];

export default function ServiceMarquee() {
  return <section className="service-marquee" aria-label="Explorar servicios contables">
    <div className="service-marquee-track">
      <div className="service-marquee-group">
        {services.map(([label, id]) => <Link key={id} to={`/servicios#${id}`}>{label}<span aria-hidden="true">✦</span></Link>)}
      </div>
      <div className="service-marquee-group" aria-hidden="true">
        {services.map(([label, id]) => <span key={id}>{label}<span>✦</span></span>)}
      </div>
    </div>
  </section>;
}
