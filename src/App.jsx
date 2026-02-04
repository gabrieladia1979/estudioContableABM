// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EstudioPage from './pages/EstudioPage';
import ServiciosPage from './pages/ServiciosPage';
import ContactoPage from './pages/ContactoPage';
import NovedadesPage from './pages/NovedadesPage';
import CrearSociedadPage from './pages/CrearSociedadPage';

function App() {
  return (
    <Router>
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