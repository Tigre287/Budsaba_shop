import React, { useState } from 'react';
import content from '../content.json';
import { Save, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState(content);
  const [activeTab, setActiveTab] = useState('info');

  const [status, setStatus] = useState('idle');

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      shop_info: { ...prev.shop_info, [name]: value }
    }));
  };

  const handleFlowerChange = (index, field, value) => {
    const newFlowers = [...data.flowers];
    newFlowers[index] = { ...newFlowers[index], [field]: value };
    setData(prev => ({ ...prev, flowers: newFlowers }));
  };

  const handleSave = async () => {
    // Debugging: Log available environment keys (not values for security)
    console.log('Available Env Keys:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
    
    const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
    const REPO = import.meta.env.VITE_GITHUB_REPO;
    const BRANCH = import.meta.env.VITE_GITHUB_BRANCH || 'main';
    const FILE_PATH = 'src/content.json';

    if (!TOKEN || TOKEN === 'YOUR_TOKEN_HERE') {
      alert('❌ Missing: VITE_GITHUB_TOKEN. Please add it to your Vercel Environment Variables and REDEPLOY.');
      return;
    }
    
    if (!REPO || REPO === 'YOUR_GITHUB_USERNAME/YOUR_REPO_NAME') {
      alert('❌ Missing: VITE_GITHUB_REPO. Please add it to your Vercel Environment Variables and REDEPLOY.');
      return;
    }

    try {
      setStatus('saving');
      
      // 1. Get current file SHA
      const getRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`, {
        headers: { 'Authorization': `token ${TOKEN}` }
      });
      
      if (!getRes.ok) {
        throw new Error('Could not find content.json on GitHub. Make sure you have pushed your code first.');
      }

      const fileData = await getRes.json();
      const sha = fileData.sha;

      // 2. Encode and Save
      // Use unescape(encodeURIComponent()) to handle unicode/special characters correctly
      const contentBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))));
      
      const putRes = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'Update website content from Budsaba Admin Dashboard',
          content: contentBase64,
          sha: sha,
          branch: BRANCH
        })
      });

      if (putRes.ok) {
        alert('✨ Successfully saved to GitHub! Your changes will appear on the live site in a minute.');
      } else {
        const err = await putRes.json();
        throw new Error(err.message);
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('❌ Error saving to GitHub: ' + error.message);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          
          <div className="flex gap-4 items-center">
            <div className="text-xs bg-white border border-gray-200 p-3 rounded-xl shadow-sm">
              <p className="font-bold text-gray-400 uppercase text-[10px] mb-1">Connection Status</p>
              <div className="flex gap-3">
                <span className={`flex items-center gap-1 ${import.meta.env.VITE_GITHUB_TOKEN ? 'text-green-600' : 'text-red-500'}`}>
                  ● Token: {import.meta.env.VITE_GITHUB_TOKEN ? 'OK' : 'MISSING'}
                </span>
                <span className={`flex items-center gap-1 ${import.meta.env.VITE_GITHUB_REPO ? 'text-green-600' : 'text-red-500'}`}>
                  ● Repo: {import.meta.env.VITE_GITHUB_REPO ? 'OK' : 'MISSING'}
                </span>
              </div>
            </div>
            
            <button 
              onClick={handleSave}
              disabled={status === 'saving'}
              className="bg-floral-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-floral-700 flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="h-5 w-5" /> 
              {status === 'saving' ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('info')}
            className={`pb-4 px-4 font-semibold transition-all ${activeTab === 'info' ? 'border-b-2 border-floral-600 text-floral-600' : 'text-gray-500'}`}
          >
            Shop Info
          </button>
          <button 
            onClick={() => setActiveTab('flowers')}
            className={`pb-4 px-4 font-semibold transition-all ${activeTab === 'flowers' ? 'border-b-2 border-floral-600 text-floral-600' : 'text-gray-500'}`}
          >
            Manage Flowers
          </button>
        </div>

        {activeTab === 'info' ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Shop Description (Hero)</label>
              <textarea 
                name="description"
                value={data.shop_info.description}
                onChange={handleInfoChange}
                rows="3"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-floral-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">About Us Title</label>
              <input 
                name="about_title"
                value={data.shop_info.about_title}
                onChange={handleInfoChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-floral-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">About Us Description</label>
              <textarea 
                name="about_description"
                value={data.shop_info.about_description}
                onChange={handleInfoChange}
                rows="5"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-floral-500"
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.flowers.map((flower, index) => (
              <div key={flower.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between mb-4">
                  <h3 className="font-bold text-lg">Flower #{flower.id}</h3>
                  <button className="text-red-500 hover:text-red-700"><Trash2 className="h-5 w-5" /></button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Name</label>
                      <input 
                        value={flower.name}
                        onChange={(e) => handleFlowerChange(index, 'name', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Price</label>
                      <input 
                        value={flower.price}
                        onChange={(e) => handleFlowerChange(index, 'price', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Image URL</label>
                    <div className="flex gap-2">
                      <input 
                        value={flower.image}
                        onChange={(e) => handleFlowerChange(index, 'image', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                      />
                      <button className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"><ImageIcon className="h-5 w-5 text-gray-600" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="border-2 border-dashed border-gray-300 rounded-2xl p-12 flex flex-col items-center justify-center text-gray-400 hover:border-floral-300 hover:text-floral-600 transition-all">
              <Plus className="h-8 w-8 mb-2" />
              <span className="font-bold">Add New Flower</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
