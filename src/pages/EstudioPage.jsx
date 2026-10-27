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
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default EstudioPage;
