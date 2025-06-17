import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

  return (
    <div className="min-h-screen bg-gray-light py-10 px-4 animate-fade-in">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-meesho-pink text-center mb-12 animate-slide-in-up">
          Explore Product Categories
        </h2>

        {loading ? (
          <div className="text-center py-10 text-gray-600 text-lg">Loading categories...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600 text-lg">{error}</div>
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pop-in">
            {categories.map((category, index) => (
              <Link
                to={`/products?category=${encodeURIComponent(category)}`}
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col items-center justify-center text-center min-h-[160px]"
              >
                {/* Placeholder for category icon/image if you had them */}
                <div className="mb-3 text-meesho-pink-dark text-4xl">
                  {/* You can add specific icons here based on category name */}
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 capitalize">
                  {category.replace(/-/g, ' ')}
                </h3>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-600 text-lg bg-white rounded-xl shadow-lg">No categories found.</div>
        )}
      </div>
    </div>
  );
}

export default CategoriesPage;