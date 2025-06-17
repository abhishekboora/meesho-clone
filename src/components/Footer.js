// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-dark text-white py-8 mt-12 animate-fade-in">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-2 text-lg font-semibold">Meesho Clone</p>
        <p className="text-sm mb-4">© {new Date().getFullYear()} All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <Link to="/about" className="hover:text-meesho-pink transition duration-200 text-sm">About Us</Link>
          <Link to="/contact" className="hover:text-meesho-pink transition duration-200 text-sm">Contact</Link>
          <Link to="/privacy" className="hover:text-meesho-pink transition duration-200 text-sm">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;