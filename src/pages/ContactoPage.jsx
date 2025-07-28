// src/pages/ContactoPage.jsx
import React from 'react';
import Navbar from '../components/layout/Navbar';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/layout/Footer';

const ContactoPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                CONTACTANOS
              </h1>
              <div className="w-20 h-1 bg-red-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Realice su consulta y un profesional de nuestro equipo se pondrá en contacto con usted
              </p>
            </div>
          </div>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactoPage;
