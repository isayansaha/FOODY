"use client";
import { useState } from 'react';
import { Power, MapPin, Bell } from 'lucide-react';

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(false);
  const [hasRequest, setHasRequest] = useState(false);

  // Simulate a request coming in
  const toggleOnline = () => {
    setIsOnline(!isOnline);
    if (!isOnline) {
      setTimeout(() => setHasRequest(true), 2000);
    } else {
      setHasRequest(false);
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      <div className="p-6 bg-card border-b flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Good morning, John!</h1>
          <p className="text-sm text-muted-foreground">You are currently {isOnline ? 'online' : 'offline'}.</p>
        </div>
        <Bell className="h-6 w-6 text-muted-foreground" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
        
        {/* Toggle Button */}
        <button 
          onClick={toggleOnline}
          className={`h-40 w-40 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 ${
            isOnline ? 'bg-orange-600 shadow-orange-600/50 scale-105' : 'bg-secondary text-muted-foreground'
          }`}
        >
          <Power className={`h-12 w-12 mb-2 ${isOnline ? 'text-white' : ''}`} />
          <span className={`font-bold text-lg ${isOnline ? 'text-white' : ''}`}>
            {isOnline ? 'GO OFFLINE' : 'GO ONLINE'}
          </span>
        </button>

        {/* Mock Delivery Request Popup */}
        {hasRequest && (
          <div className="absolute inset-x-4 bottom-24 bg-card border shadow-2xl rounded-2xl p-4 animate-in slide-in-from-bottom-10 fade-in duration-300">
             <div className="flex justify-between items-start mb-4">
               <div>
                 <p className="font-bold text-lg text-orange-600">New Request!</p>
                 <p className="text-sm text-muted-foreground">Expected payout: $8.50</p>
               </div>
               <span className="font-bold text-xl">2.4 mi</span>
             </div>
             
             <div className="space-y-3 mb-6">
               <div className="flex items-center space-x-3 text-sm">
                 <MapPin className="h-4 w-4 text-orange-600" />
                 <span>Pickup: Pizza Paradise</span>
               </div>
               <div className="flex items-center space-x-3 text-sm">
                 <MapPin className="h-4 w-4 text-green-600" />
                 <span>Dropoff: 123 Main St, Apt 4B</span>
               </div>
             </div>

             <div className="flex space-x-3">
               <button onClick={() => setHasRequest(false)} className="flex-1 bg-secondary text-foreground py-3 rounded-xl font-medium">Decline</button>
               <button onClick={() => window.location.href='/active'} className="flex-1 bg-orange-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-600/30">Accept</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
