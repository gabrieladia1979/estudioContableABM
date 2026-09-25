// src/pages/NovedadesPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import NewsSection from '../components/sections/NewsSection';

const NovedadesPage = () => {
  return (
    <div>
      <Navbar />
      <main>
          <div className="bg-primary-900 py-16 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight mb-4">RECURSOS Y NOVEDADES</h1>
            <div className="w-20 h-1 bg-accent-500 mx-auto"></div>
          </div>
          <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default NovedadesPage;
