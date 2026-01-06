import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactSection = () => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // REEMPLAZA ESTOS VALORES CON LOS DE TU CUENTA DE EMAILJS
    const SERVICE_ID = 'service_xxxxxxx';
    const TEMPLATE_ID = 'template_xxxxxxx';
    const PUBLIC_KEY = 'xxxxxxxxxxxxxxx';

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setStatus('success');
          form.current.reset(); // Limpia el formulario
          
          // Limpiar el mensaje después de 5 segundos
          setTimeout(() => {
            setStatus('idle');
          }, 5000);
      }, (error) => {
          console.log(error.text);
          setStatus('error');
          
          // Limpiar el mensaje después de 5 segundos
          setTimeout(() => {
            setStatus('idle');
          }, 5000);
      });
  };

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
          <p className="text-xl text-gray-600">Estamos aquí para ayudarte a crecer</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Información de Contacto (Izquierda) */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h3>
            
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Email</h4>
                <p className="text-gray-600">estudiocontableabm@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Teléfono</h4>
                <p className="text-gray-600">+54 11 1234-5678</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Ubicación</h4>
                <p className="text-gray-600">Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>

          {/* Formulario (Derecha) */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                {/* El 'name' debe coincidir con las variables de tu template en EmailJS */}
                <input 
                  type="text" 
                  name="user_name" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  name="user_email" 
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="juan@ejemplo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                <textarea 
                  name="message" 
                  required
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-900 focus:border-transparent transition-all"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <span>Enviando...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>

              {/* Mensajes de estado */}
              {status === 'success' && (
                <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span>¡Mensaje enviado con éxito! Te contactaremos pronto.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <span>Hubo un error al enviar. Por favor intenta más tarde o escríbenos directo.</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;