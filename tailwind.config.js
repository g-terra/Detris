/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gameboy-green': '#DFFFD6', // A light green background reminiscent of Game Boy
      },
      fontFamily: {
        retro: ['"Press Start 2P"', 'monospace'], // Retro, pixelated look
      },
    },
  },
  plugins: [],
};