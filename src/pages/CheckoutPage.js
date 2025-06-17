// src/pages/CheckoutPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function CheckoutPage() {
  // In a real app, this page would involve:
  // 1. Displaying cart summary
  // 2. Shipping address form
  // 3. Payment method selection
  // 4. Order confirmation
  const handlePlaceOrder = () => {
    alert("Order Placed! (This is a placeholder)");
    // In a real app, you'd send order data to your backend
    // and then typically redirect to an order confirmation page.
  };

  return (
    <div className="checkout-page">
      <h2>Proceed to Checkout</h2>
      <div className="checkout-sections">
        <div className="section">
          <h3>1. Shipping Address</h3>
          <form>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" name="fullName" required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" name="address" required />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" required />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input type="text" id="pincode" name="pincode" required />
            </div>
            {/* Add more address fields */}
          </form>
        </div>

        <div className="section">
          <h3>2. Payment Method</h3>
          <p>Payment options (e.g., UPI, NetBanking, Card, COD)</p>
          <div className="payment-options">
            <label>
              <input type="radio" name="paymentMethod" value="cod" defaultChecked /> Cash on Delivery
            </label>
            <br />
            <label>
              <input type="radio" name="paymentMethod" value="online" disabled /> Online Payment (Coming Soon)
            </label>
          </div>
        </div>

        <div className="section">
          <h3>3. Order Summary</h3>
          <p>Total items: X</p>
          <p>Total amount: ₹Y.YY</p>
          {/* This should ideally pull from the CartContext */}
          <button onClick={handlePlaceOrder} className="place-order-btn">Place Order</button>
          <Link to="/cart" className="back-to-cart-link">Back to Cart</Link>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;