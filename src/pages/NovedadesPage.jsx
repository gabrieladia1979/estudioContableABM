import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import EditorialNewsSection from '../components/sections/EditorialNewsSection';

const NovedadesPage = () => {
  return (
    <div className="news-page min-h-screen">
      <Navbar />
      <main>
        <header className="news-index-header"><div className="container mx-auto px-6"><p className="news-kicker">Inicio · Noticias</p><h1>Información de interés, <span>para tu actividad.</span></h1></div></header>
        <EditorialNewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default NovedadesPage;
