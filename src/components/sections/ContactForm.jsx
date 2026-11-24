import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Clock3, Copy, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import WhatsAppIcon from '../WhatsAppIcon';
import { email, phoneDisplay, phoneHref, whatsappLink } from '../../data/contact';
import { trackEvent } from '../../data/analytics';

const CONSULTATION_TOPICS = [
  {
    id: 'general',
    label: 'Consulta general',
    summary: 'Te escuchamos y definimos cómo avanzar según tu actividad.',
    message: 'Hola Alejandra, quisiera hacer una consulta con ABM Estudio Contable. Mi actividad es [contanos brevemente qué hacés] y necesito revisar [tu consulta o plazo cercano].',
  },
  {
    id: 'monotributo',
    label: 'Monotributo y facturación',
    summary: 'Alta, recategorización, cambios de actividad o facturación.',
    message: 'Hola Alejandra, quisiera consultar por Monotributo en ABM. Mi actividad es [tu rubro], actualmente [estoy por empezar / ya estoy inscripto/a] y necesito revisar [tu duda].',
  },
  {
    id: 'arca',
    label: 'Aviso o intimación de ARCA',
    summary: 'Revisamos el motivo del aviso y si hay un plazo cercano.',
    message: 'Hola Alejandra, recibí una comunicación de ARCA y quisiera revisarla con el estudio. El asunto del aviso es [motivo] y el vencimiento indicado es [fecha o "no figura"].',
  },
  {
    id: 'pymes',
    label: 'PyMEs, sueldos o impuestos',
    summary: 'Orden contable, F.931, liquidación impositiva o balances.',
    message: 'Hola Alejandra, nos comunicamos por nuestra pyme/comercio. Nos dedicamos a [rubro] y necesitamos acompañamiento en [impuestos / sueldos / contabilidad].',
  },
  {
    id: 'sociedad',
    label: 'Sociedades y cooperativas',
    summary: 'Proyecto, socios, tipo societario y puesta en marcha.',
    message: 'Hola Alejandra, queremos constituir una sociedad o cooperativa. El proyecto es sobre [actividad], participaríamos [cantidad] personas y operaríamos en [jurisdicción].',
  },
];

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export default function ContactForm() {
  const { search } = useLocation();
  const [selectedId, setSelectedId] = useState('general');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const requestedTopic = new URLSearchParams(search).get('tema');
    if (requestedTopic === 'monotributo') setSelectedId('monotributo');
    if (requestedTopic === 'arca') setSelectedId('arca');
    if (requestedTopic === 'sociedad') setSelectedId('sociedad');
  }, [search]);

  const activeTopic = CONSULTATION_TOPICS.find(item => item.id === selectedId) || CONSULTATION_TOPICS[0];
  const mailHref = `mailto:${email}?subject=${encodeURIComponent(`Consulta ABM · ${activeTopic.label}`)}&body=${encodeURIComponent(activeTopic.message)}`;

  const handleCopy = async () => {
    try {
      await copyText(activeTopic.message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const trackChannel = method => {
    trackEvent('contact_click', { contact_method: method, page_path: window.location.pathname });
  };

  return (
    <section id="consulta" className="contact-hub" aria-label="Canales de contacto directo">
      <div className="contact-hub-shell">
        <div className="contact-hub-grid">
          <div className="contact-composer">
            <h2 className="contact-hub-title">
              Contacto directo.<br />Sin formularios largos.
            </h2>
            <p className="contact-hub-lead">
              Elegí el motivo de tu consulta para abrir WhatsApp o tu correo con el mensaje preparado, o copialo en un clic. Alejandra Mayta responde personalmente de lunes a viernes.
            </p>

            <div className="contact-topic-list" role="radiogroup" aria-label="Motivo de consulta">
              {CONSULTATION_TOPICS.map(item => {
                const active = item.id === activeTopic.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={`contact-topic-button ${active ? 'is-selected' : ''}`}
                    onClick={() => {
                      setSelectedId(item.id);
                      setCopied(false);
                    }}
                  >
                    <strong>{item.label}</strong>
                    <span>{item.summary}</span>
                  </button>
                );
              })}
            </div>

            <div className="contact-preview-box">
              <div className="contact-preview-head">
                <span>Mensaje sugerido para enviar</span>
                <button type="button" className="contact-copy-button" onClick={handleCopy}>
                  {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  <span role="status">{copied ? 'Copiado' : 'Copiar texto'}</span>
                </button>
              </div>
              <p className="contact-preview-text">{activeTopic.message}</p>
            </div>

            <div className="contact-primary-actions">
              <a
                href={whatsappLink(activeTopic.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action-whatsapp"
                onClick={() => trackChannel('whatsapp')}
              >
                <WhatsAppIcon size={19} />
                <span>Abrir WhatsApp con este mensaje</span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a
                href={mailHref}
                className="contact-action-mail"
                onClick={() => trackChannel('email')}
              >
                <Mail size={18} aria-hidden="true" />
                <span>Abrir en correo</span>
              </a>
            </div>

            <p className="contact-privacy-note">
              No compartas clave fiscal, contraseñas ni documentación sensible en el primer mensaje.
            </p>
          </div>

          <aside className="contact-channels" aria-label="Medios de comunicación">
            <h2 className="contact-channels-title">Canales directos</h2>
            <p className="contact-channels-intro">
              Atención personal desde Parque Patricios, CABA.
            </p>

            <div className="contact-channel-rows">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-row is-whatsapp"
                onClick={() => trackChannel('whatsapp')}
              >
                <span className="contact-channel-icon is-green">
                  <WhatsAppIcon size={20} />
                </span>
                <span className="contact-channel-copy">
                  <small>WhatsApp</small>
                  <strong>{phoneDisplay}</strong>
                </span>
                <ArrowUpRight size={18} className="contact-channel-arrow" aria-hidden="true" />
              </a>

              <a
                href={phoneHref}
                className="contact-channel-row"
                onClick={() => trackChannel('phone')}
              >
                <span className="contact-channel-icon">
                  <Phone size={19} aria-hidden="true" />
                </span>
                <span className="contact-channel-copy">
                  <small>Teléfono</small>
                  <strong>{phoneDisplay}</strong>
                </span>
                <ArrowUpRight size={18} className="contact-channel-arrow" aria-hidden="true" />
              </a>

              <a
                href={`mailto:${email}`}
                className="contact-channel-row"
                onClick={() => trackChannel('email')}
              >
                <span className="contact-channel-icon">
                  <Mail size={19} aria-hidden="true" />
                </span>
                <span className="contact-channel-copy">
                  <small>Correo electrónico</small>
                  <strong>{email}</strong>
                </span>
                <ArrowUpRight size={18} className="contact-channel-arrow" aria-hidden="true" />
              </a>

              <a
                href="https://www.instagram.com/abm.estudiocontable/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel-row"
              >
                <span className="contact-channel-icon">
                  <Instagram size={19} aria-hidden="true" />
                </span>
                <span className="contact-channel-copy">
                  <small>Instagram</small>
                  <strong>@abm.estudiocontable</strong>
                </span>
                <ArrowUpRight size={18} className="contact-channel-arrow" aria-hidden="true" />
              </a>

              <div className="contact-channel-row is-static">
                <span className="contact-channel-icon">
                  <MapPin size={19} aria-hidden="true" />
                </span>
                <span className="contact-channel-copy">
                  <small>Ubicación</small>
                  <strong>Parque Patricios, CABA</strong>
                </span>
              </div>

              <div className="contact-channel-row is-static">
                <span className="contact-channel-icon">
                  <Clock3 size={19} aria-hidden="true" />
                </span>
                <span className="contact-channel-copy">
                  <small>Horario de atención</small>
                  <strong>Lunes a viernes · 9:30 a 18:00 hs</strong>
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
