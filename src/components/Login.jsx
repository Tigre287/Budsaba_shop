import React, { useState } from 'react';
import { Lock, Flower2 } from 'lucide-react';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would check against a secure backend or env variable
    // For now, we use a default password 'budsaba2026'
    if (password === 'budsaba2026') {
      onLogin(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-floral-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-floral-100">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-floral-100 rounded-full mb-4">
            <Flower2 className="h-8 w-8 text-floral-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">Admin Login</h2>
          <p className="text-gray-500 mt-2">Enter your password to manage Budsaba Shop</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-floral-500 transition-all"
                placeholder="••••••••"
                required
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-floral-600 text-white py-4 rounded-xl font-bold hover:bg-floral-700 transition-all shadow-lg shadow-floral-200"
          >
            Access Dashboard
          </button>
        </form>
        
        <p className="mt-8 text-center text-xs text-gray-400">
          Tip: Default password is <span className="font-mono font-bold">budsaba2026</span>
        </p>
      </div>
    </div>
  );
}
