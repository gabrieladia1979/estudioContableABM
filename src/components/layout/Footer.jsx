import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import WhatsAppIcon from '../WhatsAppIcon';
import { email, phoneDisplay, phoneHref, whatsappLink } from '../../data/contact';

const siteLinks = [['Inicio', '/'], ['El estudio', '/estudio'], ['Servicios', '/servicios'], ['Noticias', '/novedades'], ['Contacto', '/contacto']];
const serviceLinks = [['Impuestos', '/servicios#asesoramiento-tributario'], ['Contabilidad y gestión', '/servicios#contabilidad-balances'], ['Sueldos', '/servicios#sueldos'], ['Sociedades y cooperativas', '/servicios#crear-sociedad'], ['Profesionales y personas', '/servicios#personas']];

export default function Footer() {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';

  return <>
    <footer className="site-footer">
      <div className="container mx-auto px-6">
        <div className="site-footer-main">
          <div className="site-footer-intro">
            <Link to="/" className="site-footer-brand" aria-label="ABM Estudio Contable, inicio"><img src="/branding/abm-firma-inversa.svg" alt="" width="100" height="44" /><span><strong>Estudio Contable</strong><small>Contable e impositivo</small></span></Link>
            <p>Asesoramiento contable e impositivo con atención personal para personas, emprendedores y empresas.</p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="site-footer-cta"><WhatsAppIcon size={18} /> Hacer una consulta <ArrowUpRight size={17} aria-hidden="true" /></a>
          </div>
          <nav aria-label="Enlaces del footer"><h2>Explorá el sitio</h2>{siteLinks.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</nav>
          <nav aria-label="Áreas de servicios"><h2>Servicios</h2>{serviceLinks.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</nav>
          <div className="site-footer-contact"><h2>Hablemos</h2><a href={phoneHref}><Phone size={17} aria-hidden="true" /> {phoneDisplay}</a><a href={`mailto:${email}`}><Mail size={17} aria-hidden="true" /> {email}</a><p><MapPin size={17} aria-hidden="true" /> Parque Patricios, CABA</p><p className="site-footer-hours">Lunes a viernes · 9:30 a 18:00</p><a href="https://www.instagram.com/abm.estudiocontable/" target="_blank" rel="noopener noreferrer"><Instagram size={17} aria-hidden="true" /> Instagram</a></div>
        </div>
        <div className="site-footer-bottom"><span>© {new Date().getFullYear()} ABM Estudio Contable.</span><span>Fuentes de cotizaciones: <a href="https://dolarapi.com" target="_blank" rel="noopener noreferrer">DolarAPI</a> y <a href="https://www.bcra.gob.ar/apis-banco-central/" target="_blank" rel="noopener noreferrer">BCRA</a>.</span></div>
      </div>
    </footer>
    {!['/', '/contacto'].includes(normalizedPath) && <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105" aria-label="Consultar por WhatsApp"><WhatsAppIcon size={27} /></a>}
  </>;
}
