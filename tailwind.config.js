/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./about.html",
    "./services.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'radbridge-blue': '#28506C', // Primary
        'radbridge-gold': '#D19B46', // Secondary
        primary: '#28506C',
        secondary: '#D19B46',
      },
      fontFamily: {
        sans: ['"Public Sans"', 'sans-serif'],
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