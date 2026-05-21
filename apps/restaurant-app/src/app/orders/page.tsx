"use client";

import { useState, useEffect } from 'react';
import { fetchApi, API_BASE_URL } from '@/lib/api';
import { io } from 'socket.io-client';

type Order = {
  id: string;
  displayId: string;
  status: string;
  time: string;
  items: string[];
};

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'mock-order-id-1024',
      displayId: '#1024',
      status: 'PENDING',
      time: '2 mins ago',
      items: ['1x Truffle Fries', '2x Margherita Pizza']
    },
    {
      id: 'mock-order-id-1023',
      displayId: '#1023',
      status: 'PREPARING',
      time: '15 mins ago',
      items: ['3x Sushi Platter']
    }
  ]);

  useEffect(() => {
    const socketUrl = API_BASE_URL.replace('/api/v1', '');
    const socket = io(socketUrl, { withCredentials: true });

    socket.on('connect', () => {
      console.log('Restaurant connected to real-time sync!');
    });

    socket.on('order:received', (newOrder: Order) => {
      console.log('New Order Received via WebSocket!', newOrder);
      // Play a sound or show a toast here in a real app
      
      setOrders(prev => {
        // Prevent duplicate injections
        if (prev.find(o => o.id === newOrder.id)) return prev;
        
        // Add to top of list
        return [newOrder, ...prev];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    // Optimistic UI update
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

    try {
      // Hit the brand new backend endpoint!
      await fetchApi(`/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.error('Failed to update status', error);
      // Revert if failed (simple reload strategy for now, or just alert)
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'PENDING');
  const preparingOrders = orders.filter(o => o.status === 'PREPARING');
  const readyOrders = orders.filter(o => o.status === 'READY');

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Active Orders</h1>
        <p className="text-muted-foreground">Manage incoming orders in real-time.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Column */}
        <div className="bg-muted/50 rounded-xl p-4 flex flex-col">
          <h2 className="font-semibold mb-4 text-orange-500">PENDING ({pendingOrders.length})</h2>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {pendingOrders.map(order => (
              <div key={order.id} className="bg-card border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">{order.displayId}</span>
                  <span className="text-sm text-muted-foreground">{order.time}</span>
                </div>
                {order.items.map((item, i) => <p key={i} className="text-sm">{item}</p>)}
                <button 
                  onClick={() => handleUpdateStatus(order.id, 'PREPARING')}
                  className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white rounded-md py-2 text-sm font-medium transition-colors"
                >
                  Accept Order
                </button>
              </div>
            ))}
            {pendingOrders.length === 0 && (
              <div className="h-32 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                No pending orders.
              </div>
            )}
          </div>
        </div>

        {/* Preparing Column */}
        <div className="bg-muted/50 rounded-xl p-4 flex flex-col">
          <h2 className="font-semibold mb-4 text-blue-500">PREPARING ({preparingOrders.length})</h2>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {preparingOrders.map(order => (
              <div key={order.id} className="bg-card border p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">{order.displayId}</span>
                  <span className="text-sm text-muted-foreground">{order.time}</span>
                </div>
                {order.items.map((item, i) => <p key={i} className="text-sm">{item}</p>)}
                <button 
                  onClick={() => handleUpdateStatus(order.id, 'READY')}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 text-sm font-medium transition-colors"
                >
                  Mark Ready
                </button>
              </div>
            ))}
            {preparingOrders.length === 0 && (
              <div className="h-32 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                No orders preparing.
              </div>
            )}
          </div>
        </div>

        {/* Ready Column */}
        <div className="bg-muted/50 rounded-xl p-4 flex flex-col">
          <h2 className="font-semibold mb-4 text-green-500">READY FOR PICKUP ({readyOrders.length})</h2>
          <div className="space-y-3 flex-1 overflow-y-auto">
             {readyOrders.map(order => (
              <div key={order.id} className="bg-card border-2 border-green-500 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">{order.displayId}</span>
                  <span className="text-sm text-green-600 font-bold">READY</span>
                </div>
                {order.items.map((item, i) => <p key={i} className="text-sm">{item}</p>)}
              </div>
            ))}
            {readyOrders.length === 0 && (
              <div className="h-32 flex items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                No orders ready.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
