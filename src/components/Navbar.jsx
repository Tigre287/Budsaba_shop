import React from 'react';
import { Flower2, ShoppingCart, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-floral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Flower2 className="text-floral-600 h-8 w-8" />
            <span className="text-2xl font-serif font-bold text-floral-800">Budsaba</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="/#home" className="text-gray-600 hover:text-floral-600 transition-colors">Home</a>
            <a href="/#flowers" className="text-gray-600 hover:text-floral-600 transition-colors">Flowers</a>
            <a href="/#about" className="text-gray-600 hover:text-floral-600 transition-colors">About Us</a>
            <a href="/#order" className="bg-floral-600 text-white px-6 py-2 rounded-full hover:bg-floral-700 transition-colors">Order Now</a>
          </div>

          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </div>
        </div>
      </div>
    </nav>
  );
}
