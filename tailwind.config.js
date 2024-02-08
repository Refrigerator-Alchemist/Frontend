/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        main: '#F8BB01',
      },

      fontFamily: {
        jua: ['Jua', 'sans-serif'],
      },

      dropShadow: {
        '3xl': '14px 14px 11px -7px rgba(47,49,51,0.75)',
      },
    },
  },
  plugins: [require('tailwindcss-textshadow')],
};
