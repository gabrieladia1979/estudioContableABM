import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import ServicesSection from '../components/sections/ServicesSection';
import AudienceSection from '../components/sections/AudienceSection';
import ProcessSection from '../components/sections/ProcessSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => <div><Navbar /><main><Hero /><AudienceSection /><ServicesSection /><ProcessSection /><ContactSection compact /></main><Footer /></div>;
export default HomePage;
