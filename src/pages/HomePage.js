// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/Productcard';
import './HomePage.css';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetching 6 products from FakeStoreAPI for homepage display
        // In a real app, you might fetch 'featured' or 'trending' products specifically
        const response = await fetch('https://fakestoreapi.com/products?limit=6');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Map the FakeStoreAPI data to match your ProductCard's expected props
        // FakeStoreAPI fields: id, title, price, description, category, image, rating {rate, count}
        // Your ProductCard expects: id, name, price, discount, image
        const formattedProducts = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price.toFixed(2), // Format price to 2 decimal places
          discount: Math.floor(Math.random() * 20) + 5, // Random discount for demo (FakeStoreAPI doesn't have it)
          image: item.image,
          description: item.description // Keep description if you want to use it later
        }));
        setProducts(formattedProducts);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="homepage-message">Loading featured products...</div>;
  }

  if (error) {
    return <div className="homepage-message error-message">{error}</div>;
  }

  return (
    <div className="homepage">
      <h1>Shop Best Deals on Meesho Clone</h1>
      {/* Implement a carousel/banner section here */}
      <section className="featured-products">
        <h2>Featured Products</h2>
        {products.length > 0 ? (
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="homepage-message">No featured products found.</div>
        )}
      </section>
      {/* Add categories, trending products, etc. */}
    </div>
  );
}

export default HomePage;