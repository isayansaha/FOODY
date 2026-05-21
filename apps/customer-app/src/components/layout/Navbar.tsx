"use client";
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { ShoppingCart, User, Menu } from 'lucide-react';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl tracking-tighter text-orange-600">Foody</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/restaurants" className="hidden md:block text-sm font-medium transition-colors hover:text-primary">
            Restaurants
          </Link>
          <Link href="/orders/history" className="hidden md:block text-sm font-medium transition-colors hover:text-primary">
            Orders
          </Link>
          <Link href="/cart" className="relative flex items-center p-2">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/profile" className="p-2">
            <User className="h-5 w-5" />
          </Link>
          <button className="md:hidden p-2">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
