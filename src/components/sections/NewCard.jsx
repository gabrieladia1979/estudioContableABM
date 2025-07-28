// src/components/sections/NewsCard.jsx
import React from 'react';

const NewsCard = ({ title, source, date, url }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <p className="text-sm text-gray-500 mb-2">{date} - {source}</p>
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-green-700 hover:text-green-800 font-semibold"
      >
        Ver más
      </a>
    </div>
  );
};

export default NewsCard;