// src/components/layout/PageLayout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const PageLayout = ({ title, subtitle, children }) => {
  return (
    <div>
      <Navbar />
      <main>
        {/* Encabezado dinámico */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                {title}
              </h1>
              <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
        
        {/* Contenido principal de la página */}
        <div className="bg-white">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;