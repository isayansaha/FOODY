"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Wallet, Navigation } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: Map },
    { name: 'Active', href: '/active', icon: Navigation },
    { name: 'Earnings', href: '/earnings', icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-card border-t z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-orange-600' : 'text-muted-foreground hover:text-foreground transition-colors'}`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
