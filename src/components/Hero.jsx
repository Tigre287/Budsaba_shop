import React from 'react';
import { ArrowRight } from 'lucide-react';
import content from '../content.json';

export default function Hero() {
  const { shop_info } = content;
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="relative z-10">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-tight">
              Fresh Blooms for <br />
              <span className="text-floral-600">Every Moment</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-lg">
              {shop_info.description}
            </p>
            <div className="mt-10 flex gap-4">
              <a href="#order" className="bg-floral-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-floral-700 transition-all flex items-center gap-2">
                Order Today <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#flowers" className="bg-white border-2 border-floral-200 text-floral-700 px-8 py-4 rounded-full font-semibold hover:bg-floral-50 transition-all">
                Browse Collection
              </a>
            </div>
          </div>
          <div className="mt-12 lg:mt-0 relative">
            <div className="aspect-square rounded-full bg-floral-100 absolute -top-10 -right-10 w-64 h-64 -z-10 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80" 
              alt="Fresh flower arrangement"
              className="rounded-3xl shadow-2xl object-cover w-full aspect-[4/5]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
