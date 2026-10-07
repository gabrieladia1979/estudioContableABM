import { useEffect, useState } from 'react';
import { analyticsAvailable, getAnalyticsConsent, setAnalyticsConsent, trackPageView } from '../data/analytics';

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState('unavailable');
  useEffect(() => { if (analyticsAvailable) setChoice(getAnalyticsConsent()); }, []);
  if (choice) return null;

  const choose = accepted => {
    setAnalyticsConsent(accepted);
    setChoice(accepted ? 'accepted' : 'rejected');
    if (accepted) trackPageView(window.location.pathname);
  };

  return <aside className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-2xl rounded-2xl border border-primary-200 bg-white p-5 text-primary-900 shadow-2xl" aria-label="Preferencia de medición">
    <p className="font-bold">Medición del sitio</p>
    <p className="mt-1 text-sm leading-relaxed text-gray-700">Con tu permiso usamos Google Analytics para conocer qué páginas se visitan y qué formas de contacto se usan. Podés seguir navegando sin aceptarlo.</p>
    <div className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => choose(true)} className="rounded-lg bg-primary-900 px-4 py-2 text-sm font-bold text-white">Aceptar medición</button><button type="button" onClick={() => choose(false)} className="rounded-lg border border-primary-300 px-4 py-2 text-sm font-bold text-primary-900">Rechazar</button></div>
  </aside>;
}
