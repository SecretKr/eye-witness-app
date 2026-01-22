/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // Zinc 950
        surface: '#18181b',    // Zinc 900
        primary: '#8B5CF6',    // Violet 500
        secondary: '#10B981',  // Emerald 500
        'surface-glass': 'rgba(24, 24, 27, 0.5)',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #10B981 0%, #8B5CF6 100%)', // Emerald to Violet
        'panic-gradient': 'linear-gradient(135deg, #34D399 0%, #3B82F6 100%)', // Teal to Blue
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
