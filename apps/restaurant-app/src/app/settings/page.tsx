"use client";

import { useState } from 'react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    restaurantName: 'Pizza Paradise',
    email: 'contact@pizzaparadise.com',
    phone: '+1 (555) 123-4567',
    address: '123 Culinary Blvd, Food City',
    openTime: '10:00',
    closeTime: '22:00',
    acceptingOrders: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Restaurant Settings</h1>
        <p className="text-muted-foreground">Manage your restaurant profile and operating configurations.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">General Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Restaurant Name</label>
              <input 
                type="text" 
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 bg-background outline-none focus:ring-2 focus:ring-orange-500" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Email</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 bg-background outline-none focus:ring-2 focus:ring-orange-500" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 bg-background outline-none focus:ring-2 focus:ring-orange-500" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Physical Address</label>
              <input 
                type="text" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 bg-background outline-none focus:ring-2 focus:ring-orange-500" 
              />
            </div>
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">Operating Hours & Status</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-sm font-medium">Opening Time</label>
              <input 
                type="time" 
                name="openTime"
                value={formData.openTime}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 bg-background outline-none focus:ring-2 focus:ring-orange-500" 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Closing Time</label>
              <input 
                type="time" 
                name="closeTime"
                value={formData.closeTime}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 bg-background outline-none focus:ring-2 focus:ring-orange-500" 
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-xl bg-muted/30">
            <div>
              <p className="font-bold">Accepting New Orders</p>
              <p className="text-sm text-muted-foreground">Toggle off to temporarily stop receiving incoming orders.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="acceptingOrders"
                checked={formData.acceptingOrders}
                onChange={handleChange}
                className="sr-only peer" 
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-500"></div>
            </label>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4">
          {saved && <span className="text-green-500 font-bold flex items-center gap-2">✓ Settings Saved Successfully</span>}
          <button 
            type="submit" 
            disabled={loading}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-orange-600/30 disabled:opacity-50 min-w-[150px]"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
