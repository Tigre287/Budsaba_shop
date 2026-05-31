import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Send, Calendar as CalendarIcon } from 'lucide-react';

export default function OrderForm() {
  const [date, setDate] = useState(new Date());
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.target);
    formData.append('delivery_date', date.toDateString());

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbyPBMc1E9RnTB6zSCUL-J7EHsS4T39kbEI-6DX5EFuU0-j5DJMeDTUrjlWqe7YYU3Or/exec';

    try {
      // Use no-cors or standard fetch depending on how Apps Script handles it. 
      // Usually, standard fetch with URLSearchParams works best for Apps Script doPost
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script cross-origin
        body: new URLSearchParams(formData)
      });
      
      // Since mode is 'no-cors', we won't get a proper 'ok' status, 
      // but if it doesn't throw, it likely succeeded.
      setStatus('success');
      e.target.reset();
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="order" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-floral-50 rounded-3xl overflow-hidden shadow-xl border border-floral-100">
          <div className="grid md:grid-cols-2">
            <div className="p-8 lg:p-12 bg-white">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Place Your Order</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input required name="name" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-floral-500 focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-floral-500 focus:border-transparent outline-none transition-all" placeholder="+66 81-234-5678" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Time</label>
                  <input required name="delivery_time" type="time" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-floral-500 focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Flower Selection</label>
                  <select name="flower_type" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-floral-500 focus:border-transparent outline-none transition-all">
                    <option>Eternal Roses</option>
                    <option>Spring Tulips</option>
                    <option>Pure Lilies</option>
                    <option>Orchid Dream</option>
                    <option>Custom Bouquet</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Delivery Address</label>
                  <textarea required name="address" rows="2" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-floral-500 focus:border-transparent outline-none transition-all" placeholder="Enter your full address"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Special Note (Optional)</label>
                  <textarea name="note" rows="2" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-floral-500 focus:border-transparent outline-none transition-all" placeholder="Example: Please leave at the front desk."></textarea>
                </div>
                
                <button 
                  disabled={status === 'sending'}
                  className="w-full bg-floral-600 text-white py-4 rounded-xl font-bold hover:bg-floral-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Processing...' : (
                    <>Send Order <Send className="h-5 w-5" /></>
                  )}
                </button>
                
                {status === 'success' && <p className="text-green-600 font-semibold text-center mt-2">Order sent successfully!</p>}
                {status === 'error' && <p className="text-red-600 font-semibold text-center mt-2">Something went wrong. Please try again.</p>}
              </form>
            </div>
            
            <div className="p-8 lg:p-12 bg-floral-50 border-l border-floral-100">
              <div className="flex items-center gap-2 mb-6">
                <CalendarIcon className="text-floral-600 h-6 w-6" />
                <h3 className="text-xl font-bold text-gray-900">Delivery Date</h3>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <Calendar 
                  onChange={setDate} 
                  value={date} 
                  minDate={new Date()}
                  className="rounded-lg border-none"
                />
              </div>
              <p className="mt-6 text-sm text-gray-600 italic text-center">
                Selected Date: <span className="text-floral-700 font-bold">{date.toDateString()}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
