import { useEffect, useRef } from 'react';

const clamp = value => Math.max(0, Math.min(1, value));
const between = (start, end, progress) => start + (end - start) * progress;

export default function HeroLogoTransition() {
  const movingLogo = useRef(null);

  useEffect(() => {
    const overlay = movingLogo.current;
    const anchor = document.getElementById('hero-logo-anchor');
    const headerLogo = document.getElementById('site-header-logo');
    const media = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
    if (!overlay || !anchor || !headerLogo) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      if (!media.matches) {
        overlay.style.display = 'none';
        headerLogo.style.opacity = '1';
        return;
      }

      const source = anchor.getBoundingClientRect();
      const target = headerLogo.getBoundingClientRect();
      const progress = clamp(window.scrollY / 320);
      const handoff = clamp((progress - 0.84) / 0.16);
      overlay.style.display = progress < 1 ? 'block' : 'none';
      overlay.style.left = `${between(source.left, target.left, progress)}px`;
      overlay.style.top = `${between(source.top + window.scrollY, target.top, progress)}px`;
      overlay.style.width = `${between(source.width, target.width, progress)}px`;
      overlay.style.height = `${between(source.height, target.height, progress)}px`;
      overlay.style.padding = `${between(12, 0, progress)}px`;
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
    };
  }, []);

  return <div ref={movingLogo} className="pointer-events-none fixed z-[60] hidden box-border overflow-hidden rounded-xl bg-white shadow-lg" aria-hidden="true"><img src="/logo-abm-franjas.svg" alt="" className="h-full w-full object-contain" /></div>;
}
