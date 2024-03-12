/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        main: '#F8BB01',
        emerald: '#15ed79',
      },

      fontFamily: {
        jua: ['Jua', 'sans-serif'],
        dongle: ['Dongle', 'sans-serif'],
        undong: ['TTHakgyoansimUndongjangL'],
        score: ['S-CoreDream-3Light'],
        ansung: ['Ansungtangmyun-Bold'],
      },

      fontWeight: {
        extrabold: 800,
      },

      dropShadow: {
        '3xl': '14px 14px 11px -7px rgba(47,49,51,0.75)',
      },

      backgroundImage: (theme) => ({
        'rainbow-gradient':
          'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
      }),
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-textshadow'),
    function ({ addComponents }) {
      const newComponents = {
        '.selected-icon::before': {
          content: '""',
          position: 'absolute',
          bottom: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '10px solid #f8bb01',
          zIndex: '1',
        },
        '.selected-icon::after': {
          content: '""',
          position: 'absolute',
          bottom: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '10px solid #f8bb01',
          zIndex: '2',
        },
      };
      addComponents(newComponents);
    },
  ],
};
