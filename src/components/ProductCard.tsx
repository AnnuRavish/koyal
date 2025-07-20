import React, { useState } from 'react';
import { Star, Eye, Award, Zap, X, Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    
    setTimeout(() => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          quantity: 1,
          description: product.description,
        },
      });
      setIsAddingToCart(false);
    }, 800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product.id });
    }
  };

  const handleRemoveFromCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cartItem = state.cart.find(item => item.productId === product.id);
    if (cartItem) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: cartItem.id });
    }
  };

  const isInCart = state.cart.some(item => item.productId === product.id);
  const isInWishlist = state.wishlist.includes(product.id);

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const getCurrentImage = () => {
    const availableImages = product.images || [product.image];
    return isHovering && availableImages.length > 1 
      ? availableImages[1] 
      : availableImages[0] || product.image;
  };

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      <div 
        className="relative overflow-hidden flex-grow"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          {product.isOnSale && discountPercentage > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full shadow-xl font-bold flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>{discountPercentage}% OFF</span>
            </span>
          )}
        </div>

        {/* Image container */}
        <div className={`h-64 w-full bg-gray-100 flex items-center justify-center relative overflow-hidden transition-all duration-500 ${
          isHovering ? 'shadow-md' : ''
        }`}>
          <img
            src={getCurrentImage()}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
              isHovering ? 'scale-105' : 'scale-100'
            }`}
          />
          
          {/* Hover overlay */}
          {isHovering && (
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center transition-opacity duration-300">
              <div className="bg-white/80 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <Eye className="w-6 h-6 text-gray-800" />
              </div>
            </div>
          )}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <X className="w-8 h-8 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
          {product.rating >= 4.5 && (
            <div className="flex items-center space-x-1 text-yellow-500">
              <Award className="w-4 h-4" />
              <span className="text-xs font-bold">Top Rated</span>
            </div>
          )}
        </div>
        
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-lg leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-gray-800">{product.rating}</div>
            <div className="text-xs text-gray-500">({product.reviews} reviews)</div>
          </div>
        </div>

        {/* Key highlights preview */}
        {product.keyHighlights && product.keyHighlights.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {product.keyHighlights.slice(0, 2).map((highlight, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {highlight}
                </span>
              ))}
              {product.keyHighlights.length > 2 && (
                <span className="text-xs text-teal-600 font-medium">+{product.keyHighlights.length - 2} more</span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black text-gray-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through font-medium">₹{product.originalPrice}</span>
            )}
          </div>
          {discountPercentage > 0 && (
            <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full font-bold">
              Save ₹{(product.originalPrice || 0) - product.price}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <button 
            onClick={handleWishlistToggle}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
              isInWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          
          {product.inStock ? (
  isInCart ? (
    <button
      onClick={handleRemoveFromCart}
      className="flex-grow bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <X className="w-4 h-4" />
      {/* <span>REMOVE FROM CART</span> */}
    </button>
  ) : (
    <button
      onClick={handleAddToCart}
      disabled={isAddingToCart}
      className={`flex-grow bg-gradient-to-r from-gray-900 to-gray-700 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 ${
        isAddingToCart ? 'opacity-75 cursor-not-allowed' : ''
      }`}
    >
      {isAddingToCart ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          ADDING...
        </span>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4" />
          {/* <span>ADD TO CART</span> */}
        </>
      )}
    </button>
  )
) : (
  <button
    disabled
    className="flex-grow bg-gray-300 text-gray-500 px-6 py-3 rounded-full font-medium flex items-center justify-center space-x-2 cursor-not-allowed shadow-inner"
  >
    <X className="w-4 h-4" />
    <span>OUT OF STOCK</span>
  </button>
)}
        </div>
      </div>
    </div>
  );
}