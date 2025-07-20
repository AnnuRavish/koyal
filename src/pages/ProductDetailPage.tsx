import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight, X, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';

interface Breadcrumb {
  name: string;
  path: string;
}

interface ProductImage {
  url: string;
  alt?: string;
}

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size?: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [cartActionState, setCartActionState] = useState<'idle' | 'adding' | 'removing' | 'success'>('idle');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  const product = state.products.find(p => p.id === id);
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  const [isVisible, setIsVisible] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    setIsMounted(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const index = sectionRefs.findIndex(ref => ref.current === entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setIsVisible(prev => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    sectionRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      sectionRefs.forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

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

  const productImages: ProductImage[] = product.images && product.images.length > 0 
    ? product.images.map(img => (typeof img === 'string' ? { url: img } : img))
    : [{ url: product.image }];

  const findCartItem = (): CartItem | undefined => {
    if (product.sizes) {
      return state.cart.find(item => 
        item.productId === product.id && 
        item.size === selectedSize
      );
    }
    return state.cart.find(item => item.productId === product.id);
  };

  const isInCart = !!findCartItem();
  const isInWishlist = state.wishlist.includes(product.id);

  const handleCartAction = () => {
    if (!product.inStock || (product.sizes && !selectedSize)) return;
    
    const cartItem = findCartItem();
    
    if (cartItem) {
      // Remove from cart
      setCartActionState('removing');
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_FROM_CART',
          payload: cartItem.id
        });
        setCartActionState('idle');
      }, 1000);
    } else {
      // Add to cart
      setCartActionState('adding');
      setTimeout(() => {
        const newCartItem: CartItem = {
          id: `${product.id}-${selectedSize || 'no-size'}-${Date.now()}`,
          productId: product.id,
          quantity: 1,
          size: selectedSize || undefined
        };
        dispatch({
          type: 'ADD_TO_CART',
          payload: newCartItem
        });
        setCartActionState('success');
        setTimeout(() => setCartActionState('idle'), 2000);
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

  const relatedProducts = state.products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const allOtherProducts = state.products
    .filter(p => p.id !== product.id)
    .slice(0, 8);

  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + productImages.length) % productImages.length);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const breadcrumbs: Breadcrumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: product.name, path: `/product/${product.id}` },
  ];

  const getSectionAnimation = (index: number) => {
    return `transition-all duration-1000 ease-in-out ${
      isVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
    }`;
  };

  const getCartButtonState = () => {
    switch (cartActionState) {
      case 'adding':
        return {
          icon: <ShoppingCart className="w-6 h-6 animate-spin" />,
          text: 'ADDING...',
          className: 'bg-blue-500 hover:bg-blue-600'
        };
      case 'removing':
        return {
          icon: <X className="w-6 h-6 animate-spin" />,
          text: 'REMOVING...',
          className: 'bg-red-500 hover:bg-red-600'
        };
      case 'success':
        return {
          icon: <Check className="w-6 h-6" />,
          text: 'ADDED TO CART!',
          className: 'bg-green-500 hover:bg-green-600'
        };
      default:
        return isInCart 
          ? {
              icon: <X className="w-6 h-6" />,
              text: 'REMOVE FROM CART',
              className: 'bg-red-500 hover:bg-red-600'
            }
          : {
              icon: <ShoppingCart className="w-6 h-6" />,
              text: 'ADD TO CART',
              className: 'bg-gray-900 hover:bg-gray-800'
            };
    }
  };

  const cartButton = getCartButtonState();

  return (
    <div className={`w-full bg-gray-50 min-h-screen ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} transition-all duration-700 ease-out`}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12" ref={sectionRefs[0]}>
          {/* Product Images */}
          <div className={`space-y-4 ${getSectionAnimation(0)}`}>
            {/* Main Image */}
            <div className="relative rounded-lg overflow-hidden">
              {product.isOnSale && discountPercentage > 0 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm px-3 py-1 rounded z-10 font-bold">
                  {discountPercentage}% OFF
                </span>
              )}
              <div className="aspect-square flex items-center justify-center relative">
                <img
                  src={productImages[currentImageIndex].url}
                  alt={productImages[currentImageIndex].alt || product.name}
                  className="w-full h-full object-cover"
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
                    src={image.url}
                    alt={image.alt || `${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className={`space-y-6 ${getSectionAnimation(0)}`}>
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
                {product.keyHighlights?.map((highlight, index) => (
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
                onClick={handleCartAction}
                disabled={!product.inStock || (product.sizes && !selectedSize) || cartActionState !== 'idle'}
                className={`flex-1 py-4 px-8 rounded-lg font-bold text-lg flex items-center justify-center space-x-3 transition-all duration-500 transform hover:scale-105 shadow-lg ${
                  !product.inStock || (product.sizes && !selectedSize)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : cartButton.className
                } text-white`}
              >
                {cartButton.icon}
                <span>{cartButton.text}</span>
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
          <section 
            ref={sectionRefs[1]}
            className={`mt-16 ${getSectionAnimation(1)}`}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <div
                  key={relatedProduct.id}
                  className="transition-all duration-500 ease-out"
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    opacity: isVisible[1] ? 1 : 0,
                    transform: isVisible[1] ? 'translateY(0)' : 'translateY(20px)'
                  }}
                >
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        <section 
          ref={sectionRefs[2]}
          className={`mt-16 ${getSectionAnimation(2)}`}
        >
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {allOtherProducts.map((otherProduct, index) => (
              <div
                key={otherProduct.id}
                className="transition-all duration-500 ease-out"
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  opacity: isVisible[2] ? 1 : 0,
                  transform: isVisible[2] ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <ProductCard product={otherProduct} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetailPage;