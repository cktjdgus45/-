/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-color': '#776B5D',
        'hover-main-color': '#B0A695',
        'sub-color': '#EBE3D5',
        'span-color': '#231F1F',
        'third-color': '#F3EEEA',
      },
      flexBasis: {
        '7/10': '70%',
        '2/10': '20%',
        '1/10': '10%',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    }
  },
  plugins: [],
};