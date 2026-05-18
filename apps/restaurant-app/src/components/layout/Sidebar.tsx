import Link from 'next/link';
import { LayoutDashboard, Utensils, ClipboardList, BarChart3, Settings } from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Menu', href: '/menu', icon: Utensils },
  { name: 'Orders', href: '/orders', icon: ClipboardList },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r min-h-screen hidden md:block">
      <div className="h-16 flex items-center px-6 border-b">
        <span className="text-2xl font-bold text-orange-600 tracking-tighter">Foody Partner</span>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-secondary text-sm font-medium transition-colors"
          >
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
