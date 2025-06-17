// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // In a real app, you'd send these to an API for authentication
    console.log('Login attempt:', { email, password });
    alert('Login functionality is a placeholder. (Check console for inputs)');
    // Redirect on successful login
    // navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-light py-10 px-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 w-full max-w-md animate-pop-in">
        <h2 className="text-4xl font-extrabold text-meesho-pink text-center mb-10">Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 text-lg font-semibold mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink-dark text-lg"
              placeholder="your@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-lg font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink-dark text-lg"
              placeholder="********"
              required
            />
          </div>
          {error && <p className="text-red-600 text-center text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-meesho-pink text-white py-3 px-4 rounded-lg font-bold text-xl hover:bg-meesho-pink-dark transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
        <p className="mt-8 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-meesho-pink font-semibold hover:underline">Sign Up</Link>
        </p>
        <p className="mt-4 text-center text-gray-600 text-sm">
          <Link to="/forgot-password" className="text-meesho-pink hover:underline">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;