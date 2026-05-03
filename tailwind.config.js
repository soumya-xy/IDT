/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#FDFBF7',
          100: '#F5F2E9',
          200: '#EAE3D2',
          300: '#DECFA9',
        },
        luxury: {
          dark: '#1C1A17',
          gold: '#C5A880',
          accent: '#A67B5B',
          soft: '#E8E1D9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia'],
      }
    },
  },
  plugins: [],
}
