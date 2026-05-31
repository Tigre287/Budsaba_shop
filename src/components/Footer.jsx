import React from 'react';
import { Flower2, Phone, Mail, MapPin, MessageCircle, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Flower2 className="text-floral-400 h-8 w-8" />
              <span className="text-2xl font-serif font-bold">Budsaba</span>
            </div>
            <p className="text-gray-400">
              Bringing the beauty of fresh flowers to your special moments. Hand-picked with care and delivered with love.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-floral-400 transition-colors"><MessageCircle /></a>
              <a href="#" className="hover:text-floral-400 transition-colors"><Share2 /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#flowers" className="hover:text-white transition-colors">Our Flowers</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#order" className="hover:text-white transition-colors">Order Now</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-floral-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-floral-400" />
                <span>hello@budsaba.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-floral-400" />
                <span>123 Floral Ave, Garden City</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get flower care tips and seasonal offers.</p>
            <form className="flex gap-2">
              <input type="email" placeholder="Your email" className="bg-gray-800 border-none rounded-lg px-4 py-2 w-full focus:ring-1 focus:ring-floral-400 outline-none" />
              <button className="bg-floral-600 px-4 py-2 rounded-lg hover:bg-floral-700 transition-colors font-bold">Join</button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© 2026 Budsaba Flower Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
