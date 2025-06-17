    // src/pages/CategoriesPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CategoriesPage.css'; // We'll create this CSS file next

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="categories-page-message">Loading categories...</div>;
  }

  if (error) {
    return <div className="categories-page-message error-message">{error}</div>;
  }

  return (
    <div className="categories-page">
      <h2>Explore Categories</h2>
      {categories.length > 0 ? (
        <div className="category-grid">
          {categories.map((category, index) => (
            <Link
              to={`/products?category=${encodeURIComponent(category)}`} // Link to products page, filtered by category
              key={index}
              className="category-card"
            >
              <h3 className="category-name">{category.replace(/-/g, ' ').toUpperCase()}</h3>
              {/* You could add category icons or images here if your API provided them */}
            </Link>
          ))}
        </div>
      ) : (
        <div className="categories-page-message">No categories found.</div>
      )}
    </div>
  );
}

export default CategoriesPage;