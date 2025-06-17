// src/pages/ProductListingPage.js
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Productcard';
import './ProductListingPage.css';

function ProductListingPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const categoryQuery = searchParams.get('category'); // <-- GET CATEGORY PARAMETER

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        // If a category is specified, fetch products for that category only
        // Otherwise, fetch all products
        const apiUrl = categoryQuery
          ? `https://fakestoreapi.com/products/category/${encodeURIComponent(categoryQuery)}`
          : 'https://fakestoreapi.com/products';

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const formattedProducts = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price.toFixed(2),
          discount: Math.floor(Math.random() * 20) + 5,
          image: item.image,
          description: item.description,
          category: item.category // Ensure category is stored with product
        }));
        setAllProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [categoryQuery]); // <-- Re-run effect when categoryQuery changes

  // Effect to filter products whenever allProducts or searchQuery changes
  // This will now apply search filter ON TOP of any category filter (if category was used in API call)
  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const results = allProducts.filter(product =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        (product.description && product.description.toLowerCase().includes(lowerCaseQuery)) ||
        (product.category && product.category.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(allProducts); // If no search query, show all products (which are already category filtered if categoryQuery exists)
    }
  }, [searchQuery, allProducts]);

  if (loading) {
    return <div className="product-listing-message">Loading products...</div>;
  }

  if (error) {
    return <div className="product-listing-message error-message">{error}</div>;
  }

  const pageTitle = searchQuery
    ? `Search Results for "${searchQuery}"`
    : categoryQuery
      ? `${categoryQuery.replace(/-/g, ' ').toUpperCase()} Products` // Clean up category display
      : 'All Products';

  return (
    <div className="product-listing-page">
      <h1>{pageTitle}</h1>
      {filteredProducts.length > 0 ? (
        <section className="all-products">
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : (
        <div className="product-listing-message">
          {searchQuery || categoryQuery ? `No results found for "${searchQuery || categoryQuery}".` : 'No products found.'}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;