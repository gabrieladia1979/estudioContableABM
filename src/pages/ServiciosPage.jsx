// src/pages/ServiciosPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const ServiciosPage = () => {
  // Array de servicios ahora incluye la ruta del ícono
  const servicios = [
    {
      id: "asesoramiento-tributario",
      title: "Asesoramiento Tributario",
      icon: "/icons/asesoramiento-tributario.png", // Ícono añadido
      items: [
        "Asesoramiento impositivo para empresas y sociedades",
        "Liquidación de impuestos: ganancias, bienes personales, IVA, ingresos brutos, convenio multilateral",
        "Presentación de regímenes de información",
        "Planeamiento Fiscal",
        "Atención de inspecciones impositivas AFIP, AGIP, ARBA",
        "Contestación de intimaciones, requerimientos, verificaciones",
        "Planes de facilidades de pago y moratorias",
        "Relevamiento de situación tributaria y confección de plan de regularización",
        "Comunicación permanente de novedades tributarias pertinentes a cada cliente"
      ]
    },
    {
      id: "contabilidad-balances",
      title: "Contabilidad y Balances",
      icon: "/icons/contabilidad-balances.png", // Ícono añadido
      items: [
        "Asesoramiento contable para empresas y sociedades",
        "Elaboración de estados contables (balances)",
        "Auditoría de estados contables de acuerdo con normas profesionales",
        "Outsourcing contable",
        "Evaluación de procedimientos contables y administrativos",
        "Asesoramiento para la implementación de nuevos sistemas contables",
        "Emisión de informes y certificaciones"
      ]
    },
    {
      id: "empresas-sociedades",
      title: "Empresas y Sociedades",
      icon: "/icons/empresas-sociedades.png", // Ícono añadido
      subtitle: "Contamos con los equipos y profesionales para asesorar a tu empresa. Armamos un plan de trabajo a medida según las necesidades del cliente, proveyendo personal en el cliente de ser necesario.",
      items: [
        "Constitución de sociedades", "Reformas estatutarias", "Designación y renuncia de administradores",
        "Cambio de jurisdicción", "Cambio de sede social", "Reorganización de sociedades: transformación, fusión escisión"
      ]
    },
    {
      id: "pymes",
      title: "Pymes",
      icon: "/icons/pymes.png", // Ícono añadido
      subtitle: "Si tenés una empresa pequeña o familiar podemos ayudarte a ordenar procesos y lograr una mejor gestión administrativo-contable, tributaria y laboral.",
      items: [
        "Tercerización contable", "Consultoría pymes", "Consultoría administrativo contable", "Confección de reportes de gestión a medida"
      ]
    },
    {
      id: "sueldos",
      title: "Sueldos",
      icon: "/icons/sueldos.png", // Ícono añadido
      items: [
        "Liquidación de sueldos y cargas sociales", "Liquidación de cargas sindicales",
        "Certificaciones de servicios y remuneraciones", "Libros de sueldos y jornales", "Selección de personal"
      ]
    },
    {
      id: "personas",
      title: "Personas",
      icon: "/icons/personas.png", // Ícono añadido
      items: [
        "Responsables Inscriptos", "Autónomos", "Ganancias y Bienes Personales", "Monotributistas",
        "Certificaciones de Ingresos y origen de fondos"
      ]
    }
  ];

  const [activeService, setActiveService] = useState(servicios[0].id);

  const handleSetActive = (to) => {
    setActiveService(to);
  };

  return (
    <div className="bg-white">
      <Navbar />
      <main>
        {/* Encabezado de la página */}
        <div className="bg-gray-50 pt-16 pb-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
              NUESTROS SERVICIOS
            </h1>
            <div className="w-20 h-1 bg-red-500 mx-auto"></div>
          </div>
        </div>

        {/* Sección de detalles de servicios */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Menú de Navegación Lateral */}
            <aside className="lg:w-1/4 lg:sticky lg:top-36 self-start">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="font-bold text-lg text-gray-800 mb-4">Áreas de Servicio</h3>
                <ul className="space-y-2">
                  {servicios.map((servicio) => (
                    <li key={servicio.id}>
                      <ScrollLink
                        to={servicio.id} spy={true} smooth={true} offset={-120} duration={500} onSetActive={handleSetActive}
                        className={`cursor-pointer block font-inter font-medium transition-all duration-300 py-1 ${
                          activeService === servicio.id
                            ? 'text-red-600 font-semibold border-l-4 border-red-600 pl-4'
                            : 'text-gray-600 hover:text-red-500 hover:pl-2 border-l-4 border-transparent pl-4'
                        }`}
                      >
                        {servicio.title}
                      </ScrollLink>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Contenido de los Servicios */}
            <div className="lg:w-3/4">
              {servicios.map((servicio) => (
                <Element name={servicio.id} key={servicio.id} className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <img src={servicio.icon} alt={`Ícono ${servicio.title}`} className="w-16 h-16" />
                    <div>
                      <h3 className="text-2xl md:text-3xl font-playfair font-bold text-gray-800">
                        {servicio.title}
                      </h3>
                      <div className="w-24 h-0.5 bg-red-500 mt-2"></div>
                    </div>
                  </div>
                  {servicio.subtitle && (
                    <p className="text-gray-600 font-inter mb-6 italic">
                      {servicio.subtitle}
                    </p>
                  )}
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {servicio.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-red-500 mr-3 mt-1 font-bold">•</span>
                        <span className="text-gray-700 font-inter">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Divisor visual entre secciones */}
                  <hr className="mt-12 border-gray-200" />
                </Element>
              ))}
            </div>
          </div>
        </div>

        {/* Sección de Llamada a la Acción (CTA) */}
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold font-playfair text-gray-800 mb-4">¿Listo para ordenar tus finanzas?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    Solicita una entrevista y descubre cómo podemos ayudarte a alcanzar tus objetivos.
                </p>
                <a
                    href="https://beacons.ai/abm_mayta?fbclid=PAZXh0bgNhZW0CMTEAAafbrnFvlsV9KYwBnfTszOCwUp0e-tDdSe9UJfXN1A2Z3C_NZzUECu2CTIQvtw_aem_Y1SwIHQWqhgxnUUErb3sDQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-500 text-white font-bold py-4 px-10 rounded-md hover:bg-red-600 transition-colors text-lg"
                >
                    Solicitar una entrevista
                </a>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiciosPage;