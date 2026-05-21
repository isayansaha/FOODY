"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_RESTAURANTS = [
  { id: '1', name: 'Pizza Paradise', cuisine: 'Italian', rating: 4.8, time: 25, isVeg: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' },
  { id: '2', name: 'Burger Joint', cuisine: 'American', rating: 4.5, time: 35, isVeg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' },
  { id: '3', name: 'Sushi Spot', cuisine: 'Japanese', rating: 4.9, time: 40, isVeg: false, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80' },
  { id: '4', name: 'Green Bowl', cuisine: 'Healthy', rating: 4.2, time: 20, isVeg: true, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80' },
  { id: '5', name: 'Spicy Curry House', cuisine: 'Indian', rating: 4.6, time: 45, isVeg: true, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80' },
  { id: '6', name: 'Taco Fiesta', cuisine: 'Mexican', rating: 3.8, time: 15, isVeg: false, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80' },
];

export default function RestaurantsPage() {
  const [vegOnly, setVegOnly] = useState(false);
  const [highRating, setHighRating] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);

  const filteredRestaurants = ALL_RESTAURANTS.filter(r => {
    if (vegOnly && !r.isVeg) return false;
    if (highRating && r.rating < 4.5) return false;
    if (fastDelivery && r.time > 30) return false;
    return true;
  });

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">Explore Restaurants</h1>
          <p className="text-muted-foreground">Find the perfect meal for your cravings.</p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${vegOnly ? 'bg-green-100 text-green-700 border-green-500 shadow-sm' : 'bg-background hover:bg-muted text-muted-foreground'}`}
          >
            🍃 Pure Veg
          </button>
          <button 
            onClick={() => setHighRating(!highRating)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${highRating ? 'bg-yellow-100 text-yellow-700 border-yellow-500 shadow-sm' : 'bg-background hover:bg-muted text-muted-foreground'}`}
          >
            ⭐ 4.5+ Rating
          </button>
          <button 
            onClick={() => setFastDelivery(!fastDelivery)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${fastDelivery ? 'bg-blue-100 text-blue-700 border-blue-500 shadow-sm' : 'bg-background hover:bg-muted text-muted-foreground'}`}
          >
            ⚡ Under 30 Mins
          </button>
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredRestaurants.map((restaurant) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={restaurant.id}
            >
              <Link href={`/restaurants/${restaurant.id}`}>
                <div className="border rounded-2xl p-4 transition-all hover:shadow-xl hover:border-orange-500 bg-card cursor-pointer h-full group">
                  <div className="aspect-[4/3] w-full rounded-xl mb-4 overflow-hidden relative bg-muted">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {restaurant.isVeg && <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">VEG</span>}
                      <span className="bg-white/90 backdrop-blur-sm text-black text-xs font-bold px-2 py-1 rounded-md shadow-sm">{restaurant.time} min</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold">{restaurant.name}</h2>
                  <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                    <span className="font-medium bg-muted px-2 py-1 rounded-md">{restaurant.cuisine}</span>
                    <span className="flex items-center text-yellow-500 font-bold bg-yellow-50 px-2 py-1 rounded-md">
                      ★ {restaurant.rating}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredRestaurants.length === 0 && (
        <div className="text-center py-24">
          <p className="text-2xl font-bold text-muted-foreground mb-2">No restaurants found</p>
          <p className="text-muted-foreground">Try adjusting your filters to see more options.</p>
          <button 
            onClick={() => { setVegOnly(false); setHighRating(false); setFastDelivery(false); }}
            className="mt-6 text-orange-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
