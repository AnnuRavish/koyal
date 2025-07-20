import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart, Award, Shield, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assests/logo2-Photoroom.png'; 

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const navigate = useNavigate();

  return (
    <footer className={`bg-white text-black border-t border-gray-200 w-full mt-auto ${className}`}>
      {/* Trust Indicators */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <Truck className="w-8 h-8 text-gray-800 group-hover:text-black transition-colors" />
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders above ₹499</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <Shield className="w-8 h-8 text-gray-800 group-hover:text-black transition-colors" />
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-gray-600">100% secure checkout</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <Award className="w-8 h-8 text-gray-800 group-hover:text-black transition-colors" />
              <div>
                <p className="font-semibold text-sm">Quality Assured</p>
                <p className="text-xs text-gray-600">Dermatologist tested</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <Heart className="w-8 h-8 text-gray-800 group-hover:text-black transition-colors" />
              <div>
                <p className="font-semibold text-sm">Customer Care</p>
                <p className="text-xs text-gray-600">24/7 support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="transform transition-all duration-500 hover:translate-y-[-4px]">
            <div className="flex items-center space-x-2 mb-4">
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
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Your trusted partner in skincare solutions. We provide effective, scientifically-backed products for all your skin concerns.
            </p>
            <div className="flex space-x-4">
              <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12">
                <Facebook className="w-5 h-5 text-gray-700 hover:text-black transition-colors" />
              </div>
              <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12">
                <Twitter className="w-5 h-5 text-gray-700 hover:text-black transition-colors" />
              </div>
              <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12">
                <Instagram className="w-5 h-5 text-gray-700 hover:text-black transition-colors" />
              </div>
              <div className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12">
                <Youtube className="w-5 h-5 text-gray-700 hover:text-black transition-colors" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="transform transition-all duration-500 hover:translate-y-[-4px]">
            <h4 className="text-lg font-semibold mb-6 text-gray-800">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/')} className="text-gray-700 hover:text-black transition-all duration-300 hover:translate-x-2 block">About Us</button></li>
              <li><button onClick={() => navigate('/products')} className="text-gray-700 hover:text-black transition-all duration-300 hover:translate-x-2 block">Our Products</button></li>
              <li><button onClick={() => navigate('/products')} className="text-gray-700 hover:text-black transition-all duration-300 hover:translate-x-2 block">Skin Concerns</button></li>
              <li><button onClick={() => navigate('/')} className="text-gray-700 hover:text-black transition-all duration-300 hover:translate-x-2 block">Expert Tips</button></li>
              <li><button onClick={() => navigate('/')} className="text-gray-700 hover:text-black transition-all duration-300 hover:translate-x-2 block">Reviews</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="transform transition-all duration-500 hover:translate-y-[-4px]">
            <h4 className="text-lg font-semibold mb-6 text-gray-800">Categories</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/products?category=Face')} className="text-gray-700 hover:text-black transition-all duration-300 hover:translate-x-2 block">Face Care</button></li>
              <li><button onClick={() => navigate('/products?category=Body')} className="text-gray-700 hover:text-black transition-all duration-300 hover:translate-x-2 block">Body Care</button></li>
              <li><button onClick={() => navigate('/products?category=Hair')} className="text-gray-700 hover:text-black transition-all duration-300 hover:translate-x-2 block">Hair Care</button></li>
              <li><button onClick={() => navigate('/products?category=Sunscreen')} className="text-gray-700 hover:text-black transition-all duration-300 hover:translate-x-2 block">Sunscreen</button></li>
              <li><button onClick={() => navigate('/products?category=Foot Care')} className="text-gray-700 hover:text-black transition-all duration-300 hover:translate-x-2 block">Foot Care</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="transform transition-all duration-500 hover:translate-y-[-4px]">
            <h4 className="text-lg font-semibold mb-6 text-gray-800">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Mail className="w-5 h-5 text-gray-800" />
                <span className="text-gray-700 group-hover:text-black transition-colors">info@fixderma.com</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Phone className="w-5 h-5 text-gray-800" />
                <span className="text-gray-700 group-hover:text-black transition-colors">+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <MapPin className="w-5 h-5 text-gray-800" />
                <span className="text-gray-700 group-hover:text-black transition-colors">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
          <p>&copy; 2024 FIXDERMA. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}