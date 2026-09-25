import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactForm from '../components/sections/ContactForm';

const ContactoPage = () => (
  <div>
    <Navbar />
    <main>
      <section className="bg-primary-900 py-12 text-white md:py-16">
        <div className="container mx-auto px-6">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.17em] text-accent-200">Contacto · ABM</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">Estamos para ayudarte con tu consulta.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-100">Escribinos y contanos un poco sobre tu actividad. Te responderemos para conversar sobre los próximos pasos.</p>
        </div>
      </section>
      <ContactForm />
    </main>
    <Footer />
  </div>
);

export default ContactoPage;
