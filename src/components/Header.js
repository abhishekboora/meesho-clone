// src/components/Header.js
import React, { useContext, useState } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { CartContext } from '../context/CartContext';
import './Header.css'; // Make sure this CSS file exists for styling

function Header() {
  const { cartItems } = useContext(CartContext);
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    if (searchQuery.trim()) { // Only navigate if query is not empty
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear search bar after submission
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Meesho Clone</Link>

        {/* Search Form */}
        <form className="search-bar-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <i className="fa fa-search"></i> {/* For a search icon, if you use Font Awesome */}
            Search
          </button>
        </form>

        <nav className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/cart">
            Cart ({totalItemsInCart})
          </Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;