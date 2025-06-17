import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Productcard';

function ProductListingPage() {
  const [allProducts, setAllProducts] = useState([]); // Stores the full (or category-filtered) product list
  const [displayedProducts, setDisplayedProducts] = useState([]); // Products currently shown (after search/shuffle)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const categoryQuery = searchParams.get('category');

  // Function to shuffle an array (can be moved to a utility file if reused extensively)
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const apiUrl = categoryQuery
          ? `https://fakestoreapi.com/products/category/${encodeURIComponent(categoryQuery)}`
          : 'https://fakestoreapi.com/products'; // Fetch all if no specific category

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();

        const formattedProducts = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price.toFixed(2),
          discount: Math.floor(Math.random() * 20) + 5,
          image: item.image,
          description: item.description,
          category: item.category
        }));

        setAllProducts(formattedProducts); // Store the fetched products
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryQuery]); // Re-fetch products if category changes

  useEffect(() => {
    let currentProducts = [...allProducts]; // Start with all fetched products

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentProducts = currentProducts.filter(product =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        (product.description && product.description.toLowerCase().includes(lowerCaseQuery)) ||
        (product.category && product.category.toLowerCase().includes(lowerCaseQuery))
      );
    } else {
      // If no search query, and no specific category was used in API call (or it was, but we still want to randomize that category's items)
      // Shuffle only if there's no active search filter.
      // If categoryQuery is present, it means `allProducts` already contains category-filtered items,
      // and we want to randomize *those* items.
      currentProducts = shuffleArray(currentProducts);
    }

    setDisplayedProducts(currentProducts);
  }, [searchQuery, allProducts]); // Re-filter/shuffle when search query or fetched products change

  const pageTitle = searchQuery
    ? `Search Results for "${searchQuery}"`
    : categoryQuery
      ? `${categoryQuery.replace(/-/g, ' ').toUpperCase()} Products`
      : 'All Products';

  if (loading) {
    return <div className="text-center py-10 text-gray-600 text-lg">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600 text-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-light py-10 px-4 animate-fade-in">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-meesho-pink text-center mb-12 animate-slide-in-up">
          {pageTitle}
        </h1>

        {displayedProducts.length > 0 ? (
          <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-pop-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-10 text-gray-600 text-lg bg-white rounded-xl shadow-lg">
            {searchQuery || categoryQuery ? `No results found for "${searchQuery || categoryQuery}".` : 'No products found.'}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductListingPage;