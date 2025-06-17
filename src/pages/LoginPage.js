// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // Create this CSS file for styling

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send these credentials to your backend for authentication
    console.log('Login attempt:', { email, password });
    alert('Login functionality not implemented (frontend demo)');
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h2>Login to your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
        <p className="forgot-password-link">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;