// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
    { to: '/servicios', label: 'SERVICIOS' },
    { to: '/contacto', label: 'CONTACTO' },
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {/* Top bar con información de contacto */}
      <div className="bg-black text-white py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href="tel:+541168172147" className="flex items-center hover:text-red-500 transition-colors">
              <i className="fa fa-phone mr-2"></i>
              +54 11 6817 2147
            </a>
            <a href="mailto:abm.estudio.contable.00@gmail.com" className="flex items-center hover:text-red-500 transition-colors">
              <i className="fa fa-envelope mr-2"></i>
              abm.estudio.contable.00@gmail.com
            </a>
          </div>
          <div className="hidden md:block">
            <span>Lunes a viernes de 9:30 a 18:00 hs</span>
          </div>
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img 
                    src="/icons/isabella soler.jpg" 
                    alt="ABM Estudio Contable" 
                    className="w-full h-full object-contain rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-800 font-bold text-lg leading-tight">ABM ESTUDIO CONTABLE</span>
                  <span className="text-gray-600 text-xs uppercase">Lic. Isabella Soler</span>
                </div>
              </div>
            </Link>

            {/* Navegación de escritorio */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-semibold text-sm tracking-wide transition-colors duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-full after:h-[2px] after:bg-red-500 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:text-red-500 hover:after:scale-x-100 ${
                    isActiveLink(link.to)
                      ? 'text-red-500 after:scale-x-100'
                      : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/541168172147"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full text-sm transition-all duration-300 transform hover:scale-105"
              >
                Whatsapp
              </a>
            </div>

            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-red-500 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Navegación móvil */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4 items-start">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`font-semibold text-base py-2 ${isActiveLink(link.to) ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href="https://wa.me/541168172147"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full text-sm text-center mt-2"
                >
                  Whatsapp
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;