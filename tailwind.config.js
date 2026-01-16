/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43', // Navy Blue profundo
          950: '#001A33', // Aún más oscuro para contrastes
        },
        secondary: {
          50: '#f8fbfc',
          100: '#ecf2f6',
          200: '#d9e8f0',
          300: '#c5dce8',
          400: '#99bfe6',
          500: '#6b9fd4',
          600: '#4f7fbd',
          700: '#3d5f99',
          800: '#2d4567',
          900: '#1a2d42',
        },
        accent: {
          50: '#fff5f0',
          100: '#ffe0cc',
          200: '#ffccaa',
          300: '#ffb380',
          400: '#ff9966',
          500: '#f05a22', // Naranja vibrante tipo el screenshot
          600: '#d1400a',
          700: '#a33005',
          800: '#7a2202',
          900: '#521400',
        }
      },
      fontFamily: {
        'playfair': ['Inter', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
