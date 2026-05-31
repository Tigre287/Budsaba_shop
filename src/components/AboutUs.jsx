import React from 'react';
import { Heart, Truck, Sparkles } from 'lucide-react';
import content from '../content.json';

const FEATURES = [
  {
    icon: <Heart className="h-6 w-6 text-floral-600" />,
    title: 'Made with Love',
    description: 'Each arrangement is handcrafted by our expert florists with attention to every detail.'
  },
  {
    icon: <Truck className="h-6 w-6 text-floral-600" />,
    title: 'Fast Delivery',
    description: 'We ensure your flowers arrive fresh and on time, anywhere in the city.'
  },
  {
    icon: <Sparkles className="h-6 w-6 text-floral-600" />,
    title: 'Freshness Guaranteed',
    description: 'We source our blooms daily from the best local gardens to guarantee lasting beauty.'
  }
];

export default function AboutUs() {
  const { shop_info } = content;
  return (
    <section id="about" className="py-24 bg-floral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-6">{shop_info.about_title}</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {shop_info.about_description}
            </p>
            <div className="space-y-6">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 bg-white p-3 rounded-xl shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{feature.title}</h4>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 lg:mt-0 grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1519219788971-8d9797e0928e?auto=format&fit=crop&q=80" 
              alt="Florist working" 
              className="rounded-2xl h-64 w-full object-cover"
            />
            <img 
              src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80" 
              alt="Shop interior" 
              className="rounded-2xl h-64 w-full object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
