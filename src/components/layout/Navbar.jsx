// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Ocultar al hacer scroll hacia abajo, mostrar al hacer scroll hacia arriba
        if (window.scrollY > lastScrollY && window.scrollY > 150) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const navLinks = [
    { to: '/', label: 'INICIO' },
    { to: '/estudio', label: 'ESTUDIO' },
    { to: '/crear-sociedad', label: 'CREAR SOCIEDAD' },
    { to: '/servicios', label: 'SERVICIOS' },
    { to: '/novedades', label: 'NOVEDADES' },
    { to: '/contacto', label: 'CONTACTO' },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      
      {/* Top bar con información de contacto - Estilo Corporate Blue */}
      <div className="bg-primary-900 text-white py-2.5 text-xs md:text-sm font-medium tracking-wide">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-2">
          
          {/* Lado Izquierdo: Datos de contacto */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-accent-500" />
              <span className="opacity-90 hover:opacity-100 cursor-default">Buenos Aires, Argentina (CABA)</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-accent-500" />
              <a href="tel:+541168172147" className="opacity-90 hover:opacity-100 hover:text-accent-400 transition-colors">+54 11 6817 2147</a>
            </div>
            <div className="flex items-center gap-2">
              <FaWhatsapp className="text-accent-500 text-base" />
              <a href="https://wa.me/541168172147" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:text-accent-400 transition-colors">+54 11 6817 2147</a>
            </div>
          </div>

          {/* Lado Derecho: Redes Sociales */}
          <div className="flex items-center gap-4">
             <a href="https://www.instagram.com/abm.estudiocontable/" target="_blank" rel="noopener noreferrer" className="hover:text-accent-500 transition-colors"><FaInstagram size={16} /></a>
             <a href="#" className="hover:text-accent-500 transition-colors"><FaFacebookF size={16} /></a>
             <a href="#" className="hover:text-accent-500 transition-colors"><FaLinkedinIn size={16} /></a>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="bg-white shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-24">
            
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-50 rounded-lg p-1 group-hover:bg-primary-100 transition-colors duration-300">
                   <img 
                    src="/icons/isabella soler.jpg" 
                    alt="ABM Estudio Contable" 
                    className="w-full h-full object-cover rounded shadow-sm"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-primary-900 font-bold text-xl leading-none tracking-tight">ABM ESTUDIO</span>
                  <span className="text-accent-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Contable & Impositivo</span>
                </div>
              </div>
            </Link>

            {/* Navegación de escritorio */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-bold text-sm uppercase tracking-wider transition-all duration-300 relative group py-2 ${
                    isActiveLink(link.to)
                      ? 'text-accent-500'
                      : 'text-gray-800 hover:text-accent-500'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent-500 transform origin-left transition-transform duration-300 ${isActiveLink(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
            </div>

            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-primary-900 hover:bg-primary-50 focus:outline-none transition-colors"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Navegación móvil */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-6 bg-white absolute left-0 right-0 shadow-xl px-6 animate-fade-in-down top-full">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-bold text-sm uppercase tracking-wider py-3 border-b border-gray-50 ${isActiveLink(link.to) ? 'text-accent-500' : 'text-gray-800'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;