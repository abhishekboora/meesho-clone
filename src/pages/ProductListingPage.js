// src/pages/ProductListingPage.js
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import ProductCard from '../components/Productcard';
import './ProductListingPage.css'; // Make sure this CSS file exists

function ProductListingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        // Fetching all products from FakeStoreAPI
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const formattedProducts = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price.toFixed(2),
          discount: Math.floor(Math.random() * 20) + 5, // Random discount for demo
          image: item.image,
          description: item.description
        }));
        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch all products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) {
    return <div className="product-listing-message">Loading all products...</div>;
  }

  if (error) {
    return <div className="product-listing-message error-message">{error}</div>;
  }

  return (
    <div className="product-listing-page">
      <h1>All Products</h1>
      {products.length > 0 ? (
        <section className="all-products">
          <div className="product-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <div className="product-listing-message">No products found.</div>
      )}
    </div>
  );
}

export default ProductListingPage;