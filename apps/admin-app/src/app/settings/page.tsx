"use client";

import { useState } from 'react';

export default function GlobalSettings() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [settings, setSettings] = useState({
    platformFee: 12.5,
    allowNewRestaurants: true,
    allowNewDrivers: true,
    maintenanceMode: false,
    maxDeliveryRadius: 15,
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
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global Settings</h1>
        <p className="text-muted-foreground">Manage platform-wide configuration and core parameters.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Financials & Limits */}
        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">Financials & Logistics</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-medium">Platform Fee Commission (%)</label>
              <div className="relative">
                <input 
                  type="number" step="0.1"
                  name="platformFee"
                  value={settings.platformFee}
                  onChange={handleChange}
                  className="w-full border rounded-lg pl-4 pr-10 py-3 bg-background outline-none focus:ring-2 focus:ring-primary" 
                />
                <span className="absolute right-4 top-3.5 text-muted-foreground font-bold">%</span>
              </div>
              <p className="text-xs text-muted-foreground">The percentage taken from every successful order.</p>
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium">Max Delivery Radius (km)</label>
              <div className="relative">
                <input 
                  type="number" 
                  name="maxDeliveryRadius"
                  value={settings.maxDeliveryRadius}
                  onChange={handleChange}
                  className="w-full border rounded-lg pl-4 pr-12 py-3 bg-background outline-none focus:ring-2 focus:ring-primary" 
                />
                <span className="absolute right-4 top-3.5 text-muted-foreground font-bold">km</span>
              </div>
              <p className="text-xs text-muted-foreground">Maximum allowed distance between restaurant and customer.</p>
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="bg-card border rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold mb-6 border-b pb-4">Platform Access Controls</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border rounded-xl bg-muted/20">
              <div>
                <p className="font-bold">Allow New Restaurant Registrations</p>
                <p className="text-sm text-muted-foreground mt-1">If disabled, new restaurants cannot sign up for the platform.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="allowNewRestaurants" checked={settings.allowNewRestaurants} onChange={handleChange} className="sr-only peer" />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-xl bg-muted/20">
              <div>
                <p className="font-bold">Allow New Driver Registrations</p>
                <p className="text-sm text-muted-foreground mt-1">If disabled, the Delivery App will block new signups.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="allowNewDrivers" checked={settings.allowNewDrivers} onChange={handleChange} className="sr-only peer" />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-xl border-red-500/20 bg-red-50 dark:bg-red-950/20">
              <div>
                <p className="font-bold text-red-600 dark:text-red-500">Global Maintenance Mode</p>
                <p className="text-sm text-red-600/80 dark:text-red-400 mt-1">DANGER: This will instantly kick all users offline and lock the platform.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="maintenanceMode" checked={settings.maintenanceMode} onChange={handleChange} className="sr-only peer" />
                <div className="w-14 h-7 bg-red-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-4">
          {saved && <span className="text-green-500 font-bold flex items-center gap-2">✓ Global Settings Synced</span>}
          <button 
            type="submit" 
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary/30 disabled:opacity-50 min-w-[150px]"
          >
            {loading ? 'Syncing...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}
