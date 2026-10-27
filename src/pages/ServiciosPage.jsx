import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import PageHeading from '../components/layout/PageHeading';
import GroupedServiceExplorer from '../components/sections/GroupedServiceExplorer';

const ServiciosPage = () => {
  return (
    <div className="services-page bg-[#f7f9fb]">
      <Navbar />
      <main onPointerMove={event => {
        if (event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--service-pointer-x', `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty('--service-pointer-y', `${event.clientY - bounds.top}px`);
      }} onPointerLeave={event => {
        event.currentTarget.style.setProperty('--service-pointer-x', '-1000px');
        event.currentTarget.style.setProperty('--service-pointer-y', '-1000px');
      }}>
        <PageHeading title="Servicios" description="Encontrá el asesoramiento contable e impositivo que necesita tu actividad." />

        <GroupedServiceExplorer />

      </main>
      <Footer />
    </div>
  );
};

export default ServiciosPage;
