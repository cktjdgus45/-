/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-color': '#FF914D',
        'sub-color': '#F9F5EC'
      },
      flexBasis: {
        '7/10': '70%',
        '2/10': '20%',
        '1/10': '10%',
      }
    }
  },
  plugins: [],
};