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
          50: '#fdf8f5',
          100: '#fce8e0',
          200: '#f8d0c2',
          300: '#f4b8a3',
          400: '#e89b7f',
          500: '#d47e5c',
          600: '#b85a3a',
          700: '#8B3A1F',
          800: '#6B2817',
          900: '#4B1A0F',
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
          50: '#fffbf0',
          100: '#fff4d6',
          200: '#ffe8a8',
          300: '#ffd680',
          400: '#ffbd47',
          500: '#d4af37',
          600: '#aa8c2c',
          700: '#806a22',
          800: '#664d1a',
          900: '#4d3912',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
