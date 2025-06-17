import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct({
          id: data.id,
          name: data.title,
          price: data.price.toFixed(2),
          discount: Math.floor(Math.random() * 20) + 5, // Random discount
          image: data.image,
          description: data.description,
          category: data.category,
          rating: data.rating?.rate || 'N/A',
          reviewCount: data.rating?.count || 0
        });
        setError(null);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`${product.name} added to cart!`);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600 text-lg">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600 text-lg">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-10 text-gray-600 text-lg">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-light py-10 px-4 animate-fade-in">
      <div className="container mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col lg:flex-row gap-8 lg:gap-12 animate-slide-in-up">
        {/* Product Image Section */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 bg-gray-light rounded-xl shadow-inner">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-[500px] object-contain rounded-lg"
          />
        </div>

        {/* Product Info Section */}
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-dark mb-4">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-2">Category: <span className="font-semibold text-meesho-pink">{product.category}</span></p>

          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-bold text-meesho-pink">₹{product.price}</span>
            <span className="bg-meesho-green text-white text-base px-3 py-1 rounded-full font-semibold">{product.discount}% Off</span>
          </div>

          <div className="flex items-center gap-3 mb-6 text-gray-600 text-lg">
            <span>Rating: {product.rating} / 5</span>
            <span className="text-sm">({product.reviewCount} Reviews)</span>
          </div>

          <p className="text-gray-700 text-base leading-relaxed mb-8">{product.description}</p>

          <button
            className="bg-meesho-pink text-white py-4 px-8 rounded-lg font-bold text-xl hover:bg-meesho-pink-dark transition-all duration-300 shadow-xl hover:shadow-2xl self-start"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;