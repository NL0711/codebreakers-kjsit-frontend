/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0D191E',
        accent: '#635bff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(to right, #0D191E, #1A2B35)',
        'hero-bg': "url('/src/assets/header-bg.svg')"
      },
    },
  },
  plugins: [],
} 