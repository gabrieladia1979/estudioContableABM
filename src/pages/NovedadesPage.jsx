// src/pages/NovedadesPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import NewsSection from '../components/sections/NewsSection';

const NovedadesPage = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20"> {/* Padding top para compensar el navbar fijo */}
          <div className="bg-primary-900 py-16 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-4">NOVEDADES</h1>
            <div className="w-20 h-1 bg-accent-500 mx-auto"></div>
          </div>
          <NewsSection />
      </div>
      <Footer />
    </div>
  );
};

export default NovedadesPage;
