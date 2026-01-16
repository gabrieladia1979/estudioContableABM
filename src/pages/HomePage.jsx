// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import ServicesSection from '../components/sections/ServicesSection';
import BusinessSection from '../components/sections/BusinessSection';
import NewsSection from '../components/sections/NewsSection';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <BusinessSection />
      <ServicesSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
