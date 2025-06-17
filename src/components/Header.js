import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Header() {
  const { cartItems } = useContext(CartContext);
  const totalItemsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-lg py-3 sticky top-0 z-50 animate-fade-in">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="text-3xl font-extrabold text-meesho-pink tracking-tight">
          Meesho Clone
        </Link>

        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="flex-grow max-w-xl w-full md:w-auto">
          <div className="flex bg-white border border-gray-medium rounded-lg overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-grow px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-meesho-pink-dark rounded-l-lg"
            />
            <button
              type="submit"
              className="bg-meesho-pink text-white px-5 py-2 font-semibold hover:bg-meesho-pink-dark transition-all duration-300 flex items-center justify-center gap-2 rounded-r-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>

        <nav className="flex items-center gap-6 text-gray-dark font-medium flex-wrap justify-center md:justify-end">
          <Link to="/products" className="hover:text-meesho-pink transition duration-200">Products</Link>
          <Link to="/categories" className="hover:text-meesho-pink transition duration-200">Categories</Link>
          <Link to="/cart" className="relative hover:text-meesho-pink transition duration-200">
            Cart
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )}
          </Link>
          <Link to="/login" className="hover:text-meesho-pink transition duration-200">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;