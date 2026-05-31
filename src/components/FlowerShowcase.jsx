import React from 'react';
import content from '../content.json';

export default function FlowerShowcase() {
  const { flowers } = content;
  return (
    <section id="flowers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900">Our Showcase</h2>
          <p className="mt-4 text-gray-600">Selected with love, arranged with care.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {flowers.map((flower) => (
            <div key={flower.id} className="group relative bg-floral-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={flower.image} 
                  alt={flower.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold text-floral-600 uppercase tracking-wider">{flower.category}</span>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{flower.name}</h3>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-serif text-floral-800">{flower.price}</span>
                  <a href="#order" className="text-floral-600 font-semibold hover:text-floral-800 underline">Order Now</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
