import React from 'react';
import { Category } from '../types';
import { useNavigate } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/products?category=${category.name}`)}
      className="relative group cursor-pointer transform transition-all duration-500 hover:scale-110 hover:-translate-y-2 animate-fadeInUp"
    >
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gradient-to-br from-teal-100 via-teal-200 to-teal-300 flex items-center justify-center relative shadow-xl">
        <img
          src={category.image}
          alt={category.name}
          className="w-16 h-16 md:w-20 md:h-20 object-contain transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full flex items-center justify-center">
          <span className="text-white font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 shadow-lg">Shop Now</span>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <h3 className="font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
          {category.name}
        </h3>
      </div>
    </div>
  );
}