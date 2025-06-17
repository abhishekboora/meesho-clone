import React, { useEffect, useState } from 'react';
import ProductCard from '../components/Productcard';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  useEffect(() => {
    const fetchAndShuffleProducts = async () => {
      try {
        setLoading(true);
        // Fetch ALL products first
        const response = await fetch('https://fakestoreapi.com/products'); // Get all products
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();

        // Format products
        const formattedProducts = data.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price.toFixed(2),
          discount: Math.floor(Math.random() * 20) + 5,
          image: item.image,
          description: item.description,
          category: item.category
        }));

        // Shuffle the formatted products and take a subset (e.g., first 6)
        const shuffledAndLimitedProducts = shuffleArray([...formattedProducts]).slice(0, 6);
        setProducts(shuffledAndLimitedProducts);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch and shuffle products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndShuffleProducts();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen bg-gray-light py-10 animate-fade-in">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-meesho-pink text-center mb-12 animate-slide-in-up">
          Shop Best Deals on Meesho Clone
        </h1>

        {/* Placeholder for Carousel/Banner */}
        <section className="bg-white rounded-xl shadow-lg p-6 mb-12 animate-pop-in">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Daily Deals & Flash Sales
          </h2>
          <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xl">
            (Carousel/Banner Coming Soon!)
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 animate-pop-in">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-10 relative pb-4">
            Featured Products
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-meesho-pink rounded-full"></span>
          </h2>

          {loading ? (
            <div className="text-center py-10 text-gray-600 text-lg">Loading amazing products...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-600 text-lg">{error}</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-600 text-lg">No featured products found.</div>
          )}
        </section>
      </div>
    </div>
  );
}

export default HomePage;