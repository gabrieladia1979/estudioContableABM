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
      const progress = clamp(window.scrollY / 240);
      const eased = progress * progress * (3 - 2 * progress);
      const handoff = clamp((progress - 0.96) / 0.04);
      overlay.style.display = progress < 1 ? 'block' : 'none';
      const left = between(source.left, target.left, eased);
      const top = between(source.top + window.scrollY, target.top, eased);
      const scale = between(source.width / target.width, 1, eased);
      overlay.style.width = `${target.width}px`;
      overlay.style.height = `${target.height}px`;
      overlay.style.transform = `translate3d(${left}px, ${top}px, 0) scale(${scale})`;
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

  return <div ref={movingLogo} className="hero-brand-motion pointer-events-none fixed left-0 top-0 z-[60] hidden origin-top-left" aria-hidden="true"><img src="/logo-abm-franjas.svg" alt="" className="h-full w-full object-contain" /></div>;
}
