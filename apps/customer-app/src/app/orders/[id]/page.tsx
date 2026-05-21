"use client";
import { useEffect, useState } from 'react';
import { CheckCircle2, Clock, ChefHat, MapPin } from 'lucide-react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '@/lib/api';
import dynamic from 'next/dynamic';

const CustomerMap = dynamic(() => import('@/components/CustomerMap'), {
  ssr: false,
  loading: () => <div className="h-64 w-full bg-muted rounded-2xl animate-pulse flex items-center justify-center border"><MapPin className="text-muted-foreground" /></div>
});

export default function OrderTracking() {
  const [orderStatus, setOrderStatus] = useState('PENDING');
  const [driverLocation, setDriverLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Connect to the NestJS WebSocket Server
    // We strip the /api/v1 from the base url to connect to the raw domain
    const socketUrl = API_BASE_URL.replace('/api/v1', '');
    
    const socket = io(socketUrl, {
      withCredentials: true // Extremely important to send the HTTP-Only JWT Cookie
    });

    socket.on('connect', () => {
      console.log('Connected to real-time order tracking server!');
    });

    socket.on('order:status_changed', (data: { orderId: string, status: string }) => {
      console.log('Order Status Changed via WebSocket:', data);
      setOrderStatus(data.status);
    });

    // Listen for live driver coordinates!
    socket.on('driver:location_update', (data: { lat: number, lng: number }) => {
      console.log('Driver moved!', data);
      setDriverLocation([data.lat, data.lng]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8 pt-24 text-center">
      <div className="flex justify-center mb-6">
        <CheckCircle2 className="h-20 w-20 text-green-500" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-muted-foreground mb-12">Your payment was successful and the restaurant has received your order.</p>

      <div className="bg-card border rounded-2xl p-6 shadow-sm text-left">
        <h2 className="font-bold text-xl mb-6 border-b pb-4">Live Tracking</h2>
        
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-muted-foreground/20 before:to-transparent">
          
          {/* PLACED */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-orange-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-colors">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="font-bold text-orange-600">Order Placed</div>
                <time className="text-xs text-muted-foreground">Done</time>
              </div>
              <p className="text-sm text-muted-foreground">We've received your order and payment.</p>
            </div>
          </div>

          {/* PREPARING */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-500 ${orderStatus === 'PREPARING' || orderStatus === 'READY' ? 'bg-blue-600 text-white scale-110 shadow-blue-500/50' : 'bg-muted text-muted-foreground'}`}>
              <ChefHat className="h-5 w-5" />
            </div>
            <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm transition-all duration-500 ${orderStatus === 'PREPARING' || orderStatus === 'READY' ? 'bg-card opacity-100 border-blue-500 shadow-md shadow-blue-500/10' : 'bg-card opacity-50'}`}>
              <div className="flex items-center justify-between mb-1">
                <div className={`font-bold ${orderStatus === 'PREPARING' || orderStatus === 'READY' ? 'text-blue-600' : ''}`}>Preparing Food</div>
                <time className="text-xs text-muted-foreground">{orderStatus === 'PREPARING' || orderStatus === 'READY' ? 'Done' : 'Pending'}</time>
              </div>
              <p className="text-sm text-muted-foreground">The restaurant is preparing your food.</p>
            </div>
          </div>

          {/* READY FOR PICKUP / OUT FOR DELIVERY */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-all duration-500 ${orderStatus === 'READY' ? 'bg-green-500 text-white scale-110 shadow-green-500/50' : 'bg-muted text-muted-foreground'}`}>
              <MapPin className="h-5 w-5" />
            </div>
            <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border shadow-sm transition-all duration-500 ${orderStatus === 'READY' ? 'bg-card opacity-100 border-green-500 shadow-md shadow-green-500/10' : 'bg-card opacity-50'}`}>
              <div className="flex items-center justify-between mb-1">
                <div className={`font-bold ${orderStatus === 'READY' ? 'text-green-600' : ''}`}>Ready for Delivery</div>
                <time className="text-xs text-muted-foreground">{orderStatus === 'READY' ? 'Done' : 'Pending'}</time>
              </div>
              <p className="text-sm text-muted-foreground">A driver is heading your way.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Live Map Box */}
      <div className="mt-8 bg-card border rounded-2xl shadow-sm text-left overflow-hidden h-80 relative">
        <div className="absolute top-4 left-4 z-[400] bg-background/90 backdrop-blur-md px-4 py-2 rounded-xl shadow border font-bold text-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          Live GPS
        </div>
        <CustomerMap 
          driverLocation={driverLocation} 
          destinationLocation={[40.7128, -74.0060]} // Destination (must match driver target)
        />
      </div>

    </div>
  );
}
