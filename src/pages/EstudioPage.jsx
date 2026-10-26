// src/pages/EstudioPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import AboutSection from '../components/sections/AboutSection';
import Footer from '../components/layout/Footer';
import PageHeading from '../components/layout/PageHeading';

const EstudioPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <PageHeading title="El estudio" description="Conocé a Alejandra Mayta y la forma en que acompañamos cada consulta." />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default EstudioPage;
