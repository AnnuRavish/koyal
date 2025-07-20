import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  isOnSale?: boolean;
  inStock: boolean;
  sizes?: string[];
  keyHighlights: string[];
  category: string;
}

interface Breadcrumb {
  name: string;
  path: string;
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  const product = state.products.find((p: Product) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Get all available product images (main + additional images)
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image]; // Fallback to main image if no images array

  const handleAddToCart = () => {
    if (isInCart) {
      // Remove from cart logic - find the cart item and remove it
      const cartItem = state.cart.find(item => item.productId === product.id);
      if (cartItem) {
        dispatch({
          type: 'REMOVE_FROM_CART',
          payload: cartItem.id,
        });
      }
    } else {
      setIsAddingToCart(true);
      
      setTimeout(() => {
        dispatch({
          type: 'ADD_TO_CART',
          payload: {
            id: `${product.id}-${selectedSize}-${Date.now()}`,
            productId: product.id,
            quantity,
            size: selectedSize,
            description: product.description,
          },
        });
        setIsAddingToCart(false);
      }, 1000);
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product.id });
    }
  };

  const isInCart = state.cart.some((item: any) => item.productId === product.id);
  const isInWishlist = state.wishlist.includes(product.id);

  // Get current cart item for this product to show quantity
  const currentCartItem = state.cart.find(item => item.productId === product.id);
  const cartQuantity = currentCartItem ? currentCartItem.quantity : 0;

  // Get related products (exclude current product)
  const relatedProducts = state.products
    .filter((p: Product) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const allOtherProducts = state.products
    .filter((p: Product) => p.id !== product.id)
    .slice(0, 8);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const breadcrumbs: Breadcrumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product.name, path: `/product/${product.id}` },
  ];

  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.name}>
              <button
                onClick={() => navigate(crumb.path)}
                className={`hover:text-teal-600 ${
                  index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : ''
                }`}
              >
                {crumb.name}
              </button>
              {index < breadcrumbs.length - 1 && <span>{'>'}</span>}
            </React.Fragment>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-gradient-to-br from-orange-100 to-orange-300 rounded-lg overflow-hidden">
              {product.isOnSale && discountPercentage > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded z-10 font-bold">
                  {discountPercentage}% OFF
                </span>
              )}
              <div className="aspect-square flex items-center justify-center p-8 relative">
                <img
                  src={productImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-110 transition-transform duration-500"
                />
                
                {/* Image Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentImageIndex === index 
                      ? 'border-teal-500 scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {product.rating} | {product.reviews} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              {discountPercentage > 0 && (
                <span className="text-lg bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600">
              Inclusive of all taxes • <span className="text-teal-600 font-medium">Free Shipping</span> on orders above ₹499
            </p>

            {/* Key Highlights */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">KEY HIGHLIGHTS</h3>
              <div className="space-y-3">
                {product.keyHighlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Size:</h3>
                <div className="flex space-x-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 border-2 rounded-lg font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-teal-500 bg-teal-50 text-teal-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || (product.sizes && !selectedSize && !isInCart)}
                className={`flex-1 py-4 px-8 rounded-lg font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-500 transform ${
                  !product.inStock || (product.sizes && !selectedSize && !isInCart)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : isAddingToCart
                      ? 'bg-gradient-to-r from-teal-500 to-blue-500 scale-105 shadow-2xl animate-pulse'
                      : isInCart
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 hover:scale-105 shadow-lg'
                        : 'bg-gray-900 hover:bg-gray-800 hover:scale-105 shadow-lg hover:shadow-xl'
                } text-white`}
              >
                <div className={`transition-all duration-300 ${isAddingToCart ? 'animate-spin' : ''}`}>
                  {isInCart ? <X className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
                </div>
                <span className="transition-all duration-300">
                  {isAddingToCart ? 'ADDING TO CART...' : isInCart ? 'REMOVE FROM CART' : 'ADD TO CART'}
                </span>
              </button>
              
              <button 
                onClick={handleWishlistToggle}
                className={`p-4 border-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                  isInWishlist 
                    ? 'border-red-500 bg-red-50 text-red-500' 
                    : 'border-gray-300 hover:bg-red-50 hover:text-red-500 hover:border-red-300'
                }`}
              >
                <Heart className={`w-6 h-6 transition-all duration-300 ${isInWishlist ? 'fill-current scale-110' : ''}`} />
              </button>
              
              <button className="p-4 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Share2 className="w-6 h-6" />
              </button>
            </div>

            {!product.inStock && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 font-medium">This product is currently out of stock</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        <ScrollReveal direction="up">
          <section className="mt-16">
            <ScrollReveal direction="scale">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">More Products</h2>
                <button
                  onClick={() => navigate('/products')}
                  className="text-teal-600 hover:text-teal-800 font-bold flex items-center space-x-2 bg-teal-50 hover:bg-teal-100 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <span>View All Products</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allOtherProducts.map((otherProduct, index) => (
                <ScrollReveal
                  key={otherProduct.id}
                  direction="up"
                  delay={index * 150}
                >
                  <ProductCard product={otherProduct} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
              >
                <ProductCard product={otherProduct} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}