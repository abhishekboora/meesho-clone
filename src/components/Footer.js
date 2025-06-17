// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Create this CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Meesho Clone. All rights reserved.</p>
        {/* Add more footer links/information here */}
      </div>
    </footer>
  );
}

export default Footer;