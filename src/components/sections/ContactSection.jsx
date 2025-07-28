// src/components/sections/ContactSection.jsx
import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "El nombre es obligatorio.";
    if (!formData.email) {
      tempErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "El correo electrónico no es válido.";
    }
    if (!formData.message.trim()) tempErrors.message = "La consulta es obligatoria.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitMessage('');
    if (validate()) {
      setIsSubmitting(true);
      console.log('Formulario válido, enviando:', formData);
      
      // Crear un enlace mailto con los datos del formulario
      const subject = encodeURIComponent('Consulta desde el sitio web');
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Teléfono: ${formData.phone}\n\n` +
        `Consulta:\n${formData.message}`
      );
      const mailtoLink = `mailto:abm.estudio.contable.00@gmail.com?subject=${subject}&body=${body}`;
      
      // Abrir cliente de correo
      window.location.href = mailtoLink;
      
      // Simulación de envío exitoso
      setTimeout(() => {
        setSubmitMessage('Se abrió tu cliente de correo para enviar la consulta. También puedes contactarnos directamente en Beacons.');
        setIsSubmitting(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      }, 1000);
    } else {
      setSubmitMessage('Por favor, corrige los errores antes de enviar.');
    }
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 md:p-12 rounded-lg shadow-xl">
          <form onSubmit={handleSubmit} noValidate>
            {submitMessage && (
              <div className={`mb-4 text-center p-3 rounded-md ${Object.keys(errors).length > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {submitMessage}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nombre *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-red-500'}`} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo electrónico *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-red-500'}`} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="md:col-span-2">
                 <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Teléfono</label>
                 <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Consulta *</label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-red-500'}`}></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              
              <div className="md:col-span-2 text-center space-y-4">
                <button type="submit" disabled={isSubmitting} className="bg-red-500 text-white font-bold py-3 px-10 rounded-md hover:bg-red-600 transition-colors text-lg disabled:bg-gray-400 mr-4">
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
                <a 
                  href="https://beacons.ai/abm_mayta?fbclid=PAZXh0bgNhZW0CMTEAAafbrnFvlsV9KYwBnfTszOCwUp0e-tDdSe9UJfXN1A2Z3C_NZzUECu2CTIQvtw_aem_Y1SwIHQWqhgxnUUErb3sDQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white font-bold py-3 px-10 rounded-md hover:bg-green-700 transition-colors text-lg inline-block"
                >
                  Contactar por Beacons
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;