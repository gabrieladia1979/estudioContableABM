// src/components/sections/ServicesSection.jsx
import React from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from '../../data/servicesData.jsx'; 

const ServicesSection = () => {
  return (
    <section id="servicios" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-accent-600">Qué hacemos</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900">Servicios para cada necesidad</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">Desde consultas puntuales hasta la gestión continua de tu actividad.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
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
