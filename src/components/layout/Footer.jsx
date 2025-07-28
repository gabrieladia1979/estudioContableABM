// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Columna 1: Logo y Oficina */}
            <div className="space-y-4">
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
                    <span className="text-white font-bold text-lg leading-tight">ABM ESTUDIO CONTABLE</span>
                    <span className="text-gray-400 text-xs uppercase">Lic. Isabella Soler</span>
                  </div>
                </div>
              </Link>
              <div>
                <h4 className="text-white font-bold text-lg mb-2">Oficina</h4>
                <p className="flex items-start">
                  <FaMapMarkerAlt className="mr-2 mt-1 text-red-500" />
                  <span>Miranda 4765, Piso 9, Oficina "B" - C.A.B.A.</span>
                </p>
              </div>
            </div>

            {/* Columna 2: Contacto */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg mb-2">Contacto</h4>
              <a href="tel:+541168172147" className="flex items-center hover:text-white transition-colors">
                <FaPhoneAlt className="mr-2 text-red-500" />
                <span>+54 11 6817 2147</span>
              </a>
              <a href="mailto:abm.estudio.contable.00@gmail.com" className="flex items-center hover:text-white transition-colors">
                <FaEnvelope className="mr-2 text-red-500" />
                <span>abm.estudio.contable.00@gmail.com</span>
              </a>
            </div>

            {/* Columna 3: Redes Sociales */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg mb-2">Redes</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://beacons.ai/abm_mayta?fbclid=PAZXh0bgNhZW0CMTEAAafbrnFvlsV9KYwBnfTszOCwUp0e-tDdSe9UJfXN1A2Z3C_NZzUECu2CTIQvtw_aem_Y1SwIHQWqhgxnUUErb3sDQ" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  <FaFacebookF />
                </a>
                <a 
                  href="https://beacons.ai/abm_mayta?fbclid=PAZXh0bgNhZW0CMTEAAafbrnFvlsV9KYwBnfTszOCwUp0e-tDdSe9UJfXN1A2Z3C_NZzUECu2CTIQvtw_aem_Y1SwIHQWqhgxnUUErb3sDQ" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  <FaTwitter />
                </a>
                <a 
                  href="https://www.instagram.com/abm.estudiocontable/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

             {/* Columna 4: Placeholder o Links Rápidos */}
             <div className="space-y-4">
              <h4 className="text-white font-bold text-lg mb-2">Horario de Atención</h4>
              <p>Lunes a viernes de 9:30 a 18:00 hs</p>
            </div>
            
          </div>
        </div>
      </footer>
      <div className="bg-gray-800 text-gray-500 py-4">
        <div className="container mx-auto px-6 text-center md:flex md:justify-between">
          <p className="text-sm">&copy; {new Date().getFullYear()} ABM Estudio Contable. Todos los derechos reservados.</p>
          <p className="text-sm">Desarrollado por Empresa de Marketing Digital</p>
        </div>
      </div>
      
      {/* Botón Flotante de WhatsApp */}
      <a 
        href="https://wa.me/541168172147"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform z-40"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>
    </>
  );
};

export default Footer;