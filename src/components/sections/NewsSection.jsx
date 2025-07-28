// src/components/sections/NewsSection.jsx
import React from 'react';
import NewsCard from './NewCard';
import { newsData } from '../../data/newData'; // Importamos las noticias

const NewsSection = () => {
  return (
    <section id="novedades" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-green-800">Novedades Impositivas</h2>
          <p className="text-lg text-gray-600 mt-2">Mantente al día con las últimas noticias de AFIP y ARCA.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsData.map((news, index) => (
            <NewsCard 
              key={index}
              title={news.title}
              source={news.source}
              date={news.date}
              url={news.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;