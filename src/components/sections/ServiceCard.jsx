// src/components/sections/ServiceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <Link to="/servicios" className="block">
      <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center cursor-pointer transform hover:scale-105">
        <div className="mb-4 flex items-center justify-center w-16 h-16">
          <img 
            src={icon} 
            alt={title} 
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-xl font-bold font-playfair text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 font-inter">{description}</p>
      </div>
    </Link>
  );
};

export default ServiceCard;