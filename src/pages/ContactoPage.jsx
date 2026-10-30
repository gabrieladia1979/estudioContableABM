import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactForm from '../components/sections/ContactForm';

const ContactoPage = () => (
  <div>
    <Navbar />
    <main>
      <section className="contact-hero" aria-labelledby="contact-title">
        <div className="container mx-auto px-6">
          <h1 id="contact-title">Hablemos<span>.</span></h1>
          <div className="contact-hero-bottom">
            <p>Contanos qué necesitás resolver. En ABM Estudio Contable te ayudamos a encontrar el próximo paso.</p>
            <a href="#consulta">Preparar mi consulta <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>
      <ContactForm />
    </main>
    <Footer />
  </div>
);

export default ContactoPage;
