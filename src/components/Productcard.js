import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return null;
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 p-5 flex flex-col justify-between h-full animate-pop-in">
      <Link to={`/product/${product.id}`} className="block flex-grow">
        <div className="w-full h-56 md:h-64 flex items-center justify-center mb-4 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate-2-lines">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-meesho-pink mb-1">₹{product.price}</p>
        <p className="text-meesho-green font-medium text-sm mb-4">{product.discount}% Off</p>
      </Link>
      <button
        className="w-full bg-meesho-pink text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-meesho-pink-dark transition-all duration-300 shadow-md hover:shadow-lg"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;