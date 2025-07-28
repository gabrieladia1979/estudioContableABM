// src/components/sections/AboutSection.jsx
import React from 'react';

const AboutSection = () => {
  return (
    <section id="estudio" className="py-20 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img 
            src="/icons/image.png" 
            alt="ABM Estudio Contable"
            className="rounded-lg shadow-xl w-full"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-gray-800 mb-4">El Estudio</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Somos un equipo de profesionales con una sólida formación y una vasta experiencia en el campo de las ciencias económicas. Nuestro principal objetivo es brindar un servicio de alta calidad, personalizado y adaptado a las necesidades de cada uno de nuestros clientes.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Nos mantenemos en constante actualización para ofrecer soluciones innovadoras y eficientes que contribuyan al crecimiento y la solidez de su negocio. La confianza y el compromiso son los pilares de nuestra relación profesional.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;