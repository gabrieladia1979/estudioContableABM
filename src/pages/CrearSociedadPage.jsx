// src/pages/CrearSociedadPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CompanyCreationSection from '../components/sections/CompanyCreationSection';

const CrearSociedadPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <CompanyCreationSection />
      </main>
      <Footer />
    </div>
  );
};

export default CrearSociedadPage;
