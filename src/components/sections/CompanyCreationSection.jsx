import React from 'react';
import { CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

const CompanyCreationSection = () => {
  const cardData = [
    {
      title: "Sociedad Anónima (SA)",
      features: [
        "Redacción de estatuto y certificación de firmas.",
        "Registro de la sociedad en los organismos reguladores.",
        "Alta de impuestos y apertura de cuenta bancaria.",
        "Liquidación de impuestos y contabilidad mensual."
      ]
    },
    {
      title: "Sociedad de Resp. Limitada (SRL)",
      features: [
        "Redacción de estatuto y certificación de firmas.",
        "Registro de la sociedad en los organismos reguladores.",
        "Alta de impuestos y apertura de cuenta bancaria.",
        "Liquidación de impuestos y contabilidad mensual."
      ]
    },
    {
      title: "Sociedad Anónima Simplificada (SAS)",
      features: [
        "Redacción de estatuto y certificación de firmas.",
        "Registro de la sociedad en los organismos reguladores.",
        "Alta de impuestos y apertura de cuenta bancaria.",
        "Liquidación de impuestos y contabilidad mensual."
      ]
    }
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            
            {/* Left Content */}
            <div className="w-full md:w-1/2 z-10 space-y-6">
              <span className="inline-block bg-white border border-secondary-200 text-secondary-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm tracking-wider uppercase">
                SRL - SA - SAS
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-900 leading-tight font-playfair">
                Creamos tu sociedad hoy! <span className="block text-primary-700">Firmá en 24 hs.</span>
              </h1>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Te ayudamos a crear tu sociedad: <span className="font-semibold text-primary-800">SRL, SA o SAS</span> de manera ágil, sin trámites complicados y con asesoramiento experto.
                </p>
                <p>
                  Te ofrecemos además, un servicio integral que incluye las altas impositivas y apertura de cuentas bancarias.
                </p>
                <p>
                  Por último, gestionamos la contabilidad, los impuestos y la liquidación de sueldos de tu empresa.
                  De esta manera, centralizas todos los servicios con un solo equipo de profesionales, ahorrando dinero, tiempo y asegurando el cumplimiento de tus obligaciones.
                </p>
              </div>
              <a 
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-800 to-primary-900 text-white font-bold py-3 px-8 rounded-lg hover:from-primary-900 hover:to-primary-950 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <span>Enviar WhatsApp</span>
                <MessageCircle size={20} />
              </a>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 relative">
                {/* Decorative Shape */}
                <div className="absolute inset-0 bg-primary-50 transform -skew-x-12 translate-x-1/4 scale-110 opacity-60 z-0 hidden md:block rounded-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Equipo consultores" 
                  className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[400px] md:h-[500px] border-4 border-white"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-secondary-600 font-bold tracking-widest uppercase text-sm mb-3 block">
              Comenzá ahora
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-primary-900 font-playfair mb-6">
              ¿Qué sociedad buscás constituir?
            </h2>
            <div className="w-24 h-1.5 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-10 gap-8 max-w-7xl mx-auto">
            {cardData.map((card, index) => (
              <div 
                key={index} 
                className={`flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 ${index === 2 ? 'md:col-span-2 md:w-3/4 md:mx-auto' : ''}`}
              >
                {/* Left (Title) */}
                <div className="sm:w-1/3 bg-primary-900 p-8 flex items-center justify-center text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary-800 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <h3 className="text-2xl font-bold text-white leading-tight z-10 font-playfair">
                    {card.title}
                  </h3>
                </div>

                {/* Right (Content) */}
                <div className="sm:w-2/3 p-8 flex flex-col justify-between bg-gray-50">
                  <ul className="space-y-4 mb-8">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <div className="mt-1 bg-white border border-secondary-200 rounded-full p-0.5 min-w-[1.25rem] h-5 flex items-center justify-center shadow-sm group-hover:border-secondary-400 transition-colors">
                            <CheckCircle className="text-secondary-600 w-3.5 h-3.5" strokeWidth={3} />
                        </div>
                        <span className="text-gray-600 text-sm md:text-base leading-relaxed group-hover:text-primary-800 transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div>
                    <a 
                      href={`https://wa.me/?text=${encodeURIComponent('Hola, me gustaría recibir más información sobre ' + card.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 border-2 border-primary-900 text-primary-900 font-bold py-2.5 px-6 rounded-lg hover:bg-primary-900 hover:text-white transition-all text-sm uppercase tracking-wide"
                    >
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        Más información
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyCreationSection;
