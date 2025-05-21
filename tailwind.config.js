/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A3161',
          light: '#1D4A7D',
          dark: '#072348'
        },
        gold: {
          DEFAULT: '#C4B17A',
          light: '#D6C798',
          dark: '#B29A5D'
        },
        charcoal: {
          DEFAULT: '#333F48',
          light: '#4A5761',
          dark: '#1C2328'
        },
        lightblue: {
          DEFAULT: '#7D98B3',
          light: '#9FB3C7',
          dark: '#5A7A9A'
        },
        silver: {
          DEFAULT: '#E5E7E9',
          light: '#F4F6F7',
          dark: '#C5CCD1'
        },
        sage: {
          DEFAULT: '#58776C',
          light: '#7A9589',
          dark: '#3F5A51'
        },
        burgundy: {
          DEFAULT: '#722F37',
          light: '#954049',
          dark: '#521E25'
        }
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Source Sans Pro', 'sans-serif']
      },
      boxShadow: {
        'card': '0px 2px 4px rgba(0,0,0,0.05)',
        'card-hover': '0px 4px 8px rgba(0,0,0,0.1)'
      }
    },
  },
  plugins: [],
};