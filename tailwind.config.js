// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'meesho-pink': '#f43397',
        'meesho-pink-dark': '#e02a87',
        'meesho-green': '#4CAF50',
        'meesho-green-dark': '#218838',
        'gray-light': '#f8f9fa',
        'gray-medium': '#e0e0e0',
        'gray-dark': '#333',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-up': 'slideInUp 0.6s ease-out forwards',
        'pop-in': 'popIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}