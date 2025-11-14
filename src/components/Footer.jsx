import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ backgroundColor: '#333', color: 'white', padding: '1rem', textAlign: 'center', marginTop: 'auto' }}>
      <p>&copy; {currentYear} your name. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;