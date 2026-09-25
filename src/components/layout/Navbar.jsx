import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';
import { whatsappLink } from '../../data/contact';

const links = [
  ['/', 'Inicio'], ['/estudio', 'El estudio'], ['/servicios', 'Servicios'],
  ['/crear-sociedad', 'Crear sociedad'], ['/novedades', 'Recursos'], ['/contacto', 'Contacto'],
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-primary-100 bg-white/95 shadow-sm backdrop-blur">
    <div className="container mx-auto flex h-20 items-center justify-between gap-4 px-6">
      <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="ABM Estudio Contable, inicio">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-primary-100"><img src="/icons/isabella%20soler.jpg" alt="Logo de ABM Estudio Contable" className="h-full w-full object-contain" /></span>
        <span className="hidden leading-tight sm:block"><strong className="block text-base text-primary-900">Estudio Contable</strong><span className="text-xs font-semibold uppercase tracking-[0.12em] text-accent-600">Contable e impositivo</span></span>
      </Link>
      <nav className="hidden items-center gap-3 lg:flex xl:gap-5" aria-label="Navegación principal">{links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `text-xs font-semibold transition hover:text-accent-700 xl:text-sm ${isActive ? 'text-accent-700' : 'text-primary-900'}`}>{label}</NavLink>)}</nav>
      <div className="hidden items-center gap-3 lg:flex"><a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-accent-600 xl:px-5"><MessageCircle size={18} /> Consultar</a></div>
      <button type="button" onClick={() => setOpen(!open)} className="rounded-lg p-2 text-primary-900 lg:hidden" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="border-t border-primary-100 bg-white px-6 pb-6 pt-2 lg:hidden" aria-label="Navegación móvil"><div className="container mx-auto flex flex-col">{links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `border-b border-primary-50 py-3 font-semibold ${isActive ? 'text-accent-700' : 'text-primary-900'}`}>{label}</NavLink>)}<a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-5 py-3 font-bold text-white"><MessageCircle size={18} /> Consultar por WhatsApp</a></div></nav>}
  </header>;
};
export default Navbar;
