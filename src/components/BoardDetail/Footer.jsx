import React from 'react';
import Navigation from '../ui/Navigation';

const Footer = () => {
  return (
    <footer
      style={{
        position: 'fixed',
        bottom: '0',
        width: '100%',
        maxWidth: '31rem',
      }}
    >
      <Navigation />
    </footer>
  );
};

export default Footer;
