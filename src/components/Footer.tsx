import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart, Award, Shield, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const navigate = useNavigate();

  return (
    <footer className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white w-full mt-auto ${className}`}>
      {/* Trust Indicators */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <Truck className="w-8 h-8 text-teal-400 group-hover:text-teal-300 transition-colors" />
              <div>
                <p className="font-semibold text-sm">Free Shipping</p>
                <p className="text-xs text-gray-400">On orders above ₹499</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <Shield className="w-8 h-8 text-teal-400 group-hover:text-teal-300 transition-colors" />
              <div>
                <p className="font-semibold text-sm">Secure Payment</p>
                <p className="text-xs text-gray-400">100% secure checkout</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <Award className="w-8 h-8 text-teal-400 group-hover:text-teal-300 transition-colors" />
              <div>
                <p className="font-semibold text-sm">Quality Assured</p>
                <p className="text-xs text-gray-400">Dermatologist tested</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2 group cursor-pointer transform transition-all duration-300 hover:scale-105">
              <Heart className="w-8 h-8 text-teal-400 group-hover:text-teal-300 transition-colors" />
              <div>
                <p className="font-semibold text-sm">Customer Care</p>
                <p className="text-xs text-gray-400">24/7 support</p>
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
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">FIXDERMA</h3>
                <p className="text-xs text-gray-400">We Fix Your Skin</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner in skincare solutions. We provide effective, scientifically-backed products for all your skin concerns.
            </p>
            <div className="flex space-x-4">
              <div className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </div>
              <div className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </div>
              <div className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </div>
              <div className="p-2 bg-gray-800 rounded-full hover:bg-teal-600 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12">
                <Youtube className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="transform transition-all duration-500 hover:translate-y-[-4px]">
            <h4 className="text-lg font-semibold mb-6 text-teal-400">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/')} className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-2 block">About Us</button></li>
              <li><button onClick={() => navigate('/products')} className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-2 block">Our Products</button></li>
              <li><button onClick={() => navigate('/products')} className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-2 block">Skin Concerns</button></li>
              <li><button onClick={() => navigate('/')} className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-2 block">Expert Tips</button></li>
              <li><button onClick={() => navigate('/')} className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-2 block">Reviews</button></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="transform transition-all duration-500 hover:translate-y-[-4px]">
            <h4 className="text-lg font-semibold mb-6 text-teal-400">Categories</h4>
            <ul className="space-y-2">
              <li><button onClick={() => navigate('/products?category=Face')} className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-2 block">Face Care</button></li>
              <li><button onClick={() => navigate('/products?category=Body')} className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-2 block">Body Care</button></li>
              <li><button onClick={() => navigate('/products?category=Hair')} className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-2 block">Hair Care</button></li>
              <li><button onClick={() => navigate('/products?category=Sunscreen')} className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-2 block">Sunscreen</button></li>
              <li><button onClick={() => navigate('/products?category=Foot Care')} className="text-gray-300 hover:text-teal-400 transition-all duration-300 hover:translate-x-2 block">Foot Care</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="transform transition-all duration-500 hover:translate-y-[-4px]">
            <h4 className="text-lg font-semibold mb-6 text-teal-400">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Mail className="w-5 h-5 text-teal-500" />
                <span className="text-gray-300 group-hover:text-teal-400 transition-colors">info@fixderma.com</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Phone className="w-5 h-5 text-teal-500" />
                <span className="text-gray-300 group-hover:text-teal-400 transition-colors">+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <MapPin className="w-5 h-5 text-teal-500" />
                <span className="text-gray-300 group-hover:text-teal-400 transition-colors">Mumbai, India</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-3 text-teal-400">Newsletter</h5>
              <div className="flex rounded-lg overflow-hidden shadow-lg">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 text-white placeholder-gray-400"
                />
                <button className="bg-gradient-to-r from-teal-500 to-teal-600 px-6 py-3 hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p>&copy; 2024 FIXDERMA. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}