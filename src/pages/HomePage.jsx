import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import HeroLogoTransition from '../components/HeroLogoTransition';
import WaveBackdrop from '../components/WaveBackdrop';
import OfficialNewsSection from '../components/sections/OfficialNewsSection';
import StudioIntroSection from '../components/sections/StudioIntroSection';
import ServicesSection from '../components/sections/ServicesSection';
import AudienceSection from '../components/sections/AudienceSection';
import ProcessSection from '../components/sections/ProcessSection';
import ContactSection from '../components/sections/ContactSection';

const HomePage = () => <div><Navbar /><main><Hero /><div className="home-wave-surface"><WaveBackdrop /><div className="home-wave-content"><StudioIntroSection /><ServicesSection /><OfficialNewsSection compact /></div></div><AudienceSection /><ProcessSection /><ContactSection compact /></main><Footer /><HeroLogoTransition /></div>;
export default HomePage;
