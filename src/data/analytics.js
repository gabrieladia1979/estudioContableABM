const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const consentKey = 'abm_analytics_consent';
let active = false;

export const analyticsAvailable = Boolean(measurementId && /^G-[A-Z0-9]+$/.test(measurementId));
export const getAnalyticsConsent = () => window.localStorage.getItem(consentKey);

export function startAnalytics() {
  if (!analyticsAvailable || active || getAnalyticsConsent() !== 'accepted') return;
  active = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const method = href.startsWith('https://wa.me/') ? 'whatsapp' : href.startsWith('mailto:') ? 'email' : href.startsWith('tel:') ? 'phone' : null;
    if (method) trackEvent('contact_click', { contact_method: method, page_path: window.location.pathname });
  });
}

export function setAnalyticsConsent(accepted) {
  window.localStorage.setItem(consentKey, accepted ? 'accepted' : 'rejected');
  if (accepted) startAnalytics();
}

export function trackEvent(name, parameters = {}) {
  if (active) window.gtag('event', name, parameters);
}

export function trackPageView(pathname) {
  trackEvent('page_view', { page_location: `${window.location.origin}${pathname}`, page_title: document.title });
}
