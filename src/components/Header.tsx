import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, LogOut, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assests/logo2-Photoroom.png'; 

interface MenuItem {
  name: string;
  path: string;
}

const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    navigate('/products');
  };

  const handleLogout = (): void => {
    dispatch({ type: 'SET_CURRENT_USER', payload: null });
    setShowUserMenu(false);
    navigate('/');
  };

  const cartItemCount: number = state.cart.reduce((sum: number, item) => sum + item.quantity, 0);
  const wishlistCount: number = state.wishlist ? state.wishlist.length : 0;

  const menuItems: MenuItem[] = [
    { name: 'HOME', path: '/' },
    { name: 'FACE', path: '/products?category=Face' },
    { name: 'BODY', path: '/products?category=Body' },
    { name: 'HAIR', path: '/products?category=Hair' },
    { name: 'SUNSCREEN', path: '/products?category=Sunscreen' },
    { name: 'NEW LAUNCHES', path: '/products?new=true' },
    { name: 'OFFERS', path: '/products?offers=true' },
    { name: 'CATEGORY', path: '/products' },
  ];

  return (
    <header className="bg-white text-black shadow-md sticky top-0 z-50 w-full">
      {/* Top Banner */}
      <div className="bg-black text-white py-2 px-4 text-sm w-full overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8">🚚 Free Shipping on Order Above ₹499</span>
          <span className="mx-8">⚡ Extra 5% OFF on Prepaid Orders</span>
          <span className="mx-8">🎁 Buy 1 Get 1 Free on Teenilicious Products</span>
          <span className="mx-8">🌟 Get a Travel Pouch Free on Order Above ₹1499</span>
          <span className="mx-8">💳 Secure Payment Gateway</span>
          <span className="mx-8">📞 24/7 Customer Support</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo - Left Side */}
          <button 
            onClick={() => navigate('/')}
            className="focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg transition-all"
            aria-label="Navigate to homepage"
          >
            <img 
              src={logoImage} 
              alt="Fixderma Logo"
              className="h-12 transform transition-all duration-500 hover:scale-105 hover:shadow-lg"
              width={160}
              height={48}
              loading="eager"
            />
          </button>

          {/* Right Side Elements */}
          <div className="flex items-center space-x-4 float-right pl-96">
            {/* Search Bar - Hidden on mobile */}
            <div className="hidden lg:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={state.searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })
                  }
                  className="w-72 px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-300 text-sm bg-white backdrop-blur-sm transition-all duration-300 hover:border-gray-300 shadow-sm hover:shadow-md"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-all duration-300 hover:scale-110"
                >
                  <Search size={20} />
                </button>
              </form>
            </div>

            {/* Wishlist Icon */}
            <div className="relative">
              <button 
                onClick={() => navigate('/wishlist')}
                className="relative p-3 text-gray-600 hover:text-black transition-all duration-300 hover:bg-gray-100 rounded-full group"
              >
                <Heart size={22} className="transform group-hover:scale-110 transition-transform duration-300" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>

            {/* Cart Icon */}
            <div className="relative">
              <button
                onClick={() => navigate('/cart')}
                className="relative p-3 text-gray-600 hover:text-black transition-all duration-300 hover:bg-gray-100 rounded-full group"
              >
                <ShoppingCart size={22} className="transform group-hover:scale-110 transition-transform duration-300" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center transition-all duration-500 ease-in hover:scale-110 font-bold shadow-lg">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="relative p-3 text-gray-600 hover:text-black transition-all duration-300 hover:bg-gray-100 rounded-full group"
              >
                <div className="relative">
                  <User size={22} className="transform group-hover:scale-110 transition-transform duration-300" />
                  {state.currentUser && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-800 rounded-full border-2 border-white"></div>
                  )}
                </div>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 transform transition-all duration-300 animate-fadeInUp">
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                  {state.currentUser ? (
                    <>
                      <div className="px-6 py-4 border-b bg-gray-50 rounded-t-2xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {state.currentUser.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-lg">{state.currentUser.name}</p>
                            <p className="text-sm text-gray-600">{state.currentUser.email}</p>
                            {state.currentUser.isAdmin && (
                              <span className="inline-block mt-1 px-3 py-1 bg-gray-800 text-white text-xs rounded-full font-bold">
                                Admin
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            navigate('/profile');
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                        >
                          <User className="w-5 h-5 text-gray-500" />
                          <span>My Profile</span>
                        </button>
                        {state.currentUser.isAdmin && (
                          <button
                            onClick={() => {
                              navigate('/admin');
                              setShowUserMenu(false);
                            }}
                            className="w-full text-left px-6 py-3 hover:bg-gray-100 text-gray-800 border-t flex items-center space-x-3"
                          >
                            <div className="w-5 h-5 bg-gray-800 rounded text-white text-xs flex items-center justify-center font-bold">A</div>
                            <span>Admin Dashboard</span>
                          </button>
                        )}
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-6 py-3 hover:bg-gray-50 flex items-center space-x-3 border-t"
                        >
                          <LogOut className="w-5 h-5 text-gray-500" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4">
                      <button
                        onClick={() => {
                          navigate('/login');
                          setShowUserMenu(false);
                        }}
                        className="w-full bg-gray-800 text-white py-3 px-4 rounded-xl hover:bg-gray-700 transition-all duration-300 font-bold"
                      >
                        Login / Register
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-gray-600 hover:text-black transition-all duration-300 hover:bg-gray-100 rounded-full"
            >
              <div className="transform transition-transform duration-300">
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center space-x-6 py-3">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-sm font-bold text-gray-800 hover:text-black px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100 transform hover:scale-105"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 space-y-2 bg-white animate-fadeInUp">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-4 py-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl pl-12 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-300"
                  />
                  <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                </div>
              </form>
              
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-6 py-3 hover:bg-gray-100 hover:text-black transition-all duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;