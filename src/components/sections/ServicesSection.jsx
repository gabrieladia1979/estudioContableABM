// src/components/sections/ServicesSection.jsx
import React from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from '../../data/servicesData.jsx'; 

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 uppercase tracking-wider">Nuestros Servicios</h2>
          <div className="w-24 h-0.5 bg-red-500 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;