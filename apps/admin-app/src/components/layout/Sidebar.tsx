import Link from 'next/link';
import { Globe, Users, Store, Activity, Settings } from 'lucide-react';

const navItems = [
  { name: 'Global Overview', href: '/', icon: Globe },
  { name: 'Restaurants', href: '/restaurants', icon: Store },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'System Health', href: '/health', icon: Activity },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-card border-r min-h-screen hidden md:block">
      <div className="h-16 flex items-center px-6 border-b bg-muted/30">
        <span className="text-xl font-bold tracking-tight text-primary">Foody SuperAdmin</span>
      </div>
      <nav className="p-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-secondary text-sm font-medium transition-colors"
          >
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
