// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EstudioPage from './pages/EstudioPage';
import ServiciosPage from './pages/ServiciosPage';
import ContactoPage from './pages/ContactoPage';
import NovedadesPage from './pages/NovedadesPage';
import CrearSociedadPage from './pages/CrearSociedadPage';
import TopicPage from './pages/TopicPage';
import { pageInfo } from './data/pageInfo';
import { startAnalytics, trackPageView } from './data/analytics';
import AnalyticsConsent from './components/AnalyticsConsent';

const PageMetadata = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    const [title, description] = pageInfo[normalizedPath] || pageInfo['/'];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://estudiocontableabm.com.ar${normalizedPath}`);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://estudiocontableabm.com.ar${normalizedPath}`);
    startAnalytics();
    trackPageView(normalizedPath);
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Attribution = () => {
  const { search } = useLocation();
  useEffect(() => {
    const source = new URLSearchParams(search).get('utm_source');
    if (source) window.sessionStorage.setItem('abm_utm_source', source.slice(0, 80));
  }, [search]);
  return null;
};

export function AppRoutes() {
  return (
    <>
      <PageMetadata />
      <Attribution />
      <AnalyticsConsent />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/estudio" element={<EstudioPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/novedades" element={<NovedadesPage />} />
          <Route path="/crear-sociedad" element={<CrearSociedadPage />} />
          <Route path="/monotributo" element={<TopicPage topic="monotributo" />} />
          <Route path="/intimaciones-arca" element={<TopicPage topic="arca" />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return <Router><AppRoutes /></Router>;
}

export default App;
