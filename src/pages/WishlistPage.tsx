import React from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';
import { Heart, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WishlistPage() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const wishlistProducts = state.products.filter(product => 
    state.wishlist.includes(product.id)
  );

  const handleClearWishlist = () => {
    if (confirm('Are you sure you want to clear your wishlist?')) {
      dispatch({ type: 'CLEAR_WISHLIST' });
    }
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="w-full bg-gray-50 min-h-screen flex items-center justify-center page-enter">
        <div className="text-center animate-fadeInUp">
          <Heart className="w-32 h-32 text-gray-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Save your favorite products to your wishlist</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 font-bold text-lg transform hover:scale-105"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen page-enter">
      <div className="container mx-auto px-4 py-8">
        <ScrollReveal direction="down">
          <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Wishlist</h1>
            <p className="text-gray-600 text-lg">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleClearWishlist}
              className="text-red-600 hover:text-red-800 px-6 py-3 border-2 border-red-200 rounded-lg font-medium transition-all duration-300 hover:bg-red-50"
            >
              Clear Wishlist
            </button>
            <button
              onClick={() => navigate('/products')}
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-all duration-300 font-medium flex items-center space-x-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product, index) => (
            <ScrollReveal
              key={product.id}
              direction="up"
              delay={index * 150}
            >
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}