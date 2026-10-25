export default function WaveBackdrop() {
  return <svg className="home-wave-art" viewBox="0 0 1600 1200" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="abm-wave-blue" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#c5dce8" stopOpacity=".65" />
        <stop offset="1" stopColor="#99bfe6" stopOpacity=".2" />
      </linearGradient>
    </defs>
    <g fill="url(#abm-wave-blue)">
      <path d="M-100 60 C350 270 950 -120 1700 110 L1700 155 C950 -65 350 325 -100 110Z" />
      <path d="M-100 330 C450 100 1000 540 1700 290 L1700 350 C1000 590 450 165 -100 395Z" />
      <path d="M-100 610 C500 850 1050 350 1700 630 L1700 690 C1050 430 500 910 -100 675Z" />
      <path d="M-100 980 C500 690 1050 1150 1700 910 L1700 980 C1050 1220 500 760 -100 1050Z" />
    </g>
  </svg>;
}
