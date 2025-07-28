// src/pages/EstudioPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import AboutSection from '../components/sections/AboutSection';
import Footer from '../components/layout/Footer';

const EstudioPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                NUESTRO ESTUDIO
              </h1>
              <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Conoce más sobre nuestra trayectoria, experiencia y compromiso profesional
              </p>
            </div>
          </div>
        </div>
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default EstudioPage;
