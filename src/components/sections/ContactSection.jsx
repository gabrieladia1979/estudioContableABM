import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Información de Contacto Centrada */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 overflow-hidden relative">
            {/* Elemento decorativo de fondo */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary-100 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-secondary-100 rounded-full opacity-50 blur-3xl"></div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 font-playfair">
              Estamos para ayudarte
            </h3>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Contáctanos para recibir asesoramiento personalizado. Estamos a tu disposición para resolver tus dudas contables e impositivas.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="bg-primary-50 p-4 rounded-full mb-4 group-hover:bg-primary-100 transition-colors">
                  <Mail className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-2 font-playfair">Email</h4>
                <a href="mailto:abm.estudio.contable.00@gmail.com" className="text-gray-600 hover:text-primary-600 transition-colors text-lg break-words max-w-full">
                  abm.estudio.contable.00@gmail.com
                </a>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="bg-primary-50 p-4 rounded-full mb-4 group-hover:bg-primary-100 transition-colors">
                  <Phone className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-2 font-playfair">Teléfono / WhatsApp</h4>
                <a href="https://wa.me/541168172147" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-600 transition-colors text-lg">
                  +54 11 6817 2147
                </a>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="bg-primary-50 p-4 rounded-full mb-4 group-hover:bg-primary-100 transition-colors">
                  <MapPin className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-2 font-playfair">Ubicación</h4>
                <p className="text-gray-600 text-lg">
                  Buenos Aires, Argentina (CABA)
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300 group">
                <div className="bg-primary-50 p-4 rounded-full mb-4 group-hover:bg-primary-100 transition-colors">
                  <Clock className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className="font-bold text-xl text-gray-900 mb-2 font-playfair">Horario de Atención</h4>
                <p className="text-gray-600 text-lg">
                  Lunes a Viernes<br/>9:30 a 18:00 hs
                </p>
              </div>
            </div>

            <div className="mt-12 text-center relative z-10">
              <a 
                href="https://wa.me/541168172147" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl gap-3"
              >
                <Phone className="w-6 h-6 fill-current" />
                <span>Iniciar Chat de WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;