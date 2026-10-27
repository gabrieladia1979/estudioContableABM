import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import ServiceMarquee from '../components/sections/ServiceMarquee';
import WaveBackdrop from '../components/WaveBackdrop';
import OfficialNewsSection from '../components/sections/OfficialNewsSection';
import EditorialNewsSection from '../components/sections/EditorialNewsSection';
import ServicesSection from '../components/sections/ServicesSection';
import AudienceSection from '../components/sections/AudienceSection';
import ProcessSection from '../components/sections/ProcessSection';

const HomePage = () => <div><Navbar overlay /><main><Hero /><div className="home-wave-surface"><WaveBackdrop /><ServiceMarquee /><div className="home-wave-content"><ServicesSection /><EditorialNewsSection compact /><OfficialNewsSection compact /></div></div><AudienceSection /><ProcessSection /></main><Footer /></div>;
export default HomePage;
