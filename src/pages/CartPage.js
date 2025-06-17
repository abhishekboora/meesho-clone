// src/pages/CartPage.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="shop-now-btn">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items-container">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="remove-item-btn">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Total Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
        <p>Subtotal: ₹{calculateTotalPrice().toFixed(2)}</p>
        {/* Add shipping, discounts, etc. */}
        <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
        <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
      </div>
    </div>
  );
}

export default CartPage;