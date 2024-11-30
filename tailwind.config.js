/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        main: '#f8bb01',
        emerald: '#15ed79',
        indigo: '#6366f1',
      },

      fontFamily: {
        jua: ['Jua', 'sans-serif'],
        score: ['S-CoreDream-3Light'],
        scoreExtrabold: ['S-CoreDream-7ExtraBold'],
        seoyun: ['LeeSeoyun'],
      },

      fontSize: {
        '2xs': '.3rem',
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
        // Navbar 아이콘 액티브 인디케이터 '▲'
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
        // 전역 버튼 스타일
        '.btn': {
          display: 'inline-block',
          whiteSpace: 'nowrap',
          height: '3rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          marginLeft: '1.25rem',
          marginTop: '0.5rem',
          color: '#ffffff',
          backgroundColor: '#F8BB01',
          borderRadius: '1.5rem',
          fontFamily: 'S-CoreDream-7ExtraBold',
          fontWeight: '800',
          fontSize: '1.25rem',
          transition: 'ease-in-out 0.3s',
          '&:hover': {
            cursor: 'pointer',
            transform: 'scale(1.1)',
            backgroundColor: '#6366f1',
          },
        },
      };
      addComponents(newComponents);
    },
  ],
};
