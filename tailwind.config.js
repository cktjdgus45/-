/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "mobile": "670px",//sm
      "laptop": "1024px",//lg
      "desktop": "1280px"//xl
    },
    extend: {
      colors: {
        'main-color': '#776B5D',//1
        'hover-main-color': '#B0A695',//2
        'sub-color': '#EBE3D5',//3
        'span-color': '#231F1F',
        'third-color': '#F3EEEA',//4
        'glass': 'hsla(0,0%,100%,.2)',
        'glass-md': 'hsla(0,0%,80%,.4)',
        'glass-base': 'hsla(0,0%,60%,.6)',
        'glass-sm': 'hsla(0,0%,40%,.8)',
        'glass-xs': 'hsla(0,0%,20%,1.0)',
      },
      backgroundColor: {
        'glass': 'hsla(0,0%,100%,.2)',
        'glass-md': 'hsla(0,0%,80%,.4)',
        'glass-base': 'hsla(0,0%,60%,.6)',
        'glass-sm': 'hsla(0,0%,40%,.8)',
        'glass-xs': 'hsla(0,0%,20%,1.0)',
        'main-color': '#776B5D',//1
        'hover-main-color': '#B0A695',//2
        'sub-color': '#EBE3D5',//3

      },
      borderColor: {
        'glass': 'hsla(0,0%,100%,.2)',
        'glass-md': 'hsla(0,0%,80%,.4)',
        'glass-base': 'hsla(0,0%,60%,.6)',
        'glass-sm': 'hsla(0,0%,40%,.8)',
        'glass-xs': 'hsla(0,0%,20%,1.0)',
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
  plugins: ['tailwind-scrollbar-hide'],
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
    },
  },
};