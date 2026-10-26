// src/pages/NovedadesPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import NewsSection from '../components/sections/NewsSection';
import OfficialNewsSection from '../components/sections/OfficialNewsSection';
import PageHeading from '../components/layout/PageHeading';

const NovedadesPage = () => {
  return (
    <div>
      <Navbar />
      <main>
          <PageHeading title="Noticias" />
          <OfficialNewsSection />
          <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default NovedadesPage;
