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
  variants: {},
  plugins: [
    require('tailwindcss-textshadow'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.selected-icon::after': {
          content: "''",
          display: 'inline-block',
          width: '0',
          height: '0',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderTop: '10px solid #f8bb01',
          position: 'absolute',
          bottom: '-10px',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
