/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-color': '#FF914D',
        'hover-main-color': '#EF7931',
        'sub-color': '#F9F5EC',
        'span-color': '#231F1F',
        'third-color': '#F3F3F3',
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