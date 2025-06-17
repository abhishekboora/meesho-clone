// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import CategoriesPage from './pages/CategoriesPage'; // <-- IMPORT THIS
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/categories" element={<CategoriesPage />} /> {/* <-- ADD THIS ROUTE */}
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;