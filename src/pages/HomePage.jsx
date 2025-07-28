// src/pages/HomePage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import ServicesSection from '../components/sections/ServicesSection';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default HomePage;
