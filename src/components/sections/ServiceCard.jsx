// src/components/sections/ServiceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <Link to="/servicios" className="block h-full">
      <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center flex flex-col items-center cursor-pointer transform hover:-translate-y-2 h-full border border-gray-100 group">
        <div className="mb-6 flex items-center justify-center w-20 h-20 bg-primary-50 rounded-full p-4 group-hover:bg-primary-100 transition-colors">
          <img 
            src={icon} 
            alt={title} 
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wider mb-3 font-playfair group-hover:text-primary-700 transition-colors">{title}</h3>
        <p className="text-gray-600 font-inter leading-relaxed">{description}</p>
      </div>
    </Link>
  );
};

export default ServiceCard;