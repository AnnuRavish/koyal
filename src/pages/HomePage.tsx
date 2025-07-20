import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { ChevronRight, ChevronLeft, Mail, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function HomePage() {
  const { state } = useApp();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // State for section filters
  const [selectedEssentials, setSelectedEssentials] = useState('New Launches');
  const [selectedTrending, setSelectedTrending] = useState('All Products');

  // Helper filters
  const getEssentialsProducts = () => {
    if (selectedEssentials === 'New Launches') return state.products.slice(0, 4);
    if (selectedEssentials === 'Bestsellers') return [...state.products].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
    if (selectedEssentials === 'Best Offers') return [...state.products].sort((a, b) => (((b.originalPrice ?? 0)-b.price)-((a.originalPrice ?? 0)-a.price))).slice(0, 4);
    if (selectedEssentials === 'Combo Kits') return state.products.filter(p => p.category.toLowerCase().includes('combo')).slice(0, 4);
    return state.products.slice(0, 4);
  };

  const trendingCategories = [
    'All Products', 'Sunscreen', 'Hair Care', 'Acne Care', 'Antiageing', 'Body Care', 'Foot Care'
  ];
  const getTrendingProducts = () => {
    if (selectedTrending === 'All Products') return state.products.slice(0, 8);
    return state.products.filter(p => p.category.toLowerCase() === selectedTrending.toLowerCase()).slice(0, 8);
  };

  const essentialsProducts = getEssentialsProducts();
  const trendingProducts = getTrendingProducts();

  // Hero slides data
  const heroSlides = [
    {
      id: 1,
      title: "Spot-Correcting &",
      subtitle: "Brightening Duo",
      description: "For Pigmentation-Free Skin",
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600",
      bgGradient: "from-blue-100 via-blue-50 to-blue-200",
      badge: "KOJIC ACID"
    },
    {
      id: 2,
      title: "Advanced Sunscreen",
      subtitle: "Protection Range",
      description: "SPF 50+ Broad Spectrum Protection",
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600",
      bgGradient: "from-orange-100 via-orange-50 to-orange-200",
      badge: "SPF 50+"
    },
    {
      id: 3,
      title: "Professional Acne",
      subtitle: "Treatment Solutions",
      description: "Clinically Proven Results",
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600",
      bgGradient: "from-green-100 via-green-50 to-green-200",
      badge: "DERMA TESTED"
    },
    {
      id: 4,
      title: "Anti-Aging",
      subtitle: "Skincare Range",
      description: "Youthful Skin at Any Age",
      image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600",
      bgGradient: "from-purple-100 via-purple-50 to-purple-200",
      badge: "ANTI-AGING"
    }
  ];

  // Page load animation effect
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <div className={`w-full bg-gray-50 overflow-hidden transition-all duration-1000 ease-in ${
      isPageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
    }`}>
      {/* Hero Slider Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${slide.bgGradient} transition-all duration-1000 ease-in-out transform ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Animated background elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full transition-all duration-700 ease-in hover:scale-110"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-ping"></div>
            
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="flex flex-col md:flex-row items-center w-full">
                <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                  <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight tracking-tight">
                    {slide.title}<br />
                    {slide.subtitle}
                  </h1>
                  <p className="text-2xl md:text-3xl font-bold text-gray-700 mb-8 tracking-wide">
                    {slide.description}
                  </p>
                  <button
                    onClick={() => navigate('/products')}
                    className="bg-gray-900 text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all duration-300 border-2 border-gray-900 transform hover:scale-105 hover:shadow-2xl shadow-lg"
                  >
                    SHOP NOW
                  </button>
                </div>
                <div className="md:w-1/2 flex justify-center relative">
                  <div className="relative">
                    <img
                      src={slide.image}
                      alt="Skincare Products"
                      className="w-80 h-80 object-contain transform transition-transform duration-700 hover:scale-110 hover:rotate-3"
                    />
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ease-in hover:scale-105">
                      <div className="text-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full mx-auto mb-1 animate-pulse"></div>
                        <span className="text-xs font-black text-gray-800">{slide.badge}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Newsletter Section - Moved to Body */}
      <section className="py-16 bg-gradient-to-br from-teal-50 via-blue-50 to-teal-100 w-full relative">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Mail className="w-16 h-16 text-teal-600 mx-auto mb-6 transition-all duration-500 ease-in hover:scale-110" />
            <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-teal-700 to-blue-700 bg-clip-text text-transparent mb-6">
              Stay Updated with Our Latest Products
            </h2>
            <p className="text-xl text-gray-600 mb-10 font-medium">
              Subscribe to our newsletter and get exclusive offers and skincare tips
            </p>
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-8 py-5 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 flex-1 text-lg font-medium"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-10 py-5 hover:from-teal-600 hover:to-teal-700 transition-all duration-300 font-bold text-lg transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              Join 50,000+ subscribers and get skincare tips delivered to your inbox
            </p>
          </div>
        </div>
      </section>

      {/* Shop by Concern */}
      <section className="py-20 w-full relative bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-16 tracking-tight">
            SHOP BY CONCERN
          </h2>
          
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {state.categories.map((category, index) => (
              <div
                key={category.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center text-teal-600 hover:text-teal-800 font-bold text-lg transform transition-all duration-300 hover:scale-105 bg-teal-50 hover:bg-teal-100 px-8 py-4 rounded-full"
            >
              View All Categories
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Skincare Essentials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 w-full relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-12 tracking-tight">
            SKINCARE ESSENTIALS
          </h2>
          
          <div className="flex justify-center mb-12">
            <div className="flex space-x-8 bg-white rounded-full p-2 shadow-lg">
              {['New Launches','Bestsellers','Best Offers','Combo Kits'].map(label => (
                <button
                  key={label}
                  onClick={() => setSelectedEssentials(label)}
                  className={
                    (selectedEssentials === label
                      ? 'text-white bg-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')+
                    ' px-6 py-3 rounded-full font-bold transition-all duration-300'
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {essentialsProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-white w-full relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-6xl font-black text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-12 tracking-tight">
            TRENDING PRODUCTS
          </h2>
          
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-4 bg-gray-100 rounded-full p-2">
              {trendingCategories.map(label => (
                <button
                  key={label}
                  onClick={() => setSelectedTrending(label)}
                  className={
                    (selectedTrending === label
                      ? 'text-white bg-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white')+
                    ' px-6 py-3 rounded-full font-bold transition-all duration-300'
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> */}
         
          {/* </div> */}
          
        </div>
      </section>
    </div>
  );
}