import WhatsAppIcon from '../WhatsAppIcon';
import { useEffect, useRef, useState } from 'react';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { email, phoneDisplay, phoneHref, whatsappLink } from '../../data/contact';
import { trackEvent } from '../../data/analytics';

const ContactForm = () => {
  const { search } = useLocation();
  const [topic, setTopic] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    const requestedTopic = new URLSearchParams(search).get('tema');
    if (requestedTopic === 'monotributo') setTopic('Monotributo');
    if (requestedTopic === 'arca') setTopic('Intimación o requerimiento de ARCA');
    if (requestedTopic === 'sociedad') setTopic('Constitución de sociedades y cooperativas');
  }, [search]);

  const prepareWhatsAppMessage = data => {
    const fields = [
      ['Nombre', 'from_name'], ['Correo', 'from_email'], ['Teléfono', 'phone'],
      ['Tema', 'topic'], ['Situación', 'situation'], ['Vencimiento cercano', 'deadline'], ['Fecha del aviso', 'deadline_date'],
      ['Consulta', 'message'],
    ];
    const message = fields.map(([label, key]) => {
      const value = String(data.get(key) || '').trim();
      return value ? `${label}: ${value}` : null;
    }).filter(Boolean).join('\n');
    return whatsappLink(`Hola, quisiera hacer esta consulta a ABM Estudio Contable:\n\n${message}`);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const url = prepareWhatsAppMessage(new FormData(formRef.current));
    trackEvent('contact_click', { contact_method: 'whatsapp', page_path: window.location.pathname });
    window.location.assign(url);
  };

  return (
    <section className="bg-[#f4f7fa] py-14 md:py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-[1.1fr_0.9fr]">
          <div className="contact-form-panel min-w-0 p-7 md:p-10 lg:p-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.17em] text-accent-700">Escribinos</p>
            <h2 className="mb-3 text-3xl font-bold text-primary-900">Contanos qué necesitás</h2>
            <p className="mb-8 leading-relaxed text-gray-600">Completá tu consulta y abriremos WhatsApp con el mensaje preparado para enviarlo al estudio.</p>

            <form ref={formRef} onSubmit={handleSubmit} className="contact-form-fields grid min-w-0 gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-primary-900">Nombre y apellido<input name="from_name" required maxLength={100} autoComplete="name" className="rounded-lg border border-primary-200 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" placeholder="Tu nombre" /></label>
                <label className="grid gap-2 text-sm font-semibold text-primary-900">Correo electrónico (opcional)<input name="from_email" type="email" maxLength={160} autoComplete="email" className="rounded-lg border border-primary-200 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" placeholder="nombre@correo.com" /></label>
              </div>
              <label className="grid gap-2 text-sm font-semibold text-primary-900">Teléfono o WhatsApp (opcional)<input name="phone" type="tel" maxLength={40} autoComplete="tel" className="rounded-lg border border-primary-200 bg-white px-4 py-3 font-normal outline-none transition placeholder:text-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" placeholder="Para contactarte más rápido si hay un vencimiento" /></label>
              <label className="grid gap-2 text-sm font-semibold text-primary-900">¿Sobre qué tema nos escribís?<select name="topic" value={topic} onChange={event => setTopic(event.target.value)} required className="rounded-lg border border-primary-200 bg-white px-4 py-3 font-normal outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-100"><option value="" disabled>Elegí un tema</option><option>Monotributo</option><option>Intimación o requerimiento de ARCA</option><option>Impuestos</option><option>Contabilidad y balances</option><option>Sueldos</option><option>Empresas y sociedades</option><option>Constitución de sociedades y cooperativas</option><option>Pymes</option><option>Otra consulta</option></select></label>
              {topic === 'Monotributo' && <label className="grid gap-2 text-sm font-semibold text-primary-900">¿En qué situación estás?<select name="situation" defaultValue="" required className="rounded-lg border border-primary-200 bg-white px-4 py-3 font-normal outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100"><option value="" disabled>Elegí una opción</option><option>Quiero inscribirme</option><option>Ya estoy inscripto/a</option><option>Cambió mi actividad o facturación</option><option>Otra situación</option></select></label>}
              <label className="grid gap-2 text-sm font-semibold text-primary-900">¿Tenés un vencimiento cercano?<select name="deadline" defaultValue="No lo sé" className="rounded-lg border border-primary-200 bg-white px-4 py-3 font-normal outline-none transition focus:border-accent-500 focus:ring-2 focus:ring-accent-100"><option>No lo sé</option><option>Sí, dentro de los próximos 7 días</option><option>Sí, más adelante</option><option>No</option></select></label>
              {topic === 'Intimación o requerimiento de ARCA' && <label className="grid gap-2 text-sm font-semibold text-primary-900">Fecha indicada en el aviso (si figura)<input name="deadline_date" type="date" className="rounded-lg border border-primary-200 bg-white px-4 py-3 font-normal outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-100" /></label>}
              <label className="grid gap-2 text-sm font-semibold text-primary-900">Tu mensaje<textarea name="message" required minLength={10} maxLength={2000} rows={5} className="resize-y rounded-lg border border-primary-200 bg-white px-4 py-3 font-normal leading-relaxed outline-none transition placeholder:text-gray-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" placeholder={topic === 'Intimación o requerimiento de ARCA' ? 'Indicá qué tipo de aviso recibiste y qué te piden, sin copiar datos sensibles' : topic === 'Monotributo' ? 'Contanos qué actividad realizás o pensás iniciar y qué necesitás resolver' : 'Contanos brevemente tu actividad y qué necesitás resolver'} /></label>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-4 font-bold text-white transition hover:bg-accent-600"><WhatsAppIcon size={19} /> Continuar por WhatsApp</button>
              <p className="text-xs text-gray-600">WhatsApp abrirá el mensaje preparado. Revisalo y tocá Enviar para completar la consulta.</p>
              <p className="text-xs leading-relaxed text-gray-500">Los datos que completes se incluirán en el mensaje. No envíes claves fiscales, contraseñas ni documentación sensible.</p>
            </form>
          </div>

          <aside className="bg-primary-900 p-7 text-white md:p-10 lg:p-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.17em] text-accent-200">ABM Estudio Contable</p>
            <h2 className="mb-4 text-2xl font-bold">También podés contactarnos directamente</h2>
            <p className="mb-9 leading-relaxed text-primary-100">Si preferís, escribinos por WhatsApp o comunicate con el estudio por teléfono o correo.</p>
            <div className="space-y-6">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-white/15 bg-white/5 p-4 transition hover:bg-white/10"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#25D366] text-white"><WhatsAppIcon size={22} /></span><span><strong className="block">WhatsApp</strong><span className="text-sm text-primary-100">+54 11 6817 2147</span></span></a>
              <a href={phoneHref} className="flex items-center gap-4 text-white transition hover:text-accent-200"><Phone className="shrink-0 text-accent-300" size={20} /><span><strong className="block">Teléfono</strong><span className="text-sm text-primary-100">{phoneDisplay}</span></span></a>
              <a href={`mailto:${email}`} className="flex items-center gap-4 break-all text-white transition hover:text-accent-200"><Mail className="shrink-0 text-accent-300" size={20} /><span><strong className="block">Correo</strong><span className="text-sm text-primary-100">{email}</span></span></a>
              <div className="h-px bg-white/15" />
              <p className="flex items-start gap-4"><MapPin className="mt-1 shrink-0 text-accent-300" size={20} /><span><strong className="block">Ubicación</strong><span className="text-sm text-primary-100">Parque Patricios, CABA</span></span></p>
              <p className="flex items-start gap-4"><Clock3 className="mt-1 shrink-0 text-accent-300" size={20} /><span><strong className="block">Horario de atención</strong><span className="text-sm text-primary-100">Lunes a viernes · 9:30 a 18:00</span></span></p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
