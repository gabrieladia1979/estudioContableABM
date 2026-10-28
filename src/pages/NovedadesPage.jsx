import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import NewsSection from '../components/sections/NewsSection';
import EditorialNewsSection from '../components/sections/EditorialNewsSection';
import PageHeading from '../components/layout/PageHeading';

const NovedadesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <PageHeading
          title="Noticias"
          description="Actualidad de ARCA, Blog del Contador y novedades fiscales explicadas para tu actividad."
        />
        <EditorialNewsSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default NovedadesPage;
