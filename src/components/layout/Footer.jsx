import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { email, phoneDisplay, phoneHref, whatsappLink } from '../../data/contact';

const Footer = () => {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  return <>
  <footer className="bg-primary-900 text-primary-100"><div className="container mx-auto grid gap-10 px-6 py-16 md:grid-cols-3">
    <div><Link to="/" className="mb-5 inline-flex items-center gap-3 text-white"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white font-extrabold text-primary-900">ABM</span><strong className="text-lg">Estudio Contable</strong></Link><p className="max-w-sm leading-relaxed">Asesoramiento contable e impositivo para empresas, emprendedores y personas.</p></div>
    <div><h2 className="mb-5 font-bold text-white">Explorá el sitio</h2><div className="grid gap-3 text-sm"><Link to="/estudio" className="hover:text-white">El estudio</Link><Link to="/servicios" className="hover:text-white">Servicios</Link><Link to="/monotributo" className="hover:text-white">Monotributo</Link><Link to="/intimaciones-arca" className="hover:text-white">Intimaciones ARCA</Link><Link to="/crear-sociedad" className="hover:text-white">Crear sociedad</Link><Link to="/novedades" className="hover:text-white">Recursos</Link></div></div>
    <div><h2 className="mb-5 font-bold text-white">Hablemos</h2><div className="grid gap-3 text-sm"><a href={phoneHref} className="flex items-center gap-2 hover:text-white"><Phone size={17} /> {phoneDisplay}</a><a href={`mailto:${email}`} className="flex items-center gap-2 break-all hover:text-white"><Mail size={17} className="shrink-0" /> {email}</a><p className="flex items-center gap-2"><MapPin size={17} /> Parque Patricios, CABA</p><p>Lunes a viernes · 9:30 a 18:00</p><a href="https://www.instagram.com/abm.estudiocontable/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white"><Instagram size={17} /> Instagram</a></div></div>
  </div><div className="border-t border-white/10 px-6 py-5 text-center text-xs text-primary-200">© {new Date().getFullYear()} ABM Estudio Contable.</div></footer>
  {!['/', '/contacto'].includes(normalizedPath) && <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105" aria-label="Consultar por WhatsApp"><MessageCircle size={27} /></a>}
</>;
};
export default Footer;
