"use client";

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useState, use } from 'react';

export default function RestaurantDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { items, addItem, decreaseQuantity, removeItem } = useCartStore();
  const [animatingItemId, setAnimatingItemId] = useState<string | null>(null);

  // Mock data for the specific restaurant menu
  const menuItems = [
    { id: '33333333-3333-3333-3333-333333333333', name: 'Truffle Fries', description: 'Crispy fries with truffle oil and parmesan', price: 8.99, image: 'https://images.unsplash.com/photo-1630431341973-02e1b662cebc?w=600&q=80' },
    { id: '44444444-4444-4444-4444-444444444444', name: 'Margherita Pizza', description: 'Fresh tomatoes, mozzarella, and basil', price: 14.99, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80' },
    { id: '55555555-5555-5555-5555-555555555555', name: 'Spicy Chicken Sandwich', description: 'Fried chicken with spicy mayo', price: 12.99, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80' },
  ];

  const handleAddToCart = (item: any) => {
    // Trigger Animation
    setAnimatingItemId(item.id);
    setTimeout(() => setAnimatingItemId(null), 500);

    // Add to Global Zustand Store
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
  };

  const cartTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 pt-24">
      <div className="mb-8">
        <Link href="/restaurants" className="text-orange-600 hover:underline mb-4 inline-block">&larr; Back to Restaurants</Link>
        <h1 className="text-4xl font-bold mt-2">Restaurant Menu (Mock ID: {id})</h1>
        <p className="text-muted-foreground mt-2">Select items to add to your cart and proceed to checkout!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {menuItems.map(item => (
            <div 
              key={item.id} 
              className={`border p-4 rounded-2xl flex justify-between items-center shadow-sm transition-all duration-300 bg-card ${animatingItemId === item.id ? 'scale-105 border-orange-500 shadow-orange-500/20 shadow-xl' : 'hover:shadow-md'}`}
            >
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-muted">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                  <p className="font-semibold text-lg mt-2">${item.price}</p>
                </div>
              </div>
              <button 
                onClick={() => handleAddToCart(item)}
                className={`font-bold px-6 py-3 rounded-xl transition-colors ${animatingItemId === item.id ? 'bg-green-500 text-white' : 'bg-orange-100 hover:bg-orange-200 text-orange-600'}`}
              >
                {animatingItemId === item.id ? '✓ Added' : '+ Add'}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-muted/30 p-8 rounded-3xl h-fit border sticky top-24">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
          
          {items.length === 0 ? (
            <div className="text-muted-foreground mb-8 text-center py-8">
              <p>Your cart is currently empty.</p>
              <p className="text-sm mt-2">Add some delicious items from the menu!</p>
            </div>
          ) : (
            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center border-b pb-4">
                  <div className="flex-1">
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 bg-background border rounded-lg p-1 shadow-sm">
                    <button 
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted font-bold text-lg text-red-500"
                    >
                      -
                    </button>
                    <span className="w-4 text-center font-semibold">{item.quantity}</span>
                    <button 
                      onClick={() => addItem(item)}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted font-bold text-lg text-green-500"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {items.length > 0 && (
            <>
              <div className="border-t pt-4 mb-6 flex justify-between items-center text-xl font-bold">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-600/30">
                  Proceed to Checkout
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
