import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactForm from '../components/sections/ContactForm';
import PageHeading from '../components/layout/PageHeading';

const ContactoPage = () => (
  <div>
    <Navbar />
    <main>
      <PageHeading title="Contacto" description="Contanos qué necesitás resolver y empecemos a conversar." />
      <ContactForm />
    </main>
    <Footer />
  </div>
);

export default ContactoPage;
