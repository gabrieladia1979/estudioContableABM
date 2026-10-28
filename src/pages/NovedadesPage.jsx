import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import NewsSection from '../components/sections/NewsSection';
import OfficialNewsSection from '../components/sections/OfficialNewsSection';
import EditorialNewsSection from '../components/sections/EditorialNewsSection';
import PageHeading from '../components/layout/PageHeading';

const NovedadesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <PageHeading
          title="Novedades & Actualidad Contable"
          description="Información clave sobre ARCA, normativas fiscales, vencimientos y finanzas, explicada para tu actividad."
        />
        <EditorialNewsSection />
        <OfficialNewsSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default NovedadesPage;
