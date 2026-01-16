// src/components/sections/NewsSection.jsx
import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';

const NewsSection = () => {
  useEffect(() => {
    // Este script es necesario para que el widget de Instagram funcione si decides usar uno (como Elfsight o SnapWidget)
    // Por ahora, dejamos listo el contenedor.
  }, []);

  return (
    <section id="novedades" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 font-sans uppercase tracking-wide">
            Últimas Novedades
          </h2>
          <div className="w-20 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Mantenete informado con las últimas actualizaciones impositivas y noticias del estudio a través de nuestro Instagram.
          </p>
        </div>

        {/* Contenedor del Feed de Instagram */}
        <div className="max-w-5xl mx-auto">
          
          {/* OPCIÓN 1: Botón directo (La más segura sin pagar servicios externos) */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center p-1">
                <div className="bg-white w-full h-full rounded-full flex items-center justify-center">
                  <Instagram className="w-10 h-10 text-primary-900" />
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Seguinos en Instagram
            </h3>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Publicamos contenido exclusivo, recordatorios de vencimientos y novedades de AFIP semanalmente. ¡No te lo pierdas!
            </p>

            <a 
              href="https://www.instagram.com/abm.estudiocontable/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-md gap-2 uppercase tracking-wide text-sm"
            >
              <Instagram className="w-5 h-5" />
              Ver Noticias en Instagram
            </a>

            {/* AQUI IRÍA EL WIDGET SI EL USUARIO INSTALA ELFSIGHT O SNAPWIDGET 
                Por ejemplo: <div className="elfsight-app-..." ></div> 
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;