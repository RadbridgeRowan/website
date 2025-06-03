/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./about.html",
    "./services.html",
    "./projects.html",
    "./grantspan.html",
    "./parkbeat.html",
    "./tools.html",
    "./projects-test.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'radbridge-blue': '#28506C', // Primary
        'radbridge-gold': '#D19B46', // Secondary
        'light-gold': '#EAD6A8',
        'light-grey': '#F4F4F4', 
        'dark-blue': '#062941',
        'black': '#0A0B0B',
      },
      fontFamily: {
        ibm: ['IBM Plex Sans', 'sans-serif'],
        sans: ['"Public Sans"', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        'source-sans': ['"Source Sans Pro"', 'Arial', 'sans-serif'],
        lato: ['Lato', 'Helvetica', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        }
      }
    },
  },
  plugins: [],
}