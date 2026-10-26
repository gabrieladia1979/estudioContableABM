import WhatsAppIcon from '../WhatsAppIcon';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { whatsappLink } from '../../data/contact';
import MarketTicker from './MarketTicker';

const links = [
  ['/', 'Inicio'], ['/estudio', 'El estudio'], ['/servicios', 'Servicios'],
  ['/novedades', 'Noticias'], ['/contacto', 'Contacto'],
];

const serviceAreas = [
  ['Impuestos', [['Asesoramiento tributario', 'asesoramiento-tributario'], ['Monotributo', 'monotributo'], ['Intimaciones ARCA', 'intimaciones-arca']]],
  ['Contabilidad y gestión', [['Contabilidad y balances', 'contabilidad-balances'], ['Pymes', 'pymes']]],
  ['Sueldos', [['Sueldos y cargas sociales', 'sueldos']]],
  ['Sociedades', [['Empresas y sociedades', 'empresas-sociedades'], ['Crear sociedad o cooperativa', 'crear-sociedad']]],
  ['Profesionales y personas', [['Profesionales y personas', 'personas']]],
];

const Navbar = ({ overlay = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (!overlay) return;
    const update = () => setScrolled(window.scrollY > 60);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [overlay]);
  const closeMenus = () => { setMobileOpen(false); setServicesOpen(false); };

  return <header
    className={`site-header top-0 z-50 ${overlay ? `fixed inset-x-0 is-overlay ${scrolled ? 'is-scrolled' : ''}` : 'sticky'}`}
    onMouseLeave={() => setServicesOpen(false)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false); }}
    onKeyDown={event => { if (event.key === 'Escape') setServicesOpen(false); }}
  >
    <MarketTicker />
    <div className="site-nav-shell">
      <Link to="/" className="site-brand" aria-label="ABM Estudio Contable, inicio" onClick={closeMenus}>
        <img id="site-header-logo" src="/branding/abm-firma-inversa.svg" alt="" width="84" height="36" className="site-brand-mark" />
        <span className="site-brand-copy"><strong>Estudio Contable</strong><span>Contable e impositivo</span></span>
      </Link>
      <nav className="site-desktop-nav" aria-label="Navegación principal">
        {links.map(([to, label]) => <NavLink
          key={to}
          to={to}
          end={to === '/'}
          onMouseEnter={() => setServicesOpen(to === '/servicios')}
          onFocus={() => setServicesOpen(to === '/servicios')}
          onKeyDown={event => {
            if (to === '/servicios' && event.key === 'ArrowDown') {
              event.preventDefault();
              setServicesOpen(true);
              requestAnimationFrame(() => document.querySelector('#services-megamenu a')?.focus());
            }
          }}
          onClick={closeMenus}
          aria-expanded={to === '/servicios' ? servicesOpen : undefined}
          aria-controls={to === '/servicios' ? 'services-megamenu' : undefined}
          className={({ isActive }) => `site-nav-link ${isActive ? 'is-active' : ''}`}
        >{label}</NavLink>)}
      </nav>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="site-consult"><WhatsAppIcon size={19} /> Consultar</a>
      <button type="button" onClick={() => setMobileOpen(value => !value)} className="site-mobile-toggle" aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={mobileOpen} aria-controls="mobile-navigation">{mobileOpen ? <X size={26} /> : <Menu size={26} />}</button>
    </div>
    {servicesOpen && <div id="services-megamenu" className="site-megamenu hidden xl:block">
      <div className="site-megamenu-inner">
        <div className="site-megamenu-intro"><span>Explorá los servicios</span><h2>¿En qué podemos ayudarte?</h2><Link to="/servicios" onClick={closeMenus}>Ver todos los servicios →</Link></div>
        {serviceAreas.map(([area, items]) => <div key={area} className="site-megamenu-group"><h3>{area}</h3>{items.map(([label, id]) => <Link key={id} to={`/servicios#${id}`} onClick={closeMenus}>{label}</Link>)}</div>)}
      </div>
    </div>}
    {mobileOpen && <nav id="mobile-navigation" className="site-mobile-nav xl:hidden" aria-label="Navegación móvil">
      {links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={closeMenus} className={({ isActive }) => `site-mobile-link ${isActive ? 'is-active' : ''}`}>{label}</NavLink>)}
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="site-mobile-consult"><WhatsAppIcon size={18} /> Consultar por WhatsApp</a>
    </nav>}
  </header>;
};

export default Navbar;
