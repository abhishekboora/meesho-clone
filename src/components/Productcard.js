// D:\React\meesho\meesho-clone\src\components\ProductCard.js
import React, { useContext } from 'react'; // Import useContext
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import CartContext
import './ProductCard.css';

function ProductCard({ product }) {
  // Access the addToCart function from the CartContext
  const { addToCart } = useContext(CartContext);

  if (!product) {
    return null; // Or handle case where product prop is missing
  }

  const handleAddToCart = (e) => {
    // Prevent the Link from navigating when the button is clicked
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation to parent elements (like the Link)

    addToCart(product);
    alert(`${product.name} added to cart!`); // Simple feedback
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price}</p>
        <p className="product-discount">{product.discount}% Off</p>
      </Link>
      {/* Add an "Add to Cart" button */}
      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;