"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';

const PAST_ORDERS = [
  {
    id: 'ORD-8F92A',
    date: 'May 18, 2026',
    restaurant: 'Pizza Paradise',
    status: 'Delivered',
    total: 28.50,
    items: [
      { id: 'item1', name: 'Margherita Pizza', quantity: 1, price: 14.99 },
      { id: 'item2', name: 'Garlic Bread', quantity: 2, price: 4.50 },
    ]
  },
  {
    id: 'ORD-3C41B',
    date: 'May 12, 2026',
    restaurant: 'Burger Joint',
    status: 'Delivered',
    total: 18.25,
    items: [
      { id: 'item3', name: 'Double Cheeseburger', quantity: 1, price: 12.99 },
      { id: 'item4', name: 'Fries', quantity: 1, price: 3.99 },
    ]
  },
  {
    id: 'ORD-9X77Y',
    date: 'April 28, 2026',
    restaurant: 'Sushi Spot',
    status: 'Cancelled',
    total: 45.00,
    items: [
      { id: 'item5', name: 'Spicy Tuna Roll', quantity: 2, price: 12.50 },
      { id: 'item6', name: 'Dragon Roll', quantity: 1, price: 18.00 },
    ]
  }
];

export default function OrderHistoryPage() {
  const { addItem } = useCartStore();
  const router = useRouter();
  const [reordering, setReordering] = useState<string | null>(null);

  const handleReorder = async (orderId: string, items: any[]) => {
    setReordering(orderId);
    
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 800));

    // Add items to cart
    items.forEach(item => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        restaurantId: 'mock-restaurant-id'
      });
    });

    // Navigate to checkout
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Order History</h1>
          <p className="text-muted-foreground mt-1">View your past deliveries and reorder your favorites.</p>
        </div>
        <Link href="/restaurants" className="hidden sm:inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 border shadow-sm">
          Browse Restaurants
        </Link>
      </div>

      <div className="space-y-6">
        {PAST_ORDERS.map((order) => (
          <div key={order.id} className="border rounded-2xl bg-card overflow-hidden shadow-sm transition-all hover:shadow-md">
            
            {/* Header */}
            <div className="bg-muted/40 p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Order Placed</p>
                  <p className="text-sm font-semibold">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Total</p>
                  <p className="text-sm font-semibold">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Order #</p>
                  <p className="text-sm font-semibold">{order.id}</p>
                </div>
                <div className="text-right sm:text-left">
                   <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Status</p>
                   <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                     order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                     order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                   }`}>
                     {order.status}
                   </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-3">{order.restaurant}</h3>
                <ul className="space-y-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="text-sm flex items-center text-muted-foreground">
                      <span className="font-semibold text-foreground w-6">{item.quantity}x</span>
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button 
                  onClick={() => handleReorder(order.id, order.items)}
                  disabled={reordering !== null}
                  className="w-full md:w-40 inline-flex items-center justify-center rounded-xl text-sm font-bold transition-all h-11 px-8 bg-orange-600 text-white hover:bg-orange-700 shadow-md shadow-orange-600/20 disabled:opacity-50"
                >
                  {reordering === order.id ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    </span>
                  ) : (
                    "Reorder"
                  )}
                </button>
                <button className="w-full md:w-40 inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors border hover:bg-muted h-11 px-8">
                  Get Help
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
