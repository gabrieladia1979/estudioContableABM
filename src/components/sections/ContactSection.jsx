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
  const [submitStatus, setSubmitStatus] = useState(''); // 'success', 'error', o ''

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
    setSubmitStatus('');
    
    if (!validate()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    
      // Enviar al backend local (configurar URL si es distinto)
      fetch('http://localhost:4000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }),
      })
        .then(async (res) => {
          if (!res.ok) throw new Error('Error en el servidor');
          await res.json();
          setSubmitStatus('success');
          setFormData({ name: '', email: '', phone: '', message: '' });
          setErrors({});
          e.target.reset();

          // Limpiar el mensaje de éxito después de 5 segundos
          setTimeout(() => {
            setSubmitStatus('');
          }, 5000);
        })
        .catch(() => {
          setSubmitStatus('error');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 md:p-12 rounded-lg shadow-xl">
          <form 
            name="contact" 
            onSubmit={handleSubmit} 
            noValidate
          >
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold">¡Consulta enviada exitosamente!</h3>
                  <p className="text-sm mt-1">Nos pondremos en contacto en breve. Gracias por confiar en nosotros.</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-800 rounded-md flex items-start">
                <svg className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold">Error al enviar</h3>
                  <p className="text-sm mt-1">Por favor, verifica los datos e intenta nuevamente.</p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label htmlFor="name" className="block text-secondary-700 font-medium mb-2">Nombre *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    errors.name 
                      ? 'border-primary-700 ring-primary-300 bg-primary-50' 
                      : 'border-secondary-300 focus:ring-primary-700'
                  }`} 
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">•</span>{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-secondary-700 font-medium mb-2">Correo electrónico *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    errors.email 
                      ? 'border-primary-700 ring-primary-300 bg-primary-50' 
                      : 'border-secondary-300 focus:ring-primary-700'
                  }`} 
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">•</span>{errors.email}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-secondary-700 font-medium mb-2">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-700 transition-colors" 
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="message" className="block text-secondary-700 font-medium mb-2">Consulta *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors resize-none ${
                    errors.message 
                      ? 'border-primary-700 ring-primary-300 bg-primary-50' 
                      : 'border-secondary-300 focus:ring-primary-700'
                  }`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1 flex items-center"><span className="mr-1">•</span>{errors.message}</p>}
              </div>
              
              <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="bg-primary-700 text-white font-bold py-3 px-8 rounded-md hover:bg-primary-800 transition-all duration-200 text-base disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : 'Enviar Consulta'}
                </button>
                <a 
                  href="https://wa.me/541168172147?text=Hola%20ABM%20Estudio%20Contable%2C%20quisiera%20consultar%20sobre%20vuestros%20servicios."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white font-bold py-3 px-8 rounded-md hover:bg-green-700 transition-all duration-200 text-base transform hover:scale-105 active:scale-95 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.085.632 4.022 1.714 5.651L.27 23.357c-.408 1.277.338 2.649 1.615 2.649.244 0 .491-.043.729-.134l7.920-2.531c1.567.952 3.404 1.513 5.366 1.513 6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.657 0-3.237-.48-4.566-1.304l-.328-.206-3.359 1.073.879-2.754-.206-.328C2.186 16.503 1.5 14.341 1.5 12c0-5.799 4.701-10.5 10.5-10.5S22.5 6.201 22.5 12 17.799 22.5 12 22.5z"/>
                  </svg>
                  Contactar por WhatsApp
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