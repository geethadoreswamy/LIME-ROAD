import React from 'react';
import './ProductPage.css';

const Footer = () => {
  return (
    <footer style={{
      marginTop: '40px',
      padding: '20px',
      backgroundColor: '#f8f8f8',
      borderTop: '1px solid #e0e0e0',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ marginBottom: '10px', color: '#666' }}>
          © 2023 LimeRoad. All rights reserved.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <a href="/about" style={{ color: '#333', textDecoration: 'none' }}>About Us</a>
          <a href="/contact" style={{ color: '#333', textDecoration: 'none' }}>Contact</a>
          <a href="/privacy" style={{ color: '#333', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="/terms" style={{ color: '#333', textDecoration: 'none' }}>Terms of Service</a>
          
        </div>
      </div>
    </footer>

  );
};

export default Footer;
