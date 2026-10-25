import { useEffect, useState } from 'react';

const ribbons = [
  ['M-100 60 C350 270 950 -120 1700 110 L1700 155 C950 -65 350 325 -100 110Z', 'M-100 150 C350 -120 950 300 1700 40 L1700 95 C950 365 350 -65 -100 205Z'],
  ['M-100 330 C450 100 1000 540 1700 290 L1700 350 C1000 590 450 165 -100 395Z', 'M-100 240 C450 550 1000 70 1700 410 L1700 470 C1000 140 450 620 -100 305Z'],
  ['M-100 610 C500 850 1050 350 1700 630 L1700 690 C1050 430 500 910 -100 675Z', 'M-100 710 C500 390 1050 910 1700 540 L1700 600 C1050 980 500 460 -100 775Z'],
  ['M-100 980 C500 690 1050 1150 1700 910 L1700 980 C1050 1220 500 760 -100 1050Z', 'M-100 870 C500 1170 1050 710 1700 1040 L1700 1110 C1050 780 500 1240 -100 940Z'],
];

export default function WaveBackdrop() {
  const [reducedMotion, setReducedMotion] = useState(true);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return <svg className="home-wave-art" viewBox="0 0 1600 1200" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="abm-wave-blue" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#c5dce8" stopOpacity=".65" />
        <stop offset="1" stopColor="#99bfe6" stopOpacity=".2" />
      </linearGradient>
    </defs>
    <g fill="url(#abm-wave-blue)">
      {ribbons.map(([start, middle], index) => <path key={start} d={start}>
        {!reducedMotion && <animate attributeName="d" values={`${start};${middle};${start}`} dur={`${9 + index * 2}s`} repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" />}
      </path>)}
    </g>
  </svg>;
}
