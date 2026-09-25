// src/components/sections/ServiceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ id, icon, title, description }) => {
  return (
    <Link to={`/servicios#${id}`} className="block h-full">
      <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start cursor-pointer transform hover:-translate-y-1 h-full border border-primary-100 group">
        <div className="mb-6 flex items-center justify-center w-20 h-20 bg-primary-50 rounded-full p-4 group-hover:bg-primary-100 transition-colors">
          <img 
            src={icon} 
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-xl font-bold text-primary-900 mb-3 group-hover:text-accent-700 transition-colors">{title}</h3>
        <p className="text-gray-600 font-inter leading-relaxed">{description}</p>
        <span className="mt-6 text-sm font-bold text-accent-700">Conocer más →</span>
      </div>
    </Link>
  );
};

export default ServiceCard;
