import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity * item.discount / 100), 0);
  const finalTotal = subtotal - totalDiscount;

  return (
    <div className="min-h-screen bg-gray-light py-10 px-4 animate-fade-in">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-meesho-pink text-center mb-12 animate-slide-in-up">Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center animate-pop-in">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty. Start shopping now!</p>
            <Link
              to="/products"
              className="inline-block bg-meesho-pink text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-meesho-pink-dark transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 md:p-8 animate-slide-in-up">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center border-b border-gray-200 py-4 last:border-b-0 animate-pop-in">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0 w-24 h-24 mr-6 rounded-lg overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </Link>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-dark mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-lg mb-1">₹{item.price}</p>
                    <p className="text-meesho-green text-sm font-medium mb-2">{item.discount}% Off</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-lg hover:bg-gray-300 transition-colors duration-200"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="font-semibold text-xl">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-lg hover:bg-gray-300 transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors duration-200 flex-shrink-0"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="mt-6 text-right">
                <button
                  onClick={clearCart}
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 shadow-md"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 md:p-8 h-fit animate-slide-in-up">
              <h3 className="text-2xl font-bold text-gray-dark mb-6 border-b pb-4">Order Summary</h3>
              <div className="space-y-3 text-lg text-gray-700">
                <p className="flex justify-between">Subtotal: <span className="font-semibold">₹{subtotal.toFixed(2)}</span></p>
                <p className="flex justify-between text-meesho-green">Discount: <span className="font-semibold">- ₹{totalDiscount.toFixed(2)}</span></p>
                <p className="flex justify-between text-2xl font-bold border-t pt-4 mt-4">Total: <span className="text-meesho-pink">₹{finalTotal.toFixed(2)}</span></p>
              </div>
              <Link
                to="/checkout"
                className="block text-center bg-meesho-green text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-meesho-green-dark transition-all duration-300 shadow-lg mt-8"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;