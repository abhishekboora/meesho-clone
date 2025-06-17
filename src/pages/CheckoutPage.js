// src/pages/CheckoutPage.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to Cash on Delivery

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity * item.discount / 100), 0);
  const finalTotal = subtotal - totalDiscount;

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checking out.');
      navigate('/products');
      return;
    }
    // Basic validation
    if (!shippingAddress.fullName || !shippingAddress.address1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip || !shippingAddress.phone) {
      alert('Please fill in all required shipping details.');
      return;
    }

    console.log('Order Details:', {
      items: cartItems,
      shippingAddress,
      paymentMethod,
      total: finalTotal.toFixed(2),
    });

    // In a real app, send this data to your backend API
    alert('Order Placed Successfully! (This is a mock order)');
    clearCart(); // Clear cart after successful order
    navigate('/order-confirmation'); // Redirect to a confirmation page
  };

  if (cartItems.length === 0 && !sessionStorage.getItem('orderPlaced')) { // Check if order was just placed
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-light py-10 px-4">
            <div className="bg-white rounded-xl shadow-lg p-10 text-center animate-pop-in">
                <p className="text-xl text-gray-600 mb-6">Your cart is empty. Please add items before checking out.</p>
                <Link
                to="/products"
                className="inline-block bg-meesho-pink text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-meesho-pink-dark transition-all duration-300 shadow-md hover:shadow-lg"
                >
                Shop Now
                </Link>
            </div>
        </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-light py-10 px-4 animate-fade-in">
      <div className="container mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 animate-slide-in-up">
        <h2 className="text-4xl font-extrabold text-meesho-pink text-center mb-12">Checkout</h2>

        <form onSubmit={handlePlaceOrder}>
          {/* Shipping Address Section */}
          <section className="mb-10 bg-gray-light rounded-xl shadow-inner p-6">
            <h3 className="text-2xl font-bold text-gray-dark mb-6 border-b-2 border-meesho-pink pb-3">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-full">
                <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink-dark"
                  required
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="address1" className="block text-gray-700 font-semibold mb-2">Address Line 1</label>
                <input
                  type="text"
                  id="address1"
                  name="address1"
                  value={shippingAddress.address1}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink-dark"
                  required
                />
              </div>
              <div className="col-span-full">
                <label htmlFor="address2" className="block text-gray-700 font-semibold mb-2">Address Line 2 (Optional)</label>
                <input
                  type="text"
                  id="address2"
                  name="address2"
                  value={shippingAddress.address2}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink-dark"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink-dark"
                  required
                />
              </div>
              <div>
                <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink-dark"
                  required
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-gray-700 font-semibold mb-2">Zip Code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={shippingAddress.zip}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink-dark"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={shippingAddress.phone}
                  onChange={handleShippingChange}
                  className="w-full px-4 py-3 border border-gray-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-meesho-pink-dark"
                  required
                />
              </div>
            </div>
          </section>

          {/* Payment Method Section */}
          <section className="mb-10 bg-gray-light rounded-xl shadow-inner p-6">
            <h3 className="text-2xl font-bold text-gray-dark mb-6 border-b-2 border-meesho-pink pb-3">Payment Method</h3>
            <div className="space-y-4">
              <label className="flex items-center text-lg text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="form-radio h-5 w-5 text-meesho-pink mr-3"
                />
                Cash on Delivery (COD)
              </label>
              <label className="flex items-center text-lg text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="form-radio h-5 w-5 text-meesho-pink mr-3"
                  disabled // Disable for now as it's not implemented
                />
                Online Payment (Credit/Debit Card, UPI) - Coming Soon
              </label>
            </div>
          </section>

          {/* Order Summary */}
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-2xl font-bold text-gray-dark mb-6 border-b-2 border-meesho-pink pb-3">Order Summary</h3>
            <div className="space-y-3 text-lg text-gray-700">
              {cartItems.map(item => (
                <p key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-medium">{item.name} (x{item.quantity})</span>
                  <span className="font-semibold text-gray-dark">₹{(item.price * item.quantity).toFixed(2)}</span>
                </p>
              ))}
              <p className="flex justify-between pt-2">Subtotal: <span className="font-semibold">₹{subtotal.toFixed(2)}</span></p>
              <p className="flex justify-between text-meesho-green">Discount: <span className="font-semibold">- ₹{totalDiscount.toFixed(2)}</span></p>
              <p className="flex justify-between text-3xl font-bold border-t pt-4 mt-4">Total: <span className="text-meesho-pink">₹{finalTotal.toFixed(2)}</span></p>
            </div>
            <button
              type="submit"
              className="w-full bg-meesho-green text-white py-4 px-6 rounded-lg font-bold text-xl hover:bg-meesho-green-dark transition-all duration-300 shadow-xl hover:shadow-2xl mt-8"
            >
              Place Order
            </button>
          </section>
        </form>

        <p className="text-center mt-8">
          <Link to="/cart" className="text-meesho-pink font-semibold hover:underline">
            ← Back to Cart
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CheckoutPage;