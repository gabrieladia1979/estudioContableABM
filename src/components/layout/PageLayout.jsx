// src/components/layout/PageLayout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import PageHeading from './PageHeading';

const PageLayout = ({ title, subtitle, children }) => {
  return (
    <div>
      <Navbar />
      <main>
        <PageHeading title={title} description={subtitle} />
        
        {/* Contenido principal de la página */}
        <div className="bg-white">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
