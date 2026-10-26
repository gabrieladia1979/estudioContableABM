import { useEffect, useRef } from 'react';

const clamp = value => Math.max(0, Math.min(1, value));
const between = (start, end, progress) => start + (end - start) * progress;

export default function HeroLogoTransition() {
  const movingLogo = useRef(null);
  const onLight = useRef(null);
  const onDark = useRef(null);

  useEffect(() => {
    const overlay = movingLogo.current;
    const anchor = document.getElementById('hero-logo-anchor');
    const headerLogo = document.getElementById('site-header-logo');
    const staticLogo = anchor?.querySelector('img');
    const lightLogo = onLight.current;
    const darkLogo = onDark.current;
    const media = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    if (!overlay || !anchor || !headerLogo || !lightLogo || !darkLogo) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!media.matches) {
        overlay.style.display = 'none';
        headerLogo.style.opacity = '1';
        if (staticLogo) staticLogo.style.opacity = '1';
        return;
      }

      const source = anchor.getBoundingClientRect();
      const target = headerLogo.getBoundingClientRect();
      if (staticLogo) staticLogo.style.opacity = '0';
      const progress = clamp(window.scrollY / 360);
      const eased = progress * progress * (3 - 2 * progress);
      const handoff = clamp((progress - 0.96) / 0.04);
      overlay.style.display = progress < 1 ? 'block' : 'none';
      const left = between(source.left, target.left, eased);
      const top = between(source.top + window.scrollY, target.top, eased);
      const height = between(source.height, target.height, eased);
      const headerBottom = headerLogo.closest('header').getBoundingClientRect().bottom;
      const lightPortion = clamp((headerBottom - top) / height) * 100;
      overlay.style.left = `${left}px`;
      overlay.style.top = `${top}px`;
      overlay.style.width = `${between(source.width, target.width, eased)}px`;
      overlay.style.height = `${height}px`;
      lightLogo.style.clipPath = `inset(0 0 ${100 - lightPortion}% 0)`;
      darkLogo.style.clipPath = `inset(${lightPortion}% 0 0 0)`;
      overlay.style.opacity = `${1 - handoff}`;
      headerLogo.style.opacity = `${handoff}`;
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    media.addEventListener('change', requestUpdate);
    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      media.removeEventListener('change', requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      headerLogo.style.opacity = '';
      if (staticLogo) staticLogo.style.opacity = '';
    };
  }, []);

  return <div ref={movingLogo} className="hero-brand-motion pointer-events-none fixed left-0 top-0 z-[60] hidden" aria-hidden="true"><img ref={onDark} src="/branding/abm-firma-inversa.svg" alt="" className="absolute inset-0 h-full w-full object-contain" /><img ref={onLight} src="/branding/abm-firma.svg" alt="" className="absolute inset-0 h-full w-full object-contain" /></div>;
}
