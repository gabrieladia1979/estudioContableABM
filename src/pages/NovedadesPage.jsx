// src/pages/NovedadesPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import NewsSection from '../components/sections/NewsSection';
import OfficialNewsSection from '../components/sections/OfficialNewsSection';
import EditorialNewsSection from '../components/sections/EditorialNewsSection';
import PageHeading from '../components/layout/PageHeading';

const NovedadesPage = () => {
  return (
    <div>
      <Navbar />
      <main>
          <PageHeading title="Noticias" description="Novedades oficiales y recursos útiles para mantenerte al día." />
          <EditorialNewsSection />
          <OfficialNewsSection />
          <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default NovedadesPage;
