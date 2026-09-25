// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EstudioPage from './pages/EstudioPage';
import ServiciosPage from './pages/ServiciosPage';
import ContactoPage from './pages/ContactoPage';
import NovedadesPage from './pages/NovedadesPage';
import CrearSociedadPage from './pages/CrearSociedadPage';

const pageInfo = {
  '/': ['ABM Estudio Contable | Impuestos, contabilidad y sueldos', 'Asesoramiento contable e impositivo para empresas, pymes, profesionales y emprendedores en CABA.'],
  '/estudio': ['El estudio | ABM Estudio Contable', 'Conocé cómo trabaja ABM Estudio Contable y las áreas en las que puede acompañarte.'],
  '/servicios': ['Servicios contables e impositivos | ABM', 'Impuestos, contabilidad, balances, sueldos y asesoramiento para empresas y personas.'],
  '/crear-sociedad': ['Crear una sociedad | ABM Estudio Contable', 'Orientación para constituir una sociedad y organizar la gestión contable e impositiva de tu proyecto.'],
  '/novedades': ['Recursos y novedades | ABM Estudio Contable', 'Información práctica para preparar tu consulta y seguir las novedades del estudio.'],
  '/contacto': ['Contacto | ABM Estudio Contable', 'Contactá a ABM Estudio Contable por WhatsApp, teléfono o correo electrónico.'],
};

const PageMetadata = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, description] = pageInfo[pathname] || pageInfo['/'];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <PageMetadata />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/estudio" element={<EstudioPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/crear-sociedad" element={<CrearSociedadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
