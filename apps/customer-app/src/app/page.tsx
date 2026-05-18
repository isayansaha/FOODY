import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600 pb-2">
          Hungry? We've got you covered.
        </h1>
        <p className="text-xl text-muted-foreground md:text-2xl">
          Get your favorite meals delivered to your door in minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/restaurants" 
            className="inline-flex items-center justify-center rounded-full bg-orange-600 px-8 py-4 text-sm font-medium text-white shadow transition-colors hover:bg-orange-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Order Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
