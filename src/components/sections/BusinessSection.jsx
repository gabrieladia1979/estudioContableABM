import React from 'react';
import { CheckCircle } from 'lucide-react';

const BusinessSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Parte Superior: ¿Tenés una Empresa? */}
        <div className="bg-secondary-50 rounded-3xl p-8 md:p-12 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6 font-playfair">
              ¿Tenés una Empresa?
            </h2>
            <div className="w-20 h-1 bg-accent-500 mb-6"></div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Entonces ya sabrás que cuando el negocio comienza a crecer, es el momento donde se torna peligroso descuidar la contabilidad y sumergirse en la desorganización. Además de provocar stress, pérdidas económicas y frustraciones, pueden aparecer problemas fiscales también.
            </p>
            <p className="text-lg text-gray-700 mb-8 font-medium">
              ¿Querés ganar tranquilidad y delegar esta área? ¡Acá estamos!
            </p>
            <a 
              href="#contacto" 
              className="inline-block bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 px-8 rounded transition-colors text-sm tracking-wide uppercase shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Quiero saber más
            </a>
          </div>
        </div>

        {/* Parte Inferior: Además, podemos ayudarte con... */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-12 font-playfair">
            Además, podemos ayudarte con...
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Columna Sueldos */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2">Sueldos</h3>
            <ul className="space-y-3">
              {[
                "Liquidación de sueldos (mensuales, finales, anticipos, vacaciones, aguinaldo).",
                "Liquidación del Impuesto a las Ganancias del personal.",
                "Emisión de recibos de haberes.",
                "Altas y bajas de Empleados.",
                "Preparación y presentación de cargas sociales y conceptos no remunerativos.",
                "Armado de boletas sindicales.",
                "Armado de planes de facilidades de pago AFIP."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-accent-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Alta de Sociedades */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-100 pb-2">Alta de Sociedades</h3>
            <div className="text-gray-700 space-y-4">
              <p>¿Buscas asesoramiento para elegir el tipo de sociedad que mejor se adapta a tu negocio?</p>
              <p>¿Querés liberarte de todos los trámites? Entonces este servicio es para vos.</p>
              <p className="font-semibold text-primary-800">Podemos hacer esto por vos:</p>
            </div>
            <ul className="space-y-3 mt-4">
              {[
                "Redactar el estatuto y luego elevarlo a escritura pública",
                "Publicar edictos",
                "Tramitar las pólizas de caución para directores o gerentes",
                "Realizar todos los trámites ante la Inspección General de Justicia"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-accent-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-primary-50 rounded-lg border-l-4 border-primary-500">
              <p className="text-sm text-gray-700 italic">
                Así, finalmente obtendrás la sociedad lista para operar. Contactanos y te brindamos todos los detalles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;
