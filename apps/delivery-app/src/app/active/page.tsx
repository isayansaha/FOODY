"use client";

import { useEffect, useState } from 'react';
import { ArrowLeft, Navigation, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { io } from 'socket.io-client';

// We must dynamically import the Map to prevent Next.js SSR from crashing on window objects
const DeliveryMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted">
      <p className="text-muted-foreground animate-pulse">Loading GPS Modules...</p>
    </div>
  )
});

// Mock Customer ID. In real app, this would be passed via route params or state
const MOCK_CUSTOMER_ID = '99999999-9999-9999-9999-999999999999';

export default function ActiveDelivery() {
  const destinationLocation: [number, number] = [40.7128, -74.0060]; // NYC City Hall
  
  // Start the driver slightly north of the destination
  const [driverLocation, setDriverLocation] = useState<[number, number]>([40.7200, -74.0000]);

  useEffect(() => {
    // Connect to WebSocket using hardcoded port for local dev
    const socket = io('http://localhost:3001', { withCredentials: true });

    socket.on('connect', () => {
      console.log('Driver connected to tracking server!');
    });

    // Simulate GPS Movement every 3 seconds
    const gpsInterval = setInterval(() => {
      setDriverLocation(prev => {
        // Move slightly towards destination
        const latDiff = destinationLocation[0] - prev[0];
        const lngDiff = destinationLocation[1] - prev[1];
        
        // Stop moving if extremely close
        if (Math.abs(latDiff) < 0.0001 && Math.abs(lngDiff) < 0.0001) return prev;

        const newLat = prev[0] + (latDiff * 0.05); // Move 5% of the remaining distance
        const newLng = prev[1] + (lngDiff * 0.05);
        
        const newLocation: [number, number] = [newLat, newLng];

        // Broadcast to customer!
        socket.emit('driver:location', {
          customerId: MOCK_CUSTOMER_ID,
          lat: newLat,
          lng: newLng
        });

        return newLocation;
      });
    }, 3000);

    return () => {
      clearInterval(gpsInterval);
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Real Interactive Map */}
      <div className="flex-1 relative overflow-hidden z-0">
        <DeliveryMap driverLocation={driverLocation} destinationLocation={destinationLocation} />
        
        {/* Back Button */}
        <Link href="/" className="absolute top-6 left-4 bg-background/80 backdrop-blur p-2 rounded-full shadow-lg z-[1000]">
          <ArrowLeft className="h-6 w-6" />
        </Link>
      </div>

      {/* Delivery Details Card */}
      <div className="bg-card rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] -mt-6 z-20 p-6 flex flex-col space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="font-bold text-xl">Dropoff</h2>
            <p className="text-muted-foreground text-sm">123 Main St, Apt 4B</p>
          </div>
          <div className="text-right">
            <h2 className="font-bold text-xl">5 mins</h2>
            <p className="text-muted-foreground text-sm">2.4 mi away</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-y py-4">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center text-lg font-bold">
              AS
            </div>
            <div>
              <p className="font-bold">Alice Smith</p>
              <p className="text-sm text-muted-foreground">Customer</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="h-10 w-10 bg-secondary rounded-full flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="h-10 w-10 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-500 rounded-full flex items-center justify-center">
              <Phone className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Swipe to Complete button mock */}
        <button className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-orange-600/30 active:scale-95 transition-transform">
          Complete Delivery
        </button>
      </div>
    </div>
  );
}
