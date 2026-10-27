const services = [
  'Asesoramiento impositivo',
  'Contabilidad y balances',
  'Consultoría financiera',
  'Constitución de sociedades',
  'Monotributo',
  'Sueldos y cargas sociales',
  'Gestión para pymes',
  'Intimaciones de ARCA',
];

export default function ServiceMarquee() {
  return <section className="service-marquee" aria-label="Tipos de servicios contables">
    <div className="service-marquee-track">
      <div className="service-marquee-group">
        {services.map(label => <span key={label}>{label}<span aria-hidden="true">✦</span></span>)}
      </div>
      <div className="service-marquee-group" aria-hidden="true">
        {services.map(label => <span key={label}>{label}<span>✦</span></span>)}
      </div>
    </div>
  </section>;
}
